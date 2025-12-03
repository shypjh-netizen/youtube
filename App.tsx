import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { generateViralScript } from './services/geminiService';
import { GeneratedScriptResult, LoadingState } from './types';

function App() {
  const [loadingState, setLoadingState] = useState<LoadingState>({ status: 'idle' });
  const [result, setResult] = useState<GeneratedScriptResult | null>(null);

  const handleGenerate = async (referenceScript: string, newTopic: string) => {
    setLoadingState({ status: 'analyzing', message: '대본 구조 분석 중...' });
    setResult(null);

    try {
      // Small delay to simulate UX phase transition if needed, or purely rely on async call
      const data = await generateViralScript(referenceScript, newTopic);
      setLoadingState({ status: 'complete' });
      setResult(data);
    } catch (error) {
      console.error(error);
      setLoadingState({ status: 'error', message: '대본 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-purple-900/20">
              V
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              ViralScript AI
            </h1>
          </div>
          <div className="text-xs font-medium px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-slate-400">
            Powered by Gemini 2.5
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 text-white">
                성공한 영상의 <br />
                <span className="text-purple-400">흥행 공식을 흡수하세요.</span>
              </h2>
              <p className="text-slate-400 text-sm">
                조회수가 폭발한 영상의 대본을 넣으면, 그 영상의 '성공 DNA'와 '구조'를 분석하여 내 영상 주제에 완벽하게 이식해드립니다.
              </p>
            </div>
            <InputForm onGenerate={handleGenerate} loadingState={loadingState} />
            
            {loadingState.status === 'error' && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {loadingState.message}
              </div>
            )}
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
             {loadingState.status === 'analyzing' || loadingState.status === 'generating' ? (
                <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                  <div className="relative w-24 h-24 mb-6">
                     <div className="absolute inset-0 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
                     <div className="absolute inset-2 border-b-4 border-blue-500 border-solid rounded-full animate-spin reverse-spin" style={{animationDirection: 'reverse'}}></div>
                  </div>
                  <p className="text-slate-300 font-medium animate-pulse">{loadingState.message}</p>
                  <p className="text-slate-500 text-xs mt-2">Gemini 2.5가 대본을 해체 분석하고 있습니다...</p>
                </div>
             ) : result ? (
               <ResultDisplay result={result} />
             ) : (
               <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border border-slate-800 rounded-2xl bg-slate-900/30 text-slate-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                 </svg>
                 <p className="font-medium">대본을 입력하고 분석을 시작하세요.</p>
                 <p className="text-sm mt-1">완성된 대본과 분석 결과가 이곳에 표시됩니다.</p>
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;