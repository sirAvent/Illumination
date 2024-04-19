"use client";
import { useState } from "react";
import Nav from "./components/Nav";
import Lights from "./components/Lights/Lights";
import Footer from "./components/Footer";
import PromptDisplay from "./components/PromptDisplay";
import PromptContextProvider from "./context/promptContext";
import SpeechToText from "./components/SpeechToText";
import styles from "./page.module.css";

export default function Home() {
  const [stage, setStage] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [processedTexts, setProcessedTexts] = useState([]);

  return (
    <>
      <Nav
        stage={stage}
        isRecording={isRecording}
        interimTranscript={interimTranscript}
        processedTexts={processedTexts}
      />

      <PromptContextProvider>
        {stage === 2 && (
          <>
            <main className={styles.main}>
              {/* <PromptDisplay /> */}
              <Lights />
            </main>
            <Footer />
          </>
        )}

        <SpeechToText
          stage={stage}
          setStage={setStage}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          interimTranscript={interimTranscript}
          setInterimTranscript={setInterimTranscript}
          processedTexts={processedTexts}
          setProcessedTexts={setProcessedTexts}
        />
      </PromptContextProvider>
    </>
  );
}
