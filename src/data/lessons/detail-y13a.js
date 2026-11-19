/* ==========================================================================
   Going deeper: Year 13 Pure, Part A (Units 1–6)
   Extra teaching, one more worked example and one more common mistake for
   each lesson. These are added after the short teaching in y13-a.js by
   addDetail() (see light.js and index.js).
   ========================================================================== */

export const Y13A_DETAIL = {
  /* ================== Unit 1: Proof and algebraic methods ================== */
  "y13-u1-l1": {
    teach: [
      ["Why contradiction works", ["You want to show a statement P is true. Assume P is false instead. If that assumption forces something impossible, the assumption must be wrong, so P is true.", "The contradiction has to be a real clash: a statement that is false, or that contradicts something you already know, such as 'the number is both odd and even'."], "The assumption is the thing you disprove, not the thing you want."],
      ["A classic proof", ["Prove there are infinitely many primes. Assume there is a finite list p₁, p₂, …, pₙ of all the primes. Multiply them together and add 1 to make N = p₁p₂…pₙ + 1.", "N leaves remainder 1 when divided by any prime on the list, so none of them divides N. But N is bigger than 1, so it has a prime factor, and that prime is not on the list. This contradicts the list being complete."], "Build a number that breaks the assumption."],
    ],
    ex: [["Prove that if n² is odd, then n is odd.", ["Assume n is even: n = 2k", "Then n² = 4k², which is even", "Even n gives even n², contradicting n² odd"], "So n must be odd."]],
    mis: [["Writing 'so the statement is true' without saying what was contradicted.", "The examiner needs to see the clash, such as 'odd and even at once'.", "Name the contradiction before the conclusion."]],
  },
  "y13-u1-l2": {
    teach: [
      ["Factorise first", ["Always factorise the top and bottom before doing anything else. Only factors can cancel, never individual terms.", "(x² − 9)/(x² + x − 6): the top is (x − 3)(x + 3) and the bottom is (x + 3)(x − 2), so the (x + 3) cancels to give (x − 3)/(x − 2)."], "Cancel factors, not terms."],
      ["Adding with a common denominator", ["Multiply each fraction so both have the same bottom. For 3/(x − 1) − 2/x the common denominator is x(x − 1).", "3/(x − 1) − 2/x = (3x − 2(x − 1))/(x(x − 1)) = (x + 2)/(x(x − 1)). Expand the top carefully, with brackets, so no sign is lost."], "Keep brackets around every numerator when subtracting."],
    ],
    ex: [["Simplify 2/(x + 2) + 1/(x − 3).", ["Common denominator (x + 2)(x − 3)", "2(x − 3) + 1(x + 2) = 3x − 4"], "(3x − 4)/((x + 2)(x − 3))"]],
    mis: [["Cancelling the x in (x + 2)/x so that it becomes 2.", "x is a term added to 2, not a factor, so it cannot cancel.", "Only cancel when the thing you cancel multiplies the whole top."]],
  },
  "y13-u1-l3": {
    teach: [
      ["Covering up", ["For a linear factor, cover it up and substitute its root into what is left. This finds its constant quickly.", "For (3x + 5)/((x + 1)(x + 2)): to find A, cover (x + 1) and put x = −1 into (3x + 5)/(x + 2) = 2/1, so A = 2."], "Put in the root of each factor to find its constant."],
      ["Checking your answer", ["Recombine the pieces or test a value of x. For 2/(x + 1) + 1/(x + 2) at x = 0 you get 2 + ½ = 2.5. The original gives 5/2 = 2.5, so the answer checks."], "A quick check at x = 0 catches most mistakes."],
    ],
    ex: [["Write (5x + 7)/((x + 1)(x + 3)) in partial fractions.", ["5x + 7 = A(x + 3) + B(x + 1)", "x = −1: 2 = 2A, so A = 1", "x = −3: −8 = −2B, so B = 4"], "1/(x + 1) + 4/(x + 3)"]],
    mis: [["Using partial fractions when the top's degree is too high.", "They only work when the top has a smaller degree than the bottom.", "Divide first if the fraction is improper (see Lesson 5)."]],
  },
  "y13-u1-l4": {
    teach: [
      ["Each power needs its own term", ["A factor (x − 1)² needs two terms: one over (x − 1) and one over (x − 1)². A factor (x − 1)³ needs three terms, one for each power.", "Writing only one term for a repeated factor is the most common mistake in this lesson."], "Repeated factor, one term per power."],
      ["Solving for the constants", ["For (3x + 1)/(x − 1)² write 3x + 1 = A(x − 1) + B. Put x = 1 to get B = 4. Then compare the x coefficients: 3 = A, so A = 3.", "So (3x + 1)/(x − 1)² = 3/(x − 1) + 4/(x − 1)²."], "Substitute the root first, then compare coefficients."],
    ],
    ex: [["Write (2x + 5)/(x − 2)² in partial fractions.", ["2x + 5 = A(x − 2) + B", "x = 2: 9 = B", "Coefficient of x: 2 = A"], "2/(x − 2) + 9/(x − 2)²"]],
    mis: [["Writing (x − 1)² as the only denominator term.", "The partial fraction for a squared factor is a sum of two terms.", "Write a term for (x − 1) and one for (x − 1)²."]],
  },
  "y13-u1-l5": {
    teach: [
      ["Long division", ["Divide the top by the bottom as you would for numbers. Write the result as a polynomial plus a remainder over the original bottom.", "(x² + 3x + 5)/(x + 1) = x + 2 + 3/(x + 1). Check: (x + 1)(x + 2) = x² + 3x + 2, and adding the remainder 3 gives x² + 3x + 5."], "The remainder over the bottom is what makes it proper."],
      ["When to use it", ["Only divide first if the top's degree is at least the bottom's. Once it is proper, partial fractions can follow. This is the usual order: divide, then split the remaining fraction."], "Divide, then split."],
    ],
    ex: [["Write (x³ + 2)/(x − 1) as a polynomial plus a proper fraction.", ["Divide: x³ ÷ (x − 1) gives x² + x + 1 with remainder 3", "Check: (x − 1)(x² + x + 1) = x³ − 1, then + 3 gives x³ + 2"], "x² + x + 1 + 3/(x − 1)"]],
    mis: [["Dropping the remainder.", "Without it the answer is not equal to the original fraction.", "Always keep the remainder over the original bottom."]],
  },

  /* ================== Unit 2: Functions and graphs ================== */
  "y13-u2-l1": {
    teach: [
      ["Solving with modulus", ["|x − 2| = 5 means the distance from x to 2 is 5. So x − 2 = 5 or x − 2 = −5, giving x = 7 or x = −3.", "|x| = −3 has no solutions, because the modulus of any number is never negative."], "The modulus is never negative."],
      ["Inequalities", ["|x| < a means −a < x < a. |x| > a means x > a or x < −a. The inequality flips into 'or' when the modulus is on the greater side."], "Less than gives 'and'; greater than gives 'or'."],
    ],
    ex: [["Solve |2x + 1| ≤ 5.", ["−5 ≤ 2x + 1 ≤ 5", "−6 ≤ 2x ≤ 4"], "−3 ≤ x ≤ 2"]],
    mis: [["Solving |x| > 3 as 'x > 3 only'.", "The negative side, x < −3, is also a solution.", "Sketch the V shape to see both sides."]],
  },
  "y13-u2-l2": {
    teach: [
      ["Finding the domain", ["Look for values that would break the function: division by zero, a negative number under a square root, or the log of a number that is zero or negative.", "For f(x) = √(x − 4), the domain is x ≥ 4 because the value under the root cannot be negative."], "The domain is the set of allowed inputs."],
      ["Finding the range", ["The range is the set of outputs. For f(x) = √(x − 4), the output is never negative, so the range is f(x) ≥ 0. Sketching the graph is the most reliable way to check."], "Check outputs by looking at the graph."],
    ],
    ex: [["State the domain of f(x) = 1/(x − 5).", ["Denominator cannot be zero", "x − 5 ≠ 0"], "x ≠ 5"]],
    mis: [["Mixing up domain and range.", "The domain is the inputs and the range is the outputs.", "Ask 'what can go in?' for domain and 'what can come out?' for range."]],
  },
  "y13-u2-l3": {
    teach: [
      ["Working from the inside out", ["For fg(x), start with g(x), then put that result into f. For f(x) = x² + 1 and g(x) = 2x − 3: fg(x) = f(2x − 3) = (2x − 3)² + 1 = 4x² − 12x + 10.", "The brackets make the substitution clear: replace each x in f with the whole expression for g."], "Replace every x with the whole inner function."],
      ["Order matters", ["gf(x) = g(x² + 1) = 2(x² + 1) − 3 = 2x² − 1. This is different from fg(x), so the order changes the answer.", "To find gf(2), work out f(2) = 5 first, then g(5) = 7."], "Read composition from right to left."],
    ],
    ex: [["Given f(x) = 3x and g(x) = x + 4, find fg(x).", ["g(x) = x + 4 goes into f", "f(x + 4) = 3(x + 4)"], "3x + 12"]],
    mis: [["Doing the functions in the order they are written.", "fg(x) means g is applied first, then f.", "Read from right to left."]],
  },
  "y13-u2-l4": {
    teach: [
      ["Swapping and rearranging", ["Write y = f(x), swap x and y, then make y the subject. For f(x) = 2x + 3: x = 2y + 3, so y = (x − 3)/2 and f⁻¹(x) = (x − 3)/2.", "Check by composing: f(f⁻¹(x)) = 2 × (x − 3)/2 + 3 = x."], "Swap, rearrange and check."],
      ["When an inverse exists", ["A function has an inverse only if each output comes from one input. f(x) = x² has no inverse on all real numbers, because 2 and −2 both give 4. Restricting the domain to x ≥ 0 gives an inverse, √x."], "Each output must come from exactly one input."],
    ],
    ex: [["Find the inverse of f(x) = (x + 1)/3.", ["x = (y + 1)/3", "3x = y + 1"], "f⁻¹(x) = 3x − 1"]],
    mis: [["Taking the reciprocal instead of the inverse.", "f⁻¹(x) is not 1/f(x). The −1 in f⁻¹ is notation for the inverse, not a power.", "Use the swap-and-rearrange method."]],
  },
  "y13-u2-l5": {
    teach: [
      ["Modulus outside the function", ["y = |f(x)| keeps the parts of the graph above the x-axis, and reflects the parts below the x-axis upwards.", "For f(x) = x − 1: the line crosses the axis at x = 1. The part for x < 1 is below the axis, so it reflects, giving a V with its vertex at (1, 0)."], "Negative y values become positive."],
      ["Modulus inside the function", ["y = f(|x|) is symmetric about the y-axis. For x ≥ 0 draw f(x) as normal. Then copy that part to the left, mirrored in the y-axis.", "For f(x) = x − 1, the graph of f(|x|) has values −x − 1 for x < 0."], "Keep the right half and mirror it."],
    ],
    ex: [["Describe the graph of y = |x² − 4| briefly.", ["Parabola crosses at x = ±2", "Part between −2 and 2 is below the axis, so it reflects up"], "An M shape: zeros at x = ±2 and a peak at (0, 4)."]],
    mis: [["Reflecting in the x-axis for f(|x|).", "The modulus inside reflects in the y-axis, not the x-axis.", "Only the right half is needed to draw f(|x|)."]],
  },
  "y13-u2-l6": {
    teach: [
      ["Shifts go the opposite way inside", ["y = f(x + 2) moves the graph 2 units left, not right. The sign inside the bracket works against you. y = f(x) + 2 moves it up 2.", "For y = (x − 3)² + 2, the graph of y = x² moves 3 right and 2 up, so the vertex is at (3, 2)."], "Inside the bracket, the shift is opposite to the sign."],
      ["Stretches", ["y = f(2x) squashes the graph in the x-direction by a factor of ½. y = 2f(x) stretches it in the y-direction by 2.", "For y = (2x − 4)² = (2(x − 2))², stretch y = x² in the x-direction by ½, then shift right by 2."], "Stretch first, then translate, when the x-scale is inside."],
    ],
    ex: [["Describe the transformation from y = x² to y = (x + 1)² − 3.", ["Shift left 1", "Shift down 3"], "Translation by (−1, −3)"]],
    mis: [["Shifting left by the number that has the plus sign.", "y = f(x + 2) moves left by 2, not right.", "Read the vertex from the bracket: (x − a) means move right by a."]],
  },
  "y13-u2-l7": {
    teach: [
      ["Check each case", ["When the right side has a letter in it, check every answer in the original equation. Only the right side must be non-negative for |…| = right side to work.", "For |2x − 1| = x + 3, the right side must be at least 0, so x ≥ −3. Both answers we find need to satisfy that."], "A modulus equals a non-negative number."],
      ["Greater than with a sketch", ["For |x − 2| > 3, sketch y = |x − 2| and y = 3. Where the V is above the line, the inequality holds. This gives x < −1 or x > 5."], "Sketch to see which side to keep."],
    ],
    ex: [["Solve |2x − 1| = x + 3.", ["Case 1: 2x − 1 = x + 3 gives x = 4", "Case 2: −(2x − 1) = x + 3 gives x = −2/3", "Check both: x + 3 ≥ 0 in each"], "x = 4 or x = −2/3"]],
    mis: [["Forgetting the second case.", "The modulus can equal the right side in two ways.", "Always write both cases."]],
  },

  /* ================== Unit 3: Sequences and series ================== */
  "y13-u3-l1": {
    teach: [
      ["Finding a term", ["For 3, 7, 11, …: the difference d = 4 and a = 3, so uₙ = 3 + (n − 1) × 4 = 4n − 1. Then u₂₀ = 79.", "The (n − 1) is because the first term has no difference added."], "The first term needs no difference, so use n − 1."],
      ["Finding n", ["To check whether a number is in the sequence, set uₙ equal to it and solve for n. Is 99 a term? 4n − 1 = 99 gives n = 25, a whole number, so yes."], "A whole number n means the term is in the sequence."],
    ],
    ex: [["The arithmetic sequence 5, 9, 13, … Find the 30th term.", ["a = 5, d = 4", "u₃₀ = 5 + 29 × 4"], "121"]],
    mis: [["Using uₙ = a + nd, which is one term too far.", "With n = 1 it should give a, but it gives a + d.", "Use a + (n − 1)d."]],
  },
  "y13-u3-l2": {
    teach: [
      ["Sum of the first n terms", ["Sₙ = ½n(2a + (n − 1)d). Pairing the first and last terms shows why: each pair adds to the same total, and there are n/2 pairs.", "For 1 + 2 + … + 100: a = 1, d = 1, n = 100, so S = 50 × 101 = 5050."], "Pair the terms to see where the formula comes from."],
      ["Using the last term", ["If you know the last term l, use Sₙ = ½n(a + l). It is the average of the first and last term, times the number of terms."], "Average times the number of terms."],
    ],
    ex: [["Find the sum of the first 20 terms of 3, 7, 11, …", ["a = 3, d = 4, n = 20", "S = ½ × 20 × (6 + 19 × 4) = 10 × 82"], "820"]],
    mis: [["Using n instead of n − 1 in the bracket.", "The bracket has (n − 1)d because the last term has n − 1 differences.", "Check: with n = 1 the sum should be a."]],
  },
  "y13-u3-l3": {
    teach: [
      ["Finding the common ratio", ["Divide any term by the one before: 6 ÷ 2 = 3 and 18 ÷ 6 = 3, so r = 3. For 2, 6, 18, …: uₙ = 2 × 3ⁿ⁻¹.", "Then u₇ = 2 × 3⁶ = 2 × 729 = 1458."], "Divide consecutive terms to find r."],
      ["Growth and decay", ["If r > 1 the terms grow. If 0 < r < 1 they shrink towards zero. If r is negative they alternate in sign."], "The size of r tells you how it behaves."],
    ],
    ex: [["Find the 6th term of 160, 80, 40, …", ["a = 160, r = ½", "u₆ = 160 × (½)⁵"], "5"]],
    mis: [["Using d instead of r, or subtracting terms.", "A geometric sequence multiplies by r each time.", "Divide consecutive terms to find r."]],
  },
  "y13-u3-l4": {
    teach: [
      ["Using Sₙ = a(1 − rⁿ)/(1 − r)", ["This is the formula for a geometric series when r ≠ 1. For 2 + 6 + 18 + …, with a = 2, r = 3 and n = 6: S₆ = 2(1 − 3⁶)/(1 − 3) = 728.", "Check by adding the six terms: 2 + 6 + 18 + 54 + 162 + 486 = 728."], "Check small cases by adding the terms."],
      ["Which form to use", ["If r > 1, the form a(rⁿ − 1)/(r − 1) avoids negative numbers. Both give the same answer, so pick the one that keeps the arithmetic simpler."], "Both forms agree; choose the simpler one."],
    ],
    ex: [["Find the sum of the first 5 terms of 1, −2, 4, −8, …", ["a = 1, r = −2, n = 5", "S₅ = (1 − (−2)⁵)/(1 − (−2))"], "11"]],
    mis: [["Using the formula with r = 1.", "The formula divides by 1 − r, which is zero when r = 1.", "When r = 1, the series is just n × a."]],
  },
  "y13-u3-l5": {
    teach: [
      ["Why the condition matters", ["If |r| ≥ 1, the terms do not shrink, so the sum keeps growing or swinging. Only if |r| < 1 does rⁿ tend to zero and the sum settle.", "For 12 + 6 + 3 + …, r = ½ and |r| < 1, so S∞ = 12/(1 − ½) = 24."], "Only |r| < 1 gives a finite total."],
      ["Recurring decimals as series", ["0.6̇ = 0.6 + 0.06 + 0.006 + … is a geometric series with a = 0.6 and r = 0.1. So S∞ = 0.6/0.9 = 2/3.", "This shows how infinite series link to fractions."], "A recurring decimal is a geometric series in disguise."],
    ],
    ex: [["Express 0.45̇ as a fraction using a series.", ["a = 0.45, r = 0.01", "S∞ = 0.45/(1 − 0.01)"], "5/11"]],
    mis: [["Using S∞ when |r| ≥ 1.", "The sum to infinity does not exist then.", "Check |r| < 1 first."]],
  },
  "y13-u3-l6": {
    teach: [
      ["Reading the notation", ["Σ with limits r = 1 to 4 means add the expression for each value of r. Σ(2r + 1) from r = 1 to 4 is 3 + 5 + 7 + 9 = 24.", "The letter under the Σ is the counter, and the numbers show where it starts and ends."], "The counter runs from the bottom to the top value."],
      ["Useful rules", ["Σ of a constant c over n terms is nc. The sum of a sum is the sum of the parts: Σ(a + b) = Σa + Σb. These rules help you split complicated sums."], "Split the sum and use standard results."],
    ],
    ex: [["Evaluate Σ from r = 1 to 5 of 3r.", ["3 × (1 + 2 + 3 + 4 + 5)", "3 × 15"], "45"]],
    mis: [["Forgetting that the lower limit is the first value of the counter.", "Starting at 0 gives a different sum.", "Write out the first and last terms to check the limits."]],
  },
  "y13-u3-l7": {
    teach: [
      ["Iterating", ["Use the rule repeatedly. For uₙ₊₁ = 0.5uₙ + 4 with u₁ = 2: u₂ = 5, u₃ = 6.5, u₄ = 7.25, and the values approach 8.", "The value 8 is a fixed point: when u = 8, the rule gives 8 again."], "A fixed point is a value that stays the same."],
      ["Finding the limit", ["If the sequence converges to L, then L = 0.5L + 4 in the limit. Solving gives L = 8.", "This is a useful check for the long-term value without calculating many terms."], "Set L equal to the rule in the limit."],
    ],
    ex: [["uₙ₊₁ = 2uₙ − 1 with u₁ = 3. Find u₃.", ["u₂ = 2 × 3 − 1 = 5", "u₃ = 2 × 5 − 1"], "9"]],
    mis: [["Starting at the wrong term.", "u₁ is the first value given, so the first step gives u₂.", "Label each term as you work it out."]],
  },
  "y13-u3-l8": {
    teach: [
      ["Percentage growth and decay", ["A rise of 5% a year multiplies by 1.05 each year. A fall of 15% multiplies by 0.85. The model is geometric, so the value after n years is a × rⁿ.", "A saving of £1000 at 5% a year is worth 1000 × 1.05ⁿ after n years."], "Percentage change is a multiplier, not an addition."],
      ["Comparing with an arithmetic model", ["A fixed amount added each year, like £50 a month, is arithmetic. A percentage change is geometric. Choosing the right model is the key step in the question."], "Fixed amounts are arithmetic; percentages are geometric."],
    ],
    ex: [["A machine is worth £2000 and loses 15% of its value each year. Find its value after 4 years.", ["2000 × 0.85⁴", "0.85⁴ = 0.522 to 3 d.p."], "£1044.01"]],
    mis: [["Subtracting 15% of the original each year.", "The 15% is of the value at the start of each year, so the loss shrinks.", "Multiply by 0.85 each year."]],
  },

  /* ================== Unit 4: Binomial expansion ================== */
  "y13-u4-l1": {
    teach: [
      ["Coefficients", ["The coefficient of xʳ in (1 + x)ⁿ is nCr. For a negative or fractional n, nCr keeps going, so the expansion does not stop.", "For (1 + x)⁻²: the coefficients are 1, −2, 3, −4, … So (1 + x)⁻² = 1 − 2x + 3x² − 4x³ + …"], "The coefficients are the same pattern as before, with the general formula."],
      ["The condition |x| < 1", ["The expansion only converges when |x| < 1. Outside this range the series does not approximate the function, so always state the condition with your answer."], "State |x| < 1 with every expansion."],
    ],
    ex: [["Expand (1 + x)^½ up to the x² term.", ["Coefficient of x: ½", "Coefficient of x²: ½ × (−½)/2 = −1/8"], "1 + ½x − ⅛x²"]],
    mis: [["Forgetting that the expansion is only valid for |x| < 1.", "Substituting x = 2 into the series gives a wrong answer.", "Write the condition next to the expansion."]],
  },
  "y13-u4-l2": {
    teach: [
      ["Factoring out first", ["The formula needs the bracket to start with 1. For (3 + 2x)⁻², take 3⁻² out first: (3 + 2x)⁻² = (1/9)(1 + 2x/3)⁻².", "Now expand (1 + 2x/3)⁻² with the x replaced by 2x/3."], "Make the first term 1 before expanding."],
      ["Working through it", ["(1 + y)⁻² = 1 − 2y + 3y² − …, with y = 2x/3. Substitute: 1 − 4x/3 + 4x²/3. Multiply by 1/9: 1/9 − 4x/27 + 4x²/27."], "Multiply every term by the factor you took out."],
    ],
    ex: [["Expand (2 + x)⁻¹ up to x², giving the condition.", ["Take 2⁻¹ out: ½(1 + x/2)⁻¹", "Expand: ½(1 − x/2 + x²/4)"], "½ − x/4 + x²/8, for |x| < 2"]],
    mis: [["Expanding the bracket before taking out the first term.", "The formula is only valid for a bracket that starts with 1.", "Take the constant out first."]],
  },
  "y13-u4-l3": {
    teach: [
      ["Split, then expand each piece", ["Write 1/((1 − x)(1 + 2x)) as A/(1 − x) + B/(1 + 2x). Find A and B, then expand each simple fraction separately.", "The result is 1 − x + 3x² + …, which you can check by expanding the original fraction directly."], "Simple pieces are easy to expand."],
      ["Each piece's condition", ["1/(1 − x) needs |x| < 1, and 1/(1 + 2x) needs |2x| < 1. Both must hold, so the combined expansion needs |x| < ½."], "The combined range is the strictest of the separate ranges."],
    ],
    ex: [["Find the expansion of 1/((1 − x)(2 + x)) up to x² for |x| < 1.", ["A = B = 1/3, so 1/3 × (1/(1 − x) + 1/(2 + x))", "1/(1 − x) = 1 + x + x²", "1/(2 + x) = ½(1 − x/2 + x²/4)", "Add and multiply by 1/3"], "½ + ¼x + ⅜x², for |x| < 1"]],
    mis: [["Forgetting to combine the conditions.", "The expansion is only valid where every piece is valid.", "Write both conditions and take the strictest."]],
  },

  /* ================== Unit 5: Radians ================== */
  "y13-u5-l1": {
    teach: [
      ["Degrees and radians", ["One radian is the angle that makes an arc of length r on a circle of radius r. A full turn is 2π radians, so π radians = 180°.", "To convert: multiply degrees by π/180 to get radians. 60° × π/180 = π/3."], "π rad = 180°."],
      ["Calculator mode", ["Check the calculator is in radian mode before using trig with radians. Mistakes with degrees and radians are common, and they change every answer."], "Check the mode every time."],
    ],
    ex: [["Convert 3π/4 radians to degrees.", ["3π/4 × 180°/π", "= 3 × 45°"], "135°"]],
    mis: [["Using degree mode with radian angles.", "sin(π) on a degree calculator gives a very different result.", "Set the mode to radians first."]],
  },
  "y13-u5-l2": {
    teach: [
      ["Arc length", ["An arc of a circle with radius r and angle θ (in radians) has length s = rθ. This is shorter than the degree version because θ is measured in radians.", "For r = 5 cm and θ = 0.6, s = 3 cm."], "Use the radian angle directly."],
      ["Working backwards", ["If you know the arc length and the radius, find θ = s/r. If you know the arc and the angle, find r = s/θ."], "Rearrange s = rθ as needed."],
    ],
    ex: [["A circle of radius 8 cm has an arc of length 2π cm. Find the angle in radians.", ["θ = s/r", "θ = 2π/8"], "π/4 radians"]],
    mis: [["Using the degree angle in the arc formula.", "s = rθ needs θ in radians.", "Convert first."]],
  },
  "y13-u5-l3": {
    teach: [
      ["The sector", ["Area of a sector = ½r²θ, with θ in radians. Take the whole circle (πr²) and multiply by θ/(2π) to see why.", "For r = 6 and θ = π/3, the area is ½ × 36 × π/3 = 6π."], "The fraction of the circle is θ/2π."],
      ["The segment", ["A segment is the region between a chord and the arc. Its area is the sector area minus the triangle's area, ½r² sinθ.", "For r = 6 and θ = π/3: segment = 6π − ½ × 36 × sin(π/3) = 6π − 9√3, about 3.26."], "Segment = sector − triangle."],
    ],
    ex: [["Find the area of a segment with r = 4 and θ = π/2.", ["Sector: ½ × 16 × π/2 = 4π", "Triangle: ½ × 16 × sin(π/2) = 8"], "4π − 8, about 4.57"]],
    mis: [["Using sin without the r² in the triangle area.", "The triangle area is ½r² sin θ, not ½ sin θ.", "Check the units of the area are consistent."]],
  },
  "y13-u5-l4": {
    teach: [
      ["Second solution", ["Trig graphs repeat, so each equation can have more than one solution in the interval. For sin θ = ½ over 0 ≤ θ < 2π, the solutions are π/6 and 5π/6.", "Sketch the graph or use the symmetry of the trig function to find the second solution."], "Sketch to find all solutions."],
      ["Changing the interval", ["If the equation involves 2θ, the interval for 2θ is twice as long. So for 0 ≤ θ < π, solve for 2θ in 0 ≤ 2θ < 2π, then halve the answers."], "Change the interval for the new angle."],
    ],
    ex: [["Solve cos 2θ = 0 for 0 ≤ θ < π.", ["2θ between 0 and 2π", "2θ = π/2 or 3π/2"], "θ = π/4 or 3π/4"]],
    mis: [["Keeping the interval for θ when the equation is in 2θ.", "The solutions for 2θ must be found over its own interval.", "Write the new interval for 2θ first."]],
  },
  "y13-u5-l5": {
    teach: [
      ["Why the approximations work", ["For small θ in radians, the curve is close to a straight line or a flat line. Sin and tan are approximately θ, and cos is approximately 1 − θ²/2.", "For θ = 0.1: sin θ = 0.0998, and θ = 0.1, which agree to 2 d.p."], "Use radians for these approximations."],
      ["Using them in limits", ["As θ tends to 0, (1 − cos θ)/θ² tends to ½, because cos θ ≈ 1 − θ²/2 gives (θ²/2)/θ² = ½."], "The approximations give limits."],
    ],
    ex: [["Estimate sin(0.02) and cos(0.02).", ["sin θ ≈ θ", "cos θ ≈ 1 − θ²/2 = 1 − 0.0002"], "sin ≈ 0.02, cos ≈ 0.9998"]],
    mis: [["Using the approximations with degrees.", "They only hold when θ is in radians.", "Convert to radians first."]],
  },

  /* ================== Unit 6: Trigonometric functions ================== */
  "y13-u6-l1": {
    teach: [
      ["Calculating the reciprocals", ["sec θ = 1/cos θ, cosec θ = 1/sin θ, cot θ = 1/tan θ = cos θ/sin θ.", "For example, sec 60° = 1/cos 60° = 1/½ = 2, and cot(π/4) = 1."], "Find the ordinary trig value first, then take the reciprocal."],
      ["Exact values", ["Use the exact values for the ordinary functions to find exact reciprocals. cosec(π/6) = 1/sin(π/6) = 1/½ = 2."], "Reciprocals of exact values are exact."],
    ],
    ex: [["Find the exact value of sec(π/3).", ["cos(π/3) = ½", "sec(π/3) = 1/½"], "2"]],
    mis: [["Writing sec θ as 1/sin θ.", "sec is the reciprocal of cos, not sin.", "Match the reciprocal to the trig function's name."]],
  },
  "y13-u6-l2": {
    teach: [
      ["Asymptotes", ["Sec x has asymptotes wherever cos x = 0, so at x = π/2 and 3π/2. Cosec x has asymptotes wherever sin x = 0, so at x = 0 and π.", "Cot x has asymptotes wherever sin x = 0 as well, because cot x = cos x/sin x."], "Asymptotes are where the original function is zero."],
      ["Shape", ["Between asymptotes, the reciprocal graph is always on the same side of the axis as the original. The graph of sec x never takes values between −1 and 1."], "The reciprocal never has values between −1 and 1 if the original never does."],
    ],
    ex: [["Where does y = cosec x have asymptotes between 0 and 2π?", ["sin x = 0 when x = 0, π, 2π"], "x = 0, π and 2π"]],
    mis: [["Putting the asymptotes at the wrong points for cot.", "Cot's asymptotes come from sin = 0, not cos = 0.", "Write cot as cos/sin to find them."]],
  },
  "y13-u6-l3": {
    teach: [
      ["Rewrite in sin and cos", ["Change every sec, cosec and cot into sin or cos first. Then combine the fractions using a common denominator.", "sec x − cos x = 1/cos x − cos x = (1 − cos²x)/cos x = sin²x/cos x = sin x tan x."], "Write everything in sin and cos, then simplify."],
      ["Solving equations", ["sec x = 2 becomes cos x = ½, which has solutions π/3 and 5π/3 for 0 ≤ x < 2π."], "Turn the reciprocal into the basic trig function, then solve."],
    ],
    ex: [["Solve cot x = 1 for 0 ≤ x < 2π.", ["cos x / sin x = 1", "cos x = sin x"], "x = π/4 or 5π/4"]],
    mis: [["Cancelling a cos in a sum.", "cos x + cos x is 2 cos x, not cos x.", "Only factors cancel, not terms."]],
  },
  "y13-u6-l4": {
    teach: [
      ["Deriving 1 + tan²x = sec²x", ["Start from sin²x + cos²x = 1. Divide every term by cos²x: sin²x/cos²x + 1 = 1/cos²x, so tan²x + 1 = sec²x.", "Similarly, dividing by sin²x gives 1 + cot²x = cosec²x."], "Divide by cos² or sin² to get the new identities."],
      ["Using them", ["These identities let you swap tan² for sec² and so on. They are useful for solving equations with a mix of squares, and in proofs."], "Swap between the three functions with one identity."],
    ],
    ex: [["Prove that sec²x − tan²x = 1.", ["Use 1 + tan²x = sec²x", "Rearrange: sec²x − tan²x = 1"], "Proved"]],
    mis: [["Using cos² + sin² = 1 with the wrong sign.", "The new identities come from dividing, so the signs stay positive.", "Check with a value such as x = 0."]],
  },
  "y13-u6-l5": {
    teach: [
      ["Restricted domains", ["Sin, cos and tan repeat, so they have no inverse over all values. Restrict each to a range where it is one-to-one: arcsin uses −π/2 ≤ x ≤ π/2, arccos uses 0 ≤ x ≤ π, and arctan uses −π/2 < x < π/2.", "The answer from arcsin is always in that range, whatever the original angle was."], "The answer is always in the restricted range."],
      ["Exact values", ["arcsin(½) = π/6 because sin(π/6) = ½ and π/6 is in the range. arccos(−½) = 2π/3, and arctan(1) = π/4."], "Check the answer lies in the range."],
    ],
    ex: [["Find the exact value of arccos(0).", ["cos θ = 0 in the range 0 ≤ θ ≤ π", "θ = π/2"], "π/2"]],
    mis: [["Taking the answer outside the range.", "arcsin cannot give an angle bigger than π/2.", "Always check the answer is in the restricted range."]],
  },
};
