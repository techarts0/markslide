import { Marp } from '@marp-team/marp-core';
import katex from 'katex';
import mermaid from 'mermaid';
import { academicTheme, businessTheme, techPmTheme, minimalistTheme } from './themes';

export class SlideCompiler {
  private marp: Marp;

  constructor() {
    this.marp = new Marp({
      inlineSVG: true,
      html: true,
      markdown: {
        breaks: true,
      },
    });

    try {
      this.marp.themeSet.add(academicTheme);
      this.marp.themeSet.add(businessTheme);
      this.marp.themeSet.add(techPmTheme);
      this.marp.themeSet.add(minimalistTheme);
    } catch (e) {
      console.warn('Theme registration warning:', e);
    }
  }

  /**
   * 将 HTML 标签内部的行内公式 $...$ 与块级公式 $$...$$ 编译为出版级 KaTeX 结构
   * 自动跳过 <pre>, <code>, <script>, <style> 以及已由 Marp 渲染好的 .katex 元素
   */
  public renderMathInHtmlString(html: string): string {
    if (!html || !html.includes('$')) return html;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 提取所有包含 $ 的文本节点（避开代码块与已编译公式）
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          if (parent.closest('pre, code, .katex, script, style, textarea')) {
            return NodeFilter.FILTER_REJECT;
          }

          if (node.textContent && node.textContent.includes('$')) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        },
      });

      const targetNodes: Node[] = [];
      while (walker.nextNode()) {
        targetNodes.push(walker.currentNode);
      }

      // 匹配规则：$$...$$ 优先匹配块级公式；$...$ 匹配行内公式（标准 LaTeX：不以空格起止）
      const mathRegex = /(\$\$[\s\S]+?\$\$|(?<!\\)\$(?!\s)[^\$\n]+?(?<!\s)(?<!\\)\$)/g;

      for (const node of targetNodes) {
        const text = node.textContent || '';
        if (!mathRegex.test(text)) continue;
        mathRegex.lastIndex = 0;

        const fragment = doc.createDocumentFragment();
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = mathRegex.exec(text)) !== null) {
          if (match.index > lastIndex) {
            fragment.appendChild(doc.createTextNode(text.slice(lastIndex, match.index)));
          }

          const raw = match[0];
          const isBlock = raw.startsWith('$$') && raw.endsWith('$$');
          const formula = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();

          try {
            const rendered = katex.renderToString(formula, {
              displayMode: isBlock,
              throwOnError: false,
            });
            const tempSpan = doc.createElement('span');
            tempSpan.innerHTML = rendered;
            while (tempSpan.firstChild) {
              fragment.appendChild(tempSpan.firstChild);
            }
          } catch {
            fragment.appendChild(doc.createTextNode(raw));
          }

          lastIndex = match.index + raw.length;
        }

        if (lastIndex < text.length) {
          fragment.appendChild(doc.createTextNode(text.slice(lastIndex)));
        }

        node.parentNode?.replaceChild(fragment, node);
      }

      return doc.body.innerHTML;
    } catch (err) {
      console.warn('KaTeX in-HTML processing error:', err);
      return html;
    }
  }

  public render(markdown: string): { html: string; css: string; count: number } {
    try {
      const { html, css } = this.marp.render(markdown);
      const enhancedHtml = this.renderMathInHtmlString(html);
      const matches = enhancedHtml.match(/<section/g);
      const count = matches ? matches.length : 1;
      return { html: enhancedHtml, css, count };
    } catch (err) {
      console.error('Marp render error:', err);
      return {
        html: `<section class="marp-error"><div style="padding: 40px; color: red;"><h3>编译错误</h3><pre>${(err as Error).message}</pre></div></section>`,
        css: '',
        count: 1,
      };
    }
  }

  public async renderMermaidElements(container: HTMLElement, isDarkTheme: boolean = false) {
    const mermaidElements = container.querySelectorAll('code.language-mermaid');
    if (!mermaidElements || mermaidElements.length === 0) return;

    // 动态初始化适合该主题的配色
    mermaid.initialize({
      startOnLoad: false,
      theme: isDarkTheme ? 'dark' : 'neutral',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    });

    for (let i = 0; i < mermaidElements.length; i++) {
      const element = mermaidElements[i] as HTMLElement;
      const code = element.textContent || '';
      const id = `mermaid-svg-${Date.now()}-${i}`;
      try {
        const { svg } = await mermaid.render(id, code);
        const parent = element.parentElement;
        if (parent && parent.tagName.toLowerCase() === 'pre') {
          const wrapper = document.createElement('div');
          wrapper.className = 'mermaid-diagram flex justify-center items-center my-4';
          wrapper.innerHTML = svg;
          parent.replaceWith(wrapper);
        } else {
          element.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error for diagram:', err);
        element.innerHTML = `<span style="color: #ef4444; font-size: 14px;">[Mermaid 语法错误: ${(err as Error).message}]</span>`;
      }
    }
  }
}

export const slideCompiler = new SlideCompiler();
