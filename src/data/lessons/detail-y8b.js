/* ==========================================================================
   Going deeper: Year 8, Units 7–12 (circles, 3D shapes, transformations,
   statistics and probability). Adds a real-world introduction and a
   "Real-world link" step to each lesson. Added by addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y8B = {
  /* ================== Unit 7: Area and circles ================== */
  "y8-u7-l1": {
    intro: ["Trapeziums appear in roofs, road cross-sections and garden plots, and their area uses the average of the two parallel sides."],
    teach: [["Real-world link", [
      "A sloping garden with parallel sides of 6 m and 10 m and a width of 4 m has area ½(6 + 10) × 4 = 32 m².",
      "The cross-section of a road cutting is a trapezium, so its area tells engineers how much earth was removed.",
    ], "The area is the average of the parallel sides times the height."]],
  },
  "y8-u7-l2": {
    intro: ["Circles are everywhere: wheels, pizzas, clock faces and coins. Their parts have names that you need in every circle question."],
    teach: [["Real-world link", [
      "The radius of a bicycle wheel runs from the hub to the rim, and the diameter runs straight across through the hub.",
      "A pizza cut from the centre to the edge along a radius gives a slice whose tip is at the centre.",
    ], "Radius, diameter, circumference and arc are the parts of a circle."]],
  },
  "y8-u7-l3": {
    intro: ["The circumference is the distance around a circle: the distance a wheel travels in one full turn."],
    teach: [["Real-world link", [
      "A bicycle wheel of diameter 0.7 m travels about 0.7 × 3.14 = 2.2 m for each turn of the wheel.",
      "A circular running track of radius 50 m is 2 × 3.14 × 50 ≈ 314 m around, so a lap is about 314 m.",
    ], "Circumference = π × diameter = 2 × π × radius."]],
  },
  "y8-u7-l4": {
    intro: ["The area of a circle tells you how much grass, paint or fabric a round shape needs."],
    teach: [["Real-world link", [
      "A round table of radius 0.5 m has area π × 0.5² ≈ 0.785 m², so you can buy a tablecloth of the right size.",
      "A circular lawn with radius 6 m needs about 113 m² of turf: π × 6² ≈ 113.1.",
    ], "Area = π × radius², and square the radius first."]],
  },
  "y8-u7-l5": {
    intro: ["Real shapes often combine straight edges with curves, such as a window with a semicircular top or a track with two bends."],
    teach: [["Real-world link", [
      "A window with a rectangle and a semicircle on top: find each area and add them to get the total glass needed.",
      "A running track with two semicircular ends is a rectangle plus one whole circle, so the total area is found by adding the parts.",
    ], "Split the shape into a rectangle, triangle or circle part and add or subtract."]],
  },

  /* ================== Unit 9: 3D shapes ================== */
  "y8-u9-l1": {
    intro: ["3D shapes are the boxes, tins, tents and buildings around you, and their faces, edges and vertices describe them."],
    teach: [["Real-world link", [
      "A cereal box is a cuboid with 6 faces, 12 edges and 8 vertices.",
      "A pyramid-shaped tent has one square face and four triangular faces.",
    ], "Euler's formula: faces + vertices − edges = 2."]],
  },
  "y8-u9-l2": {
    intro: ["A net is what a packaging designer draws before a box is cut, so it must fold up exactly."],
    teach: [["Real-world link", [
      "Cardboard boxes are made from a net of six rectangles, which is folded and glued along the edges.",
      "A tin can's label is a rectangle that wraps round the cylinder, which is the net of the side.",
    ], "A net is the flat shape that folds into a solid."]],
  },
  "y8-u9-l3": {
    intro: ["Surface area is the amount of wrapping paper, paint or card needed to cover a whole object."],
    teach: [["Real-world link", [
      "A cuboid parcel 10 cm by 20 cm by 30 cm needs wrapping paper for its total surface area: 2(200 + 300 + 600) = 2200 cm².",
      "A cylinder tin of radius 5 cm and height 10 cm has a curved side plus two circles, which is found by adding each face.",
    ], "Find every face and add them."]],
  },
  "y8-u9-l4": {
    intro: ["Volume tells you how much a container holds, such as the water in a fish tank or the capacity of a removal van."],
    teach: [["Real-world link", [
      "A fish tank 60 cm long, 30 cm wide and 40 cm high holds 60 × 30 × 40 = 72,000 cm³, which is 72 litres.",
      "A cuboid box of 20 cm by 15 cm by 10 cm holds 3000 cm³ of packing peanuts.",
    ], "Volume = length × width × height, in cubic units."]],
  },
  "y8-u9-l5": {
    intro: ["Architects and engineers draw plans and elevations so that a building can be built from 2D drawings of its sides and top."],
    teach: [["Real-world link", [
      "A house plan is the view from above, and the front elevation shows the front wall with its windows and doors.",
      "A bridge drawing uses several elevations so that the builder can see how the structure looks from the side and front.",
    ], "A plan is the top view; elevations show the sides."]],
  },

  /* ================== Unit 10: Transformations ================== */
  "y8-u10-l1": {
    intro: ["Reflections happen all the time in mirrors, water and car wing mirrors, and they keep shapes the same size."],
    teach: [["Real-world link", [
      "A wing mirror shows the car behind as a reflection: each point is the same distance from the mirror as the real point.",
      "The shape of a reflected building in a lake is a reflection in the water's surface.",
    ], "Each point is the same distance from the mirror line, on the other side."]],
  },
  "y8-u10-l2": {
    intro: ["Rotations describe turning, such as a wheel turning on its axle or a clock hand moving round the dial."],
    teach: [["Real-world link", [
      "A clock hand turns about the centre of the clock, so the centre is the centre of rotation.",
      "A car's wheel turns about its hub, so every point on the rim moves in a circle around the axle.",
    ], "A rotation needs a centre, an angle and a direction."]],
  },
  "y8-u10-l3": {
    intro: ["Translations describe sliding: a lift moving up, a drawer sliding out or a train moving along a track."],
    teach: [["Real-world link", [
      "A lift moves 5 floors up without turning: the translation vector is 0 across and 5 up.",
      "A sliding door moves 1 m to the right, which is a translation of 1 m across.",
    ], "A translation moves every point by the same amount."]],
  },
  "y8-u10-l4": {
    intro: ["Enlargements are how an architect scales a plan up to a building or a photo is printed in a bigger size."],
    teach: [["Real-world link", [
      "A 15 cm wide photo enlarged by scale factor 4 gives a print 60 cm wide.",
      "A scale drawing of a room at scale factor 1/50 makes a 5 m wall 10 cm long on the plan.",
    ], "Multiply every length by the scale factor."]],
  },
  "y8-u10-l5": {
    intro: ["Describing a transformation fully means someone else could repeat it exactly, which matters when instructions are followed on a site or in a game."],
    teach: [["Real-world link", [
      "A treasure map that says turn right is not enough. The instruction must say how far, and about which point.",
      "A rotation instruction must give the centre, the angle and the direction, otherwise the shape could end up in the wrong place.",
    ], "Give the type, the details and the direction."]],
  },
  "y8-u10-l6": {
    intro: ["Congruent shapes are identical copies, such as the same tile repeated on a floor or matching parts made in a factory."],
    teach: [["Real-world link", [
      "Identical bolts from a factory are congruent: they are the same shape and size, so one can replace another.",
      "A tile pattern made by translating one tile is made of congruent shapes.",
    ], "Congruent = same shape and same size."]],
  },

  /* ================== Unit 11: Statistics ================== */
  "y8-u11-l1": {
    intro: ["Pie charts show how a whole is split, such as how a household spends its budget or how a class travels to school."],
    teach: [["Real-world link", [
      "A pie chart of a £1,200 monthly budget: rent is 40%, which is a 144° slice.",
      "A survey of 360 pupils in a pie chart: a slice of 90° is a quarter of the school.",
    ], "Each slice's angle is its share of 360°."]],
  },
  "y8-u11-l2": {
    intro: ["Comparing two groups side by side is how a school compares boys and girls, or a shop compares sales in two years."],
    teach: [["Real-world link", [
      "A dual bar chart of sales in 2024 and 2025 shows which months grew.",
      "A composite bar chart of two classes' test results shows both the total and the parts.",
    ], "Use two bars side by side to compare groups."]],
  },
  "y8-u11-l3": {
    intro: ["Line graphs show how something changes over time: a temperature through a day, or the value of a savings account over years."],
    teach: [["Real-world link", [
      "A line graph of daily temperature shows when it is warmest and when it is coldest.",
      "A graph of a phone's battery over a day shows when it is charged and when it runs down.",
    ], "Read the value at a point, and the trend between points."]],
  },
  "y8-u11-l4": {
    intro: ["Grouped frequency tables handle large data sets, such as the heights or ages of everyone in a town."],
    teach: [["Real-world link", [
      "The ages of 200 people grouped into 0–9, 10–19 and so on gives a grouped frequency table that is easy to read.",
      "Grouping the times of runners into 1–2 minute bands makes a race easy to summarise.",
    ], "Classes group the data; the frequencies count how many fall in each."]],
  },
  "y8-u11-l5": {
    intro: ["A scatter graph shows whether two things are linked, such as the hours studied and the test score."],
    teach: [["Real-world link", [
      "A scatter graph of hours of revision against test score that slopes upward shows positive correlation.",
      "A scatter graph of car age against value that slopes downward shows negative correlation.",
    ], "Positive, negative or no correlation: the pattern of the points tells you which."]],
  },
  "y8-u11-l6": {
    intro: ["Correlation shows a link, but a link does not prove a cause. Ice cream sales and sunburn both rise in summer, but one does not cause the other."],
    teach: [["Real-world link", [
      "Ice cream sales and shark attacks are correlated because both rise in hot weather, but eating ice cream does not cause attacks.",
      "A news story that links two things must be checked for the real cause, such as the weather or the time of year.",
    ], "Correlation is not causation."]],
  },

  /* ================== Unit 12: Probability ================== */
  "y8-u12-l1": {
    intro: ["Sample spaces list every outcome when you do two things, such as choosing an outfit or flipping two coins."],
    teach: [["Real-world link", [
      "A cafe offers 3 sandwiches and 2 drinks: the sample space has 6 combinations, which can be shown in a grid.",
      "Rolling two dice gives 36 outcomes, which is how a board game designer works out chances.",
    ], "A sample space shows every combined outcome."]],
  },
  "y8-u12-l2": {
    intro: ["Two-way tables sort people or things by two features at once, such as gender and favourite sport."],
    teach: [["Real-world link", [
      "A survey of 80 pupils in a two-way table of year group and travel method: the totals show how many use each method.",
      "A shop's table of product type and whether it was sold on offer can show which offers work.",
    ], "Use the row and column totals to find the probabilities."]],
  },
  "y8-u12-l3": {
    intro: ["Relative frequency is the result of an experiment, which is how a company checks whether a game or a product actually works."],
    teach: [["Real-world link", [
      "A drawing pin is tossed 50 times and lands point up 18 times: the relative frequency is 18/50 = 0.36.",
      "A quality test of 200 products with 6 faulty gives a relative frequency of 0.03 for faults.",
    ], "Relative frequency = times it happened ÷ total trials."]],
  },
  "y8-u12-l4": {
    intro: ["Estimating a probability by experiment is how insurance companies and weather services work out risks they cannot calculate in theory."],
    teach: [["Real-world link", [
      "A weather service that counts rainy days over 30 years estimates the chance of rain on a given day.",
      "A small trial of a new game estimates how often players win, and more trials give a better estimate.",
    ], "More trials give a more reliable estimate."]],
  },
  "y8-u12-l5": {
    intro: ["Expected frequency is how many times you would expect something to happen, such as how many people in a class will get a question right."],
    teach: [["Real-world link", [
      "A 0.2 chance of a delivery being late, for 150 deliveries: the expected number of late deliveries is 0.2 × 150 = 30.",
      "A 1/6 chance of rolling a six, for 300 rolls: the expected number of sixes is 50.",
    ], "Expected frequency = probability × number of trials."]],
  },
};
