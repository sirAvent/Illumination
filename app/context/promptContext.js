import { createContext, useState } from "react";

const numsOfColors = 5;

const promptValues = { prompt: {}, updatePrompt: (newPrompt) => {} };

export const PromptContext = createContext(promptValues);

export default function PromptContextProvider({ children }) {
  const [prompt, setPrompt] = useState({ terms: [], colors: [] });

  const updatePrompt = (newPrompt) => {
    let content = `Please return ${numsOfColors} closely-related emotions that are conveyed from the following passage: "${newPrompt}"`;

    fetch("http://localhost:3000/api/v1/color", {
      method: "POST",
      body: JSON.stringify({
        content,
        numsOfColors,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (result) => {
        const results = await result.json();
        setPrompt(() => {
          let colors = [],
            terms = [];

          if (results.terms != null) {
            terms =
              typeof results.terms === "string"
                ? [results.terms]
                : [...results.terms];
          }

          if (results.colors != null) {
            colors =
              typeof results.colors === "string"
                ? [results.colors]
                : [...results.colors];
          }

          return {
            colors,
            terms,
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const value = {
    prompt,
    updatePrompt,
  };

  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
}
