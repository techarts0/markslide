export interface SlideOutlineItem {
  index: number;         // 0-indexed
  pageNumber: number;    // 1-indexed (1, 2, 3...)
  title: string;         // Extracted heading or fallback
  excerpt: string;       // Secondary text or preview snippet
  startOffset: number;   // Character offset in markdown string
  startLine: number;     // 1-based line number
  rawContent: string;    // Raw content of this slide
  badges: string[];      // ['lead', 'table', 'cards', 'steps', 'stats', 'mermaid', 'code', 'notes']
  notes?: string;        // Speaker note content if any
}

/**
 * 将整篇 Markdown 解析为结构化的幻灯片大纲列表
 */
export function parseSlideOutlines(markdown: string): SlideOutlineItem[] {
  if (!markdown) return [];

  const lines = markdown.split(/\r?\n/);
  const slides: {
    startLine: number;
    startOffset: number;
    lines: string[];
  }[] = [];

  let inFrontmatter = false;
  let frontmatterClosed = false;
  let currentSlideLines: string[] = [];
  let currentSlideStartLine = 1;
  let currentSlideStartOffset = 0;
  let runningOffset = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLengthWithNewline = line.length + 1; // 假定换行占 1~2 字符，作为相对偏移
    const trimmed = line.trim();

    if (trimmed === '---') {
      if (!frontmatterClosed) {
        if (i === 0) {
          inFrontmatter = true;
          runningOffset += lineLengthWithNewline;
          continue;
        } else if (inFrontmatter) {
          inFrontmatter = false;
          frontmatterClosed = true;
          runningOffset += lineLengthWithNewline;
          currentSlideStartLine = i + 2;
          currentSlideStartOffset = runningOffset;
          continue;
        }
      }

      // 遇到分页符，保存前一张幻灯片
      slides.push({
        startLine: currentSlideStartLine,
        startOffset: currentSlideStartOffset,
        lines: currentSlideLines,
      });

      currentSlideLines = [];
      currentSlideStartLine = i + 2;
      currentSlideStartOffset = runningOffset + lineLengthWithNewline;
      runningOffset += lineLengthWithNewline;
      continue;
    }

    if (!inFrontmatter) {
      currentSlideLines.push(line);
    }
    runningOffset += lineLengthWithNewline;
  }

  // 追加最后一张幻灯片
  slides.push({
    startLine: currentSlideStartLine,
    startOffset: currentSlideStartOffset,
    lines: currentSlideLines,
  });

  return slides.map((slide, index) => {
    const rawContent = slide.lines.join('\n');
    let title = '';
    let excerpt = '';

    // 提取标题与正文摘要
    for (const rawLine of slide.lines) {
      const trimmedLine = rawLine.trim();
      if (!trimmedLine) continue;
      if (trimmedLine.startsWith('<!--') && trimmedLine.endsWith('-->')) continue;

      // 匹配 Markdown 标题
      const headingMatch = trimmedLine.match(/^#{1,4}\s+(.+)$/);
      if (headingMatch && !title) {
        title = cleanMarkdownFormat(headingMatch[1]);
        continue;
      }

      // 提取副标题或首段文字作为摘要
      if (!excerpt && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('<')) {
        excerpt = cleanMarkdownFormat(trimmedLine);
      }
    }

    if (!title) {
      title = excerpt ? (excerpt.slice(0, 24) + (excerpt.length > 24 ? '...' : '')) : `Slide ${index + 1}`;
    }

    // 智能提取徽标
    const badges: string[] = [];
    if (rawContent.includes('_class: lead') || rawContent.includes('_class: "lead"')) badges.push('lead');
    if (rawContent.includes('| :---') || rawContent.includes('<table')) badges.push('table');
    if (rawContent.includes('card-grid')) badges.push('cards');
    if (rawContent.includes('class="steps"')) badges.push('steps');
    if (rawContent.includes('stat-grid') || rawContent.includes('stat-card')) badges.push('stats');
    if (rawContent.includes('```mermaid')) badges.push('mermaid');
    if (rawContent.includes('```ts') || rawContent.includes('```typescript') || rawContent.includes('```js') || rawContent.includes('```python') || rawContent.includes('```bash')) {
      badges.push('code');
    }

    // 提取备忘
    const noteMatch = rawContent.match(/<!--\s*note:\s*([\s\S]*?)\s*-->/i);
    let notes: string | undefined;
    if (noteMatch && noteMatch[1]) {
      notes = noteMatch[1].trim();
      badges.push('notes');
    }

    return {
      index,
      pageNumber: index + 1,
      title,
      excerpt,
      startOffset: slide.startOffset,
      startLine: slide.startLine,
      rawContent,
      badges,
      notes,
    };
  });
}

/**
 * 清除 Markdown 加粗、斜体、代码等内联标记，返回纯文本
 */
function cleanMarkdownFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * 拆分整篇 Markdown 为 Frontmatter + 各幻灯片段落数组
 */
function splitMarkdownBlocks(markdown: string): { frontmatter: string; slides: string[] } {
  const lines = markdown.split(/\r?\n/);
  let frontmatter = '';
  let inFrontmatter = false;
  let frontmatterClosed = false;

  const slideBlocks: string[][] = [];
  let currentBlock: string[] = [];
  const frontmatterLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '---') {
      if (!frontmatterClosed) {
        if (i === 0) {
          inFrontmatter = true;
          frontmatterLines.push(line);
          continue;
        } else if (inFrontmatter) {
          inFrontmatter = false;
          frontmatterClosed = true;
          frontmatterLines.push(line);
          frontmatter = frontmatterLines.join('\n');
          continue;
        }
      }

      slideBlocks.push(currentBlock);
      currentBlock = [];
      continue;
    }

    if (inFrontmatter) {
      frontmatterLines.push(line);
    } else {
      currentBlock.push(line);
    }
  }

  slideBlocks.push(currentBlock);

  return {
    frontmatter,
    slides: slideBlocks.map((b) => b.join('\n').trim()),
  };
}

/**
 * 重新组装 Markdown
 */
function assembleMarkdown(frontmatter: string, slides: string[]): string {
  const filteredSlides = slides.filter((s) => s.length > 0);
  const slidesContent = filteredSlides.join('\n\n---\n\n');
  if (frontmatter) {
    return `${frontmatter}\n\n${slidesContent}\n`;
  }
  return `${slidesContent}\n`;
}

/**
 * 上下移动调整幻灯片顺序
 */
export function moveSlide(markdown: string, fromIndex: number, toIndex: number): string {
  const { frontmatter, slides } = splitMarkdownBlocks(markdown);
  if (fromIndex < 0 || fromIndex >= slides.length || toIndex < 0 || toIndex >= slides.length) {
    return markdown;
  }

  const newSlides = [...slides];
  const [removed] = newSlides.splice(fromIndex, 1);
  newSlides.splice(toIndex, 0, removed);

  return assembleMarkdown(frontmatter, newSlides);
}

/**
 * 删除指定索引的幻灯片
 */
export function deleteSlideByIndex(markdown: string, targetIndex: number): string {
  const { frontmatter, slides } = splitMarkdownBlocks(markdown);
  if (targetIndex < 0 || targetIndex >= slides.length) {
    return markdown;
  }

  // 保证至少保留一张幻灯片
  if (slides.length <= 1) {
    return assembleMarkdown(frontmatter, ['# 演示文稿\n\n- 输入核心观点']);
  }

  const newSlides = slides.filter((_, idx) => idx !== targetIndex);
  return assembleMarkdown(frontmatter, newSlides);
}

/**
 * 在指定幻灯片之后插入新的一页
 */
export function insertSlideAfter(markdown: string, afterIndex: number, template?: string): string {
  const { frontmatter, slides } = splitMarkdownBlocks(markdown);
  const defaultSlide = template || '# 新幻灯片标题\n\n- 核心观点 1\n- 核心观点 2';

  const newSlides = [...slides];
  newSlides.splice(afterIndex + 1, 0, defaultSlide);

  return assembleMarkdown(frontmatter, newSlides);
}
