import React, { useState, useEffect, useRef } from 'react';
import { FolderPlus, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (folderName: string) => void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useI18n();
  const [folderName, setFolderName] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const defaultName = t('explorer.defaultFolderName') || '新文件夹';
      setFolderName(defaultName);
      setHasError(false);
      // 延迟微量以确保 DOM 挂载后自动聚焦并全选文字
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
    }
  }, [isOpen, t]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = folderName.trim();
    if (!trimmed) {
      setHasError(true);
      inputRef.current?.focus();
      return;
    }
    onConfirm(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 select-none font-sans"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      {/* 磨砂卡片主体 */}
      <div
        className="w-full max-w-sm bg-[#161826] border border-[#26293f] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col scale-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题栏 */}
        <div className="px-5 pt-5 pb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-sky-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <FolderPlus size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 tracking-wide">
                {t('explorer.createFolderTitle')}
              </h3>
              <p className="text-[11px] text-[#8a91a8] mt-0.5">
                {t('explorer.createFolderDesc')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#717894] hover:text-slate-200 hover:bg-[#202336] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* 表单输入区 */}
        <form onSubmit={handleSubmit} className="px-5 py-3">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-[#9da5c0]">
              {t('explorer.folderNameLabel')}
            </label>
            <input
              ref={inputRef}
              type="text"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                if (hasError) setHasError(false);
              }}
              placeholder={t('explorer.folderNamePlaceholder')}
              className={`w-full bg-[#10111a] text-sm text-slate-100 placeholder-[#4e5572] px-3.5 py-2 rounded-xl border font-sans focus:outline-none transition-all ${
                hasError
                  ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30 ring-1 ring-rose-500/50'
                  : 'border-[#26293f] focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
              }`}
            />
            {hasError && (
              <p className="text-[11px] text-rose-400 animate-pulse mt-1">
                {t('explorer.folderNameLabel')} 不能为空
              </p>
            )}
          </div>

          {/* 底部操作按钮 */}
          <div className="flex items-center justify-end gap-2.5 mt-6 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-[#26293f] text-xs font-medium text-[#8a91a8] hover:text-slate-200 hover:bg-[#1f2235] transition-colors"
            >
              {t('explorer.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-semibold shadow-md shadow-sky-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <FolderPlus size={14} />
              <span>{t('explorer.confirm')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
