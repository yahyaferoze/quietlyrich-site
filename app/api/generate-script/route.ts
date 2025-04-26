import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { funnelStyle, stepTitle, stepDesc } = await request.json();

    if (!funnelStyle || !stepTitle || !stepDesc) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const prompt = `
Create a TikTok-style video script using the "${funnelStyle}" funnel.
Step title: ${stepTitle}
Step description: ${stepDesc}
Make it short, engaging, and punchy like a viral video.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are a viral content creator helping users write TikTok scripts.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
    });

    const result = response.choices[0]?.message?.content ?? "No script generated.";
    return NextResponse.json({ script: result });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "Failed to generate script. Please try again later." },
      { status: 500 }
    );
  }
}