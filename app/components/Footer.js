"use client";
import { useContext } from "react";
import { PromptContext } from "../context/promptContext";

export default function Footer() {
  const { prompt } = useContext(PromptContext);

  let promptEmotions;
  if (prompt != null && prompt.terms && prompt.terms.length > 0) {
    promptEmotions = (
      <>
        {prompt.terms != null &&
          prompt.terms &&
          prompt.terms.slice(0, 4).map((term, i) => {
            return (
              <span
                key={`term-${i}`}
                className="text-[32px] border-2 border-black rounded-[33px] px-4 py-2 leading-tight"
              >
                {term.toLowerCase()}
              </span>
            );
          })}
      </>
    );
    return (
      <footer className="w-[100%] flex flex-row px-[40px] pb-[32px] absolute bottom-0 bg-white items-center justify-between opacity-animation">
        <div className="flex flex-row gap-4 items-center">
          {promptEmotions && (
            <>
              <span className="text-[18px]">
                {prompt.terms.length > 1 ? "Terms:" : "Term:"}
              </span>
              <div className="flex flex-row gap-2">
                <>{promptEmotions}</>
              </div>
            </>
          )}
        </div>
      </footer>
    );
  }
}
