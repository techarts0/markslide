import React, { useState } from 'react';
import { X, Terminal, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import type { AuthUser } from '../types/explorer';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('请输入有效的邮箱地址');
      return;
    }
    if (password.length < 6) {
      setError('密码长度需至少 6 位');
      return;
    }

    setIsLoading(true);

    // 模拟快速登录/注册成功
    setTimeout(() => {
      setIsLoading(false);
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        email: email.trim(),
        nickname: email.split('@')[0],
        tier: 'free',
      };
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in font-sans">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#151724] border border-[#282b3e] shadow-2xl shadow-black/80 p-6 overflow-hidden">
        {/* 顶部右上角关闭按钮（直接以访客模式进入） */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#8a91a8] hover:text-slate-200 hover:bg-[#1f2235] rounded-lg transition-colors"
          title="关闭弹窗，以访客模式体验全部本地功能"
        >
          <X size={16} />
        </button>

        {/* Logo 与标题 */}
        <div className="flex items-center gap-2 text-sky-400 mb-2">
          <Terminal size={20} />
          <span className="font-bold text-base tracking-wider text-slate-100 font-sans">
            MarkSlide<span className="text-sky-400 font-mono text-xs ml-1 font-normal">Cloud</span>
          </span>
        </div>
        <p className="text-xs text-[#8a91a8] mb-5 leading-relaxed">
          纯文本驱动的出版级高质感演示系统 · 登录即可开启无限层级文稿管理与多端实时同步
        </p>

        {/* 登录 / 注册 Tab 切换 */}
        <div className="flex border-b border-[#232536] mb-5 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`flex-1 pb-2.5 text-center transition-colors relative ${
              tab === 'login' ? 'text-sky-400 font-semibold' : 'text-[#8a91a8] hover:text-slate-200'
            }`}
          >
            登录账号
            {tab === 'login' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`flex-1 pb-2.5 text-center transition-colors relative ${
              tab === 'register' ? 'text-sky-400 font-semibold' : 'text-[#8a91a8] hover:text-slate-200'
            }`}
          >
            注册新账号
            {tab === 'register' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
            )}
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {error && (
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-medium mb-1">电子邮箱</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#717894]">
                <Mail size={14} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#191b2a] border border-[#2a2d42] rounded-lg pl-9 pr-3 py-2 text-slate-100 placeholder:text-[#5e657f] focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">登录密码</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#717894]">
                <Lock size={14} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="至少 6 位字符"
                className="w-full bg-[#191b2a] border border-[#2a2d42] rounded-lg pl-9 pr-3 py-2 text-slate-100 placeholder:text-[#5e657f] focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold py-2 rounded-lg shadow-md shadow-sky-950/40 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <span>处理中...</span>
            ) : (
              <>
                <Sparkles size={14} />
                <span>{tab === 'login' ? '立即登录' : '创建免费账号'}</span>
              </>
            )}
          </button>
        </form>

        {/* 底部旁路访客引导 */}
        <div className="mt-5 pt-4 border-t border-[#232536] text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-[#8a91a8] hover:text-sky-400 text-xs flex items-center justify-center gap-1 mx-auto transition-colors group"
          >
            <span>暂不登录，以访客模式体验全部本地功能</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
