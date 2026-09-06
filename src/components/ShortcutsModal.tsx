import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  const { t, translations, locale } = useI18n();
  if (!isOpen) return null;

  const shortcutsList = translations[locale].shortcuts.items;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in font-sans select-none">
      <div className="w-full max-w-md bg-[#151724] border border-[#282b3e] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="px-5 py-3.5 border-b border-[#232536] flex items-center justify-between bg-[#181a28]">
          <div className="flex items-center gap-2 text-sky-400">
            <Keyboard size={18} />
            <span className="font-semibold text-slate-100 text-sm tracking-wide">
              {t('shortcuts.title')}
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
          {shortcutsList.map((item, idx) => (
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
            {t('shortcuts.macNotice')}
          </span>
          <button
            onClick={onClose}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
          >
            {t('shortcuts.btnGotIt')}
          </button>
        </div>
      </div>
    </div>
  );
};
