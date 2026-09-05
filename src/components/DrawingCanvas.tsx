import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Trash2, Undo2, Eraser, PenTool, X } from 'lucide-react';

interface DrawingCanvasProps {
  isActive: boolean;
  isBlackboard: boolean;
  onClose: () => void;
  onToggleBlackboard: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  size: number;
  isEraser: boolean;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  isActive,
  isBlackboard,
  onClose,
  onToggleBlackboard,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444');
  const [size, setSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);

  // 初始化画布尺寸自适应窗口
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redrawAll();
  }, [strokes]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;
    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }, [strokes, currentStroke]);

  useEffect(() => {
    redrawAll();
  }, [strokes, currentStroke, redrawAll]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive && !isBlackboard) return;
    setIsDrawing(true);
    const newStroke: Stroke = {
      points: [{ x: e.clientX, y: e.clientY }],
      color: isBlackboard && color === '#ef4444' ? '#ffffff' : color,
      size,
      isEraser,
    };
    setCurrentStroke(newStroke);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    const updated = {
      ...currentStroke,
      points: [...currentStroke.points, { x: e.clientX, y: e.clientY }],
    };
    setCurrentStroke(updated);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke && currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
  };

  const clearAll = () => {
    setStrokes([]);
    setCurrentStroke(null);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const undo = useCallback(() => {
    setStrokes((prev) => prev.slice(0, -1));
  }, []);

  // 监听 Ctrl+Z / Meta+Z 撤销笔画
  useEffect(() => {
    if (!isActive && !isBlackboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        e.stopPropagation();
        undo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isBlackboard, undo]);

  if (!isActive && !isBlackboard) return null;

  return (
    <div
      className={`fixed inset-0 z-40 transition-colors duration-200 ${
        isBlackboard ? 'bg-[#1b2b23]' : 'bg-transparent pointer-events-auto'
      }`}
      style={{
        cursor: isEraser ? 'cell' : 'crosshair',
        backgroundImage: isBlackboard
          ? 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)'
          : 'none',
        backgroundSize: '24px 24px',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="w-full h-full block"
      />

      {/* 画笔工具浮动控制栏 */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-5 py-2.5 flex items-center gap-3 shadow-2xl z-50 text-white select-none">
        <div className="flex items-center gap-2 border-r border-slate-700 pr-3">
          <button
            onClick={() => setIsEraser(false)}
            className={`p-1.5 rounded-lg transition-colors ${
              !isEraser ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="画笔"
          >
            <PenTool size={18} />
          </button>
          <button
            onClick={() => setIsEraser(true)}
            className={`p-1.5 rounded-lg transition-colors ${
              isEraser ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="橡皮擦"
          >
            <Eraser size={18} />
          </button>
        </div>

        {/* 颜色选择 */}
        {!isEraser && (
          <div className="flex items-center gap-1.5 border-r border-slate-700 pr-3">
            {[
              { label: '红', val: '#ef4444' },
              { label: '黄', val: '#eab308' },
              { label: '绿', val: '#22c55e' },
              { label: '蓝', val: '#3b82f6' },
              { label: '白', val: '#ffffff' },
            ].map((c) => (
              <button
                key={c.val}
                onClick={() => setColor(c.val)}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  color === c.val ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-80'
                }`}
                style={{ backgroundColor: c.val }}
                title={c.label}
              />
            ))}
          </div>
        )}

        {/* 笔触大小 */}
        <div className="flex items-center gap-2 border-r border-slate-700 pr-3">
          <span className="text-xs text-slate-400">粗细</span>
          <input
            type="range"
            min="2"
            max="16"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-16 accent-blue-500 cursor-pointer"
          />
        </div>

        {/* 撤销与清空 */}
        <div className="flex items-center gap-1 border-r border-slate-700 pr-3">
          <button
            onClick={undo}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="撤销 (Ctrl+Z)"
          >
            <Undo2 size={18} />
          </button>
          <button
            onClick={clearAll}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="清空画板 (C)"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* 黑板与退出 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleBlackboard}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
              isBlackboard
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isBlackboard ? '切回课件' : '黑板模式 (B)'}
          </button>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="关闭画笔 (P/Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
