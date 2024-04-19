"use client";
import { useContext } from "react";
import { PromptContext } from "../../context/promptContext";

import LightCircle from "./LightCircle";

export default function LightDisplay() {
  const { prompt } = useContext(PromptContext);
  let promptColors;
  if (
    prompt != null &&
    prompt.colors.length > 0 &&
    prompt.terms &&
    prompt.terms.length > 0
  ) {
    promptColors = (
      <>
        {prompt.colors != null &&
          prompt.colors.slice(0, 4).map((color, i) => {
            return <LightCircle key={`color-${i}`} hexColor={color} />;
          })}
      </>
    );

    return (
      <div className="flex flex-row gap-[24px] w-[100vw] h-auto px-10 justify-center transition-all duration-500 opacity-animation">
        {promptColors}
      </div>
    );
  }
}
