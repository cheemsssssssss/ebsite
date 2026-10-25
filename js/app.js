/**
 * IE LaTeX Formula Editor - Main Application Controller
 */

(function () {
  'use strict';

  // --- State & Modules Initialization ---
  let renderer;
  let exporter;
  let history;
  let renderDebounceTimer = null;
  let historyDebounceTimer = null;

  // --- DOM Elements ---
  const latexInput = document.getElementById('latex-input');
  const formulaOutput = document.getElementById('formula-output');
  const formulaStage = document.getElementById('formula-stage');
  const renderErrorBanner = document.getElementById('render-error-banner');
  const charCountEl = document.getElementById('char-count');
  const latencyEl = document.getElementById('render-latency');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const fontSizeVal = document.getElementById('font-size-val');
  const displayModeSelect = document.getElementById('display-mode-select');
  const bgStyleSelect = document.getElementById('bg-style-select');

  // Toolbar & actions
  const btnFormatLatex = document.getElementById('btn-format-latex');
  const btnClearLatex = document.getElementById('btn-clear-latex');
  const btnWrapDisplay = document.getElementById('btn-wrap-display');
  const btnWrapInline = document.getElementById('btn-wrap-inline');
  const btnCopyLatexRaw = document.getElementById('btn-copy-latex-raw');
  const btnResetPreviewZoom = document.getElementById('btn-reset-preview-zoom');

  // Symbol palette containers
  const symbolsTabs = document.getElementById('symbols-tabs');
  const symbolsPanels = document.getElementById('symbols-panels');

  // Presets & History containers
  const presetsContainer = document.getElementById('presets-container');
  const historyContainer = document.getElementById('history-container');
  const historyCountEl = document.getElementById('history-count');
  const historyActionsEl = document.getElementById('history-actions');
  const btnClearHistory = document.getElementById('btn-clear-history');

  // Code viewers
  const mathmlCodeBox = document.getElementById('mathml-code-box');
  const svgCodeBox = document.getElementById('svg-code-box');
  const btnCopyRawMathML = document.getElementById('btn-copy-raw-mathml');
  const btnCopyRawSVG = document.getElementById('btn-copy-raw-svg');

  // Modals & Theme & Lang
  const modalPNGExport = document.getElementById('modal-png-export');
  const btnClosePNGModal = document.getElementById('btn-close-png-modal');
  const btnCancelPNGModal = document.getElementById('btn-cancel-png-modal');
  const btnConfirmDownloadPNG = document.getElementById('btn-confirm-download-png');
  const pngScaleSelect = document.getElementById('png-scale-select');
  const pngBgSelect = document.getElementById('png-bg-select');
  const pngPaddingSelect = document.getElementById('png-padding-select');
  const pngFilenameInput = document.getElementById('png-filename-input');

  const modalShortcuts = document.getElementById('modal-shortcuts');
  const btnShortcuts = document.getElementById('btn-shortcuts');
  const btnCloseShortcutsModal = document.getElementById('btn-close-shortcuts-modal');
  const btnConfirmShortcutsModal = document.getElementById('btn-confirm-shortcuts-modal');

  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const btnLangToggle = document.getElementById('btn-lang-toggle');
  const toastContainer = document.getElementById('toast-container');

  /**
   * App Entrypoint
   */
  function initApp() {
    renderer = new LatexRenderer();
    renderer.init(formulaOutput, renderErrorBanner);
    exporter = new LatexExporter(renderer);
    history = new FormulaHistory();

    // Initialize Theme
    initTheme();

    // Initialize i18n
    if (window.applyI18n) window.applyI18n();

    // Check URL parameters for shared formula
    checkUrlParams();

    // Setup Symbols Toolbar
    renderSymbolsToolbar();

    // Setup Presets Library
    renderPresetsLibrary();

    // Setup History List
    refreshHistoryList();

    // Setup Resizer for Input Area
    initEditorResizer();

    // Setup Dropdown Menus & Events
    setupDropdownMenus();
    setupEventListeners();

    // Initial Trigger Render
    triggerRenderNow();
  }

  /**
   * Theme Initialization & Toggle
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('latex_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (isDark) {
      document.body.classList.add('dark-theme');
      themeIconSun.style.display = 'none';
      themeIconMoon.style.display = 'block';
    } else {
      document.body.classList.remove('dark-theme');
      themeIconSun.style.display = 'block';
      themeIconMoon.style.display = 'none';
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('latex_theme', isDark ? 'dark' : 'light');
    themeIconSun.style.display = isDark ? 'none' : 'block';
    themeIconMoon.style.display = isDark ? 'block' : 'none';
    triggerRenderNow();
  }

  /**
   * Refresh i18n dynamic elements
   */
  window.refreshSymbolsAndPresetsI18n = function () {
    renderSymbolsToolbar();
    renderPresetsLibrary();
    refreshHistoryList();
    triggerRenderNow();
  };

  /**
   * Check URL params for formula sharing
   */
  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const formulaParam = params.get('f') || params.get('latex');
    if (formulaParam) {
      try {
        const decoded = decodeURIComponent(formulaParam);
        latexInput.value = decoded;
      } catch (e) {
        console.warn('Failed to decode formula from URL', e);
      }
    }
  }

  /**
   * Render LaTeX Formulas with Debounce & Benchmarking
   */
  function queueRender() {
    if (renderDebounceTimer) clearTimeout(renderDebounceTimer);
    renderDebounceTimer = setTimeout(() => {
      triggerRenderNow();
    }, 30);

    if (historyDebounceTimer) clearTimeout(historyDebounceTimer);
    historyDebounceTimer = setTimeout(() => {
      if (latexInput.value.trim()) {
        history.add(latexInput.value.trim());
        refreshHistoryList();
      }
    }, 2000);
  }

  /**
   * Rough perceptual lightness of a #rrggbb colour, used to keep the rendered
   * formula legible when the user picks a custom stage background.
   */
  function isLightColor(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return true;
    const n = parseInt(m[1], 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
  }

  function triggerRenderNow() {
    const startTime = performance.now();
    const latex = latexInput.value;

    const charLabel = window.t ? window.t('char_count') : '字符数';
    const renderLabel = window.t ? window.t('render_latency') : '渲染';
    charCountEl.textContent = `${charLabel}: ${latex.length}`;

    // Apply Renderer Options
    renderer.setOption('fontSize', parseInt(fontSizeSlider.value, 10));
    renderer.setOption('displayMode', displayModeSelect.value === 'display');

    const bgChoice = bgStyleSelect.value;
    formulaStage.style.backgroundColor = bgChoice === 'transparent' ? '' : bgChoice;
    // Keep the glyphs legible against whichever stage colour was chosen.
    formulaStage.style.color = bgChoice === 'transparent'
      ? ''
      : (isLightColor(bgChoice) ? '#1c1a17' : '#f0ece4');

    // Perform rendering
    renderer.render(latex);

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(1);
    latencyEl.textContent = `${renderLabel}: ${duration}ms`;

    // Update MathML & SVG Viewers
    updateCodeViewers(latex);
  }

  /**
   * Update MathML and SVG code inspection boxes
   */
  async function updateCodeViewers(latex) {
    const trimmed = latex.trim();
    if (!trimmed) {
      mathmlCodeBox.textContent = '<!-- Empty -->';
      svgCodeBox.textContent = '<!-- Empty -->';
      return;
    }

    const rawMathML = renderer.getMathML(trimmed);
    mathmlCodeBox.textContent = exporter.formatMathMLForWord(rawMathML) || 'Generating MathML...';

    try {
      const svg = await exporter.getSVG(trimmed, { scale: 1.5, displayMode: displayModeSelect.value === 'display' });
      svgCodeBox.textContent = svg || 'Generating SVG...';
    } catch (e) {
      svgCodeBox.textContent = 'Unable to generate SVG';
    }
  }

  /**
   * Render Visual Symbol Toolbar
   */
  function renderSymbolsToolbar() {
    if (!window.LATEX_SYMBOLS_DATA || !symbolsTabs || !symbolsPanels) return;

    const activeTab = document.querySelector('.symbol-tab-btn.active');
    const activeTabId = activeTab ? activeTab.dataset.tabId : window.LATEX_SYMBOLS_DATA[0].id;

    symbolsTabs.innerHTML = '';
    symbolsPanels.innerHTML = '';

    window.LATEX_SYMBOLS_DATA.forEach((category) => {
      const catName = window.t ? window.t('cat_' + category.id) : category.name;
      const isActive = category.id === activeTabId;

      // Tab Button
      const tabBtn = document.createElement('button');
      tabBtn.className = `symbol-tab-btn ${isActive ? 'active' : ''}`;
      tabBtn.innerHTML = `<span class="symbol-tab-icon">${category.icon}</span><span>${catName}</span>`;
      tabBtn.dataset.tabId = category.id;

      tabBtn.addEventListener('click', () => {
        document.querySelectorAll('.symbol-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.symbols-category-panel').forEach(panel => panel.classList.remove('active'));
        tabBtn.classList.add('active');
        document.getElementById(`panel-${category.id}`).classList.add('active');
      });

      symbolsTabs.appendChild(tabBtn);

      // Panel Container
      const panel = document.createElement('div');
      panel.id = `panel-${category.id}`;
      panel.className = `symbols-category-panel ${isActive ? 'active' : ''}`;

      category.symbols.forEach(sym => {
        const keyBtn = document.createElement('button');
        keyBtn.className = 'math-key-btn';
        keyBtn.setAttribute('data-tip', `${sym.tip} [${sym.latex}]`);
        keyBtn.setAttribute('type', 'button');

        let previewHtml = sym.label;
        if (window.katex) {
          try {
            previewHtml = window.katex.renderToString(sym.latex, {
              displayMode: false,
              throwOnError: false
            });
          } catch (e) {
            previewHtml = sym.label;
          }
        }

        keyBtn.innerHTML = `<div class="math-key-rendered">${previewHtml}</div>`;

        keyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          insertLatexSnippet(sym.template || sym.latex);
        });

        panel.appendChild(keyBtn);
      });

      symbolsPanels.appendChild(panel);
    });
  }

  /**
   * Smart LaTeX Snippet Insertion
   */
  function insertLatexSnippet(template) {
    const el = latexInput;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selectedText = el.value.substring(start, end);
    const before = el.value.substring(0, start);
    const after = el.value.substring(end);

    let insertText = template;
    let newCursorPos = start + template.length;

    if (selectedText) {
      if (template.includes('${1:')) {
        insertText = template.replace(/\$\{1:[^}]*\}/, selectedText).replace(/\$\{\d+:([^}]*)\}/g, '$1');
      } else {
        insertText = `${template}${selectedText}`;
      }
      newCursorPos = start + insertText.length;
    } else {
      insertText = template.replace(/\$\{\d+:([^}]*)\}/g, '$1');
      newCursorPos = start + insertText.length;
    }

    el.value = before + insertText + after;
    el.focus();
    el.setSelectionRange(newCursorPos, newCursorPos);

    triggerRenderNow();
  }

  /**
   * Render Presets Library
   */
  function renderPresetsLibrary() {
    if (!window.LATEX_PRESETS || !presetsContainer) return;
    presetsContainer.innerHTML = '';

    const isEn = window.I18N_LANG === 'en';

    window.LATEX_PRESETS.forEach(cat => {
      const group = document.createElement('div');
      group.className = 'presets-category-group';

      const catName = isEn ? (cat.category_en || cat.category_zh || cat.category) : (cat.category_zh || cat.category);

      const title = document.createElement('div');
      title.className = 'presets-category-title';
      title.textContent = catName;
      group.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'presets-grid';

      cat.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'preset-card';

        const itemName = isEn ? (item.name_en || item.name_zh || item.name) : (item.name_zh || item.name);
        const itemDesc = isEn ? (item.desc_en || item.desc_zh || item.description) : (item.desc_zh || item.description);

        let mathPreview = item.latex;
        if (window.katex) {
          try {
            mathPreview = window.katex.renderToString(item.latex, {
              displayMode: false,
              throwOnError: false
            });
          } catch (e) {
            mathPreview = item.latex;
          }
        }

        card.innerHTML = `
          <div class="preset-card-header">
            <span class="preset-name">${itemName}</span>
          </div>
          <div class="preset-preview-math">${mathPreview}</div>
          <div class="preset-desc">${itemDesc}</div>
        `;

        card.addEventListener('click', () => {
          latexInput.value = item.latex;
          triggerRenderNow();
          showToast(`${window.t('tab_presets')}: ${itemName}`, 'success');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        grid.appendChild(card);
      });

      group.appendChild(grid);
      presetsContainer.appendChild(group);
    });
  }

  /**
   * Refresh Formula History List
   */
  function refreshHistoryList() {
    if (!history || !historyContainer) return;
    const items = history.getAll();

    historyCountEl.textContent = items.length;
    historyActionsEl.style.display = items.length > 0 ? 'block' : 'none';

    if (items.length === 0) {
      historyContainer.innerHTML = `<div class="history-empty">${window.t('history_empty')}</div>`;
      return;
    }

    historyContainer.innerHTML = '';
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'history-item';

      let mathPreview = item.latex;
      if (window.katex) {
        try {
          mathPreview = window.katex.renderToString(item.latex, {
            displayMode: false,
            throwOnError: false
          });
        } catch (e) {
          mathPreview = item.latex;
        }
      }

      const dateStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      row.innerHTML = `
        <div class="history-math-preview" title="Click to load formula">${mathPreview}</div>
        <div class="history-meta">
          <span>${dateStr}</span>
          <button class="btn-icon btn-sm" title="Delete" style="width:24px;height:24px;">✕</button>
        </div>
      `;

      row.querySelector('.history-math-preview').addEventListener('click', () => {
        latexInput.value = item.latex;
        triggerRenderNow();
        showToast(window.t('tab_history'), 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      row.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        history.remove(item.id);
        refreshHistoryList();
      });

      historyContainer.appendChild(row);
    });
  }

  /**
   * Toast Feedback Helper
   */
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }
  window.showToast = showToast;

  /**
   * Dropdown Menu Interactions
   */
  function setupDropdownMenus() {
    const dropdownGroups = document.querySelectorAll('.dropdown-group');

    dropdownGroups.forEach(group => {
      const triggerBtn = group.querySelector('.dropdown-trigger-btn');
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = group.classList.contains('active');
        // Close all others
        dropdownGroups.forEach(g => g.classList.remove('active'));
        if (!isActive) {
          group.classList.add('active');
        }
      });
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', () => {
      dropdownGroups.forEach(g => g.classList.remove('active'));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownGroups.forEach(g => g.classList.remove('active'));
      }
    });

    // Dropdown Action Items Handlers:
    // 1. 输出图片 ^
    document.getElementById('item-download-png').addEventListener('click', () => {
      modalPNGExport.classList.add('active');
    });

    document.getElementById('item-download-svg').addEventListener('click', async () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      try {
        await exporter.downloadSVG(latex, 'formula.svg', {
          displayMode: displayModeSelect.value === 'display'
        });
        showToast(window.t('toast_copied_svg'), 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    document.getElementById('item-copy-svg-code').addEventListener('click', async () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      try {
        const svg = await exporter.getSVG(latex, { scale: 1.5, displayMode: displayModeSelect.value === 'display' });
        await exporter.copyText(svg);
        showToast(window.t('toast_copied_svg'), 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    // 2. 输出代码 ^
    document.getElementById('item-copy-latex-source').addEventListener('click', async () => {
      const text = latexInput.value.trim();
      if (!text) return showToast('Formula is empty', 'error');
      await exporter.copyText(text);
      showToast(window.t('toast_copied_latex'), 'success');
    });

    document.getElementById('item-copy-md-block').addEventListener('click', async () => {
      const text = latexInput.value.trim();
      if (!text) return showToast('Formula is empty', 'error');
      await exporter.copyText(`$$\n${text}\n$$`);
      showToast(window.t('toast_copied_md'), 'success');
    });

    document.getElementById('item-copy-md-inline').addEventListener('click', async () => {
      const text = latexInput.value.trim();
      if (!text) return showToast('Formula is empty', 'error');
      await exporter.copyText(`$${text}$`);
      showToast(window.t('toast_copied_md'), 'success');
    });

    document.getElementById('item-copy-html-img').addEventListener('click', async () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      try {
        const svg = await exporter.getSVG(latex, { scale: 1.5, displayMode: displayModeSelect.value === 'display' });
        const encoded = encodeURIComponent(svg);
        const imgTag = `<img src="data:image/svg+xml;utf8,${encoded}" alt="${latex.replace(/"/g, '&quot;')}" />`;
        await exporter.copyText(imgTag);
        showToast(window.t('toast_copied_svg'), 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    // 3. 输出Word文件 ^
    document.getElementById('item-copy-word-mathml').addEventListener('click', async () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      try {
        const rawMathML = renderer.getMathML(latex);
        const wordMathML = exporter.formatMathMLForWord(rawMathML);
        await exporter.copyText(wordMathML);
        showToast(window.t('toast_copied_mathml'), 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    document.getElementById('item-download-word-doc').addEventListener('click', () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      try {
        exporter.downloadWordDocument(latex, 'math_formula.doc');
        showToast(window.t('toast_downloaded_word'), 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    document.getElementById('item-download-mml-file').addEventListener('click', () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      try {
        exporter.downloadMathMLFile(latex, 'formula.mml');
        showToast('MathML (.mml) downloaded!', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    // 4. 转义 ^
    document.getElementById('item-escape-chinese').addEventListener('click', () => {
      const current = latexInput.value;
      const wrapped = exporter.autoWrapChineseText(current);
      latexInput.value = wrapped;
      triggerRenderNow();
      showToast(window.t('toast_escaped_chinese'), 'success');
    });

    document.getElementById('item-format-tidy').addEventListener('click', () => {
      let code = latexInput.value.trim();
      code = code.replace(/\s+/g, ' ').replace(/\s*=\s*/g, ' = ');
      latexInput.value = code;
      triggerRenderNow();
      showToast(window.t('toast_formatted'), 'success');
    });

    document.getElementById('item-compress-oneline').addEventListener('click', () => {
      latexInput.value = exporter.compressToOneLine(latexInput.value);
      triggerRenderNow();
      showToast(window.t('toast_formatted'), 'success');
    });

    document.getElementById('item-escape-special').addEventListener('click', () => {
      latexInput.value = exporter.escapeSpecialChars(latexInput.value);
      triggerRenderNow();
      showToast(window.t('toast_formatted'), 'success');
    });

    // 5. 分享 ^
    document.getElementById('item-share-link').addEventListener('click', async () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      const url = `${window.location.origin}${window.location.pathname}?f=${encodeURIComponent(latex)}`;
      await exporter.copyText(url);
      window.history.replaceState(null, '', `?f=${encodeURIComponent(latex)}`);
      showToast(window.t('toast_copied_link'), 'success');
    });

    document.getElementById('item-share-base64').addEventListener('click', async () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      try {
        const svg = await exporter.getSVG(latex, { scale: 1.5, displayMode: displayModeSelect.value === 'display' });
        const b64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
        await exporter.copyText(b64);
        showToast('Copied Base64 Data URI!', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  /**
   * Event Listeners Registration
   */
  function setupEventListeners() {
    latexInput.addEventListener('input', queueRender);

    fontSizeSlider.addEventListener('input', () => {
      fontSizeVal.textContent = `${fontSizeSlider.value}px`;
      triggerRenderNow();
    });

    displayModeSelect.addEventListener('change', triggerRenderNow);
    bgStyleSelect.addEventListener('change', triggerRenderNow);

    btnResetPreviewZoom.addEventListener('click', () => {
      fontSizeSlider.value = 26;
      fontSizeVal.textContent = '26px';
      displayModeSelect.value = 'display';
      bgStyleSelect.value = 'transparent';
      triggerRenderNow();
    });

    btnFormatLatex.addEventListener('click', () => {
      let code = latexInput.value.trim();
      code = code.replace(/\s+/g, ' ').replace(/\s*=\s*/g, ' = ');
      latexInput.value = code;
      triggerRenderNow();
      showToast(window.t('toast_formatted'), 'success');
    });

    btnClearLatex.addEventListener('click', () => {
      latexInput.value = '';
      triggerRenderNow();
      latexInput.focus();
      showToast(window.t('toast_cleared'), 'info');
    });

    btnWrapDisplay.addEventListener('click', () => {
      const val = latexInput.value.trim();
      if (val.startsWith('$$') && val.endsWith('$$')) {
        latexInput.value = val.slice(2, -2).trim();
      } else {
        latexInput.value = `$$\n${val}\n$$`;
      }
      triggerRenderNow();
    });

    btnWrapInline.addEventListener('click', () => {
      const val = latexInput.value.trim();
      if (val.startsWith('$') && val.endsWith('$')) {
        latexInput.value = val.slice(1, -1).trim();
      } else {
        latexInput.value = `$${val}$`;
      }
      triggerRenderNow();
    });

    btnCopyLatexRaw.addEventListener('click', async () => {
      const text = latexInput.value.trim();
      if (!text) return showToast('Formula is empty', 'error');
      await exporter.copyText(text);
      showToast(window.t('toast_copied_latex'), 'success');
    });

    // PNG Modal Handlers
    btnClosePNGModal.addEventListener('click', () => modalPNGExport.classList.remove('active'));
    btnCancelPNGModal.addEventListener('click', () => modalPNGExport.classList.remove('active'));

    btnConfirmDownloadPNG.addEventListener('click', async () => {
      const latex = latexInput.value.trim();
      if (!latex) return showToast('Formula is empty', 'error');
      
      const scale = parseInt(pngScaleSelect.value, 10);
      const bg = pngBgSelect.value;
      const padding = parseInt(pngPaddingSelect.value, 10);
      let filename = (pngFilenameInput.value || 'formula.png').trim();
      if (!filename.toLowerCase().endsWith('.png')) filename += '.png';

      try {
        showToast(`Generating ${scale}x image...`, 'info');
        await exporter.downloadPNG(latex, filename, {
          scale: scale,
          bgColor: bg,
          padding: padding,
          displayMode: displayModeSelect.value === 'display',
          textColor: bg === '#0f172a' ? '#f8fafc' : '#0f172a'
        });
        modalPNGExport.classList.remove('active');
        showToast('PNG image downloaded!', 'success');
      } catch (err) {
        showToast('Export failed: ' + err.message, 'error');
      }
    });

    // Secondary Tabs Switcher
    document.querySelectorAll('.secondary-section .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.secondary-section .tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.secondary-section .tab-content-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPanel = document.getElementById(btn.dataset.tab);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Clear History
    btnClearHistory.addEventListener('click', () => {
      history.clear();
      refreshHistoryList();
      showToast(window.t('toast_cleared'), 'info');
    });

    // Copy Raw Viewers
    btnCopyRawMathML.addEventListener('click', async () => {
      await exporter.copyText(mathmlCodeBox.textContent);
      showToast(window.t('toast_copied_mathml'), 'success');
    });

    btnCopyRawSVG.addEventListener('click', async () => {
      await exporter.copyText(svgCodeBox.textContent);
      showToast(window.t('toast_copied_svg'), 'success');
    });

    // Shortcuts Modal
    btnShortcuts.addEventListener('click', () => modalShortcuts.classList.add('active'));
    btnCloseShortcutsModal.addEventListener('click', () => modalShortcuts.classList.remove('active'));
    btnConfirmShortcutsModal.addEventListener('click', () => modalShortcuts.classList.remove('active'));

    // Theme Toggle
    btnThemeToggle.addEventListener('click', toggleTheme);

    // Global Keybindings
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        btnCopyLatexRaw.click();
      }
    });

    // Tab key in textarea
    latexInput.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = latexInput.selectionStart;
        const end = latexInput.selectionEnd;
        latexInput.value = latexInput.value.substring(0, start) + '  ' + latexInput.value.substring(end);
        latexInput.setSelectionRange(start + 2, start + 2);
        queueRender();
      }
    });
  }

  /**
   * Initialize Draggable Height Resizer for Input Area
   */
  function initEditorResizer() {
    const resizer = document.getElementById('editor-resizer');
    const textarea = document.getElementById('latex-input');
    if (!resizer || !textarea) return;

    // Restore saved height
    const savedHeight = localStorage.getItem('latex_editor_height');
    if (savedHeight) {
      textarea.style.height = savedHeight + 'px';
    }

    let startY, startHeight;

    const onMouseMove = (e) => {
      const dy = e.clientY - startY;
      const newHeight = Math.max(100, Math.min(800, startHeight + dy));
      textarea.style.height = newHeight + 'px';
      localStorage.setItem('latex_editor_height', newHeight);
    };

    const onMouseUp = () => {
      resizer.classList.remove('dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startY = e.clientY;
      startHeight = textarea.offsetHeight;
      resizer.classList.add('dragging');
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // Touch support for mobile / touch screens
    resizer.addEventListener('touchstart', (e) => {
      if (!e.touches[0]) return;
      startY = e.touches[0].clientY;
      startHeight = textarea.offsetHeight;
      resizer.classList.add('dragging');
    }, { passive: true });

    resizer.addEventListener('touchmove', (e) => {
      if (!e.touches[0]) return;
      const dy = e.touches[0].clientY - startY;
      const newHeight = Math.max(100, Math.min(800, startHeight + dy));
      textarea.style.height = newHeight + 'px';
      localStorage.setItem('latex_editor_height', newHeight);
    }, { passive: true });

    resizer.addEventListener('touchend', () => {
      resizer.classList.remove('dragging');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
