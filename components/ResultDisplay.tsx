import React from 'react';
import { GeneratedScriptResult } from '../types';

interface ResultDisplayProps {
  result: GeneratedScriptResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('복사되었습니다!');
  };

  const fullScriptText = result.newScript.sections.map(s => s.spokenAudio).join('\n\n');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Analysis Section */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          성공 요인 분석 (The Sauce)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="text-sm font-semibold text-slate-400 mb-1">훅(Hook) 전략</h4>
            <p className="text-slate-200 text-sm leading-relaxed">{result.analysis.hookStrategy}</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="text-sm font-semibold text-slate-400 mb-1">템포 & 톤</h4>
            <p className="text-slate-200 text-sm leading-relaxed">{result.analysis.pacingAndTone}</p>
          </div>
        </div>
        <div className="mt-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-400 mb-2">시청 지속 유도 장치</h4>
          <div className="flex flex-wrap gap-2">
            {result.analysis.retentionTactics.map((tactic, idx) => (
              <span key={idx} className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-900/50">
                {tactic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Script Section */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-xs font-bold text-pink-500 tracking-wider uppercase">Generated Script</span>
            <h2 className="text-2xl font-bold text-white mt-1 leading-tight">{result.newScript.title}</h2>
            <p className="text-slate-400 text-sm mt-2">썸네일 아이디어: <span className="text-slate-200">{result.newScript.thumbnailIdea}</span></p>
          </div>
          <button 
            onClick={() => handleCopy(fullScriptText)}
            className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            전체 복사
          </button>
        </div>

        <div className="space-y-6">
          {result.newScript.sections.map((section, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-slate-950/50 hover:bg-slate-950 transition-colors border border-slate-800/50">
              <div className="md:w-32 flex-shrink-0">
                 <span className="inline-block px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded font-mono mb-2">
                   {section.sectionName}
                 </span>
                 <div className="text-xs text-yellow-500/80 font-medium bg-yellow-900/10 p-2 rounded border border-yellow-900/20">
                   🎥 Visual:<br/>
                   {section.visualCue}
                 </div>
              </div>
              <div className="flex-grow">
                <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {section.spokenAudio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;