/**
 * LaTeX Formula Rendering Manager
 * Manages KaTeX/MathJax engine execution, error diagnostics, smart delimiter unwrapping, and MathML translation.
 */

class LatexRenderer {
  constructor() {
    this.container = null;
    this.errorContainer = null;
    this.lastRenderedLatex = '';
    this.options = {
      displayMode: true,
      throwOnError: false,
      errorColor: '#ef4444',
      fleqn: false,
      fontSize: 24, // in px
      textColor: '#1e293b',
      bgColor: 'transparent',
      engine: 'katex'
    };
    this.renderCallbacks = [];
  }

  init(containerElement, errorElement) {
    this.container = containerElement;
    this.errorContainer = errorElement;
  }

  onRender(callback) {
    if (typeof callback === 'function') {
      this.renderCallbacks.push(callback);
    }
  }

  setOption(key, value) {
    this.options[key] = value;
    this.render(this.lastRenderedLatex);
  }

  /**
   * Smart Delimiter Unwrapper:
   * Strips outer $$, $, \[, \(, and markdown fences ```latex ... ```
   * so pasted formulas from ChatGPT/Markdown render seamlessly.
   */
  unwrapMathDelimiters(latex) {
    if (!latex) return '';
    let str = latex.trim();

    // Strip markdown code fences if present
    str = str.replace(/^```(?:latex|tex)?\s*/i, '').replace(/\s*```$/, '').trim();

    // Strip outer $$ ... $$
    if (str.startsWith('$$') && str.endsWith('$$') && str.length >= 4) {
      str = str.slice(2, -2).trim();
    }
    // Strip outer \[ ... \]
    else if (str.startsWith('\\[') && str.endsWith('\\]') && str.length >= 4) {
      str = str.slice(2, -2).trim();
    }
    // Strip outer \( ... \)
    else if (str.startsWith('\\(') && str.endsWith('\\)') && str.length >= 4) {
      str = str.slice(2, -2).trim();
    }
    // Strip outer single $ ... $ (when it wraps the whole expression)
    else if (str.startsWith('$') && str.endsWith('$') && str.length >= 2) {
      const inner = str.slice(1, -1);
      if (!inner.includes('$')) {
        str = inner.trim();
      }
    }

    return str;
  }

  render(latex) {
    this.lastRenderedLatex = latex || '';
    if (!this.container) return;

    // Reset error banner
    if (this.errorContainer) {
      this.errorContainer.style.display = 'none';
      this.errorContainer.textContent = '';
    }

    const cleanLatex = this.unwrapMathDelimiters(latex);

    if (!cleanLatex) {
      this.container.innerHTML = '<span class="placeholder-text">公式渲染预览区（在此实时展示数学公式）</span>';
      this.triggerCallbacks('', '', null);
      return;
    }

    try {
      if (window.katex) {
        // Render using KaTeX with relaxed strict mode for Chinese & punctuation
        const html = window.katex.renderToString(cleanLatex, {
          displayMode: this.options.displayMode,
          throwOnError: true,
          errorColor: this.options.errorColor,
          fleqn: this.options.fleqn,
          trust: true,
          strict: false,
          globalGroup: true
        });

        this.container.innerHTML = html;
        this.applyCustomStyles();

        // Generate clean MathML for MS Word
        const mathml = this.getMathML(cleanLatex);
        this.triggerCallbacks(cleanLatex, html, mathml);
      } else {
        this.fallbackRender(cleanLatex);
      }
    } catch (err) {
      this.handleRenderError(err, cleanLatex);
    }
  }

  applyCustomStyles() {
    if (!this.container) return;
    this.container.style.fontSize = `${this.options.fontSize}px`;
    this.container.style.color = this.options.textColor;
    this.container.style.backgroundColor = this.options.bgColor;
  }

  handleRenderError(error, cleanLatex) {
    console.warn('LaTeX Render warning:', error);
    if (this.errorContainer) {
      this.errorContainer.style.display = 'flex';
      this.errorContainer.innerHTML = `
        <div class="error-badge">语法提示</div>
        <div class="error-msg">${this.escapeHtml(error.message || 'LaTeX 解析异常')}</div>
      `;
    }

    // Render in non-throwing permissive mode if KaTeX is available
    if (window.katex) {
      try {
        const permissiveHtml = window.katex.renderToString(cleanLatex, {
          displayMode: this.options.displayMode,
          throwOnError: false,
          errorColor: '#ef4444',
          trust: true,
          strict: false
        });
        this.container.innerHTML = permissiveHtml;
        this.applyCustomStyles();
        
        const mathml = this.getMathML(cleanLatex);
        this.triggerCallbacks(cleanLatex, permissiveHtml, mathml);
      } catch (e) {
        this.container.innerHTML = `<div class="render-failed-hint">公式解析异常</div>`;
      }
    }
  }

  fallbackRender(latex) {
    this.container.textContent = latex;
  }

  getMathML(latex) {
    if (!window.katex) return '';
    const clean = this.unwrapMathDelimiters(latex);
    try {
      return window.katex.renderToString(clean, {
        displayMode: this.options.displayMode,
        output: 'mathml',
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      return '';
    }
  }

  triggerCallbacks(latex, html, mathml) {
    for (const cb of this.renderCallbacks) {
      try {
        cb({
          latex,
          html,
          mathml,
          displayMode: this.options.displayMode,
          fontSize: this.options.fontSize
        });
      } catch (err) {
        console.error('Error in render callback:', err);
      }
    }
  }

  escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.LatexRenderer = LatexRenderer;
