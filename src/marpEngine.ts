import { Marp } from '@marp-team/marp-core';
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

  public render(markdown: string): { html: string; css: string; count: number } {
    try {
      const { html, css } = this.marp.render(markdown);
      const matches = html.match(/<section/g);
      const count = matches ? matches.length : 1;
      return { html, css, count };
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
