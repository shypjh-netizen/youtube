import React, { useState } from 'react';
import { LoadingState } from '../types';

interface InputFormProps {
  onGenerate: (referenceScript: string, newTopic: string) => void;
  loadingState: LoadingState;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, loadingState }) => {
  const [referenceScript, setReferenceScript] = useState('');
  const [newTopic, setNewTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceScript.trim() || !newTopic.trim()) return;
    onGenerate(referenceScript, newTopic);
  };

  const isGenerating = loadingState.status === 'analyzing' || loadingState.status === 'generating';

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-purple-400 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        스크립트 연금술사
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="refScript" className="block text-sm font-medium text-slate-400 mb-2">
            떡상한 영상 대본 (참고용)
          </label>
          <textarea
            id="refScript"
            value={referenceScript}
            onChange={(e) => setReferenceScript(e.target.value)}
            placeholder="여기에 조회수가 높았던 영상의 대본을 붙여넣으세요..."
            className="w-full h-48 bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all"
            disabled={isGenerating}
          />
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-400 mb-2">
            새로운 주제
          </label>
          <input
            id="topic"
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="예: 다이어트 실패하는 이유, 100만 유튜버 되는 법..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            disabled={isGenerating}
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating || !referenceScript || !newTopic}
          className={`w-full py-4 px-6 rounded-lg font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] flex justify-center items-center gap-2
            ${isGenerating 
              ? 'bg-slate-700 cursor-not-allowed opacity-75' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'}`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {loadingState.status === 'analyzing' ? '대본 분석 중...' : '새 대본 작성 중...'}
            </>
          ) : (
            '분석 및 대본 생성하기'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;