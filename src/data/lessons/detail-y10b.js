/* ==========================================================================
   Going deeper: Year 10, Units 7–12 (ratio and proportion, similarity,
   trigonometry, 3D measures, statistics and probability). Adds a real-world
   introduction and a "Real-world link" step to each lesson. Added by
   addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y10B = {
  /* ================== Unit 7: Ratio and proportion ================== */
  "y10-u7-l1": {
    intro: ["Combining ratios is needed when mixing paint, concrete or fruit juice from two recipes that share an ingredient."],
    teach: [["Real-world link", [
      "A paint mix of red to blue is 2 : 3, and blue to white is 4 : 5. Making blue 12 in both gives red : blue : white = 8 : 12 : 15.",
      "A fruit juice recipe that matches two ratios gives a three-part ratio used to scale the batch.",
    ], "Make the shared part the same in both ratios."]],
  },
  "y10-u7-l2": {
    intro: ["Ratios with a difference are common in sharing money between two people, such as savings split between siblings."],
    teach: [["Real-world link", [
      "Two siblings share savings in the ratio 3 : 5, and the older one gets £14 more. The difference of 2 parts is £14, so each part is £7 and the shares are £21 and £35.",
      "A recipe that changes its ratio as more flour is added is solved by working through each step in turn.",
    ], "Find the value of one part from the difference."]],
  },
  "y10-u7-l3": {
    intro: ["Direct proportion is used when scaling recipes, buying goods by weight or converting currency."],
    teach: [["Real-world link", [
      "If 5 kg of apples costs £12, then 1 kg costs £2.40, and 3.5 kg costs £8.40.",
      "A recipe for 4 people scaled to 6 people multiplies every ingredient by 6 ÷ 4 = 1.5.",
    ], "Unitary method: find the value of one, then multiply."]],
  },
  "y10-u7-l4": {
    intro: ["Inverse proportion appears when more workers finish a job in less time, or when a higher speed shortens a journey."],
    teach: [["Real-world link", [
      "4 workers take 12 days to build a wall, so 6 workers take 8 days, because 4 × 12 = 6 × 8 = 48 stays the same.",
      "A journey of 200 km at 80 km/h takes 2.5 hours; at 100 km/h it takes 2 hours.",
    ], "In inverse proportion, the product of the two quantities is constant."]],
  },
  "y10-u7-l5": {
    intro: ["Graph shapes show whether two quantities are linked in direct or inverse proportion, which helps you spot patterns in data."],
    teach: [["Real-world link", [
      "A straight line through the origin shows direct proportion, such as the cost of petrol against litres.",
      "A curve that drops as the other quantity rises, like y = k/x, shows inverse proportion, such as time against speed for a fixed distance.",
    ], "A straight line through the origin means direct proportion."]],
  },
  "y10-u7-l6": {
    intro: ["Proportion with powers, such as the energy in a moving object or the brightness of a light, is written with a constant k."],
    teach: [["Real-world link", [
      "The braking distance of a car is proportional to speed squared, so doubling the speed multiplies the distance by 4.",
      "Brightness of a light falls as the square of the distance, which gives y ∝ 1/x².",
    ], "Write y = kxⁿ, find k from the given values, then use it."]],
  },

  /* ================== Unit 8: Congruence and similarity ================== */
  "y10-u8-l1": {
    intro: ["Congruent shapes are identical copies, such as the matching tiles on a floor or identical panels in a car door."],
    teach: [["Real-world link", [
      "Two identical floor tiles are congruent, so one can be placed exactly on top of the other.",
      "A builder checks two roof trusses are congruent by measuring three sides, which proves they match.",
    ], "SSS, SAS, ASA and RHS prove two triangles are congruent."]],
  },
  "y10-u8-l2": {
    intro: ["Similar shapes are enlargements, such as a photo printed at a larger size or a map of a town at a different scale."],
    teach: [["Real-world link", [
      "A photo 4 cm wide enlarged to 10 cm wide has a scale factor of 2.5, so its height is multiplied by 2.5 too.",
      "A model car built at 1 : 10 has every length one-tenth of the real car.",
    ], "Multiply every corresponding length by the scale factor."]],
  },
  "y10-u8-l3": {
    intro: ["Similar triangles are used to find heights that cannot be measured directly, such as a tall tree, using shadows."],
    teach: [["Real-world link", [
      "A 2 m pole casts a 3 m shadow at the same time a tree casts a 15 m shadow, so the tree is 2 × 15 ÷ 3 = 10 m tall.",
      "A line drawn parallel to one side of a triangle creates a smaller similar triangle inside it.",
    ], "Match corresponding sides carefully before setting up the ratio."]],
  },
  "y10-u8-l4": {
    intro: ["Scaling a shape changes its area and volume by different amounts, which matters when you choose a container size."],
    teach: [["Real-world link", [
      "Doubling the side of a square tile multiplies its area by 4 and its cost of material roughly by 4.",
      "A cube-shaped container with lengths doubled holds 2³ = 8 times the volume.",
    ], "Lengths × k; areas × k²; volumes × k³."]],
  },

  /* ================== Unit 9: Trigonometry ================== */
  "y10-u9-l1": {
    intro: ["Trigonometry lets you find a height or an angle when you can measure a distance and an angle, such as from a survey."],
    teach: [["Real-world link", [
      "A ladder leaning at 70° with its foot 2 m from a wall reaches the wall at height 2 × tan 70°.",
      "A surveyor measures the angle of elevation to a tower and picks sin, cos or tan from the sides known.",
    ], "SOH: sin = O/H; CAH: cos = A/H; TOA: tan = O/A."]],
  },
  "y10-u9-l2": {
    intro: ["Exact trig values come up in design and construction, where a 45° or 30° angle must be cut precisely."],
    teach: [["Real-world link", [
      "A carpenter cutting a 45° mitre uses tan 45° = 1, which gives equal sides for a square frame.",
      "A 30° or 60° roof slope has exact values sin 30° = 1/2 and cos 60° = 1/2.",
    ], "Learn the values from the two special triangles."]],
  },
  "y10-u9-l3": {
    intro: ["The sine rule works in any triangle, which is how surveyors find distances across a lake or valley."],
    teach: [["Real-world link", [
      "Two points 100 m apart on a path, with angles 50° and 70° to a tower: the sine rule finds the distance to the tower.",
      "A triangular plot with one known side and its opposite angle is solved by the sine rule.",
    ], "a / sin A = b / sin B = c / sin C."]],
  },
  "y10-u9-l4": {
    intro: ["The cosine rule works when you know two sides and the angle between them, such as the distance across a lake from two points."],
    teach: [["Real-world link", [
      "Two paths 40 m and 60 m from a tower, meeting at 50°: the cosine rule gives the distance between the far ends of the paths.",
      "A ship sails 10 km, turns 60° and sails 8 km; the cosine rule finds its distance from the start.",
    ], "a² = b² + c² − 2bc cos A."]],
  },
  "y10-u9-l5": {
    intro: ["The area of a triangular field or plot is found from two sides and the angle between them, without needing the height."],
    teach: [["Real-world link", [
      "A triangular garden with sides 10 m and 12 m and included angle 40° has area ½ × 10 × 12 × sin 40° ≈ 38.6 m².",
      "A triangular sail uses this formula when only two sides and the angle are measured.",
    ], "Area = ½ab sin C."]],
  },
  "y10-u9-l6": {
    intro: ["Long items such as poles and rods are packed into boxes, and their longest length inside a box is a 3D Pythagoras problem."],
    teach: [["Real-world link", [
      "The longest rod that fits inside a 3 cm by 4 cm by 12 cm box is √(3² + 4² + 12²) = 13 cm.",
      "The angle a ladder makes with the floor of a room is found from a right-angled triangle inside the room.",
    ], "Find the hidden right-angled triangle, then use Pythagoras or trigonometry."]],
  },

  /* ================== Unit 10: Circles, prisms and 3D shapes ================== */
  "y10-u10-l1": {
    intro: ["Sectors are slices of a circle, such as a pizza slice or the part of a pie chart, and their arc and area are fractions of the whole circle."],
    teach: [["Real-world link", [
      "A pizza of radius 6 cm cut into four equal slices: each slice has area (1/4) × π × 6² ≈ 28.3 cm².",
      "A 90° sector of a circle of circumference 12 cm has arc length 3 cm, a quarter of the full circumference.",
    ], "Sector fraction = angle ÷ 360°."]],
  },
  "y10-u10-l2": {
    intro: ["Prisms are everyday shapes, such as chocolate bars or packets, and their volume is found from the shape of the end."],
    teach: [["Real-world link", [
      "A triangular chocolate bar with a triangle of area 12 cm² and length 20 cm has volume 240 cm³.",
      "A gutter with a constant cross-section along its length is a prism, so its volume is the area of the cross-section times the length.",
    ], "Volume = cross-sectional area × length."]],
  },
  "y10-u10-l3": {
    intro: ["Surface area tells you how much paper, paint or material is needed to cover a shape."],
    teach: [["Real-world link", [
      "A cuboid box 10 cm by 5 cm by 4 cm needs wrapping paper of surface area 2(50 + 40 + 20) = 220 cm².",
      "A tin of paint covers the surface area of a wall, so the surface area tells you how many tins to buy.",
    ], "Add the area of every face."]],
  },
  "y10-u10-l4": {
    intro: ["Cones and spheres appear in ice cream, balls and cups, and their volumes come from formulae given on the exam formulae sheet."],
    teach: [["Real-world link", [
      "An ice cream cone of radius 3 cm and height 10 cm has volume (1/3) × π × 3² × 10 ≈ 94 cm³.",
      "A ball of radius 5 cm has volume (4/3) × π × 5³ ≈ 524 cm³, which is used to estimate how much sauce it holds.",
    ], "Use the formula from the sheet; be careful with the radius and diameter."]],
  },
  "y10-u10-l5": {
    intro: ["Pyramids and frustums appear in roofs, lampshades and flowerpots, and their volumes come from related prisms and cones."],
    teach: [["Real-world link", [
      "A pyramid with the same base and height as a box holds one third of the box's volume.",
      "A flowerpot that is a frustum, a cone with its top cut off, is found by subtracting the small cone from the large cone.",
    ], "Pyramid = ⅓ × base area × height."]],
  },

  /* ================== Unit 11: Statistics ================== */
  "y10-u11-l1": {
    intro: ["Cumulative frequency graphs estimate the median and quartiles of grouped data, such as the marks of a whole year group."],
    teach: [["Real-world link", [
      "A graph of exam marks for 200 students shows that the median mark is found where the running total reaches 100.",
      "A cumulative frequency graph makes it easy to compare the middle half of two sets of test results.",
    ], "Plot the running total at the upper end of each class."]],
  },
  "y10-u11-l2": {
    intro: ["The interquartile range (IQR) is a fair measure of spread, because it ignores the extreme values, such as one very late bus."],
    teach: [["Real-world link", [
      "Two bus routes with journey times whose middle halves differ: the route with the smaller IQR is more reliable.",
      "A set of heights with one unusually tall person has a large range but a much smaller IQR.",
    ], "IQR = upper quartile − lower quartile."]],
  },
  "y10-u11-l3": {
    intro: ["Box plots summarise a data set at a glance, such as the spread of heights or shoe sizes in a class."],
    teach: [["Real-world link", [
      "A box plot of two classes' test marks shows the lowest, highest, median and quartiles of each, for an easy comparison.",
      "A box plot of shoe sizes in a shop shows where most sizes lie.",
    ], "Five values: minimum, LQ, median, UQ, maximum."]],
  },
  "y10-u11-l4": {
    intro: ["Comparing two data sets needs both an average and a measure of spread, which is how a shop compares its sales in two towns."],
    teach: [["Real-world link", [
      "Two shops with the same median sales, but one has a much larger IQR: the second shop's sales vary a lot from week to week.",
      "A statement like 'Shop A is better' is not enough; you must relate both the average and the spread to the situation.",
    ], "Always write an average and a spread, linked to the context."]],
  },
  "y10-u11-l5": {
    intro: ["Histograms show grouped data in bars whose widths differ, such as journey times grouped in unequal intervals."],
    teach: [["Real-world link", [
      "A histogram of journey times where the 0–10 minute bar is narrower than the 10–30 minute bar: the area of each bar shows how many journeys.",
      "Reading a histogram gives the frequency from the bar area, not the bar height.",
    ], "Frequency = frequency density × class width."]],
  },

  /* ================== Unit 12: Probability ================== */
  "y10-u12-l1": {
    intro: ["Tree diagrams calculate the chance of two events in order, such as two free throws in basketball."],
    teach: [["Real-world link", [
      "A basketball player who scores 3 in 4 free throws makes both shots with probability (3/4) × (3/4) = 9/16.",
      "The chance that a player scores at least one of two independent shots is 1 − (1/4)² = 15/16.",
    ], "Multiply along the branches; add separate routes."]],
  },
  "y10-u12-l2": {
    intro: ["Without replacement, probabilities change after each event, such as picking two socks from a drawer without looking."],
    teach: [["Real-world link", [
      "A drawer with 4 black and 6 grey socks: the chance that both picked are black is (4/10) × (3/9) = 2/15.",
      "Drawing two sweets from a bag without replacing the first changes the second probability.",
    ], "Reduce the total and the number of that item by one."]],
  },
  "y10-u12-l3": {
    intro: ["Venn diagrams and set notation describe groups that overlap, such as students who play sport and music."],
    teach: [["Real-world link", [
      "Students who play sport (S) and those who play music (M): the overlap is S ∩ M, and all students in either group is S ∪ M.",
      "A survey where S′ means not in sport describes everyone who does not play sport.",
    ], "∪ means 'or', ∩ means 'and', ′ means 'not'."]],
  },
  "y10-u12-l4": {
    intro: ["Conditional probability asks for a chance when something is already known, such as the chance a student is in Year 10 given that they wear glasses."],
    teach: [["Real-world link", [
      "Of 50 students who wear glasses, 20 are in Year 10. The chance a glasses-wearer is in Year 10 is 20/50.",
      "A card drawn from a pack is known to be red; the chance it is a heart is then found from the red cards only.",
    ], "Restrict the total to the given condition."]],
  },
};
