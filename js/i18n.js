/**
 * Internationalization (i18n) Module
 * Supports seamless switching between Chinese (zh) and English (en).
 */

window.I18N_LANG = localStorage.getItem('latex_lang') || 'zh';

window.I18N_DICT = {
  zh: {
    // Header
    app_title: 'IE LaTeX 公式编辑器',
    app_subtitle: '实时渲染 · 可视化键盘 · Word MathML 转换 · 高清导出',
    shortcuts: '快捷键',
    lang_btn: 'EN',
    lang_tip: 'Switch to English',
    nav_editor: '公式编辑器',
    nav_guide: '排版教程与手册',
    nav_about: '关于我们',

    // Footer
    footer_tools: '核心工具',
    footer_docs: '教程与支持',
    footer_legal: '法律与合规',
    footer_editor: 'LaTeX 公式编辑器',
    footer_word: 'Word MathML 导出',
    footer_png: '4K 高清 PNG / SVG',
    footer_guide: 'LaTeX 排版手册',
    footer_faq: '常见报错解决',
    footer_privacy: '隐私政策 (Privacy)',
    footer_terms: '服务条款 (Terms)',
    footer_about: '关于我们 (About)',
    footer_copyright: 'IE LaTeX 公式编辑器 © 2026 · 基于 KaTeX 与 MathJax 核心构建 · 专注极致数学公式排版体验',

    // FAQ Section
    faq_section_title: 'LaTeX 公式使用指南与常见问题 (FAQ)',
    faq_q1: '如何将 LaTeX 公式直接粘贴到 Word / WPS？',
    faq_a1: '在编辑器中完成公式输入后，点击底部的【输出Word文件】下拉菜单并选择【复制 Word MathML】。打开 Microsoft Word 或 WPS 文档，直接按 Ctrl + V 粘贴，Word 即可无缝自动识别并将其转化为原生可编辑的数学公式对象。',
    faq_q2: '如何导出 4K/8K 超清透明背景图片？',
    faq_a2: '在【输出图片】下拉菜单中选择【下载高清 PNG 图片】，将分辨率倍率切换为 3x、4x 4K 或 8x 8K，背景选择【透明背景】，即可一键下载印刷级超清无损公式图片，非常适合学术论文配图与 PPT 演讲演示。',
    faq_q3: '双核极速渲染与 100% 隐私安全保障',
    faq_a3: '本站基于 KaTeX 与 MathJax 纯前端 WebAssembly/JS 技术构建，所有公式渲染、MathML 转换与图片栅格化均在您本地浏览器沙箱中毫秒级完成，零数据上传云端，彻底保障学术与试题数据隐私安全。',

    // Cookie Banner
    cookie_text: '本站使用 Cookie 和本地存储技术以保障工具流畅运行并保存您的公式与排版偏好。浏览本站即表示您同意我们的',
    cookie_policy_link: '隐私政策',
    cookie_accept: '同意并接受',

    // Input Section
    input_section_title: '输入区域 · LaTeX 源码编辑',
    format_code: '整理格式',
    clear_code: '清空',
    textarea_placeholder: '在此输入 LaTeX 公式代码，例如 \\int_{-\\infty}^{+\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}',
    char_count: '字符数',
    render_latency: '渲染',
    wrap_display: '$$ 块级',
    wrap_inline: '$ 行内',
    copy_source: '复制源码',

    // Output Section
    output_section_title: '输出区域 · 实时公式预览',
    font_size: '字号:',
    mode: '模式:',
    mode_display: '行间独立块 (Display)',
    mode_inline: '行内嵌入 (Inline)',
    bg_color: '底色:',
    bg_transparent: '透明背景',
    bg_white: '纯白背景',
    bg_dark: '深色背景',
    bg_warm: '护眼暖米',
    reset_zoom: '重置大小',
    preview_placeholder: '公式渲染预览区（在此实时展示数学公式）',
    syntax_error: '语法提示',

    // Action Menu Buttons (matching user screenshot)
    menu_export_image: '输出图片 ⌃',
    menu_export_code: '输出代码 ⌃',
    menu_export_word: '输出Word文件 ⌃',
    menu_escape: '转义 ⌃',
    menu_share: '分享 ⌃',

    // Dropdown Items
    // Image
    action_download_png: '下载高清 PNG 图片 (1x-8x)',
    action_download_png_desc: '支持透明背景 / 自定义倍率',
    action_download_svg: '下载矢量 SVG 文件',
    action_download_svg_desc: '无限缩放 / 论文与排版',
    action_copy_svg: '复制 SVG 矢量源码',
    action_copy_svg_desc: '粘贴到 Figma / Illustrator',

    // Code
    action_copy_latex: '复制纯 LaTeX 源码',
    action_copy_latex_desc: '复制原始公式代码',
    action_copy_md_block: '复制 Markdown 块级 ($$...$$)',
    action_copy_md_block_desc: '适合 Obsidian / Typora / GitHub',
    action_copy_md_inline: '复制 Markdown 行内 ($...$)',
    action_copy_md_inline_desc: '适合内嵌正文公式',
    action_copy_html_img: '复制 HTML 嵌入标签',
    action_copy_html_img_desc: '网页可直接引用的 SVG 标签',

    // Word
    action_copy_mathml: '复制 Word MathML (直接粘贴)',
    action_copy_mathml_desc: '在 Word/WPS 中直接 Ctrl+V 转化为原生公式',
    action_download_word: '下载 Word (.docx) 公式文档',
    action_download_word_desc: '生成内嵌公式的 Word 文档',
    action_download_mml: '下载 MathML (.mml) 文件',
    action_download_mml_desc: '标准 XML 数学标记文件',

    // Escape & Format
    action_escape_chinese: '自动将中文包裹为 \\text{...}',
    action_escape_chinese_desc: '修复中文在公式中的显示',
    action_format_tidy: '美化排版与整理空格',
    action_format_tidy_desc: '规范 LaTeX 等号与符号间距',
    action_compress_oneline: '压缩为单行公式',
    action_compress_oneline_desc: '移除换行与多余空格',
    action_escape_special: '转义特殊字符 (%, &, _)',
    action_escape_special_desc: '自动添加反斜杠保护特殊符号',

    // Share
    action_share_link: '复制公式分享链接',
    action_share_link_desc: '生成可通过 URL 打开的公式地址',
    action_share_base64: '复制 Base64 Data URI',
    action_share_base64_desc: '嵌入式图像 Data URI 代码',

    // Bottom Tabs
    tab_presets: '📚 经典公式库',
    tab_history: '⏱️ 历史记录',
    tab_mathml: '💻 MathML 源码',
    tab_svg: '📐 SVG 源码',
    clear_history: '清空历史',
    history_empty: '暂无历史记录，编辑公式后将自动保存于此处',
    mathml_tip: 'MathML 格式适用于网页内嵌与 Office Word 公式编辑器直接解析',
    svg_tip: 'SVG 矢量代码可直接嵌入 HTML 或粘贴到设计软件 (Figma / Illustrator)',

    // Symbols Categories
    cat_common: '常用/基础',
    cat_calculus: '微积分与极限',
    cat_greek_lower: '希腊字母(小写)',
    cat_greek_upper: '希腊字母(大写)',
    cat_matrix: '矩阵与方程组',
    cat_relations: '关系与集合',
    cat_arrows: '箭头与推导',
    cat_functions: '函数与格式',
    cat_physics: '物理与量子',

    // Presets Categories
    preset_cat_calc: '经典微积分 & 分析',
    preset_cat_algebra: '线性代数 & 几何',
    preset_cat_physics: '物理学与量子力学',
    preset_cat_stats: '概率统计 & 机器学习',

    // Modals
    modal_png_title: '导出高清 PNG 图片设置',
    modal_png_scale: '分辨率清晰度 (Scale):',
    modal_png_bg: '背景填充:',
    modal_png_padding: '外边距留白 (Padding):',
    modal_png_filename: '文件名:',
    modal_cancel: '取消',
    modal_confirm_download: '立即下载 PNG',
    modal_shortcuts_title: '快捷键与使用技巧',
    modal_shortcuts_know: '我知道了',

    // Toasts
    toast_copied_latex: '已复制 LaTeX 源码到剪贴板！',
    toast_copied_mathml: '已复制 Word MathML！打开 Word 直接 Ctrl+V 粘贴即可转换为原生公式',
    toast_copied_md: '已复制 Markdown 代码！',
    toast_copied_svg: '已复制 SVG 代码！',
    toast_copied_link: '已生成并复制公式分享链接！',
    toast_downloaded_word: 'Word 公式文档已生成并下载！',
    toast_formatted: '公式格式已整理！',
    toast_escaped_chinese: '已自动将中文内容包裹为 \\text{...}',
    toast_cleared: '已清空内容'
  },
  en: {
    // Header
    app_title: 'IE LaTeX Formula Editor',
    app_subtitle: 'Live Rendering · Visual Keyboard · Word MathML · HD Export',
    shortcuts: 'Shortcuts',
    lang_btn: '中文',
    lang_tip: '切换为中文',
    nav_editor: 'Editor',
    nav_guide: 'Guide & Manual',
    nav_about: 'About Us',

    // Footer
    footer_tools: 'Core Tools',
    footer_docs: 'Tutorials & Docs',
    footer_legal: 'Legal & Compliance',
    footer_editor: 'LaTeX Formula Editor',
    footer_word: 'Word MathML Export',
    footer_png: '4K PNG / SVG Export',
    footer_guide: 'LaTeX Typesetting Guide',
    footer_faq: 'Troubleshooting & FAQ',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_about: 'About Us',
    footer_copyright: 'IE LaTeX Formula Editor © 2026 · Powered by KaTeX & MathJax · Designed for flawless mathematical typesetting',

    // FAQ Section
    faq_section_title: 'LaTeX Formula Guide & Frequently Asked Questions (FAQ)',
    faq_q1: 'How to paste LaTeX formulas directly into Word / WPS?',
    faq_a1: 'After editing your formula, click the "Export Word" menu and select "Copy Word MathML". In Microsoft Word or WPS, press Ctrl+V to paste. Word will automatically parse and convert it into a native, fully editable equation object.',
    faq_q2: 'How to export 4K/8K ultra-HD transparent formula images?',
    faq_a2: 'In the "Export Image" dropdown, choose "Download HD PNG Image", set the scale factor to 3x, 4x (4K) or 8x (8K), and select "Transparent". You will get print-ready, crystal-clear formula images suitable for research papers, posters, and presentation slides.',
    faq_q3: 'Dual-Core Instant Rendering & 100% Privacy Guarantee',
    faq_a3: 'Built upon KaTeX and MathJax client-side technology, all formula rendering, MathML conversions, and image rasterizations occur entirely within your local browser sandbox. Zero formula data is uploaded to cloud servers, fully safeguarding your academic privacy.',

    // Cookie Banner
    cookie_text: 'We use cookies and local storage to optimize tool performance and remember your formula and typesetting preferences. By using our site, you agree to our',
    cookie_policy_link: 'Privacy Policy',
    cookie_accept: 'Accept All',

    // Input Section
    input_section_title: 'Input Area · LaTeX Source Editor',
    format_code: 'Format',
    clear_code: 'Clear',
    textarea_placeholder: 'Type or paste LaTeX formula here, e.g. \\int_{-\\infty}^{+\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}',
    char_count: 'Chars',
    render_latency: 'Render',
    wrap_display: '$$ Block',
    wrap_inline: '$ Inline',
    copy_source: 'Copy LaTeX',

    // Output Section
    output_section_title: 'Output Area · Live Formula Preview',
    font_size: 'Size:',
    mode: 'Mode:',
    mode_display: 'Display Block',
    mode_inline: 'Inline',
    bg_color: 'Background:',
    bg_transparent: 'Transparent',
    bg_white: 'Pure White',
    bg_dark: 'Dark Theme',
    bg_warm: 'Warm Paper',
    reset_zoom: 'Reset Size',
    preview_placeholder: 'Formula Preview Area (Rendered live)',
    syntax_error: 'Syntax Notice',

    // Action Menu Buttons (matching user screenshot)
    menu_export_image: 'Export Image ⌃',
    menu_export_code: 'Export Code ⌃',
    menu_export_word: 'Export Word ⌃',
    menu_escape: 'Format & Escape ⌃',
    menu_share: 'Share ⌃',

    // Dropdown Items
    // Image
    action_download_png: 'Download HD PNG Image (1x-8x)',
    action_download_png_desc: 'Transparent background & custom scale',
    action_download_svg: 'Download Vector SVG File',
    action_download_svg_desc: 'Infinite scaling for papers & graphics',
    action_copy_svg: 'Copy SVG Vector Markup',
    action_copy_svg_desc: 'Paste directly into Figma / Illustrator',

    // Code
    action_copy_latex: 'Copy Raw LaTeX Source',
    action_copy_latex_desc: 'Standard LaTeX formula code',
    action_copy_md_block: 'Copy Markdown Block ($$...$$)',
    action_copy_md_block_desc: 'For Obsidian / Typora / GitHub',
    action_copy_md_inline: 'Copy Markdown Inline ($...$)',
    action_copy_md_inline_desc: 'For inline text formula integration',
    action_copy_html_img: 'Copy HTML Embed Tag',
    action_copy_html_img_desc: 'SVG embed markup for websites',

    // Word
    action_copy_mathml: 'Copy Word MathML (Direct Paste)',
    action_copy_mathml_desc: 'Ctrl+V in Word / WPS converts to native equation',
    action_download_word: 'Download Word (.docx) Document',
    action_download_word_desc: 'Generate Word file with embedded formula',
    action_download_mml: 'Download MathML (.mml) File',
    action_download_mml_desc: 'Standard XML MathML document',

    // Escape & Format
    action_escape_chinese: 'Auto-wrap Chinese into \\text{...}',
    action_escape_chinese_desc: 'Fix Chinese characters in math mode',
    action_format_tidy: 'Tidy Whitespace & Alignment',
    action_format_tidy_desc: 'Clean equal signs and spacing',
    action_compress_oneline: 'Compress to Single Line',
    action_compress_oneline_desc: 'Remove line breaks and excess spaces',
    action_escape_special: 'Escape Special Chars (%, &, _)',
    action_escape_special_desc: 'Auto-add backslashes for special symbols',

    // Share
    action_share_link: 'Copy Shareable Formula Link',
    action_share_link_desc: 'URL-encoded link to restore formula',
    action_share_base64: 'Copy Base64 Data URI',
    action_share_base64_desc: 'Embedded image data URI string',

    // Bottom Tabs
    tab_presets: '📚 Classic Presets',
    tab_history: '⏱️ History',
    tab_mathml: '💻 MathML Code',
    tab_svg: '📐 SVG Code',
    clear_history: 'Clear History',
    history_empty: 'No history yet. Edited formulas will be automatically saved here',
    mathml_tip: 'MathML format is suitable for web embedding and MS Word formula parsing',
    svg_tip: 'SVG vector code can be embedded into HTML or design software (Figma / Illustrator)',

    // Symbols Categories
    cat_common: 'Common / Basic',
    cat_calculus: 'Calculus & Limits',
    cat_greek_lower: 'Greek (Lower)',
    cat_greek_upper: 'Greek (Upper)',
    cat_matrix: 'Matrices & Cases',
    cat_relations: 'Relations & Sets',
    cat_arrows: 'Arrows',
    cat_functions: 'Functions & Styles',
    cat_physics: 'Physics & Quantum',

    // Presets Categories
    preset_cat_calc: 'Calculus & Analysis',
    preset_cat_algebra: 'Linear Algebra & Geometry',
    preset_cat_physics: 'Physics & Quantum Mechanics',
    preset_cat_stats: 'Probability & Statistics',

    // Modals
    modal_png_title: 'Export HD PNG Settings',
    modal_png_scale: 'Resolution Scale:',
    modal_png_bg: 'Background Fill:',
    modal_png_padding: 'Padding:',
    modal_png_filename: 'Filename:',
    modal_cancel: 'Cancel',
    modal_confirm_download: 'Download PNG Now',
    modal_shortcuts_title: 'Keyboard Shortcuts & Tips',
    modal_shortcuts_know: 'Got it',

    // Toasts
    toast_copied_latex: 'Copied LaTeX source code to clipboard!',
    toast_copied_mathml: 'Copied Word MathML! Press Ctrl+V in Word to convert to native equation',
    toast_copied_md: 'Copied Markdown code!',
    toast_copied_svg: 'Copied SVG markup!',
    toast_copied_link: 'Copied formula share link!',
    toast_downloaded_word: 'Word formula document downloaded!',
    toast_formatted: 'Formula formatted!',
    toast_escaped_chinese: 'Auto-wrapped Chinese text with \\text{...}',
    toast_cleared: 'Content cleared'
  }
};

/**
 * Translate key to current language
 */
window.t = function (key) {
  const lang = window.I18N_LANG || 'zh';
  const dict = window.I18N_DICT[lang] || window.I18N_DICT['zh'];
  return dict[key] !== undefined ? dict[key] : key;
};

/**
 * Apply i18n translations across the DOM
 */
window.applyI18n = function () {
  const lang = window.I18N_LANG || 'zh';
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = window.t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.getAttribute('placeholder')) {
        el.placeholder = translation;
      }
    } else {
      el.textContent = translation;
    }
  });

  // Update elements with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = window.t(key);
  });

  // Update language toggle button label
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    if (lang === 'zh') {
      langLabel.innerHTML = '<span style="font-weight:700; color:var(--brand-primary);">中</span> / <span style="opacity:0.6;">EN</span>';
    } else {
      langLabel.innerHTML = '<span style="opacity:0.6;">中</span> / <span style="font-weight:700; color:var(--brand-primary);">EN</span>';
    }
  }
  const btnLangToggle = document.getElementById('btn-lang-toggle');
  if (btnLangToggle) {
    btnLangToggle.title = lang === 'zh' ? '点击切换为英文 (Switch to English)' : 'Click to switch to Chinese (切换为中文)';
  }
};

/**
 * Toggle Language
 */
window.toggleLanguage = function () {
  window.I18N_LANG = window.I18N_LANG === 'zh' ? 'en' : 'zh';
  localStorage.setItem('latex_lang', window.I18N_LANG);
  window.applyI18n();

  // Re-render symbols and presets tabs with new labels
  if (window.refreshSymbolsAndPresetsI18n) {
    window.refreshSymbolsAndPresetsI18n();
  }

  // Show Toast
  if (window.showToast) {
    window.showToast(window.I18N_LANG === 'zh' ? '已切换为中文' : 'Switched to English', 'success');
  }
};

// Global DOM Content Loaded Handler for i18n on all pages
(function() {
  function autoInitI18n() {
    window.applyI18n();
    const btn = document.getElementById('btn-lang-toggle');
    if (btn && !btn.dataset.i18nBound) {
      btn.dataset.i18nBound = 'true';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.toggleLanguage();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitI18n);
  } else {
    autoInitI18n();
  }
})();

