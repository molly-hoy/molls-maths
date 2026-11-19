/* ==========================================================================
   Going deeper: Year 10, Units 1–6 (number, percentages, algebra, quadratics,
   simultaneous equations, coordinates and inequalities). Adds a real-world
   introduction and a "Real-world link" step to each lesson. Added by
   addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y10A = {
  /* ================== Unit 1: Number and surds ================== */
  "y10-u1-l1": {
    intro: ["Shops, bank statements and recipes switch between fractions, decimals and percentages all the time, so being fluent with all three saves time in every exam."],
    teach: [["Real-world link", [
      "A £3 item with 25% off saves £0.75, which is the same as taking off 1/4 of the price.",
      "Comparing a 46% test score, a 0.45 score and a 4/9 score: 4/9 ≈ 0.444, so the order is 46% > 0.45 > 4/9.",
    ], "Converting: decimal ÷ fraction ↔ percentage ×100."]],
  },
  "y10-u1-l2": {
    intro: ["Some decimals stop and others repeat for ever, which matters when a calculator rounds an answer and you need the exact value."],
    teach: [["Real-world link", [
      "A recipe needing 1/8 of a litre is exactly 0.125 l, which a measuring jug can show without rounding.",
      "A recipe needing 1/3 of a cup gives the recurring decimal 0.333…, so you measure the exact fraction, not a rounded decimal.",
    ], "A fraction terminates if its denominator has only factors of 2 and 5."]],
  },
  "y10-u1-l3": {
    intro: ["A calculator shows a repeating decimal as a rounded value, but an exact fraction keeps the answer precise, which is how exam answers are marked."],
    teach: [["Real-world link", [
      "A sales figure of 0.1666… per customer is exactly 1/6, which is the correct figure to report.",
      "A repeating decimal from a currency conversion can be written as an exact fraction before further calculations keep its accuracy.",
    ], "Multiply by 10ⁿ so that the repeating parts line up, then subtract."]],
  },
  "y10-u1-l4": {
    intro: ["Surds keep answers exact. A square with area 2 m² has a side of √2 m, which is more useful than 1.414 m when cutting a board."],
    teach: [["Real-world link", [
      "The diagonal of a 1 m by 1 m square is √2 m, which a builder can mark exactly on a board.",
      "A square with area 8 cm² has side √8 cm = 2√2 cm, so the exact length is kept.",
    ], "√8 = √4 × √2 = 2√2; always look for the largest square number factor."]],
  },
  "y10-u1-l5": {
    intro: ["Multiplying surds often gives a whole number, which is useful when finding the area of a rectangle with surd sides."],
    teach: [["Real-world link", [
      "A rectangle with sides √2 m and √8 m has area √2 × √8 = √16 = 4 m².",
      "A square tile of side √2 cm, multiplied by another of side √2 cm, gives an area of 2 cm² exactly.",
    ], "√a × √b = √(ab); expand brackets just like algebra."]],
  },
  "y10-u1-l6": {
    intro: ["Rationalising the denominator is how mathematicians present a surd in a standard form, which makes two answers easier to compare."],
    teach: [["Real-world link", [
      "A length of 1/√2 m is written as √2/2 m, which is easier to compare with 0.7 m.",
      "A ratio such as 3/√3 becomes √3, which is simpler to use in a scale drawing.",
    ], "Multiply the top and bottom by the surd on the bottom."]],
  },
  "y10-u1-l7": {
    intro: ["Fractional and negative indices describe roots and reciprocals, which appear in science when a quantity is halved or scaled by a root."],
    teach: [["Real-world link", [
      "A cube with volume 8 m³ has side 8^(1/3) = 2 m, because a cube root undoes cubing.",
      "A quantity that is one-eighth of the original after three halvings is written as 2⁻³ = 1/8.",
    ], "a^(1/n) is the nth root; a⁻ⁿ = 1/aⁿ."]],
  },

  /* ================== Unit 2: Percentages and growth ================== */
  "y10-u2-l1": {
    intro: ["A multiplier is the fastest way to apply a percentage increase or decrease, such as a price rise or a discount in a shop."],
    teach: [["Real-world link", [
      "A £40 item with a 20% price rise: 40 × 1.2 = £48.",
      "A £60 jacket in a 15% sale: 60 × 0.85 = £51.",
    ], "Increase by 20% → ×1.2; decrease by 15% → ×0.85."]],
  },
  "y10-u2-l2": {
    intro: ["Successive percentage changes come up in pay rises, price rises and investments that change each year."],
    teach: [["Real-world link", [
      "A £100 share price that rises 10% and then falls 10% ends at £99, not £100, because the fall applies to £110.",
      "A salary that increases by 5% two years running multiplies by 1.05 × 1.05 = 1.1025, a 10.25% total increase.",
    ], "Multiply the multipliers together."]],
  },
  "y10-u2-l3": {
    intro: ["Savings accounts pay interest, and the difference between simple and compound interest matters when you save for years."],
    teach: [["Real-world link", [
      "£1,000 at 3% simple interest earns £30 each year, so it is £1,060 after two years.",
      "£1,000 at 3% compound interest is £1,000 × 1.03² = £1,060.90 after two years, because the second year's interest is paid on the first year's interest too.",
    ], "Compound: amount = P × (1 + r)ⁿ."]],
  },
  "y10-u2-l4": {
    intro: ["Reverse percentages come up when a shop shows the price after VAT and you need the price before it, or when a sale price is given."],
    teach: [["Real-world link", [
      "An item costs £54 including a 20% sales tax: the original price is 54 ÷ 1.2 = £45.",
      "A sale price of £68 after a 15% discount is 68 ÷ 0.85 = £80 before the discount.",
    ], "Divide by the multiplier to undo the change."]],
  },
  "y10-u2-l5": {
    intro: ["Growth and decay describe quantities that change by the same percentage each period, such as a population or the value of a car."],
    teach: [["Real-world link", [
      "A town of 5,000 people growing by 4% each year has population 5,000 × 1.04ⁿ after n years.",
      "A car worth £12,000 that loses 15% of its value each year is worth 12,000 × 0.85ⁿ after n years.",
    ], "Growth: ×(1 + r); decay: ×(1 − r), each time period."]],
  },

  /* ================== Unit 3: Expanding and factorising, algebraic fractions ================== */
  "y10-u3-l1": {
    intro: ["Expanding brackets is used to work out the area of a rectangle with sides in brackets, which is the start of most quadratic work."],
    teach: [["Real-world link", [
      "A rectangular garden with sides (x + 3) m and (x − 5) m has area (x + 3)(x − 5) = x² − 2x − 15 m².",
      "A rectangular room whose length is (2x + 1) m and width (x + 4) m has an area that expands into a quadratic.",
    ], "Every term in one bracket multiplies every term in the other."]],
  },
  "y10-u3-l2": {
    intro: ["Three brackets give a cubic, which describes the volume of a box with three sides in brackets."],
    teach: [["Real-world link", [
      "A box with sides (x + 1), (x + 2) and (x + 3) cm has volume (x + 1)(x + 2)(x + 3) = x³ + 6x² + 11x + 6 cm³.",
      "Expanding (x + 1)(x + 2) first gives x² + 3x + 2, which is then multiplied by the third bracket.",
    ], "Expand two brackets first, then the third."]],
  },
  "y10-u3-l3": {
    intro: ["Factorising a quadratic with a number in front of x² is how you find the sides of a rectangle with a known area."],
    teach: [["Real-world link", [
      "A rectangle with area 2x² + 7x + 3 cm² has sides (2x + 1) cm and (x + 3) cm, because (2x + 1)(x + 3) expands back to it.",
      "A quick check after factorising is to expand the brackets and compare with the original expression.",
    ], "Split the middle term, then factorise in pairs."]],
  },
  "y10-u3-l4": {
    intro: ["Algebraic fractions simplify the same way as number fractions, which is used in formulae for speed, cost and density."],
    teach: [["Real-world link", [
      "A rectangle with area x² − 9 and width x + 3 has length (x² − 9) ÷ (x + 3) = x − 3, after cancelling.",
      "A formula for average speed written as a fraction simplifies once the common factors are cancelled.",
    ], "Factorise top and bottom, then cancel common factors."]],
  },
  "y10-u3-l5": {
    intro: ["Adding algebraic fractions is needed when two rates are combined, such as two pipes filling the same tank."],
    teach: [["Real-world link", [
      "Two pipes take x and x + 1 hours to fill a tank. In one hour they fill 1/x + 1/(x + 1) = (2x + 1)/(x(x + 1)) of it.",
      "Adding two fractions of a payment with different denominators uses the same common denominator method as numbers.",
    ], "Find a common denominator, then combine the numerators."]],
  },
  "y10-u3-l6": {
    intro: ["Algebraic proof shows that a pattern holds for every number, not just the examples you try, which is how mathematicians build trust in a rule."],
    teach: [["Real-world link", [
      "A card trick that always works for any number is explained by an algebraic proof, not by testing a few numbers.",
      "Showing that the sum of two consecutive odd numbers is always a multiple of 4 uses letters to represent any odd number.",
    ], "Let n stand for any integer, then simplify to show the result."]],
  },

  /* ================== Unit 4: Quadratic equations and graphs ================== */
  "y10-u4-l1": {
    intro: ["Solving quadratics by factorising is how you find when a height or a profit becomes zero."],
    teach: [["Real-world link", [
      "A ball's height h = (t − 2)(t + 5) is zero when t = 2 seconds, which is when it lands.",
      "A profit formula that factorises shows the break-even points where the profit is zero.",
    ], "If A × B = 0, then A = 0 or B = 0."]],
  },
  "y10-u4-l2": {
    intro: ["Quadratic graphs are the shape of a water jet, a satellite dish or a bridge arch."],
    teach: [["Real-world link", [
      "A water jet from a fountain follows the path of a parabola, which is found by plotting a table of values.",
      "A satellite dish has a parabolic cross-section, which reflects signals to one point.",
    ], "y = x² is a U-shape with its turning point at the origin."]],
  },
  "y10-u4-l3": {
    intro: ["The roots and turning point of a quadratic graph tell you the maximum height of a ball and when it lands."],
    teach: [["Real-world link", [
      "A ball thrown from a cliff reaches a highest point, the turning point, and lands where the graph crosses the axis, the roots.",
      "A bridge arch crosses the ground at two points, which are its roots.",
    ], "Roots are where y = 0; the turning point is the highest or lowest point."]],
  },
  "y10-u4-l4": {
    intro: ["The quadratic formula solves any quadratic, including those that do not factorise, such as the break-even points of a business."],
    teach: [["Real-world link", [
      "A profit model that does not factorise nicely is solved with the formula to find the two break-even output levels.",
      "The discriminant b² − 4ac tells you whether a ball path crosses the ground twice, once or not at all.",
    ], "x = (−b ± √(b² − 4ac)) ÷ 2a."]],
  },
  "y10-u4-l5": {
    intro: ["Completing the square reveals the lowest cost or highest profit point of a formula directly, which is useful in business planning."],
    teach: [["Real-world link", [
      "A cost formula x² + 6x + 5 = (x + 3)² − 4 shows the minimum cost is −4 when x = −3.",
      "The turning point of a profit curve is found from the completed square form.",
    ], "x² + bx = (x + b/2)² − (b/2)²."]],
  },
  "y10-u4-l6": {
    intro: ["Solving with completing the square gives exact answers, which are needed when a height or distance must be found exactly."],
    teach: [["Real-world link", [
      "Finding when a thrown ball is at height 4 m: (t + 3)² = 4 gives t = −1 or −5, so the time is found from the positive root.",
      "A square garden whose area includes a path can be solved exactly by taking square roots after completing the square.",
    ], "Rearrange so the bracket is squared, then take square roots (both signs)."]],
  },

  /* ================== Unit 5: Simultaneous equations ================== */
  "y10-u5-l1": {
    intro: ["Simultaneous equations describe two facts that are both true, such as the prices of two items bought together."],
    teach: [["Real-world link", [
      "Two purchases: 2 pens and 3 pencils cost £12, and 2 pens and 1 pencil cost £8. Subtracting removes the pens and gives the pencil price.",
      "Adding the two equations removes a letter when the signs are opposite.",
    ], "Make one letter's coefficients match, then add or subtract."]],
  },
  "y10-u5-l2": {
    intro: ["Substitution is used when one equation already tells you one letter, such as a formula for a taxi fare."],
    teach: [["Real-world link", [
      "A phone plan with a cost y = 2x + 1 and a second plan 3x + y = 11: substitute to find x = 2 and y = 5.",
      "Substituting a known price into a second equation finds the other price.",
    ], "Replace the letter with its expression, then solve."]],
  },
  "y10-u5-l3": {
    intro: ["The point where two lines cross is the answer to a pair of simultaneous equations, such as the moment when two costs are equal."],
    teach: [["Real-world link", [
      "Two phone plans, each drawn as a line of cost against minutes: the crossing point is the number of minutes where they cost the same.",
      "Finding the crossing point on a graph gives the same answer as solving the equations algebraically.",
    ], "The solution is the point where the lines cross."]],
  },
  "y10-u5-l4": {
    intro: ["Forming simultaneous equations from a problem is how you work out prices of two items from two receipts."],
    teach: [["Real-world link", [
      "Two adults and three children pay £37, and one adult and two children pay £20. Let a and c be the prices to form 2a + 3c = 37 and a + 2c = 20.",
      "Solving gives a = £14 for an adult and c = £3 for a child.",
    ], "Name the unknowns, write one equation for each fact, then solve."]],
  },
  "y10-u5-l5": {
    intro: ["A straight line can cross a curve at two points, such as a path crossing a curved wall."],
    teach: [["Real-world link", [
      "A straight path y = x + 2 crossing a parabolic arch y = x² meets it where x² = x + 2, at two points.",
      "Solving the linear and quadratic equations together finds where the two shapes cross on a map.",
    ], "Set the two equations equal, rearrange to zero, then factorise or use the formula."]],
  },

  /* ================== Unit 6: Coordinates and inequalities ================== */
  "y10-u6-l1": {
    intro: ["Two readings on a graph are enough to find the rule for a straight line, such as a cost that rises at a fixed rate."],
    teach: [["Real-world link", [
      "A parcel cost of £2 for 1 kg and £8 for 3 kg has gradient 3 and equation y = 3x − 1.",
      "A taxi meter showing £5 at 1 mile and £11 at 3 miles gives the rule for the fare.",
    ], "Gradient = change in y ÷ change in x."]],
  },
  "y10-u6-l2": {
    intro: ["Midpoints and lengths are found on maps and plans, for example the centre of a park between two gates."],
    teach: [["Real-world link", [
      "The midpoint between two gates at (1, 2) and (5, 6) is (3, 4), found by averaging the coordinates.",
      "The distance from (0, 0) to (3, 4) is 5 units, found by Pythagoras.",
    ], "Midpoint: average each coordinate; length: Pythagoras."]],
  },
  "y10-u6-l3": {
    intro: ["Perpendicular lines meet at right angles, such as a path crossing a road or walls in a building."],
    teach: [["Real-world link", [
      "A road with gradient 2 is crossed by a path at right angles, so the path has gradient −1/2.",
      "A wall at right angles to another has a perpendicular gradient, which is used to find its line equation.",
    ], "Perpendicular gradients multiply to −1."]],
  },
  "y10-u6-l4": {
    intro: ["Inequalities describe allowed ranges, such as a temperature range for food storage."],
    teach: [["Real-world link", [
      "A cold room must be below 5 °C: solve x < 5.",
      "A fridge that must stay between −1 °C and 3 °C is a double inequality: −1 ≤ x < 3.",
    ], "Dividing by a negative flips the sign."]],
  },
  "y10-u6-l5": {
    intro: ["A region on a graph shows all the combinations of values that are allowed, such as the land a farmer can use."],
    teach: [["Real-world link", [
      "A farm plot where the fence must stay on or above the line y = x and the total length is x + y ≤ 6 is a shaded region.",
      "A region on a graph shows every point that meets all the rules at once.",
    ], "Shade the region that satisfies every inequality."]],
  },
};
