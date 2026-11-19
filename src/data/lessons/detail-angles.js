/* ==========================================================================
   Going deeper: angles (Year 7 Unit 8 and Year 8 Unit 8)
   Each lesson gets:
     intro:  extra sentences added after the short introduction (the real-world hook)
     prior:  a fuller "Before you start" list (replaces the short one)
     teach:  a "Real-world link" step, plus extra steps where useful
   Added by addDetail() in light.js.
   ========================================================================== */

export const DETAIL_ANGLES = {
  /* ================== Year 7, Unit 8: Angles and lines ================== */
  "y7-u8-l1": {
    intro: ["You meet angles every time something turns: a door opening, a clock hand moving, a ramp tilting, or the corner of a page. An angle measures how far something has turned, between two lines (arms) that meet at a point called the vertex."],
    prior: [
      "Measuring turns in degrees: a full turn is 360°, half a turn is 180° and a quarter turn is 90°.",
      "Recognising a right angle as the corner of a book page or a square.",
      "Knowing that a straight line is a half turn, so it measures 180°.",
    ],
    teach: [
      ["Real-world link", [
        "A clock hand moving from 12 to 3 turns through a right angle (90°). Moving from 12 to 6 is a straight line (180°).",
        "A steep slide makes an acute angle with the ground. A chair back leaning past upright makes an obtuse angle.",
        "Builders and engineers describe slopes and joints in degrees, because the number tells them exactly how much something has turned.",
      ], "An angle tells you how much something has turned, not how long its arms are."],
      ["Naming the types", [
        "Acute: between 0° and 90°. Right: exactly 90°, marked with a small square. Obtuse: between 90° and 180°. Straight: exactly 180°. Reflex: between 180° and 360°.",
        "Estimate first: is it smaller or bigger than a right angle? That one check rules out most wrong answers.",
      ], "Estimate first, then name the type."],
    ],
  },
  "y7-u8-l2": {
    intro: ["Builders, map-makers and pilots all need angles read accurately. A protractor is the tool for that, and the key skill is lining it up on the correct scale every time."],
    prior: [
      "Types of angle: acute, right, obtuse, straight and reflex.",
      "Reading a scale: a protractor runs from 0° to 180°, with two scales that count in opposite directions.",
      "Knowing that an angle is measured from one arm to the other, at the vertex.",
    ],
    teach: [
      ["Real-world link", [
        "Sailors and pilots give directions as bearings, measured clockwise from north. They use the same skill of lining up a protractor.",
        "When you draw a floor plan or a garden layout, the corner angles must be accurate or the pieces will not fit together.",
        "A footballer shooting at goal judges the angle between the ball and the two posts: the wider the angle, the bigger the target.",
      ], "Accurate angles make real things fit together."],
      ["Measuring step by step", [
        "1. Put the centre cross exactly on the vertex (the corner).",
        "2. Line up one arm with the 0° line of the protractor.",
        "3. Read where the other arm crosses the scale that starts at 0° on that arm.",
        "4. Check with an estimate: a reading of 40° for an angle that looks obtuse is wrong.",
      ], "Vertex, zero, read, check."],
    ],
  },
  "y7-u8-l3": {
    intro: ["A straight line is a half turn, so any angles that sit along it must add up to 180°. This is how surveyors find missing angles and how carpenters check a shelf sits flat."],
    prior: [
      "A straight line is 180°, a half turn.",
      "Types of angle, and estimating whether an angle is more or less than 90°.",
      "Solving a one-step equation, such as 65 + x = 180.",
    ],
    teach: [
      ["Real-world link", [
        "A diagonal brace fixed to a straight beam splits the beam's straight line into two angles, and those two angles add up to 180°.",
        "When a road bends, the angles on one side of a straight stretch of road add to 180° with the angles on the other side.",
        "Designers use straight-line angles to check that a shelf or table top sits flat against the wall.",
      ], "A straight line gives you 180° to share out."],
      ["Writing the equation", [
        "Let the missing angle be x.",
        "Write the sum: 65 + x = 180.",
        "Solve: x = 180 − 65 = 115°.",
        "Check: 65 + 115 = 180, so the answer is correct.",
      ], "Write the sum, solve, then check it adds back to 180°."],
    ],
  },
  "y7-u8-l4": {
    intro: ["A full turn is 360°. Around a single point, this shows up in a pizza cut into slices, the spokes of a bicycle wheel and the segments of a dartboard."],
    prior: [
      "Angles on a straight line add up to 180°.",
      "A full turn is 360°, so angles round a point share 360°.",
      "Solving one-step equations with a letter.",
    ],
    teach: [
      ["Real-world link", [
        "A pie chart is a circle split into slices. Each slice's angle is a share of the full 360°.",
        "The spokes of a wheel share out the full turn around the hub.",
        "A pizza cut into 8 equal slices has 45° at the centre for each slice, because 360 ÷ 8 = 45.",
      ], "Angles round a point are shares of one full turn."],
      ["Checking your answer", [
        "Add all the angles round the point and check the total is 360°.",
        "If the total is wrong, look for a missing angle or one you have counted twice.",
      ], "Add to 360° to check."],
    ],
  },
  "y7-u8-l5": {
    intro: ["Where two roads cross, the four corners form pairs of opposite angles that are the same size. Road-layout drawings and crossing shapes use this to stay consistent."],
    prior: [
      "Angles on a straight line add up to 180°.",
      "Recognising neighbouring angles, which share an arm.",
      "Solving simple equations with one unknown.",
    ],
    teach: [
      ["Real-world link", [
        "Two roads or railway lines that cross: the angle in one corner is the same as the angle in the corner directly opposite it.",
        "Scissors open like an X. The blades form equal opposite angles at the pivot.",
        "A folding chair or a pair of compasses makes the same pattern: opposite angles match, neighbouring angles make a straight line.",
      ], "Crossing lines make equal opposite angles."],
    ],
  },
  "y7-u8-l6": {
    intro: ["Triangles are used in roof trusses, bridges and sails. The rule that the three angles add up to 180° is how a builder checks that a triangular frame is correct."],
    prior: [
      "Angles on a straight line add up to 180°.",
      "The types of triangle: equilateral, isosceles, scalene and right-angled.",
      "Solving equations with one unknown, including dividing by 2.",
    ],
    teach: [
      ["Real-world link", [
        "A roof truss is made of triangles. If the angles at a joint do not add up correctly, the roof will not fit together.",
        "Surveyors use triangles to measure distances they cannot reach directly, starting from angles they can measure.",
        "In a right-angled triangle one angle is 90°, so the other two must add up to 90°.",
      ], "Every triangle's angles add up to 180°, whatever its shape."],
      ["Isosceles triangles", [
        "Two equal sides means two equal base angles.",
        "If the top angle is 40°, each base angle is (180 − 40) ÷ 2 = 70°.",
      ], "Equal sides give equal angles."],
    ],
  },
  "y7-u8-l7": {
    intro: ["Four-sided shapes are everywhere: windows, table tops, floor tiles and fields. Every quadrilateral's angles add up to 360°, which is how a tiler checks that a corner is right."],
    prior: [
      "Angles in a triangle add up to 180°.",
      "The names of quadrilaterals: square, rectangle, parallelogram, rhombus, trapezium and kite.",
      "Solving equations with one unknown.",
    ],
    teach: [
      ["Real-world link", [
        "Floor tiles, table tops and window frames are quadrilaterals. A carpenter checks that the four corners add up to 360°.",
        "Any quadrilateral can be split by a diagonal into two triangles. Each triangle has 180°, so the quadrilateral has 2 × 180° = 360°.",
      ], "A quadrilateral is two triangles, so its angles total 360°."],
    ],
  },

  /* ================== Year 8, Unit 8: Angles in parallel lines and polygons ================== */
  "y8-u8-l1": {
    intro: ["Parallel lines are everywhere: railway tracks, the lines on a football pitch and the stripes of a zebra crossing. When a third line crosses them, it creates matching angles."],
    prior: [
      "Angle facts: a straight line is 180°, angles round a point add to 360°, and vertically opposite angles are equal.",
      "Recognising parallel lines from their arrow marks.",
      "Naming a transversal: a line that crosses two or more other lines.",
    ],
    teach: [
      ["Real-world link", [
        "Railway tracks are parallel. A cable that crosses both rails makes matching angles at each rail.",
        "Carpenters use corresponding angles to cut a parallel shelf at the same angle on each side of a wall.",
      ], "Matching corners on parallel lines have equal angles."],
      ["Spotting the F", [
        "The F can be drawn forwards, backwards, upright or sideways. The key is the matching corner at each crossing.",
        "Look for the same position at both crossings: top-left with top-left, for example.",
      ], "Find the F, then the angles match."],
    ],
  },
  "y8-u8-l2": {
    intro: ["Z angles turn up where a road crosses two parallel roads. Surveyors use alternate angles to check that a new road lines up with the old ones."],
    prior: [
      "Corresponding angles are equal, and they form the F shape.",
      "Parallel lines and a transversal.",
      "Straight-line angle facts: 180°.",
    ],
    teach: [
      ["Real-world link", [
        "A zigzag path between two parallel fences: where the path crosses each fence, the angles on opposite sides of the path are alternate angles, so they are equal.",
        "Architects check that two parallel walls are the same distance apart at each end by using alternate angles.",
      ], "Alternate angles sit on opposite sides, inside the lines."],
      ["Tracing the Z", [
        "Alternate angles are on opposite sides of the transversal and inside the two parallel lines.",
        "Trace the Z: start at one angle, go along the transversal, and you reach the other angle on the other parallel line.",
      ], "Trace the Z to check."],
    ],
  },
  "y8-u8-l3": {
    intro: ["Co-interior angles appear wherever a diagonal brace or a sloping beam crosses two parallel beams. The angles on the same side of the brace add up to 180°."],
    prior: [
      "Alternate and corresponding angles, and when they are equal.",
      "Parallel lines, transversals and the straight-line rule.",
      "Solving linear equations with a letter.",
    ],
    teach: [
      ["Real-world link", [
        "Two parallel rails cut by a slope: the angles on the same side, inside the rails, total 180°.",
        "Where a vertical post meets two parallel sloping rails on a staircase, the angles on the same side of the post, between the rails, add up to 180°.",
      ], "Same side, inside the lines: add up to 180°."],
      ["Why they add up to 180°", [
        "The two angles together make a straight line along the transversal, so they make 180°.",
        "This is why one angle of 110° means the other is 70°, not 110°.",
      ], "Co-interior angles add up to 180°. They are not equal."],
    ],
  },
  "y8-u8-l4": {
    intro: ["Triangles are used in bike frames, roofs and sails. The exterior angle is the turn you make when you walk round a triangle, and it always equals the two far interior angles added together."],
    prior: [
      "Angles in a triangle add up to 180°.",
      "Straight-line angles, including how interior and exterior angles sit together.",
      "The types of triangle: scalene, isosceles, equilateral and right-angled.",
    ],
    teach: [
      ["Real-world link", [
        "A bike frame is a set of triangles. The angles where the tubes meet decide how the bike handles.",
        "Sail designers classify triangles by their sides and angles to choose the best shape for the wind.",
        "Roof trusses use right-angled and isosceles triangles because these shapes are strong.",
      ], "Triangles are classified by both their sides and their angles."],
      ["Classifying in full", [
        "Equilateral: all sides and all angles are equal, 60° each.",
        "Isosceles: two sides and two base angles are equal.",
        "Scalene: no sides and no angles are equal.",
        "Right-angled: one angle is exactly 90°.",
      ], "Use both the sides and the angles to name a triangle."],
    ],
  },
  "y8-u8-l5": {
    intro: ["Quadrilateral properties help designers. A parallelogram in a folding gate or a scissor lift keeps its opposite sides parallel as it moves, so its angles stay in the same relationship."],
    prior: [
      "Parallel lines and co-interior angles.",
      "The names and sides of the quadrilaterals.",
      "Quadrilateral angles add up to 360°.",
    ],
    teach: [
      ["Real-world link", [
        "A folding gate or a scissor lift is a parallelogram. As it folds, opposite sides stay parallel and opposite angles stay equal.",
        "Rhombus-shaped tiles and playing-card diamonds have four equal sides. Their opposite angles match.",
      ], "Properties let you find missing angles without measuring."],
    ],
  },
  "y8-u8-l6": {
    intro: ["Polygons are everywhere: a honeycomb cell is a regular hexagon, a stop sign is a regular octagon, and a hexagonal nut has six equal angles. Splitting a polygon into triangles gives the total of its interior angles."],
    prior: [
      "Angles in a triangle add up to 180°.",
      "Quadrilateral angles add up to 360°.",
      "The names of polygons: pentagon, hexagon, octagon and decagon.",
    ],
    teach: [
      ["Real-world link", [
        "A regular polygon has all sides and all angles equal, so each interior angle is the same.",
        "A stop sign is a regular octagon, so each of its interior angles is 135°.",
      ], "Regular polygons share their angle equally."],
      ["Splitting into triangles", [
        "From one vertex, draw diagonals to split a polygon into triangles.",
        "A hexagon splits into 4 triangles: 4 × 180° = 720°.",
      ], "Triangles give you the total."],
    ],
  },
  "y8-u8-l7": {
    intro: ["Walk round the edge of a polygon and turn at each corner. When you finish, you are facing the way you started, so the turns add up to 360°."],
    prior: [
      "An interior angle and its exterior angle add up to 180°.",
      "A full turn is 360°.",
      "Dividing a number by n.",
    ],
    teach: [
      ["Real-world link", [
        "A robot lawnmower turns at each corner of a square lawn through 90°. Four turns make 4 × 90° = 360°, a full turn.",
        "A runner going round a hexagonal track turns through the exterior angle at each corner.",
      ], "Exterior angles are the turns you make."],
    ],
  },
};
