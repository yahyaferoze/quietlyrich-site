import { NextResponse } from "next/server";

export async function GET() {
  const demoSamples = [
    {
      id: 1,
      script: "Get shredded fast with these three no-equipment workouts.",
      cta: "Follow for no-BS fitness wins. 💪",
      voice: "Confident gym-style narrator",
      audio: "/voice-fitness-1.mp3",
      video: "https://videos.pexels.com/video-files/8027231/8027231-uhd_1440_2732_25fps.mp4",
      locked: false,
      likes: "10.4K",
      comments: "921",
      shares: "313",
    },
    {
      id: 2,
      script: "These two meals helped me burn fat — and taste amazing.",
      cta: "Follow for clean eating hacks.",
      voice: "Friendly lifestyle tone",
      audio: "/voice-fitness-2.mp3",
      video: "https://videos.pexels.com/video-files/4884030/4884030-hd_1080_1920_30fps.mp4",
      locked: false,
      likes: "8.1K",
      comments: "702",
      shares: "210",
    },
    {
      id: 3,
      script: "This one mindset shift changed my entire fitness journey.",
      cta: "Follow if you train mind & body.",
      voice: "Calm, thoughtful narrator",
      audio: "/voice-fitness-3.mp3",
      video: "https://videos.pexels.com/video-files/18941351/18941351-hd_1080_1920_50fps.mp4",
      locked: true,
      likes: "11.7K",
      comments: "1340",
      shares: "405",
    },
  ];

  return NextResponse.json(demoSamples);
}