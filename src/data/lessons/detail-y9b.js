/* ==========================================================================
   Going deeper: Year 9, Units 7–13 (sequences, measures and speed, Pythagoras
   and trigonometry basics, constructions and bearings, statistics and
   probability). Adds a real-world introduction and a "Real-world link" step to
   each lesson. Added by addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y9B = {
  /* ================== Unit 7: Sequences ================== */
  "y9-u7-l1": {
    intro: ["The nth term is a rule that gives any term straight from its position, which a games designer uses to calculate the reward on level 50."],
    teach: [["Real-world link", [
      "A seating plan where row n has 3n + 2 seats gives the number of seats in row 10 straight away: 32.",
      "A mobile game that gives 5 points for the first level and 3 more for each level after that uses the nth term 3n + 2.",
    ], "Find the difference, then work out the constant part."]],
  },
  "y9-u7-l2": {
    intro: ["Checking whether a number belongs to a sequence is how a teacher checks a pattern, or how a programmer tests a rule."],
    teach: [["Real-world link", [
      "A stadium row numbering system follows the nth term 4n + 1: the row 85 is in the sequence, because 4 × 21 + 1 = 85.",
      "A number of cards in a pack that is not in a sequence cannot be reached by the rule, so it is not a term.",
    ], "Solve the nth term equal to the number to check."]],
  },
  "y9-u7-l3": {
    intro: ["Geometric sequences model things that grow quickly, such as compound interest or the spread of a virus in the early days."],
    teach: [["Real-world link", [
      "A bacteria population that triples each hour: 2, 6, 18, 54, which grows very quickly.",
      "A ball that bounces back to 3/4 of its height each time: the heights form a geometric sequence that shrinks.",
    ], "Multiply by the same common ratio each time."]],
  },
  "y9-u7-l4": {
    intro: ["Special sequences such as the Fibonacci numbers appear in nature, from the spiral of a sunflower to the arrangement of leaves."],
    teach: [["Real-world link", [
      "Square numbers describe arranged tiles: a 5 × 5 square of tiles uses 25 tiles.",
      "Fibonacci numbers appear in the spiral of pinecones and sunflower seed heads, which is why they are studied in biology.",
    ], "Learn the names and the patterns of special sequences."]],
  },

  /* ================== Unit 8: Measures and compound units ================== */
  "y9-u8-l1": {
    intro: ["Converting between metric units is needed in cooking, medicine dosages and building plans."],
    teach: [["Real-world link", [
      "A 2.5 litre bottle of water is 2500 ml, which is useful when a recipe asks for millilitres.",
      "A room of 4 m² is 40,000 cm², which is why area conversions use the square of the length conversion.",
    ], "Converting area: square the length factor."]],
  },
  "y9-u8-l2": {
    intro: ["Speed, distance and time are linked in every journey, from planning a bus timetable to checking a car's average speed."],
    teach: [["Real-world link", [
      "A train covers 150 km in 2 hours, so its average speed is 75 km/h.",
      "A runner who goes 10 km in 50 minutes runs at 12 km/h, after converting 50 minutes to 5/6 of an hour.",
    ], "Speed = distance ÷ time, and rearrange for the others."]],
  },
  "y9-u8-l3": {
    intro: ["Density explains why a small metal block can be heavier than a large wooden one, and it is used to check materials and identify them."],
    teach: [["Real-world link", [
      "A block of wood of volume 1000 cm³ with density 0.6 g/cm³ has mass 600 g.",
      "A jeweller checks a gold ring by its density, because gold is much denser than most metals that might be mixed in.",
    ], "Density = mass ÷ volume."]],
  },
  "y9-u8-l4": {
    intro: ["Compound measures such as pressure or flow rate describe how much force or fluid passes through an area or each minute."],
    teach: [["Real-world link", [
      "A tap running at 6 litres per minute fills a 30-litre bucket in 5 minutes.",
      "A car travelling at 25 m/s is going 90 km/h, after converting metres per second to kilometres per hour.",
    ], "Convert each unit separately, then check the answer."]],
  },
  "y9-u8-l5": {
    intro: ["Inverse proportion shows up when a task is shared: more workers means each has less work, so the job takes less time."],
    teach: [["Real-world link", [
      "If 4 painters take 6 hours, then 8 painters take 3 hours, because the product 4 × 6 = 24 stays the same.",
      "A journey of 120 miles at 40 mph takes 3 hours; at 60 mph it takes 2 hours.",
    ], "Multiply the two quantities: the answer is constant."]],
  },
  "y9-u8-l6": {
    intro: ["Maps and plans are scale drawings: every length on the drawing is a fixed fraction of the real length."],
    teach: [["Real-world link", [
      "On a 1 : 25,000 map, 4 cm on the paper is 100,000 cm, or 1 km, on the ground.",
      "A house plan at 1 : 50 shows a 6 m wall as 12 cm on the paper.",
    ], "Multiply by the scale factor to find real lengths."]],
  },

  /* ================== Unit 9: Pythagoras and trigonometry basics ================== */
  "y9-u9-l1": {
    intro: ["Pythagoras' theorem is used by builders to check corners are square, and by sailors and surveyors to find distances."],
    teach: [["Real-world link", [
      "A carpenter checks a corner is square by measuring 3 m, 4 m and 5 m along the sides and the diagonal: 3² + 4² = 5².",
      "A ladder 5 m long placed 4 m from a wall reaches a height of 3 m up the wall.",
    ], "a² + b² = c², where c is the longest side."]],
  },
  "y9-u9-l2": {
    intro: ["Finding a diagonal is how a designer measures across a screen, a room or a sports pitch."],
    teach: [["Real-world link", [
      "A TV screen 60 cm wide and 34 cm high has a diagonal of √(60² + 34²) ≈ 69 cm.",
      "A rectangular football pitch 100 m by 64 m has a diagonal of about 119 m.",
    ], "Square the shorter sides, add, then take the square root."]],
  },
  "y9-u9-l3": {
    intro: ["Finding a shorter side is how a builder works out how far up a wall a ladder reaches."],
    teach: [["Real-world link", [
      "A 10 m ladder reaches 8 m up a wall: the foot is √(10² − 8²) = 6 m from the wall.",
      "A diagonal brace of 5 m fixed to a vertical post of 4 m: the horizontal distance is 3 m.",
    ], "Subtract the squares, then take the square root."]],
  },
  "y9-u9-l4": {
    intro: ["Many real shapes contain hidden right-angled triangles, such as a roof, a pylon or a wedge."],
    teach: [["Real-world link", [
      "The height of a roof with a span of 8 m and a sloping side of 5 m can be found from a right-angled triangle inside the roof.",
      "A rectangular room with a diagonal across the floor contains two right-angled triangles.",
    ], "Draw the right-angled triangle, then use Pythagoras."]],
  },
  "y9-u9-l5": {
    intro: ["The distance between two points on a map or a grid is a Pythagoras calculation, which is how a delivery app works out distances."],
    teach: [["Real-world link", [
      "A drone flying between (1, 2) and (5, 5) on a grid: the distance is √(4² + 3²) = 5 units.",
      "A delivery van that moves 6 blocks east and 8 blocks north covers a straight-line distance of 10 blocks.",
    ], "Find the horizontal and vertical differences, then Pythagoras."]],
  },

  /* ================== Unit 10: Trigonometry ================== */
  "y9-u10-l1": {
    intro: ["Trigonometry finds heights and distances that cannot be measured directly, such as the height of a tree or a tower."],
    teach: [["Real-world link", [
      "A surveyor measures the angle to the top of a tree from 20 m away, and uses tan to find its height.",
      "A ramp for wheelchair access rises at a set angle, and the length and height are linked by trigonometry.",
    ], "Label the sides as opposite, adjacent and hypotenuse, relative to the angle."]],
  },
  "y9-u10-l2": {
    intro: ["The tangent ratio is used whenever a height and a horizontal distance are known, such as the slope of a ski run."],
    teach: [["Real-world link", [
      "A ramp 12 m long with a 1 m rise: tan θ = 1/12, which gives the slope angle.",
      "A tower seen from 50 m away at an angle of 35° has a height of 50 × tan 35° ≈ 35 m.",
    ], "tan = opposite ÷ adjacent."]],
  },
  "y9-u10-l3": {
    intro: ["Sine and cosine are used with the hypotenuse, such as finding the height reached by a ladder or the horizontal reach of a crane."],
    teach: [["Real-world link", [
      "A 6 m ladder leaning at 70° reaches a height of 6 × sin 70° ≈ 5.6 m.",
      "A crane arm 30 m long at 40° has a horizontal reach of 30 × cos 40° ≈ 23 m.",
    ], "sin = opposite ÷ hypotenuse; cos = adjacent ÷ hypotenuse."]],
  },
  "y9-u10-l4": {
    intro: ["Choosing between sine, cosine and tangent is the skill that unlocks any right-angled triangle problem."],
    teach: [["Real-world link", [
      "A surveyor finds a distance using the angle and one side, then picks the ratio that uses the two sides in the triangle.",
      "A pilot's climb angle and speed give a height, which needs the ratio linking the two given values.",
    ], "Use the ratio that links the two values you have."]],
  },
  "y9-u10-l5": {
    intro: ["Finding an angle from two sides is how an engineer works out the slope of a roof or the angle of a ramp."],
    teach: [["Real-world link", [
      "A roof that rises 2 m over a horizontal distance of 5 m has angle tan⁻¹(2/5) ≈ 21.8°.",
      "A ramp 3 m high and 10 m long has angle sin⁻¹(3/10) ≈ 17.5°.",
    ], "Use the inverse function to get the angle."]],
  },

  /* ================== Unit 11: Constructions, loci and bearings ================== */
  "y9-u11-l1": {
    intro: ["Constructions are how engineers and architects draw accurate shapes before measuring, and checking that a triangle is possible prevents a wrong design."],
    teach: [["Real-world link", [
      "Three rods of 3 cm, 4 cm and 10 cm cannot make a triangle, because the two short ones are not long enough to reach.",
      "A carpenter who builds a triangular frame needs the sides to pass the triangle test, or the frame will not close.",
    ], "Check the two shorter sides together are longer than the longest."]],
  },
  "y9-u11-l2": {
    intro: ["A perpendicular bisector is used to find the midpoint of a line and the centre of a circle, such as a centre point for a fountain."],
    teach: [["Real-world link", [
      "A wall fountain placed exactly halfway between two pillars sits on the perpendicular bisector of the line joining them.",
      "A rescue team searching for a point equally far from two towers uses the perpendicular bisector.",
    ], "Every point on the bisector is equally far from both ends."]],
  },
  "y9-u11-l3": {
    intro: ["An angle bisector is used to find a point equally far from two roads or walls, such as where a bench should stand between two paths."],
    teach: [["Real-world link", [
      "A bench placed equally far from two straight paths that meet at an angle sits on the angle bisector.",
      "A ground-level stand placed at the same distance from two walls that meet at a corner uses the angle bisector.",
    ], "Points on the bisector are equally far from both arms."]],
  },
  "y9-u11-l4": {
    intro: ["A locus is the set of places that follow a rule, such as the area a dog can reach on a lead."],
    teach: [["Real-world link", [
      "A dog tied to a post with a 3 m lead can reach anywhere within a circle of radius 3 m, which is a locus.",
      "A mobile phone signal that reaches everywhere within 2 km of a mast is a locus shaped like a circle.",
    ], "A locus describes all points that obey a rule."]],
  },
  "y9-u11-l5": {
    intro: ["Bearings are the standard way of giving directions for ships, aircraft and walkers, measured clockwise from north."],
    teach: [["Real-world link", [
      "A ship sailing on a bearing of 060° sails east-north-east, and a plane on 240° flies south-west.",
      "A walker's route on a map is described with a bearing for each leg, written with three figures.",
    ], "Always measure clockwise from north, and write three figures."]],
  },
  "y9-u11-l6": {
    intro: ["Scale drawings with bearings are used to plan routes at sea, in the air and across the countryside."],
    teach: [["Real-world link", [
      "A boat travels 5 km on a bearing of 040°, then 3 km on 130°. A scale drawing shows its final position from the start.",
      "A rescue helicopter plans a route by drawing bearings from its base to the incident.",
    ], "Draw north lines at each point, then measure the bearings."]],
  },

  /* ================== Unit 12: Statistics ================== */
  "y9-u12-l1": {
    intro: ["Frequency tables summarise large data sets, such as the number of people who visit a shop each day."],
    teach: [["Real-world link", [
      "A table showing how many books each student borrowed in a month gives the mean, median and mode without listing every student.",
      "A survey of shoe sizes in a frequency table gives the most common size, which is the mode.",
    ], "Use the frequencies to find the averages."]],
  },
  "y9-u12-l2": {
    intro: ["With grouped data, the exact values are unknown, so the mean is only an estimate, which is how a report on ages or incomes is written."],
    teach: [["Real-world link", [
      "The ages of people in a village grouped into 0–9, 10–19 and so on: the midpoint of each class gives an estimated mean.",
      "A survey of journey times in 5-minute groups gives an estimate of the average journey, not the exact average.",
    ], "Use the midpoint of each class to estimate the mean."]],
  },
  "y9-u12-l3": {
    intro: ["Comparing two sets of data needs an average and a measure of spread, which is how a shop compares its sales in two towns."],
    teach: [["Real-world link", [
      "Two bus routes: the mean journey time is the same, but one has a much larger range, which means less reliable buses.",
      "Two shops with the same average sales but different spread: one has steady sales, the other has very busy and very quiet days.",
    ], "Always compare an average and a spread, and link both to the situation."]],
  },
  "y9-u12-l4": {
    intro: ["A sample is a smaller group chosen to represent everyone, which is how opinion polls and market research work."],
    teach: [["Real-world link", [
      "A survey asking only people leaving a gym about exercise gives a biased sample, because it misses people who do not go to gyms.",
      "A random sample of 100 students from a school of 1,000 uses proportional sampling by year group to be fair.",
    ], "A good sample represents the whole population."]],
  },
  "y9-u12-l5": {
    intro: ["Time series graphs show the trend in sales, rainfall or passengers over time, which helps businesses plan."],
    teach: [["Real-world link", [
      "A shop's monthly sales graph shows that sales rise in December each year, which helps order stock.",
      "A rainfall graph for the year shows wet months and dry months, which a farmer uses to plan planting.",
    ], "Look for the overall trend and any seasonal pattern."]],
  },

  /* ================== Unit 13: Probability ================== */
  "y9-u13-l1": {
    intro: ["Sample space diagrams are how you list every outcome of two events, such as two dice in a board game."],
    teach: [["Real-world link", [
      "Two dice in a board game: the 6 × 6 grid of outcomes shows the chance of each total from 2 to 12.",
      "A coin tossed and a card drawn: the grid shows every combination of heads or tails with a suit.",
    ], "A grid lists every pair of outcomes."]],
  },
  "y9-u13-l2": {
    intro: ["Venn diagrams sort people into groups that overlap, such as those who play football, those who play tennis and those who play both."],
    teach: [["Real-world link", [
      "A class where 12 play football, 8 play tennis and 4 play both: the Venn diagram shows 8 play football only, 4 both and 4 tennis only.",
      "A survey of pupils who like maths and science, with an overlap in the middle, uses a Venn diagram.",
    ], "The overlap is the 'and' region."]],
  },
  "y9-u13-l3": {
    intro: ["Tree diagrams show a sequence of events, such as drawing two sweets from a bag without putting the first one back."],
    teach: [["Real-world link", [
      "Two coin tosses: the tree shows the chance of two heads as 1/2 × 1/2 = 1/4.",
      "Two draws from a bag of 3 red and 2 blue sweets without replacement: the second probability changes because one sweet has gone.",
    ], "Multiply along the branches; add the separate routes."]],
  },
  "y9-u13-l4": {
    intro: ["Independent events do not affect each other, such as two separate rolls of a dice, so their probabilities multiply."],
    teach: [["Real-world link", [
      "Rolling a dice and flipping a coin are independent: the chance of a six and a head is 1/6 × 1/2 = 1/12.",
      "The chance that at least one of two independent machines works is 1 minus the chance that both fail.",
    ], "Use the 'at least one' trick: 1 − P(none)."]],
  },
};
