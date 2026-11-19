/* ==========================================================================
   Going deeper: Year 8, Units 1–6 (negatives and powers, fractions,
   percentages, factorising and equations, graphs, ratio and proportion).
   Adds a real-world introduction and a "Real-world link" step to each
   lesson. Added by addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y8A = {
  /* ================== Unit 1: Powers, roots and negatives ================== */
  "y8-u1-l1": {
    intro: ["Negative numbers are used whenever something goes below a starting point: a temperature falling, a debt growing or a lift going underground."],
    teach: [["Real-world link", [
      "A temperature of −2 °C that falls by 5 degrees is −7 °C, which is 2 + 5 steps below zero.",
      "An overdrawn account at −£40 that receives £25 and pays out £10 ends at −£25.",
    ], "Subtracting a negative is like adding, and adding a negative is like subtracting."]],
  },
  "y8-u1-l2": {
    intro: ["The sign rules tell you the sign of an answer without working it out in full, which helps you check calculator results."],
    teach: [["Real-world link", [
      "Losing £3 a day for 4 days is a total change of (−3) × 4 = −£12, a negative result.",
      "Two losses of £2 each can be thought of as (−2) × (−1), which helps explain why two negatives make a positive in the sign rule.",
    ], "Two negatives multiply to make a positive; one negative makes the answer negative."]],
  },
  "y8-u1-l3": {
    intro: ["Square and cube roots tell you the side length of a square or cube from its area or volume, which is essential in building and design."],
    teach: [["Real-world link", [
      "A square patio of 36 m² has sides of √36 = 6 m, so that is the length of each edge.",
      "A cube-shaped water tank with a volume of 64 m³ has edges of ∛64 = 4 m.",
    ], "A root is the reverse of a power."]],
  },
  "y8-u1-l4": {
    intro: ["Index notation is how scientists write very large and very small numbers, such as the number of cells in a body or the size of an atom."],
    teach: [["Real-world link", [
      "The number of seconds in a day is about 8.64 × 10⁴, a far shorter way to write 86,400.",
      "Repeated doubling for bacteria: after 3 doublings from 1 cell there are 2³ = 8 cells.",
    ], "A power says how many times to multiply a number by itself."]],
  },
  "y8-u1-l5": {
    intro: ["BIDMAS keeps the order of a calculation the same on every calculator and spreadsheet, so one answer is always correct."],
    teach: [["Real-world link", [
      "A till bill of £2 + 3 × £4: multiplying first gives £2 + £12 = £14, which is the total the till should show.",
      "Spreadsheet formulas calculate powers and roots first, then multiplication and division, and finally addition and subtraction.",
    ], "Brackets, indices, then division and multiplication, then addition and subtraction."]],
  },

  /* ================== Unit 2: Fractions ================== */
  "y8-u2-l1": {
    intro: ["Multiplying fractions is how you find a part of a part, such as a fraction of a fraction of a cake."],
    teach: [["Real-world link", [
      "Half of a 3/4 of a pizza is 1/2 × 3/4 = 3/8 of the pizza.",
      "A 2/3 hour lesson where half of it is practice: 1/2 × 2/3 = 1/3 of an hour spent practising.",
    ], "Multiply the tops and multiply the bottoms."]],
  },
  "y8-u2-l2": {
    intro: ["Dividing by a fraction is how you find how many small portions fit into a larger amount, such as how many 1/4 litre cups fill a 2 litre jug."],
    teach: [["Real-world link", [
      "How many 3/4 litre bottles fill 6 litres? 6 ÷ 3/4 = 6 × 4/3 = 8 bottles.",
      "How many 1/3 pizzas can be served from 2 pizzas? 2 × 3 = 6 portions.",
    ], "Dividing by a fraction is multiplying by its reciprocal."]],
  },
  "y8-u2-l3": {
    intro: ["Adding mixed numbers is how you work out the total length of planks, or the total time spent on several tasks."],
    teach: [["Real-world link", [
      "Two planks of 2 1/2 m and 1 3/4 m laid end to end: adding the wholes and fractions gives 4 1/4 m.",
      "A recipe that needs 1 1/2 cups and 2 3/4 cups of two ingredients totals 4 1/4 cups.",
    ], "Add the wholes, then the fractions, then carry any extra whole."]],
  },
  "y8-u2-l4": {
    intro: ["Mixed numbers are often used with recipes and building measurements, so multiplying and dividing them comes up often."],
    teach: [["Real-world link", [
      "A recipe for 1 1/2 cups of flour that you want to double: 1 1/2 = 3/2, so 3/2 × 2 = 3 cups.",
      "A wall 3 1/2 m long needs 1 3/4 m panels: 3 1/2 ÷ 1 3/4 = 7/2 ÷ 7/4 = 2 panels.",
    ], "Convert to improper fractions before you multiply or divide."]],
  },
  "y8-u2-l5": {
    intro: ["Problems that say a fraction of what is left come up in budgets, time management and sharing jobs."],
    teach: [["Real-world link", [
      "You spend 1/3 of £60 on food, then 1/2 of what is left on clothes. The food is £20, leaving £40, and clothes take £20, leaving £20.",
      "A reading book: you read 1/4 of a book on Monday and 1/3 of what is left on Tuesday. The remaining fraction is 1/2 of the book.",
    ], "Work out each fraction of the remaining amount, one step at a time."]],
  },

  /* ================== Unit 3: Percentages ================== */
  "y8-u3-l1": {
    intro: ["Being fluent between fractions, decimals and percentages means you can pick the easiest form for any shopping, pay or test question."],
    teach: [["Real-world link", [
      "A discount of 3/10 off is the same as 0.3 off or 30% off. Choose the form that is easiest to work with.",
      "A 0.85 interest rate is the same as 85%, which can be read in a bank statement.",
    ], "Convert everything to one form before you compare."]],
  },
  "y8-u3-l2": {
    intro: ["Finding a percentage of an amount is how you calculate a tip, a VAT amount or a discount on a sale."],
    teach: [["Real-world link", [
      "A 17.5% VAT charge on a £240 item: 0.175 × 240 = £42.",
      "A 12% discount on a £64 jacket: 0.88 × £64 = £56.32 is the price after the discount.",
    ], "Use the decimal multiplier: 0.175 for 17.5%."]],
  },
  "y8-u3-l3": {
    intro: ["Increasing or decreasing by a percentage is how you calculate a pay rise, a price increase or a fall in population."],
    teach: [["Real-world link", [
      "A £400 salary increased by 5%: find 5% of £400 = £20, then add it to get £420.",
      "A bill of £80 reduced by 15%: £80 − £12 = £68.",
    ], "Find the percentage, then add or subtract."]],
  },
  "y8-u3-l4": {
    intro: ["A multiplier does a percentage change in one step, which is how a spreadsheet calculates a price after a rise or a fall."],
    teach: [["Real-world link", [
      "A 20% increase: multiplier 1.2. A 20% decrease: multiplier 0.8.",
      "A price of £50 after a 15% rise: 50 × 1.15 = £57.50.",
    ], "1 + the increase, or 1 − the decrease, as a decimal."]],
  },
  "y8-u3-l5": {
    intro: ["Writing one number as a percentage of another lets you compare results from different totals, such as test scores out of different marks."],
    teach: [["Real-world link", [
      "A test score of 36 out of 40 is 36 ÷ 40 × 100 = 90%. A score of 42 out of 50 is 84%, so the first is better.",
      "A football team wins 12 of its 20 matches, which is 60% of matches won.",
    ], "Divide the part by the whole, then multiply by 100."]],
  },
  "y8-u3-l6": {
    intro: ["Percentage change is what a price change, a population growth or a fall in sales is really measured by."],
    teach: [["Real-world link", [
      "A price went from £40 to £50: the change is £10, and 10 ÷ 40 × 100 = 25% increase.",
      "Sales fell from 800 to 600 items: the change is −200, and −200 ÷ 800 × 100 = −25%.",
    ], "Always compare the change with the original amount."]],
  },

  /* ================== Unit 4: Equations and factorising ================== */
  "y8-u4-l1": {
    intro: ["Factorising is what you do when a company turns a big sum into a simple product, such as working out the common cost of several items."],
    teach: [["Real-world link", [
      "A shop sells 6 pens and 9 pencils at a total of 6p + 9q. Taking out the common factor 3 gives 3(2p + 3q), which shows the total is three times a single bundle.",
      "Areas of two rectangles sharing one side: the total area can be written as a single product by factorising.",
    ], "Take out the highest common factor first."]],
  },
  "y8-u4-l2": {
    intro: ["Equations describe real problems: a phone plan, a parking charge or a shape with an unknown side."],
    teach: [["Real-world link", [
      "A taxi charges £3 plus £2 per mile. For a total of £15, the equation 3 + 2m = 15 finds the number of miles m.",
      "A rectangle with a length 3 cm more than its width and a perimeter of 26 cm gives 2(w + 3) + 2w = 26.",
    ], "Write what the words say as an equation with a letter."]],
  },
  "y8-u4-l3": {
    intro: ["One-step equations are the basics behind every calculator memory and pricing sheet."],
    teach: [["Real-world link", [
      "A bike costs £120, paid in 4 equal instalments: 4x = 120, so each instalment is £30.",
      "A spreadsheet price is found by dividing the total by the number of items, which is the inverse of multiplying.",
    ], "Use the inverse operation to undo the change."]],
  },
  "y8-u4-l4": {
    intro: ["Two-step equations come up in phone contracts and taxi fares, where there is a fixed charge and a rate."],
    teach: [["Real-world link", [
      "A gym costs £25 to join plus £12 per month. For a total of £109: 12m + 25 = 109, so 12m = 84 and m = 7 months.",
      "A taxi fare of £4 plus £1.50 per mile: 1.5m + 4 = 13 gives m = 6 miles.",
    ], "Undo the + or − first, then the × or ÷."]],
  },
  "y8-u4-l5": {
    intro: ["Equations with brackets come up in pricing, when a shop applies a rate to a group of items."],
    teach: [["Real-world link", [
      "A group of x people plus 3 more, each paying £6, pay £72 in total: 6(x + 3) = 72 gives x + 3 = 12, so x = 9.",
      "A phone plan with a monthly charge of 2(x + 4) pounds: the total is found by expanding first.",
    ], "Expand or divide both sides, then solve."]],
  },
  "y8-u4-l6": {
    intro: ["When x appears on both sides it compares two costs or two rates, which is how a business decides which offer is better."],
    teach: [["Real-world link", [
      "Company A charges £5 + £2 per hour; company B charges £3 + £3 per hour. The hours where they cost the same are found from 5 + 2x = 3 + 3x.",
      "Two shops: one charges 4x for x items, the other charges 2x + 10. Set them equal to find where the prices match.",
    ], "Collect the x terms on one side to find the break-even point."]],
  },

  /* ================== Unit 5: Coordinates and graphs ================== */
  "y8-u5-l1": {
    intro: ["Coordinates locate places on maps, in games and in satellite navigation, which uses latitude and longitude."],
    teach: [["Real-world link", [
      "A treasure map uses coordinates such as (3, −2) to mark a location, with negatives to the left and below.",
      "A city grid map uses numbers across and up, the same way a graph does.",
    ], "Across first (x), then up or down (y)."]],
  },
  "y8-u5-l2": {
    intro: ["Horizontal and vertical lines are the simplest graphs, and they describe fixed values such as a shelf height or a boundary."],
    teach: [["Real-world link", [
      "A flood level of 3 m across a river is the horizontal line y = 3.",
      "A boundary wall at x = 5 m on a plan is a vertical line.",
    ], "y = a is horizontal, x = a is vertical."]],
  },
  "y8-u5-l3": {
    intro: ["A table of values is the first step to graphing a real rule, such as the cost of a taxi ride against the distance travelled."],
    teach: [["Real-world link", [
      "A taxi charging £3 + £2 per mile: fill a table for 0, 1, 2 and 3 miles, then plot the cost against the distance.",
      "A spreadsheet table of values is exactly how a graph of a savings plan is built.",
    ], "Substitute each x to find its y."]],
  },
  "y8-u5-l4": {
    intro: ["Straight-line graphs describe steady change: the speed of a car on a motorway, or the cost of a phone plan."],
    teach: [["Real-world link", [
      "A phone plan costing £10 plus £5 per month is the line y = 5x + 10, where y is the cost and x is the number of months.",
      "A car travelling at a steady 60 km/h has a straight-line distance graph.",
    ], "The straight line y = mx + c has gradient m and intercept c."]],
  },
  "y8-u5-l5": {
    intro: ["Gradient measures steepness, which is how roads are signed, ramps are checked and savings growth is compared."],
    teach: [["Real-world link", [
      "A road sign shows a 1 in 10 gradient, meaning the road rises 1 m for every 10 m along.",
      "A savings graph that rises by £50 for every month has a gradient of 50 pounds per month.",
    ], "Gradient = rise ÷ run."]],
  },

  /* ================== Unit 6: Ratio and proportion ================== */
  "y8-u6-l1": {
    intro: ["Sharing in a ratio is used for splitting a business profit, a prize or the ingredients of a recipe."],
    teach: [["Real-world link", [
      "A prize of £300 is shared in the ratio 1 : 2 : 3, giving £50, £100 and £150.",
      "A concrete mix of 1 : 2 : 3 (cement, sand, aggregate) is a three-part ratio.",
    ], "Find the total parts, then the value of one part."]],
  },
  "y8-u6-l2": {
    intro: ["Sometimes you know one share and must work out the rest, such as when one partner's money is known in a shared bill."],
    teach: [["Real-world link", [
      "Two people share a bill in the ratio 2 : 5. One pays £14, so one part is £7, and the other pays 5 × £7 = £35.",
      "A recipe with a known amount of one ingredient can be used to find the other amounts.",
    ], "Find the value of one part from the known share."]],
  },
  "y8-u6-l3": {
    intro: ["Direct proportion is how pay, fuel and ingredients change together: twice as many hours gives twice the pay."],
    teach: [["Real-world link", [
      "A worker paid £9 per hour: 5 hours earns £45, 10 hours earns £90, because the amount doubles when the hours double.",
      "A car uses 6 litres for 60 miles, so for 150 miles it uses 15 litres.",
    ], "Both quantities change at the same rate."]],
  },
  "y8-u6-l4": {
    intro: ["The unitary method is how a shop works out the price of one item before scaling up to a bulk order."],
    teach: [["Real-world link", [
      "Five pencils cost £1.20, so one pencil costs £0.24, and 12 pencils cost £2.88.",
      "A recipe for 4 people is scaled to 7 by first finding the amount for 1 person.",
    ], "Find the value of one, then multiply up."]],
  },
  "y8-u6-l5": {
    intro: ["Best buy questions help you choose between sizes or brands by comparing the price of the same amount."],
    teach: [["Real-world link", [
      "A 500 g pack for £2.50 costs £0.50 per 100 g; a 750 g pack for £3.60 costs £0.48 per 100 g, so the larger pack is better value.",
      "Comparing two phone plans by price per gigabyte shows which one gives more data for the money.",
    ], "Compare like with like: the same unit for both."]],
  },
};
