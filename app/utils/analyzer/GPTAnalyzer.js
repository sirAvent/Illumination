// use GPT to analyze the mood
import OpenAI from "openai";
import Analyzer from "./Analyzer";

class GPTAnalyzer extends Analyzer {
  constructor(wordsNum, prompt, secretKey, model) {
    super(wordsNum);
    // ! if we can daynamically generate prompt based on "How many key words we want"?
    // TODO discuss
    this.prompt = prompt;
    this.model = model;
    this.openai = new OpenAI({
      apiKey: secretKey,
    });
  }

  // analyze the content and return a string that contains serveral words
  async analyze(content) {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: `${this.prompt} \n ${content}` }],
        model: this.model,
      });
      const gptResponse = chatCompletion.choices[0].message.content;
      return gptResponse;
    } catch (error) {
      console.error("Error analyzing content unsuccess", error.message);
    }
  }
}

export { GPTAnalyzer };
