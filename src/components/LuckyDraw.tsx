import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Shuffle, Edit3, Check, X } from 'lucide-react';

interface LuckyDrawProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_NAMES = [
  '林思宇', '陈冠希', '张芷涵', '李明哲',
  '王梓轩', '赵丽华', '孙天成', '周文博',
  '刘子豪', '吴宇恒', '黄雅婷', '徐嘉诚',
];

export const LuckyDraw: React.FC<LuckyDrawProps> = ({ isOpen, onClose }) => {
  const [names, setNames] = useState<string[]>(DEFAULT_NAMES);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(DEFAULT_NAMES.join('\n'));
  const [selectedName, setSelectedName] = useState<string>('？');
  const [isRolling, setIsRolling] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (names.length > 0 && selectedName === '？') {
      setSelectedName(names[0]);
    }
  }, [names, selectedName]);

  const startDraw = useCallback(() => {
    if (isRolling || names.length === 0) return;
    setIsRolling(true);

    let counter = 0;
    let speed = 50;
    const totalSteps = 25 + Math.floor(Math.random() * 10);

    const step = () => {
      counter++;
      const randomIndex = Math.floor(Math.random() * names.length);
      setSelectedName(names[randomIndex]);

      if (counter < totalSteps) {
        if (counter > totalSteps - 8) {
          speed += 40; // 减速阶段
        }
        intervalRef.current = window.setTimeout(step, speed);
      } else {
        setIsRolling(false);
        // 庆祝粒子礼花
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          console.warn('Confetti error:', e);
        }
      }
    };

    step();
  }, [isRolling, names]);

  // 弹窗开启时，监听 Space 进行抽签，Esc 关闭，隔离冒泡
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return; // 编辑名单时不拦截按键
      if (e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        startDraw();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, isEditing, startDraw, onClose]);

  const handleSaveNames = () => {
    const list = textValue
      .split(/[\n,，]+/)
      .map((n) => n.trim())
      .filter(Boolean);
    if (list.length > 0) {
      setNames(list);
      setSelectedName(list[0]);
    }
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center select-none">
      <div className="w-[420px] bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white">
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-400" size={20} />
            <h3 className="font-bold text-lg text-slate-100">课堂提问 · 随机抽签</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="编辑名单"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 主展示区 */}
        {isEditing ? (
          <div className="my-5">
            <label className="text-xs text-slate-400 mb-1.5 block">
              输入名单（每行一个人名，或用逗号隔开）：
            </label>
            <textarea
              rows={6}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSaveNames}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Check size={16} /> 保存名单
              </button>
            </div>
          </div>
        ) : (
          <div className="my-8 flex flex-col items-center justify-center">
            {/* 名字大展示牌 */}
            <div
              className={`w-64 h-28 rounded-2xl flex items-center justify-center border-2 transition-all ${
                isRolling
                  ? 'border-amber-400 bg-amber-500/10 scale-105 shadow-amber-500/20 shadow-xl'
                  : 'border-blue-500/40 bg-slate-800/80 shadow-2xl'
              }`}
            >
              <span className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                {selectedName}
              </span>
            </div>

            <div className="text-xs text-slate-400 mt-4">
              候选池：共 <span className="text-blue-400 font-semibold">{names.length}</span> 人
            </div>

            {/* 抽签按钮 */}
            <button
              disabled={isRolling}
              onClick={startDraw}
              className={`mt-6 flex items-center gap-2 px-8 py-3 rounded-2xl text-base font-bold shadow-xl transition-all ${
                isRolling
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hover:scale-105 active:scale-95 shadow-blue-500/25'
              }`}
            >
              <Shuffle size={18} className={isRolling ? 'animate-spin' : ''} />
              {isRolling ? '正在抽选...' : '即刻抽取 (Space)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
