import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

// export async function GET(request) {
//   const requestUrl = request.url;
// ;
//   const response = await openai.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "gpt-3.5-turbo",
//   }).then(result => {
//     return result.choices[0].message.content;
//   }).catch(error => {
//     return error;
//   });

//   return NextResponse.json({
//     message: response,
//     request: requestUrl,
//   });
// }

export async function POST(request) {
  const { content } = await request.json();

  const res = await openai.chat.completions
    .create({
      messages: [{ role: "user", content }],
      model: "gpt-3.5-turbo",
    })
    .then((result) => {
      return result.choices[0].message;
    })
    .catch((error) => {
      return error;
    });

  return NextResponse.json(res);
}
