import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { script } = await request.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = "rPtBTsmbA2jLKTe6xbNh";
    console.log("Script received:", script);
console.log("API Key:", apiKey ? "✅ PRESENT" : "❌ MISSING");

    if (!script || !apiKey) {
      console.error("Missing script or API key");
      return NextResponse.json({ error: "Missing script or API key" }, { status: 400 });
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: script,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API Error:", errorText);
      return NextResponse.json({ error: "Failed to generate voice", details: errorText }, { status: 500 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({
      audioUrl: `data:audio/mpeg;base64,${base64Audio}`
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}