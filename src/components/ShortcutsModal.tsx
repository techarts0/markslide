import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const SHORTCUTS = [
    { key: 'Ctrl + B', desc: '展开 / 收起左侧文稿库抽屉 (Slide Explorer)' },
    { key: 'Ctrl + J / Ctrl + \\', desc: '展开 / 收起右侧 16:9 实时渲染视口' },
    { key: 'F5', desc: '进入沉浸式全屏放映模式' },
    { key: 'Ctrl + P', desc: '打印 / 导出 16:9 矢量级无边距 PDF' },
    { key: 'Ctrl + V', desc: '编辑器内直接粘贴剪贴板截图（自动压缩并嵌入）' },
    { key: '---', desc: '插入分页符（3个连字符拆分单页幻灯片）' },
    { key: '<!-- _class: lead -->', desc: '设置当前单页为大标题主页（居中醒目）' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in font-sans select-none">
      <div className="w-full max-w-md bg-[#151724] border border-[#282b3e] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="px-5 py-3.5 border-b border-[#232536] flex items-center justify-between bg-[#181a28]">
          <div className="flex items-center gap-2 text-sky-400">
            <Keyboard size={18} />
            <span className="font-semibold text-slate-100 text-sm tracking-wide">
              快捷键与排版技巧速查
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8a91a8] hover:text-slate-200 hover:bg-[#1f2235] rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* 快捷键列表 */}
        <div className="p-5 space-y-3">
          {SHORTCUTS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-1.5 border-b border-[#202232] last:border-0"
            >
              <span className="text-slate-300">{item.desc}</span>
              <kbd className="px-2 py-1 bg-[#1e2236] border border-[#2b2f46] rounded-md font-mono text-[11px] text-sky-300 font-semibold shadow-inner shrink-0 ml-3">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="px-5 py-3 border-t border-[#232536] bg-[#121420] flex items-center justify-between text-[11px] text-[#717894]">
          <span className="flex items-center gap-1 font-mono">
            <Command size={12} className="text-sky-400" />
            Mac 用户请使用 ⌘ Cmd 键替代 Ctrl
          </span>
          <button
            onClick={onClose}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};
