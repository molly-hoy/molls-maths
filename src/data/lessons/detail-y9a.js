/* ==========================================================================
   Going deeper: Year 9, Units 1–6 (accuracy, indices, factorising, equations,
   graphs). Adds a real-world introduction and a "Real-world link" step to
   each lesson. Added by addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y9A = {
  /* ================== Unit 1: Accuracy and estimation ================== */
  "y9-u1-l1": {
    intro: ["Significant figures show how precise a measurement is. A timing of 9.6 seconds and 9.60 seconds are not the same level of accuracy, and a scientist would report them differently."],
    teach: [["Real-world link", [
      "A population reported as 4,000,000 to 1 significant figure may be known only to the nearest million, while 4,032,000 is given to 4 significant figures.",
      "A laboratory balance that reads 0.05 g is much less precise than one that reads 0.0005 g, even though both are small numbers.",
    ], "Significant figures count from the first non-zero digit."]],
  },
  "y9-u1-l2": {
    intro: ["Estimating by rounding to 1 significant figure gives a quick check on any calculation, which is useful when you are in a shop or a planning meeting."],
    teach: [["Real-world link", [
      "Estimating the cost of 38 items at £4.90: 40 × £5 = £200, so a total of £186 would be sensible but £1,860 would not.",
      "Estimating the fuel needed for a 412 km trip at 9.8 km per litre: 400 ÷ 10 = about 40 litres.",
    ], "Round each number to 1 significant figure, then calculate."]],
  },
  "y9-u1-l3": {
    intro: ["A rounded measurement is always a range of possible true values. Knowing that range tells an engineer how much a part could vary."],
    teach: [["Real-world link", [
      "A length reported as 12 cm to the nearest centimetre could be anywhere from 11.5 cm to 12.5 cm.",
      "A bottle labelled 500 ml to the nearest 10 ml holds between 495 ml and 505 ml.",
    ], "The error interval runs half a unit either side of the rounded value."]],
  },
  "y9-u1-l4": {
    intro: ["Bounds are what make a calculation safe when the measurements it uses are only accurate to a given unit, such as a building's maximum width."],
    teach: [["Real-world link", [
      "A room measured as 4.5 m long (to 1 d.p.) and 3.2 m wide (to 1 d.p.): the largest possible area is 4.55 × 3.25, which is the upper bound.",
      "A carpenter who needs a board at least 2 m long checks the lower bound of each measurement, not just the stated value.",
    ], "For the largest answer, use the largest values; for the smallest, use the smallest."]],
  },

  /* ================== Unit 2: Indices and standard form ================== */
  "y9-u2-l1": {
    intro: ["Index laws make big calculations manageable in science and engineering, where powers of ten are everywhere."],
    teach: [["Real-world link", [
      "Multiplying the sizes of two sets of storage: 2³ × 2⁴ = 2⁷, so combining 8 and 16 units gives 128 units.",
      "Shrinking an image by a factor of 10 each step is a repeated division by the same base, using the same law.",
    ], "Same base: add the powers when multiplying, subtract when dividing."]],
  },
  "y9-u2-l2": {
    intro: ["A power of a power appears when quantities double repeatedly, such as cells dividing in a lab."],
    teach: [["Real-world link", [
      "A model that squares a count of 2³ = 8 cells gives (2³)² = 2⁶ = 64, which uses the power-of-a-power law.",
      "Scaling a cube-shaped object's side by a power of 10 changes its volume by a power of 1,000.",
    ], "(aᵐ)ⁿ = aᵐⁿ: multiply the powers."]],
  },
  "y9-u2-l3": {
    intro: ["Zero and negative powers appear in science, such as the concentration of a chemical, where a small amount is written as a negative power."],
    teach: [["Real-world link", [
      "The pH scale is built on powers of ten: a hydrogen ion concentration of 10⁻⁷ mol per litre gives a pH of 7.",
      "A dose of 0.001 g per litre is written as 10⁻³ g per litre, using a negative power.",
    ], "a⁰ = 1, and a⁻ⁿ = 1 ÷ aⁿ."]],
  },
  "y9-u2-l4": {
    intro: ["Standard form lets scientists write the distance to the Sun or the number of stars in a galaxy without writing dozens of zeros."],
    teach: [["Real-world link", [
      "The distance from the Earth to the Sun is about 1.5 × 10⁸ km, which is far easier to read than 150,000,000 km.",
      "The number of seconds in a year is about 3.15 × 10⁷, which is how astronomers compare time spans.",
    ], "Standard form: a number from 1 to 10, times a power of 10."]],
  },
  "y9-u2-l5": {
    intro: ["Very small quantities, such as the size of a cell or a virus, use negative powers of 10 in standard form."],
    teach: [["Real-world link", [
      "A human red blood cell is about 7 × 10⁻⁶ m across, which is 0.000007 m.",
      "A bacterium of 2 × 10⁻⁶ m is written in standard form so that its size can be compared with a virus.",
    ], "Small numbers have negative powers: 0.0003 = 3 × 10⁻⁴."]],
  },
  "y9-u2-l6": {
    intro: ["Calculations in standard form are how a scientist works out the total mass of many particles, or the energy used by a large population."],
    teach: [["Real-world link", [
      "The mass of 2 × 10⁴ grains of sand, each 5 × 10⁻⁵ kg, is (2 × 5) × 10⁴⁻⁵ = 10 × 10⁻¹ = 1 kg.",
      "The number of seconds in 50 years, written in standard form, multiplies the numbers and adds the powers of ten.",
    ], "Multiply or divide the numbers and the powers of ten separately."]],
  },

  /* ================== Unit 3: Prime factors, HCF and LCM ================== */
  "y9-u3-l1": {
    intro: ["Prime factor trees are the way to break a number into its building blocks, and they are used in encryption and in checking numbers."],
    teach: [["Real-world link", [
      "A factor tree for 60 gives 2 × 2 × 3 × 5. Every number has exactly one such list of primes, which is why it is called the unique factorisation.",
      "Modern internet encryption depends on multiplying two large primes together, because splitting the product back into its primes is very hard.",
    ], "Every whole number has exactly one prime factorisation."]],
  },
  "y9-u3-l2": {
    intro: ["Index form makes long lists of prime factors compact, which helps when a number is large."],
    teach: [["Real-world link", [
      "The prime factors of 720 are 2 × 2 × 2 × 2 × 3 × 3 × 5, which is 2⁴ × 3² × 5 in index form.",
      "Comparing 2⁴ × 3² × 5 (720) with 2³ × 3³ × 5 (1080) shows which number is bigger without multiplying out.",
    ], "Write repeated prime factors with an index."]],
  },
  "y9-u3-l3": {
    intro: ["The HCF is the largest group size that can divide two quantities evenly, which is useful when packing identical items."],
    teach: [["Real-world link", [
      "Two rolls of ribbon, 48 cm and 72 cm, cut into the longest equal pieces: the HCF of 48 and 72 is 24, so each piece is 24 cm.",
      "Tiles of the largest size that cover a 96 cm by 120 cm floor exactly: the HCF is 24 cm.",
    ], "HCF = product of the shared prime factors, with the smallest powers."]],
  },
  "y9-u3-l4": {
    intro: ["The LCM tells you when two repeating events will coincide, such as two traffic lights changing at the same time."],
    teach: [["Real-world link", [
      "Two traffic lights change every 40 seconds and 60 seconds. They change together every LCM(40, 60) = 120 seconds.",
      "A bakery makes a batch of 8 loaves and a batch of 12 loaves; the smallest number of loaves to make both batches equal is 24.",
    ], "LCM = product of the highest powers of all the primes."]],
  },
  "y9-u3-l5": {
    intro: ["Choosing between HCF and LCM depends on whether a question is about sharing into groups or about repeating events."],
    teach: [["Real-world link", [
      "Sharing sweets into the largest equal bags is an HCF question.",
      "Two bus routes that return to the station at the same time is an LCM question.",
    ], "Ask: am I grouping (HCF) or matching repeats (LCM)?"]],
  },

  /* ================== Unit 4: Expanding and factorising quadratics ================== */
  "y9-u4-l1": {
    intro: ["Double brackets arise when the area of a rectangle with sides in brackets is found, such as a garden with a path added round it."],
    teach: [["Real-world link", [
      "A garden of length (x + 4) m and width (x + 2) m has area (x + 4)(x + 2) = x² + 6x + 8 m².",
      "A rectangular picture of size (2x + 1) by (x + 3) cm has area found by four products: 2x² + 7x + 3 cm².",
    ], "Multiply every term in one bracket by every term in the other."]],
  },
  "y9-u4-l2": {
    intro: ["Squaring a bracket is the area of a square with a side in brackets, such as a square tile extended by a border."],
    teach: [["Real-world link", [
      "A square patio with side (x + 5) m has area (x + 5)² = x² + 10x + 25 m². The middle term is the two strips along the edges.",
      "Writing (x + 5)² as x² + 25 would leave out the strips, so the area would be wrong.",
    ], "(a + b)² = a² + 2ab + b², never a² + b²."]],
  },
  "y9-u4-l3": {
    intro: ["Quadratic formulae describe real curves, such as the path of a ball or the area of a shape that changes with its length."],
    teach: [["Real-world link", [
      "The height of a ball thrown in the air follows a quadratic, which is why the path is a curve.",
      "The area of a square whose side is x + 2 is a quadratic: (x + 2)² = x² + 4x + 4.",
    ], "A quadratic has x² as its highest power."]],
  },
  "y9-u4-l4": {
    intro: ["Factorising a quadratic is how you find where a curve crosses the axis or the dimensions of a rectangle with a known area."],
    teach: [["Real-world link", [
      "A rectangle with area x² + 7x + 12 has sides (x + 3) and (x + 4), because 3 × 4 = 12 and 3 + 4 = 7.",
      "A ball's path that crosses the ground at two points can be found by factorising its height equation.",
    ], "Find two numbers that multiply to c and add to b."]],
  },
  "y9-u4-l5": {
    intro: ["The difference of two squares is a shortcut for many products, such as a calculation mentally done as 98 × 102."],
    teach: [["Real-world link", [
      "A mental calculation: 98 × 102 = (100 − 2)(100 + 2) = 100² − 2² = 9,996.",
      "A square with a square hole cut out of it has an area that factorises by this rule.",
    ], "x² − a² = (x + a)(x − a)."]],
  },
  "y9-u4-l6": {
    intro: ["Shape and angle problems often lead to an equation, such as finding the sides of a rectangle with a known perimeter."],
    teach: [["Real-world link", [
      "A rectangle whose length is 3 cm more than its width and whose perimeter is 26 cm gives an equation to solve for the width.",
      "Angles in a shape that add to 180° can be written as an equation with one unknown, which is solved to find each angle.",
    ], "Find the geometric fact, write it as an equation, solve."]],
  },

  /* ================== Unit 5: Inequalities and formulae ================== */
  "y9-u5-l1": {
    intro: ["Inequalities describe ranges, such as the speed limit on a road or the number of people allowed in a lift."],
    teach: [["Real-world link", [
      "A lift rated for 8 people: the number of passengers p must satisfy p ≤ 8.",
      "A minimum age of 18 to enter a film is written as age ≥ 18.",
    ], "Use < or > for values strictly inside, ≤ or ≥ when the end point is included."]],
  },
  "y9-u5-l2": {
    intro: ["Showing an inequality on a number line is how a company or a school shows an allowed range of values, such as acceptable temperatures in a fridge."],
    teach: [["Real-world link", [
      "A fridge that must stay between 1 °C and 5 °C: the number line shows a closed circle at 1 and 5.",
      "A ticket price that must be more than £10: an open circle at 10.",
    ], "Open circle for < or >, filled circle for ≤ or ≥."]],
  },
  "y9-u5-l3": {
    intro: ["Solving inequalities is how you find the number of items you can buy with a fixed budget."],
    teach: [["Real-world link", [
      "A budget of £50 for pens costing £4 each: 4p ≤ 50 gives p ≤ 12.5, so you can buy at most 12 pens.",
      "Dividing both sides by −2 flips the sign: −2x > 6 gives x < −3.",
    ], "If you multiply or divide by a negative number, reverse the sign."]],
  },
  "y9-u5-l4": {
    intro: ["Formulae are used every day: the cost of a phone plan, the energy in food or the area of a room."],
    teach: [["Real-world link", [
      "A taxi formula C = 2 + 1.5d, where d is the distance in miles: for 6 miles, C = 2 + 9 = £11.",
      "A formula for the energy in food, with the mass and the energy per gram, is evaluated by substituting the values.",
    ], "Substitute carefully, following the order of operations."]],
  },
  "y9-u5-l5": {
    intro: ["Changing the subject lets you rearrange a formula to find a different quantity, such as the time needed for a journey."],
    teach: [["Real-world link", [
      "Distance d = speed × time. Changing the subject to time gives t = d ÷ s, which is used to find how long a journey takes.",
      "Converting the formula for a pressure gives the force needed when the area is known.",
    ], "Undo the operations in reverse order."]],
  },

  /* ================== Unit 6: Graphs ================== */
  "y9-u6-l1": {
    intro: ["Gradient is the steepness of a road, the rate a bank balance rises or the speed of a ramp."],
    teach: [["Real-world link", [
      "A road sign of 1 in 8 means the gradient is 1/8: the road rises 1 m for every 8 m along.",
      "A water tank that fills by 20 litres every minute has a gradient of 20 litres per minute on a volume graph.",
    ], "Gradient = rise ÷ run, and it has units."]],
  },
  "y9-u6-l2": {
    intro: ["The y-intercept is the starting value, such as the fixed charge in a phone plan or the amount in a savings account at the start."],
    teach: [["Real-world link", [
      "A taxi fare of £3 plus £2 per mile: the y-intercept is 3, the flag-fall charge.",
      "A savings account opened with £100: the intercept is 100.",
    ], "In y = mx + c, the intercept c is the starting value."]],
  },
  "y9-u6-l3": {
    intro: ["Finding the equation of a line from a graph turns a picture into a rule you can use to predict values."],
    teach: [["Real-world link", [
      "A graph of a parking charge that starts at £2 and rises £3 per hour has equation y = 3x + 2.",
      "A line of distance against time with gradient 60 is the rule for a steady 60 km/h journey.",
    ], "Read the gradient and intercept, then write y = mx + c."]],
  },
  "y9-u6-l4": {
    intro: ["Parallel lines in maps and designs, such as rail tracks or lines on a road, have equal gradients."],
    teach: [["Real-world link", [
      "Two railway lines running side by side never meet, so their equations have the same gradient.",
      "Two parallel roads drawn on a map have the same gradient, which is why they never cross.",
    ], "Parallel lines have the same m, different c."]],
  },
  "y9-u6-l5": {
    intro: ["Real-life graphs show how one quantity depends on another, such as the cost of a phone bill or a currency exchange."],
    teach: [["Real-world link", [
      "A currency graph converts pounds to euros: the gradient is the exchange rate.",
      "A phone bill graph shows the fixed cost as the intercept and the cost per gigabyte as the gradient.",
    ], "Always say what the axes and the gradient mean."]],
  },
  "y9-u6-l6": {
    intro: ["A distance-time graph records a journey, and the steepness shows how fast you travelled."],
    teach: [["Real-world link", [
      "A cyclist's graph that is steep at first and flat later shows fast riding followed by a stop.",
      "A horizontal section on a distance-time graph means the journey stopped for a break.",
    ], "Steeper means faster; flat means stopped."]],
  },
};
