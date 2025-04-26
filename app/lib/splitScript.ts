export function splitScript(script: string): { text: string; start: number }[] {
    const lines = script
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  
    const delayPerLine = 2.5; // seconds per line
  
    return lines.map((text, i) => ({
      text,
      start: i * delayPerLine,
    }));
  }