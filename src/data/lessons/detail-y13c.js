/* ==========================================================================
   Going deeper: Year 13 Statistics and Mechanics (Units 13–21)
   Extra teaching, one more worked example and one more common mistake for
   each lesson, added after the short teaching in y13-c.js by addDetail().
   Mechanics uses g = 9.8 m s⁻².
   ========================================================================== */

export const Y13C_DETAIL = {
  /* ================== Unit 13: Bivariate data ================== */
  "y13-u13-l1": {
    teach: [
      ["Power and exponential models", ["For y = ax^n, take logs: log y = log a + n log x. Plotting log y against log x gives a straight line with gradient n and intercept log a.", "For y = ab^x, plot log y against x instead."], "Choose the axes that make a line."],
      ["Converting back", ["Find the line's gradient and intercept from the data, then convert back. If the intercept is log a, then a = 10^(intercept) when logs are base 10."], "Undo the logs at the end."],
    ],
    ex: [["Points (1, 3) and (4, 48) fit y = ax^n. Find n and a.", ["3 = a × 1^n, so a = 3", "48 = 3 × 4^n, so 4^n = 16"], "n = 2, a = 3, so y = 3x²"]],
    mis: [["Taking logs of only one side of the model.", "Logs must be taken of the whole equation, including a.", "Write log y = log a + n log x."]],
  },
  "y13-u13-l2": {
    teach: [
      ["The formula", ["r = Sxy / √(Sxx Syy), with Sxy = Σxy − nx̄ȳ and Sxx = Σx² − nx̄², Syy = Σy² − nȳ². Values are between −1 and 1.", "r near 1 means a strong positive linear relationship; near −1 means strong negative; near 0 means little linear relationship."], "r is always between −1 and 1."],
      ["Interpreting", ["Describe the strength and direction, and say whether the relationship is linear. Don't claim cause from correlation."], "Describe, don't assume cause."],
    ],
    ex: [["A sample of data gives r = −0.85. Describe the correlation.", ["Close to −1, so strong", "Negative sign"], "Strong negative linear correlation"]],
    mis: [["Thinking r is the gradient of the regression line.", "r measures how closely the points lie on a line, not its slope.", "Use the regression equation for the slope."]],
  },
  "y13-u13-l3": {
    teach: [
      ["Setting up", ["H₀: ρ = 0 (no correlation in the population). H₁: ρ ≠ 0 for a two-tailed test, or ρ > 0 or ρ < 0 for one-tailed.", "Use the table of critical values for sample size n and significance level."], "H₀ is no correlation."],
      ["Conclusion", ["If |r| is bigger than the critical value, reject H₀. Otherwise there is not enough evidence of correlation."], "Compare |r| with the critical value."],
    ],
    ex: [["n = 10, two-tailed 5% critical value 0.632. Sample r = 0.70. Conclude.", ["|0.70| > 0.632", "Reject H₀"], "There is evidence of correlation at the 5% level"]],
    mis: [["Comparing r with 0 instead of the critical value.", "Any small r is above 0, so this is not a test.", "Use the table value."]],
  },

  /* ================== Unit 14: Conditional probability ================== */
  "y13-u14-l1": {
    teach: [
      ["Notation", ["A ∪ B means A or B (or both). A ∩ B means A and B. A′ means not A. ξ is the universal set, the whole sample space.", "For ξ = {1, …, 10}, A = {even} and B = {> 5}: A ∩ B = {6, 8, 10}."], "∪ is or; ∩ is and."],
      ["Shading", ["Shade the region of a Venn diagram to show a set. A ∪ B is everything in either circle; A′ ∩ B is the part of B outside A."], "Shade carefully to match the notation."],
    ],
    ex: [["Using the same sets, list A ∪ B.", ["Even numbers, or greater than 5", "1–10 check"], "{2, 4, 6, 7, 8, 9, 10}"]],
    mis: [["Confusing ∪ and ∩.", "∪ combines, ∩ keeps only what is in both.", "Ask: 'or' for ∪, 'and' for ∩."]],
  },
  "y13-u14-l2": {
    teach: [
      ["The formula", ["P(A | B) = P(A ∩ B)/P(B). Read it as the probability of A, given that B has happened.", "If P(A ∩ B) = 0.12 and P(B) = 0.4, then P(A | B) = 0.3."], "Divide by the probability of the condition."],
      ["Restricting the sample space", ["Given B, only outcomes in B count. The probability is the number of outcomes in A ∩ B divided by the number in B."], "Only the condition's outcomes count."],
    ],
    ex: [["P(A ∩ B) = 0.2 and P(B) = 0.5. Find P(A | B).", ["0.2/0.5"], "0.4"]],
    mis: [["Dividing by P(A) rather than P(B).", "The condition is the denominator.", "Write the condition under the fraction."]],
  },
  "y13-u14-l3": {
    teach: [
      ["The reduced diagram", ["Once the condition is given, the Venn diagram shrinks to the set for that condition. Only the parts inside it still matter.", "Of 20 students, 12 take Maths and 5 take both Maths and Physics. P(Physics | Maths) = 5/12."], "The condition is the new whole."],
      ["Checking", ["The probabilities in the reduced diagram must add to 1."], "Check the total is 1."],
    ],
    ex: [["Using the same data, find P(Maths | Physics), if 8 take Physics.", ["Physics = 8, both = 5", "5/8"], "5/8"]],
    mis: [["Using the total 20 instead of the condition's count.", "The condition reduces the sample space.", "Use the count for the condition."]],
  },
  "y13-u14-l4": {
    teach: [
      ["Addition rule", ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Subtract the overlap once.", "This is the same rule as before, now used with conditional probabilities."], "Subtract the overlap."],
      ["Multiplication rule", ["P(A ∩ B) = P(A) × P(B | A) = P(B) × P(A | B). Use it when the probability of the second event depends on the first."], "Multiply the first by the conditional."],
    ],
    ex: [["P(A) = 0.6, P(B | A) = 0.5. Find P(A ∩ B).", ["0.6 × 0.5"], "0.3"]],
    mis: [["Multiplying P(A) by P(B) when the events are not independent.", "Only independent events use P(A) × P(B).", "Use P(B | A) when the events depend on each other."]],
  },
  "y13-u14-l5": {
    teach: [
      ["Reverse conditional", ["On a tree diagram, the second branches are the conditional probabilities. To find P(A | B) from the tree, divide the branch product for A and B by the total probability of B.", "The total probability of B adds all the paths that lead to B."], "Divide by the total for B."],
      ["Example", ["A disease affects 1% of people (P(D) = 0.01). A test is positive for 90% of those with the disease and 5% of those without. P(+) = 0.009 + 0.0495 = 0.0585, so P(D | +) = 0.009/0.0585 ≈ 0.154."], "Find P(+) first, then divide."],
    ],
    ex: [["Using the same test, P(D | +)?", ["0.009/0.0585"], "≈ 0.154, or 15.4%"]],
    mis: [["Using P(+ | D) as the answer to P(D | +).", "The two are different, so the reverse needs the total probability.", "Write the condition clearly before dividing."]],
  },

  /* ================== Unit 15: Normal distribution ================== */
  "y13-u15-l1": {
    teach: [
      ["Shape", ["The normal distribution is symmetric about its mean μ, and its spread is set by σ. About 68% of values lie within 1 σ of μ, 95% within 2σ, and 99.7% within 3σ.", "Notation: X ~ N(μ, σ²)."], "68–95–99.7 rule."],
      ["Symmetry", ["Because the curve is symmetric, P(X < μ) = 0.5."], "The mean splits the distribution in half."],
    ],
    ex: [["X ~ N(50, 5²). Find P(X < 50).", ["μ = 50 is the centre"], "0.5"]],
    mis: [["Using σ as the variance.", "N(μ, σ²) uses σ², so σ is the standard deviation.", "Take the square root of variance first."]],
  },
  "y13-u15-l2": {
    teach: [
      ["Using normalcdf", ["Use the calculator's normal CD function with lower limit, upper limit, mean and standard deviation. For N(50, 5²), P(X < 60) = P(Z < 2) ≈ 0.9772.", "For a range, use both limits: P(45 < X < 55) ≈ 0.6827."], "Enter the limits and the mean and standard deviation."],
      ["Check", ["A probability must be between 0 and 1, and P(X < μ) = 0.5."], "Sense-check the result."],
    ],
    ex: [["X ~ N(50, 5²). Find P(X > 55).", ["1 − P(X < 55)", "normalcdf(55, ∞, 50, 5)"], "≈ 0.1587"]],
    mis: [["Using the wrong standard deviation, such as the variance, in the calculator.", "The calculator needs σ, not σ².", "Use the square root of the variance."]],
  },
  "y13-u15-l3": {
    teach: [
      ["Finding a value", ["Given a probability, find the value. For a left tail, P(X < x) = p, so x = μ + zσ where z = invNorm(p).", "For N(50, 5²) with P(X < x) = 0.9: z = 1.2816, so x = 50 + 6.41 = 56.4."], "Use invNorm for the z value."],
      ["Right tail", ["For P(X > x) = p, use 1 − p on the left, or the value with the opposite sign of z."], "Convert to a left tail probability."],
    ],
    ex: [["X ~ N(50, 5²). Find x such that P(X < x) = 0.95.", ["z = invNorm(0.95) = 1.645", "x = 50 + 1.645 × 5"], "x ≈ 58.2"]],
    mis: [["Using the probability as the value.", "invNorm gives z, not x, so convert back.", "Write x = μ + zσ."]],
  },
  "y13-u15-l4": {
    teach: [
      ["Standardising", ["Z = (X − μ)/σ turns any normal distribution into Z ~ N(0, 1). Use it to compare values or to read probabilities from tables.", "For X ~ N(50, 25) and P(X > 55): z = (55 − 50)/5 = 1, so P(Z > 1) = 0.1587."], "Standardise, then look up."],
      ["Comparing", ["Standardised values show how many standard deviations a value is from the mean, which is useful for comparing data from different distributions."], "z tells how far from the mean."],
    ],
    ex: [["X ~ N(50, 25). Find P(X < 45).", ["z = (45 − 50)/5 = −1", "P(Z < −1)"], "0.1587"]],
    mis: [["Dividing by the variance instead of the standard deviation.", "Z = (X − μ)/σ uses σ, not σ².", "Take the square root first."]],
  },
  "y13-u15-l5": {
    teach: [
      ["Finding μ or σ", ["If you know two probabilities, you can find both unknowns. Write two equations using z-values, then solve them.", "Given one probability, use the z value from invNorm and the standardising formula to find the missing parameter."], "Write one equation per probability."],
      ["Example", ["If P(X > 70) = 0.2 and σ = 10: P(X < 70) = 0.8, z = 0.8416, so 70 = μ + 8.416 and μ = 61.6."], "Use invNorm, then solve for μ."],
    ],
    ex: [["X ~ N(μ, 10²) with P(X < 60) = 0.9. Find μ.", ["z = invNorm(0.9) = 1.2816", "60 = μ + 1.2816 × 10"], "μ ≈ 47.2"]],
    mis: [["Using the wrong sign for z when the probability is in the left tail.", "A probability below 0.5 gives a negative z.", "Check the sign of z against the probability."]],
  },
  "y13-u15-l6": {
    teach: [
      ["When it works", ["A binomial B(n, p) can be approximated by N(np, np(1 − p)) when n is large and p is not too close to 0 or 1. A common check is np > 5 and n(1 − p) > 5.", "For B(100, 0.5), the mean is 50 and the variance is 25, so use N(50, 25)."], "Check np and n(1 − p)."],
      ["Continuity correction", ["Since a discrete value is replaced by a continuous one, P(X ≤ 55) becomes P(Y < 55.5). For B(100, 0.5): P(Z < 1.1) = 0.8643."], "Add or subtract 0.5 for the boundary."],
    ],
    ex: [["X ~ B(100, 0.5). Estimate P(X ≤ 55) using a normal approximation.", ["Y ~ N(50, 25)", "P(Y < 55.5) = P(Z < 1.1)"], "≈ 0.864"]],
    mis: [["Forgetting the continuity correction.", "Without it the approximation is noticeably less accurate.", "Adjust the boundary by 0.5."]],
  },
  "y13-u15-l7": {
    teach: [
      ["The sample mean", ["If X ~ N(μ, σ²), the sample mean of n values has X̄ ~ N(μ, σ²/n). Test the mean using this distribution, not the single-value one.", "Standardise with Z = (X̄ − μ)/(σ/√n)."], "Use σ/√n for the sample mean."],
      ["The test", ["Set up H₀ and H₁, find the critical value of Z, and compare the test statistic. Conclude in context."], "Compare the test statistic with the critical value."],
    ],
    ex: [["H₀: μ = 50, σ = 10, n = 25. Sample mean 54. Test H₁: μ > 50 at 5%.", ["z = (54 − 50)/(10/5) = 2", "Critical value 1.645"], "2 > 1.645, so reject H₀"]],
    mis: [["Using σ instead of σ/√n for the sample mean.", "The spread of a sample mean is smaller.", "Divide σ by the square root of n."]],
  },

  /* ================== Unit 16: Moments ================== */
  "y13-u16-l1": {
    teach: [
      ["The moment", ["Moment = force × perpendicular distance from the point. It measures the turning effect.", "A force of 20 N at 0.5 m from a pivot has a moment of 10 N m."], "Use the perpendicular distance."],
      ["Direction", ["Take anticlockwise as positive and clockwise as negative (or the other way round), and state which you use."], "State your sign convention."],
    ],
    ex: [["A force of 12 N acts at 3 m from a point, perpendicular to the rod. Find the moment.", ["12 × 3"], "36 N m"]],
    mis: [["Using the distance along the rod instead of the perpendicular distance.", "Only the perpendicular component turns the object.", "Draw the perpendicular distance."]],
  },
  "y13-u16-l2": {
    teach: [
      ["Adding moments", ["Add the moments of all forces about the same point, taking account of their direction.", "Forces of 5 N clockwise at 1 m and 3 N anticlockwise at 4 m: the net moment is 12 − 5 = 7 N m anticlockwise."], "Same point, signs for direction."],
      ["Choosing the point", ["Choose the point where the unknown force acts, so its moment is zero. This often makes the calculation simpler."], "Take moments about an unknown force."],
    ],
    ex: [["A rod has forces 4 N at 2 m (clockwise) and 6 N at 5 m (anticlockwise). Find the resultant moment (anticlockwise positive).", ["30 − 8"], "22 N m anticlockwise"]],
    mis: [["Adding the moments without their directions.", "A clockwise moment cancels an anticlockwise one.", "Assign signs before adding."]],
  },
  "y13-u16-l3": {
    teach: [
      ["Two conditions", ["For equilibrium, the resultant force must be zero in each direction and the resultant moment about any point must be zero.", "For a uniform beam of length 4 m, weight 40 N at the centre, supported at both ends: taking moments about the left end, R₂ × 4 = 40 × 2, so R₂ = 20 N, and R₁ = 20 N."], "Force balance and moment balance."],
      ["Choosing the pivot", ["Take moments about a point where an unknown force acts to remove it from the equation."], "Choose a useful pivot."],
    ],
    ex: [["Using the beam above, check the forces balance.", ["R₁ + R₂ = 40"], "20 + 20 = 40, so yes"]],
    mis: [["Using only the force balance and forgetting moments.", "Both must balance for a rigid body.", "Write one equation for forces and one for moments."]],
  },
  "y13-u16-l4": {
    teach: [
      ["Centre of mass", ["The centre of mass of particles is x̄ = Σmx/Σm. It is the point where the total weight acts.", "For a 2 kg mass at x = 0 and a 3 kg mass at x = 5: x̄ = (0 + 15)/5 = 3."], "Weighted average of positions."],
      ["Using it", ["Use the centre of mass to find where a system balances, or where its weight acts for a moment calculation."], "The total weight acts at the centre of mass."],
    ],
    ex: [["Masses 1 kg at x = 2 and 3 kg at x = 6. Find the centre of mass.", ["(2 + 18)/4"], "x̄ = 5"]],
    mis: [["Using the average of the positions instead of the weighted average.", "The heavier mass pulls the centre towards it.", "Weight each position by its mass."]],
  },
  "y13-u16-l5": {
    teach: [
      ["About to tilt", ["A body on a support tilts when the reaction at one support is about to become zero. Use moments about the other support to find the critical value.", "For a beam with a weight placed on it, find the position where it tips."], "The critical case is when one reaction is zero."],
      ["Example", ["A uniform beam of length 3 m and weight 60 N is pivoted 1 m from its left end. A weight W sits at the left end. For balance with no support on the right, W × 1 = 60 × 0.5, so W = 30 N."], "Moments about the pivot give the limit."],
    ],
    ex: [["Using the example, find W if the beam's weight is 60 N at its centre and the pivot is 1 m from the left end.", ["Beam centre is 0.5 m from the pivot", "W × 1 = 60 × 0.5"], "W = 30 N"]],
    mis: [["Taking moments about the wrong point.", "Choose the pivot where the reaction is zero.", "Identify the point of tilting."]],
  },

  /* ================== Unit 17: Forces and friction on slopes ================== */
  "y13-u17-l1": {
    teach: [
      ["Components", ["A force F at angle θ to the horizontal has horizontal component F cos θ and vertical component F sin θ.", "A force of 10 N at 30° above the horizontal has components 10 cos 30° ≈ 8.66 N and 10 sin 30° = 5 N."], "Use cos for horizontal, sin for vertical."],
      ["Check", ["The components together have the same effect as the original force."], "Check the components give the original."],
    ],
    ex: [["A 20 N force acts at 60° above the horizontal. Find its vertical component.", ["20 sin 60°"], "≈ 17.3 N"]],
    mis: [["Using sin for the horizontal component.", "The horizontal component uses cos when the angle is measured from the horizontal.", "Sketch the triangle first."]],
  },
  "y13-u17-l2": {
    teach: [
      ["Resolving the weight", ["On a slope at angle θ, resolve the weight mg into a component mg sin θ down the slope and mg cos θ into the surface.", "For a 2 kg block on a 30° slope: weight 19.6 N, along the slope 9.8 N, into the slope 16.97 N."], "Parallel and perpendicular to the slope."],
      ["Normal reaction", ["The normal reaction R equals the component of weight into the surface, when no other forces act in that direction."], "R = mg cos θ."],
    ],
    ex: [["A 5 kg block on a 20° slope. Find the normal reaction.", ["mg cos 20° = 49 × cos 20°"], "R ≈ 46.0 N"]],
    mis: [["Using sin for the normal reaction.", "The normal reaction uses cos θ.", "Check: the normal is the perpendicular component."]],
  },
  "y13-u17-l3": {
    teach: [
      ["Friction", ["Friction opposes motion, or the tendency to move. Its maximum value is μR, where μ is the coefficient and R the normal reaction.", "If the actual force is less than μR, the object stays still and friction equals that force."], "Friction is at most μR."],
      ["Limiting friction", ["When the object is about to slide, friction is at its maximum μR."], "At the limit, F = μR."],
    ],
    ex: [["A block rests on a horizontal surface with normal reaction 50 N and μ = 0.4. Applied force 15 N. Find the friction.", ["Maximum friction = 0.4 × 50 = 20 N", "15 N < 20 N, so no sliding"], "Friction = 15 N"]],
    mis: [["Assuming friction is always μR.", "Static friction can be less than the maximum.", "Compare the forces first."]],
  },

  /* ================== Unit 18: Projectiles ================== */
  "y13-u18-l1": {
    teach: [
      ["Separate the directions", ["Horizontal motion has constant velocity (no horizontal force). Vertical motion has constant acceleration −9.8 m s⁻² (taking up as positive).", "Use suvat separately in each direction, linked by time."], "Horizontal: constant speed; vertical: suvat."],
      ["Example", ["A ball is thrown horizontally at 12 m s⁻¹ from 20 m high. It falls for t where 20 = ½ × 9.8 × t², so t ≈ 2.02 s. The horizontal distance is 12 × 2.02 ≈ 24.2 m."], "Use the vertical motion to find the time."],
    ],
    ex: [["Using the example, find the speed when it hits the ground (horizontal and vertical).", ["Horizontal: 12", "Vertical: 9.8 × 2.02 ≈ 19.8"], "Horizontal 12 m s⁻¹, vertical 19.8 m s⁻¹ downwards"]],
    mis: [["Applying gravity to the horizontal motion.", "Gravity acts only vertically, so the horizontal speed is constant.", "Use suvat only in the vertical direction for gravity."]],
  },
  "y13-u18-l2": {
    teach: [
      ["Components of velocity", ["A projectile launched at speed U at angle α has horizontal component U cos α and vertical component U sin α.", "For U = 20 m s⁻¹ at 30°: horizontal 17.3 m s⁻¹, vertical 10 m s⁻¹."], "Split the launch speed into components."],
      ["Using them", ["Use the horizontal component for horizontal distance and the vertical component for height and time."], "Components then suvat."],
    ],
    ex: [["A projectile is launched at 20 m s⁻¹ at 60°. Find the vertical component.", ["20 sin 60°"], "≈ 17.3 m s⁻¹"]],
    mis: [["Using the total speed as the horizontal speed.", "Only the horizontal component is horizontal.", "Resolve first."]],
  },
  "y13-u18-l3": {
    teach: [
      ["Key results on level ground", ["For launch speed U at angle α: time of flight T = 2U sin α/g, greatest height H = U² sin²α/(2g), and range R = U² sin 2α/g.", "For U = 20 m s⁻¹ at 30°: T ≈ 2.04 s, H ≈ 5.10 m, R ≈ 35.3 m."], "Use time of flight to find range."],
      ["Method", ["Find the time from the vertical motion, then use it in the horizontal motion to find range."], "Time links the two directions."],
    ],
    ex: [["Using U = 20 m s⁻¹ at 30°, find the greatest height.", ["H = U² sin²30° / (2 × 9.8)"], "≈ 5.10 m"]],
    mis: [["Using the formula for range when the projectile is not on level ground.", "The formulae assume the same level for launch and landing.", "Check the landing height first."]],
  },
  "y13-u18-l4": {
    teach: [
      ["Deriving the formulae", ["Start from the components and suvat, eliminate time, and simplify. The range is R = U² sin 2α/g, using 2 sin α cos α = sin 2α.", "The result shows R depends on sin 2α."], "Derive from the components."],
      ["Maximum range", ["The range is largest when sin 2α = 1, so 2α = 90° and α = 45°. The maximum range is U²/g."], "Maximum range at 45°."],
    ],
    ex: [["Find the maximum range for launch speed 14 m s⁻¹.", ["R = U²/g", "196/9.8"], "20 m"]],
    mis: [["Assuming the maximum range is at 90°.", "The maximum is at 45°.", "Check sin 2α = 1 gives 2α = 90°."]],
  },

  /* ================== Unit 19: Equilibrium, friction and connected particles ================== */
  "y13-u19-l1": {
    teach: [
      ["Equilibrium", ["A particle is in equilibrium when the forces acting on it sum to zero. Resolve in two perpendicular directions, then set each sum to zero.", "Three forces of 6 N east, 8 N north and F: F must be 10 N south-west, as the resultant of the first two is 10 N north-east."], "Resolve, then set each to zero."],
      ["Finding the unknown", ["The unknown force has the same magnitude as the resultant of the others, but in the opposite direction."], "Opposite to the resultant of the others."],
    ],
    ex: [["A particle is in equilibrium under 6 N east and 8 N north. Find the third force.", ["√(36 + 64) = 10", "Opposite direction"], "10 N south-west"]],
    mis: [["Forgetting that the third force must cancel the resultant.", "The sum of all forces must be zero.", "Check the total is zero."]],
  },
  "y13-u19-l2": {
    teach: [
      ["Choosing directions", ["Choose horizontal and vertical axes, or axes along and perpendicular to an inclined surface, whichever makes the forces easiest to resolve.", "State the directions you use."], "Pick the axes that suit the forces."],
      ["Example", ["A particle is held by a string at 60° above the horizontal supporting a 20 N weight. The vertical equilibrium gives T sin 60° = 20, so T ≈ 23.1 N."], "Vertical balance finds T."],
    ],
    ex: [["Using the example, find the horizontal component of the tension.", ["T cos 60° = 23.1 × 0.5"], "≈ 11.5 N"]],
    mis: [["Resolving a force with the wrong trig ratio.", "The ratio depends on the angle from the chosen axis.", "Sketch and label the angle."]],
  },
  "y13-u19-l3": {
    teach: [
      ["Limiting equilibrium", ["If an object on a rough slope is about to slip, friction is at its maximum μR, and the forces are balanced.", "Check whether the object is in equilibrium by comparing the required friction with μR."], "Compare required friction with μR."],
      ["Example", ["A 5 kg block on a 30° slope with μ = 0.6. Weight 49 N: along the slope 24.5 N, normal reaction 42.4 N, so maximum friction 25.5 N. Since 24.5 < 25.5, the block stays at rest, with friction 24.5 N."], "Required friction less than μR means it stays still."],
    ],
    ex: [["Using μ = 0.4 instead, does the same block slide?", ["Maximum friction = 0.4 × 42.4 = 17.0 N", "24.5 > 17.0"], "Yes, it slides"]],
    mis: [["Assuming the block stays still because it is on a slope.", "Friction must be compared with the required force.", "Calculate both the required friction and μR."]],
  },
  "y13-u19-l4": {
    teach: [
      ["Ladder", ["For a uniform ladder in equilibrium, take moments about the foot to remove the friction force.", "A ladder of length 4 m and weight 80 N at its midpoint, leaning at 60° against a smooth wall: the wall reaction S satisfies S × 4 sin 60° = 80 × 2 cos 60°, so S ≈ 23.1 N."], "Moments about the foot."],
      ["Both conditions", ["Use force balance for the other forces, and moment balance for the ladder."], "Use both balance conditions."],
    ],
    ex: [["Using the ladder example, find the friction at the floor.", ["Friction = S for horizontal balance"], "23.1 N"]],
    mis: [["Taking moments about the middle of the ladder.", "Taking moments about the foot removes the unknown friction and reaction.", "Pick the point with the most unknowns."]],
  },
  "y13-u19-l5": {
    teach: [
      ["Rough slope with motion", ["Resolve along the slope: the net force is mg sin θ minus friction, and friction is μR = μmg cos θ. Then use F = ma.", "A 4 kg block sliding down a 30° slope with μ = 0.2: F = 19.6 − 0.2 × 33.9 ≈ 12.8 N, so a ≈ 3.2 m s⁻²."], "Net force along the slope = ma."],
      ["Checking the direction", ["Friction opposes the motion, so it acts up the slope when the block slides down."], "Friction opposes the motion."],
    ],
    ex: [["A 4 kg block slides down a 30° slope with μ = 0.2. Find the acceleration to 2 d.p.", ["Net force = 19.6 − 6.79", "a = 12.81/4"], "3.20 m s⁻²"]],
    mis: [["Using friction in the same direction as the motion.", "Friction always opposes motion.", "Draw friction up the slope."]],
  },
  "y13-u19-l6": {
    teach: [
      ["Connected systems", ["Treat each particle separately, with its own F = ma, and link them by the string's tension and common acceleration.", "A 5 kg particle on a smooth table is connected over a pulley to a 3 kg hanging particle. a = 3g/(5 + 3) = 3.675 ≈ 3.68 m s⁻². Tension T = 5a ≈ 18.4 N."], "Common acceleration, shared tension."],
      ["Checking", ["Check both particles give the same acceleration and the tension is the same from each equation."], "Check both equations agree."],
    ],
    ex: [["Using the same system, find the tension from the hanging particle.", ["3g − T = 3a", "T = 29.4 − 11.0"], "≈ 18.4 N"]],
    mis: [["Using different accelerations for connected particles.", "Connected particles share the same acceleration.", "Use one a for both."]],
  },

  /* ================== Unit 20: Vectors in mechanics and calculus ================== */
  "y13-u20-l1": {
    teach: [
      ["Vector suvat", ["In two dimensions, use vector versions: v = u + at and r = r₀ + ut + ½at² with vectors. Each component follows suvat separately.", "For r = 2t i + t² j, the velocity is 2i + 2t j."], "Each component follows suvat."],
      ["Speed", ["The speed is the magnitude of the velocity vector."], "Speed = magnitude of velocity."],
    ],
    ex: [["Using r = 2t i + t² j, find the speed at t = 2.", ["v = 2i + 4j", "√(4 + 16)"], "√20 ≈ 4.47 m s⁻¹"]],
    mis: [["Adding the components when finding speed.", "Speed is the magnitude, so use Pythagoras.", "Square, add, square root."]],
  },
  "y13-u20-l2": {
    teach: [
      ["The position vector", ["A projectile launched at speed U at angle α has r = (U cos α t) i + (U sin α t − 4.9t²) j, where 4.9 = ½g."], "x from horizontal; y from vertical."],
      ["Using it", ["Substitute t to find position, and differentiate to find velocity."], "Substitute or differentiate."],
    ],
    ex: [["For U = 20 m s⁻¹ at 30°, find the position after 1 s.", ["x = 20 cos 30° × 1", "y = 20 sin 30° − 4.9"], "(17.3, 5.1)"]],
    mis: [["Using 9.8 instead of 4.9 in the vertical term.", "The term is ½gt², so use 4.9t².", "Write ½g explicitly."]],
  },
  "y13-u20-l3": {
    teach: [
      ["When suvat fails", ["If acceleration depends on time, suvat no longer applies. Integrate acceleration to get velocity, and velocity to get displacement.", "For a = 6t with v(0) = 0: v = 3t², and with s(0) = 0: s = t³."], "Integrate with the start conditions."],
      ["Including e and trig", ["The same method applies when the acceleration involves e^t or trig functions. The integrals are standard."], "Same method, different functions."],
    ],
    ex: [["a = 6t with v(0) = 0. Find v at t = 2.", ["v = 3t²", "3 × 4"], "12 m s⁻¹"]],
    mis: [["Using suvat for variable acceleration.", "Use calculus instead.", "Check whether a is constant first."]],
  },
  "y13-u20-l4": {
    teach: [
      ["Component by component", ["To differentiate a vector, differentiate each component. For r = t² i + sin t j: v = 2t i + cos t j, a = 2i − sin t j.", "At t = 0, v = j."], "Differentiate each component."],
      ["Use in mechanics", ["Velocity is dr/dt and acceleration is dv/dt."], "v = dr/dt; a = dv/dt."],
    ],
    ex: [["Given r = (3t²)i + (t³)j, find the acceleration.", ["v = 6t i + 3t² j", "a = 6 i + 6t j"], "a = 6i + 6t j"]],
    mis: [["Differentiating only one component.", "Both components must be differentiated.", "Write each component separately."]],
  },
  "y13-u20-l5": {
    teach: [
      ["Component by component", ["To integrate a vector, integrate each component and add a constant vector. For a = 2t i + 3 j with u = 0: v = t² i + 3t j (zero constant).", "Then r = (t³/3) i + (3t²/2) j when r(0) = 0."], "Integrate each component."],
      ["Constants", ["Use the start conditions to find the constant vectors."], "Start conditions give constants."],
    ],
    ex: [["Using the same case, find r at t = 1.", ["(1/3)i + (3/2)j"], "(1/3, 3/2)"]],
    mis: [["Forgetting the constant vector.", "The constant is needed, and it comes from the start conditions.", "Find it from the initial position or velocity."]],
  },

  /* ================== Unit 21: Exam skills ================== */
  "y13-u21-l5": {
    teach: [
      ["Mixed papers", ["Paper 3 can mix Statistics and Mechanics. Read each question and decide which topic and model it needs before calculating."], "Identify the topic first."],
      ["Checklist", ["Ask: is it a probability model, a hypothesis test or a force and motion model? Then state the assumptions or hypotheses before you calculate."], "Name the model before the calculation."],
    ],
    ex: [["A question gives a mean and SD of a continuous measurement and asks for a probability. Which model?", ["Continuous, so think normal distribution"], "Normal distribution"]],
    mis: [["Using the wrong model for the question type.", "Continuous data uses the normal distribution; counts use the binomial.", "Check the data type first."]],
  },
};
