# MarkSlide Studio

<p align="center">
  <strong>纯文本驱动的下一代出版级高质感演示系统</strong>
  <br />
  <em>从 Markdown 到商业级路演与学术级课件 · 100% 纯前端零后端依赖</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

## ✨ 核心特性

- 🔒 **100% 纯客户端运行**：无需任何后端服务器或云端依赖，所有解析、渲染与导出均在浏览器沙箱本地完成，数据隐私 100% 安全。
- 🎨 **4 套出版级专业主题**：
  - **学术 · Academic**：牛津深蓝、纸质暖白、高精度三线学术表格与公式注解。
  - **商业 · Business**：午夜深蓝、高管毛玻璃光晕、McKinsey 级数据冲击大看板。
  - **极客 · Tech-PM**：赛博极夜点阵、macOS 风格代码窗体与进度状态胶囊。
  - **简约 · Minimalist**：原研哉/苹果冷白克制风、大字阶留白美学。
- 🧩 **开箱即用的高阶排版组件**：
  - **语义提示框**：Note、Tip、Warning、Caution 四色微边玻璃态提示框。
  - **前后对比面板**：Before vs After 痛点与突破红绿对比。
  - **KPI 统计看板**：超大字阶指标、副标题与趋势微标（`.stat-grid`）。
  - **自适应栅格系统**：双栏、三栏（`.card-grid-3`）、四栏网格与 50/50 杂志级图文混排。
  - **时间轴与名片**：步骤演进卡片、团队/演讲嘉宾名片、彩色徽章标签。
- 📐 **专业科技与图表支持**：
  - 内置 **KaTeX** 数学公式出版级居中排版。
  - 原生集成 **Mermaid** 流程图与时序图渲染。
  - 自动剔除默认表格竖线，完美呈现现代学术三线表。
- 🖥️ **全功能演播与双向联动**：
  - **方向感知翻页**：前进/后退平滑移入微动效。
  - **全屏放映 (F5)**：支持演讲者备忘笔记（按 `N` 切换）、纸屑庆祝彩蛋（按 `C` 键）。
  - **编辑器与预览光标同步**：所写即所见，实时高帧率定位。
- 📦 **多元导出方案**：
  - **单文件离线 HTML**：双击即看，完全内置样式与交互脚本，零依赖分发。
  - **16:9 矢量打印 / 存为 PDF**：纯幻灯片隔离渲染，自动消除编辑器外壳与滚动条。

---

## 🚀 快速上手

### 环境要求
- [Node.js](https://nodejs.org/) `>= 18.20` 或 `>= 20.0`
- 包管理器：`npm` / `pnpm` / `yarn`

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/your-username/markslide.git
cd markslide

# 安装依赖
npm install

# 启动本地开发服务器
npm run dev
```

浏览器打开 `http://localhost:5173` 即可开始创作。

### 生产打包

```bash
npm run build
```

打包产物将生成在 `dist` 目录中。

---

## 🌐 部署指南 (Cloudflare Pages / Vercel)

本项目是纯静态前端应用，推荐使用 **Cloudflare Pages** 免费全球加速托管：

1. 在 Cloudflare 控制台新建 **Pages** 项目，绑定 GitHub 仓库；
2. 构建参数配置：
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. 项目已内置 `.node-version`、`public/_redirects`（SPA 路由直达）和 `public/_headers`（长期静态缓存），无需额外配置即可一键自动化上线。

---

## ⌨️ 快捷键指南

| 快捷键 | 功能 |
| :--- | :--- |
| `F5` / 点击放映图标 | 进入全屏演播模式 |
| `Space` / `→` / `PageDown` | 下一页幻灯片 |
| `←` / `PageUp` | 上一页幻灯片 |
| `Home` / `End` | 跳转至首页 / 末页 |
| `N` (放映模式下) | 切换演讲者备忘笔记浮层 |
| `C` (放映模式下) | 触发庆祝纸屑粒子效果 🎉 |
| `Esc` | 退出全屏放映 |
| `Ctrl + V` (编辑器中) | 直接粘贴剪贴板截图为压缩图片 |

---

## 🛠️ 技术栈

- **Core**: React 19, TypeScript
- **Bundler**: Vite 8
- **Styling**: TailwindCSS v4, Vanilla CSS Design System
- **Markdown Engine**: Marp Core
- **Code Editor**: CodeMirror 6
- **Graphics & Math**: Mermaid.js, KaTeX, Canvas-Confetti
- **Icons**: Lucide React

---

## 📄 License

[MIT License](LICENSE)
