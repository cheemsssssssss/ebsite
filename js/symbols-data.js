/**
 * LaTeX Formula Visual Toolbar - Symbol & Structure Database
 * Categorized by mathematical domain with insertion templates and cursor offsets.
 */

window.LATEX_SYMBOLS_DATA = [
  {
    id: 'common',
    name: '常用/基础',
    icon: '⚡',
    symbols: [
      { label: '\\frac{a}{b}', latex: '\\frac{a}{b}', template: '\\frac{a}{b}', tip: '分式 (Fraction)' },
      { label: 'x^{a}', latex: 'x^{a}', template: 'x^{a}', tip: '上标/幂 (Superscript)' },
      { label: 'x_{a}', latex: 'x_{a}', template: 'x_{a}', tip: '下标 (Subscript)' },
      { label: 'x_{b}^{a}', latex: 'x_{b}^{a}', template: 'x_{b}^{a}', tip: '上下标 (Sub/Superscript)' },
      { label: '\\sqrt{x}', latex: '\\sqrt{x}', template: '\\sqrt{x}', tip: '平方根 (Square Root)' },
      { label: '\\sqrt[n]{x}', latex: '\\sqrt[n]{x}', template: '\\sqrt[n]{x}', tip: 'n次根 (N-th Root)' },
      { label: '\\pm', latex: '\\pm', template: '\\pm ', tip: '正负号 (Plus-minus)' },
      { label: '\\times', latex: '\\times', template: '\\times ', tip: '乘号 (Multiply)' },
      { label: '\\div', latex: '\\div', template: '\\div ', tip: '除号 (Divide)' },
      { label: '\\cdot', latex: '\\cdot', template: '\\cdot ', tip: '点乘 (Dot)' },
      { label: '\\neq', latex: '\\neq', template: '\\neq ', tip: '不等于 (Not Equal)' },
      { label: '\\approx', latex: '\\approx', template: '\\approx ', tip: '约等于 (Approx)' },
      { label: '\\le', latex: '\\le', template: '\\le ', tip: '小于等于 (Less Equal)' },
      { label: '\\ge', latex: '\\ge', template: '\\ge ', tip: '大于等于 (Greater Equal)' },
      { label: '\\infty', latex: '\\infty', template: '\\infty', tip: '无穷大 (Infinity)' },
      { label: '\\partial', latex: '\\partial', template: '\\partial ', tip: '偏微分 (Partial)' },
      { label: '\\int', latex: '\\int', template: '\\int ', tip: '积分号 (Integral)' },
      { label: '\\sum', latex: '\\sum', template: '\\sum_{i=1}^{n} ', tip: '求和 (Summation)' },
      { label: '\\prod', latex: '\\prod', template: '\\prod_{i=1}^{n} ', tip: '累乘 (Product)' },
      { label: '\\left( \\right)', latex: '\\left( x \\right)', template: '\\left( x \\right)', tip: '自适应圆括号' },
      { label: '\\left[ \\right]', latex: '\\left[ x \\right]', template: '\\left[ x \\right]', tip: '自适应方括号' },
      { label: '\\left\\{ \\right\\}', latex: '\\left\\{ x \\right\\}', template: '\\left\\{ x \\right\\}', tip: '自适应花括号' }
    ]
  },
  {
    id: 'calculus',
    name: '微积分与极限',
    icon: '∫',
    symbols: [
      { label: '\\int_{a}^{b}', latex: '\\int_{a}^{b}', template: '\\int_{-\\infty}^{+\\infty} f(x)\\,dx', tip: '定积分' },
      { label: '\\iint', latex: '\\iint', template: '\\iint_{D} f(x,y)\\,dx\\,dy', tip: '二重积分' },
      { label: '\\iiint', latex: '\\iiint', template: '\\iiint_{\\Omega} f(x,y,z)\\,dV', tip: '三重积分' },
      { label: '\\oint', latex: '\\oint', template: '\\oint_{C} P\\,dx + Q\\,dy', tip: '曲线/闭合回路积分' },
      { label: '\\frac{df}{dx}', latex: '\\frac{df}{dx}', template: '\\frac{dy}{dx}', tip: '一阶常导数' },
      { label: '\\frac{d^2f}{dx^2}', latex: '\\frac{d^2f}{dx^2}', template: '\\frac{d^2y}{dx^2}', tip: '二阶常导数' },
      { label: '\\frac{\\partial f}{\\partial x}', latex: '\\frac{\\partial f}{\\partial x}', template: '\\frac{\\partial f}{\\partial x}', tip: '偏导数' },
      { label: '\\frac{\\partial^2 f}{\\partial x^2}', latex: '\\frac{\\partial^2 f}{\\partial x^2}', template: '\\frac{\\partial^2 f}{\\partial x^2}', tip: '二阶偏导数' },
      { label: '\\lim_{x \\to x_0}', latex: '\\lim_{x \\to 0}', template: '\\lim_{x \\to 0} f(x)', tip: '极限' },
      { label: '\\lim_{n \\to \\infty}', latex: '\\lim_{n \\to \\infty}', template: '\\lim_{n \\to \\infty} a_n', tip: '无穷极限' },
      { label: '\\nabla', latex: '\\nabla', template: '\\nabla ', tip: 'Nabla/梯度算子' },
      { label: '\\Delta', latex: '\\Delta', template: '\\Delta ', tip: '拉普拉斯算子/增量' },
      { label: 'f\'(x)', latex: 'f\'(x)', template: 'f\'(x)', tip: '导数记号' },
      { label: 'f\'\'(x)', latex: 'f\'\'(x)', template: 'f\'\'(x)', tip: '二阶导数' },
      { label: '\\dot{x}', latex: '\\dot{x}', template: '\\dot{x}', tip: '时间一阶导' },
      { label: '\\ddot{x}', latex: '\\ddot{x}', template: '\\ddot{x}', tip: '时间二阶导' },
      { label: '\\mathrm{d}x', latex: '\\mathrm{d}x', template: '\\mathrm{d}x', tip: '直立体微分符号' }
    ]
  },
  {
    id: 'greek_lower',
    name: '希腊字母(小写)',
    icon: 'α',
    symbols: [
      { label: '\\alpha', latex: '\\alpha', template: '\\alpha ', tip: 'alpha (α)' },
      { label: '\\beta', latex: '\\beta', template: '\\beta ', tip: 'beta (β)' },
      { label: '\\gamma', latex: '\\gamma', template: '\\gamma ', tip: 'gamma (γ)' },
      { label: '\\delta', latex: '\\delta', template: '\\delta ', tip: 'delta (δ)' },
      { label: '\\epsilon', latex: '\\epsilon', template: '\\epsilon ', tip: 'epsilon (ϵ)' },
      { label: '\\varepsilon', latex: '\\varepsilon', template: '\\varepsilon ', tip: 'varepsilon (ε)' },
      { label: '\\zeta', latex: '\\zeta', template: '\\zeta ', tip: 'zeta (ζ)' },
      { label: '\\eta', latex: '\\eta', template: '\\eta ', tip: 'eta (η)' },
      { label: '\\theta', latex: '\\theta', template: '\\theta ', tip: 'theta (θ)' },
      { label: '\\vartheta', latex: '\\vartheta', template: '\\vartheta ', tip: 'vartheta (ϑ)' },
      { label: '\\iota', latex: '\\iota', template: '\\iota ', tip: 'iota (ι)' },
      { label: '\\kappa', latex: '\\kappa', template: '\\kappa ', tip: 'kappa (κ)' },
      { label: '\\lambda', latex: '\\lambda', template: '\\lambda ', tip: 'lambda (λ)' },
      { label: '\\mu', latex: '\\mu', template: '\\mu ', tip: 'mu (μ)' },
      { label: '\\nu', latex: '\\nu', template: '\\nu ', tip: 'nu (ν)' },
      { label: '\\xi', latex: '\\xi', template: '\\xi ', tip: 'xi (ξ)' },
      { label: '\\pi', latex: '\\pi', template: '\\pi ', tip: 'pi (π)' },
      { label: '\\varpi', latex: '\\varpi', template: '\\varpi ', tip: 'varpi (ϖ)' },
      { label: '\\rho', latex: '\\rho', template: '\\rho ', tip: 'rho (ρ)' },
      { label: '\\varrho', latex: '\\varrho', template: '\\varrho ', tip: 'varrho (ϱ)' },
      { label: '\\sigma', latex: '\\sigma', template: '\\sigma ', tip: 'sigma (σ)' },
      { label: '\\varsigma', latex: '\\varsigma', template: '\\varsigma ', tip: 'varsigma (ς)' },
      { label: '\\tau', latex: '\\tau', template: '\\tau ', tip: 'tau (τ)' },
      { label: '\\upsilon', latex: '\\upsilon', template: '\\upsilon ', tip: 'upsilon (υ)' },
      { label: '\\phi', latex: '\\phi', template: '\\phi ', tip: 'phi (ϕ)' },
      { label: '\\varphi', latex: '\\varphi', template: '\\varphi ', tip: 'varphi (φ)' },
      { label: '\\chi', latex: '\\chi', template: '\\chi ', tip: 'chi (χ)' },
      { label: '\\psi', latex: '\\psi', template: '\\psi ', tip: 'psi (ψ)' },
      { label: '\\omega', latex: '\\omega', template: '\\omega ', tip: 'omega (ω)' }
    ]
  },
  {
    id: 'greek_upper',
    name: '希腊字母(大写)',
    icon: 'Ω',
    symbols: [
      { label: '\\Gamma', latex: '\\Gamma', template: '\\Gamma ', tip: 'Gamma (Γ)' },
      { label: '\\Delta', latex: '\\Delta', template: '\\Delta ', tip: 'Delta (Δ)' },
      { label: '\\Theta', latex: '\\Theta', template: '\\Theta ', tip: 'Theta (Θ)' },
      { label: '\\Lambda', latex: '\\Lambda', template: '\\Lambda ', tip: 'Lambda (Λ)' },
      { label: '\\Xi', latex: '\\Xi', template: '\\Xi ', tip: 'Xi (Ξ)' },
      { label: '\\Pi', latex: '\\Pi', template: '\\Pi ', tip: 'Pi (Π)' },
      { label: '\\Sigma', latex: '\\Sigma', template: '\\Sigma ', tip: 'Sigma (Σ)' },
      { label: '\\Upsilon', latex: '\\Upsilon', template: '\\Upsilon ', tip: 'Upsilon (Υ)' },
      { label: '\\Phi', latex: '\\Phi', template: '\\Phi ', tip: 'Phi (Φ)' },
      { label: '\\Psi', latex: '\\Psi', template: '\\Psi ', tip: 'Psi (Ψ)' },
      { label: '\\Omega', latex: '\\Omega', template: '\\Omega ', tip: 'Omega (Ω)' }
    ]
  },
  {
    id: 'matrix',
    name: '矩阵与方程组',
    icon: '⊞',
    symbols: [
      {
        label: '\\begin{pmatrix}',
        latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
        template: '\\begin{pmatrix}\n  a & b \\\\\n  c & d\n\\end{pmatrix}',
        tip: '圆括号矩阵 (pmatrix)'
      },
      {
        label: '\\begin{bmatrix}',
        latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
        template: '\\begin{bmatrix}\n  a & b \\\\\n  c & d\n\\end{bmatrix}',
        tip: '方括号矩阵 (bmatrix)'
      },
      {
        label: '\\begin{vmatrix}',
        latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}',
        template: '\\begin{vmatrix}\n  a & b \\\\\n  c & d\n\\end{vmatrix}',
        tip: '行列式 (vmatrix)'
      },
      {
        label: '\\begin{Vmatrix}',
        latex: '\\begin{Vmatrix} a & b \\\\ c & d \\end{Vmatrix}',
        template: '\\begin{Vmatrix}\n  a & b \\\\\n  c & d\n\\end{Vmatrix}',
        tip: '双竖线范数矩阵 (Vmatrix)'
      },
      {
        label: '3x3 Matrix',
        latex: '\\begin{pmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{pmatrix}',
        template: '\\begin{pmatrix}\n  a_{11} & a_{12} & a_{13} \\\\\n  a_{21} & a_{22} & a_{23} \\\\\n  a_{31} & a_{32} & a_{33}\n\\end{pmatrix}',
        tip: '3×3 矩阵模版'
      },
      {
        label: '\\begin{cases}',
        latex: 'f(x)=\\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases}',
        template: 'f(x) = \\begin{cases}\n  x, & \\text{if } x \\ge 0 \\\\\n  -x, & \\text{if } x < 0\n\\end{cases}',
        tip: '分段函数 / 方程组 (cases)'
      },
      {
        label: '\\begin{aligned}',
        latex: '\\begin{aligned} a &= b + c \\\\ &= d + e \\end{aligned}',
        template: '\\begin{aligned}\n  a &= b + c \\\\\n  &= d + e\n\\end{aligned}',
        tip: '等号多行对齐 (aligned)'
      },
      {
        label: '\\cdots',
        latex: '\\cdots',
        template: '\\cdots ',
        tip: '横向居中省略号'
      },
      {
        label: '\\ddots',
        latex: '\\ddots',
        template: '\\ddots ',
        tip: '对角线省略号'
      },
      {
        label: '\\vdots',
        latex: '\\vdots',
        template: '\\vdots ',
        tip: '垂直省略号'
      }
    ]
  },
  {
    id: 'relations',
    name: '关系与集合',
    icon: '∈',
    symbols: [
      { label: '\\in', latex: '\\in', template: '\\in ', tip: '属于' },
      { label: '\\notin', latex: '\\notin', template: '\\notin ', tip: '不属于' },
      { label: '\\subset', latex: '\\subset', template: '\\subset ', tip: '真子集' },
      { label: '\\subseteq', latex: '\\subseteq', template: '\\subseteq ', tip: '子集' },
      { label: '\\supset', latex: '\\supset', template: '\\supset ', tip: '包含' },
      { label: '\\supseteq', latex: '\\supseteq', template: '\\supseteq ', tip: '包含于' },
      { label: '\\cup', latex: '\\cup', template: '\\cup ', tip: '并集 (Union)' },
      { label: '\\cap', latex: '\\cap', template: '\\cap ', tip: '交集 (Intersection)' },
      { label: '\\setminus', latex: '\\setminus', template: '\\setminus ', tip: '差集' },
      { label: '\\emptyset', latex: '\\emptyset', template: '\\emptyset', tip: '空集' },
      { label: '\\forall', latex: '\\forall', template: '\\forall ', tip: '全称量词 (任意)' },
      { label: '\\exists', latex: '\\exists', template: '\\exists ', tip: '存在量词' },
      { label: '\\nexists', latex: '\\nexists', template: '\\nexists ', tip: '不存在' },
      { label: '\\equiv', latex: '\\equiv', template: '\\equiv ', tip: '恒等于/同余' },
      { label: '\\sim', latex: '\\sim', template: '\\sim ', tip: '相似/服从分布' },
      { label: '\\cong', latex: '\\cong', template: '\\cong ', tip: '全等' },
      { label: '\\propto', latex: '\\propto', template: '\\propto ', tip: '正比于' },
      { label: '\\mathbb{R}', latex: '\\mathbb{R}', template: '\\mathbb{R}', tip: '实数集 R' },
      { label: '\\mathbb{C}', latex: '\\mathbb{C}', template: '\\mathbb{C}', tip: '复数集 C' },
      { label: '\\mathbb{N}', latex: '\\mathbb{N}', template: '\\mathbb{N}', tip: '自然数集 N' },
      { label: '\\mathbb{Z}', latex: '\\mathbb{Z}', template: '\\mathbb{Z}', tip: '整数集 Z' },
      { label: '\\mathbb{Q}', latex: '\\mathbb{Q}', template: '\\mathbb{Q}', tip: '有理数集 Q' }
    ]
  },
  {
    id: 'arrows',
    name: '箭头与推导',
    icon: '→',
    symbols: [
      { label: '\\rightarrow', latex: '\\rightarrow', template: '\\rightarrow ', tip: '右箭头' },
      { label: '\\leftarrow', latex: '\\leftarrow', template: '\\leftarrow ', tip: '左箭头' },
      { label: '\\leftrightarrow', latex: '\\leftrightarrow', template: '\\leftrightarrow ', tip: '双向箭头' },
      { label: '\\Rightarrow', latex: '\\Rightarrow', template: '\\Rightarrow ', tip: '推出 (Implies)' },
      { label: '\\Leftarrow', latex: '\\Leftarrow', template: '\\Leftarrow ', tip: '被推出' },
      { label: '\\Leftrightarrow', latex: '\\Leftrightarrow', template: '\\Leftrightarrow ', tip: '当且仅当 (Iff)' },
      { label: '\\mapsto', latex: '\\mapsto', template: '\\mapsto ', tip: '映射到' },
      { label: '\\uparrow', latex: '\\uparrow', template: '\\uparrow ', tip: '向上箭头' },
      { label: '\\downarrow', latex: '\\downarrow', template: '\\downarrow ', tip: '向下箭头' },
      { label: '\\vec{v}', latex: '\\vec{v}', template: '\\vec{v}', tip: '向量' },
      { label: '\\mathbf{v}', latex: '\\mathbf{v}', template: '\\mathbf{v}', tip: '粗体向量' },
      { label: '\\overrightarrow{AB}', latex: '\\overrightarrow{AB}', template: '\\overrightarrow{AB}', tip: '长向量箭头' },
      { label: '\\hat{x}', latex: '\\hat{x}', template: '\\hat{x}', tip: '单位向量/帽子' },
      { label: '\\bar{x}', latex: '\\bar{x}', template: '\\bar{x}', tip: '均值/上划线' },
      { label: '\\tilde{x}', latex: '\\tilde{x}', template: '\\tilde{x}', tip: '波浪线' },
      { label: '\\underline{x}', latex: '\\underline{x}', template: '\\underline{x}', tip: '下划线' },
      { label: '\\overline{x}', latex: '\\overline{x}', template: '\\overline{x}', tip: '上横线' }
    ]
  },
  {
    id: 'functions',
    name: '函数与格式',
    icon: 'ƒ',
    symbols: [
      { label: '\\sin', latex: '\\sin(x)', template: '\\sin(x)', tip: '正弦' },
      { label: '\\cos', latex: '\\cos(x)', template: '\\cos(x)', tip: '余弦' },
      { label: '\\tan', latex: '\\tan(x)', template: '\\tan(x)', tip: '正切' },
      { label: '\\arcsin', latex: '\\arcsin(x)', template: '\\arcsin(x)', tip: '反正弦' },
      { label: '\\arccos', latex: '\\arccos(x)', template: '\\arccos(x)', tip: '反余弦' },
      { label: '\\arctan', latex: '\\arctan(x)', template: '\\arctan(x)', tip: '反正切' },
      { label: '\\ln', latex: '\\ln(x)', template: '\\ln(x)', tip: '自然对数' },
      { label: '\\log_{10}', latex: '\\log_{10}(x)', template: '\\log_{10}(x)', tip: '常用对数' },
      { label: '\\exp', latex: '\\exp(x)', template: '\\exp(x)', tip: '指数函数' },
      { label: '\\min', latex: '\\min_{x}', template: '\\min_{x} f(x)', tip: '极小值' },
      { label: '\\max', latex: '\\max_{x}', template: '\\max_{x} f(x)', tip: '极大值' },
      { label: '\\sup', latex: '\\sup', template: '\\sup_{x} ', tip: '上确界' },
      { label: '\\inf', latex: '\\inf', template: '\\inf_{x} ', tip: '下确界' },
      { label: '\\det', latex: '\\det(A)', template: '\\det(A)', tip: '行列式' },
      { label: '\\operatorname{tr}', latex: '\\operatorname{tr}(A)', template: '\\operatorname{tr}(A)', tip: '矩阵的迹' },
      { label: '\\text{...}', latex: '\\text{word}', template: '\\text{word}', tip: '正体文本' },
      { label: '\\mathbf{...}', latex: '\\mathbf{B}', template: '\\mathbf{B}', tip: '粗体' },
      { label: '\\mathcal{...}', latex: '\\mathcal{L}', template: '\\mathcal{L}', tip: '花体 (Calligraphic)' },
      { label: '\\color{red}{...}', latex: '\\color{red}{x}', template: '\\color{red}{x}', tip: '文字颜色' },
      { label: '\\quad', latex: 'a \\quad b', template: '\\quad ', tip: '中等空格 (1em)' },
      { label: '\\, (thin space)', latex: 'e^{-x^2}\\,dx', template: '\\,', tip: '细微间距' }
    ]
  },
  {
    id: 'physics',
    name: '物理与量子',
    icon: '⚛',
    symbols: [
      { label: '\\hbar', latex: '\\hbar', template: '\\hbar', tip: '约化普朗克常数 h-bar' },
      { label: '\\langle \\psi |', latex: '\\langle \\psi |', template: '\\langle \\psi |', tip: 'Bra 左矢' },
      { label: '| \\psi \\rangle', latex: '| \\psi \\rangle', template: '| \\psi \\rangle', tip: 'Ket 右矢' },
      { label: '\\langle \\psi | \\phi \\rangle', latex: '\\langle \\psi | \\phi \\rangle', template: '\\langle \\psi | \\phi \\rangle', tip: 'Bra-Ket 内积' },
      { label: '\\dagger', latex: 'A^{\\dagger}', template: '^{\\dagger}', tip: '厄米共轭 (Dagger)' },
      { label: '\\otimes', latex: '\\otimes', template: '\\otimes ', tip: '张量积/直积' },
      { label: '\\oplus', latex: '\\oplus', template: '\\oplus ', tip: '直和' },
      { label: '\\circ', latex: '^\\circ', template: '^{\\circ}', tip: '角度/摄氏度' },
      { label: '\\mu_0', latex: '\\mu_0', template: '\\mu_0', tip: '真空磁导率' },
      { label: '\\varepsilon_0', latex: '\\varepsilon_0', template: '\\varepsilon_0', tip: '真空介电常数' }
    ]
  }
];
