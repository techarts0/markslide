import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Layers,
  Search,
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  Trash2,
  FilePlus,
  StickyNote,
  ArrowUpToLine,
  ArrowDownToLine,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { parseSlideOutlines, type SlideOutlineItem } from '../utils/slideOutline';

interface SlideOutlineProps {
  isOpen: boolean;
  onClose: () => void;
  markdown: string;
  activeSlideIndex: number;
  onSelectSlide: (slide: SlideOutlineItem) => void;
  onMoveSlide: (fromIndex: number, toIndex: number) => void;
  onInsertSlideAfter: (afterIndex: number) => void;
  onDeleteSlide: (targetIndex: number) => void;
  onAppendSlide: () => void;
}

export const SlideOutline: React.FC<SlideOutlineProps> = ({
  isOpen,
  onClose,
  markdown,
  activeSlideIndex,
  onSelectSlide,
  onMoveSlide,
  onInsertSlideAfter,
  onDeleteSlide,
  onAppendSlide,
}) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // 实时解析大纲项
  const outlines = useMemo(() => parseSlideOutlines(markdown), [markdown]);

  // 根据搜索关键字过滤
  const filteredOutlines = useMemo(() => {
    if (!searchQuery.trim()) return outlines;
    const query = searchQuery.toLowerCase().trim();
    return outlines.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        (item.notes && item.notes.toLowerCase().includes(query)) ||
        item.badges.some((b) => b.toLowerCase().includes(query))
    );
  }, [outlines, searchQuery]);

  // 当当前激活幻灯片变化时，平滑将对应卡片滚入大纲视野
  useEffect(() => {
    if (isOpen && itemRefs.current[activeSlideIndex]) {
      itemRefs.current[activeSlideIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeSlideIndex, isOpen]);

  if (!isOpen) return null;

  const renderBadge = (badge: string) => {
    switch (badge) {
      case 'lead':
        return (
          <span key={badge} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
            {t('outline.badges.lead')}
          </span>
        );
      case 'table':
        return (
          <span key={badge} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-500/15 text-blue-400 border border-blue-500/30">
            {t('outline.badges.table')}
          </span>
        );
      case 'cards':
        return (
          <span key={badge} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-violet-500/15 text-violet-400 border border-violet-500/30">
            {t('outline.badges.cards')}
          </span>
        );
      case 'steps':
        return (
          <span key={badge} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            {t('outline.badges.steps')}
          </span>
        );
      case 'stats':
        return (
          <span key={badge} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {t('outline.badges.stats')}
          </span>
        );
      case 'mermaid':
        return (
          <span key={badge} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/30">
            {t('outline.badges.mermaid')}
          </span>
        );
      case 'code':
        return (
          <span key={badge} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            {t('outline.badges.code')}
          </span>
        );
      case 'notes':
        return null;
      default:
        return null;
    }
  };

  return (
    <aside className="w-64 border-r border-[#232536] bg-[#141624] flex flex-col h-full shrink-0 select-none z-10 transition-all font-sans">
      {/* 头部标题与快捷按钮 */}
      <div className="h-9 px-3 border-b border-[#232536] bg-[#161828] flex items-center justify-between text-xs text-[#8a91a8] shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <Layers size={14} className="text-sky-400 shrink-0" />
          <span className="font-semibold text-slate-200 tracking-wider text-[11px] uppercase font-mono truncate">
            {t('outline.title')}
          </span>
          <span className="text-[10px] text-[#656c88] font-mono shrink-0">
            ({t('outline.slideCount', { count: outlines.length })})
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onAppendSlide}
            className="p-1 hover:text-sky-400 hover:bg-[#1f2235] rounded transition-colors text-[#8a91a8]"
            title={t('outline.newSlide')}
          >
            <FilePlus size={13} />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:text-slate-200 hover:bg-[#1f2235] rounded transition-colors text-[#717894]"
            title={t('outline.collapse')}
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* 搜索/过滤输入条 */}
      <div className="p-2 border-b border-[#232536] bg-[#131422]">
        <div className="relative flex items-center">
          <Search size={12} className="absolute left-2.5 text-[#5f6784] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('outline.searchPlaceholder')}
            className="w-full bg-[#181a28] text-xs text-slate-100 placeholder-[#525975] pl-7 pr-7 py-1 rounded-lg border border-[#232536] focus:border-sky-500 focus:outline-none font-sans transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-[#717894] hover:text-slate-200 p-0.5"
            >
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* 大纲列表滚动展示区 */}
      <div className="flex-1 overflow-y-auto px-2 py-2 no-scrollbar space-y-1">
        {filteredOutlines.map((item) => {
          const isActive = item.index === activeSlideIndex;
          const isFirst = item.index === 0;
          const isLast = item.index === outlines.length - 1;

          return (
            <div
              key={item.index}
              ref={(el) => {
                itemRefs.current[item.index] = el;
              }}
              onClick={() => onSelectSlide(item)}
              className={`group relative flex flex-col p-2 rounded-xl cursor-pointer transition-all border ${
                isActive
                  ? 'bg-[#1a1d2e] border-sky-500/50 shadow-sm shadow-sky-950/40 text-slate-100'
                  : 'bg-[#151726]/60 hover:bg-[#191c2b] border-[#222538] hover:border-[#2f334d] text-slate-300'
              }`}
            >
              {/* 头部：页码 + 标题 + 快捷操作 */}
              <div className="flex items-center justify-between gap-1.5 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  {/* 页码徽标 */}
                  <span
                    className={`shrink-0 w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-semibold border ${
                      isActive
                        ? 'bg-sky-400 text-slate-950 border-sky-400'
                        : 'bg-[#12131d] text-[#8a91a8] border-[#26293d] group-hover:border-[#383d5a]'
                    }`}
                  >
                    {item.pageNumber}
                  </span>

                  {/* 标题 */}
                  <span
                    className={`truncate text-xs font-medium ${
                      isActive ? 'text-sky-300' : 'text-slate-200 group-hover:text-white'
                    }`}
                    title={item.title}
                  >
                    {item.title}
                  </span>
                </div>

                {/* 悬浮快捷操作组 */}
                <div
                  className="hidden group-hover:flex items-center gap-0.5 shrink-0 bg-[#12131f] border border-[#272b42] rounded-lg p-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    disabled={isFirst}
                    onClick={() => onMoveSlide(item.index, item.index - 1)}
                    className="p-1 hover:text-sky-400 hover:bg-[#1e2238] rounded disabled:opacity-20 text-[#8a91a8] transition-colors"
                    title={t('outline.moveUp')}
                  >
                    <ChevronUp size={11} />
                  </button>
                  <button
                    disabled={isLast}
                    onClick={() => onMoveSlide(item.index, item.index + 1)}
                    className="p-1 hover:text-sky-400 hover:bg-[#1e2238] rounded disabled:opacity-20 text-[#8a91a8] transition-colors"
                    title={t('outline.moveDown')}
                  >
                    <ChevronDown size={11} />
                  </button>
                  <button
                    onClick={() => onInsertSlideAfter(item.index)}
                    className="p-1 hover:text-emerald-400 hover:bg-[#1e2238] rounded text-[#8a91a8] transition-colors"
                    title={t('outline.insertAfter')}
                  >
                    <Plus size={11} />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          t('outline.deleteConfirm', {
                            page: item.pageNumber,
                            title: item.title,
                          })
                        )
                      ) {
                        onDeleteSlide(item.index);
                      }
                    }}
                    className="p-1 hover:text-rose-400 hover:bg-[#1e2238] rounded text-[#8a91a8] transition-colors"
                    title={t('outline.deleteSlide')}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>

              {/* 摘要简析 */}
              {item.excerpt && (
                <p className="text-[11px] text-[#717894] truncate mt-1 pl-6">
                  {item.excerpt}
                </p>
              )}

              {/* 底部特征 Badge 栏与演播备忘 */}
              <div className="flex items-center justify-between gap-1 mt-1.5 pl-6">
                <div className="flex items-center gap-1 flex-wrap">
                  {item.badges.map((b) => renderBadge(b))}
                </div>

                {item.notes && (
                  <div
                    className="text-amber-400/80 hover:text-amber-300 flex items-center gap-0.5 shrink-0"
                    title={`演播者备忘: ${item.notes}`}
                  >
                    <StickyNote size={10} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredOutlines.length === 0 && (
          <div className="py-8 text-center text-xs text-[#717894]">
            {t('outline.empty')}
          </div>
        )}
      </div>

      {/* 底部状态条 */}
      <div className="h-7 px-3 border-t border-[#232536] bg-[#121420] flex items-center justify-between text-[11px] text-[#717894] font-mono shrink-0">
        <span>
          {t('outline.currentStatus', {
            current: activeSlideIndex + 1,
            total: outlines.length,
          })}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => outlines[0] && onSelectSlide(outlines[0])}
            className="p-1 hover:text-sky-400 hover:bg-[#1a1c2e] rounded transition-colors"
            title="直达文首 (Slide 1)"
          >
            <ArrowUpToLine size={11} />
          </button>
          <button
            onClick={() =>
              outlines[outlines.length - 1] &&
              onSelectSlide(outlines[outlines.length - 1])
            }
            className="p-1 hover:text-sky-400 hover:bg-[#1a1c2e] rounded transition-colors"
            title="直达文末"
          >
            <ArrowDownToLine size={11} />
          </button>
        </div>
      </div>
    </aside>
  );
};
