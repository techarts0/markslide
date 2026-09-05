import React, { useState, useEffect, useRef, useCallback } from 'react';
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { markdown as langMarkdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  FolderOpen,
  Save,
  Download,
  Play,
  Plus,
  Table,
  Image as ImageIcon,
  Columns2,
  TrendingUp,
  Quote,
  GitGraph,
  Sigma,
  Code,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Palette,
  Printer,
  Columns,
  Milestone,
  User,
  LayoutGrid,
  MessageSquarePlus,
  GitCompare,
  Tag,
} from 'lucide-react';
import { THEME_OPTIONS } from '../themes';
import { slideCompiler } from '../marpEngine';
import { exportStandaloneHtml } from '../utils/exportHtml';
import { parseSlides, getSlideIndexAtOffset } from '../utils/parseSlides';
import { compressImageToDataUrl } from '../utils/imageCompress';

const SHOWCASE_MARKDOWN = `---
marp: true
theme: academic
paginate: true
header: 'MarkSlide Studio · 交互式用户指南'
footer: '© 2026 MarkSlide 极客智能讲台'
---

<!-- _class: lead -->

# MarkSlide Studio
### 纯文本驱动的下一代高质感演示系统
从 Markdown 到商业级路演与学术级课件 · 交互式用户手册

<!-- note: 欢迎使用 MarkSlide Studio！按空格或方向键可开始演示浏览。 -->

---

# 1. 极简基础排版与语义提示框

无需繁琐拖拽，只要书写标准 Markdown，系统自动套用出版级字阶规范与抗断裂排版：

- **标题与强调**：支持各级标题与列表，支持演讲者备忘（放映时按 \`N\` 键查看）
- **高阶徽章**：<span class="badge badge-success">稳定运行</span> <span class="badge badge-info">v2.0 升级</span> <span class="badge badge-warning">精选</span>

<div class="callout callout-tip">
  <div class="callout-title">💡 核心设计公理 (Tip)</div>
  <p>创作者的核心资产是思考与结构化内容，而非拖拽排版的内耗。优秀的工具让 Markdown 自动绽放出版级质感。</p>
</div>

<!-- note: 本页展示基础排版、彩色徽章与出版级语义提示框样式。 -->

---

# 2. 现代三线学术对比表

自动清除传统 PPT 丑陋的黑框网格，呈现优雅现代的三线表与高亮首列：

| 维度对比 | 传统演示软件 | 静态 PDF 文件 | MarkSlide Studio |
| :--- | :--- | :--- | :--- |
| **资产形式** | 二进制黑盒，无法差异比对 | 无法二次排版与演进 | 纯 Markdown 文本，完美适配 Git |
| **公式与图表** | 截图模糊、字体错位 | 静态无交互 | 原生 KaTeX 公式 + Mermaid 矢量流 |
| **讲台工具箱** | 需额外携带实体激光笔与外设 | 无任何讲台互动功能 | 内置激光笔、画笔批注、黑板、抽签 |
| **脱机分发** | 需目标电脑安装同款大型软件 | 体验受限、翻页呆板 | 单文件 HTML 导出，双击即开演 |

<!-- note: 本页展示三线对比表，首列采用高亮着色，每一行支持悬停渐变。 -->

---

# 3. 前后对比与多列卡片

支持 \`<div class="compare">\` 前后方案对比，以及 \`<div class="card-grid-3">\` 三列自适应网格：

<div class="compare">
  <div class="compare-before">
    <h3>❌ 传统演示痛点</h3>
    <ul>
      <li>机械对齐耗时费力，格式频繁错乱</li>
      <li>文件格式封闭，难以通过 Git 版本管理</li>
    </ul>
  </div>
  <div class="compare-after">
    <h3>✅ MarkSlide 现代方案</h3>
    <ul>
      <li>纯 Markdown 出版级排版，内容表现分离</li>
      <li>单文件 HTML 导出，双击即全功能开演</li>
    </ul>
  </div>
</div>

<div class="card-grid-3" style="margin-top: 18px;">
  <div class="card">
    <h3>🎯 极速心流</h3>
    <p>编写与预览光标毫秒级同步</p>
  </div>
  <div class="card">
    <h3>🎨 顶级质感</h3>
    <p>4 大出版级主题任意切换</p>
  </div>
  <div class="card">
    <h3>🛡️ 离线自包含</h3>
    <p>截图直接粘贴，前端自动压缩</p>
  </div>
</div>

---

# 4. 杂志级 50/50 图文排版

使用 \`<div class="split">\` 轻松实现左侧深度阐述、右侧大图举证的专业杂志感版式：

<div class="split">
  <div>
    <h2>端到端高性能交互体系</h2>
    <p>通过纯前端 CodeMirror 6 内核驱动，结合防抖异步编译管线，消除每秒重绘卡顿：</p>
    <ul>
      <li><strong>极速启动</strong>：整体包体仅数百 KB，毫秒级即开即用</li>
      <li><strong>图片秒贴</strong>：微信/系统截图后直接在编辑器 <code>Ctrl+V</code>，前端 Canvas 自动等比压缩 90%</li>
      <li><strong>高清矢量</strong>：全矢量视口缩放，投射到 4K 会议大屏依然锐利</li>
    </ul>
  </div>
  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="系统交互图" />
</div>

---

# 5. 阶段演进与时间轴卡片

使用 \`<div class="steps">\` 一键直观呈现项目里程碑、技术演进或实施路线图：

<div class="steps">
  <div class="step">
    <div class="step-num">01</div>
    <h3>需求对齐</h3>
    <p>厘清汇报受众与核心诉求，梳理演说逻辑主线</p>
  </div>
  <div class="step">
    <div class="step-num">02</div>
    <h3>骨架填空</h3>
    <p>选用标准排版组件，专注录入核心论据与数据</p>
  </div>
  <div class="step">
    <div class="step-num">03</div>
    <h3>主题定调</h3>
    <p>一键切换商业、学术或极客风格，秒级生成外观</p>
  </div>
  <div class="step">
    <div class="step-num">04</div>
    <h3>现场演说</h3>
    <p>携激光笔与画笔登台，或一键导出脱机单文件分发</p>
  </div>
</div>

---

# 6. 核心业务与战绩大看板

使用 \`<div class="stat-grid">\` 构建麦肯锡级高管汇报大看板，支持大数字、指标标签与增长微标：

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">10x</div>
    <div class="stat-label">课件制作效能</div>
    <div class="stat-desc">纯文本秒级排版，告别机械拖拽</div>
    <span class="stat-badge">+900% 效率提升</span>
  </div>
  <div class="stat-card">
    <div class="stat-value">100%</div>
    <div class="stat-label">脱机放映保障</div>
    <div class="stat-desc">单文件自包含 HTML，双击即开演</div>
    <span class="stat-badge">零网络依赖</span>
  </div>
  <div class="stat-card">
    <div class="stat-value">0 门槛</div>
    <div class="stat-label">普通人开箱即用</div>
    <div class="stat-desc">浏览器本地纯前端单机驱动</div>
    <span class="stat-badge">100% 隐私安全</span>
  </div>
</div>

---

# 7. 团队与演讲嘉宾名片

使用 \`<div class="profile">\` 呈现清晰的答辩导师、发布会演讲者或核心主创介绍：

<div class="profile-grid">
  <div class="profile">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="头像" />
    <div class="profile-info">
      <h3>林教授 / 首席科学家</h3>
      <div class="title">前沿计算重点实验室主任 · 博士生导师</div>
      <p>主导下一代高性能图形管线与交互技术研发，入选国家级领军人才。</p>
    </div>
  </div>
  <div class="profile">
    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="头像" />
    <div class="profile-info">
      <h3>陈博士 / 产品总监</h3>
      <div class="title">MarkSlide 核心架构师 · 资深极客</div>
      <p>专注于人机交互与极简主义工具链设计，坚信结构化内容胜过花哨设计。</p>
    </div>
  </div>
</div>

---

# 8. 原生 Mermaid 流程与架构图

直接使用标准三反引号 \`\`\`mermaid 绘制高质量矢量流图，支持暗亮主题自适应：

\`\`\`mermaid
flowchart LR
    A[Markdown 结构化文稿] --> B[Marp Core 编译引擎]
    B --> C[动态 Scoped CSS 主题注入]
    B --> D[KaTeX 公式 & Mermaid 矢量栅格]
    C --> E[16:9 自适应沉浸演播视口]
    D --> E
    E --> F[一键打印为矢量 PDF / 单文件 HTML 导出]

    style A fill:#0284c7,stroke:#0369a1,color:#ffffff
    style E fill:#10b981,stroke:#059669,color:#ffffff
\`\`\`

---

# 9. 出版级 KaTeX 数学公式推导

支持行内公式如节点深度 $h$ 与检索复杂度 $\\mathcal{O}(\\log n)$，以及带出版级圆角微阴影的居中公式卡片：

在高度为 $h$ 的平衡二叉树中，递归节点检索的最坏时间复杂度推导证明：

$$T(n) = 2T\\left(\\frac{n}{2}\\right) + \\mathcal{O}(1) \\implies T(n) = \\mathcal{O}(\\log n)$$

公式在暗色与亮色主题下均会自动适配背景色块与对比度，确保高校答辩与科研研讨会的清晰严谨。

---

# 10. 高精度代码高亮与工程示例

内置 One Dark 工程师代码块语法高亮，适合技术团队复盘、架构答辩与教学课件：

\`\`\`typescript
// 快速二分检索算法实现 (TypeScript)
export function binarySearch(arr: number[], target: number): number {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (left = mid + 1) : (right = mid - 1);
  }
  return -1; // 未命中检索目标
}
\`\`\`

---

# 11. 讲台互动全家桶与快捷键总览

放映模式（按 \`F5\`）内置极客演播全套工具，无需外接设备，键盘盲操即可从容控场：

| 快捷键 | 互动功能 | 场景说明 |
| :--- | :--- | :--- |
| **Space / →** | 下一页翻页 | 平滑过渡动效，柔和切换不闪屏 |
| **L** | 开启/关闭 红色激光笔 | 模拟实体物理激光笔，随鼠标光标精准导引视线 |
| **P / B** | 画笔批注 / 黑板板书 | 自由绘制草图与公式推导，支持 \`Ctrl+Z\` 逐笔撤销 |
| **T** | 演讲与研讨倒计时 | 悬浮玻璃拟态计时器，结束自动响起温和提示音 |
| **R** | 课堂/研讨互动抽签 | 内置姓名抽签摇号器，带五彩纸屑庆祝动效 |
| **N** | 演讲者备忘浮层 | 随屏查看当前页备注提纲，演讲更有底气 |
| **Ctrl + P** | 打印 / 存为 PDF | 标准 16:9 无边距输出，一键交付高质量矢量演示稿 |

<!-- note: 本页列举放映模式下的全部快捷键体系，支持讲台免外设盲操。 -->

---

<!-- _class: lead -->

# 12. 开启您的出版级演示之旅
### 删繁就简 · 专注思想与内容的力量

点击右上角 **「开始放映」** 或按 **F5** 即可进入全屏沉浸式演示；
随时清空左侧编辑器，开始撰写属于您的第一份高品质演示稿！

<!-- note: 感谢使用 MarkSlide Studio，祝您的每一次演讲与分享都清晰出彩！ -->
`;
interface EditorWorkspaceProps {
  onStartPresentation: (markdown: string, html: string, css: string, total: number) => void;
}

export const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({ onStartPresentation }) => {
  const [markdown, setMarkdown] = useState<string>(SHOWCASE_MARKDOWN);
  const [renderedData, setRenderedData] = useState<{ html: string; css: string; count: number }>({
    html: '',
    css: '',
    count: 1,
  });
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);
  const [previewDirection, setPreviewDirection] = useState<'next' | 'prev' | 'fade'>('fade');

  const previewBoxRef = useRef<HTMLDivElement | null>(null);
  const printBoxRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);
  const compileTimerRef = useRef<number | null>(null);

  // 防抖编译 Marp 渲染（200ms），打字无卡顿
  useEffect(() => {
    if (compileTimerRef.current) clearTimeout(compileTimerRef.current);
    compileTimerRef.current = window.setTimeout(() => {
      const result = slideCompiler.render(markdown);
      setRenderedData(result);
    }, 200);
    return () => {
      if (compileTimerRef.current) clearTimeout(compileTimerRef.current);
    };
  }, [markdown]);

  // 拆分单页 HTML 列表，采用共享的 parseSlides
  const parsedSlides = React.useMemo(() => {
    return parseSlides(renderedData.html);
  }, [renderedData.html]);

  const slideCount = parsedSlides.length > 0 ? parsedSlides.length : 1;

  // 确保当前预览页码在合法范围
  useEffect(() => {
    if (activePreviewIndex >= slideCount) {
      setActivePreviewIndex(Math.max(0, slideCount - 1));
    }
  }, [slideCount, activePreviewIndex]);

  // 解析当前主题以及是否为暗色
  const currentTheme = React.useMemo(() => {
    const match = markdown.match(/^theme:\s*([a-zA-Z0-9_-]+)/m);
    return match ? match[1] : 'academic';
  }, [markdown]);

  const isDarkTheme = React.useMemo(() => {
    const opt = THEME_OPTIONS.find((t) => t.id === currentTheme);
    return opt ? opt.isDark : false;
  }, [currentTheme]);

  // 仅在当前单页渲染 Mermaid 矢量图，并与主题暗亮色联动
  useEffect(() => {
    if (previewBoxRef.current) {
      slideCompiler.renderMermaidElements(previewBoxRef.current, isDarkTheme);
    }
  }, [activePreviewIndex, renderedData.html, isDarkTheme]);

  // 切换主题：直接替换或注入 theme: xxx，保留全部正文内容
  const handleSelectTheme = (newTheme: string) => {
    setMarkdown((prev) => {
      if (/^theme:\s*[a-zA-Z0-9_-]+/m.test(prev)) {
        return prev.replace(/^theme:\s*[a-zA-Z0-9_-]+/m, `theme: ${newTheme}`);
      }
      if (/^---\r?\n([\s\S]*?)\r?\n---/m.test(prev)) {
        return prev.replace(/^---\r?\n/m, `---\ntheme: ${newTheme}\n`);
      }
      return `---\nmarp: true\ntheme: ${newTheme}\npaginate: true\n---\n\n` + prev;
    });
  };

  // 快捷插入语法片段到 CodeMirror 光标位置
  const insertSnippet = (snippet: string) => {
    const view = editorRef.current?.view;
    if (!view) {
      setMarkdown((prev) => prev + '\n\n' + snippet + '\n');
      return;
    }
    const selection = view.state.selection.main;
    const insertText = '\n\n' + snippet + '\n\n';
    view.dispatch({
      changes: { from: selection.from, to: selection.to, insert: insertText },
      selection: { anchor: selection.from + insertText.length },
      scrollIntoView: true,
    });
    view.focus();
  };

  // 插入并内联 Base64 图片（使用 Markdown 引用式链接，正文干净清爽）
  const insertImageFile = async (file: File | Blob) => {
    try {
      const dataUrl = await compressImageToDataUrl(file);
      const tag = `img-${Date.now().toString().slice(-4)}`;
      const view = editorRef.current?.view;
      if (!view) {
        setMarkdown((prev) => `${prev}\n\n![插图][${tag}]\n\n[${tag}]: ${dataUrl}\n`);
        return;
      }

      const selection = view.state.selection.main;
      const refSnippet = `\n\n![插图][${tag}]\n\n`;
      const docEnd = view.state.doc.length;
      const definition = `\n\n[${tag}]: ${dataUrl}\n`;

      view.dispatch({
        changes: [
          { from: selection.from, to: selection.to, insert: refSnippet },
          { from: docEnd, insert: definition },
        ],
        selection: { anchor: selection.from + refSnippet.length },
        scrollIntoView: true,
      });
      view.focus();
    } catch (err) {
      console.error('Image insertion failed:', err);
    }
  };

  // 监听直接在编辑器内粘贴截图 (Ctrl+V)
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          insertImageFile(file);
          return;
        }
      }
    }
  };

  // 监听文件拖拽进编辑区
  const handleDrop = (e: React.DragEvent) => {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        e.preventDefault();
        insertImageFile(file);
      }
    }
  };

  // 打开本地 .md 文件
  const handleOpenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content) {
        setMarkdown(content);
        setActivePreviewIndex(0);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 保存为本地 .md 文件
  const handleSaveMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slides-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导出单文件自包含 HTML
  const handleExportHtml = () => {
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'MarkSlide Presentation';
    exportStandaloneHtml(
      title,
      renderedData.html,
      renderedData.css
    );
  };

  // 启动放映模式
  const handleLaunch = useCallback(() => {
    onStartPresentation(markdown, renderedData.html, renderedData.css, slideCount);
  }, [markdown, renderedData.html, renderedData.css, slideCount, onStartPresentation]);

  // 独立全量打印为 16:9 PDF
  const handlePrint = useCallback(async () => {
    if (printBoxRef.current) {
      await slideCompiler.renderMermaidElements(printBoxRef.current, isDarkTheme);
    }
    window.print();
  }, [isDarkTheme]);

  // 全局 F5 直接放映，Ctrl+P 打印导出 PDF
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F5") {
        e.preventDefault();
        handleLaunch();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleLaunch, handlePrint]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#090d16] text-slate-200 overflow-hidden print:overflow-visible print:h-auto print:bg-transparent font-mono select-none">
      {/* 注入主题 CSS */}
      <style>{renderedData.css}</style>

      {/* 专用打印与 PDF 导出容器：打印模式下仅此容器显示，每页严格 16:9 无边距独立页输出 */}
      <div ref={printBoxRef} className="hidden print:block marp-print-container">
        {parsedSlides.map((slideHtml, index) => (
          <div
            key={index}
            className="marp-print-slide"
            dangerouslySetInnerHTML={{ __html: slideHtml }}
          />
        ))}
      </div>

      {/* 屏幕端界面（顶部工具条 + 双栏编辑器），打印时完全隐藏 */}
      <div className="flex flex-col h-screen w-screen screen-only no-print print:hidden">
        {/* 隐藏文件输入 */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleOpenFile}
          accept=".md,.markdown,.txt"
          className="hidden"
        />
        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) insertImageFile(file);
            e.target.value = '';
          }}
          accept="image/*"
          className="hidden"
        />

        {/* 顶部极客极简导航栏 */}
        <header className="h-12 px-4 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
          {/* 左侧 Logo 与 Theme 选择器 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Terminal size={17} className="text-cyan-400" />
              <span className="font-bold text-sm tracking-wider text-slate-100 font-sans">
                MarkSlide Studio<span className="text-cyan-400 font-mono text-xs ml-1 font-normal">Max Pro Ultra Extreme ... </span>
              </span>
            </div>

            <div className="h-4 w-px bg-slate-800" />

            {/* Theme 主题快速切换 */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
              <Palette size={14} className="text-cyan-400" />
              <span className="text-slate-400 text-xs">主题:</span>
              <select
                value={currentTheme}
                onChange={(e) => handleSelectTheme(e.target.value)}
                className="bg-slate-800/90 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700/70 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium hover:bg-slate-700/80 transition-colors"
                title="切换 PPT 主题样式"
              >
                {THEME_OPTIONS.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 右侧动作按钮区：纯精美 ICON + 快捷操作 */}
          <div className="flex items-center gap-1.5 font-sans">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-colors group relative"
              title="打开本地 .md 文件"
            >
              <FolderOpen size={16} />
            </button>

            <button
              onClick={handleSaveMd}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-colors group relative"
              title="保存为本地 .md 文件"
            >
              <Save size={16} />
            </button>

            <button
              onClick={handleExportHtml}
              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 rounded-lg transition-colors group relative"
              title="导出自包含离线 HTML (双击直接放映)"
            >
              <Download size={16} />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-sky-400 hover:bg-slate-800/80 rounded-lg transition-colors group relative"
              title="打印 / 存为 PDF (16:9 矢量级导出)"
            >
              <Printer size={16} />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            {/* 纯三角放映 ICON 按钮 */}
            <button
              onClick={handleLaunch}
              className="p-2 text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md shadow-cyan-950/40 hover:scale-105 active:scale-95 transition-all"
              title="进入放映模式 (F5)"
            >
              <Play size={16} className="fill-current" />
            </button>
          </div>
        </header>

        {/* 主体分栏：左侧极客 MD 编辑区，右侧单页 16:9 高性能渲染预览 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧编辑器 */}
          <div className="w-1/2 border-r border-slate-800/80 flex flex-col bg-[#0b0f19]">
            {/* 编辑器快捷组件工具条：纯精美 ICON + 悬浮 Tips */}
            <div className="h-9 px-3 border-b border-slate-800/60 bg-slate-900/50 flex items-center justify-between text-xs text-slate-400 select-none overflow-x-auto no-scrollbar font-sans">
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => insertSnippet('---\n\n# 新幻灯片标题\n\n- 核心观点 1\n- 核心观点 2')}
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入分页符 (---)"
                >
                  <Plus size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '| 方案对比 | 基础标准版 | 企业私有化旗舰版 |\n| :--- | :--- | :--- |\n| 响应时延 | 毫秒级云端调度 (< 50ms) | 内网专属集群直连 (< 5ms) |\n| 数据隐私 | 传输层全程加密 | 数据 100% 物理不出内网 |\n| 专家支持 | 5x8 标准工单保障 | 7x24 专属技术总监直通车 |'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入对比三线表"
                >
                  <Table size={14} />
                </button>

                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入本地图片（或在编辑器直接 Ctrl+V 粘贴截图）"
                >
                  <ImageIcon size={14} />
                </button>

                <div className="h-3.5 w-px bg-slate-800 mx-1" />

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="card-grid">\n  <div class="card">\n    <h3>左侧板块</h3>\n    <p>关键内容与推导说明</p>\n  </div>\n  <div class="card">\n    <h3>右侧板块</h3>\n    <p>关键数据与配套举证</p>\n  </div>\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入双栏卡片"
                >
                  <Columns2 size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="card-grid-3">\n  <div class="card">\n    <h3>01. 洞察</h3>\n    <p>深度洞察业务与场景痛点</p>\n  </div>\n  <div class="card">\n    <h3>02. 架构</h3>\n    <p>端到端高可用系统方案</p>\n  </div>\n  <div class="card">\n    <h3>03. 落地</h3>\n    <p>规模化交付与效能提升</p>\n  </div>\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入三栏卡片 (.card-grid-3)"
                >
                  <LayoutGrid size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="split">\n  <div>\n    <h2>核心突破与成果</h2>\n    <p>经过多轮迭代与端到端优化，系统在复杂高并发场景下达成突破性表现：</p>\n    <ul>\n      <li><strong>时延压缩</strong>：P99 响应降低 64%</li>\n      <li><strong>可用性</strong>：实现 99.99% 持续稳定运行</li>\n    </ul>\n  </div>\n  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="成果图" />\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入 50/50 图文杂志级混排"
                >
                  <Columns size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="steps">\n  <div class="step">\n    <div class="step-num">1</div>\n    <h3>方案预研</h3>\n    <p>需求对齐与技术预研验证</p>\n  </div>\n  <div class="step">\n    <div class="step-num">2</div>\n    <h3>架构研发</h3>\n    <p>核心算法调度与引擎重构</p>\n  </div>\n  <div class="step">\n    <div class="step-num">3</div>\n    <h3>灰度发布</h3>\n    <p>小流量验证与性能追踪</p>\n  </div>\n  <div class="step">\n    <div class="step-num">4</div>\n    <h3>全面落地</h3>\n    <p>规模化上线与资产沉淀</p>\n  </div>\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入时间轴 / 步骤演进卡片"
                >
                  <Milestone size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="stat-grid">\n  <div class="stat-card">\n    <div class="stat-value">99.9%</div>\n    <div class="stat-label">系统可用性 (SLA)</div>\n    <div class="stat-desc"><span class="stat-badge">+0.8%</span> 跨区灾备高可用</div>\n  </div>\n  <div class="stat-card">\n    <div class="stat-value">4.2x</div>\n    <div class="stat-label">端到端吞吐提升</div>\n    <div class="stat-desc"><span class="stat-badge">突破</span> 零拷贝架构</div>\n  </div>\n  <div class="stat-card">\n    <div class="stat-value">0ms</div>\n    <div class="stat-label">专网网络抖动</div>\n    <div class="stat-desc"><span class="stat-badge">专线</span> 物理光纤直连</div>\n  </div>\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入核心大指标统计看板 (.stat-grid)"
                >
                  <TrendingUp size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="profile">\n  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="头像" />\n  <div class="profile-info">\n    <h3>张博士 / 首席科学家</h3>\n    <div class="title">ASDF实验室主任 · 博士生导师</div>\n    <p>著名高能物理学家，曾获搞笑诺贝尔奖。</p>\n  </div>\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入嘉宾 / 人物介绍卡片"
                >
                  <User size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet('> **核心法则**：\n> 保持简单，最小化状态，单一职责驱动。')
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入重点金句卡片"
                >
                  <Quote size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="callout callout-tip">\n  <div class="callout-title">💡 关键创新要点</div>\n  <p>结构化内容配合高精度排版组件，专注思考本质，带来出版级视觉质感。</p>\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入语义提示框 (Callout: Tip/Note/Warning/Caution)"
                >
                  <MessageSquarePlus size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<div class="compare">\n  <div class="compare-before">\n    <h3>❌ 传统做法与痛点</h3>\n    <ul>\n      <li>机械拖拽耗费数小时</li>\n      <li>排版错乱、字体错位</li>\n    </ul>\n  </div>\n  <div class="compare-after">\n    <h3>✅ MarkSlide 现代方案</h3>\n    <ul>\n      <li>纯文本秒级出版级排版</li>\n      <li>单文件 HTML 零依赖分发</li>\n    </ul>\n  </div>\n</div>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入前后对比面板 (Before vs After)"
                >
                  <GitCompare size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet(
                      '<span class="badge badge-success">稳定就绪</span> <span class="badge badge-info">v2.0 升级</span> <span class="badge badge-warning">注意</span>'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入彩色徽章标签 (.badge)"
                >
                  <Tag size={14} />
                </button>

                <div className="h-3.5 w-px bg-slate-800 mx-1" />

                <button
                  onClick={() =>
                    insertSnippet(
                      '```mermaid\nflowchart LR\n    Start([用户请求]) --> Process[分布式网关]\n    Process --> DB[(数据库持久化)]\n    DB --> Return([毫秒返回])\n```'
                    )
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入 Mermaid 流程图"
                >
                  <GitGraph size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet('$$\\mathcal{L}_{total} = \\lambda_1 \\mathcal{L}_{cls} + \\lambda_2 \\mathcal{L}_{reg}$$')
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入 KaTeX 数学公式"
                >
                  <Sigma size={14} />
                </button>

                <button
                  onClick={() =>
                    insertSnippet('```typescript\n// 核心调度入口\nexport async function dispatch(event: Event) {\n  console.log("dispatching", event.id);\n}\n```')
                  }
                  className="p-1.5 hover:text-cyan-400 hover:bg-slate-800/80 rounded-md transition-colors text-slate-400"
                  title="插入代码块"
                >
                  <Code size={14} />
                </button>
              </div>

              <div className="text-slate-500 font-mono text-[11px] shrink-0 pl-2">
                {markdown.length} 字符
              </div>
            </div>

            {/* CodeMirror 6 极客 Markdown 编辑区（支持 Ctrl+V 粘贴截图与拖拽图片） */}
            <div
              onPaste={handlePaste}
              onDrop={handleDrop}
              className="flex-1 overflow-hidden relative font-mono text-xs"
            >
              <CodeMirror
                ref={editorRef}
                value={markdown}
                height="100%"
                theme={oneDark}
                extensions={[langMarkdown()]}
                onChange={(val) => setMarkdown(val)}
                onUpdate={(viewUpdate) => {
                  if (viewUpdate.selectionSet) {
                    const pos = viewUpdate.state.selection.main.head;
                    const targetSlide = getSlideIndexAtOffset(viewUpdate.state.doc.toString(), pos);
                    setActivePreviewIndex((prev) => {
                      const clamped = Math.max(0, Math.min(targetSlide, slideCount - 1));
                      if (prev !== clamped) {
                        setPreviewDirection('fade');
                        return clamped;
                      }
                      return prev;
                    });
                  }
                }}
                className="h-full text-xs [&_.cm-scroller]:overflow-auto [&_.cm-editor]:h-full [&_.cm-gutters]:bg-[#0c101d] [&_.cm-gutters]:border-r [&_.cm-gutters]:border-slate-800/80 [&_.cm-activeLineGutter]:bg-slate-800/60"
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  history: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  highlightActiveLine: true,
                  foldGutter: true,
                }}
              />
            </div>
          </div>

          {/* 右侧高性能单页 16:9 实时预览窗 */}
          <div className="w-1/2 flex flex-col bg-[#06090f] select-none font-sans">
            {/* 预览窗顶部状态条 */}
            <div className="h-9 px-4 border-b border-slate-800/60 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
              <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                16:9 实时视口 · {THEME_OPTIONS.find((t) => t.id === currentTheme)?.name}
              </span>

              {/* 极简翻页胶囊 */}
              <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                <button
                  onClick={() => {
                    setPreviewDirection('prev');
                    setActivePreviewIndex((p: number) => Math.max(0, p - 1));
                  }}
                  disabled={activePreviewIndex === 0}
                  className="p-0.5 hover:text-cyan-400 disabled:opacity-20 transition-colors"
                  title="上一页"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="font-mono text-[11px] text-slate-200 font-semibold px-1">
                  {activePreviewIndex + 1} / {slideCount}
                </span>
                <button
                  onClick={() => {
                    setPreviewDirection('next');
                    setActivePreviewIndex((p: number) => Math.min(slideCount - 1, p + 1));
                  }}
                  disabled={activePreviewIndex === slideCount - 1}
                  className="p-0.5 hover:text-cyan-400 disabled:opacity-20 transition-colors"
                  title="下一页"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* 预览窗单页居中展示（完整支持 Marp 样式与背景，带平滑过渡） */}
            <div
              ref={previewBoxRef}
              className="flex-1 flex items-center justify-center p-6 overflow-hidden"
            >
              <div className="w-full max-w-[760px] aspect-[16/9] rounded-xl shadow-2xl overflow-hidden border border-slate-800 transition-all flex items-center justify-center relative bg-transparent">
                <div
                  key={activePreviewIndex}
                  className={`w-full h-full ${previewDirection === 'next'
                      ? 'animate-slide-next'
                      : previewDirection === 'prev'
                        ? 'animate-slide-prev'
                        : 'animate-slide-in'
                    } flex items-center justify-center [&>div.marpit]:w-full [&>div.marpit]:h-full [&_svg[data-marpit-svg]]:w-full [&_svg[data-marpit-svg]]:h-full`}
                  dangerouslySetInnerHTML={{
                    __html:
                      parsedSlides[activePreviewIndex] ||
                      '<div class="marpit"><section><h1>暂无内容</h1></section></div>',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
