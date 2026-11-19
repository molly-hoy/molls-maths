/* ==========================================================================
   Going deeper: Year 12 Pure, Part B (Units 7–12)
   Extra teaching, one more worked example and one more common mistake for
   each lesson, added after the short teaching in y12-b.js by addDetail().
   ========================================================================== */

export const Y12B_DETAIL = {
  /* ================== Unit 7: Binomial expansion ================== */
  "y12-u7-l1": {
    teach: [
      ["Building the triangle", ["Each row starts and ends with 1, and every other number is the two above it added together. Row 4 is 1, 4, 6, 4, 1.", "Row n gives the coefficients of (a + b)ⁿ in order, starting from the highest power of a."], "Each number is the sum of the two above it."],
      ["Expanding with the row", ["(a + b)³ uses row 3: 1, 3, 3, 1, so (a + b)³ = a³ + 3a²b + 3ab² + b³. The powers of a fall and the powers of b rise, and they always add to 3."], "Powers of a and b always add to n."],
    ],
    ex: [["Use row 5 to expand (x + 1)⁵.", ["Row 5: 1, 5, 10, 10, 5, 1", "Powers of x fall from 5 to 0"], "x⁵ + 5x⁴ + 10x³ + 10x² + 5x + 1"]],
    mis: [["Squaring each term rather than expanding: (x + 1)³ = x³ + 1.", "Each middle term is also needed, with its own coefficient.", "Use the triangle row for all the coefficients."]],
  },
  "y12-u7-l2": {
    teach: [
      ["Counting choices", ["ⁿCᵣ is the number of ways to choose r items from n, with no order. ⁵C₂ means choosing 2 from 5, which is 10 ways.", "On a calculator this is the nCr key. By hand, ⁿCᵣ = n!/(r!(n − r)!)."], "ⁿCᵣ counts the ways to choose."],
      ["Matching the triangle", ["ⁿCᵣ gives the entry in row n, position r (starting the count at 0). So ⁴C₂ = 6 is the middle entry of row 4."], "Row n, position r, starting from 0."],
    ],
    ex: [["Find ⁶C₃.", ["6! / (3! × 3!)", "720 / (6 × 6)"], "20"]],
    mis: [["Counting from 1 when the position starts at 0.", "The first entry of each row is ⁿC₀ = 1.", "Check that the first and last values are 1."]],
  },
  "y12-u7-l3": {
    teach: [
      ["Writing the expansion", ["Use the coefficients from ⁿCᵣ, then multiply each by aⁿ⁻ʳbʳ. Write the terms in order of falling powers of a.", "(2 + x)³ = C(3,0)2³ + C(3,1)2²x + C(3,2)2x² + C(3,3)x³ = 8 + 12x + 6x² + x³."], "Coefficient × a power × b power, term by term."],
      ["Using 1 + x", ["When a = 1, the expansion is simpler: (1 + x)⁴ = 1 + 4x + 6x² + 4x³ + x⁴."], "Setting a = 1 simplifies the work."],
    ],
    ex: [["Expand (1 − 2x)³.", ["Terms: 1, 3(−2x), 3(−2x)², (−2x)³", "= 1 − 6x + 12x² − 8x³"], "1 − 6x + 12x² − 8x³"]],
    mis: [["Forgetting the sign of the second term.", "(1 − 2x) has −2x, so every power of it carries that sign.", "Put brackets around the second term: (−2x)²."]],
  },
  "y12-u7-l4": {
    teach: [
      ["The general term", ["The (r + 1)th term of (a + b)ⁿ is ⁿCᵣ aⁿ⁻ʳbʳ. Count from r = 0, so the first term has r = 0.", "For (2 + x)⁵, the term in x³ has r = 3, so it is C(5,3) × 2² × x³ = 10 × 4 × x³ = 40x³."], "Count the powers of b to get r."],
      ["Using it with a bracket", ["When b has a number in front, such as (2 + 3x), include those numbers as well. The coefficient of x² in (2 + 3x)⁴ is C(4,2) × 2² × 3² = 6 × 4 × 9 = 216."], "Include the numbers from each part."],
    ],
    ex: [["Find the coefficient of x² in (1 + 2x)⁵.", ["r = 2: C(5,2) × 1³ × (2x)²", "10 × 4"], "40"]],
    mis: [["Taking the r value from the term number instead of the power of x.", "The power of b gives r, not the term's position.", "Write out the power of x, then match r."]],
  },
  "y12-u7-l5": {
    teach: [
      ["Why it works", ["If x is small, x² is much smaller, and x³ smaller still. So the first few terms of an expansion give a close answer to the whole value.", "For (1 + 0.01)⁵ with x = 0.01: 1 + 5(0.01) + 10(0.0001) = 1.051, close to the exact value 1.0510."], "Small x means the higher powers are tiny."],
      ["Choosing the number of terms", ["Use enough terms that the next term is negligible at the accuracy you need. Check the size of each term to decide."], "Stop when the next term is too small to matter."],
    ],
    ex: [["Use the first 3 terms of (1 + 2x)⁴ to estimate (1.02)⁴ (x = 0.01).", ["1 + 4(2x) + 6(2x)²", "= 1 + 8x + 24x², with x = 0.01"], "1 + 0.08 + 0.0024 = 1.0824"]],
    mis: [["Using the approximation when x is not small.", "The expansion gives a poor answer if x is large.", "Check x is small before using it."]],
  },

  /* ================== Unit 8: Trigonometry ================== */
  "y12-u8-l1": {
    teach: [
      ["The two forms", ["a² = b² + c² − 2bc cos A finds a side when you know two sides and the angle between them. Rearranged, cos A = (b² + c² − a²)/(2bc) finds an angle from three sides.", "For sides 5 and 7 with angle 60° between them: a² = 25 + 49 − 70 × ½ = 39, so a ≈ 6.24."], "Use the cosine rule when you have the angle between the two known sides."],
      ["Right-angled check", ["If the angle is 90°, cos 90° = 0 and the rule becomes Pythagoras. So the cosine rule always works, including for right-angled triangles."], "The cosine rule includes Pythagoras as a special case."],
    ],
    ex: [["A triangle has sides 3, 4 and 5. Find the angle opposite 5.", ["cos C = (3² + 4² − 5²)/(2 × 3 × 4)", "= 0/24 = 0"], "C = 90°"]],
    mis: [["Forgetting the −2bc cos A term.", "Pythagoras only works for right angles; the general formula keeps this term.", "Write all the terms each time."]],
  },
  "y12-u8-l2": {
    teach: [
      ["The rule", ["a/sin A = b/sin B = c/sin C. Use it when you know a side and its opposite angle, plus one other side or angle.", "Write the ratio with the known side on top, then rearrange to find the unknown."], "Each side over the sine of its opposite angle is equal."],
      ["The ambiguous case", ["If you find an angle with sine, there are two angles between 0° and 180°: θ and 180° − θ. Check both. The second triangle is only valid if the angles add to less than 180°.", "With a = 8, b = 10 and A = 30°: sin B = 10 sin 30°/8 = 0.625, so B = 38.7° or 141.3°. Both work here."], "Check both angles for the second solution."],
    ],
    ex: [["In triangle ABC, a = 7, A = 40°, c = 5. Find C to 1 d.p.", ["sin C = 5 sin 40°/7", "= 0.4591, so C = 27.3°"], "C = 27.3°"]],
    mis: [["Missing the second angle in the ambiguous case.", "sin θ = sin (180° − θ), so both angles are possible.", "Check whether 180° − θ fits in the triangle."]],
  },
  "y12-u8-l3": {
    teach: [
      ["Why it works", ["Area = ½ × base × height. If you drop a perpendicular from one vertex, the height is b sin C, so the area is ½ab sin C.", "For sides 5 and 7 with angle 60°: area = ½ × 5 × 7 × sin 60° = 15.16 (to 2 d.p.)."], "The height comes from the sine of the angle."],
      ["Using the angle between", ["Use the angle between the two sides you know. If the angle is not between them, first find it with the sine or cosine rule."], "Use the angle between the known sides."],
    ],
    ex: [["Find the area of a triangle with sides 8 cm and 6 cm and angle 30° between them.", ["½ × 8 × 6 × sin 30°", "= 24 × ½"], "12 cm²"]],
    mis: [["Using the angle that is not between the two sides.", "The formula only works with the angle between the sides.", "Label the angle between the sides before using the formula."]],
  },
  "y12-u8-l4": {
    teach: [
      ["Bearings", ["A bearing is an angle measured clockwise from north, written with three digits (e.g. 050°). Draw north lines at each point and use alternate angles to find the angle in the triangle."], "Draw the north lines first."],
      ["Choosing the rule", ["Use the cosine rule for three sides or the angle between two sides. Use the sine rule when you know a side and its opposite angle. Look for the rule that fits the known information."], "Match the rule to the information given."],
    ],
    ex: [["A triangle has AB = 7 cm, angle A = 40° and angle B = 60°. Find BC.", ["C = 80°", "BC = 7 sin 40°/sin 80°"], "BC ≈ 4.57 cm"]],
    mis: [["Using the wrong triangle when there are two triangles in the diagram.", "Only use the triangle that contains the values you know.", "Label each triangle before calculating."]],
  },
  "y12-u8-l5": {
    teach: [
      ["Periods and amplitude", ["sin x and cos x have period 360° and amplitude 1, so they range from −1 to 1. tan x has period 180° and no maximum or minimum, and it has asymptotes at 90° and 270°.", "Because each graph repeats, every value between −1 and 1 is reached twice in one period by sine or cosine."], "Sine and cosine repeat every 360°; tan every 180°."],
      ["Symmetry", ["The sine graph is symmetric about 90°, and the cosine graph is symmetric about 0°. Use the graph to find all solutions in the range."], "Use symmetry to find the other solutions."],
    ],
    ex: [["How many solutions does cos x = 0 have for 0° ≤ x < 360°?", ["cos x = 0 at 90° and 270°"], "Two: 90° and 270°"]],
    mis: [["Assuming tan has the same period as sin.", "Tan repeats every 180°, not 360°.", "Check the period for each function."]],
  },
  "y12-u8-l6": {
    teach: [
      ["Angles beyond 90°", ["Measure the angle anticlockwise from the positive x-axis. The sign of each trig function depends on the quadrant: sin is positive in the first and second, cos in the first and fourth, and tan in the first and third.", "sin 150° = sin 30° = ½, because 150° is in the second quadrant and sin is positive there."], "Use the quadrant to find the sign."],
      ["Negative angles", ["A negative angle is measured clockwise. tan(−45°) = −tan 45° = −1, and cos(−θ) = cos θ."], "Use the rule for negatives: sin and tan change sign, cos does not."],
    ],
    ex: [["Find cos 210° exactly.", ["210° is in the third quadrant, where cos is negative", "cos 210° = −cos 30°"], "−√3/2"]],
    mis: [["Taking the reference angle without adjusting the sign.", "Find the angle in the first quadrant, then apply the sign for the quadrant.", "Sketch the quadrant first."]],
  },
  "y12-u8-l7": {
    teach: [
      ["Two special triangles", ["The 30°-60°-90° triangle with sides 1, √3 and 2 gives sin 30° = ½, cos 30° = √3/2 and tan 30° = 1/√3.", "The isosceles right-angled triangle with sides 1, 1 and √2 gives sin 45° = cos 45° = √2/2."], "Learn the values from the two triangles."],
      ["Using them", ["Combine these values with the quadrant rules to find exact values of any related angle. cos 150° = −cos 30° = −√3/2."], "Exact values plus quadrant signs give exact answers."],
    ],
    ex: [["Find the exact value of tan 120°.", ["120° is in the second quadrant, where tan is negative", "tan 120° = −tan 60°"], "−√3"]],
    mis: [["Using decimals when the question asks for exact values.", "Give √3/2, not 0.866.", "Keep surds in the answer."]],
  },
  "y12-u8-l8": {
    teach: [
      ["The identities", ["tan θ = sin θ/cos θ, and sin²θ + cos²θ = 1. The second one is true for every angle, so you can swap sin² and cos² whenever it helps.", "Use the first to write everything in sin and cos, then simplify."], "Write everything in sin and cos to simplify."],
      ["Using them in equations", ["If an equation contains both sin and cos, use sin²θ = 1 − cos²θ to get one trig function. This gives a quadratic that you can solve."], "Replace sin² with 1 − cos² to get one function."],
    ],
    ex: [["Show that (1 − cos²θ)/sin θ = sin θ.", ["1 − cos²θ = sin²θ", "sin²θ/sin θ = sin θ"], "Shown"]],
    mis: [["Using sin²θ + cos²θ = 1 with the wrong sign.", "It is the sum of the squares that equals 1, not the difference.", "Rearrange to sin²θ = 1 − cos²θ when needed."]],
  },
  "y12-u8-l9": {
    teach: [
      ["First solution", ["Your calculator gives the first solution in the range using sin⁻¹, cos⁻¹ or tan⁻¹. For sin x = 0.5, the calculator gives x = 30°."], "The calculator gives the first answer."],
      ["Finding the rest", ["Sketch the graph or use CAST: Cos, All, Sin and Tan show which quadrants give a positive value. For sin x = 0.5 the second solution is 180° − 30° = 150°."], "CAST shows which quadrants to use."],
    ],
    ex: [["Solve cos x = −0.5 for 0° ≤ x < 360°.", ["Calculator: cos⁻¹(0.5) = 60°", "Cos is negative in quadrants 2 and 3: 180° − 60° and 180° + 60°"], "x = 120° or 240°"]],
    mis: [["Giving only the calculator's answer.", "A trig equation has more than one solution in a range.", "Use CAST or the graph to find all of them."]],
  },
  "y12-u8-l10": {
    teach: [
      ["Multiple angles", ["For sin 2x = 0.5 with 0° ≤ x < 360°, the range for 2x is 0° to 720°. Solve sin θ = 0.5 for θ = 2x over that range, then halve each answer.", "The solutions for 2x are 30°, 150°, 390° and 510°, so x = 15°, 75°, 195° and 255°."], "Change the range for the multiple of x."],
      ["Quadratic in cos", ["For 2cos²x − cos x − 1 = 0, let c = cos x: 2c² − c − 1 = 0, so (2c + 1)(c − 1) = 0. Then c = −½ or c = 1, and solve each for x."], "Treat the trig function as the unknown."],
    ],
    ex: [["Solve 2sin²x − sin x = 0 for 0° ≤ x < 360°.", ["sin x (2 sin x − 1) = 0", "sin x = 0 or sin x = ½"], "x = 0°, 30°, 150°, 180°"]],
    mis: [["Forgetting to expand the range for 2x.", "If the range is 0° to 360° for x, it is 0° to 720° for 2x.", "Write the new range before solving."]],
  },

  /* ================== Unit 9: Vectors ================== */
  "y12-u9-l1": {
    teach: [
      ["Adding and scaling", ["Add vectors component by component. Multiplying by a number scales each component. If a = 3i − 2j and b = i + 4j, then 2a − b = 5i − 8j."], "Work with the i and j parts separately."],
      ["Writing as a column", ["The column form (x, y) means xi + yj. It is the same vector, written differently."], "Column form and i, j form are the same."],
    ],
    ex: [["Find a + 2b if a = (3, −1) and b = (−2, 4).", ["(3 + 2 × (−2), −1 + 2 × 4)", "(3 − 4, −1 + 8)"], "(−1, 7)"]],
    mis: [["Adding the i and j parts together.", "The i part is only added to the i part.", "Write each component separately."]],
  },
  "y12-u9-l2": {
    teach: [
      ["Position of the parts", ["i is one unit in the positive x-direction. j is one unit in the positive y-direction. So 3i − 2j means 3 right and 2 down.", "The vector from A(1, 2) to B(4, −1) is 3i − 3j."], "Read the sign of each part as direction."],
      ["Finding a vector between points", ["Subtract the coordinates: the vector from A to B is (x_B − x_A) i + (y_B − y_A) j."], "End minus start."],
    ],
    ex: [["Find the vector from P(−2, 5) to Q(3, 1).", ["(3 − (−2)) i + (1 − 5) j", "= 5i − 4j"], "5i − 4j"]],
    mis: [["Subtracting in the wrong order.", "The vector from A to B is end minus start, so it has the opposite sign from B to A.", "Always write end minus start."]],
  },
  "y12-u9-l3": {
    teach: [
      ["Magnitude", ["The magnitude of xi + yj is √(x² + y²). It is the length of the vector, which is always positive.", "The magnitude of 3i + 4j is √(9 + 16) = 5."], "Pythagoras gives the length."],
      ["Direction", ["The direction is the angle the vector makes with i (the positive x-axis), found with tan θ = y/x. For 3i + 4j, tan θ = 4/3, so θ ≈ 53.1°."], "Use tan θ = y/x for the direction."],
    ],
    ex: [["Find the direction of 5i − 12j, measured below i.", ["tan θ = 12/5", "θ = tan⁻¹(2.4)"], "67.4° below i"]],
    mis: [["Ignoring the sign when finding direction.", "A negative y gives a direction below the x-axis.", "Sketch the vector to check which way it points."]],
  },
  "y12-u9-l4": {
    teach: [
      ["Position vectors", ["The position vector of a point is the vector from the origin to it. If A has position vector a and B has b, then AB = b − a.", "For a = i + 2j and b = 4i + 6j, AB = 3i + 4j, which has length 5."], "AB = b − a, end minus start."],
      ["Midpoints", ["The midpoint M of AB has position vector (a + b)/2. It is the average of the two position vectors."], "Average the position vectors for the midpoint."],
    ],
    ex: [["Find the midpoint of A(1, 2) and B(5, 8).", ["((1 + 5)/2, (2 + 8)/2)", "(6/2, 10/2)"], "(3, 5)"]],
    mis: [["Using AB = a − b instead of b − a.", "AB runs from A to B, so the end point B comes first in the subtraction.", "Write end minus start every time."]],
  },
  "y12-u9-l5": {
    teach: [
      ["Collinear points", ["Points are on the same straight line if the vectors between them are parallel and share a point. A(1, 2), B(3, 4) and C(5, 6): AB = 2i + 2j and BC = 2i + 2j, which are equal and share B, so A, B and C lie on one line."], "Parallel vectors through a shared point are collinear."],
      ["Comparing coefficients", ["If p i + q j = r i + s j, then p = r and q = s, because i and j are not parallel. Use this to find unknown values in vector equations."], "Equal i parts and equal j parts."],
    ],
    ex: [["Vectors (k, 3) and (2, 6) are parallel. Find k.", ["Ratio of components equal: k/2 = 3/6", "k = 1"], "k = 1"]],
    mis: [["Checking only the direction without checking the shared point.", "Parallel vectors are on the same line only if they share a point.", "Show a common point as well."]],
  },
  "y12-u9-l6": {
    teach: [
      ["Velocity and displacement", ["Velocity is a vector: its size is speed and its direction is the direction of motion. Displacement from a start point r₀ after time t is r = r₀ + vt.", "A particle starts at (1, −1) with velocity 2i + 3j. Its position at time t is (1 + 2t)i + (−1 + 3t)j."], "Position = start + velocity × time."],
      ["Speed", ["The speed is the magnitude of the velocity: for 2i + 3j it is √13."], "Speed is the magnitude of velocity."],
    ],
    ex: [["Using the particle above, find its position at t = 2.", ["x = 1 + 2 × 2 = 5", "y = −1 + 3 × 2 = 5"], "(5, 5)"]],
    mis: [["Calculating speed by adding the components.", "Speed is the magnitude, so use Pythagoras: √(2² + 3²).", "Square, add, then square root."]],
  },

  /* ================== Unit 10: Differentiation ================== */
  "y12-u10-l1": {
    teach: [
      ["Chords and tangents", ["A chord joins two points on a curve. The gradient of a chord is an average rate of change. As the second point gets closer to the first, the chord approaches the tangent.", "For y = x² between x = 1 and x = 1 + h, the chord's gradient is h + 2. As h gets smaller, the gradient approaches 2."], "A tangent is the limit of chords."],
      ["Why we need it", ["The gradient of a curve changes at each point, so one fixed gradient cannot describe the whole curve. The tangent gradient describes it at a single point."], "The gradient varies, so it is found at a point."],
    ],
    ex: [["Find the gradient of the chord of y = x² between x = 2 and x = 2 + h.", ["((2 + h)² − 4)/h", "= (4h + h²)/h"], "4 + h"]],
    mis: [["Using a chord as the gradient at a point.", "A chord gives an average over an interval, not the gradient at one point.", "Use the limit as the interval shrinks."]],
  },
  "y12-u10-l2": {
    teach: [
      ["The method", ["Take the points (x, f(x)) and (x + h, f(x + h)). Find the gradient of the chord, simplify it so that h cancels, then let h tend to 0.", "For f(x) = x²: ((x + h)² − x²)/h = (2xh + h²)/h = 2x + h → 2x as h → 0."], "Cancel h, then let h → 0."],
      ["A cubic", ["For f(x) = x³: ((x + h)³ − x³)/h = 3x² + 3xh + h² → 3x², so the derivative is 3x²."], "Expand the bracket, then cancel h."],
    ],
    ex: [["Use first principles to differentiate f(x) = 4x.", ["(4(x + h) − 4x)/h = 4h/h", "= 4"], "f′(x) = 4"]],
    mis: [["Not cancelling h before letting it go to 0.", "Dividing by h is only allowed while h is not zero, so cancel first.", "Simplify fully before taking the limit."]],
  },
  "y12-u10-l3": {
    teach: [
      ["The power rule", ["For y = xⁿ, dy/dx = n × xⁿ⁻¹. Multiply by the power, then reduce the power by 1. Constants disappear, and x becomes 1.", "y = x⁵ gives 5x⁴. y = x gives 1."], "Multiply by the power, then subtract 1."],
      ["Roots and reciprocals", ["Write √x as x^(1/2) and 1/x² as x⁻². Then y = √x gives dy/dx = ½x^(−1/2) = 1/(2√x)."], "Write as a power first."],
    ],
    ex: [["Differentiate y = 3x⁴ − 2x + 7.", ["12x³ − 2"], "dy/dx = 12x³ − 2"]],
    mis: [["Keeping the old power, or not reducing it.", "Reduce by 1 after multiplying.", "Check the new power is one less."]],
  },
  "y12-u10-l4": {
    teach: [
      ["Simplify first", ["Expand brackets and split fractions before differentiating. (x + 1)²/x = (x² + 2x + 1)/x = x + 2 + x⁻¹, which differentiates to 1 − x⁻².", "Differentiating without simplifying first is slower and more error-prone."], "Simplify before differentiating."],
      ["Term by term", ["Differentiate each term separately and add the results. Constants vanish, so d/dx(7) = 0."], "Differentiate each term, then add."],
    ],
    ex: [["Differentiate y = 4x⁻³ + 5√x.", ["4 × (−3)x⁻⁴ + 5 × ½x^(−1/2)"], "dy/dx = −12x⁻⁴ + 5/(2√x)"]],
    mis: [["Differentiating the bracket without expanding it.", "(x + 1)² differentiates to 2(x + 1) only after expanding or using the chain rule.", "Expand first when you can."]],
  },
  "y12-u10-l5": {
    teach: [
      ["Tangent", ["The tangent at a point has gradient dy/dx at that point. Use y − y₁ = m(x − x₁) with the point and the gradient.", "For y = x² at x = 3: gradient 6, point (3, 9), so y − 9 = 6(x − 3), giving y = 6x − 9."], "Gradient from dy/dx, then the line."],
      ["Normal", ["The normal is perpendicular to the tangent, so its gradient is −1/m. For the example above, the normal gradient is −1/6."], "Normal gradient is the negative reciprocal."],
    ],
    ex: [["Find the equation of the normal to y = x² at x = 1.", ["Point (1, 1), gradient at x = 1 is 2", "Normal gradient −½"], "y − 1 = −½(x − 1), so x + 2y = 3"]],
    mis: [["Using the tangent gradient as the normal gradient.", "The normal is perpendicular, so its gradient is the negative reciprocal.", "Check the product of the two gradients is −1."]],
  },
  "y12-u10-l6": {
    teach: [
      ["Finding where it increases", ["Solve dy/dx > 0 to find where the function increases. For y = x³ − 3x, dy/dx = 3x² − 3 > 0 when x² > 1, so x < −1 or x > 1.", "Solve dy/dx < 0 for decreasing: −1 < x < 1."], "Solve the derivative inequality."],
      ["Sign diagram", ["Find the roots of dy/dx, then test a value in each region to see if it is positive or negative."], "Test a value in each region."],
    ],
    ex: [["Find where y = x² − 4x is increasing.", ["dy/dx = 2x − 4 > 0", "2x > 4"], "x > 2"]],
    mis: [["Using y instead of dy/dx to decide if it increases.", "The sign of the derivative decides the direction.", "Solve dy/dx, not the original function."]],
  },
  "y12-u10-l7": {
    teach: [
      ["The second derivative", ["d²y/dx² is the derivative of dy/dx. It tells you how the gradient changes: positive means the gradient is increasing.", "For y = x⁴ − 2x³: dy/dx = 4x³ − 6x², d²y/dx² = 12x² − 12x."], "Differentiate the first derivative again."],
      ["Notation", ["d²y/dx² is read as 'd two y by d x squared'. It is not the same as (dy/dx)²."], "d²y/dx² is not (dy/dx)²."],
    ],
    ex: [["Find d²y/dx² for y = 3x⁻².", ["dy/dx = −6x⁻³", "d²y/dx² = 18x⁻⁴"], "18x⁻⁴"]],
    mis: [["Squaring the first derivative instead of differentiating again.", "The second derivative is a derivative of the first.", "Differentiate dy/dx once more."]],
  },
  "y12-u10-l8": {
    teach: [
      ["Stationary points", ["A stationary point is where dy/dx = 0. Solve it to find the x values, then substitute into y to get the coordinates.", "For y = x³ − 3x: dy/dx = 3x² − 3 = 0, so x = ±1. The points are (1, −2) and (−1, 2)."], "Set dy/dx = 0, then find y."],
      ["Maximum or minimum", ["If d²y/dx² > 0, it is a minimum. If it is < 0, it is a maximum. For the example, d²y/dx² = 6x: at x = 1 it is 6 (minimum), at x = −1 it is −6 (maximum)."], "Positive second derivative: minimum."],
    ],
    ex: [["Find and classify the stationary point of y = x² − 6x + 10.", ["dy/dx = 2x − 6 = 0, x = 3", "y = 9 − 18 + 10 = 1", "d²y/dx² = 2 > 0"], "Minimum at (3, 1)"]],
    mis: [["Classifying a point without checking the second derivative.", "The sign of the second derivative decides the type of point.", "Always test d²y/dx²."]],
  },
  "y12-u10-l9": {
    teach: [
      ["Key rules", ["Where f(x) has a stationary point, f′(x) = 0, so the graph of f′ crosses the x-axis there. Where f is increasing, f′ is positive, so its graph is above the axis.", "Where f has a maximum or minimum, f′ changes sign."], "Stationary points on f become roots on f′."],
      ["Sketching", ["Sketch f′ by looking at the gradient of f at each point. Check it crosses the axis where f has turning points."], "Check the crossing points."],
    ],
    ex: [["If f(x) = x², what is the graph of f′(x)?", ["f′(x) = 2x", "A straight line through the origin with gradient 2"], "A straight line through (0, 0)"]],
    mis: [["Drawing f′ as a copy of f.", "f′ shows the gradient of f, so its shape is different.", "Use the gradient at each point."]],
  },
  "y12-u10-l10": {
    teach: [
      ["Setting up the model", ["Write the quantity to optimise in terms of one variable. Use the constraint to remove the other variable.", "A rectangle with perimeter 40 has sides x and 20 − x, so the area is A = x(20 − x)."], "Write the quantity with one variable."],
      ["Finding the maximum", ["Differentiate, set dA/dx = 0, then check the result is a maximum with the second derivative or the sign change. For A = 20x − x²: dA/dx = 20 − 2x = 0 gives x = 10, so the maximum area is 100 for a square."], "Set the derivative to zero and check."],
    ],
    ex: [["A rectangle has perimeter 24. Find its maximum area.", ["Sides x and 12 − x", "A = x(12 − x) = 12x − x², dA/dx = 12 − 2x = 0, x = 6"], "Maximum area 36 when it is a square"]],
    mis: [["Not checking the answer is in a sensible range.", "A length can't be negative, so check the solution.", "Confirm the answer makes sense in the context."]],
  },

  /* ================== Unit 11: Integration ================== */
  "y12-u11-l1": {
    teach: [
      ["The reverse rule", ["To integrate xⁿ, add 1 to the power and divide by the new power: ∫xⁿ dx = xⁿ⁺¹/(n + 1) + c, for n ≠ −1.", "∫x³ dx = x⁴/4 + c."], "Add one to the power, then divide by it."],
      ["The constant of integration", ["Add + c for an indefinite integral, because the derivative of any constant is zero. The c is needed for every indefinite integral."], "Always add + c for indefinite integrals."],
    ],
    ex: [["Integrate 6x² − 4x.", ["6x³/3 − 4x²/2", "= 2x³ − 2x²"], "2x³ − 2x² + c"]],
    mis: [["Forgetting the + c.", "The integral is a family of curves, so the constant is needed.", "Write + c after every indefinite integral."]],
  },
  "y12-u11-l2": {
    teach: [
      ["Expand first", ["Expand brackets and split fractions before integrating. (x + 1)² = x² + 2x + 1, so ∫(x + 1)² dx = x³/3 + x² + x + c.", "Integrating the bracket as if it were x² would be wrong."], "Expand before integrating."],
      ["Dividing by x", ["Divide each term by x when simplifying. (x³ + 2x)/x = x² + 2, which integrates to x³/3 + 2x + c."], "Split the fraction into separate terms."],
    ],
    ex: [["Integrate (x³ + 2x)/x.", ["Divide each term by x: x² + 2", "Integrate term by term"], "x³/3 + 2x + c"]],
    mis: [["Integrating a fraction term by term without dividing it.", "Divide first, then integrate.", "Write the simplified terms."]],
  },
  "y12-u11-l3": {
    teach: [
      ["Using a point", ["Integrate the derivative to get f(x) + c, then use the given point to find c.", "f′(x) = 3x² − 1 and f(1) = 4: f(x) = x³ − x + c. Substituting x = 1: 1 − 1 + c = 4, so c = 4."], "Find c with the given point."],
      ["Checking", ["Differentiate your answer to see it gives the original f′(x)."], "Differentiate to check."],
    ],
    ex: [["Find f(x) if f′(x) = 2x + 1 and f(0) = 5.", ["f(x) = x² + x + c", "c = 5"], "f(x) = x² + x + 5"]],
    mis: [["Forgetting to use the point to find c.", "Without the point, the constant is unknown.", "Substitute the point after integrating."]],
  },
  "y12-u11-l4": {
    teach: [
      ["Limits", ["A definite integral has limits a and b: ∫ₐᵇ f(x) dx = [F(x)]ₐᵇ = F(b) − F(a). The constant c cancels, so you don't need it.", "∫₁³ x² dx = [x³/3]₁³ = 9 − ⅓ = 26/3."], "F(b) minus F(a); the constant cancels."],
      ["Order matters", ["Swapping the limits changes the sign: ∫ₐᵇ = −∫ᵦₐ."], "Swapping limits changes the sign."],
    ],
    ex: [["Evaluate ∫₀² (2x + 1) dx.", ["[x² + x]₀²", "= (4 + 2) − 0"], "6"]],
    mis: [["Including + c in a definite integral.", "It cancels in F(b) − F(a), so it isn't needed.", "Leave it out."]],
  },
  "y12-u11-l5": {
    teach: [
      ["Area as an integral", ["If the curve is above the x-axis between a and b, the area is ∫ₐᵇ f(x) dx.", "The area under y = x² from 0 to 2 is ∫₀² x² dx = [x³/3]₀² = 8/3."], "Area under a curve above the axis."],
      ["Curves that go above and below", ["Find the area above the axis and below it separately, then add them. Never use one integral across a region that crosses the axis."], "Split at the axis."],
    ],
    ex: [["Find the area between y = 4 − x² and the x-axis.", ["Roots at ±2", "∫₋₂² (4 − x²) dx = [4x − x³/3]₋₂²"], "32/3"]],
    mis: [["Using one integral across the whole range when the curve crosses the axis.", "Positive and negative parts cancel out, so the answer is wrong.", "Split the integral at the roots."]],
  },
  "y12-u11-l6": {
    teach: [
      ["Negative areas", ["Below the x-axis, the integral is negative. The area is positive, so take the absolute value of each part.", "For y = x² − 1 between x = −1 and 1, the integral is −4/3, but the area is 4/3."], "The integral is negative below the axis; the area is positive."],
      ["Split at roots", ["Find the roots, then integrate over each piece separately. Add the absolute values of the pieces to get the total area."], "Add the absolute values of each piece."],
    ],
    ex: [["Find the total area between y = x² − 1 and the x-axis from x = −1 to 2.", ["Split at x = 1", "Area from −1 to 1: 4/3", "Area from 1 to 2: 4/3"], "Total area 8/3"]],
    mis: [["Taking the single integral from −1 to 2 as the area.", "This gives 4/3, but the true area is 8/3, because the negative part is subtracted.", "Split at the roots, then take absolute values."]],
  },
  "y12-u11-l7": {
    teach: [
      ["Top minus bottom", ["The area between two curves is ∫ₐᵇ (top − bottom) dx, where top and bottom mean the upper and lower curves over the interval."], "Integrate top minus bottom."],
      ["Finding the limits", ["Solve the two equations together to find where they meet. These x values are the limits of integration."], "The limits are where the curves meet."],
    ],
    ex: [["Find the area between y = x + 2 and y = x².", ["Meet at x = −1 and 2", "∫₋₁² (x + 2 − x²) dx = [x²/2 + 2x − x³/3]₋₁²"], "9/2"]],
    mis: [["Subtracting the curves in the wrong order.", "The top curve minus the bottom curve is always positive.", "Check the line is above the curve between the limits."]],
  },

  /* ================== Unit 12: Exponentials and logarithms ================== */
  "y12-u12-l1": {
    teach: [
      ["Growth and decay", ["For y = aˣ with a > 1, the graph grows; with 0 < a < 1, it decays. Every graph passes through (0, 1) because a⁰ = 1.", "y = 2ˣ gives 1 at x = 0, 2 at x = 1 and 8 at x = 3."], "Every a^x passes through (0, 1)."],
      ["Not a power function", ["In 2ˣ the variable is the power, not the base. 2ˣ is not the same as x², because x² grows much more slowly for large x."], "The variable is the power, not the base."],
    ],
    ex: [["Find the value of 3ˣ when x = 4.", ["3⁴ = 3 × 3 × 3 × 3"], "81"]],
    mis: [["Treating aˣ as x^a.", "2ˣ means 2 multiplied by itself x times, and 2ˣ is not x².", "Check with x = 3: 2³ = 8, but 3² = 9 is different."]],
  },
  "y12-u12-l2": {
    teach: [
      ["Differentiating eˣ", ["d/dx(eˣ) = eˣ, so the gradient of the curve equals the value of y at every point.", "For e^(kx), the derivative is k e^(kx), because of the chain rule."], "The gradient of eˣ equals eˣ."],
      ["Using it", ["Use the derivative to find gradients and turning points of functions involving eˣ. For y = eˣ + 3x, dy/dx = eˣ + 3."], "Differentiate eˣ to itself."],
    ],
    ex: [["Differentiate y = e^(2x).", ["Chain rule: the derivative of 2x is 2", "dy/dx = 2e^(2x)"], "2e^(2x)"]],
    mis: [["Forgetting the factor from the chain rule.", "d/dx(e^(2x)) is 2e^(2x), not e^(2x).", "Multiply by the derivative of the power."]],
  },
  "y12-u12-l3": {
    teach: [
      ["Building a model", ["Write the model as N = N₀ × rᵗ, where N₀ is the start value and r is the multiplier per unit time. Growth gives r > 1, decay gives r < 1.", "A value of £20 000 that falls by 20% a year: V = 20000 × 0.8ᵗ."], "Start value times the multiplier to the power of time."],
      ["Using the model", ["Substitute the time to find the value. After 2 years, V = 20000 × 0.8² = 12 800."], "Substitute the time."],
    ],
    ex: [["A colony of 100 bacteria doubles every hour. Find the number after 3 hours.", ["N = 100 × 2ᵗ", "N = 100 × 2³"], "800"]],
    mis: [["Using the percentage instead of the multiplier.", "A fall of 20% multiplies by 0.8, not by 0.2.", "Write the multiplier, then the power."]],
  },
  "y12-u12-l4": {
    teach: [
      ["The definition", ["logₐ b = c means a^c = b. So log₂ 8 = 3 because 2³ = 8.", "log₁₀ 1000 = 3, and log₅ 1 = 0 because 5⁰ = 1."], "logₐ b is the power of a that gives b."],
      ["Using it to solve", ["To solve 2ˣ = 32, write log₂ 32 = x, so x = 5. This is the main use of logs: finding a power."], "Logs find the unknown power."],
    ],
    ex: [["Solve 3ˣ = 81.", ["x = log₃ 81", "81 = 3⁴"], "x = 4"]],
    mis: [["Confusing log₂ 8 with 8 ÷ 2.", "A log gives a power, not a division.", "Ask: what power of the base gives this number?"]],
  },
  "y12-u12-l5": {
    teach: [
      ["The three laws", ["logₐ(xy) = logₐx + logₐy, logₐ(x/y) = logₐx − logₐy, and logₐ(xⁿ) = n logₐx. They come from the index laws, because multiplying adds the powers.", "log 50 + log 2 = log 100 = 2."], "Products add, quotients subtract, powers multiply."],
      ["Combining logs", ["Use the laws to write several logs as one. Then simplify the answer. A common goal is to get a single log or a number."], "Combine logs into one."],
    ],
    ex: [["Simplify log₂ 8 + log₂ 4 − log₂ 2.", ["3 + 2 − 1"], "4"]],
    mis: [["Writing log(x + y) = log x + log y.", "The product law applies to logs of products, not sums.", "Only use the laws for products, quotients and powers."]],
  },
  "y12-u12-l6": {
    teach: [
      ["Unknown in the power", ["To solve 3ˣ = 20, take logs of both sides: x log 3 = log 20, so x = log 20/log 3 ≈ 2.73.", "Any base works for the logs on a calculator."], "Take logs of both sides."],
      ["Log equations", ["To solve log₂(x) = 5, rewrite as x = 2⁵ = 32. To solve log(x + 1) = 2, rewrite as x + 1 = 10² = 100, so x = 99."], "Rewrite a log equation as a power."],
    ],
    ex: [["Solve 2ˣ = 10 to 2 d.p.", ["x = log 10/log 2", "≈ 3.32"], "x ≈ 3.32"]],
    mis: [["Dividing the log instead of logging both sides.", "log(20/3) is not log 20/log 3.", "Write each step carefully."]],
  },
  "y12-u12-l7": {
    teach: [
      ["The natural log", ["ln x means logₑ x, where e ≈ 2.718. So ln e = 1 and ln(eᵏ) = k.", "ln is the inverse of eˣ: e^(ln x) = x and ln(eˣ) = x."], "ln and eˣ undo each other."],
      ["Using it", ["Use ln to solve equations like eˣ = 5, giving x = ln 5 ≈ 1.61."], "Use ln to find the power of e."],
    ],
    ex: [["Solve e^(2x) = 7.", ["2x = ln 7", "x = ½ ln 7"], "x ≈ 0.97"]],
    mis: [["Taking ln of the terms instead of the whole side.", "ln(a + b) is not ln a + ln b.", "Take ln of the whole equation."]],
  },
  "y12-u12-l8": {
    teach: [
      ["Linearising", ["For y = a bˣ, take logs: log y = log a + x log b. This is a straight line in x and log y, with gradient log b and intercept log a.", "So plotting log y against x gives a straight line, which lets you find a and b from the gradient and intercept."], "Log both sides to get a straight line."],
      ["Finding the constants", ["Use two data points to find a and b. If y = 2 at x = 0, then a = 2. If y = 6 at x = 1, then 2b = 6, so b = 3."], "Use the data points to find a and b."],
    ],
    ex: [["Data gives y = a bˣ with y = 5 at x = 0 and y = 15 at x = 1. Find a and b.", ["a = 5", "5b = 15"], "a = 5, b = 3"]],
    mis: [["Plotting y against x and expecting a straight line.", "Only log y against x gives a straight line for an exponential model.", "Take logs of y first."]],
  },
};
