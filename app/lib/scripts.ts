
// lib/scripts.ts
export interface TopicScripts {
    'Hook Video': string;
    'Value Drop': string;
  }
  
  export const topics: Record<string, TopicScripts> = {
    'fitness at home': {
      'Hook Video': '🔥 Want a 5-minute workout that burns fat faster than running? 🏃 Stay tuned!',
      'Value Drop': "💪 You don't need a gym! Here's a quick bodyweight workout you can do at home. Let's go!",
    },
    'healthy meal prep': {
      'Hook Video': '🍽️ Tired of unhealthy meals? 🥗 Ready to prep 5 healthy meals in 30 minutes? Let’s dive in!',
      'Value Drop': 'Meal prepping saves time 🍱 and keeps you healthy! Here’s a simple beginner-friendly plan.',
    },
    'starting a side hustle': {
      'Hook Video': "💼 Still broke in 2025? 📈 Here's how people are building side hustles in just 1 hour a day!",
      'Value Drop': "🚀 The best side hustles need almost $0 to start. Here's one you can launch today.",
    },
  };