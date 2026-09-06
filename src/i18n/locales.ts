export type Locale = 'zh' | 'en';

export const translations = {
  zh: {
    // 顶部栏
    topbar: {
      tagline: 'Markdown to Presentation',
      openMd: '打开本地 .md 文件',
      saveMd: '保存为本地 .md 文件',
      exportHtml: '导出自包含离线 HTML (双击直接放映)',
      printPdf: '打印 / 存为 PDF (16:9 矢量级导出)',
      presentF5: '进入放映模式 (F5)',
      langToggle: '切换语言 (Language)',
    },

    // 左侧 ActivityBar
    activityBar: {
      lockedTitle: '云端功能已锁定 · 点击登录解锁',
      lockedTip: '云端功能已锁定 · 点击登录解锁',
      explorer: '文稿库 · Explorer',
      explorerLocked: '云端文稿库 · 登录解锁',
      outline: '幻灯片大纲 · Outline',
      outlineLocked: '幻灯片大纲 · 登录解锁',
      search: '云端文稿搜索 · Search',
      searchLocked: '云端文稿搜索 · 登录解锁',
      themes: '主题市场与模板库 · Themes',
      themesLocked: '云端主题市场 · 登录解锁',
      subscription: '开通 Pro 会员与云端特权',
      subscriptionActive: 'HatePPT Pro 尊贵会员 (已激活)',
      subscriptionLocked: '会员订阅与特权 · 登录解锁',
      shortcuts: '快捷键指引 · Shortcuts',
      loginPrompt: '未登录 · 点击登录解锁云端功能与订阅',
      accountManage: '点击管理账号 / 退出登录',
      proUser: 'Pro 会员',
      freeUser: '免费用户',
    },

    // 文稿树 SlideExplorer
    explorer: {
      title: '文稿库 · EXPLORER',
      newSlide: '新建根幻灯片 (.md)',
      newFolder: '新建根文件夹',
      collapse: '收起文稿库 (Ctrl+B)',
      newSlideInFolder: '在此目录下新建 Slide',
      newSubFolder: '新建子文件夹',
      rename: '重命名',
      delete: '删除',
      deleteFolderConfirm: '确定删除文件夹 "{name}" 及其所有文稿吗？',
      deleteSlideConfirm: '确定删除幻灯片 "{title}" 吗？',
      emptyFolder: '空文件夹',
      emptyList: '暂无文稿，点击右上角新建',
      cloudReady: 'MarkSlide Studio',
      localReady: '本地就绪',
      createFolderTitle: '新建文件夹',
      createFolderDesc: '在文稿库中创建新的分类目录',
      folderNameLabel: '文件夹名称',
      folderNamePlaceholder: '例如：商业路演、学术课件',
      defaultFolderName: '新文件夹',
      confirm: '确认创建',
      cancel: '取消',
    },

    // 幻灯片大纲 SlideOutline
    outline: {
      title: '幻灯片大纲 · OUTLINE',
      slideCount: '共 {count} 页',
      searchPlaceholder: '过滤大纲标题与内容...',
      newSlide: '向下追加新幻灯片',
      collapse: '收起大纲面板',
      jumpToSlide: '跳转至此页',
      moveUp: '上移本页',
      moveDown: '下移本页',
      insertAfter: '在下方插入新页',
      deleteSlide: '删除本页',
      deleteConfirm: '确定要删除第 {page} 页「{title}」吗？',
      empty: '未找到匹配的幻灯片',
      currentStatus: '当前处于第 {current} / {total} 页',
      badges: {
        lead: '封面',
        table: '表格',
        cards: '卡片',
        steps: '步骤',
        stats: '统计',
        mermaid: '流程',
        code: '代码',
        notes: '备注',
      },
    },

    // 编辑器区域
    editor: {
      untitled: '未命名.md',
      newSlideDoc: '新建演示文稿',
      togglePreview: '展开 / 折叠实时渲染视口 (Ctrl+J 或 Ctrl+\\)',
      closeTab: '关闭标签页',
      theme: '主题:',
      charCount: '字符',
      splitDragTip: '拖动调整左右分栏宽度（双击复位 50%）',

      // 快捷组件
      insertSlideBreak: '插入分页符 (---)',
      insertTable: '插入对比三线表',
      insertImage: '插入本地图片（或在编辑器直接 Ctrl+V 粘贴截图）',
      insertCardGrid2: '插入双栏卡片',
      insertCardGrid3: '插入三栏卡片 (.card-grid-3)',
      insertSplit50: '插入 50/50 图文杂志级混排',
      insertSteps: '插入时间轴 / 步骤演进卡片',
      insertStatGrid: '插入核心大指标统计看板 (.stat-grid)',
      insertProfile: '插入嘉宾 / 人物介绍卡片',
      insertQuote: '插入重点金句卡片',
      insertCallout: '插入语义提示框 (Callout: Tip/Note/Warning/Caution)',
      insertCompare: '插入前后对比面板 (Before vs After)',
      insertBadge: '插入彩色徽章标签 (.badge)',
      insertMermaid: '插入 Mermaid 流程图',
      insertKatex: '插入 KaTeX 数学公式',
      insertCodeBlock: '插入代码块',
    },

    // 实时预览视口
    preview: {
      viewportTitle: '预览',
      continuousStream: '页连续流',
      modeStream: '长卷',
      modeSingle: '单页',
      modeStreamTip: '当前：连续长卷流（点击切换为单页聚焦）',
      modeSingleTip: '当前：单页聚焦（点击切换为连续长卷流）',
      prevSlide: '上一页',
      nextSlide: '下一页',
      collapsePreview: '收起实时渲染窗口 (Ctrl+J)',
      emptyContent: '暂无内容',
    },

    // 登录/注册弹窗
    auth: {
      cloudSubtitle: '纯文本驱动的出版级高质感演示系统 · 登录即可开启无限层级文稿管理与多端实时同步',
      tabLogin: '登录账号',
      tabRegister: '注册新账号',
      emailLabel: '电子邮箱',
      emailPlaceholder: 'name@example.com',
      passwordLabel: '登录密码',
      passwordPlaceholder: '至少 6 位字符',
      btnProcessing: '处理中...',
      btnLogin: '立即登录',
      btnRegister: '创建免费账号',
      guestBypass: '暂不登录，以访客模式体验全部本地功能',
      errValidEmail: '请输入有效的邮箱地址',
      errPasswordLen: '密码长度需至少 6 位',
    },

    // 快捷键弹窗
    shortcuts: {
      title: '快捷键与排版技巧速查',
      macNotice: 'Mac 用户请使用 ⌘ Cmd 键替代 Ctrl',
      btnGotIt: '我知道了',
      items: [
        { key: 'Ctrl + B', desc: '展开 / 收起左侧文稿库抽屉 (Slide Explorer)' },
        { key: 'Ctrl + J / Ctrl + \\', desc: '展开 / 收起右侧 16:9 实时渲染视口' },
        { key: 'F5', desc: '进入沉浸式全屏放映模式' },
        { key: 'Ctrl + P', desc: '打印 / 导出 16:9 矢量级无边距 PDF' },
        { key: 'Ctrl + V', desc: '编辑器内直接粘贴剪贴板截图（自动压缩并嵌入）' },
        { key: '---', desc: '插入分页符（3个连字符拆分单页幻灯片）' },
        { key: '<!-- _class: lead -->', desc: '设置当前单页为大标题主页（居中醒目）' },
      ],
    },

    // 会员订阅弹窗
    subscription: {
      title: 'Pro 云端会员',
      activeBadge: '当前已激活',
      subtitle: '解锁无限云端空间、独家出版级主题与高级导出特权',
      currentAccount: '当前账号：',
      proMember: 'Pro 会员',
      freeUser: '免费用户',
      perksTitle: 'Pro 会员尊享特权',
      perks: [
        { title: '无限多端云同步', desc: '幻灯片文稿库实时云端存储与版本快照' },
        { title: '独家出版级主题库', desc: '解锁学术顶刊、高管咨询与深色黑客全套模板' },
        { title: '4K 矢量高清导出', desc: '无水印高精度 PDF 打印与自定义域名独立放映' },
        { title: '云端智能提炼 (Beta)', desc: '基于大语言模型的 Markdown 课件自动排版' },
      ],
      monthlyTitle: '月度订阅',
      monthlyPrice: '¥19',
      monthlyUnit: '/ 月',
      monthlyDesc: '随时取消，灵活体验',
      annualBadge: '推荐 · 省 30%',
      annualTitle: '年度订阅',
      annualPrice: '¥168',
      annualUnit: '/ 年',
      annualDesc: '折合每月仅 ¥14，畅享全部特权',
      proActiveMsg: '您当前已是尊贵的 Pro 会员，所有云端与专属特权已全部解锁！',
      btnUpgrade: '立即开通 Pro 会员 (模拟一键升级)',
      btnNeedLogin: '请先登录账号后开通订阅',
      btnLogout: '退出登录当前账号',
      logoutConfirm: '确认退出当前账号 {email} 吗？退出后 ActivityBar 将自动锁定。',
    },
  },

  en: {
    // Topbar
    topbar: {
      tagline: 'Markdown to Presentation',
      openMd: 'Open local .md file',
      saveMd: 'Save as local .md file',
      exportHtml: 'Export standalone offline HTML',
      printPdf: 'Print / Save as PDF (16:9 vector export)',
      presentF5: 'Launch presentation (F5)',
      langToggle: 'Switch Language (语言)',
    },

    // Left ActivityBar
    activityBar: {
      lockedTitle: 'Cloud features locked · Sign in to unlock',
      lockedTip: 'Cloud features locked · Sign in to unlock',
      explorer: 'Library · Explorer',
      explorerLocked: 'Cloud Library · Sign in to unlock',
      outline: 'Slide Outline',
      outlineLocked: 'Slide Outline · Sign in to unlock',
      search: 'Cloud Search',
      searchLocked: 'Cloud Search · Sign in to unlock',
      themes: 'Themes & Templates',
      themesLocked: 'Themes & Templates · Sign in to unlock',
      subscription: 'Upgrade to Pro & Cloud Privileges',
      subscriptionActive: 'HatePPT Pro Member (Active)',
      subscriptionLocked: 'Membership & Pro Perks · Sign in to unlock',
      shortcuts: 'Shortcuts Reference',
      loginPrompt: 'Not signed in · Click to unlock cloud features',
      accountManage: 'Manage account / Sign out',
      proUser: 'Pro Member',
      freeUser: 'Free User',
    },

    // SlideExplorer
    explorer: {
      title: 'DOCUMENTS · EXPLORER',
      newSlide: 'New Root Slide (.md)',
      newFolder: 'New Root Folder',
      collapse: 'Collapse Explorer (Ctrl+B)',
      newSlideInFolder: 'New Slide in this folder',
      newSubFolder: 'New Subfolder',
      rename: 'Rename',
      delete: 'Delete',
      deleteFolderConfirm: 'Are you sure you want to delete folder "{name}" and all its slides?',
      deleteSlideConfirm: 'Are you sure you want to delete slide "{title}"?',
      emptyFolder: 'Empty folder',
      emptyList: 'No documents yet. Click top right to create one.',
      cloudReady: 'MarkSlide Studio',
      localReady: 'Local Ready',
      createFolderTitle: 'New Folder',
      createFolderDesc: 'Create a new collection folder in explorer',
      folderNameLabel: 'Folder Name',
      folderNamePlaceholder: 'e.g. Roadshow, Academic Lectures',
      defaultFolderName: 'New Folder',
      confirm: 'Create',
      cancel: 'Cancel',
    },

    // Slide Outline
    outline: {
      title: 'SLIDE OUTLINE',
      slideCount: '{count} slides',
      searchPlaceholder: 'Filter outline titles...',
      newSlide: 'Append new slide',
      collapse: 'Collapse outline',
      jumpToSlide: 'Jump to slide',
      moveUp: 'Move up',
      moveDown: 'Move down',
      insertAfter: 'Insert slide after',
      deleteSlide: 'Delete slide',
      deleteConfirm: 'Are you sure you want to delete slide {page} "{title}"?',
      empty: 'No matching slides found',
      currentStatus: 'Slide {current} of {total}',
      badges: {
        lead: 'Lead',
        table: 'Table',
        cards: 'Cards',
        steps: 'Steps',
        stats: 'Stats',
        mermaid: 'Flow',
        code: 'Code',
        notes: 'Note',
      },
    },

    // Editor Area
    editor: {
      untitled: 'Untitled.md',
      newSlideDoc: 'New Presentation',
      togglePreview: 'Toggle Preview Viewport (Ctrl+J or Ctrl+\\)',
      closeTab: 'Close Tab',
      theme: 'Theme:',
      charCount: 'chars',
      splitDragTip: 'Drag to adjust column widths (Double click to reset 50%)',

      // Snippets
      insertSlideBreak: 'Insert slide break (---)',
      insertTable: 'Insert 3-line comparison table',
      insertImage: 'Insert image (or paste clipboard screenshot with Ctrl+V)',
      insertCardGrid2: 'Insert 2-column cards',
      insertCardGrid3: 'Insert 3-column cards (.card-grid-3)',
      insertSplit50: 'Insert 50/50 image-text split',
      insertSteps: 'Insert timeline / steps cards',
      insertStatGrid: 'Insert key statistics dashboard (.stat-grid)',
      insertProfile: 'Insert speaker / profile card',
      insertQuote: 'Insert key quote card',
      insertCallout: 'Insert callout box (Tip/Note/Warning/Caution)',
      insertCompare: 'Insert comparison panel (Before vs After)',
      insertBadge: 'Insert colored badge (.badge)',
      insertMermaid: 'Insert Mermaid diagram',
      insertKatex: 'Insert KaTeX math formula',
      insertCodeBlock: 'Insert code block',
    },

    // Preview Viewport
    preview: {
      viewportTitle: 'Preview',
      continuousStream: 'slides stream',
      modeStream: 'Stream',
      modeSingle: 'Single',
      modeStreamTip: 'Current: Continuous Stream (Click to switch to Single Slide)',
      modeSingleTip: 'Current: Single Slide (Click to switch to Continuous Stream)',
      prevSlide: 'Previous slide',
      nextSlide: 'Next slide',
      collapsePreview: 'Collapse preview window (Ctrl+J)',
      emptyContent: 'No content',
    },

    // Auth Modal
    auth: {
      cloudSubtitle: 'Text-driven publication-grade presentation system · Sign in for unlimited document hierarchy and cloud sync',
      tabLogin: 'Sign In',
      tabRegister: 'Sign Up',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'At least 6 characters',
      btnProcessing: 'Processing...',
      btnLogin: 'Sign In Now',
      btnRegister: 'Create Free Account',
      guestBypass: 'Continue as guest with all local features',
      errValidEmail: 'Please enter a valid email address',
      errPasswordLen: 'Password must be at least 6 characters',
    },

    // Shortcuts Modal
    shortcuts: {
      title: 'Keyboard Shortcuts & Tips',
      macNotice: 'Mac users: please use ⌘ Cmd instead of Ctrl',
      btnGotIt: 'Got it',
      items: [
        { key: 'Ctrl + B', desc: 'Toggle Slide Explorer drawer' },
        { key: 'Ctrl + J / Ctrl + \\', desc: 'Toggle 16:9 Realtime Preview viewport' },
        { key: 'F5', desc: 'Enter fullscreen presentation mode' },
        { key: 'Ctrl + P', desc: 'Print / Export 16:9 vector-grade PDF' },
        { key: 'Ctrl + V', desc: 'Paste clipboard image directly in editor' },
        { key: '---', desc: 'Insert slide break (splits slides)' },
        { key: '<!-- _class: lead -->', desc: 'Set current slide as centered lead title slide' },
      ],
    },

    // Subscription Modal
    subscription: {
      title: 'Pro Cloud Membership',
      activeBadge: 'Active',
      subtitle: 'Unlock unlimited cloud storage, exclusive publication themes, and 4K vector export',
      currentAccount: 'Account:',
      proMember: 'Pro Member',
      freeUser: 'Free User',
      perksTitle: 'Pro Member Privileges',
      perks: [
        { title: 'Unlimited Cloud Sync', desc: 'Realtime slide storage and version snapshots across devices' },
        { title: 'Exclusive Theme Gallery', desc: 'Academic papers, executive consulting, and dark hacker templates' },
        { title: '4K Vector Ultra HD Export', desc: 'Watermark-free vector PDF printing and custom domain hosting' },
        { title: 'Cloud AI Assistant (Beta)', desc: 'Automated Markdown slide structuring powered by LLMs' },
      ],
      monthlyTitle: 'Monthly Plan',
      monthlyPrice: '$2.99',
      monthlyUnit: '/ mo',
      monthlyDesc: 'Cancel anytime, flexible experience',
      annualBadge: 'Recommended · Save 30%',
      annualTitle: 'Annual Plan',
      annualPrice: '$24.99',
      annualUnit: '/ yr',
      annualDesc: 'Only ~$2/month, access all privileges',
      proActiveMsg: 'You are already a valued Pro Member. All cloud and exclusive privileges are unlocked!',
      btnUpgrade: 'Upgrade to Pro Member (Simulate)',
      btnNeedLogin: 'Please sign in before subscribing',
      btnLogout: 'Sign out of current account',
      logoutConfirm: 'Are you sure you want to sign out of {email}? ActivityBar will be locked.',
    },
  },
} as const;

// Helper to get nested translation value
export function getTranslation(locale: Locale, path: string, params?: Record<string, string | number>): string {
  const keys = path.split('.');
  let current: any = translations[locale];
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // fallback to zh
      let fallback: any = translations.zh;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return path;
        }
      }
      current = fallback;
      break;
    }
  }

  if (typeof current === 'string') {
    if (params) {
      let res = current;
      for (const [pk, pv] of Object.entries(params)) {
        res = res.replace(new RegExp(`\\{${pk}\\}`, 'g'), String(pv));
      }
      return res;
    }
    return current;
  }

  return path;
}
