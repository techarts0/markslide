import React from 'react';
import {
  Files,
  Search,
  Layers,
  Palette,
  Crown,
  Keyboard,
  User,
  Lock,
} from 'lucide-react';
import type { AuthUser } from '../types/explorer';

export type ActivityTab = 'explorer' | 'search' | 'outline' | 'themes' | null;

interface ActivityBarProps {
  activeTab: ActivityTab;
  onTabChange: (tab: ActivityTab) => void;
  currentUser: AuthUser | null;
  onOpenAuth: () => void;
  onOpenShortcuts: () => void;
  onOpenSubscription: () => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  onOpenAuth,
  onOpenShortcuts,
  onOpenSubscription,
}) => {
  const isLocked = !currentUser;

  const handleItemClick = (tab: ActivityTab) => {
    // 未登录时锁死云端功能，直接拦截并唤出登录窗口
    if (isLocked) {
      onOpenAuth();
      return;
    }

    if (activeTab === tab) {
      onTabChange(null);
    } else {
      onTabChange(tab);
    }
  };

  const handleSubscriptionClick = () => {
    if (isLocked) {
      onOpenAuth();
    } else {
      onOpenSubscription();
    }
  };

  return (
    <aside className="w-12 bg-[#11121c] border-r border-[#232536] flex flex-col justify-between items-center py-2.5 shrink-0 z-30 select-none">
      {/* 顶部主工作台云端功能区 (未登录时统一锁死) */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {/* 未登录锁死状态提示小标签 */}
        {isLocked && (
          <div
            onClick={onOpenAuth}
            className="w-full flex flex-col items-center py-1 mb-0.5 cursor-pointer text-amber-400/90 hover:text-amber-300 transition-colors group relative"
            title="云端功能已锁定 · 点击登录解锁"
          >
            <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-sm">
              <Lock size={12} className="text-amber-400" />
            </div>
            <div className="absolute left-12 top-1 px-2.5 py-1 bg-[#171927] text-amber-300 text-xs rounded-md shadow-xl border border-amber-500/30 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              云端功能已锁定 · 点击登录解锁
            </div>
          </div>
        )}

        {/* 1. 云端文稿库 Explorer */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={() => handleItemClick('explorer')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all relative ${
              isLocked
                ? 'text-[#636b85] hover:text-[#9ea6c4] hover:bg-[#1a1c2b]'
                : activeTab === 'explorer'
                ? 'text-sky-400 bg-[#1d2030]'
                : 'text-[#8a91a8] hover:text-[#e2e5f2] hover:bg-[#1a1c2b]'
            }`}
          >
            {activeTab === 'explorer' && !isLocked && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] bg-sky-400 rounded-r-full" />
            )}
            <Files size={18} />
            {isLocked && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#11121c] border border-amber-500/50 flex items-center justify-center">
                <Lock size={8} className="text-amber-400" />
              </span>
            )}
          </button>
          {/* Tooltip */}
          <div className="absolute left-12 top-1.5 px-2.5 py-1 bg-[#171927] text-[#e2e5f2] text-xs rounded-md shadow-xl border border-[#2b2e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {isLocked ? (
              <span className="text-amber-400 font-medium">
                云端文稿库 · <span className="underline">登录解锁</span>
              </span>
            ) : (
              <>
                文稿库 · Explorer <span className="text-[#636b85] font-mono text-[10px] ml-1">(Ctrl+B)</span>
              </>
            )}
          </div>
        </div>

        {/* 2. 全局大纲与幻灯片导航 Outline */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={() => handleItemClick('outline')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all relative ${
              isLocked
                ? 'text-[#636b85] hover:text-[#9ea6c4] hover:bg-[#1a1c2b]'
                : activeTab === 'outline'
                ? 'text-sky-400 bg-[#1d2030]'
                : 'text-[#8a91a8] hover:text-[#e2e5f2] hover:bg-[#1a1c2b]'
            }`}
          >
            {activeTab === 'outline' && !isLocked && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] bg-sky-400 rounded-r-full" />
            )}
            <Layers size={18} />
            {isLocked && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#11121c] border border-amber-500/50 flex items-center justify-center">
                <Lock size={8} className="text-amber-400" />
              </span>
            )}
          </button>
          <div className="absolute left-12 top-1.5 px-2.5 py-1 bg-[#171927] text-[#e2e5f2] text-xs rounded-md shadow-xl border border-[#2b2e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {isLocked ? (
              <span className="text-amber-400 font-medium">幻灯片大纲 · 登录解锁</span>
            ) : (
              '幻灯片大纲 · Outline'
            )}
          </div>
        </div>

        {/* 3. 快速搜索 Search */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={() => handleItemClick('search')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all relative ${
              isLocked
                ? 'text-[#636b85] hover:text-[#9ea6c4] hover:bg-[#1a1c2b]'
                : activeTab === 'search'
                ? 'text-sky-400 bg-[#1d2030]'
                : 'text-[#8a91a8] hover:text-[#e2e5f2] hover:bg-[#1a1c2b]'
            }`}
          >
            {activeTab === 'search' && !isLocked && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] bg-sky-400 rounded-r-full" />
            )}
            <Search size={18} />
            {isLocked && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#11121c] border border-amber-500/50 flex items-center justify-center">
                <Lock size={8} className="text-amber-400" />
              </span>
            )}
          </button>
          <div className="absolute left-12 top-1.5 px-2.5 py-1 bg-[#171927] text-[#e2e5f2] text-xs rounded-md shadow-xl border border-[#2b2e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {isLocked ? (
              <span className="text-amber-400 font-medium">云端文稿搜索 · 登录解锁</span>
            ) : (
              '云端文稿搜索 · Search'
            )}
          </div>
        </div>

        {/* 4. 主题预设与模板市场 Themes */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={() => handleItemClick('themes')}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all relative ${
              isLocked
                ? 'text-[#636b85] hover:text-[#9ea6c4] hover:bg-[#1a1c2b]'
                : activeTab === 'themes'
                ? 'text-sky-400 bg-[#1d2030]'
                : 'text-[#8a91a8] hover:text-[#e2e5f2] hover:bg-[#1a1c2b]'
            }`}
          >
            {activeTab === 'themes' && !isLocked && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] bg-sky-400 rounded-r-full" />
            )}
            <Palette size={18} />
            {isLocked && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#11121c] border border-amber-500/50 flex items-center justify-center">
                <Lock size={8} className="text-amber-400" />
              </span>
            )}
          </button>
          <div className="absolute left-12 top-1.5 px-2.5 py-1 bg-[#171927] text-[#e2e5f2] text-xs rounded-md shadow-xl border border-[#2b2e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {isLocked ? (
              <span className="text-amber-400 font-medium">云端主题市场 · 登录解锁</span>
            ) : (
              '主题市场与模板库 · Themes'
            )}
          </div>
        </div>

        <div className="w-6 h-px bg-[#232536] my-1" />

        {/* 5. 核心订阅功能：会员特权与 Pro 专区 */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={handleSubscriptionClick}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all relative ${
              currentUser?.tier === 'pro'
                ? 'text-amber-400 bg-amber-500/15 border border-amber-500/35 shadow-sm shadow-amber-500/20'
                : isLocked
                ? 'text-[#636b85] hover:text-amber-400 hover:bg-[#1a1c2b]'
                : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <Crown size={18} className={currentUser?.tier === 'pro' ? 'fill-amber-400/40' : ''} />
            {isLocked && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#11121c] border border-amber-500/50 flex items-center justify-center">
                <Lock size={8} className="text-amber-400" />
              </span>
            )}
          </button>
          <div className="absolute left-12 top-1.5 px-2.5 py-1 bg-[#171927] text-[#e2e5f2] text-xs rounded-md shadow-xl border border-[#2b2e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {isLocked ? (
              <span className="text-amber-400 font-medium">会员订阅与特权 · 登录解锁</span>
            ) : currentUser?.tier === 'pro' ? (
              <span className="text-amber-300 font-medium">HatePPT Pro 尊贵会员 (已激活)</span>
            ) : (
              <span className="text-amber-400 font-medium">开通 Pro 会员与云端特权</span>
            )}
          </div>
        </div>
      </div>

      {/* 底部系统与个人中心区 */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        {/* 快捷键速查 (本地实用工具，无需锁定) */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={onOpenShortcuts}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8a91a8] hover:text-sky-400 hover:bg-[#1a1c2b] transition-colors"
          >
            <Keyboard size={18} />
          </button>
          <div className="absolute left-12 bottom-1.5 px-2.5 py-1 bg-[#171927] text-[#e2e5f2] text-xs rounded-md shadow-xl border border-[#2b2e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            快捷键指引 · Shortcuts
          </div>
        </div>

        {/* 用户头像 / 登录入口与个人订阅中心 */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={currentUser ? onOpenSubscription : onOpenAuth}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors relative"
          >
            {currentUser ? (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-1 ring-sky-400/50 relative">
                {currentUser.nickname.slice(0, 1).toUpperCase()}
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#11121c]" />
                {currentUser.tier === 'pro' && (
                  <span className="absolute -top-1 -right-1 text-amber-400">
                    <Crown size={10} className="fill-amber-400" />
                  </span>
                )}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#181a28] text-[#8a91a8] flex items-center justify-center hover:text-amber-300 hover:bg-[#1e2133] transition-colors relative">
                <User size={15} />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Lock size={7} className="text-amber-400" />
                </span>
              </div>
            )}
          </button>
          <div className="absolute left-12 bottom-1.5 px-2.5 py-1 bg-[#171927] text-[#e2e5f2] text-xs rounded-md shadow-xl border border-[#2b2e42] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
            {currentUser ? (
              <div>
                <span className="font-semibold text-slate-100">{currentUser.nickname}</span>
                <span className="text-[#8a91a8] ml-1.5 font-mono text-[11px]">
                  ({currentUser.tier === 'pro' ? 'Pro 会员' : '免费用户'})
                </span>
                <div className="text-[10px] text-sky-400 mt-0.5">点击管理账号 / 退出登录</div>
              </div>
            ) : (
              <span className="text-amber-400 font-medium">未登录 · 点击登录解锁云端功能与订阅</span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
