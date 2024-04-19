import { NextResponse } from "next/server";

export async function POST(req) {
  const { content } = await req.json();
  return NextResponse.json({
    colors: ["#3f48a4", "#4aa8e2", "#dbdab1"],
  });
}
