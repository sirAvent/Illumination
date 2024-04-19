"use client";

import { useContext } from "react";
import { PromptContext } from "../context/promptContext";

export default function PromptDisplay() {
  const { prompt } = useContext(PromptContext);

  let promptColors;
  let promptTerms;

  if (
    prompt != null &&
    prompt.colors.length > 0 &&
    prompt.terms &&
    prompt.terms.length > 0
  ) {
    console.log(prompt);

    promptColors = (
      <>
        <h2>Colors</h2>
        <ul>
          {prompt.colors != null &&
            prompt.colors.map((color, i) => {
              return <li key={`color-${i}`}>{color}</li>;
            })}
        </ul>
      </>
    );
    promptTerms = (
      <>
        <h2>Terms</h2>
        <ul>
          {prompt.terms != null &&
            prompt.terms.map((emotion, i) => {
              return <li key={`emotion-${i}`}>{emotion}</li>;
            })}
        </ul>
      </>
    );

    return (
      <>
        {promptColors}
        {promptTerms}
      </>
    );
  }

  return <p>Colors and terms will be generated here...</p>;
}
