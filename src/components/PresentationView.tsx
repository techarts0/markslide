import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  PenTool,
  Radio,
  Timer,
  Shuffle,
  HelpCircle,
  X,
  Layers,
  FileText,
} from 'lucide-react';
import { LaserPointer } from './LaserPointer';
import { DrawingCanvas } from './DrawingCanvas';
import { PresentationTimer } from './PresentationTimer';
import { LuckyDraw } from './LuckyDraw';
import { slideCompiler } from '../marpEngine';
import { parseSlides, extractNotes } from '../utils/parseSlides';

interface PresentationViewProps {
  slidesHtml: string;
  slidesCss: string;
  totalSlides: number;
  initialSlideIndex?: number;
  onExit: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  slidesHtml,
  slidesCss,
  totalSlides,
  initialSlideIndex = 0,
  onExit,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlideIndex);
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [isPenActive, setIsPenActive] = useState(false);
  const [isBlackboard, setIsBlackboard] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isLuckyDrawOpen, setIsLuckyDrawOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | 'fade'>('fade');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideBoxRef = useRef<HTMLDivElement | null>(null);
  const printBoxRef = useRef<HTMLDivElement | null>(null);
  const hideControlsTimerRef = useRef<number | null>(null);

  // 解析并提取所有单个幻灯片，保留 Marp 完整的 div.marpit 与 svg 结构
  const parsedSlides = React.useMemo(() => {
    return parseSlides(slidesHtml);
  }, [slidesHtml]);

  // 提取当前单页的演讲者备注
  const currentNotes = React.useMemo(() => {
    return extractNotes(parsedSlides[currentSlide] || '');
  }, [parsedSlides, currentSlide]);

  const slideCount = parsedSlides.length > 0 ? parsedSlides.length : totalSlides;

  // 自适应 16:9 缩放计算
  const updateSlideScale = useCallback(() => {
    if (!slideBoxRef.current) return;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const targetW = 1280;
    const targetH = 720;

    const scaleW = winW / targetW;
    const scaleH = winH / targetH;
    const scale = Math.min(scaleW, scaleH) * 0.96; // 留一点边缘安全区

    slideBoxRef.current.style.transform = `scale(${scale})`;
  }, []);

  useEffect(() => {
    updateSlideScale();
    window.addEventListener('resize', updateSlideScale);
    return () => window.removeEventListener('resize', updateSlideScale);
  }, [updateSlideScale]);

  // 检查是否为暗黑主题
  const isDarkTheme = React.useMemo(() => {
    return slidesCss.includes('/* @theme business */') || slidesCss.includes('/* @theme tech-pm */');
  }, [slidesCss]);

  // Mermaid 渲染
  useEffect(() => {
    if (slideBoxRef.current) {
      slideCompiler.renderMermaidElements(slideBoxRef.current, isDarkTheme);
    }
  }, [currentSlide, slidesHtml, isDarkTheme]);

  // 独立全量打印为 16:9 PDF
  const handlePrint = useCallback(async () => {
    if (printBoxRef.current) {
      await slideCompiler.renderMermaidElements(printBoxRef.current, isDarkTheme);
    }
    window.print();
  }, [isDarkTheme]);

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const nextSlide = useCallback(() => {
    setSlideDirection('next');
    setCurrentSlide((prev) => Math.min(prev + 1, slideCount - 1));
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  // 鼠标移动浮出控制条，静止后淡出
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 2800);
  };

  // 全局键盘监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 弹窗处于编辑态时不拦截键盘
      if (document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') {
        return;
      }

      // 如果抽签工具或倒计时处于打开状态，隔离空格和方向键翻页，避免按键冲突
      if (isLuckyDrawOpen || isTimerOpen) {
        if (e.key === 'Escape') {
          if (isLuckyDrawOpen) setIsLuckyDrawOpen(false);
          if (isTimerOpen) setIsTimerOpen(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(slideCount - 1);
          break;
        case 'l':
        case 'L':
          setIsLaserActive((prev) => !prev);
          break;
        case 'p':
        case 'P':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handlePrint();
          } else {
            setIsPenActive((prev) => !prev);
          }
          break;
        case 'b':
        case 'B':
          setIsBlackboard((prev) => !prev);
          break;
        case 't':
        case 'T':
          setIsTimerOpen((prev) => !prev);
          break;
        case 'r':
        case 'R':
          setIsLuckyDrawOpen((prev) => !prev);
          break;
        case 'n':
        case 'N':
          setIsNotesOpen((prev) => !prev);
          break;
        case 'h':
        case 'H':
        case '?':
          setIsHelpOpen((prev) => !prev);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Escape':
          if (isPenActive || isBlackboard) {
            setIsPenActive(false);
            setIsBlackboard(false);
          } else if (isTimerOpen) {
            setIsTimerOpen(false);
          } else if (isLuckyDrawOpen) {
            setIsLuckyDrawOpen(false);
          } else if (isNotesOpen) {
            setIsNotesOpen(false);
          } else if (isHelpOpen) {
            setIsHelpOpen(false);
          } else {
            onExit();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    nextSlide,
    prevSlide,
    slideCount,
    isPenActive,
    isBlackboard,
    isTimerOpen,
    isLuckyDrawOpen,
    isNotesOpen,
    isHelpOpen,
    onExit,
    handlePrint,
  ]);

  return (
    <>
      {/* 专用打印与 PDF 导出容器：每页严格 16:9 独立输出 */}
      <div ref={printBoxRef} className="hidden print:block marp-print-container">
        {parsedSlides.map((slideHtml, index) => (
          <div
            key={index}
            className="marp-print-slide"
            dangerouslySetInnerHTML={{ __html: slideHtml }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 bg-[#090d16] text-white flex items-center justify-center overflow-hidden select-none z-50 screen-only no-print print:hidden"
      >
      {/* 注入 Marp 主题生成的 CSS 样式 */}
      <style>{slidesCss}</style>

      {/* 幻灯片放映视口容器（标准 16:9，1280x720 基准缩放） */}
      <div
        ref={slideBoxRef}
        className="w-[1280px] h-[720px] shrink-0 rounded-xl shadow-2xl overflow-hidden flex items-center justify-center transition-transform duration-150 origin-center bg-transparent"
      >
        <div
          key={currentSlide}
          className={`w-full h-full ${
            slideDirection === 'next'
              ? 'animate-slide-next'
              : slideDirection === 'prev'
              ? 'animate-slide-prev'
              : 'animate-slide-in'
          } [&>div.marpit]:w-full [&>div.marpit]:h-full [&_svg[data-marpit-svg]]:w-full [&_svg[data-marpit-svg]]:h-full flex items-center justify-center`}
          dangerouslySetInnerHTML={{
            __html:
              parsedSlides[currentSlide] ||
              '<div class="marpit"><section><h1>未找到幻灯片</h1></section></div>',
          }}
        />
      </div>

      {/* 演讲者备忘浮层 (按 N 键) */}
      {isNotesOpen && (
        <div className="fixed top-6 right-6 w-80 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl z-50 text-slate-200 backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <FileText size={15} /> 演讲者备忘 (第 {currentSlide + 1} 页)
            </span>
            <button onClick={() => setIsNotesOpen(false)} className="p-1 hover:text-white rounded-md">
              <X size={14} />
            </button>
          </div>
          <div className="mt-3 text-xs leading-relaxed text-slate-300 max-h-60 overflow-y-auto font-sans">
            {currentNotes ? (
              <p className="whitespace-pre-wrap">{currentNotes}</p>
            ) : (
              <span className="text-slate-500 italic">本页未设置演讲者备忘 (可用 &lt;!-- note: 提示内容 --&gt; 添加)</span>
            )}
          </div>
        </div>
      )}

      {/* 激光笔图层 */}
      <LaserPointer isActive={isLaserActive} />

      {/* 画笔与黑板图层 */}
      <DrawingCanvas
        isActive={isPenActive}
        isBlackboard={isBlackboard}
        onClose={() => {
          setIsPenActive(false);
          setIsBlackboard(false);
        }}
        onToggleBlackboard={() => setIsBlackboard((prev) => !prev)}
      />

      {/* 倒计时小组件 */}
      <PresentationTimer isOpen={isTimerOpen} onClose={() => setIsTimerOpen(false)} />

      {/* 提问抽签互动小组件 */}
      <LuckyDraw isOpen={isLuckyDrawOpen} onClose={() => setIsLuckyDrawOpen(false)} />

      {/* 底部沉浸式灵动浮岛控制栏 */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/70 rounded-full px-4 py-1.5 flex items-center gap-3 shadow-2xl transition-all duration-300 z-50 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* 翻页导航与页码 */}
        <div className="flex items-center gap-2 border-r border-slate-700/80 pr-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-1.5 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-full text-slate-300 hover:text-white transition-colors"
            title="上一页 (← / PageUp)"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs font-mono font-semibold px-2 text-slate-300">
            {currentSlide + 1} / {slideCount}
          </span>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slideCount - 1}
            className="p-1.5 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent rounded-full text-slate-300 hover:text-white transition-colors"
            title="下一页 (→ / Space)"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 核心教学与演讲互动工具开关：纯 ICON + 悬浮 Tips */}
        <div className="flex items-center gap-1 border-r border-slate-700/80 pr-3">
          <button
            onClick={() => setIsLaserActive(!isLaserActive)}
            className={`p-2 rounded-xl transition-all ${
              isLaserActive
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="激光笔 (L)"
          >
            <Radio size={17} />
          </button>

          <button
            onClick={() => setIsPenActive(!isPenActive)}
            className={`p-2 rounded-xl transition-all ${
              isPenActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="画笔批注 (P)"
          >
            <PenTool size={17} />
          </button>

          <button
            onClick={() => setIsBlackboard(!isBlackboard)}
            className={`p-2 rounded-xl transition-all ${
              isBlackboard
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="黑板板书 (B)"
          >
            <Layers size={17} />
          </button>

          <button
            onClick={() => setIsTimerOpen(!isTimerOpen)}
            className={`p-2 rounded-xl transition-all ${
              isTimerOpen
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="演讲倒计时 (T)"
          >
            <Timer size={17} />
          </button>

          <button
            onClick={() => setIsLuckyDrawOpen(!isLuckyDrawOpen)}
            className={`p-2 rounded-xl transition-all ${
              isLuckyDrawOpen
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="课堂抽签 (R)"
          >
            <Shuffle size={17} />
          </button>

          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className={`p-2 rounded-xl transition-all ${
              isNotesOpen
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="演讲者备忘 (N)"
          >
            <FileText size={17} />
          </button>
        </div>

        {/* 快捷键帮助与全屏 */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsHelpOpen(true)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="快捷键指南 (H / ?)"
          >
            <HelpCircle size={16} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="全屏放映 (F)"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
          <button
            onClick={onExit}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
            title="退出放映 (Esc)"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* 快捷键帮助模态框 */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-[480px] bg-slate-900 border border-slate-700/90 rounded-3xl p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg text-slate-100">演讲与放映快捷键指南</h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3.5 my-5 text-sm">
              {[
                { key: 'Space / → / PageDown', desc: '下一页幻灯片' },
                { key: '← / PageUp', desc: '上一页幻灯片' },
                { key: 'L', desc: '开启/关闭 红色激光笔' },
                { key: 'P', desc: '唤出/关闭 画笔批注' },
                { key: 'B', desc: '一键黑板板书模式' },
                { key: 'T', desc: '讨论与演讲倒计时' },
                { key: 'R', desc: '互动点名 / 提问抽签' },
                { key: 'N', desc: '开启/关闭 演讲者备忘' },
                { key: 'F', desc: '切换全屏模式' },
                { key: 'Esc', desc: '退出当前工具或放映' },
                { key: 'H / ?', desc: '查看此帮助菜单' },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/50"
                >
                  <kbd className="font-mono text-xs text-blue-400 font-bold">{item.key}</kbd>
                  <span className="text-xs text-slate-300 mt-1">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold transition-colors"
              >
                我知道了 (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);
};
