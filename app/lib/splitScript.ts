
  // lib/splitScript.ts

export interface SplitResult {
  voiceLines: string[];
  visualActions: { type: 'text' | 'cut' | 'emoji' | 'scene'; content: string }[];
}

export function splitScript(script: string): SplitResult {
  const lines = script.split(/\n+/);
  const voiceLines: string[] = [];
  const visualActions: { type: 'text' | 'cut' | 'emoji' | 'scene'; content: string }[] = [];

  for (const line of lines) {
    if (line.includes('**Creator:**')) {
      const match = line.match(/\*\*Creator:\*\*\s*(.*)/);
      if (match) {
        voiceLines.push(match[1].replace(/"/g, '').trim());
      }
    } else if (line.includes('[Flash') || line.includes('Flash')) {
      visualActions.push({ type: 'emoji', content: line });
    } else if (line.includes('[Cut to') || line.includes('Cut to')) {
      visualActions.push({ type: 'cut', content: line });
    } else if (line.includes('[Text on Screen')) {
      visualActions.push({ type: 'text', content: line });
    } else if (line.includes('Scene') || line.includes('Music') || line.includes('Note')) {
      visualActions.push({ type: 'scene', content: line });
    }
  }

  return { voiceLines, visualActions };
}