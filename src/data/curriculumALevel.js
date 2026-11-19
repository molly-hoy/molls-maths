/* ==========================================================================
   A LEVEL MATHEMATICS: Years 12 and 13
   --------------------------------------------------------------------------
   Follows the DfE A Level Mathematics subject content, which AQA, Pearson
   Edexcel and OCR all teach. There are three strands:
     • pure        Pure mathematics (most of the course)
     • alevel-statistics  Statistics (its own strand, separate from GCSE statistics)
     • mechanics   Mechanics
   Year 12 covers the AS content; Year 13 completes the full A level.

   Exam boards split the content across their papers differently, but the
   content itself is the same for all three, so it is organised by topic
   here rather than by paper.

   Like the rest of the course, every unit lists the units it builds on
   (prerequisites), including the GCSE units from Years 10 and 11.

   STATUS: the structure is final. Lessons are "planned" until their
   teaching content is written in src/data/lessons/, exactly like the
   earlier years were.
   ========================================================================== */
import { unit } from "./makeUnit.js";

/* =============================== YEAR 12 =============================== */
export const YEAR_12 = [
  /* ---------------- Pure ---------------- */
  unit("y12-u1", 12, "pure", "Algebraic expressions",
    "The algebra every A level topic relies on: index laws, expanding and factorising, and working with surds, done fluently and accurately.",
    ["I can use the laws of indices, including negative and fractional powers", "I can expand brackets and factorise expressions, including cubics", "I can simplify surds and rationalise denominators"],
    ["y10-u1", "y10-u3"],
    ["Index laws", "Expanding brackets", "Factorising", "Negative and fractional indices", "Surds", "Rationalising denominators"]),

  unit("y12-u2", 12, "pure", "Quadratics",
    "Quadratic equations, functions and graphs, the discriminant, and using quadratics to model real situations.",
    ["I can solve quadratic equations by factorising, completing the square and the formula", "I can sketch quadratic graphs and find their key features", "I can use the discriminant to decide how many roots there are", "I can model situations with quadratics"],
    ["y10-u4"],
    ["Solving quadratic equations", "Completing the square", "Functions", "Quadratic graphs", "The discriminant", "Modelling with quadratics"]),

  unit("y12-u3", 12, "pure", "Equations and inequalities",
    "Solving linear and quadratic simultaneous equations, linear and quadratic inequalities, and representing them as regions on graphs.",
    ["I can solve simultaneous equations where one is quadratic", "I can interpret solutions as points of intersection", "I can solve linear and quadratic inequalities, including in set notation", "I can represent inequalities as regions"],
    ["y10-u5", "y11-u5", "y12-u2"],
    ["Linear simultaneous equations", "Quadratic simultaneous equations", "Simultaneous equations on graphs", "Linear inequalities", "Quadratic inequalities", "Inequalities on graphs"]),

  unit("y12-u4", 12, "pure", "Graphs and transformations",
    "Sketching cubic, quartic and reciprocal graphs, finding where curves meet, and transforming graphs with translations and stretches.",
    ["I can sketch cubic, quartic and reciprocal graphs", "I can use intersections of graphs to solve equations", "I can sketch y = f(x + a), y = f(x) + a, y = f(ax) and y = af(x)"],
    ["y11-u2", "y12-u2"],
    ["Cubic graphs", "Quartic graphs", "Reciprocal graphs", "Points of intersection", "Translating graphs", "Stretching graphs", "Transforming functions"]),

  unit("y12-u5", 12, "pure", "Straight lines and circles",
    "Coordinate geometry: equations of lines, parallel and perpendicular lines, and the equation of a circle with its tangents and chords.",
    ["I can find the equation of a line in different forms", "I can use gradients of parallel and perpendicular lines", "I can find the centre and radius of a circle from its equation", "I can solve problems with lines, circles, tangents and chords"],
    ["y10-u6", "y11-u5"],
    ["Equations of straight lines", "Parallel and perpendicular lines", "Lengths and areas", "Modelling with straight lines", "The equation of a circle", "Lines meeting circles", "Tangents and chords", "Circles and triangles"]),

  unit("y12-u6", 12, "pure", "Algebraic methods and proof",
    "Simplifying algebraic fractions, dividing polynomials, the factor theorem, and the first methods of mathematical proof.",
    ["I can simplify algebraic fractions", "I can divide a polynomial by a linear expression", "I can use the factor theorem to factorise cubics", "I can prove results by deduction and by exhaustion, and disprove with a counter-example"],
    ["y10-u3", "y12-u1"],
    ["Algebraic fractions", "Dividing polynomials", "The factor theorem", "Proof by deduction", "Proof by exhaustion", "Disproof by counter-example"]),

  unit("y12-u7", 12, "pure", "The binomial expansion",
    "Expanding (a + b)ⁿ for positive whole-number n using Pascal's triangle and combinations, and using expansions to estimate.",
    ["I can use Pascal's triangle and nCr to find coefficients", "I can expand (a + bx)ⁿ for positive integer n", "I can find a particular term or coefficient", "I can use an expansion to estimate a value"],
    ["y10-u3"],
    ["Pascal's triangle", "Factorial notation and combinations", "The binomial expansion", "Finding coefficients", "Binomial estimation"]),

  unit("y12-u8", 12, "pure", "Trigonometry",
    "The sine and cosine rules, graphs of the trigonometric functions for any angle, key identities, and solving trigonometric equations.",
    ["I can use the sine rule, cosine rule and ½ab sin C", "I can sketch sine, cosine and tangent graphs and use their symmetries", "I can use tan θ = sin θ / cos θ and sin²θ + cos²θ = 1", "I can solve trigonometric equations in a given interval"],
    ["y10-u9"],
    ["The cosine rule", "The sine rule", "Areas of triangles", "Solving triangle problems", "Graphs of sine, cosine and tangent", "Angles in all four quadrants", "Exact values", "Trigonometric identities", "Simple trigonometric equations", "Harder trigonometric equations"]),

  unit("y12-u9", 12, "pure", "Vectors",
    "Vectors in two dimensions: magnitude and direction, position vectors, and using vectors to solve geometric problems and model motion.",
    ["I can find the magnitude and direction of a vector", "I can use position vectors and the distance between points", "I can solve geometric problems with vectors", "I can use vectors in simple models"],
    ["y11-u1"],
    ["Vectors", "Representing vectors", "Magnitude and direction", "Position vectors", "Solving geometric problems", "Modelling with vectors"]),

  unit("y12-u10", 12, "pure", "Differentiation",
    "The gradient of a curve, differentiating from first principles and using the rules, tangents and normals, and finding stationary points.",
    ["I can differentiate from first principles", "I can differentiate xⁿ and sums of terms", "I can find equations of tangents and normals", "I can find and classify stationary points", "I can solve optimisation problems"],
    ["y11-u4", "y12-u1"],
    ["Gradients of curves", "Differentiating from first principles", "Differentiating xⁿ", "Differentiating sums of terms", "Tangents and normals", "Increasing and decreasing functions", "Second derivatives", "Stationary points", "Sketching gradient functions", "Optimisation problems"]),

  unit("y12-u11", 12, "pure", "Integration",
    "Integration as the reverse of differentiation, finding a function from its gradient, and definite integrals to find areas.",
    ["I can integrate xⁿ (n ≠ −1) and sums of terms", "I can find a function given its derivative and a point", "I can evaluate definite integrals", "I can find areas under curves and between a curve and a line"],
    ["y12-u10"],
    ["Integrating xⁿ", "Indefinite integrals", "Finding functions", "Definite integrals", "Areas under curves", "Areas below the x-axis", "Areas between curves and lines"]),

  unit("y12-u12", 12, "pure", "Exponentials and logarithms",
    "Exponential functions and eˣ, logarithms and their laws, solving equations, and using logarithms to model and analyse data.",
    ["I can sketch and interpret exponential graphs, including y = eˣ", "I can use the laws of logarithms", "I can solve equations of the form aˣ = b", "I can use logarithms to turn exponential relationships into straight lines"],
    ["y9-u2", "y11-u2"],
    ["Exponential functions", "The function eˣ", "Exponential modelling", "Logarithms", "Laws of logarithms", "Solving equations using logarithms", "Natural logarithms", "Logarithms and non-linear data"]),

  /* ---------------- Statistics ---------------- */
  unit("y12-u13", 12, "alevel-statistics", "Data collection",
    "Populations and samples, sampling methods and their strengths, types of data, and getting to know your exam board's large data set.",
    ["I can describe and compare sampling methods", "I can classify data and explain why it matters", "I can explore and describe the large data set"],
    ["y9-u12"],
    ["Populations and samples", "Sampling methods", "Non-random sampling", "Types of data", "The large data set"]),

  unit("y12-u14", 12, "alevel-statistics", "Measures of location and spread",
    "Averages and measures of spread, including variance and standard deviation, for raw and grouped data, and coding.",
    ["I can calculate the mean, median and mode, including from grouped data", "I can find quartiles, percentiles and interquartile range", "I can calculate variance and standard deviation", "I can use coding to simplify calculations"],
    ["y10-u11"],
    ["Measures of central tendency", "Other measures of location", "Measures of spread", "Variance and standard deviation", "Coding"]),

  unit("y12-u15", 12, "alevel-statistics", "Representations of data",
    "Spotting outliers and cleaning data, and drawing and interpreting box plots, cumulative frequency diagrams and histograms.",
    ["I can identify outliers and clean data", "I can draw and interpret box plots, cumulative frequency graphs and histograms", "I can compare distributions"],
    ["y10-u11", "y12-u14"],
    ["Outliers", "Box plots", "Cumulative frequency", "Histograms", "Comparing data"]),

  unit("y12-u16", 12, "alevel-statistics", "Correlation",
    "Describing correlation in bivariate data and using regression lines to make and judge predictions.",
    ["I can describe correlation and explain that it does not show cause", "I can interpret a regression line in context", "I can tell interpolation from extrapolation"],
    ["y8-u11"],
    ["Correlation", "Linear regression"]),

  unit("y12-u17", 12, "alevel-statistics", "Probability",
    "Calculating probabilities with Venn diagrams and tree diagrams, and deciding whether events are mutually exclusive or independent.",
    ["I can use Venn and tree diagrams to find probabilities", "I can tell whether events are mutually exclusive", "I can test whether events are independent"],
    ["y10-u12"],
    ["Calculating probabilities", "Venn diagrams", "Mutually exclusive and independent events", "Tree diagrams"]),

  unit("y12-u18", 12, "alevel-statistics", "Statistical distributions",
    "Discrete probability distributions and the binomial distribution, including cumulative probabilities.",
    ["I can use a discrete probability distribution", "I can decide when the binomial distribution is a suitable model", "I can calculate binomial probabilities, including cumulative ones"],
    ["y12-u7", "y12-u17"],
    ["Probability distributions", "The binomial distribution", "Cumulative probabilities"]),

  unit("y12-u19", 12, "alevel-statistics", "Hypothesis testing",
    "Using the binomial distribution to test a claim: hypotheses, significance levels, critical regions and conclusions in context.",
    ["I can write null and alternative hypotheses", "I can find critical values and critical regions", "I can carry out one-tailed and two-tailed tests and conclude in context"],
    ["y12-u18"],
    ["Hypothesis testing", "Finding critical values", "One-tailed tests", "Two-tailed tests"]),

  /* ---------------- Mechanics ---------------- */
  unit("y12-u20", 12, "mechanics", "Modelling in mechanics",
    "How mechanics models the real world: modelling assumptions, SI units, and working with vector quantities.",
    ["I can explain common modelling assumptions and their effects", "I can use SI units and convert between units", "I can tell scalar from vector quantities"],
    ["y11-u1"],
    ["Constructing a model", "Modelling assumptions", "Quantities and units", "Working with vectors"]),

  unit("y12-u21", 12, "mechanics", "Constant acceleration",
    "Motion graphs and the constant acceleration (suvat) formulae, including objects moving vertically under gravity.",
    ["I can interpret displacement–time and velocity–time graphs", "I can derive and use the constant acceleration formulae", "I can model vertical motion under gravity"],
    ["y11-u4", "y12-u20"],
    ["Displacement–time graphs", "Velocity–time graphs", "Constant acceleration formulae", "Using the formulae", "Vertical motion under gravity"]),

  unit("y12-u22", 12, "mechanics", "Forces and motion",
    "Newton's laws of motion: force diagrams, resultant forces, and connected particles including pulleys.",
    ["I can draw force diagrams and find resultant forces", "I can use F = ma, including in two dimensions", "I can solve problems with connected particles and pulleys"],
    ["y12-u21"],
    ["Force diagrams", "Forces as vectors", "Forces and acceleration", "Motion in two dimensions", "Connected particles", "Pulleys"]),

  unit("y12-u23", 12, "mechanics", "Variable acceleration",
    "Using calculus when acceleration changes over time: differentiating and integrating to move between displacement, velocity and acceleration.",
    ["I can differentiate to find velocity and acceleration", "I can integrate to find velocity and displacement", "I can solve maximum and minimum problems in motion"],
    ["y12-u10", "y12-u11", "y12-u21"],
    ["Functions of time", "Using differentiation", "Maxima and minima problems", "Using integration", "Deriving the constant acceleration formulae"]),
];

/* =============================== YEAR 13 =============================== */
export const YEAR_13 = [
  /* ---------------- Pure ---------------- */
  unit("y13-u1", 13, "pure", "Proof and algebraic methods",
    "Proof by contradiction, partial fractions, and algebraic division, ready for calculus and series later in the year.",
    ["I can prove results by contradiction", "I can split fractions into partial fractions, including repeated factors", "I can divide polynomials to deal with improper fractions"],
    ["y12-u6"],
    ["Proof by contradiction", "Algebraic fractions", "Partial fractions", "Repeated factors", "Algebraic division"]),

  unit("y13-u2", 13, "pure", "Functions and graphs",
    "The modulus function, domain and range, composite and inverse functions, and combining transformations of graphs.",
    ["I can sketch modulus graphs and solve modulus equations and inequalities", "I can find the domain and range of a function", "I can find composite and inverse functions", "I can combine several transformations of a graph"],
    ["y11-u2", "y12-u4"],
    ["The modulus function", "Functions and mappings", "Composite functions", "Inverse functions", "y = |f(x)| and y = f(|x|)", "Combining transformations", "Solving modulus problems"]),

  unit("y13-u3", 13, "pure", "Sequences and series",
    "Arithmetic and geometric sequences and series, sums to infinity, sigma notation and recurrence relations.",
    ["I can find terms and sums of arithmetic and geometric series", "I can find a sum to infinity and know when it exists", "I can use sigma notation", "I can work with recurrence relations and increasing, decreasing and periodic sequences"],
    ["y9-u7"],
    ["Arithmetic sequences", "Arithmetic series", "Geometric sequences", "Geometric series", "Sum to infinity", "Sigma notation", "Recurrence relations", "Modelling with series"]),

  unit("y13-u4", 13, "pure", "Binomial expansion for any power",
    "Extending the binomial expansion to negative and fractional powers, when it is valid, and using partial fractions.",
    ["I can expand (1 + x)ⁿ for any rational n", "I can state when an expansion is valid", "I can expand (a + bx)ⁿ", "I can use partial fractions before expanding"],
    ["y12-u7", "y13-u1"],
    ["Expanding (1 + x)ⁿ", "Expanding (a + bx)ⁿ", "Using partial fractions"]),

  unit("y13-u5", 13, "pure", "Radians",
    "Measuring angles in radians, arc length and sector area, and small-angle approximations.",
    ["I can convert between degrees and radians", "I can find arc lengths and the areas of sectors and segments", "I can solve trigonometric equations in radians", "I can use small-angle approximations"],
    ["y12-u8", "y10-u10"],
    ["Radian measure", "Arc length", "Areas of sectors and segments", "Solving trigonometric equations", "Small angle approximations"]),

  unit("y13-u6", 13, "pure", "Trigonometric functions",
    "Secant, cosecant and cotangent, their graphs and identities, and the inverse trigonometric functions.",
    ["I can sketch and use sec x, cosec x and cot x", "I can use 1 + tan²x = sec²x and 1 + cot²x = cosec²x", "I can use arcsin, arccos and arctan and their graphs"],
    ["y12-u8", "y13-u5"],
    ["Secant, cosecant and cotangent", "Graphs of sec x, cosec x and cot x", "Using sec x, cosec x and cot x", "Trigonometric identities", "Inverse trigonometric functions"]),

  unit("y13-u7", 13, "pure", "Trigonometry and modelling",
    "Addition and double-angle formulae, writing a cos x + b sin x as one function, proving identities, and modelling with trigonometry.",
    ["I can use the addition and double-angle formulae", "I can write a cos x + b sin x as R cos(x ± α) or R sin(x ± α)", "I can prove trigonometric identities", "I can solve equations and model periodic situations"],
    ["y13-u6"],
    ["Addition formulae", "Using the addition formulae", "Double-angle formulae", "Solving trigonometric equations", "Simplifying a cos x ± b sin x", "Proving trigonometric identities", "Modelling with trigonometric functions"]),

  unit("y13-u8", 13, "pure", "Parametric equations",
    "Describing curves with a parameter, converting to Cartesian form, sketching, and modelling paths with parametric equations.",
    ["I can convert between parametric and Cartesian equations", "I can sketch parametric curves", "I can find where a parametric curve meets a line or the axes", "I can model motion with parametric equations"],
    ["y13-u2", "y13-u6"],
    ["Parametric equations", "Using trigonometric identities", "Curve sketching", "Points of intersection", "Modelling with parametric equations"]),

  unit("y13-u9", 13, "pure", "Differentiation",
    "Differentiating trigonometric, exponential and logarithmic functions, the chain, product and quotient rules, and implicit and parametric differentiation.",
    ["I can differentiate trigonometric, exponential and logarithmic functions", "I can use the chain, product and quotient rules", "I can differentiate parametric and implicit equations", "I can use second derivatives to describe concavity and points of inflection", "I can form and use rates of change"],
    ["y12-u10", "y12-u12", "y13-u6"],
    ["Differentiating sin x and cos x", "Exponentials and logarithms", "The chain rule", "The product rule", "The quotient rule", "Differentiating trigonometric functions", "Parametric differentiation", "Implicit differentiation", "Using second derivatives", "Rates of change"]),

  unit("y13-u10", 13, "pure", "Numerical methods",
    "Finding roots that can't be found exactly: change of sign, iteration, and the Newton–Raphson method, and when each one fails.",
    ["I can locate roots by a change of sign", "I can use iteration and draw cobweb and staircase diagrams", "I can use the Newton–Raphson method", "I can explain when a numerical method fails"],
    ["y11-u2", "y13-u9"],
    ["Locating roots", "Iteration", "The Newton–Raphson method", "Applications to modelling"]),

  unit("y13-u11", 13, "pure", "Integration",
    "Integrating a wide range of functions, by substitution, by parts and with partial fractions, the trapezium rule, and solving differential equations.",
    ["I can integrate standard functions, including trigonometric and exponential ones", "I can integrate by substitution and by parts", "I can use partial fractions to integrate", "I can use the trapezium rule", "I can solve and interpret first-order differential equations"],
    ["y12-u11", "y13-u9", "y13-u1"],
    ["Integrating standard functions", "Integrating f(ax + b)", "Using trigonometric identities", "Reverse chain rule", "Integration by substitution", "Integration by parts", "Partial fractions", "Finding areas", "The trapezium rule", "Solving differential equations", "Modelling with differential equations", "Integration as the limit of a sum"]),

  unit("y13-u12", 13, "pure", "Vectors in three dimensions",
    "Extending vectors to three dimensions, finding distances and solving geometric problems in 3D.",
    ["I can use 3D coordinates and vectors", "I can find the magnitude of a 3D vector and the distance between points", "I can solve geometric problems in 3D"],
    ["y12-u9"],
    ["3D coordinates", "Vectors in 3D", "Solving geometric problems", "Application to mechanics"]),

  /* ---------------- Statistics ---------------- */
  unit("y13-u13", 13, "alevel-statistics", "Regression, correlation and hypothesis testing",
    "Exponential models using logarithms, the product moment correlation coefficient, and testing whether correlation is significant.",
    ["I can fit exponential models using logarithms", "I can interpret the product moment correlation coefficient", "I can test for zero correlation"],
    ["y12-u12", "y12-u16", "y12-u19"],
    ["Exponential models", "Measuring correlation", "Hypothesis testing for zero correlation"]),

  unit("y13-u14", 13, "alevel-statistics", "Conditional probability",
    "Set notation, conditional probability from Venn diagrams, tree diagrams and two-way tables, and the probability formulae.",
    ["I can use set notation for events", "I can find conditional probabilities", "I can use P(A ∪ B) and P(A ∩ B) formulae", "I can test for independence"],
    ["y12-u17"],
    ["Set notation", "Conditional probability", "Conditional probabilities in Venn diagrams", "Probability formulae", "Tree diagrams"]),

  unit("y13-u15", 13, "alevel-statistics", "The normal distribution",
    "The normal distribution, finding probabilities and unknown values, approximating the binomial, and hypothesis tests for a mean.",
    ["I can find normal probabilities and use the inverse normal", "I can use the standard normal distribution to find μ and σ", "I can approximate a binomial with a normal distribution", "I can test a hypothesis about a population mean"],
    ["y12-u18", "y12-u19"],
    ["The normal distribution", "Finding normal probabilities", "The inverse normal distribution", "The standard normal distribution", "Finding μ and σ", "Approximating a binomial distribution", "Hypothesis testing with the normal distribution"]),

  /* ---------------- Mechanics ---------------- */
  unit("y13-u16", 13, "mechanics", "Moments",
    "The turning effect of forces: moments, equilibrium of rigid bodies, centres of mass and tilting.",
    ["I can calculate moments and resultant moments", "I can solve problems with rigid bodies in equilibrium", "I can find where a rod is about to tilt"],
    ["y12-u22"],
    ["Moments", "Resultant moments", "Equilibrium", "Centres of mass", "Tilting"]),

  unit("y13-u17", 13, "mechanics", "Forces and friction",
    "Resolving forces in two directions, objects on inclined planes, and modelling friction.",
    ["I can resolve forces into components", "I can solve problems on inclined planes", "I can use F ≤ μR and limiting friction"],
    ["y12-u22", "y12-u8"],
    ["Resolving forces", "Inclined planes", "Friction"]),

  unit("y13-u18", 13, "mechanics", "Projectiles",
    "Motion under gravity in two dimensions: horizontal and angled projection, and deriving the projectile formulae.",
    ["I can split projectile motion into horizontal and vertical parts", "I can find the time of flight, range and greatest height", "I can derive the trajectory equation"],
    ["y12-u21", "y13-u17"],
    ["Horizontal projection", "Horizontal and vertical components", "Projection at any angle", "Projectile motion formulae"]),

  unit("y13-u19", 13, "mechanics", "Applications of forces",
    "Bringing forces together: particles and rigid bodies in equilibrium, friction in static problems, and dynamics on slopes.",
    ["I can solve statics problems with particles and rigid bodies", "I can solve dynamics problems on inclined planes", "I can solve connected particle problems with friction"],
    ["y13-u16", "y13-u17"],
    ["Static particles", "Modelling with statics", "Friction and static particles", "Static rigid bodies", "Dynamics and inclined planes", "Connected particles"]),

  unit("y13-u20", 13, "mechanics", "Further kinematics",
    "Motion in two dimensions with vectors and calculus: variable acceleration, and differentiating and integrating vectors.",
    ["I can use vectors for constant acceleration in two dimensions", "I can differentiate and integrate vectors with respect to time", "I can solve variable acceleration problems in two dimensions"],
    ["y12-u23", "y13-u18"],
    ["Vectors in kinematics", "Vector methods with projectiles", "Variable acceleration in one dimension", "Differentiating vectors", "Integrating vectors"]),

  /* ---------------- Exam preparation ---------------- */
  unit("y13-u21", 13, "pure", "Exam preparation",
    "Exam technique and mixed practice across pure, statistics and mechanics, including problem solving, proof and the large data set.",
    ["I can choose methods for unfamiliar, multi-step problems", "I can write clear proofs and full reasoning", "I can use my calculator and the formula booklet efficiently", "I can manage time across the papers"],
    [],
    ["Problem solving and modelling", "Proof and reasoning", "Calculator and formula booklet skills", "Pure mixed practice", "Statistics and mechanics mixed practice"]),
];
