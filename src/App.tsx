import { useState, useEffect } from 'react';
import { EditorWorkspace } from './components/EditorWorkspace';
import { PresentationView } from './components/PresentationView';

export function App() {
  const [mode, setMode] = useState<'edit' | 'presentation'>('edit');
  const [presentationData, setPresentationData] = useState<{
    markdown: string;
    html: string;
    css: string;
    total: number;
  } | null>(null);

  const handleStartPresentation = (markdown: string, html: string, css: string, total: number) => {
    setPresentationData({ markdown, html, css, total });
    setMode('presentation');
  };

  const handleExitPresentation = () => {
    setMode('edit');
  };

  // 全局 F5 快捷键：放映模式下按 F5 退出返回编辑
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F5' && mode === 'presentation') {
        e.preventDefault();
        setMode('edit');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  return (
    <main className="w-screen h-screen overflow-hidden bg-slate-950 text-white font-sans antialiased">
      {mode === 'edit' || !presentationData ? (
        <EditorWorkspace onStartPresentation={handleStartPresentation} />
      ) : (
        <PresentationView
          slidesHtml={presentationData.html}
          slidesCss={presentationData.css}
          totalSlides={presentationData.total}
          onExit={handleExitPresentation}
        />
      )}
    </main>
  );
}

export default App;
