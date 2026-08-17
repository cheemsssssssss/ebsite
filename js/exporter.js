/**
 * LaTeX Formula Exporter & Formatter
 * Supports high-DPI PNG, SVG vector, MathML, Word document, and escaping utilities.
 */

class LatexExporter {
  constructor(renderer) {
    this.renderer = renderer;
  }

  /**
   * Generates clean SVG markup for the given LaTeX formula.
   */
  async getSVG(latex, options = {}) {
    const clean = this.renderer ? this.renderer.unwrapMathDelimiters(latex) : latex;
    const scale = options.scale || 1.5;
    const color = options.color || (document.body.classList.contains('dark-theme') ? '#f1f5f9' : '#0f172a');
    const display = options.displayMode !== undefined ? options.displayMode : true;

    // Use MathJax 3 if available for standalone paths SVG
    if (window.MathJax && window.MathJax.tex2svgPromise) {
      try {
        const svgContainer = await window.MathJax.tex2svgPromise(clean, {
          display: display,
          em: 16 * scale,
          ex: 8 * scale
        });
        const svg = svgContainer.querySelector('svg');
        if (svg) {
          svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          svg.style.color = color;
          return svg.outerHTML;
        }
      } catch (e) {
        console.warn('MathJax tex2svg failed, trying KaTeX SVG fallback', e);
      }
    }

    // Fallback: Use KaTeX rendered element converted via foreignObject SVG
    return this.createKaTeXForeignSVG(clean, scale, color, display);
  }

  createKaTeXForeignSVG(latex, scale, color, display) {
    if (!window.katex) return '';
    try {
      const html = window.katex.renderToString(latex, {
        displayMode: display,
        throwOnError: false,
        strict: false
      });
      return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200">
        <style>
          .katex { font-size: ${20 * scale}px; color: ${color}; }
        </style>
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:100%;">
            ${html}
          </div>
        </foreignObject>
      </svg>`;
    } catch (e) {
      return '';
    }
  }

  /**
   * Render LaTeX to HTML5 Canvas and get high-resolution Blob
   */
  async renderToCanvas(latex, options = {}) {
    const scaleFactor = options.scale || 3;
    const bgColor = options.bgColor === 'transparent' ? null : (options.bgColor || null);
    const padding = options.padding || 32;
    const textColor = options.textColor || '#0f172a';

    let svgStr = await this.getSVG(latex, {
      scale: 1,
      color: textColor,
      displayMode: options.displayMode !== undefined ? options.displayMode : true
    });

    if (!svgStr) {
      throw new Error('无法生成 SVG 矢量数据');
    }

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgStr, 'image/svg+xml');
    const svgElem = svgDoc.querySelector('svg');
    if (!svgElem) throw new Error('SVG 解析失败');

    svgElem.style.color = textColor;
    if (bgColor) {
      const rect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', bgColor);
      svgElem.insertBefore(rect, svgElem.firstChild);
    }

    let width = 400;
    let height = 150;
    const viewBox = svgElem.getAttribute('viewBox');
    if (viewBox) {
      const parts = viewBox.split(/[\s,]+/).map(Number);
      if (parts.length === 4) {
        width = parts[2];
        height = parts[3];
      }
    } else {
      const wAttr = parseFloat(svgElem.getAttribute('width'));
      const hAttr = parseFloat(svgElem.getAttribute('height'));
      if (wAttr && hAttr) {
        width = wAttr * 16;
        height = hAttr * 16;
      }
    }

    width = Math.max(width, 100);
    height = Math.max(height, 50);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = (width + padding * 2) * scaleFactor;
    canvas.height = (height + padding * 2) * scaleFactor;

    ctx.scale(scaleFactor, scaleFactor);

    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width + padding * 2, height + padding * 2);
    }

    const svgBlob = new Blob([new XMLSerializer().serializeToString(svgElem)], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, padding, padding, width, height);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(new Error('图片载入与栅格化失败'));
      };
      img.src = url;
    });

    return canvas;
  }

  /**
   * Download formula as PNG
   */
  async downloadPNG(latex, filename = 'formula.png', options = {}) {
    const canvas = await this.renderToCanvas(latex, options);
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  /**
   * Download formula as SVG
   */
  async downloadSVG(latex, filename = 'formula.svg', options = {}) {
    const svgStr = await this.getSVG(latex, options);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Formats MathML string specifically for MS Word / WPS copy-paste compatibility
   */
  formatMathMLForWord(mathml) {
    if (!mathml) return '';
    let clean = mathml;
    const match = mathml.match(/<math[\s\S]*?<\/math>/i);
    if (match) {
      clean = match[0];
    }
    if (!clean.includes('xmlns=')) {
      clean = clean.replace('<math', '<math xmlns="http://www.w3.org/1998/Math/MathML"');
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n${clean}`;
  }

  /**
   * Download MathML as .mml file
   */
  downloadMathMLFile(latex, filename = 'formula.mml') {
    const rawMathML = this.renderer.getMathML(latex);
    const formatted = this.formatMathMLForWord(rawMathML);
    const blob = new Blob([formatted], { type: 'application/mathml+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Download Word compatible document with embedded MathML
   */
  downloadWordDocument(latex, filename = 'formula.doc') {
    const rawMathML = this.renderer.getMathML(latex);
    const formattedMathML = this.formatMathMLForWord(rawMathML);
    
    // Create Microsoft Word HTML/MHT document containing the MathML
    const wordContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>IE LaTeX Formula</title>
<!--[if gte mso 9]>
<xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
 </w:WordDocument>
</xml>
<![endif]-->
<style>
  body { font-family: 'Times New Roman', 'Cambria Math', serif; padding: 20px; font-size: 14pt; }
</style>
</head>
<body>
  <p style="text-align:center;">
    ${formattedMathML}
  </p>
</body>
</html>`;

    const blob = new Blob([wordContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Escape and wrap Chinese characters inside LaTeX with \text{...}
   */
  autoWrapChineseText(latex) {
    if (!latex) return '';
    // Regex matching sequences of Chinese characters not already wrapped in \text{...}
    // Matches Chinese characters and common Chinese punctuation
    return latex.replace(/([^\\](?:\\text\{[^}]*\})*?)([\u4e00-\u9fa5\u3002\uff0c\uff1b\uff1a\u3010\u3011\uff08\uff09]+)/g, (match, prefix, chinese) => {
      if (prefix && prefix.endsWith('\\text{')) return match;
      return `${prefix}\\text{${chinese}}`;
    });
  }

  /**
   * Compress LaTeX into a single line
   */
  compressToOneLine(latex) {
    if (!latex) return '';
    return latex.replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /**
   * Escape special LaTeX characters
   */
  escapeSpecialChars(latex) {
    if (!latex) return '';
    return latex
      .replace(/(?<!\\)%/g, '\\%')
      .replace(/(?<!\\)_/g, '\\_')
      .replace(/(?<!\\)&(?!text)/g, '&');
  }

  /**
   * Copy text to clipboard with fallback
   */
  async copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (!success) throw new Error('复制失败');
    return true;
  }
}

window.LatexExporter = LatexExporter;
