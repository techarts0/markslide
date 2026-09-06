import React from 'react';
import { X, Crown, Check, Zap, Sparkles, ShieldCheck, ArrowRight, LogOut, User } from 'lucide-react';
import type { AuthUser } from '../types/explorer';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onUpgradeToPro: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpgradeToPro,
  onOpenAuth,
  onLogout,
}) => {
  if (!isOpen) return null;

  const isPro = currentUser?.tier === 'pro';

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in font-sans">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#151724] border border-[#282b3e] shadow-2xl shadow-black/80 p-6 overflow-hidden">
        {/* 顶部背景炫光 */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#8a91a8] hover:text-slate-200 hover:bg-[#1f2235] rounded-lg transition-colors"
        >
          <X size={16} />
        </button>

        {/* 头部标题与徽标 */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
            <Crown size={20} className="fill-current" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              MarkSlide <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">Pro 云端会员</span>
              {isPro && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  当前已激活
                </span>
              )}
            </h2>
            <p className="text-xs text-[#8a91a8]">解锁无限云端空间、独家出版级主题与高级导出特权</p>
          </div>
        </div>

        {/* 当前账号状态条 */}
        {currentUser && (
          <div className="mt-3 py-2 px-3 rounded-lg bg-[#181a28] border border-[#232536] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <User size={13} className="text-sky-400" />
              <span>当前账号：<strong className="text-slate-100">{currentUser.nickname}</strong> ({currentUser.email})</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
              isPro ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-[#202336] text-[#8a91a8]'
            }`}>
              {isPro ? 'Pro 会员' : '免费用户'}
            </span>
          </div>
        )}

        {/* 特权清单对比 */}
        <div className="my-4 p-4 rounded-xl bg-[#181a28] border border-[#232536] space-y-2.5 text-xs">
          <div className="text-[11px] font-semibold tracking-wider text-[#8a91a8] uppercase">
            Pro 会员尊享特权
          </div>
          <div className="grid grid-cols-1 gap-2 text-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={11} strokeWidth={3} />
              </div>
              <span><strong>无限多端云同步</strong>：幻灯片文稿库实时云端存储与版本快照</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={11} strokeWidth={3} />
              </div>
              <span><strong>独家出版级主题库</strong>：解锁学术顶刊、高管咨询与深色黑客全套模板</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={11} strokeWidth={3} />
              </div>
              <span><strong>4K 矢量高清导出</strong>：无水印高精度 PDF 打印与自定义域名独立放映</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={11} strokeWidth={3} />
              </div>
              <span><strong>云端智能提炼 (Beta)</strong>：基于大语言模型的 Markdown 课件自动排版</span>
            </div>
          </div>
        </div>

        {/* 方案卡片 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3.5 rounded-xl border border-[#282c40] bg-[#191c2b] flex flex-col justify-between relative hover:border-[#353a54] transition-colors">
            <div>
              <div className="text-xs text-[#8a91a8] font-medium mb-1">月度订阅</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-100">¥19</span>
                <span className="text-xs text-[#717894]">/ 月</span>
              </div>
            </div>
            <div className="text-[11px] text-[#8a91a8] mt-2">随时取消，灵活体验</div>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-amber-500/70 bg-amber-500/10 flex flex-col justify-between relative shadow-lg shadow-amber-950/20">
            <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950">
              推荐 · 省 30%
            </span>
            <div>
              <div className="text-xs text-amber-400 font-medium mb-1">年度订阅</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-amber-300">¥168</span>
                <span className="text-xs text-[#717894]">/ 年</span>
              </div>
            </div>
            <div className="text-[11px] text-amber-200/70 mt-2">折合每月仅 ¥14，畅享全部特权</div>
          </div>
        </div>

        {/* 底部按钮交互 */}
        <div className="space-y-2">
          {currentUser ? (
            isPro ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs text-emerald-300 font-medium flex items-center justify-center gap-2">
                <ShieldCheck size={16} />
                您当前已是尊贵的 Pro 会员，所有云端与专属特权已全部解锁！
              </div>
            ) : (
              <button
                onClick={() => {
                  onUpgradeToPro();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Zap size={14} className="fill-current" />
                <span>立即开通 Pro 会员 (模拟一键升级)</span>
              </button>
            )
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs shadow-md shadow-sky-950/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Sparkles size={14} />
              <span>请先登录账号后开通订阅</span>
              <ArrowRight size={14} />
            </button>
          )}

          {/* 退出登录操作按钮 */}
          {currentUser && onLogout && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`确认退出当前账号 ${currentUser.email} 吗？退出后 ActivityBar 将自动锁定。`)) {
                    onLogout();
                    onClose();
                  }
                }}
                className="text-[11px] text-[#8a91a8] hover:text-rose-400 inline-flex items-center gap-1.5 transition-colors py-1 px-3 rounded hover:bg-[#1b1e2e]"
              >
                <LogOut size={12} />
                <span>退出登录当前账号</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
