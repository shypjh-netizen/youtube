export interface ScriptSection {
  sectionName: string;
  spokenAudio: string;
  visualCue: string;
}

export interface ScriptAnalysis {
  hookStrategy: string;
  pacingAndTone: string;
  retentionTactics: string[];
}

export interface GeneratedScriptResult {
  analysis: ScriptAnalysis;
  newScript: {
    title: string;
    thumbnailIdea: string;
    sections: ScriptSection[];
  };
}

export interface LoadingState {
  status: 'idle' | 'analyzing' | 'generating' | 'complete' | 'error';
  message?: string;
}