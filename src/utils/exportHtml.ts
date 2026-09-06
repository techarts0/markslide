/**
 * 单文件自包含脱机 HTML 导出器
 * 导出的 HTML 文件内嵌全部样式、编译后结构和原生纯 JS 翻页交互，脱机开箱即用
 */

export function exportStandaloneHtml(title: string, slidesHtml: string, slidesCss: string) {
  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeXml(title)}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      background-color: #090d16;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #stage-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    #slide-stage {
      width: 1280px;
      height: 720px;
      transform-origin: center center;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      border-radius: 12px;
      overflow: hidden;
      background: white;
    }
    .slide-page {
      display: none;
      width: 100%;
      height: 100%;
    }
    .slide-page.active {
      display: block;
      animation: slideFadeIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slideFadeIn {
      from {
        opacity: 0;
        transform: scale(0.985);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .slide-page section {
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box;
    }
    /* 悬浮控制条 */
    #deck-controls {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 8px 18px;
      display: flex;
      align-items: center;
      gap: 16px;
      color: white;
      font-size: 14px;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    #stage-container:hover #deck-controls {
      opacity: 1;
    }
    .deck-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .deck-btn:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }
    /* 激光笔样式 */
    #laser-dot {
      position: fixed;
      width: 12px;
      height: 12px;
      background: #ff2d55;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 12px #ff2d55, 0 0 24px #ff3b30;
      display: none;
    }
    ${slidesCss}
  </style>
</head>
<body>
  <div id="stage-container">
    <div id="slide-stage">
      ${wrapSlidesIntoPages(slidesHtml)}
    </div>

    <!-- 底部控制条 -->
    <div id="deck-controls">
      <button class="deck-btn" id="btn-prev" title="上一页 (←)">◀</button>
      <span id="page-indicator" style="font-family: monospace; font-weight: bold;">1 / 1</span>
      <button class="deck-btn" id="btn-next" title="下一页 (→/Space)">▶</button>
      <button class="deck-btn" id="btn-laser" title="切换激光笔 (L)">🔴 激光笔</button>
      <button class="deck-btn" id="btn-fs" title="全屏 (F)">⛶ 全屏</button>
    </div>

    <!-- 激光笔光点 -->
    <div id="laser-dot"></div>
  </div>

  <script>
    (function() {
      var pages = document.querySelectorAll('.slide-page');
      var total = pages.length;
      var current = 0;
      var stage = document.getElementById('slide-stage');
      var indicator = document.getElementById('page-indicator');
      var laserDot = document.getElementById('laser-dot');
      var laserActive = false;

      function updateScale() {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var scale = Math.min(winW / 1280, winH / 720) * 0.96;
        stage.style.transform = 'scale(' + scale + ')';
      }

      function showSlide(index) {
        if (index < 0 || index >= total) return;
        current = index;
        pages.forEach(function(p, i) {
          p.classList.toggle('active', i === current);
        });
        indicator.textContent = (current + 1) + ' / ' + total;
      }

      window.addEventListener('resize', updateScale);
      updateScale();
      showSlide(0);

      document.getElementById('btn-prev').onclick = function() { showSlide(current - 1); };
      document.getElementById('btn-next').onclick = function() { showSlide(current + 1); };

      document.getElementById('btn-fs').onclick = function() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      };

      var btnLaser = document.getElementById('btn-laser');
      btnLaser.onclick = function() {
        laserActive = !laserActive;
        laserDot.style.display = laserActive ? 'block' : 'none';
        btnLaser.style.color = laserActive ? '#ff2d55' : '#94a3b8';
      };

      window.addEventListener('mousemove', function(e) {
        if (laserActive) {
          laserDot.style.left = e.clientX + 'px';
          laserDot.style.top = e.clientY + 'px';
        }
      });

      window.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          showSlide(current + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          showSlide(current - 1);
        } else if (e.key === 'Home') {
          showSlide(0);
        } else if (e.key === 'End') {
          showSlide(total - 1);
        } else if (e.key === 'l' || e.key === 'L') {
          btnLaser.click();
        } else if (e.key === 'f' || e.key === 'F') {
          document.getElementById('btn-fs').click();
        }
      });
    })();
  </script>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[\\/:*?"<>|]/g, '_') || 'presentation'}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function wrapSlidesIntoPages(html: string): string {
  // 利用 DOMParser 提取 svg[data-marpit-svg] 并包裹在带 .marpit 的 page 容器中
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const svgs = doc.querySelectorAll('svg[data-marpit-svg]');
  if (svgs.length > 0) {
    return Array.from(svgs)
      .map(
        (svg, idx) =>
          `<div class="slide-page marpit ${idx === 0 ? 'active' : ''}" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">${svg.outerHTML}</div>`
      )
      .join('\n');
  }

  const sections = doc.querySelectorAll('section');
  if (sections.length === 0) return `<div class="slide-page marpit active">${html}</div>`;

  return Array.from(sections)
    .map((s, idx) => `<div class="slide-page marpit ${idx === 0 ? 'active' : ''}">${s.outerHTML}</div>`)
    .join('\n');
}
