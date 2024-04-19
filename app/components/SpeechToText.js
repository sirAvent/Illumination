"use client";
import { useState, useEffect, useContext } from "react";
import { PromptContext } from "../context/promptContext";

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);
const recognition = SpeechRecognition && new SpeechRecognition();

export default function SpeechToText({
  stage,
  setStage,
  isRecording,
  setIsRecording,
  interimTranscript,
  setInterimTranscript,
  processedTexts,
  setProcessedTexts,
}) {
  const { updatePrompt } = useContext(PromptContext);
  const [finalTranscript, setFinalTranscript] = useState("");
  const delayInSeconds = 1;

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (stage < 2) {
      setStage((prevStage) => prevStage + 1);
    }
    if (isRecording) {
      recognition.stop();
      // window.location.reload();
    } else {
      recognition.start();
    }
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        if (finalTranscript !== "") {
          

          setProcessedTexts((processedTexts) => [
            ...processedTexts,
            finalTranscript,
          ]);

          fetch("http://localhost:3000/api", {
            method: "POST",
            body: JSON.stringify({
              content: `What emotions can be conveyed from the following passage: "${finalTranscript}"`,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(async (result) => {
              const results = await result.json();
              console.log(results.content);
              updatePrompt(results.content ? results.content : "");
            })
            .catch((err) => console.log(err));

          setFinalTranscript("");
          if (stage === 1) {
            // Delay to give API time to load
            setTimeout(() => {
              setStage((prevStage) => prevStage + 1);
            }, 2000);
          }
        }
      }, delayInSeconds * 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, finalTranscript, updatePrompt]);

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onend = (event) => {
      if (isRecording) {
        recognition.start(); // Never ending recording
      }
    };

    recognition.onresult = (event) => {
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setFinalTranscript((final) => final + transcript + " ");
        } else {
          interim += transcript;
        }
      }

      setInterimTranscript(interim);
    };
  }
  return (
    <div>
      <button
        onClick={toggleRecording}
        className={`
        ${stage === 0 && "w-[352px]" /* Start Size */}
        ${stage === 1 && "w-[492px]" /* Loading... Size */}
        ${
          /* State when Lights are shown  */
          stage >= 2
            ? "w-[170px] text-[33px] px-[30px] py-[15px] bottom-[30px] right-[40px] translate-x-0 translate-y-0"
            : "text-[72px] px-[62px] py-[18px] right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2"
        }
        absolute transform
        record-button
        border-2 border-black
        rounded-full bg-[#292929] text-white absolute left
        `}
      >
        {stage === 0 && (
          <span className="flex flex-row gap-5 ">
            Start
            <img src="play.svg" width="40px" height="40px" />
          </span>
        )}
        {stage === 1 && <span className="opacity-animation">Listening...</span>}
        {isRecording && stage === 2 ? (
          <span className="flex flex-row gap-3 text-[32px]">
            Stop
            <img src="pause.svg" width="12px" height="12px" />
          </span>
        ) : (
          stage === 2 && (
            <span className="flex flex-row gap-2 text-[32px]">
              Start
              <img src="play.svg" width="15px" height="15px" />
            </span>
          )
        )}
      </button>
      {/* For testing purposes, display what the recording is picking up. Delete later */}
      {/* // <p>Interim: {interimTranscript}</p>
      // <p>Final: {finalTranscript}</p>
      // <ol>
      //   {processedTexts.map((sentText, index) => {
      //     return <li key={index}>{sentText} </li>;
      //   })}
      // </ol> */}
    </div>
  );
}
