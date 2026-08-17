/**
 * LaTeX Classic Formula Presets Library
 */

window.LATEX_PRESETS = [
  {
    category: '经典微积分 & 分析',
    items: [
      {
        name: '高斯积分 (Gaussian Integral)',
        latex: '\\int_{-\\infty}^{+\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}',
        description: '概率论与量子力学核心积分公式'
      },
      {
        name: '欧拉恒等式 (Euler\'s Identity)',
        latex: 'e^{i\\pi} + 1 = 0',
        description: '数学界最美公式，连接自然对数底、虚数单位、圆周率、1和0'
      },
      {
        name: '泰勒级数 (Taylor Series)',
        latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n',
        description: '函数在一点处的多项式逼近'
      },
      {
        name: '柯西-施瓦茨不等式 (Cauchy-Schwarz)',
        latex: '\\left( \\sum_{i=1}^n a_i b_i \\right)^2 \\le \\left( \\sum_{i=1}^n a_i^2 \\right) \\left( \\sum_{i=1}^n b_i^2 \\right)',
        description: '向量内积与模长的重要不等式'
      },
      {
        name: '微积分基本定理 (Fundamental Theorem)',
        latex: '\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)',
        description: '定积分与原函数的根本联系'
      },
      {
        name: '傅里叶变换 (Fourier Transform)',
        latex: '\\hat{f}(\\xi) = \\int_{-\\infty}^{+\\infty} f(x)\\,e^{-2\\pi i x \\xi}\\,dx',
        description: '时域与频域的无损转换'
      }
    ]
  },
  {
    category: '线性代数 & 几何',
    items: [
      {
        name: '二次求根公式 (Quadratic Formula)',
        latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        description: '一元二次方程根的通解'
      },
      {
        name: '特征值与特征向量 (Eigenvalue Equation)',
        latex: 'A\\mathbf{v} = \\lambda\\mathbf{v}',
        description: '线性变换主方向与伸缩因子'
      },
      {
        name: '旋转矩阵 (2D Rotation Matrix)',
        latex: 'R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}',
        description: '平面二维旋转正交变换'
      },
      {
        name: '分段函数示例 (Piecewise Function)',
        latex: 'f(x) = \\begin{cases} x^2, & x > 0 \\\\ 0, & x = 0 \\\\ -x^2, & x < 0 \\end{cases}',
        description: '带条件的多元分段表达式'
      }
    ]
  },
  {
    category: '物理学与量子力学',
    items: [
      {
        name: '薛定谔方程 (Schrödinger Equation)',
        latex: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\left[ -\\frac{\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t)\\right]\\Psi(\\mathbf{r},t)',
        description: '非相对论量子力学基本动力学方程'
      },
      {
        name: '麦克斯韦方程组 (Maxwell\'s Equations)',
        latex: '\\begin{aligned} \\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\ \\nabla \\cdot \\mathbf{B} &= 0 \\\\ \\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\ \\nabla \\times \\mathbf{B} &= \\mu_0\\mathbf{J} + \\mu_0\\varepsilon_0\\frac{\\partial \\mathbf{E}}{\\partial t} \\end{aligned}',
        description: '经典电动力学的四大基础微分方程'
      },
      {
        name: '爱因斯坦质能方程 (Mass-Energy Equivalence)',
        latex: 'E = mc^2',
        description: '狭义相对论质能等价关系'
      },
      {
        name: '海森堡不确定性原理 (Uncertainty Principle)',
        latex: '\\sigma_x \\sigma_p \\ge \\frac{\\hbar}{2}',
        description: '位置与动量测量精度的极限'
      }
    ]
  },
  {
    category: '概率统计 & 机器学习',
    items: [
      {
        name: '正态分布概率密度 (Normal Distribution PDF)',
        latex: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}',
        description: '高斯钟形概率密度曲线'
      },
      {
        name: '贝叶斯定理 (Bayes\' Theorem)',
        latex: 'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}',
        description: '后验概率推断与条件概率'
      },
      {
        name: 'Softmax 激活函数 (Softmax Function)',
        latex: '\\sigma(\\mathbf{z})_i = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}} \\quad (i=1,\\dots,K)',
        description: '神经网络多分类概率归一化输出'
      },
      {
        name: '交叉熵损失函数 (Cross-Entropy Loss)',
        latex: '\\mathcal{L} = -\\frac{1}{N}\\sum_{i=1}^{N}\\left[ y_i \\log(\\hat{y}_i) + (1-y_i) \\log(1-\\hat{y}_i) \\right]',
        description: '二分类分类器常用损失度量'
      }
    ]
  }
];
