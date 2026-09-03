/**
 * LaTeX Classic Formula Presets Library with Full Bilingual (ZH / EN) Support
 */

window.LATEX_PRESETS = [
  {
    category_zh: '经典微积分 & 分析',
    category_en: 'Calculus & Analysis',
    items: [
      {
        name_zh: '高斯积分 (Gaussian Integral)',
        name_en: 'Gaussian Integral',
        latex: '\\int_{-\\infty}^{+\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}',
        desc_zh: '概率论与量子力学核心积分公式',
        desc_en: 'Fundamental integral in probability theory and quantum mechanics'
      },
      {
        name_zh: '欧拉恒等式 (Euler\'s Identity)',
        name_en: 'Euler\'s Identity',
        latex: 'e^{i\\pi} + 1 = 0',
        desc_zh: '数学界最美公式，连接自然对数底、虚数单位、圆周率、1和0',
        desc_en: 'The most beautiful equation, connecting e, i, π, 1, and 0'
      },
      {
        name_zh: '泰勒级数 (Taylor Series)',
        name_en: 'Taylor Series',
        latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n',
        desc_zh: '函数在一点处的多项式逼近',
        desc_en: 'Polynomial approximation of a function near an expansion point'
      },
      {
        name_zh: '柯西-施瓦茨不等式 (Cauchy-Schwarz)',
        name_en: 'Cauchy-Schwarz Inequality',
        latex: '\\left( \\sum_{i=1}^n a_i b_i \\right)^2 \\le \\left( \\sum_{i=1}^n a_i^2 \\right) \\left( \\sum_{i=1}^n b_i^2 \\right)',
        desc_zh: '向量内积与模长的重要不等式',
        desc_en: 'Crucial inequality relating inner products and vector norms'
      },
      {
        name_zh: '微积分基本定理 (Fundamental Theorem)',
        name_en: 'Fundamental Theorem of Calculus',
        latex: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)',
        desc_zh: '定积分与原函数的根本联系',
        desc_en: 'Bridge connecting differentiation and definite integration'
      },
      {
        name_zh: '傅里叶变换 (Fourier Transform)',
        name_en: 'Fourier Transform',
        latex: '\\hat{f}(\\xi) = \\int_{-\\infty}^{+\\infty} f(x)\\,e^{-2\\pi i x \\xi}\\,dx',
        desc_zh: '时域与频域的无损转换',
        desc_en: 'Lossless transformation between time and frequency domains'
      }
    ]
  },
  {
    category_zh: '线性代数 & 几何',
    category_en: 'Linear Algebra & Geometry',
    items: [
      {
        name_zh: '二次求根公式 (Quadratic Formula)',
        name_en: 'Quadratic Formula',
        latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        desc_zh: '一元二次方程根的通解',
        desc_en: 'General closed-form solution to quadratic polynomial equations'
      },
      {
        name_zh: '特征值与特征向量 (Eigenvalue Equation)',
        name_en: 'Eigenvalue Equation',
        latex: 'A\\mathbf{v} = \\lambda\\mathbf{v}',
        desc_zh: '线性变换主方向与伸缩因子',
        desc_en: 'Invariant directions and scaling factors of linear transformations'
      },
      {
        name_zh: '旋转矩阵 (2D Rotation Matrix)',
        name_en: '2D Rotation Matrix',
        latex: 'R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}',
        desc_zh: '平面二维旋转正交变换',
        desc_en: 'Orthogonal matrix representing counterclockwise planar rotation'
      },
      {
        name_zh: '分段函数示例 (Piecewise Function)',
        name_en: 'Piecewise Function',
        latex: 'f(x) = \\begin{cases} x^2, & x > 0 \\\\ 0, & x = 0 \\\\ -x^2, & x < 0 \\end{cases}',
        desc_zh: '带条件的多元分段表达式',
        desc_en: 'Multi-branch function with conditional domain definitions'
      }
    ]
  },
  {
    category_zh: '物理学与量子力学',
    category_en: 'Physics & Quantum Mechanics',
    items: [
      {
        name_zh: '薛定谔方程 (Schrödinger Equation)',
        name_en: 'Schrödinger Equation',
        latex: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\left[ -\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t)\\right]\\Psi(\\mathbf{r},t)',
        desc_zh: '非相对论量子力学基本动力学方程',
        desc_en: 'Fundamental equation of non-relativistic quantum dynamics'
      },
      {
        name_zh: '麦克斯韦方程组 (Maxwell\'s Equations)',
        name_en: 'Maxwell\'s Equations',
        latex: '\\begin{aligned} \\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\ \\nabla \\cdot \\mathbf{B} &= 0 \\\\ \\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\ \\nabla \\times \\mathbf{B} &= \\mu_0\\mathbf{J} + \\mu_0\\varepsilon_0\\frac{\\partial \\mathbf{E}}{\\partial t} \\end{aligned}',
        desc_zh: '经典电动力学的四大基础微分方程',
        desc_en: 'The four fundamental differential equations of classical electromagnetism'
      },
      {
        name_zh: '爱因斯坦质能方程 (Mass-Energy Equivalence)',
        name_en: 'Mass-Energy Equivalence',
        latex: 'E = mc^2',
        desc_zh: '狭义相对论质能等价关系',
        desc_en: 'Fundamental principle connecting mass and energy in special relativity'
      },
      {
        name_zh: '海森堡不确定性原理 (Uncertainty Principle)',
        name_en: 'Uncertainty Principle',
        latex: '\\sigma_x \\sigma_p \\ge \\frac{\\hbar}{2}',
        desc_zh: '位置与动量测量精度的极限',
        desc_en: 'Fundamental trade-off limit between position and momentum measurement'
      }
    ]
  },
  {
    category_zh: '概率统计 & 机器学习',
    category_en: 'Probability, Statistics & ML',
    items: [
      {
        name_zh: '正态分布概率密度 (Normal Distribution PDF)',
        name_en: 'Normal Distribution (Gaussian PDF)',
        latex: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}',
        desc_zh: '高斯钟形概率密度曲线',
        desc_en: 'Standard bell curve probability density function'
      },
      {
        name_zh: '贝叶斯定理 (Bayes\' Theorem)',
        name_en: 'Bayes\' Theorem',
        latex: 'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}',
        desc_zh: '后验概率推断与条件概率',
        desc_en: 'Conditional probability and statistical posterior inference formula'
      },
      {
        name_zh: 'Softmax 激活函数 (Softmax Function)',
        name_en: 'Softmax Activation Function',
        latex: '\\sigma(\\mathbf{z})_i = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}} \\quad (i=1,\\dots,K)',
        desc_zh: '神经网络多分类概率归一化输出',
        desc_en: 'Multi-class probability distribution normalization for neural networks'
      },
      {
        name_zh: '交叉熵损失函数 (Cross-Entropy Loss)',
        name_en: 'Cross-Entropy Loss',
        latex: '\\mathcal{L} = -\\frac{1}{N}\\sum_{i=1}^{N}\\left[ y_i \\log(\\hat{y}_i) + (1-y_i) \\log(1-\\hat{y}_i) \\right]',
        desc_zh: '二分类分类器常用损失度量',
        desc_en: 'Standard objective function for binary and multiclass classification'
      }
    ]
  }
];
