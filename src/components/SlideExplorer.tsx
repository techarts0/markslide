import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Plus,
  FolderPlus,
  Trash2,
  Edit2,
  X,
  FilePlus,
} from 'lucide-react';
import type { ExplorerData, FolderItem, SlideDoc } from '../types/explorer';
import { useI18n } from '../i18n/I18nContext';

interface SlideExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ExplorerData;
  activeSlideId: string | null;
  onSelectSlide: (slide: SlideDoc) => void;
  onCreateSlide: (folderId?: string) => void;
  onCreateFolder: (parentFolderId?: string) => void;
  onDeleteSlide: (slideId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onRenameSlide: (slideId: string, newTitle: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
  onToggleFolder: (folderId: string) => void;
}

export const SlideExplorer: React.FC<SlideExplorerProps> = ({
  isOpen,
  onClose,
  data,
  activeSlideId,
  onSelectSlide,
  onCreateSlide,
  onCreateFolder,
  onDeleteSlide,
  onDeleteFolder,
  onRenameSlide,
  onRenameFolder,
  onToggleFolder,
}) => {
  const { t } = useI18n();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  if (!isOpen) return null;

  const handleStartRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const handleSaveRename = (type: 'folder' | 'slide') => {
    if (!editingId || !editingName.trim()) {
      setEditingId(null);
      return;
    }
    if (type === 'folder') {
      onRenameFolder(editingId, editingName.trim());
    } else {
      onRenameSlide(editingId, editingName.trim());
    }
    setEditingId(null);
  };

  // 递归渲染文件夹节点
  const renderFolder = (folder: FolderItem, depth = 0) => {
    const isEditing = editingId === folder.id;
    const paddingLeft = depth * 14 + 6;

    return (
      <div key={folder.id} className="select-none text-xs font-sans">
        {/* 文件夹头部行 */}
        <div
          style={{ paddingLeft: `${paddingLeft}px` }}
          className="group flex items-center justify-between py-1.5 pr-2 rounded-md hover:bg-[#1a1d2e] cursor-pointer transition-colors text-[#c8cde0]"
          onClick={() => onToggleFolder(folder.id)}
        >
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="text-[#717894] hover:text-slate-300 transition-transform">
              {folder.isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </span>
            <span className="text-amber-400 shrink-0">
              {folder.isOpen ? <FolderOpen size={14} /> : <Folder size={14} />}
            </span>
            {isEditing ? (
              <input
                type="text"
                autoFocus
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleSaveRename('folder')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveRename('folder');
                  if (e.key === 'Escape') setEditingId(null);
                }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#181a28] text-slate-100 px-1 py-0.5 rounded border border-sky-500 text-xs w-full focus:outline-none"
              />
            ) : (
              <span className="truncate font-medium text-slate-200" title={folder.name}>
                {folder.name}
              </span>
            )}
          </div>

          {/* 文件夹快捷操作 */}
          <div
            className="hidden group-hover:flex items-center gap-1 shrink-0 ml-1 text-slate-400"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onCreateSlide(folder.id)}
              className="p-1 hover:text-sky-400 hover:bg-[#23273c] rounded"
              title={t('explorer.newSlideInFolder')}
            >
              <Plus size={12} />
            </button>
            <button
              onClick={() => onCreateFolder(folder.id)}
              className="p-1 hover:text-amber-400 hover:bg-[#23273c] rounded"
              title={t('explorer.newSubFolder')}
            >
              <FolderPlus size={12} />
            </button>
            <button
              onClick={() => handleStartRename(folder.id, folder.name)}
              className="p-1 hover:text-sky-400 hover:bg-[#23273c] rounded"
              title={t('explorer.rename')}
            >
              <Edit2 size={11} />
            </button>
            <button
              onClick={() => {
                if (window.confirm(t('explorer.deleteFolderConfirm', { name: folder.name }))) {
                  onDeleteFolder(folder.id);
                }
              }}
              className="p-1 hover:text-rose-400 hover:bg-[#23273c] rounded"
              title={t('explorer.delete')}
            >
              <Trash2 size={11} />
            </button>
          </div>
        </div>

        {/* 展开的子文件夹与子文稿 */}
        {folder.isOpen && (
          <div className="border-l border-[#232536] ml-3.5 my-0.5">
            {folder.folders.map((sub) => renderFolder(sub, depth + 1))}
            {folder.slides.map((slide) => renderSlide(slide, depth + 1))}
            {folder.folders.length === 0 && folder.slides.length === 0 && (
              <div
                style={{ paddingLeft: `${(depth + 1) * 14 + 14}px` }}
                className="py-1 text-[11px] text-[#636b85] italic"
              >
                {t('explorer.emptyFolder')}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // 渲染单个文稿
  const renderSlide = (slide: SlideDoc, depth = 0) => {
    const isActive = activeSlideId === slide.id;
    const isEditing = editingId === slide.id;
    const paddingLeft = depth * 14 + 10;

    return (
      <div
        key={slide.id}
        style={{ paddingLeft: `${paddingLeft}px` }}
        className={`group flex items-center justify-between py-1.5 pr-2 my-0.5 rounded-md cursor-pointer transition-colors text-xs font-sans select-none ${
          isActive
            ? 'bg-[#1f2338] text-sky-400 font-medium border-l-2 border-sky-400 pl-[8px]'
            : 'text-[#9aa0b8] hover:bg-[#1a1d2e] hover:text-[#f0f2fa]'
        }`}
        onClick={() => onSelectSlide(slide)}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <FileText size={13} className={isActive ? 'text-sky-400 shrink-0' : 'text-[#717894] shrink-0'} />
          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onBlur={() => handleSaveRename('slide')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveRename('slide');
                if (e.key === 'Escape') setEditingId(null);
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#181a28] text-slate-100 px-1 py-0.5 rounded border border-sky-500 text-xs w-full focus:outline-none"
            />
          ) : (
            <span className="truncate" title={slide.title}>
              {slide.title}
            </span>
          )}
        </div>

        {/* 文稿快捷操作 */}
        <div
          className="hidden group-hover:flex items-center gap-1 shrink-0 ml-1 text-[#717894]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleStartRename(slide.id, slide.title)}
            className="p-1 hover:text-sky-400 hover:bg-[#23273c] rounded"
            title={t('explorer.rename')}
          >
            <Edit2 size={11} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(t('explorer.deleteSlideConfirm', { title: slide.title }))) {
                onDeleteSlide(slide.id);
              }
            }}
            className="p-1 hover:text-rose-400 hover:bg-[#23273c] rounded"
            title={t('explorer.delete')}
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <aside className="w-64 border-r border-[#232536] bg-[#141624] flex flex-col h-full shrink-0 select-none z-10 transition-all">
      {/* Explorer 头部 */}
      <div className="h-9 px-3 border-b border-[#232536] bg-[#161828] flex items-center justify-between text-xs text-[#8a91a8] shrink-0">
        <span className="font-semibold text-slate-200 tracking-wider text-[11px] uppercase font-mono flex items-center gap-1.5">
          {t('explorer.title')}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onCreateSlide()}
            className="p-1 hover:text-sky-400 hover:bg-[#1f2235] rounded transition-colors text-[#8a91a8]"
            title={t('explorer.newSlide')}
          >
            <FilePlus size={13} />
          </button>
          <button
            onClick={() => onCreateFolder()}
            className="p-1 hover:text-amber-400 hover:bg-[#1f2235] rounded transition-colors text-[#8a91a8]"
            title={t('explorer.newFolder')}
          >
            <FolderPlus size={13} />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:text-slate-200 hover:bg-[#1f2235] rounded transition-colors text-[#717894]"
            title={t('explorer.collapse')}
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* 目录树展示区 */}
      <div className="flex-1 overflow-y-auto px-2 py-2 no-scrollbar space-y-0.5">
        {/* 文件夹部分 */}
        {data.folders.map((folder) => renderFolder(folder, 0))}

        {/* 根目录文稿部分 */}
        {data.slides.map((slide) => renderSlide(slide, 0))}

        {data.folders.length === 0 && data.slides.length === 0 && (
          <div className="py-8 text-center text-xs text-[#717894]">
            {t('explorer.emptyList')}
          </div>
        )}
      </div>

      {/* 底部极简状态指示 */}
      <div className="h-7 px-3 border-t border-[#232536] bg-[#121420] flex items-center justify-between text-[11px] text-[#717894] font-mono">
        <span>{t('explorer.cloudReady')}</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          {t('explorer.localReady')}
        </span>
      </div>
    </aside>
  );
};
