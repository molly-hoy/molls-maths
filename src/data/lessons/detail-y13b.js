/* ==========================================================================
   Going deeper: Year 13 Pure, Part B (Units 7–12, 21)
   Extra teaching, one more worked example and one more common mistake for
   each lesson, added after the short teaching in y13-b.js by addDetail().
   ========================================================================== */

export const Y13B_DETAIL = {
  /* ================== Unit 7: Trigonometric identities and equations ================== */
  "y13-u7-l1": {
    teach: [
      ["Why the formulae are useful", ["sin(A + B) is not sin A + sin B. The formulae say exactly what it is: sin(A + B) = sin A cos B + cos A sin B.", "The same pattern gives cos(A − B) = cos A cos B + sin A sin B. Notice the sign flips for cos."], "Sin keeps its sign; cos flips it."],
      ["Using them for exact values", ["sin 75° = sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30° = (√2/2)(√3/2) + (√2/2)(½) = (√6 + √2)/4."], "Split the angle into two known ones."],
    ],
    ex: [["Find the exact value of cos 15°, using 15° = 45° − 30°.", ["cos 45° cos 30° + sin 45° sin 30°", "= (√2/2)(√3/2) + (√2/2)(½)"], "(√6 + √2)/4"]],
    mis: [["Writing sin(A + B) = sin A + sin B.", "The sine of a sum is not the sum of the sines.", "Use the formula, then check with a value such as A = B = 30°."]],
  },
  "y13-u7-l2": {
    teach: [
      ["Right-angled triangles", ["If sin A = 3/5 and cos B = 5/13 with A and B acute, draw the triangles to find cos A = 4/5 and sin B = 12/13. Then use the formulae on A + B."], "Draw the triangles to get the values."],
      ["Solving equations", ["Rearrange to get a single trig function, then use the addition formula to expand. Solve the resulting equation over the required range."], "Expand first, then solve."],
    ],
    ex: [["Given sin A = 3/5 and cos B = 5/13 (both acute), find sin(A + B).", ["cos A = 4/5, sin B = 12/13", "sin A cos B + cos A sin B = (3/5)(5/13) + (4/5)(12/13)"], "63/65"]],
    mis: [["Using the wrong sign for the second triangle.", "The sign depends on the quadrant of the angle.", "Check which quadrant each angle is in."]],
  },
  "y13-u7-l3": {
    teach: [
      ["Three forms of cos 2A", ["cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A. Choose the form that matches what you know."], "Pick the form that uses what you know."],
      ["Worked check", ["If sin A = 3/5 and A is acute, then cos A = 4/5. sin 2A = 2 × 3/5 × 4/5 = 24/25 and cos 2A = 16/25 − 9/25 = 7/25."], "Check with a right-angled triangle."],
    ],
    ex: [["Given cos A = 1/3, find cos 2A.", ["2cos²A − 1 = 2(1/9) − 1"], "−7/9"]],
    mis: [["Writing cos 2A = 2 cos A.", "The double angle formula is not a multiple of the function.", "Use one of the three forms of cos 2A."]],
  },
  "y13-u7-l4": {
    teach: [
      ["Matching the double angle", ["If the equation has sin 2x and cos x, write sin 2x = 2 sin x cos x. This gives one common factor to solve with."], "Write everything in the same angle."],
      ["Factorise and solve", ["For sin 2x = cos x: 2 sin x cos x − cos x = 0, so cos x (2 sin x − 1) = 0. Then cos x = 0 or sin x = ½."], "Factorise, then solve each factor."],
    ],
    ex: [["Solve 2 sin x cos x = sin x for 0° ≤ x < 360°.", ["sin x (2 cos x − 1) = 0", "sin x = 0 or cos x = ½"], "x = 0°, 60°, 180°, 300°"]],
    mis: [["Dividing both sides by sin x and losing the solutions where sin x = 0.", "Dividing removes solutions; factorise instead.", "Factorise rather than divide."]],
  },
  "y13-u7-l5": {
    teach: [
      ["The wave form", ["a cos x + b sin x = R cos(x − α), where R = √(a² + b²) and tan α = b/a. R is the amplitude and α is the phase shift.", "Expand R cos(x − α) = R cos x cos α + R sin x sin α, then compare with a cos x + b sin x."], "Compare coefficients to find R and α."],
      ["Maximum and minimum", ["The maximum value is R and the minimum is −R. These occur when x − α = 0 and x − α = 180°."], "The maximum is R."],
    ],
    ex: [["Write 3 cos x + 4 sin x in the form R cos(x − α) and state its maximum.", ["R = √(9 + 16) = 5", "tan α = 4/3, α = 53.1°"], "5 cos(x − 53.1°); maximum 5"]],
    mis: [["Taking R = a + b.", "R is the square root of a² + b², not the sum.", "Use Pythagoras for R."]],
  },
  "y13-u7-l6": {
    teach: [
      ["Working from one side", ["Start from the more complicated side and simplify it until it matches the other side. Don't move terms across the equals sign in a proof."], "Work on one side only."],
      ["Example", ["Show that sin x/(1 + cos x) + (1 + cos x)/sin x = 2/sin x. Combine over a common denominator: (sin²x + (1 + cos x)²)/(sin x (1 + cos x)). The top becomes 2 + 2cos x, which cancels to 2/sin x."], "Combine, simplify and match."],
    ],
    ex: [["Show that (1 − sin²x)/cos x = cos x.", ["1 − sin²x = cos²x", "cos²x/cos x"], "cos x"]],
    mis: [["Moving terms across the equals sign in a proof.", "This assumes what you want to prove.", "Only work on one side."]],
  },
  "y13-u7-l7": {
    teach: [
      ["Reading the model", ["A model h = a + b sin(ct) describes a wave: a is the middle value, b the amplitude and c the rate. The period is 360°/c, or 2π/c in radians.", "For h = 4 + 2 sin(30t), the highest value is 6, the lowest is 2, and the period is 12."], "The middle value and amplitude give the range."],
      ["Using the model", ["Substitute the time to find the height, or solve for the times when the height has a given value."], "Solve for time when needed."],
    ],
    ex: [["The model h = 4 + 2 sin(30t) has h = 5. Find the first value of t.", ["2 sin(30t) = 1", "sin(30t) = ½, so 30t = 30°"], "t = 1"]],
    mis: [["Taking the amplitude as the highest value.", "The highest value is the middle value plus the amplitude.", "Add the middle value and amplitude."]],
  },

  /* ================== Unit 8: Parametric equations ================== */
  "y13-u8-l1": {
    teach: [
      ["Parameters", ["x = f(t) and y = g(t) give the position of a point in terms of the parameter t. The parameter often represents time but needn't.", "For x = t + 1 and y = t², find y in terms of x: t = x − 1, so y = (x − 1)²."], "Rearrange one equation for t and substitute."],
      ["Checking the curve", ["Choose a few values of t, find the points and check they lie on the curve you found."], "Check with a point."],
    ],
    ex: [["Eliminate t from x = 2t, y = t² + 1.", ["t = x/2", "y = x²/4 + 1"], "y = x²/4 + 1"]],
    mis: [["Forgetting to substitute t in both equations.", "Eliminating t needs the substitution in y as well.", "Rewrite the whole y equation with t replaced."]],
  },
  "y13-u8-l2": {
    teach: [
      ["Identity choice", ["If x = a cos t and y = b sin t, then cos²t + sin²t = 1 gives (x/a)² + (y/b)² = 1, an ellipse.", "For x = 3 cos t and y = 2 sin t, (x/3)² + (y/2)² = 1."], "Use sin²t + cos²t = 1 for sin and cos."],
      ["Other identities", ["If the parameter appears as 2t, use the double angle formula. If it appears as tan t, use 1 + tan²t = sec²t."], "Match the identity to the parameter."],
    ],
    ex: [["Eliminate t from x = 2 cos t, y = 2 sin t.", ["cos²t + sin²t = 1", "(x/2)² + (y/2)² = 1"], "x² + y² = 4"]],
    mis: [["Using the wrong identity for the coefficient.", "Divide by the coefficient before squaring.", "Check the equation with a point."]],
  },
  "y13-u8-l3": {
    teach: [
      ["Plotting a table", ["Choose values of t, work out x and y for each, then plot the points and join them with a smooth curve. The direction of increasing t is the direction of travel."], "Table of values, then plot."],
      ["Example", ["For x = t², y = t: t = −1 gives (1, −1), t = 0 gives (0, 0) and t = 1 gives (1, 1). The curve is part of the parabola x = y², opening to the right."], "Plot several values, then join."],
    ],
    ex: [["For x = t², y = t, find the point for t = 2.", ["x = 2² = 4", "y = 2"], "(4, 2)"]],
    mis: [["Joining the points with straight lines when the curve is smooth.", "A parametric curve is usually a smooth curve.", "Plot enough points to see the shape."]],
  },
  "y13-u8-l4": {
    teach: [
      ["Substitute into the line", ["Write the parametric x and y in the equation of the line, solve for t, then find the point of intersection.", "For x = t + 1, y = t² and y = 2x: t² = 2(t + 1), so t² − 2t − 2 = 0, giving t = 1 ± √3."], "Substitute, solve for t, then find the point."],
      ["Axes", ["Meeting the x-axis means y = 0, so solve g(t) = 0. Meeting the y-axis means x = 0."], "Set y = 0 for the x-axis."],
    ],
    ex: [["Find where x = t, y = t² − 4 meets the x-axis.", ["y = 0: t² − 4 = 0", "t = ±2, x = t"], "(2, 0) and (−2, 0)"]],
    mis: [["Setting x = 0 to find where the curve meets the x-axis.", "On the x-axis, y = 0.", "Use the right coordinate equal to zero."]],
  },
  "y13-u8-l5": {
    teach: [
      ["Projectile model", ["A projectile model has x = Ut (horizontal distance) and y = Vt − ½gt² (height), where t is time. With g = 9.8 m s⁻², y = 15t − 4.9t².", "The horizontal and vertical motion are separate, linked only by time."], "x is the horizontal distance, y the height."],
      ["Finding key features", ["The maximum height occurs when dy/dt = 0. Landing occurs when y = 0 again. Use these to answer questions about height and range."], "Use dy/dt = 0 for the highest point."],
    ],
    ex: [["Using y = 15t − 4.9t², find when the object lands.", ["y = 0: t(15 − 4.9t) = 0", "t = 15/4.9"], "t ≈ 3.06 s"]],
    mis: [["Confusing x and y in the model.", "x is the horizontal distance, and y is the height.", "Label each equation first."]],
  },

  /* ================== Unit 9: Differentiation ================== */
  "y13-u9-l1": {
    teach: [
      ["The derivatives", ["d/dx(sin x) = cos x and d/dx(cos x) = −sin x. These work only when x is in radians.", "For y = sin x + cos x, dy/dx = cos x − sin x. At x = 0, dy/dx = 1."], "Use radians."],
      ["Using them", ["Combine with the other rules for more complicated functions. The sign of cos's derivative is negative."], "Remember the minus sign for cos."],
    ],
    ex: [["Differentiate y = 3 sin x − 2 cos x.", ["d/dx(sin x) = cos x", "d/dx(cos x) = −sin x, so −2 cos x gives +2 sin x"], "dy/dx = 3 cos x + 2 sin x"]],
    mis: [["Using degrees with the derivative of sin x.", "The derivative cos x only holds in radians.", "Convert to radians first."]],
  },
  "y13-u9-l2": {
    teach: [
      ["The exponential and log rules", ["d/dx(eᵏˣ) = k eᵏˣ, and d/dx(ln x) = 1/x for x > 0.", "For aˣ, write aˣ = eˣ ln a, so d/dx(aˣ) = aˣ ln a."], "Use ln a for other bases."],
      ["Example", ["d/dx(2ˣ) = 2ˣ ln 2, and d/dx(e³ˣ) = 3e³ˣ."], "Multiply by the derivative of the power."],
    ],
    ex: [["Differentiate y = 3ˣ.", ["3ˣ ln 3"], "dy/dx = 3ˣ ln 3"]],
    mis: [["Differentiating aˣ as x aˣ⁻¹.", "This is the power rule, which only applies to xⁿ, not aˣ.", "The exponential is the variable in the power."]],
  },
  "y13-u9-l3": {
    teach: [
      ["The rule", ["For y = f(g(x)), let u = g(x). Then dy/dx = dy/du × du/dx. Differentiate the outside function, then multiply by the derivative of the inside.", "For y = (3x + 1)⁵: outside gives 5u⁴, inside gives 3, so dy/dx = 15(3x + 1)⁴."], "Outside, times inside."],
      ["More examples", ["For y = sin(2x), dy/dx = 2 cos 2x. For y = e^(x²), dy/dx = 2x e^(x²)."], "Multiply by the inside derivative every time."],
    ],
    ex: [["Differentiate y = ln(x² + 1).", ["Outside: 1/u", "Inside: 2x"], "dy/dx = 2x/(x² + 1)"]],
    mis: [["Forgetting to multiply by the inside derivative.", "The chain rule always includes the inside derivative.", "Write the inside derivative as a separate step."]],
  },
  "y13-u9-l4": {
    teach: [
      ["The rule", ["For y = uv, dy/dx = u dv/dx + v du/dx. Use it when the function is a product of two functions of x.", "For y = x² sin x: dy/dx = x² cos x + 2x sin x."], "Differentiate each part, one at a time."],
      ["Example", ["For y = x e^x: dy/dx = x e^x + e^x = e^x(x + 1)."], "Factorise at the end."],
    ],
    ex: [["Differentiate y = x sin x.", ["u = x, v = sin x", "dy/dx = x cos x + sin x"], "x cos x + sin x"]],
    mis: [["Multiplying the derivatives of the two parts.", "The product rule adds two terms; it does not multiply the derivatives.", "Write u dv/dx + v du/dx."]],
  },
  "y13-u9-l5": {
    teach: [
      ["The rule", ["For y = u/v, dy/dx = (v du/dx − u dv/dx)/v². Remember the order: v du/dx first, then minus u dv/dx.", "For y = (3x − 1)/(x + 2): dy/dx = (3(x + 2) − (3x − 1))/(x + 2)² = 7/(x + 2)²."], "Watch the order and the minus sign."],
      ["When to simplify", ["If the bottom is a simple power, rewrite the function as a product and use the product rule instead."], "Sometimes the product rule is easier."],
    ],
    ex: [["Differentiate y = x²/(x + 1).", ["u = x², v = x + 1", "(2x(x + 1) − x²)/(x + 1)²"], "(x² + 2x)/(x + 1)²"]],
    mis: [["Reversing the order in the numerator.", "The numerator is v du/dx − u dv/dx.", "Write the formula down before substituting."]],
  },
  "y13-u9-l6": {
    teach: [
      ["Deriving d/dx(tan x)", ["tan x = sin x/cos x. Using the quotient rule: (cos x cos x − sin x(−sin x))/cos²x = (cos²x + sin²x)/cos²x = 1/cos²x = sec²x."], "The quotient rule gives sec²x."],
      ["The others", ["d/dx(sec x) = sec x tan x, and d/dx(cot x) = −cosec²x, and d/dx(cosec x) = −cosec x cot x."], "Learn the pattern for each."],
    ],
    ex: [["Differentiate y = sec x.", ["sec x = 1/cos x", "Derivative: sin x / cos²x"], "dy/dx = sec x tan x"]],
    mis: [["Writing d/dx(cot x) = cosec²x without the minus sign.", "The derivative of cot x is negative.", "Check the sign by using cot x = cos x/sin x."]],
  },
  "y13-u9-l7": {
    teach: [
      ["The method", ["Find dx/dt and dy/dt separately, then divide: dy/dx = (dy/dt)/(dx/dt).", "For x = t², y = t³: dy/dx = 3t²/(2t) = 3t/2."], "Differentiate each with respect to t, then divide."],
      ["Second derivative", ["To find d²y/dx², differentiate dy/dx with respect to t, then divide by dx/dt again."], "Repeat the division by dx/dt."],
    ],
    ex: [["For x = 2t, y = t², find dy/dx.", ["dx/dt = 2, dy/dt = 2t", "2t/2"], "dy/dx = t"]],
    mis: [["Multiplying dy/dt and dx/dt instead of dividing.", "The chain rule with parameters divides.", "Write dy/dx = (dy/dt)/(dx/dt)."]],
  },
  "y13-u9-l8": {
    teach: [
      ["Implicit differentiation", ["When x and y are mixed, differentiate each term with respect to x. Terms in y become dy/dx multiplied by the derivative of the y term.", "For x² + y² = 25: 2x + 2y dy/dx = 0, so dy/dx = −x/y."], "Multiply y terms by dy/dx."],
      ["Products of x and y", ["Use the product rule for terms like xy: d/dx(xy) = y + x dy/dx."], "Use the product rule for xy."],
    ],
    ex: [["Find dy/dx for xy = 4.", ["d/dx(xy) = y + x dy/dx = 0", "dy/dx = −y/x"], "dy/dx = −y/x"]],
    mis: [["Leaving out dy/dx when differentiating a y term.", "A y term always gives dy/dx after differentiating.", "Write dy/dx next to each y term."]],
  },
  "y13-u9-l9": {
    teach: [
      ["Concavity", ["If d²y/dx² > 0, the curve is concave up (a U shape). If d²y/dx² < 0, it is concave down (an upside-down U).", "For y = x³ − 3x²: d²y/dx² = 6x − 6, so the curve is concave up for x > 1 and down for x < 1."], "Sign of d²y/dx² gives concavity."],
      ["Points of inflection", ["A point of inflection is where the concavity changes sign, so d²y/dx² = 0 and changes sign. Check the sign either side."], "Check d²y/dx² changes sign."],
    ],
    ex: [["Find where y = x³ − 3x² has a point of inflection.", ["d²y/dx² = 6x − 6 = 0", "Sign changes at x = 1"], "Point of inflection at x = 1"]],
    mis: [["Calling every point where d²y/dx² = 0 a point of inflection.", "The second derivative must change sign.", "Test either side of the point."]],
  },
  "y13-u9-l10": {
    teach: [
      ["Connecting rates", ["Use the chain rule to connect rates: dA/dt = dA/dr × dr/dt. The rates in the question give you the link.", "For A = πr², dA/dt = 2πr dr/dt."], "Multiply the rate of each step."],
      ["Example", ["A circle radius grows at 0.2 cm s⁻¹ when r = 5 cm. Then dA/dt = 2π × 5 × 0.2 = 2π cm² s⁻¹."], "Substitute the values after the rule."],
    ],
    ex: [["A cube has side x growing at 2 cm s⁻¹. Find dV/dt when x = 3 (V = x³).", ["dV/dt = 3x² × dx/dt", "3 × 9 × 2"], "54 cm³ s⁻¹"]],
    mis: [["Substituting the value before differentiating.", "Differentiate with respect to t first, then substitute.", "Find the general rate, then substitute."]],
  },

  /* ================== Unit 10: Numerical methods ================== */
  "y13-u10-l1": {
    teach: [
      ["Checking the interval", ["If f is continuous on [a, b] and f(a) and f(b) have opposite signs, there is at least one root between a and b.", "For f(x) = x³ − 2x − 5: f(2) = −1 and f(3) = 16, so there is a root between 2 and 3."], "Opposite signs and continuity."],
      ["Limits of the method", ["A sign change can miss roots where the function touches the axis, and it doesn't work across a break such as an asymptote."], "Continuity is required."],
    ],
    ex: [["Show that f(x) = x² − x − 3 has a root between 2 and 3.", ["f(2) = −1", "f(3) = 3"], "Sign change, so a root lies between 2 and 3"]],
    mis: [["Using a sign change to find a root with a discontinuity.", "A jump can change sign without a root.", "State that f is continuous first."]],
  },
  "y13-u10-l2": {
    teach: [
      ["Rearranging", ["Rearrange f(x) = 0 into x = g(x). Different rearrangements give different iterations, and only some converge.", "For x³ − x − 1 = 0, use x = ∛(x + 1)."], "Choose a rearrangement that converges."],
      ["Testing convergence", ["Calculate several values. If they settle down, the iteration converges. If they spread out, it diverges."], "Look for values settling down."],
    ],
    ex: [["Using xₙ₊₁ = ∛(xₙ + 1) with x₀ = 1, find x₁ to 3 d.p.", ["x₁ = ∛(1 + 1) = ∛2"], "1.260"]],
    mis: [["Stopping too early.", "Iterate until consecutive values agree to the required accuracy.", "Check the values to the stated accuracy."]],
  },
  "y13-u10-l3": {
    teach: [
      ["The formula", ["xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ) uses the tangent at xₙ to find the next estimate. Converging usually takes very few steps.", "For f(x) = x² − 2 with x₀ = 1.5: x₁ = 1.5 − 0.25/3 = 1.4167, and x₂ = 1.4142 (to 4 d.p.)."], "Each step uses the tangent."],
      ["Choosing the starting value", ["Start close to the root. The method can fail if the tangent is nearly flat or the start is far away."], "Start close to the root."],
    ],
    ex: [["For f(x) = x² − 2 and x₀ = 1.5, find x₁ to 3 d.p.", ["f(1.5) = 0.25, f′(1.5) = 3", "x₁ = 1.5 − 0.25/3"], "1.417"]],
    mis: [["Using f(xₙ) instead of f′(xₙ) in the denominator.", "The denominator is the derivative.", "Write both f and f′ before substituting."]],
  },
  "y13-u10-l4": {
    teach: [
      ["Proving an interval", ["To prove a root lies to a given accuracy, show a sign change of f over an interval. For f(x) = x³ − x − 1, f(1.32) < 0 and f(1.33) > 0.", "So the root lies between 1.32 and 1.33 (its true value is 1.3247…)."], "Show a sign change over the interval."],
      ["Judging the answer", ["Mention when the answer is good enough, and how the iteration or the interval supports it."], "State the accuracy you reached."],
    ],
    ex: [["Show that the root of x³ − x − 1 = 0 lies between 1.32 and 1.33.", ["f(1.32) ≈ −0.020", "f(1.33) ≈ 0.023"], "Sign change, so the root lies in (1.32, 1.33)"]],
    mis: [["Giving an answer without showing its accuracy.", "The examiner needs the interval or the number of agreeing decimal places.", "State the interval or accuracy."]],
  },

  /* ================== Unit 11: Integration ================== */
  "y13-u11-l1": {
    teach: [
      ["The standard integrals", ["∫ cos x dx = sin x + c, ∫ sec²x dx = tan x + c, ∫ eˣ dx = eˣ + c, and ∫ (1/x) dx = ln|x| + c.", "These come from reversing the derivatives you know."], "Reverse each derivative."],
      ["Using them", ["Use the standard integrals on each term, adding + c at the end. For ∫ 3 cos x dx = 3 sin x + c."], "Constants stay in front."],
    ],
    ex: [["Integrate 4 sec²x.", ["4 × tan x"], "4 tan x + c"]],
    mis: [["Integrating 1/x as x⁰/0.", "The integral of 1/x is ln|x|, not a power.", "Use ln|x| for 1/x."]],
  },
  "y13-u11-l2": {
    teach: [
      ["Linear inside", ["If the inside is ax + b, integrate as normal, then divide by a. ∫ (2x + 1)⁴ dx = (2x + 1)⁵/10 + c.", "The 10 comes from dividing by 2 (the inside derivative) and by 5 (the new power)."], "Divide by the inside derivative."],
      ["Exponentials", ["∫ e^(3x − 1) dx = e^(3x − 1)/3 + c, because the derivative of 3x − 1 is 3."], "Divide by a for e^(ax + b)."],
    ],
    ex: [["Integrate (2x + 3)³.", ["(2x + 3)⁴/(4 × 2)"], "(2x + 3)⁴/8 + c"]],
    mis: [["Forgetting to divide by a.", "The inside derivative a changes the result.", "Always check the inside derivative."]],
  },
  "y13-u11-l3": {
    teach: [
      ["Using the identity", ["cos²x = ½(1 + cos 2x) and sin²x = ½(1 − cos 2x) change a square into a form you can integrate.", "∫ sin²x dx = ∫ ½(1 − cos 2x) dx = ½x − ¼ sin 2x + c."], "Replace the square with an identity."],
      ["Checking", ["Differentiate your answer to check you get sin²x back."], "Differentiate to check."],
    ],
    ex: [["Integrate cos²x.", ["½(1 + cos 2x)", "½x + ¼ sin 2x"], "½x + ¼ sin 2x + c"]],
    mis: [["Integrating cos²x as (1/3) cos³x.", "Squares of trig functions don't integrate that way.", "Use the identity first."]],
  },
  "y13-u11-l4": {
    teach: [
      ["Top is the derivative", ["If the numerator is the derivative of the denominator, the integral is ln|denominator| + c. For ∫ 2x/(x² + 1) dx = ln(x² + 1) + c.", "The same idea gives ∫ tan x dx = −ln|cos x| + c, because the derivative of cos x is −sin x."], "Derivative on top gives ln."],
      ["Scaling", ["If the top is a multiple of the derivative, divide by that multiple."], "Adjust by the multiple."],
    ],
    ex: [["Integrate sin x/cos x.", ["Top = −(derivative of cos x)"], "−ln|cos x| + c"]],
    mis: [["Forgetting the minus sign for the top being the negative of the derivative.", "The derivative of cos x is −sin x, so the sign matters.", "Check by differentiating."]],
  },
  "y13-u11-l5": {
    teach: [
      ["Changing the limits", ["For a definite integral, change the limits to match the new variable, rather than changing back to x.", "∫₀¹ 2x(x² + 1) dx with u = x² + 1 gives ∫₁² u du = [u²/2]₁² = 1.5."], "Change the limits with the substitution."],
      ["Indefinite example", ["∫ 2x(x² + 5)² dx: let u = x² + 5, du = 2x dx, so ∫ u² du = u³/3 + c = (x² + 5)³/3 + c."], "Write u and du in terms of x."],
    ],
    ex: [["Find ∫ x(x² + 1)³ dx.", ["u = x² + 1, du = 2x dx", "½∫u³ du"], "(x² + 1)⁴/8 + c"]],
    mis: [["Not changing the limits, or not converting dx to du.", "The integral must be in terms of the new variable.", "Write dx in terms of du."]],
  },
  "y13-u11-l6": {
    teach: [
      ["The formula", ["∫ u (dv/dx) dx = uv − ∫ v (du/dx) dx. Pick u as the part that gets simpler when differentiated, and dv/dx as the part you can integrate.", "For ∫ x eˣ dx, take u = x and dv/dx = eˣ."], "Choose u to simplify when differentiated."],
      ["Example", ["∫ x eˣ dx = x eˣ − ∫ eˣ dx = x eˣ − eˣ + c."], "Check by differentiating."],
    ],
    ex: [["Integrate x sin x.", ["u = x, dv/dx = sin x, v = −cos x", "= −x cos x + ∫cos x dx"], "−x cos x + sin x + c"]],
    mis: [["Choosing the wrong u, so the new integral is harder.", "Pick u so it simplifies when differentiated.", "Check the new integral is simpler."]],
  },
  "y13-u11-l7": {
    teach: [
      ["Splitting", ["Split the fraction into partial fractions, then integrate each part. Each simple fraction A/(x + a) integrates to A ln|x + a|.", "For ∫ (3x + 5)/((x + 1)(x + 3)) dx: the partial fractions are 1/(x + 1) + 2/(x + 3), giving ln|x + 1| + 2 ln|x + 3| + c."], "Integrate each piece to a log."],
      ["Degree check", ["If the top's degree is too high, divide first."], "Divide first if improper."],
    ],
    ex: [["Integrate 1/(x² − 1).", ["1/(x² − 1) = ½(1/(x − 1) − 1/(x + 1))"], "½ ln|(x − 1)/(x + 1)| + c"]],
    mis: [["Integrating 1/(x − 1) + 1/(x + 1) without the ½.", "The partial fraction coefficients must be included.", "Check the coefficients by recombining."]],
  },
  "y13-u11-l8": {
    teach: [
      ["Area between curves", ["The area between y = f(x) and y = g(x) from a to b, with f above g, is ∫ₐᵇ (f − g) dx. Find the limits from where the curves meet."], "Integrate top minus bottom."],
      ["Choosing a method", ["Look at the form of the integrand and choose the method that fits: substitution, parts, partial fractions or a standard integral."], "Match the method to the form."],
    ],
    ex: [["Find the area between y = x and y = x² for 0 ≤ x ≤ 1.", ["∫₀¹ (x − x²) dx = [x²/2 − x³/3]₀¹"], "1/6"]],
    mis: [["Using the wrong curve as the top.", "Check which curve is above the other on the interval.", "Test a value between the limits."]],
  },
  "y13-u11-l9": {
    teach: [
      ["The rule", ["∫ₐᵇ f(x) dx ≈ ½h[y₀ + 2(y₁ + … + yₙ₋₁) + yₙ], where h is the strip width and y₀ … yₙ are the values at the ends and between.", "For ∫₀² x² dx with h = 1: ½ × 1 × (0 + 2 × 1 + 4) = 3."], "Half the width times the bracket."],
      ["Accuracy", ["The trapezium rule overestimates when the curve is concave up, and underestimates when it is concave down. More strips give a better estimate."], "More strips give a better estimate."],
    ],
    ex: [["Use the trapezium rule with 2 strips to estimate ∫₀² x² dx, and state whether it overestimates.", ["3 from the working above", "x² is concave up"], "3, an overestimate, since the exact value is 8/3"]],
    mis: [["Mixing up the number of strips and the number of values.", "With n strips there are n + 1 values.", "List the values before you start."]],
  },
  "y13-u11-l10": {
    teach: [
      ["Separating variables", ["Write dy/dx = f(x)g(y) as ∫ 1/g(y) dy = ∫ f(x) dx. Integrate both sides, then add one constant.", "For dy/dx = 2xy: ∫ 1/y dy = ∫ 2x dx, so ln|y| = x² + c, giving y = Ae^(x²)."], "Get all the y on one side."],
      ["Initial conditions", ["Use a given point to find the constant. For dy/dx = y with y(0) = 2, y = 2eˣ."], "Use the start to find A."],
    ],
    ex: [["Solve dy/dx = 3y with y(0) = 4.", ["∫ 1/y dy = ∫ 3 dx", "ln y = 3x + c"], "y = 4e^(3x)"]],
    mis: [["Forgetting the constant or writing it in the wrong place.", "Only one constant is needed after both integrals.", "Use the initial condition to find it."]],
  },
  "y13-u11-l11": {
    teach: [
      ["Forming the equation", ["Growth or decay: the rate of change is proportional to the amount, so dN/dt = kN. Cooling: the rate is proportional to the difference from the room temperature.", "Growth at 10% per year: dN/dt = 0.1N, so N = N₀e^(0.1t)."], "Rate proportional to the amount."],
      ["Solving", ["Separate the variables and integrate. Use the starting value to find the constant, then answer the question in context."], "Solve, then interpret."],
    ],
    ex: [["A population grows at rate dP/dt = 0.05P with P(0) = 500. Find P(t).", ["P = 500e^(0.05t)"], "P = 500e^(0.05t)"]],
    mis: [["Forming the model with the wrong sign for decay.", "Decay has a negative constant in dN/dt = −kN.", "Check the sign against the situation."]],
  },
  "y13-u11-l12": {
    teach: [
      ["The definition", ["A definite integral is the limit of a sum of thin rectangles: ∫ₐᵇ f(x) dx = lim Σ f(xᵢ) Δx as the widths go to zero.", "This is the link between area and the integral notation."], "Rectangles get thinner in the limit."],
      ["Estimating with rectangles", ["Using right-hand rectangles of width 1 to estimate ∫₀² x dx gives 1 × (1 + 2) = 3, which overestimates the true value of 2."], "Rectangles estimate the area."],
    ],
    ex: [["Use left-hand rectangles of width 1 to estimate ∫₀² x dx.", ["Heights at x = 0 and x = 1: 0 and 1", "Sum = 0 + 1"], "1, an underestimate of 2"]],
    mis: [["Confusing right and left rectangles.", "The left rectangle uses the left end of each strip.", "Label the end you use."]],
  },

  /* ================== Unit 12: Vectors in three dimensions ================== */
  "y13-u12-l1": {
    teach: [
      ["3D coordinates", ["A point (x, y, z) has an x, y and z coordinate. The z-axis points up, out of the page.", "The distance between (1, 2, 3) and (4, 6, 15) is √(9 + 16 + 144) = 13."], "Pythagoras in three dimensions."],
      ["Drawing", ["Draw a 3D box to show the points, using dashed lines for hidden edges."], "A box helps you see the shape."],
    ],
    ex: [["Find the distance from the origin to (2, 3, 6).", ["√(4 + 9 + 36)", "√49"], "7"]],
    mis: [["Using 2D Pythagoras without the z term.", "Include z² in the sum of squares.", "Add all three squared differences."]],
  },
  "y13-u12-l2": {
    teach: [
      ["Components", ["A vector in 3D is ai + bj + ck. Its magnitude is √(a² + b² + c²).", "For a = 2i + 3j + 6k, |a| = √(4 + 9 + 36) = 7."], "Magnitude adds three squares."],
      ["Angles", ["The angle between two vectors satisfies cos θ = (a·b)/(|a||b|), where a·b is the dot product: the sum of products of the components."], "Use the dot product for angles."],
    ],
    ex: [["Find the angle between (1, 0, 0) and (1, 1, 0).", ["a·b = 1", "|a| = 1, |b| = √2"], "cos θ = 1/√2, so θ = 45°"]],
    mis: [["Multiplying the vectors instead of using the dot product for angles.", "The dot product gives the scalar needed for the angle.", "Write a·b as the sum of products."]],
  },
  "y13-u12-l3": {
    teach: [
      ["Midpoints and ratios", ["The midpoint of A and B is (a + b)/2. A point dividing AB in the ratio 1:2 is (2a + b)/3, nearer to a.", "For A(0, 0, 0) and B(3, 6, 9), the point in ratio 1:2 from A is (1, 2, 3)."], "Use the weights for the ratio."],
      ["Parallel lines", ["Two lines are parallel if their direction vectors are multiples of each other."], "Check for a scalar multiple."],
    ],
    ex: [["Are the lines with directions (1, 2, 3) and (2, 4, 6) parallel?", ["(2, 4, 6) = 2 × (1, 2, 3)"], "Yes, they are parallel"]],
    mis: [["Checking only one component when testing for parallel.", "All three components must be in the same ratio.", "Check every component."]],
  },
  "y13-u12-l4": {
    teach: [
      ["Forces in 3D", ["Add the forces as vectors, then use F = ma. Divide the resultant by the mass to get the acceleration.", "Forces (2i + 3j + k) N and (−i + j + 2k) N act on a 2 kg object. The resultant is i + 4j + 3k, so a = 0.5i + 2j + 1.5k m s⁻²."], "Resultant first, then a = F/m."],
      ["Speed", ["The speed is the magnitude of the velocity vector, which is √(vx² + vy² + vz²)."], "Speed is the magnitude."],
    ],
    ex: [["Using the acceleration above, find its magnitude.", ["√(0.25 + 4 + 2.25)"], "√6.5 ≈ 2.55 m s⁻²"]],
    mis: [["Dividing the mass into each force instead of the resultant.", "Only the total force gives the acceleration.", "Find the resultant first."]],
  },

  /* ================== Unit 21: Problem solving and exam skills ================== */
  "y13-u21-l1": {
    teach: [
      ["A plan", ["Read the question twice. Identify the topic, write down what you know, and choose a method. Then solve and check your answer makes sense.", "Ask: which topic is this? What do I need to find? What information do I have?"], "Plan before calculating."],
      ["Choosing the method", ["If the question asks for a maximum, differentiate and set to zero. If it asks for an area, integrate. Match the topic to the method."], "Match the question to a method."],
    ],
    ex: [["A question asks for the maximum value of a function. What is the first step?", ["Think about what gives maximum points"], "Differentiate and set the derivative to zero"]],
    mis: [["Starting to calculate before deciding the method.", "A clear plan avoids wasted work.", "Write a one-line plan first."]],
  },
  "y13-u21-l2": {
    teach: [
      ["Writing a proof", ["A proof needs each step to follow from the one before, with a reason. End with a clear statement of what has been proved.", "Prove n² + n is always even: n(n + 1) is the product of two consecutive integers, one of which is even, so it is even."], "Each step has a reason."],
      ["Showing and proving", ["'Show that' means you must reach the given answer exactly. Don't start from the answer and work backwards without making the logic clear."], "Reach the given result from the start."],
    ],
    ex: [["Prove that the product of two consecutive integers is even.", ["n and n + 1", "One is even, so the product is even"], "Proved: one of n, n + 1 is even"]],
    mis: [["Stopping without a conclusion.", "The proof must end with a sentence stating what has been shown.", "Write a final sentence."]],
  },
  "y13-u21-l3": {
    teach: [
      ["Using the calculator", ["Use the solve or intersection functions to find roots of equations and points of intersection. Check your answer by substituting back.", "To find where y = x² meets y = 2x + 1, solve x² − 2x − 1 = 0 with the solver."], "Use the calculator to check."],
      ["Formula booklet", ["Know which formulae are in the booklet, and which you must learn. Use the booklet to check, but know how each formula works."], "Know what the booklet gives."],
    ],
    ex: [["Solve x² − 2x − 1 = 0 and give the answers to 2 d.p.", ["Use the calculator solver or the formula", "x = 1 ± √2"], "x = 2.41 or x = −0.41"]],
    mis: [["Giving rounded answers too early.", "Keep full accuracy until the final answer, then round.", "Store the exact value in your calculator."]],
  },
  "y13-u21-l4": {
    teach: [
      ["Command words", ["'Show that' means reach the given answer. 'Hence' means use the previous result. 'Prove' means give a logical argument. 'Determine' or 'find' means calculate the answer.", "Using the command word tells you the method and the level of detail."], "The command word tells you the method."],
      ["Recognising the topic", ["Mixed practice trains you to spot which topic a question tests from its words and the information given."], "Spot the topic from the wording."],
    ],
    ex: [["Part (a) shows that f(x) = 0 at x = 2. Part (b) says 'hence find the other roots'. What must you use in part (b)?", ["Use the result from part (a)"], "Use x = 2 to factorise and find the other roots"]],
    mis: [["Solving part (b) from scratch when 'hence' asks you to use part (a).", "'Hence' requires the previous result.", "Look for the result you have already found."]],
  },
};
