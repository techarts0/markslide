export interface SlideDoc {
  id: string;
  title: string;
  content: string;
  theme?: string;
  updatedAt: number;
}

export interface FolderItem {
  id: string;
  name: string;
  isOpen?: boolean;
  folders: FolderItem[];
  slides: SlideDoc[];
}

export interface ExplorerData {
  folders: FolderItem[];
  slides: SlideDoc[]; // 根目录下未分类文稿
}

export interface AuthUser {
  id: string;
  email: string;
  nickname: string;
  avatarUrl?: string;
  tier: 'free' | 'pro';
}

export const DEFAULT_EXPLORER_DATA: ExplorerData = {
  folders: [
    {
      id: 'folder-course-1',
      name: 'IC2001 · 集成电路物理基础',
      isOpen: true,
      folders: [
        {
          id: 'folder-course-1-w1',
          name: '第 1 周：晶体管物理',
          isOpen: true,
          folders: [],
          slides: [
            {
              id: 'slide-ic-01',
              title: '01-CMOS反相器与版图.md',
              theme: 'academic',
              updatedAt: Date.now() - 3600000 * 24,
              content: `---
marp: true
theme: academic
paginate: true
header: 'IC2001 · 第 1 讲：晶体管物理'
footer: '© 2026 HatePPT'
---

<!-- _class: lead -->

# 第 1 讲：CMOS 晶体管物理
### 从 MOS 场效应到互补逻辑开关
*讲授人：芯片微架构实验室*

---

# 1. 为什么是反相器？

反相器是现代数亿晶体管芯片的微观量子细胞：

- **上拉网络 (PUN)**：PMOS 负责充电输出高电平 $V_{DD}$
- **下拉网络 (PDN)**：NMOS 负责放电输出低电平 $GND$

$$V_{out} = \\overline{V_{in}}$$

<div class="callout callout-tip">
  <div class="callout-title">💡 关键物理事实</div>
  <p>由于电子迁移率约为空穴的 2~3 倍，工业界 PMOS 沟道宽度一般取为 NMOS 的 2~2.5 倍。</p>
</div>
`,
            },
            {
              id: 'slide-ic-02',
              title: '02-逻辑门延迟与险象.md',
              theme: 'academic',
              updatedAt: Date.now() - 3600000 * 12,
              content: `---
marp: true
theme: academic
paginate: true
header: 'IC2001 · 第 2 讲：逻辑门延迟'
footer: '© 2026 HatePPT'
---

<!-- _class: lead -->

# 第 2 讲：组合逻辑延时与冒险
### 物理延迟、竞争冒险与毛刺消除

---

# 静态险象推导

设表达式 $F = A \\cdot B + \\overline{A} \\cdot C$，当 $B=1, C=1$ 时：

$$F = A + \\overline{A} = 1$$

但由于反相器的物理传输延时 $\\Delta t$：
输入 $A: 1 \\to 0$ 跃变时，两与门输出会出现微小全 0 缝隙，在 OR 门输出产生向下凹坑毛刺！
`,
            },
          ],
        },
        {
          id: 'folder-course-1-w2',
          name: '第 2 周：时序逻辑签核',
          isOpen: false,
          folders: [],
          slides: [],
        },
      ],
      slides: [],
    },
    {
      id: 'folder-business',
      name: '商业路演与年度汇报',
      isOpen: false,
      folders: [],
      slides: [
        {
          id: 'slide-biz-01',
          title: '2026-Q1-年度战报.md',
          theme: 'business',
          updatedAt: Date.now() - 3600000 * 48,
          content: `---
marp: true
theme: business
paginate: true
header: 'HatePPT · 2026 Q1 年度战报'
footer: 'Confidential · 内部战略会议'
---

<!-- _class: lead -->

# 2026 Q1 商业与战略战报
### 突破传统软件桎梏 · 纯文本驱动未来

---

# 核心战绩看板

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">$120k</div>
    <div class="stat-label">月度循环收入 (MRR)</div>
    <div class="stat-desc"><span class="stat-badge">+42%</span> 环比高速增长</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">98.2%</div>
    <div class="stat-label">付费用户留存率</div>
    <div class="stat-desc"><span class="stat-badge">顶尖</span> 行业基准</div>
  </div>
</div>
`,
        },
      ],
    },
  ],
  slides: [
    {
      id: 'slide-default-guide',
      title: '交互式用户指南.md',
      theme: 'academic',
      updatedAt: Date.now(),
      content: '', // 将在初始化时绑定 SHOWCASE_MARKDOWN
    },
  ],
};
