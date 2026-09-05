/**
 * 统一解析 Marp 渲染后的 HTML，切分为独立的单页幻灯片结构。
 * 完整保留 Marp 的 div.marpit 与 svg[data-marpit-svg] 结构，确保作用域 CSS 样式生效。
 */
export function parseSlides(html: string): string[] {
  if (!html || typeof html !== 'string') return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const svgs = doc.querySelectorAll('svg[data-marpit-svg]');

  if (svgs.length > 0) {
    return Array.from(svgs).map(
      (svg) =>
        `<div class="marpit" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">${svg.outerHTML}</div>`
    );
  }

  const sections = doc.querySelectorAll('section');
  if (sections.length > 0) {
    return Array.from(sections).map(
      (s) => `<div class="marpit" style="width: 100%; height: 100%;">${s.outerHTML}</div>`
    );
  }

  return [html];
}

/**
 * 提取指定单页 HTML 中的演讲者备注（Speaker Notes）
 */
export function extractNotes(slideHtml: string): string {
  if (!slideHtml) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(slideHtml, 'text/html');
    const noteEl = doc.querySelector('.marpit-note');
    if (noteEl && noteEl.textContent) {
      return noteEl.textContent.trim();
    }
  } catch {
    // 降级处理
  }
  return '';
}

/**
 * 根据光标在 Markdown 中的字符偏移量，智能计算处于第几页（0-indexed）
 * 自动识别 Frontmatter 头部与 --- 分页符
 */
export function getSlideIndexAtOffset(content: string, offset: number): number {
  if (!content || offset <= 0) return 0;

  const textBefore = content.slice(0, offset);
  const lines = textBefore.split(/\r?\n/);

  let slideIndex = 0;
  let inFrontmatter = false;
  let frontmatterClosed = false;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '---') {
      if (!frontmatterClosed) {
        if (i === 0) {
          inFrontmatter = true;
          continue;
        } else if (inFrontmatter) {
          inFrontmatter = false;
          frontmatterClosed = true;
          continue;
        }
      }
      slideIndex++;
    }
  }

  return slideIndex;
}

