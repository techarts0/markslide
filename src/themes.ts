/**
 * MarkSlide Studio 出版级专业主题系统
 * 涵盖：学术课件 (Academic)、商业提案 (Business)、极客技术 (Tech-PM)、极简通识 (Minimalist)
 * 深度优化：彻底清除默认网格竖线，完美实现现代三线色块表格 + Tailwind 高奢内发光物理倒角卡片系统
 */

export interface ThemeOption {
  id: string;
  name: string;
  desc: string;
  isDark: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'academic', name: '学术 · Academic', desc: '牛津深蓝、纸质暖白、三线学术表与公式注解', isDark: false },
  { id: 'business', name: '商业 · Business', desc: '午夜深蓝、毛玻璃光晕、数据冲击大看板', isDark: true },
  { id: 'tech-pm', name: '极客 · Tech-PM', desc: '赛博极夜、点阵微网格、macOS终端窗体', isDark: true },
  { id: 'minimalist', name: '简约 · Minimalist', desc: '苹果冷白、超大字阶留白、极致克制', isDark: false },
];

// ==========================================
// 出版级微排版与高频高阶版式通用样式库
// ==========================================
export const sharedPublishingStyles = `
/* 标题与正文抗断裂微排版 */
h1, h2, h3, h4 {
  text-wrap: balance !important;
}
p, li {
  text-wrap: pretty !important;
}

/* KaTeX 数学公式出版级卡片居中呈现 */
.katex-display {
  display: block !important;
  margin: 22px auto !important;
  padding: 16px 24px !important;
  background: rgba(125, 125, 125, 0.08) !important;
  border: 1px solid rgba(125, 125, 125, 0.15) !important;
  border-radius: 12px !important;
  overflow-x: auto !important;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04) !important;
}

/* 高频版式 1：图文 50/50 杂志级双栏混排 (.split) */
.split {
  display: grid !important;
  grid-template-columns: 1.15fr 0.85fr !important;
  gap: 36px !important;
  align-items: center !important;
  margin-top: 20px !important;
  width: 100% !important;
}
.split.reverse {
  grid-template-columns: 0.85fr 1.15fr !important;
}
.split img {
  width: 100% !important;
  max-height: 380px !important;
  object-fit: cover !important;
  border-radius: 14px !important;
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.25) !important;
}

/* 高频版式 2：时间轴 / 步骤演进卡片 (.steps, .step, .step-num) */
.steps {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)) !important;
  gap: 16px !important;
  margin-top: 28px !important;
  width: 100% !important;
}
.step {
  padding: 22px 18px !important;
  border-radius: 14px !important;
  background: rgba(125, 125, 125, 0.08) !important;
  border: 1px solid rgba(125, 125, 125, 0.15) !important;
  position: relative !important;
}
.step-num {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 9px !important;
  background: var(--theme-accent, #0284c7) !important;
  color: var(--theme-accent-fg, #ffffff) !important;
  font-weight: 800 !important;
  font-size: 15px !important;
  margin-bottom: 12px !important;
}
.step h3, .step h4 {
  margin-top: 0 !important;
  margin-bottom: 8px !important;
  font-size: 1.05em !important;
}
.step p {
  font-size: 0.82em !important;
  line-height: 1.5 !important;
  margin: 0 !important;
  opacity: 0.85 !important;
}

/* 高频版式 3：团队 / 演讲嘉宾名片 (.profile) */
.profile-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 24px !important;
  margin-top: 24px !important;
  width: 100% !important;
}
.profile {
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  padding: 18px 22px !important;
  border-radius: 14px !important;
  background: var(--card-bg, rgba(125, 125, 125, 0.08)) !important;
  border: 1px solid var(--card-border, rgba(125, 125, 125, 0.15)) !important;
}
.profile img {
  width: 76px !important;
  height: 76px !important;
  border-radius: 50% !important;
  object-fit: cover !important;
  flex-shrink: 0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
.profile-info h3 {
  margin: 0 0 4px 0 !important;
  font-size: 1.1em !important;
}
.profile-info .title {
  font-size: 0.8em !important;
  opacity: 0.75 !important;
  margin-bottom: 6px !important;
}
.profile-info p {
  font-size: 0.8em !important;
  margin: 0 !important;
  line-height: 1.4 !important;
}

/* 高频版式 4：四色现代出版级语义提示框 (.callout) */
.callout {
  margin: 18px 0 !important;
  padding: 16px 20px 16px 22px !important;
  border-radius: 12px !important;
  border-left: 4px solid !important;
  font-size: 0.88em !important;
  line-height: 1.6 !important;
  position: relative !important;
  backdrop-filter: blur(8px) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
}
.callout > *:first-child {
  margin-top: 0 !important;
}
.callout > *:last-child {
  margin-bottom: 0 !important;
}
.callout-title {
  font-weight: 700 !important;
  margin-bottom: 6px !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}
.callout-note {
  border-left-color: #38bdf8 !important;
  background: rgba(56, 189, 248, 0.1) !important;
}
.callout-note .callout-title {
  color: var(--callout-note-title, #0284c7) !important;
}
.callout-tip {
  border-left-color: #10b981 !important;
  background: rgba(16, 185, 129, 0.1) !important;
}
.callout-tip .callout-title {
  color: var(--callout-tip-title, #059669) !important;
}
.callout-warning {
  border-left-color: #f59e0b !important;
  background: rgba(245, 158, 11, 0.1) !important;
}
.callout-warning .callout-title {
  color: var(--callout-warning-title, #d97706) !important;
}
.callout-caution {
  border-left-color: #f43f5e !important;
  background: rgba(244, 63, 94, 0.1) !important;
}
.callout-caution .callout-title {
  color: var(--callout-caution-title, #e11d48) !important;
}

/* 高频版式 5：Before vs After 前后对比面板 (.compare) */
.compare {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 22px !important;
  margin-top: 20px !important;
  width: 100% !important;
}
.compare-before, .compare-after {
  padding: 22px 24px !important;
  border-radius: 14px !important;
  position: relative !important;
}
.compare-before {
  background: rgba(239, 68, 68, 0.06) !important;
  border: 1px solid rgba(239, 68, 68, 0.22) !important;
}
.compare-after {
  background: rgba(16, 185, 129, 0.08) !important;
  border: 1px solid rgba(16, 185, 129, 0.28) !important;
  box-shadow: 0 8px 24px -6px rgba(16, 185, 129, 0.12) !important;
}
.compare h3, .compare h4 {
  margin-top: 0 !important;
  margin-bottom: 12px !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 1.05em !important;
}
.compare-before h3 {
  color: #ef4444 !important;
}
.compare-after h3 {
  color: #10b981 !important;
}
.compare ul {
  padding-left: 20px !important;
  margin: 0 !important;
}
.compare li {
  margin-bottom: 8px !important;
  font-size: 0.85em !important;
  line-height: 1.5 !important;
}

/* 高频版式 6：3 列与 4 列自适应卡片网格 (.card-grid-3, .card-grid-4) */
.card-grid-3 {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 20px !important;
  margin-top: 20px !important;
  width: 100% !important;
}
.card-grid-4 {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 16px !important;
  margin-top: 20px !important;
  width: 100% !important;
}

/* 高频版式 7：KPI 统计大数字看板网格 (.stat-grid, .stat-card) */
.stat-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
  gap: 22px !important;
  margin-top: 24px !important;
  width: 100% !important;
}
.stat-card {
  padding: 24px 20px !important;
  border-radius: 14px !important;
  background: var(--card-bg, rgba(125, 125, 125, 0.08)) !important;
  border: 1px solid var(--card-border, rgba(125, 125, 125, 0.15)) !important;
  text-align: center !important;
  position: relative !important;
  overflow: hidden !important;
}
.stat-value {
  font-size: 2.6em !important;
  font-weight: 800 !important;
  line-height: 1.1 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  letter-spacing: -0.03em !important;
  margin-bottom: 6px !important;
  color: var(--stat-value-color, var(--theme-accent, inherit)) !important;
  background: var(--stat-value-gradient, none) !important;
  -webkit-background-clip: var(--stat-value-clip, border-box) !important;
  -webkit-text-fill-color: var(--stat-value-fill, currentColor) !important;
}
.stat-label {
  font-size: 0.85em !important;
  font-weight: 600 !important;
  opacity: 0.85 !important;
  margin-bottom: 4px !important;
}
.stat-desc {
  font-size: 0.75em !important;
  opacity: 0.65 !important;
  margin: 0 !important;
  line-height: 1.4 !important;
}
.stat-badge {
  display: inline-block !important;
  padding: 2px 8px !important;
  border-radius: 9999px !important;
  font-size: 0.72em !important;
  font-weight: 700 !important;
  margin-top: 6px !important;
  background: rgba(16, 185, 129, 0.15) !important;
  color: #10b981 !important;
}

/* 高频版式 8：微型高阶徽章标签 (.badge) */
.badge {
  display: inline-flex !important;
  align-items: center !important;
  padding: 2px 9px !important;
  border-radius: 9999px !important;
  font-size: 0.72em !important;
  font-weight: 700 !important;
  line-height: 1.3 !important;
  vertical-align: middle !important;
  margin: 0 4px !important;
  letter-spacing: 0.02em !important;
  border: 1px solid transparent !important;
}
.badge-info {
  background: rgba(56, 189, 248, 0.15) !important;
  color: var(--badge-info-color, #0284c7) !important;
  border-color: rgba(56, 189, 248, 0.3) !important;
}
.badge-success {
  background: rgba(16, 185, 129, 0.15) !important;
  color: var(--badge-success-color, #059669) !important;
  border-color: rgba(16, 185, 129, 0.3) !important;
}
.badge-warning {
  background: rgba(245, 158, 11, 0.15) !important;
  color: var(--badge-warning-color, #d97706) !important;
  border-color: rgba(245, 158, 11, 0.3) !important;
}
.badge-danger {
  background: rgba(239, 68, 68, 0.15) !important;
  color: var(--badge-danger-color, #dc2626) !important;
  border-color: rgba(239, 68, 68, 0.3) !important;
}
`;

// ==========================================
// 1. 学术科研与高校课件主题 (Academic)
// ==========================================
export const academicTheme = `
/* @theme academic */
@import 'default';

section {
  font-family: -apple-system, BlinkMacSystemFont, "Charter", "Palatino", "Source Serif Pro", "Noto Serif CJK SC", serif;
  background-color: #fbfbfa;
  color: #1e293b;
  padding: 56px 72px;
  font-size: 24px;
  line-height: 1.7;
  border-top: 5px solid #1e3a8a;
  --theme-accent: #1e3a8a;
  --theme-accent-fg: #ffffff;
  --card-bg: rgba(30, 58, 138, 0.04);
  --card-border: rgba(30, 58, 138, 0.14);
  --stat-value-color: #1e3a8a;
}

section.lead {
  border-top: none;
  background: radial-gradient(circle at center, #f4f6fb 0%, #eef2ff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

section.lead::after {
  content: "";
  position: absolute;
  bottom: 40px;
  width: 80px;
  height: 3px;
  background: #1e3a8a;
  border-radius: 2px;
}

h1 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif;
  color: #0f172a;
  font-size: 2.1em;
  font-weight: 700;
  letter-spacing: -0.01em;
  border-bottom: 2px solid #cbd5e1;
  padding-bottom: 14px;
  margin-bottom: 24px;
}

section.lead h1 {
  border-bottom: none;
  font-size: 2.7em;
  color: #0f2b48;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

h2 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1e3a8a;
  font-size: 1.45em;
  font-weight: 600;
  margin-top: 18px;
}

h3 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #334155;
  font-size: 1.15em;
}

/* 概念重点注解卡片 */
blockquote {
  border-left: 5px solid #1e3a8a;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 16px 24px;
  margin: 20px 0;
  color: #1e293b;
  font-style: normal;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

blockquote strong {
  color: #0f2b48;
}

/* 彻底重构现代学术三线表（彻底消除垂直竖线与网格污染） */
table, section table {
  display: table !important;
  width: 100% !important;
  max-width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 30px auto !important;
  font-size: 0.82em !important;
  background-color: #ffffff !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  border: 1px solid #e2e8f0 !important;
  border-top: 3px solid #0f2b48 !important;
  border-bottom: 2.5px solid #0f2b48 !important;
  box-shadow: 0 4px 15px -2px rgba(15, 23, 42, 0.05) !important;
}

table tr, section table tr {
  background: transparent !important;
  border: none !important;
}

/* 表头色块带 */
table th, section table th {
  background-color: #f1f5f9 !important;
  color: #0f2b48 !important;
  font-weight: 700 !important;
  padding: 16px 20px !important;
  border: none !important;
  border-bottom: 2px solid #cbd5e1 !important;
  text-align: left !important;
  letter-spacing: 0.03em !important;
}

/* 单元格单向水平微线，彻底清除左右垂直线 */
table td, section table td {
  padding: 14px 20px !important;
  border: none !important;
  border-bottom: 1px solid #f1f5f9 !important;
  color: #334155 !important;
  line-height: 1.55 !important;
  transition: background-color 0.15s ease !important;
}

/* 偶数行色块斑马纹 */
table tr:nth-child(even) td, section table tr:nth-child(even) td {
  background-color: #f8fafc !important;
}

/* 首列核心主键加权 */
table td:first-child, section table td:first-child {
  font-weight: 700 !important;
  color: #0f2b48 !important;
}

/* 行悬停聚光微高亮 */
table tr:hover td, section table tr:hover td {
  background-color: #e0f2fe !important;
}

table tr:last-child td, section table tr:last-child td {
  border-bottom: none !important;
}

/* Tailwind 现代高质感双层环卡片 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 22px;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 
              0 2px 4px -2px rgba(0, 0, 0, 0.04), 
              inset 0 1px 0 0 rgba(255, 255, 255, 1);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 24px;
  right: 24px;
  height: 2px;
  background: linear-gradient(90deg, #1e3a8a, transparent);
  border-radius: 2px;
}

.card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #1e3a8a;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card p {
  color: #475569;
  font-size: 0.9em;
  line-height: 1.6;
  margin: 0;
}

.card.accent {
  border-color: #bfdbfe;
  background: linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%);
  box-shadow: 0 10px 15px -3px rgba(30, 58, 138, 0.08), inset 0 1px 0 0 #ffffff;
}

.card.accent::before {
  background: linear-gradient(90deg, #2563eb, #38bdf8);
  height: 3px;
}

/* 数学公式容器美化 */
.katex-display {
  background: #edf2f7;
  padding: 16px 22px;
  border-radius: 10px;
  margin: 18px 0;
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.03);
}

pre {
  background: #1e293b !important;
  color: #f8fafc !important;
  border-radius: 10px;
  padding: 18px !important;
  font-size: 0.8em;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

footer, header {
  font-size: 13px;
  color: #94a3b8;
  font-family: sans-serif;
}
` + sharedPublishingStyles;

// ==========================================
// 2. 商业提案与高管路演主题 (Business)
// ==========================================
export const businessTheme = `
/* @theme business */
@import 'gaia';

section {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "PingFang SC", sans-serif;
  background: linear-gradient(145deg, #091326 0%, #0f1c38 50%, #152449 100%);
  color: #f8fafc;
  padding: 56px 80px;
  font-size: 26px;
  line-height: 1.6;
  --theme-accent: #38bdf8;
  --theme-accent-fg: #091326;
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.12);
  --stat-value-gradient: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  --stat-value-clip: text;
  --stat-value-fill: transparent;
  --callout-note-title: #38bdf8;
  --callout-tip-title: #34d399;
  --callout-warning-title: #fbbf24;
  --callout-caution-title: #fb7185;
  --badge-info-color: #38bdf8;
  --badge-success-color: #34d399;
  --badge-warning-color: #fbbf24;
  --badge-danger-color: #fb7185;
}

section.lead {
  background: radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.18) 0%, transparent 60%),
              radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.22) 0%, transparent 70%),
              linear-gradient(135deg, #070d1e 0%, #0d1933 100%);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

section.lead h1 {
  font-size: 3.1em;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #ffffff 30%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 14px;
  max-width: 1080px;
  text-wrap: balance;
}

section.lead h3 {
  color: #38bdf8;
  font-size: 1.25em;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 10px;
  max-width: 1080px;
  text-wrap: pretty;
}

section.lead p {
  color: #94a3b8;
  font-size: 1.15em;
  font-weight: 400;
  max-width: 1080px;
  line-height: 1.5;
  margin-top: 4px;
  text-wrap: pretty;
}

h1 {
  color: #ffffff;
  font-size: 2.3em;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

h2 {
  color: #38bdf8;
  font-size: 1.5em;
  font-weight: 700;
}

h3 {
  color: #cbd5e1;
  font-size: 1.2em;
}

/* 核心数字看板 (Metric) */
.metric {
  font-size: 3.6em;
  font-weight: 900;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin: 8px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.metric-label {
  font-size: 0.75em;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

/* 麦肯锡级高奢毛玻璃卡片（双层反光倒角） */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;
  margin-top: 24px;
}

.card {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 26px;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 
              0 20px 40px -15px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.card h3 {
  color: #38bdf8;
  margin-top: 0;
  font-size: 1.15em;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card p {
  color: #cbd5e1;
  font-size: 0.9em;
  line-height: 1.6;
  margin: 0;
}

.card.accent {
  border-color: rgba(56, 189, 248, 0.4);
  background: linear-gradient(160deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 28, 56, 0.4) 100%);
  box-shadow: inset 0 1px 0 0 rgba(56, 189, 248, 0.4), 
              0 0 25px rgba(56, 189, 248, 0.15);
}

/* 商业级半透明微色块三线对比表（彻底消除垂直竖线） */
table, section table {
  display: table !important;
  width: 100% !important;
  max-width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 30px auto !important;
  font-size: 0.82em !important;
  background: rgba(15, 23, 42, 0.55) !important;
  backdrop-filter: blur(16px) !important;
  border-radius: 14px !important;
  overflow: hidden !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-top: 3px solid #38bdf8 !important;
  border-bottom: 2.5px solid #38bdf8 !important;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5) !important;
}

table tr, section table tr {
  background: transparent !important;
  border: none !important;
}

table th, section table th {
  background: rgba(56, 189, 248, 0.16) !important;
  color: #38bdf8 !important;
  padding: 16px 22px !important;
  font-weight: 700 !important;
  border: none !important;
  border-bottom: 2px solid rgba(56, 189, 248, 0.3) !important;
  text-align: left !important;
  letter-spacing: 0.04em !important;
}

table td, section table td {
  padding: 14px 22px !important;
  border: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  color: #cbd5e1 !important;
  line-height: 1.55 !important;
  transition: background-color 0.15s ease !important;
}

/* 偶数行半透暗青微色块 */
table tr:nth-child(even) td, section table tr:nth-child(even) td {
  background-color: rgba(255, 255, 255, 0.035) !important;
}

/* 首列加粗亮白 */
table td:first-child, section table td:first-child {
  font-weight: 700 !important;
  color: #ffffff !important;
}

tr:hover td, section table tr:hover td {
  background-color: rgba(56, 189, 248, 0.12) !important;
  color: #ffffff !important;
}

tr:last-child td, section table tr:last-child td {
  border-bottom: none !important;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  position: relative;
  padding-left: 36px;
  margin-bottom: 14px;
}

li::before {
  content: "✦";
  position: absolute;
  left: 4px;
  color: #38bdf8;
  font-size: 1.1em;
}

blockquote {
  background: rgba(56, 189, 248, 0.08);
  border-left: 4px solid #38bdf8;
  border-radius: 10px;
  padding: 16px 24px;
  margin: 20px 0;
  color: #e0f2fe;
}

footer, header {
  color: #64748b;
  font-size: 13px;
}
` + sharedPublishingStyles;

// ==========================================
// 3. 极客与技术研发汇报主题 (Tech-PM)
// ==========================================
export const techPmTheme = `
/* @theme tech-pm */
@import 'uncover';

section {
  font-family: -apple-system, BlinkMacSystemFont, "JetBrains Mono", "Fira Code", monospace;
  background-color: #080a0f;
  background-image: radial-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px);
  background-size: 28px 28px;
  color: #f1f5f9;
  padding: 56px 72px;
  font-size: 24px;
  line-height: 1.6;
  --theme-accent: #06b6d4;
  --theme-accent-fg: #080a0f;
  --card-bg: rgba(15, 23, 42, 0.65);
  --card-border: rgba(56, 189, 248, 0.2);
  --stat-value-gradient: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  --stat-value-clip: text;
  --stat-value-fill: transparent;
  --callout-note-title: #38bdf8;
  --callout-tip-title: #34d399;
  --callout-warning-title: #facc15;
  --callout-caution-title: #f87171;
  --badge-info-color: #38bdf8;
  --badge-success-color: #4ade80;
  --badge-warning-color: #facc15;
  --badge-danger-color: #f87171;
}

section.lead {
  background: radial-gradient(circle at center, #111827 0%, #06080d 100%);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

section.lead h1 {
  font-size: 2.8em;
  font-weight: 800;
  color: #38bdf8;
  text-shadow: 0 0 35px rgba(56, 189, 248, 0.4);
  letter-spacing: -0.02em;
}

h1 {
  color: #38bdf8;
  font-size: 2.1em;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
}

h2 {
  color: #c084fc;
  font-size: 1.45em;
  font-weight: 600;
}

h3 {
  color: #38bdf8;
  font-size: 1.15em;
}

.badge-done {
  display: inline-flex;
  align-items: center;
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.4);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.65em;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.2);
}

.badge-wip {
  display: inline-flex;
  align-items: center;
  background: rgba(234, 179, 8, 0.15);
  color: #facc15;
  border: 1px solid rgba(250, 204, 21, 0.4);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.65em;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);
}

.badge-risk {
  display: inline-flex;
  align-items: center;
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(248, 113, 113, 0.4);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.65em;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(248, 113, 113, 0.2);
}

/* Linear / Vercel 极客高奢微光卡片 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
  margin-top: 22px;
}

.card {
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.85) 0%, rgba(10, 14, 23, 0.95) 100%);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 12px;
  padding: 22px;
  box-shadow: inset 0 1px 0 0 rgba(56, 189, 248, 0.35), 
              0 10px 25px -5px rgba(0, 0, 0, 0.6);
  position: relative;
}

.card h3 {
  color: #38bdf8;
  margin-top: 0;
  font-size: 1.1em;
  font-weight: 700;
}

.card p {
  color: #94a3b8;
  font-size: 0.88em;
  line-height: 1.6;
  margin: 0;
}

.card.accent {
  border-color: rgba(192, 132, 252, 0.45);
  background: linear-gradient(180deg, rgba(30, 27, 75, 0.6) 0%, rgba(10, 14, 23, 0.95) 100%);
  box-shadow: inset 0 1px 0 0 rgba(192, 132, 252, 0.5), 0 0 20px rgba(192, 132, 252, 0.15);
}

.card.accent h3 {
  color: #c084fc;
}

/* 赛博控制台微色块三线表（彻底消除垂直竖线） */
table, section table {
  display: table !important;
  width: 100% !important;
  max-width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 28px auto !important;
  font-size: 0.8em !important;
  border-top: 3px solid #38bdf8 !important;
  border-bottom: 2.5px solid #38bdf8 !important;
  background: #0d1117 !important;
  border-radius: 10px !important;
  overflow: hidden !important;
  border: 1px solid #30363d !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6) !important;
}

table tr, section table tr {
  background: transparent !important;
  border: none !important;
}

table th, section table th {
  background: #161b22 !important;
  color: #58a6ff !important;
  padding: 15px 18px !important;
  border: none !important;
  border-bottom: 2px solid #30363d !important;
  font-weight: 700 !important;
  text-align: left !important;
}

table td, section table td {
  padding: 13px 18px !important;
  border: none !important;
  border-bottom: 1px solid #21262d !important;
  color: #c9d1d9 !important;
  line-height: 1.55 !important;
  transition: background-color 0.15s ease !important;
}

table tr:nth-child(even) td, section table tr:nth-child(even) td {
  background-color: rgba(56, 189, 248, 0.04) !important;
}

table td:first-child, section table td:first-child {
  color: #38bdf8 !important;
  font-weight: 700 !important;
}

table tr:hover td, section table tr:hover td {
  background-color: rgba(56, 189, 248, 0.1) !important;
  color: #ffffff !important;
}

table tr:last-child td, section table tr:last-child td {
  border-bottom: none !important;
}

pre {
  background: #0d1117 !important;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 20px !important;
  color: #58a6ff !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
}

code {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding: 2px 6px;
  border-radius: 4px;
}

footer, header {
  color: #475569;
  font-size: 12px;
}
` + sharedPublishingStyles;

// ==========================================
// 4. 原研哉/苹果极简克制风 (Minimalist)
// ==========================================
export const minimalistTheme = `
/* @theme minimalist */
@import 'default';

section {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  background-color: #fbfbfa;
  color: #18181b;
  padding: 64px 88px;
  font-size: 26px;
  line-height: 1.75;
  --theme-accent: #18181b;
  --theme-accent-fg: #ffffff;
  --card-bg: #ffffff;
  --card-border: #e4e4e7;
  --stat-value-color: #09090b;
}

section.lead {
  background: radial-gradient(circle at center, #ffffff 0%, #fbfbfa 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
}

section.lead h1 {
  font-size: 3.4em;
  font-weight: 800;
  color: #09090b;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 24px;
}

section.lead p {
  color: #71717a;
  font-size: 1.4em;
  font-weight: 300;
  letter-spacing: -0.01em;
}

h1 {
  color: #09090b;
  font-size: 2.2em;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 28px;
  border: none;
}

h2 {
  color: #27272a;
  font-size: 1.5em;
  font-weight: 600;
  letter-spacing: -0.02em;
}

h3 {
  color: #52525b;
  font-size: 1.15em;
  font-weight: 500;
}

blockquote {
  border-left: 3px solid #18181b;
  background: transparent;
  padding: 8px 0 8px 24px;
  margin: 28px 0;
  color: #27272a;
  font-size: 1.1em;
  line-height: 1.6;
}

/* 极致素雅现代三线表（彻底消除垂直竖线） */
table, section table {
  display: table !important;
  width: 100% !important;
  max-width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 36px auto !important;
  font-size: 0.85em !important;
  border: none !important;
  border-top: 3px solid #18181b !important;
  border-bottom: 2.5px solid #18181b !important;
  background: transparent !important;
}

table tr, section table tr {
  background: transparent !important;
  border: none !important;
}

table th, section table th {
  border: none !important;
  border-bottom: 1.5px solid #18181b !important;
  padding: 16px 20px !important;
  font-weight: 700 !important;
  color: #09090b !important;
  text-align: left !important;
  background-color: rgba(24, 24, 27, 0.04) !important;
}

table td, section table td {
  padding: 14px 20px !important;
  color: #3f3f46 !important;
  border: none !important;
  border-bottom: 1px solid #f4f4f5 !important;
  line-height: 1.6 !important;
  transition: background-color 0.15s ease !important;
}

table tr:nth-child(even) td, section table tr:nth-child(even) td {
  background-color: rgba(24, 24, 27, 0.02) !important;
}

table td:first-child, section table td:first-child {
  font-weight: 700 !important;
  color: #09090b !important;
}

table tr:hover td, section table tr:hover td {
  background-color: rgba(24, 24, 27, 0.04) !important;
}

table tr:last-child td, section table tr:last-child td {
  border-bottom: none !important;
}

/* 极简通识浮雕微光卡片 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;
  margin-top: 26px;
}

.card {
  background: #ffffff;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 
              0 1px 2px -1px rgba(0, 0, 0, 0.04), 
              inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
}

.card h3 {
  color: #09090b;
  margin-top: 0;
  font-size: 1.1em;
  font-weight: 700;
}

.card p {
  color: #52525b;
  font-size: 0.9em;
  line-height: 1.6;
  margin: 0;
}

.metric {
  font-size: 3.8em;
  font-weight: 800;
  color: #09090b;
  line-height: 1;
  letter-spacing: -0.04em;
}

.metric-label {
  font-size: 0.75em;
  color: #71717a;
  letter-spacing: 0.02em;
}

pre {
  background: #18181b !important;
  color: #fafafa !important;
  border-radius: 10px;
  padding: 20px !important;
  font-size: 0.8em;
}

footer, header {
  color: #a1a1aa;
  font-size: 13px;
}
` + sharedPublishingStyles;
