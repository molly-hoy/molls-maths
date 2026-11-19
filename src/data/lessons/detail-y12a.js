/* ==========================================================================
   Going deeper: Year 12 Pure, Part A (Units 1–6)
   Extra teaching, one more worked example and one more common mistake for
   each lesson, added after the short teaching in y12-a.js by addDetail().
   ========================================================================== */

export const Y12A_DETAIL = {
  /* ================== Unit 1: Algebraic methods ================== */
  "y12-u1-l1": {
    teach: [
      ["Multiplying and dividing powers", ["When the bases match, multiply by adding the powers: aᵐ × aⁿ = aᵐ⁺ⁿ. When dividing, subtract: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.", "For (3a²b)(4ab³): multiply the numbers (12), then add the powers of each letter, giving 12a³b⁴."], "Multiply numbers, add powers of the same letter."],
      ["Powers of brackets", ["(aᵐ)ⁿ = aᵐⁿ, so multiply the powers. Every part inside the bracket is raised to the power, including the number.", "(2x³y²)² = 2²x⁶y⁴ = 4x⁶y⁴. Also a⁰ = 1 for any non-zero a."], "The power outside applies to everything inside."],
    ],
    ex: [["Simplify (2x³y)(3x²y⁴) ÷ (6xy²).", ["Numbers: 2 × 3 ÷ 6 = 1", "x: 3 + 2 − 1 = 4", "y: 1 + 4 − 2 = 3"], "x⁴y³"]],
    mis: [["Adding powers when adding terms: x² + x² = x⁴.", "Index laws only apply to multiplying and dividing, not to adding.", "x² + x² = 2x²."]],
  },
  "y12-u1-l2": {
    teach: [
      ["Three brackets", ["Expand two brackets first, collect like terms, then multiply by the third bracket.", "(x + 2)(x − 3)(x + 1): (x + 2)(x − 3) = x² − x − 6, then (x² − x − 6)(x + 1) = x³ − 7x − 6."], "Expand in pairs, then collect."],
      ["Squaring a bracket", ["(a + b)² = a² + 2ab + b², not a² + b². The middle term is often the one lost.", "(2x − 5)² = 4x² − 20x + 25."], "Always write the middle term."],
    ],
    ex: [["Expand (x − 1)(2x + 3)(x + 2).", ["(x − 1)(2x + 3) = 2x² + x − 3", "(2x² + x − 3)(x + 2) = 2x³ + 5x² − x − 6"], "2x³ + 5x² − x − 6"]],
    mis: [["Writing (x + 3)² = x² + 9.", "The middle term 6x is missing.", "Expand as (x + 3)(x + 3) to get x² + 6x + 9."]],
  },
  "y12-u1-l3": {
    teach: [
      ["Factorising ax² + bx + c", ["Multiply a by c and find two numbers that multiply to ac and add to b. Split the middle term and factor in pairs.", "2x² + 7x + 3: ac = 6, and 6 and 1 add to 7. So 2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)."], "Split the middle term, then factor in pairs."],
      ["Cubics", ["First look for a common factor, then try to factor what is left. x³ − 4x = x(x² − 4) = x(x − 2)(x + 2), using the difference of two squares."], "Take out common factors first."],
    ],
    ex: [["Factorise 3x³ − 12x².", ["Common factor 3x²", "3x²(x − 4)"], "3x²(x − 4)"]],
    mis: [["Getting signs wrong when the constant is negative.", "x² + x − 6 = (x + 3)(x − 2), because 3 × (−2) = −6 and 3 + (−2) = 1.", "Expand your answer to check."]],
  },
  "y12-u1-l4": {
    teach: [
      ["Reading the powers", ["x⁻ⁿ = 1/xⁿ and x^(1/2) = √x. The denominator of a fractional power is the root, and the numerator is the power: x^(m/n) = (ⁿ√x)ᵐ.", "8^(2/3) = (∛8)² = 2² = 4, and 8^(−1/3) = 1/∛8 = ½."], "Denominator is the root, numerator is the power."],
      ["Why it matters for calculus", ["Once roots and reciprocals are powers, the same rule works for all of them. Differentiating x^n gives n × x^(n−1), even when n is negative or fractional."], "Powers make calculus rules work for all terms."],
    ],
    ex: [["Evaluate 16^(3/4).", ["16^(1/4) = 2", "2³"], "8"]],
    mis: [["Treating 8^(2/3) as 8 ÷ 3.", "The power applies to the root, not as a division.", "Take the root first, then the power."]],
  },
  "y12-u1-l5": {
    teach: [
      ["Simplifying surds", ["Find the largest square factor. √50 = √(25 × 2) = 5√2.", "√72 + √18 = 6√2 + 3√2 = 9√2. Only like surds can be added."], "Find the largest square factor first."],
      ["Expanding brackets with surds", ["Expand like normal brackets, then simplify each surd. (3 + √2)(3 − √2) = 9 − 3√2 + 3√2 − 2 = 7. The middle terms cancel.", "(√3 + 1)² = 3 + 2√3 + 1 = 4 + 2√3."], "Brackets with surds give whole number answers when the surds cancel."],
    ],
    ex: [["Write (√5 + 2)(√5 − 2) in simplest form.", ["= 5 − 2√5 + 2√5 − 4", "= 5 − 4"], "1"]],
    mis: [["Splitting a root over a sum: √(a + b) = √a + √b.", "This is false: √(9 + 16) = 5, not 3 + 4 = 7.", "Simplify inside the root first."]],
  },
  "y12-u1-l6": {
    teach: [
      ["Single surd on the bottom", ["Multiply top and bottom by the surd so the bottom becomes a whole number. 1/√5 = √5/5.", "The same method works when the bottom is a surd multiplied by a number: 3/(2√3) = 3√3/6 = √3/2."], "Multiply top and bottom by the same surd."],
      ["Bracket on the bottom", ["Multiply top and bottom by the conjugate, which changes the sign between the terms. For 3/(2 + √3): multiply by (2 − √3). The bottom becomes 4 − 3 = 1, so the answer is 6 − 3√3."], "Use the conjugate: change the sign."],
    ],
    ex: [["Rationalise 4/(√7 − 1).", ["Multiply by (√7 + 1)/(√7 + 1)", "Bottom: 7 − 1 = 6, top: 4√7 + 4"], "(4√7 + 4)/6 = (2√7 + 2)/3"]],
    mis: [["Multiplying only the bottom by the conjugate.", "The top must be multiplied by the same thing, or the value changes.", "Multiply both the top and bottom."]],
  },

  /* ================== Unit 2: Quadratics ================== */
  "y12-u2-l1": {
    teach: [
      ["Choosing a method", ["Factorise if the numbers are easy. Complete the square when you need the turning point. Use the formula if neither works easily.", "2x² + 3x − 1 = 0 does not factorise neatly, so x = (−3 ± √17)/4 using the formula."], "Try factorising, but use the formula when it doesn't work."],
      ["Hidden quadratics", ["Some equations are quadratic in disguise. x⁴ − 5x² + 4 = 0 becomes u² − 5u + 4 = 0 with u = x², so (u − 1)(u − 4) = 0.", "Then x² = 1 or x² = 4, so x = ±1 or ±2. Remember both signs."], "Substitute for the repeated power, then solve, then go back to x."],
    ],
    ex: [["Solve x⁴ − 13x² + 36 = 0.", ["u = x², u² − 13u + 36 = 0", "(u − 4)(u − 9) = 0, so x² = 4 or 9"], "x = ±2 or ±3"]],
    mis: [["Keeping only the positive root when x² = 4.", "Both x = 2 and x = −2 square to give 4.", "Write ± when you take the square root."]],
  },
  "y12-u2-l2": {
    teach: [
      ["The method for a = 1", ["Halve the number in front of x and square it. x² + 6x + 5 = (x + 3)² − 9 + 5 = (x + 3)² − 4.", "The turning point is (−3, −4), found from the bracket and the number outside."], "Half the x term, square it, then correct."],
      ["The method for a ≠ 1", ["Take a out of the first two terms first. 2x² − 8x + 3 = 2(x² − 4x) + 3 = 2((x − 2)² − 4) + 3 = 2(x − 2)² − 5.", "So the turning point is (2, −5). Check: expand the answer to get back to the start."], "Factor out a from the x² and x terms before completing the square."],
    ],
    ex: [["Write 3x² + 12x + 1 in the form a(x + p)² + q.", ["3(x² + 4x) + 1", "3((x + 2)² − 4) + 1"], "3(x + 2)² − 11"]],
    mis: [["Forgetting to divide the number by a when it is not 1.", "3x² + 12x = 3(x + 2)² − 12, not (x + 2)² − 12.", "Factor out a first, then complete the square inside."]],
  },
  "y12-u2-l3": {
    teach: [
      ["Reading f(x)", ["f(x) is the output for input x. If f(x) = x² − 4x + 7, then f(2) = 4 − 8 + 7 = 3. The notation f(x) does not mean multiply f by x.", "To find an input for a given output, set f(x) equal to that value and solve. f(x) = 3 gives x² − 4x + 4 = 0, so x = 2."], "Set f(x) equal to the output to find the input."],
      ["Minimum and maximum values", ["Complete the square: x² − 4x + 7 = (x − 2)² + 3. Since (x − 2)² is never negative, the minimum value of f(x) is 3, at x = 2."], "Complete the square to find the minimum or maximum."],
    ],
    ex: [["f(x) = 2x² + 8x + 9. Find the minimum value and where it occurs.", ["2(x² + 4x) + 9 = 2(x + 2)² + 1", "Minimum when (x + 2)² = 0"], "Minimum 1 at x = −2"]],
    mis: [["Reading f(x) as f times x.", "f(x) is a function value, the output for input x.", "Substitute the value in place of x."]],
  },
  "y12-u2-l4": {
    teach: [
      ["Finding the features", ["For y = x² − 2x − 3 = (x − 3)(x + 1): the roots are x = 3 and x = −1. The y-intercept is y = −3. The turning point is at x = 1 (halfway between the roots), with y = 1 − 2 − 3 = −4.", "A positive x² coefficient means a U shape, so the turning point is a minimum."], "Roots, y-intercept and turning point give the sketch."],
      ["Shape from the coefficient", ["If a is negative the parabola is an upside-down U, and the turning point is a maximum. Always check the sign before sketching."], "A negative a flips the shape."],
    ],
    ex: [["Sketch y = −x² + 4x. State the roots and turning point.", ["Factorise: −x(x − 4)", "Roots at 0 and 4, midpoint 2, y = 4"], "Roots 0 and 4; maximum (2, 4)"]],
    mis: [["Sketching a U shape when a is negative.", "The shape depends on the sign of the x² term.", "Check the sign of a before drawing."]],
  },
  "y12-u2-l5": {
    teach: [
      ["The discriminant", ["For ax² + bx + c = 0, the discriminant is b² − 4ac. If it is positive, there are two real roots. If it is zero, there is one repeated root. If it is negative, there are no real roots.", "For x² + kx + 4 = 0, the discriminant is k² − 16. It is zero when k = ±4, giving equal roots."], "Use b² − 4ac to count roots without solving."],
      ["Finding unknowns", ["To find a range of values for a parameter, set up the inequality for the discriminant and solve it. For two distinct roots, k² − 16 > 0, so k < −4 or k > 4."], "Solve the discriminant as an inequality."],
    ],
    ex: [["Show that 2x² − 5x + 4 = 0 has no real roots.", ["Discriminant = (−5)² − 4 × 2 × 4", "= 25 − 32 = −7"], "−7 < 0, so no real roots"]],
    mis: [["Using b² + 4ac instead of b² − 4ac.", "The sign between the two terms matters.", "Write the formula out each time."]],
  },
  "y12-u2-l6": {
    teach: [
      ["Maximum height of a projectile", ["A ball thrown up follows h = 20t − 5t². Complete the square: h = −5(t² − 4t) = −5(t − 2)² + 20. The maximum height is 20 m, reached at t = 2 s.", "The turning point is the maximum because the t² term is negative."], "Complete the square to find the maximum."],
      ["Interpreting the answer", ["Always say what the answer means: 'the ball reaches a maximum height of 20 m after 2 seconds'. Check whether a negative answer is possible in the context."], "Give the answer in words with its units."],
    ],
    ex: [["A rectangle has perimeter 20 cm. Its width is x. Show the area is 10x − x² and find the maximum area.", ["Length = 10 − x", "Area = x(10 − x) = −(x − 5)² + 25"], "Maximum area 25 cm² when x = 5"]],
    mis: [["Taking the time where the maximum occurs as the maximum height.", "The time and the height are different answers.", "Substitute the time back into the equation for the height."]],
  },

  /* ================== Unit 3: Equations and inequalities ================== */
  "y12-u3-l1": {
    teach: [
      ["Choosing elimination or substitution", ["Elimination works best when the same letter has the same or matching coefficients. Substitution works best when one equation is already in the form x = … or y = ….", "2x + 3y = 12 and x − y = 1: rearrange the second to x = y + 1, then substitute to get 5y = 10, so y = 2 and x = 3."], "Rearrange one equation, then substitute."],
      ["Checking", ["Put both values into both original equations. If they work for both, the solution is correct."], "Check both equations, not just one."],
    ],
    ex: [["Solve 3x + 2y = 7 and x − 2y = 1.", ["Add: 4x = 8, so x = 2", "Substitute into x − 2y = 1: 2 − 2y = 1"], "x = 2, y = ½"]],
    mis: [["Making a sign error when subtracting equations.", "Subtract every term of the second equation, including the sign of each.", "Write each step out in full."]],
  },
  "y12-u3-l2": {
    teach: [
      ["Substituting into a quadratic", ["If one equation is linear and the other is quadratic, rearrange the linear equation to get y or x on its own, then substitute into the quadratic.", "y = x + 2 and y = x²: x² = x + 2, so x² − x − 2 = 0, which gives (x − 2)(x + 1) = 0. So x = 2 or x = −1."], "Substitute the linear equation into the quadratic."],
      ["Finding both y values", ["Each x value gives a y value from the linear equation. Give both pairs of coordinates: (2, 4) and (−1, 1)."], "Find the matching y for each x."],
    ],
    ex: [["Solve y = 2x and x² + y² = 5.", ["x² + 4x² = 5, so 5x² = 5", "x² = 1"], "(1, 2) and (−1, −2)"]],
    mis: [["Forgetting the second y value.", "Each solution has an x and a y.", "Find y for each x."]],
  },
  "y12-u3-l3": {
    teach: [
      ["Counting intersections with the discriminant", ["Substitute to get a quadratic, then use its discriminant. y = x + k and y = x² give x² − x − k = 0, with discriminant 1 + 4k.", "If 1 + 4k > 0, the line cuts the parabola twice. If 1 + 4k = 0, it touches once (a tangent). If 1 + 4k < 0, it misses."], "Use the discriminant of the combined quadratic."],
      ["Tangent condition", ["A tangent is the special case where the discriminant is zero. Find the value of k that makes the discriminant zero to find when the line just touches the curve."], "Discriminant zero means the line just touches."],
    ],
    ex: [["Find c so that y = 2x + c is a tangent to y = x² + 1.", ["x² + 1 = 2x + c, so x² − 2x + (1 − c) = 0", "Discriminant = 4 − 4(1 − c) = 4c = 0"], "c = 0"]],
    mis: [["Stopping at the quadratic and not checking its discriminant.", "The number of solutions is found from the discriminant.", "State what the discriminant tells you."]],
  },
  "y12-u3-l4": {
    teach: [
      ["Solving inequalities", ["Work like an equation, but when you multiply or divide by a negative number, reverse the inequality sign.", "3x − 5 < 2x + 1, so x < 6. But −2x > 6 becomes x < −3 when divided by −2."], "Flip the sign when dividing by a negative."],
      ["Two inequalities at once", ["Treat each side of −2 < 2x + 1 ≤ 7 the same way. Subtract 1 from every part, then divide by 2: −1.5 < x ≤ 3. Write the answer in one line, or in set notation {x : −1.5 < x ≤ 3}."], "Do the same to all three parts."],
    ],
    ex: [["Solve 4 − x ≥ 2x − 8.", ["12 ≥ 3x", "x ≤ 4"], "x ≤ 4"]],
    mis: [["Forgetting to flip the sign when dividing by a negative.", "−2x > 6 means x < −3.", "Divide carefully and check with a test value."]],
  },
  "y12-u3-l5": {
    teach: [
      ["Sketch the quadratic", ["For x² − x − 6 < 0: factorise to (x − 3)(x + 2) < 0. The graph crosses the axis at −2 and 3, and is below the axis between them, so −2 < x < 3.", "The sketch shows the answer more reliably than the algebra alone."], "Sketch to see which part is above or below the axis."],
      ["Outside the roots", ["For x² − x − 6 ≥ 0, the answer is the outside region: x ≤ −2 or x ≥ 3. The two parts are joined by 'or', not 'and'."], "Outside the roots means 'or'."],
    ],
    ex: [["Solve x² − 4x > 0.", ["x(x − 4) > 0", "Positive outside the roots 0 and 4"], "x < 0 or x > 4"]],
    mis: [["Taking the region between the roots for a 'greater than' inequality.", "For ≥ or > with a positive x² term, the answer is outside the roots.", "Sketch to check."]],
  },
  "y12-u3-l6": {
    teach: [
      ["Testing a point", ["To know which side to shade, test a point. For y ≥ x, test (0, 1): 1 ≥ 0 is true, so shade the side containing (0, 1)."], "Use a test point to find which side is true."],
      ["Finding the region", ["To describe a region with several conditions, sketch each boundary and find where all the shaded regions overlap. y ≥ x, x + y < 4 and x ≥ 0 meet at (2, 2) on y = x and x + y = 4. Check the corners."], "The answer is where all the shading overlaps."],
    ],
    ex: [["Describe the region y ≥ 1, x ≤ 3 and x + y ≤ 5.", ["Lines y = 1, x = 3 and x + y = 5 meet at (3, 2)", "Test (0, 0): not in the region, so shade away from it"], "Region above y = 1, left of x = 3, on or below x + y = 5"]],
    mis: [["Shading the wrong side of a boundary.", "Test a point to avoid this.", "Use dashed lines for < and > and solid lines for ≤ and ≥."]],
  },

  /* ================== Unit 4: Graphs ================== */
  "y12-u4-l1": {
    teach: [
      ["Sketching a factorised cubic", ["For y = (x − 1)(x + 2)(x − 3), the roots are −2, 1 and 3. The y-intercept is (−1)(2)(−3) = 6. The graph goes from bottom-left to top-right, crossing the axis at each root.", "A cubic with a positive x³ term rises to the right."], "Roots and intercept give the sketch."],
      ["Repeated roots", ["For y = (x − 1)²(x + 2), the graph touches the axis at x = 1 instead of crossing it, because the root is repeated. The y-intercept is (1)²(2) = 2."], "A squared factor makes the graph touch, not cross."],
    ],
    ex: [["Find the roots and y-intercept of y = x(x − 2)(x + 4).", ["Roots: x = 0, 2, −4", "Set x = 0: y = 0 × … = 0"], "Roots 0, 2, −4; y-intercept 0"]],
    mis: [["Taking the y-intercept as the constant term, but with the wrong sign.", "Substitute x = 0 to find it, including all the signs.", "Check the sign with each bracket."]],
  },
  "y12-u4-l2": {
    teach: [
      ["Quartic shape", ["A quartic with a positive x⁴ term has both ends pointing up. It can have up to four roots, but fewer if some are not real, and it can have up to three turning points.", "For y = x⁴ − 5x² + 4 = (x² − 1)(x² − 4), the roots are ±1 and ±2, giving a W shape."], "A quartic can have fewer than four roots."],
      ["Using the factors", ["Factorise as a quadratic in x², then factor each part. Each root shows where the graph meets the x-axis, and the number of turning points helps check the shape."], "Factor first, then check the shape."],
    ],
    ex: [["Find the roots of y = x⁴ − 10x² + 9.", ["u = x²: u² − 10u + 9 = (u − 1)(u − 9)", "x² = 1 or 9"], "x = ±1 or ±3"]],
    mis: [["Assuming a quartic always has four roots.", "Some roots may not be real, so there may be fewer.", "Count the real roots from the factors."]],
  },
  "y12-u4-l3": {
    teach: [
      ["Asymptotes of y = k/x", ["The graph has two asymptotes: the vertical line x = 0 and the horizontal line y = 0. The graph gets closer to them but never touches them.", "For y = 3/x, the graph is in the first and third quadrants when k > 0."], "Asymptotes are the axes for y = k/x."],
      ["Moved reciprocal graphs", ["For y = 4/(x + 2) − 1, the graph is y = 4/x moved 2 left and 1 down. The asymptotes move too: x = −2 and y = −1."], "Asymptotes move with the graph."],
    ],
    ex: [["State the asymptotes of y = 2/(x − 3) + 5.", ["Vertical: when the bottom is zero, x − 3 = 0", "Horizontal: the constant added, y = 5"], "x = 3 and y = 5"]],
    mis: [["Taking the asymptote value from k rather than from the moved position.", "After a translation the asymptotes move with the graph.", "Find x for the bottom being zero, and y for the constant."]],
  },
  "y12-u4-l4": {
    teach: [
      ["Using two graphs", ["To solve f(x) = g(x) graphically, sketch y = f(x) and y = g(x). Each point where they cross is a solution. Count the crossings to find the number of solutions."], "Each crossing point is one solution."],
      ["Checking the domain", ["Some graphs only exist for certain x values, such as y = 1/x which is undefined at 0. Make sure the crossing points are in the domain of both functions."], "Check which x values each graph allows."],
    ],
    ex: [["How many solutions does x² = 4/x have?", ["Sketch y = x² and y = 4/x", "They cross once, for x > 0"], "One solution, x = ∛4"]],
    mis: [["Counting crossings without checking the domain.", "A graph with a gap or asymptote may not give a solution at that point.", "Look at where each graph is defined."]],
  },
  "y12-u4-l5": {
    teach: [
      ["Inside and outside the bracket", ["For y = f(x − a), move the graph a units right. For y = f(x) + b, move it b units up. The sign inside the bracket moves it the opposite way.", "y = (x − 2)² + 3 is y = x² moved 2 right and 3 up. The turning point moves from (0, 0) to (2, 3)."], "Inside: move left or right. Outside: up or down."],
      ["Finding the new equation", ["Write the new equation by replacing x with x − a (or x + a) and adding b. Then check one point to be sure the direction is correct."], "Check a point to confirm the direction."],
    ],
    ex: [["y = x² is translated 4 units left and 2 units down. Write the new equation.", ["Replace x with x + 4", "Subtract 2"], "y = (x + 4)² − 2"]],
    mis: [["Moving the graph in the wrong direction for the inside sign.", "f(x − 2) moves right, not left.", "Test the turning point."]],
  },
  "y12-u4-l6": {
    teach: [
      ["Stretches", ["y = af(x) stretches the graph vertically by a factor a. y = f(bx) stretches it horizontally by a factor of 1/b. So f(2x) squashes the graph horizontally by ½.", "y = 3x² is y = x² stretched vertically by 3. y = (2x)² is y = x² squashed horizontally by ½."], "Scale factors outside the bracket are vertical; inside are horizontal."],
      ["Reflections", ["y = −f(x) reflects the graph in the x-axis, and y = f(−x) reflects it in the y-axis. For f(x) = x³, f(−x) = −x³."], "Minus outside flips up-down; minus inside flips left-right."],
    ],
    ex: [["Describe the transformation from y = f(x) to y = f(−2x).", ["Inside: horizontal scale factor 1/2 with a reflection in the y-axis", "Combine the two"], "Reflect in the y-axis and squash horizontally by ½"]],
    mis: [["Doubling the scale for f(2x) rather than halving it.", "A horizontal stretch by 2 is f(x/2), so f(2x) is a squash.", "Think: the input is doubled, so the graph is compressed."]],
  },
  "y12-u4-l7": {
    teach: [
      ["Apply the rule to every feature", ["Transform each important point: the turning point, roots and asymptotes. For y = f(x − 3) + 1, a point (a, b) on y = f(x) moves to (a + 3, b + 1).", "For y = x² − 4, the turning point (0, −4) moves to (3, −3)."], "Move each feature, not just the graph."],
      ["Keeping track of asymptotes", ["Asymptotes move with the graph too. A vertical asymptote x = a moves to x = a + shift when the translation is horizontal."], "Move the asymptotes with the graph."],
    ],
    ex: [["The point (2, 5) lies on y = f(x). Find the image of this point on y = f(x − 3) + 1.", ["x shifts by +3", "y shifts by +1"], "(5, 6)"]],
    mis: [["Moving the point in the wrong direction when the shift is inside the bracket.", "x − 3 moves the graph right, so x increases by 3.", "Add the shift to the coordinates."]],
  },

  /* ================== Unit 5: Coordinate geometry ================== */
  "y12-u5-l1": {
    teach: [
      ["Finding the equation", ["Use y − y₁ = m(x − x₁) with a point and the gradient. A line through (1, 3) with gradient 2: y − 3 = 2(x − 1), so y = 2x + 1.", "Then rearrange to ax + by + c = 0: 2x − y + 1 = 0."], "Use the point-gradient form, then rearrange."],
      ["From two points", ["Find the gradient first: m = (y₂ − y₁)/(x₂ − x₁). Then use either point in y − y₁ = m(x − x₁). Through (1, 2) and (3, 8): m = 3, so y = 3x − 1."], "Gradient first, then the equation."],
    ],
    ex: [["Find the equation of the line through (−1, 4) and (2, −2) in the form ax + by + c = 0.", ["m = (−2 − 4)/(2 + 1) = −2", "y − 4 = −2(x + 1)"], "2x + y − 2 = 0"]],
    mis: [["Leaving the answer in y = mx + c form when the question asks for ax + by + c = 0.", "The question's form is part of the answer.", "Rearrange to the required form and check."]],
  },
  "y12-u5-l2": {
    teach: [
      ["Parallel and perpendicular", ["Parallel lines have the same gradient. Perpendicular lines have gradients that multiply to −1, so m₂ = −1/m₁.", "The line perpendicular to y = 2x + 1 has gradient −½."], "Perpendicular gradients are negative reciprocals."],
      ["Using them in questions", ["Find the gradient of the given line, adjust it for parallel or perpendicular, then use the point-gradient form. Through (1, 1), the perpendicular line is y − 1 = −½(x − 1)."], "Find the gradient, then the equation."],
    ],
    ex: [["Find the equation of the line through (3, 1) that is parallel to y = −4x + 2.", ["m = −4", "y − 1 = −4(x − 3)"], "y = −4x + 13"]],
    mis: [["Using the reciprocal without changing the sign.", "The perpendicular gradient of 2 is −½, not ½.", "Change the sign as well as flipping."]],
  },
  "y12-u5-l3": {
    teach: [
      ["Distance", ["The distance between (x₁, y₁) and (x₂, y₂) is √((x₂ − x₁)² + (y₂ − y₁)²).", "From (1, 2) to (4, 6): √(9 + 16) = 5."], "Pythagoras applied to the differences."],
      ["Area of a triangle", ["For a triangle with a horizontal side, use base × height ÷ 2. Triangle (0, 0), (4, 0), (0, 3): base 4, height 3, area 6.", "For a general triangle, the formula with determinants gives the area from the coordinates alone."], "Use base and height, or a general method."],
    ],
    ex: [["Find the distance between (−2, 1) and (4, 9).", ["√(6² + 8²)", "√100"], "10"]],
    mis: [["Adding the differences instead of squaring them.", "The formula needs (x₂ − x₁)² and (y₂ − y₁)², not their sum.", "Square each difference, add, then take the square root."]],
  },
  "y12-u5-l4": {
    teach: [
      ["Reading the model", ["A straight-line model y = mx + c has a constant rate of change m and a starting value c. In a context, m is the change per unit of x, and c is the value when x = 0.", "For a cost of C = 5n + 20, each item costs £5 and the fixed cost is £20."], "Gradient is the rate; intercept is the starting value."],
      ["Checking the model", ["Test the model against the data points. If it fits well for the given range, it can be used to predict. Outside that range, predictions are less reliable."], "Only trust predictions inside the range of the data."],
    ],
    ex: [["A car's value is V = 12 000 − 1500t, where t is in years. What do the numbers mean?", ["−1500 is the yearly fall in value", "12 000 is the starting value"], "It starts at £12 000 and loses £1500 a year"]],
    mis: [["Misreading the intercept as the rate.", "The gradient is the rate of change; the intercept is the start value.", "Name the units for each number."]],
  },
  "y12-u5-l5": {
    teach: [
      ["Centre and radius", ["(x − a)² + (y − b)² = r² is a circle with centre (a, b) and radius r. Note the signs inside the brackets are the opposite of the coordinates.", "(x − 2)² + (y + 1)² = 9 has centre (2, −1) and radius 3."], "Centre coordinates have the opposite sign to the bracket."],
      ["Expanded form", ["Expand to get x² + y² + Dx + Ey + F = 0. Going back, complete the square in x and in y to find the centre and radius."], "Complete the square to find the centre."],
    ],
    ex: [["Find the centre and radius of x² + y² − 6x + 4y − 3 = 0.", ["(x − 3)² − 9 + (y + 2)² − 4 − 3 = 0", "(x − 3)² + (y + 2)² = 16"], "Centre (3, −2), radius 4"]],
    mis: [["Taking the centre coordinates with the same sign as the bracket.", "(x + 2)² means the centre has x = −2.", "Write out the centre from the bracket with its sign reversed."]],
  },
  "y12-u5-l6": {
    teach: [
      ["Substitute and solve", ["Put the line into the circle's equation, expand, and solve the quadratic. Each solution gives a point of intersection.", "x² + y² = 25 and y = x + 1: x² + (x + 1)² = 25, so x² + x − 12 = 0, giving x = 3 or x = −4."], "Substitute the line into the circle."],
      ["Using the discriminant", ["The discriminant of the quadratic tells you whether the line cuts, touches or misses the circle, in the same way as before."], "Discriminant decides the number of intersections."],
    ],
    ex: [["Find the points where y = 2x meets x² + y² = 5.", ["x² + 4x² = 5", "x² = 1"], "(1, 2) and (−1, −2)"]],
    mis: [["Finding x but forgetting to find the matching y.", "Each point needs both coordinates.", "Substitute back into the line."]],
  },
  "y12-u5-l7": {
    teach: [
      ["Tangent perpendicular to the radius", ["A tangent meets the circle at one point. The radius to that point is perpendicular to the tangent, so their gradients multiply to −1.", "For the circle x² + y² = 25 at (3, 4): the radius has gradient 4/3, so the tangent has gradient −¾. The tangent is y − 4 = −¾(x − 3), or 3x + 4y = 25."], "Radius and tangent are perpendicular."],
      ["Perpendicular bisector", ["The perpendicular bisector of a chord passes through the centre. Use this to find the centre when you know two points on the circle."], "Perpendicular bisectors of chords go through the centre."],
    ],
    ex: [["Find the tangent to x² + y² = 10 at (1, 3).", ["Radius gradient 3", "Tangent gradient −1/3", "y − 3 = −⅓(x − 1)"], "x + 3y = 10"]],
    mis: [["Using the radius gradient as the tangent's gradient.", "They are perpendicular, so use the negative reciprocal.", "Find the radius gradient first, then change it."]],
  },
  "y12-u5-l8": {
    teach: [
      ["Angle in a semicircle", ["If a triangle has its hypotenuse as a diameter, the angle at the third point is 90°. Check with vectors or gradients: the two sides are perpendicular.", "A(−3, 0), B(3, 0), C(0, 3): the gradients of AC and BC are 1 and −1, which multiply to −1, so the angle at C is 90°."], "A diameter gives a right angle."],
      ["Finding the centre", ["The centre of the circle is where the perpendicular bisectors of two chords meet. For a right-angled triangle, it is the midpoint of the hypotenuse."], "Find the midpoint of the diameter."],
    ],
    ex: [["A circle has a diameter from (0, 0) to (6, 0). Find its centre.", ["Midpoint of (0, 0) and (6, 0)"], "(3, 0)"]],
    mis: [["Using the midpoint of the wrong chord as the centre.", "The centre is found from the chord that is the diameter.", "Check the chord is a diameter first."]],
  },

  /* ================== Unit 6: Algebra and proof ================== */
  "y12-u6-l1": {
    teach: [
      ["Factor, then cancel", ["Factorise the top and bottom, then cancel common factors. (x² − 9)/(x² − x − 6) = (x − 3)(x + 3)/((x − 3)(x + 2)) = (x + 3)/(x + 2).", "Only factors cancel, not terms."], "Cancel factors only."],
      ["Restrictions", ["A fraction is undefined when its bottom is zero. Note the values x cannot take, even after cancelling, such as x ≠ 3 in the example above."], "State the values that make the bottom zero."],
    ],
    ex: [["Simplify (x² + 2x)/(x² + 5x + 6), stating the restriction.", ["x(x + 2)/((x + 2)(x + 3))", "Cancel (x + 2)"], "x/(x + 3), x ≠ −2 and x ≠ −3"]],
    mis: [["Cancelling terms in a sum.", "(x + 2)/x is not 2 after cancelling x.", "Only cancel factors that multiply the whole top and bottom."]],
  },
  "y12-u6-l2": {
    teach: [
      ["Dividing by (x − a)", ["Divide a polynomial by (x − a) like long division with numbers, keeping the powers in order. Missing powers are written as zero.", "(x³ + 2x² − x + 3) ÷ (x − 1) = x² + 3x + 2 with remainder 5."], "Include a zero for any missing power."],
      ["Remainder theorem", ["The remainder when p(x) is divided by (x − a) is p(a). For p(x) = x³ + 2x² − x + 3, p(1) = 5, which matches the remainder."], "The remainder is p(a)."],
    ],
    ex: [["Find the remainder when x³ − 2x + 4 is divided by x + 2.", ["x + 2 = x − (−2), so a = −2", "p(−2) = −8 + 4 + 4"], "Remainder 0"]],
    mis: [["Using p(−a) for a factor (x − a).", "For (x − a), substitute x = a. For (x + 2), substitute x = −2.", "Write the root of the factor first."]],
  },
  "y12-u6-l3": {
    teach: [
      ["Using the factor theorem", ["(x − a) is a factor of p(x) exactly when p(a) = 0. Substitute values to find a root, then divide to find the other factors.", "p(x) = x³ − x² − 4x + 4: p(1) = 0, so (x − 1) is a factor. Dividing gives (x − 1)(x² − 4) = (x − 1)(x − 2)(x + 2)."], "Find a root by substituting, then divide."],
      ["Using it to solve", ["Once the factors are found, the roots of p(x) = 0 are the values that make each factor zero."], "Factor fully, then solve."],
    ],
    ex: [["Show that (x + 2) is a factor of x³ + 2x² − x − 2 and factorise fully.", ["p(−2) = −8 + 8 + 2 − 2 = 0", "Divide: x² − 1 = (x − 1)(x + 1)"], "(x + 2)(x − 1)(x + 1)"]],
    mis: [["Testing the factor with the wrong sign.", "(x − a) is tested with a; (x + a) with −a.", "Write the root before substituting."]],
  },
  "y12-u6-l4": {
    teach: [
      ["Writing a proof", ["Start from a known fact, then use each step to reach what you want to prove. Each line should follow from the one before, with a reason.", "Prove the sum of two even numbers is even: 2a + 2b = 2(a + b), which is 2 × an integer, so it is even."], "Each step follows from the one before."],
      ["Odd and even numbers", ["Write an odd number as 2k + 1 and an even number as 2k. Then n² for odd n is (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd."], "Use 2k and 2k + 1 to represent odd and even numbers."],
    ],
    ex: [["Prove that the square of an odd number is odd.", ["Let n = 2k + 1", "n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1"], "This is one more than an even number, so it is odd"]],
    mis: [["Using examples to prove a general statement.", "Examples can suggest a result, but do not prove it for every case.", "Write general algebra, not specific numbers."]],
  },
  "y12-u6-l5": {
    teach: [
      ["How it works", ["Split the proof into a small number of cases and check each one. It only works when the number of cases is finite and small.", "Show n³ − n is divisible by 3 for n = 1, 2, 3: 0, 6, 24, all divisible by 3."], "Check every case, and only when there are few cases."],
      ["Limits of the method", ["If there are infinitely many cases, exhaustion cannot be used. Use a general proof instead."], "Infinite cases need a general argument."],
    ],
    ex: [["Use exhaustion to show n² + n is even for n = 1, 2, 3, 4.", ["n = 1: 2, n = 2: 6, n = 3: 12, n = 4: 20", "All even"], "True for n = 1 to 4"]],
    mis: [["Missing one case.", "A proof by exhaustion must check every possible case.", "List the cases before you start."]],
  },
  "y12-u6-l6": {
    teach: [
      ["Finding a counter-example", ["A counter-example is one case where a statement fails. It disproves a general claim, even if the claim holds for many other values.", "Claim: n² + n + 41 is prime for every integer n. For n = 41, the value is 1763 = 41 × 43, so the claim is false."], "One failure disproves a general statement."],
      ["Choosing a good test", ["Try small numbers, special values such as 0 or 1, and values where the pattern might break."], "Test special values first."],
    ],
    ex: [["Show that 'the square of any number is bigger than the number' is false.", ["Test n = 1", "1² = 1, which is not bigger than 1"], "Counter-example n = 1"]],
    mis: [["Checking several values that work and claiming the statement is true.", "Many examples that work don't prove a general statement.", "Look for one value that breaks it."]],
  },
};
