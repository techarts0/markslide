import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Bell } from 'lucide-react';

interface PresentationTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationTimer: React.FC<PresentationTimerProps> = ({ isOpen, onClose }) => {
  const [initialMinutes, setInitialMinutes] = useState(3);
  const [secondsLeft, setSecondsLeft] = useState(3 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  // 纯前端 Web Audio 优雅提示音
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 叮咚双音
      [
        { freq: 587.33, start: now, duration: 0.4 }, // D5
        { freq: 880.00, start: now + 0.25, duration: 0.8 }, // A5
      ].forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, note.start);

        gain.gain.setValueAtTime(0, note.start);
        gain.gain.linearRampToValueAtTime(0.3, note.start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, note.start + note.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(note.start);
        osc.stop(note.start + note.duration);
      });
    } catch (e) {
      console.warn('Audio chime warning:', e);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const resetTimer = (mins: number) => {
    setInitialMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsRunning(false);
  };

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isFinished = secondsLeft === 0;

  return (
    <div className="fixed top-8 right-8 z-50 select-none">
      <div className={`w-80 rounded-2xl p-5 border shadow-2xl backdrop-blur-xl transition-all ${
        isFinished
          ? 'bg-rose-950/90 border-rose-500 animate-bounce'
          : 'bg-slate-900/90 border-slate-700/80 text-white'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Bell size={16} className={isFinished ? 'text-rose-400 animate-spin' : 'text-blue-400'} />
            <span>讨论 / 演讲倒计时</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* 倒计时主数字显示 */}
        <div className="text-center my-3">
          <div className={`font-mono text-5xl font-extrabold tracking-tight ${
            isFinished
              ? 'text-rose-400'
              : secondsLeft <= 30
              ? 'text-amber-400'
              : 'text-white'
          }`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          {isFinished && <div className="text-xs font-bold text-rose-300 mt-1">时间到！</div>}
        </div>

        {/* 预设分钟快速切换 */}
        <div className="grid grid-cols-4 gap-1.5 my-3">
          {[1, 3, 5, 10].map((m) => (
            <button
              key={m}
              onClick={() => resetTimer(m)}
              className={`py-1 text-xs rounded-lg font-medium transition-colors ${
                initialMinutes === m && secondsLeft === m * 60
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {m} 分钟
            </button>
          ))}
        </div>

        {/* 控制按钮 */}
        <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30'
            }`}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? '暂停' : '开始'}
          </button>
          <button
            onClick={() => resetTimer(initialMinutes)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="重置"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
