/* ==========================================================================
   Going deeper: Year 11 (vectors, graphs, bounds, kinematics, circles,
   transformations, statistics and exam skills). Adds a real-world introduction
   and a "Real-world link" step to each lesson. Added by addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y11 = {
  /* ================== Unit 1: Vectors ================== */
  "y11-u1-l1": {
    intro: ["A vector describes a journey with a size and a direction, which is how a drone's flight or a ship's course is planned."],
    teach: [["Real-world link", [
      "A drone that moves 3 m across and 4 m up has a vector (3, 4), and its distance from its start is 5 m.",
      "A walker who goes 6 km east and 8 km north has a straight-line distance of 10 km.",
    ], "A vector has a size (magnitude) and a direction."]],
  },
  "y11-u1-l2": {
    intro: ["Adding and scaling vectors is how a navigator combines a boat's movements, or a game engine moves a character."],
    teach: [["Real-world link", [
      "A boat that sails a vector a and then a vector b ends at a + b from its start.",
      "Doubling a vector means the same movement twice as far, in the same direction.",
    ], "Add or subtract the matching components; multiply each one by the number."]],
  },
  "y11-u1-l3": {
    intro: ["Routes that pass through a checkpoint are found by adding vectors, and midpoints help you find the centre of a space."],
    teach: [["Real-world link", [
      "A route from A to C passing through B is the journey A to B plus B to C, which is found by vector addition.",
      "The midpoint between two gates is halfway along the vector joining them.",
    ], "Write each route as a sum of vectors, going through known points."]],
  },
  "y11-u1-l4": {
    intro: ["Showing that lines are parallel or that points lie on one straight line is used to check that a path is straight, such as a railway."],
    teach: [["Real-world link", [
      "Two cycle paths with vectors that are multiples of each other are parallel.",
      "Three points on a straight rail line are collinear, which is shown by the vectors between them being in the same direction.",
    ], "Parallel: one vector is a multiple of the other. Collinear: the vectors share a point and a direction."]],
  },

  /* ================== Unit 2: Graphs and functions ================== */
  "y11-u2-l1": {
    intro: ["Different graph shapes describe different real situations, such as the volume of a cube or the time taken for a fixed distance."],
    teach: [["Real-world link", [
      "The volume of a cube grows as the cube of its side, so the graph of volume against side is a cubic curve.",
      "The time to travel a fixed distance is inversely proportional to speed, which gives a reciprocal graph.",
    ], "Learn the four shapes: cubic, reciprocal, quadratic and exponential."]],
  },
  "y11-u2-l2": {
    intro: ["Exponential graphs model things that double or halve, such as bacteria or the amount of a medicine left in the body."],
    teach: [["Real-world link", [
      "A population that doubles every year follows y = 2ˣ, so it grows faster and faster.",
      "A radioactive material that halves every fixed period follows exponential decay, which is how half-lives are used in medicine.",
    ], "Growth: the same factor each step; decay: the factor is less than 1."]],
  },
  "y11-u2-l3": {
    intro: ["Function notation writes a rule clearly, such as a formula for a phone bill or the cost of a taxi ride."],
    teach: [["Real-world link", [
      "A taxi fare f(x) = 2x + 3 means the fare for x miles is 2x + 3 pounds.",
      "Finding f(4) = 11 tells you the fare for a 4-mile trip.",
    ], "f(a) means replace x with a in the rule."]],
  },
  "y11-u2-l4": {
    intro: ["Combining functions and reversing them is how a converter changes units and then changes them back."],
    teach: [["Real-world link", [
      "A currency conversion followed by a fee is a composite function: first convert, then add the fee.",
      "The inverse of a conversion from metres to feet changes the answer back to metres.",
    ], "Composite: do the inside first. Inverse: undo the operations in reverse order."]],
  },
  "y11-u2-l5": {
    intro: ["Moving and stretching a graph is how designers shift a path or scale a shape without redrawing it."],
    teach: [["Real-world link", [
      "A graph of y = x² moved 3 units right is y = (x − 3)², which is a parabola starting at x = 3.",
      "Stretching a graph vertically by 2 doubles every height, so the shape becomes taller.",
    ], "Inside the bracket moves sideways; outside changes up, down or the size."]],
  },
  "y11-u2-l6": {
    intro: ["Iteration uses a calculator to get closer and closer to an answer, which is how engineers solve equations that cannot be solved exactly."],
    teach: [["Real-world link", [
      "Pressing the same key repeatedly on a calculator, such as x ← 1 + 1/x, gets closer to a fixed value.",
      "Each new estimate is found from the last one, which is how computers approximate square roots.",
    ], "Repeat the formula, using each answer as the next input."]],
  },

  /* ================== Unit 3: Bounds and accuracy ================== */
  "y11-u3-l1": {
    intro: ["A rounded measurement is a range of possible true values, which matters when you check whether a part will fit."],
    teach: [["Real-world link", [
      "A length of 7 cm to the nearest centimetre could be anything from 6.5 cm to 7.5 cm.",
      "A part specified as 12 mm to the nearest mm must be between 11.5 mm and 12.5 mm.",
    ], "Error interval: half a unit either side of the rounded value."]],
  },
  "y11-u3-l2": {
    intro: ["Lower and upper bounds are the smallest and largest values a rounded number can take, which is how a builder checks a tolerance."],
    teach: [["Real-world link", [
      "A rope measured as 3.4 m to 1 decimal place has a lower bound of 3.35 m and an upper bound of 3.45 m.",
      "A bolt length of 20 mm to the nearest 5 mm lies between 17.5 mm and 22.5 mm.",
    ], "Lower bound: half a unit below. Upper bound: half a unit above."]],
  },
  "y11-u3-l3": {
    intro: ["Bounds in a calculation show the largest and smallest answer you could get from rounded measurements, which is how scientists report uncertainty."],
    teach: [["Real-world link", [
      "A distance of 100 m (to the nearest metre) travelled in 9.6 s (to 1 decimal place) gives a largest speed of 100.5 ÷ 9.55 ≈ 10.5 m/s.",
      "For a largest value of a division, use the largest top number and the smallest bottom number.",
    ], "Choose the largest or smallest bounds to get the largest or smallest answer."]],
  },
  "y11-u3-l4": {
    intro: ["Truncating means cutting a number off without rounding, which is how ages and some measurements are recorded."],
    teach: [["Real-world link", [
      "A person's age in whole years is found by truncating: someone aged 17.9 years is 17.",
      "A petrol pump that cuts off pence without rounding shows the truncated amount, not the rounded one.",
    ], "Truncate: cut the digits off; round: move to the nearest value."]],
  },

  /* ================== Unit 4: Kinematics and graphs of motion ================== */
  "y11-u4-l1": {
    intro: ["Distance-time graphs show a journey: steep sections are fast, flat sections are stopped."],
    teach: [["Real-world link", [
      "A car stopped at traffic lights is a flat section on a distance-time graph.",
      "A steep straight line means a constant speed, and a curve shows the speed is changing.",
    ], "Steeper means faster; flat means stopped."]],
  },
  "y11-u4-l2": {
    intro: ["Velocity-time graphs show how a car speeds up or slows down, which is used to test braking and acceleration."],
    teach: [["Real-world link", [
      "A car that speeds up from 0 to 20 m/s in 10 s has a gradient of 2 m/s², which is its acceleration.",
      "A flat section on a velocity-time graph means the car is at a steady speed.",
    ], "The gradient of a velocity-time graph is the acceleration."]],
  },
  "y11-u4-l3": {
    intro: ["The area under a speed-time graph gives the distance travelled, which is how a journey is worked out from its speed record."],
    teach: [["Real-world link", [
      "A train that speeds up at a steady rate for 10 s to 20 m/s travels a triangle of area 100 m.",
      "A speed-time graph with a rectangle of 15 m/s for 4 s has an area of 60 m travelled.",
    ], "Area under a speed-time graph = distance."]],
  },
  "y11-u4-l4": {
    intro: ["The gradient of a curve at one point is the instantaneous rate of change, such as the speed of a ball at one moment."],
    teach: [["Real-world link", [
      "The speed of a falling ball at one instant is the gradient of its distance-time curve at that point.",
      "A tangent drawn to a curve shows the rate of change at that point.",
    ], "Draw a tangent, then find its gradient."]],
  },

  /* ================== Unit 5: Algebra and circles ================== */
  "y11-u5-l1": {
    intro: ["Quadratic inequalities find where a quadratic is positive or negative, such as when a profit is above zero."],
    teach: [["Real-world link", [
      "A profit formula that is positive between two break-even points is a quadratic inequality.",
      "A ball whose height is above a certain level is found by solving a quadratic inequality.",
    ], "Sketch the graph, find the roots, then read the range."]],
  },
  "y11-u5-l2": {
    intro: ["The equation of a circle comes from Pythagoras' theorem, and it describes things such as a radar's range or a circular garden."],
    teach: [["Real-world link", [
      "A radar that reaches 5 km from its centre at the origin follows x² + y² = 25.",
      "A circular garden of radius 4 m centred on the origin is the set of points with x² + y² = 16.",
    ], "x² + y² = r² for a circle with centre (0, 0)."]],
  },
  "y11-u5-l3": {
    intro: ["A tangent to a circle is perpendicular to the radius at that point, which is how a road is designed to touch a roundabout."],
    teach: [["Real-world link", [
      "A road that just touches a circular roundabout is a tangent, and it meets the radius at 90°.",
      "A rope that just touches a pulley wheel is at right angles to the radius at the point of contact.",
    ], "Tangent ⊥ radius."]],
  },
  "y11-u5-l4": {
    intro: ["Equations with algebraic fractions appear in shared costs and rates, where a number is hidden in a fraction."],
    teach: [["Real-world link", [
      "A trip costs £x, shared between a group of people, so the cost per person is an algebraic fraction to solve.",
      "Clearing the fractions by multiplying both sides by the denominator gives a simple equation.",
    ], "Multiply every term by the denominator, then solve."]],
  },

  /* ================== Unit 6: Circle theorems ================== */
  "y11-u6-l1": {
    intro: ["Circle theorems describe angles in circles, which are used in design, such as the angle of a lighthouse beam or an arch."],
    teach: [["Real-world link", [
      "A lighthouse beam at the centre of a circle turns through twice the angle it turns at the edge.",
      "A camera fixed on the edge of a circular stage sees a smaller angle than one at the centre.",
    ], "The angle at the centre is twice the angle at the circumference."]],
  },
  "y11-u6-l2": {
    intro: ["Angles in the same segment and in a semicircle are used to design curved structures and seating."],
    teach: [["Real-world link", [
      "Every seat along the same arc of a semicircular stage sees the same angle to the ends of the stage.",
      "A triangle with its longest side as a diameter has a right angle at the top, which is why it is used in archways.",
    ], "Angles in the same segment are equal; the angle in a semicircle is 90°."]],
  },
  "y11-u6-l3": {
    intro: ["A four-sided shape with all four corners on a circle, such as a window in a round frame, has special opposite angles."],
    teach: [["Real-world link", [
      "A four-sided window fitted into a circular frame has opposite corners that add to 180°.",
      "A quadrilateral with all four corners on a circle is called cyclic.",
    ], "Opposite angles of a cyclic quadrilateral add to 180°."]],
  },
  "y11-u6-l4": {
    intro: ["Tangents from one point to a circle are equal in length, which is used in surveying and rope designs."],
    teach: [["Real-world link", [
      "Two ropes from the same point that just touch a circular pulley are the same length.",
      "A tangent meets the radius at 90°, so a builder can check a right angle with it.",
    ], "Tangents from the same point are equal; tangent ⊥ radius."]],
  },
  "y11-u6-l5": {
    intro: ["The alternate segment theorem links a tangent and a chord, which helps in the design of curved parts and wheels."],
    teach: [["Real-world link", [
      "The angle between a tangent to a wheel and a chord equals the angle in the opposite segment.",
      "Engineers use this result to check the angles in curved parts.",
    ], "Angle between tangent and chord = angle in the alternate segment."]],
  },
  "y11-u6-l6": {
    intro: ["Proofs in geometry give a reason for every step, so that a result can be trusted for every case."],
    teach: [["Real-world link", [
      "A surveyor who proves a result must give a reason for each step, so anyone can check it.",
      "The reasons used in a circle proof are the same theorems you learn in each lesson of this unit.",
    ], "Give a reason for every step, using a theorem name."]],
  },

  /* ================== Unit 7: Transformations ================== */
  "y11-u7-l1": {
    intro: ["Enlargements change the size of a shape, such as a photo printed larger or a plan drawn bigger."],
    teach: [["Real-world link", [
      "A photocopier set to 200% enlarges an image by a scale factor of 2 from the copier's centre.",
      "A logo scaled up by 3 keeps the same shape but is three times as long in every direction.",
    ], "Enlargement: a centre and a scale factor."]],
  },
  "y11-u7-l2": {
    intro: ["A fractional scale factor makes a shape smaller, such as a reduced copy of a plan or a photo thumbnail."],
    teach: [["Real-world link", [
      "A thumbnail image at a scale factor of 1/4 is a quarter of the size of the original.",
      "A plan drawn at a scale factor of 1/50 is a reduced copy of the building.",
    ], "A scale factor between 0 and 1 makes the shape smaller."]],
  },
  "y11-u7-l3": {
    intro: ["A negative scale factor flips a shape to the opposite side of the centre, which is how a shadow or a reflected image is formed."],
    teach: [["Real-world link", [
      "A shadow on the other side of a light source is the image of an object through a negative scale factor.",
      "A scale factor of −2 makes the image twice as big and on the opposite side of the centre.",
    ], "A negative scale factor puts the image on the other side of the centre."]],
  },
  "y11-u7-l4": {
    intro: ["Combining transformations and finding points that don't move are used in computer graphics and map folding."],
    teach: [["Real-world link", [
      "A fold line on a paper map is a line of reflection, and the points on the fold stay where they are.",
      "A shape that is moved and then enlarged in a computer game is the combination of two transformations.",
    ], "Invariant points are the points that stay the same under the transformation."]],
  },

  /* ================== Unit 8: Statistics and probability ================== */
  "y11-u8-l1": {
    intro: ["Choosing the right diagram helps you present data clearly, such as test results to a class or survey answers to a school council."],
    teach: [["Real-world link", [
      "A pie chart shows how a school's pupils split between year groups as parts of a whole.",
      "A histogram shows the distribution of heights, where the bars join because the data is continuous.",
    ], "Match the diagram to the type of data."]],
  },
  "y11-u8-l2": {
    intro: ["Statistics can mislead, through a chart's axis or a small sample, so you need to spot the problems in news stories and adverts."],
    teach: [["Real-world link", [
      "A bar chart with an axis that starts at 50 instead of 0 makes a small difference look large.",
      "A survey of 10 people cannot show what a whole town thinks.",
    ], "Always check the scale, the sample and the source."]],
  },
  "y11-u8-l3": {
    intro: ["Probability problems use trees and the idea of selecting with or without replacement, such as picking a team from a group."],
    teach: [["Real-world link", [
      "Picking two students for a team from 4 girls and 6 boys without replacement changes the second chance.",
      "A tree diagram shows every route for a sequence of picks, with a probability on each branch.",
    ], "Plan the tree, draw the branches, multiply along and add between."]],
  },
  "y11-u8-l4": {
    intro: ["Comparing data uses several diagrams together, such as histograms and cumulative frequency graphs, to answer questions about journey times or test scores."],
    teach: [["Real-world link", [
      "A cumulative frequency graph of journey times lets you compare the median and the spread of two bus routes.",
      "A histogram and a box plot of the same test scores show different features of the same data.",
    ], "Choose the diagrams that answer the question and compare with numbers."]],
  },

  /* ================== Unit 9: Exam skills and mixed practice ================== */
  "y11-u9-l1": {
    intro: ["Exam questions use command words, which tell you exactly what to do, like instructions on a form."],
    teach: [["Real-world link", [
      "'State' means give a short answer, like filling in one box on a form.",
      "'Explain' means give a reason, like telling a friend why a route is quicker.",
    ], "Read the command word first, then answer that exact question."]],
  },
  "y11-u9-l2": {
    intro: ["The non-calculator paper tests mental and written methods, which you use in a shop to check a bill."],
    teach: [["Real-world link", [
      "A shop bill for 19 items at £4.90 is estimated as 20 × £5 = £100 before working it out exactly.",
      "Working out 30% of £60 mentally: 10% is £6, so 30% is £18.",
    ], "Estimate first, then work out the exact answer."]],
  },
  "y11-u9-l3": {
    intro: ["Calculators help with long calculations, and knowing the buttons and how to round properly avoids mistakes."],
    teach: [["Real-world link", [
      "A calculator checks a monthly budget that is a total divided by months, rounded to the nearest penny.",
      "Using the brackets key correctly is needed when working out the cost of several items at once.",
    ], "Use brackets and round only at the end."]],
  },
  "y11-u9-l4": {
    intro: ["Multi-step problems, such as planning a trip or a budget, need a plan so that each step is checked."],
    teach: [["Real-world link", [
      "Planning a holiday budget: find the total cost of each item, add them, then compare with the amount saved.",
      "A recipe that needs scaling and then costing has several steps, and each one is checked before the next.",
    ], "Break the problem into small steps and check each one."]],
  },
  "y11-u9-l5": {
    intro: ["Mixed practice brings together the topics from the whole course, which is how a revision plan is built."],
    teach: [["Real-world link", [
      "A revision timetable works like a plan: list the topics, give each a slot, then check each one off.",
      "Mixing topics in practice is how the exam tests you, so it is the best way to revise.",
    ], "Mix topics, and check your answers as you go."]],
  },
  "y11-u9-l6": {
    intro: ["Higher mixed practice mixes Year 10 and Year 11 topics, the way the exam tests you."],
    teach: [["Real-world link", [
      "Higher exam questions combine algebra, geometry and statistics in one problem, as a real engineer or scientist would.",
      "Showing your method clearly earns marks even when the final answer is wrong.",
    ], "Show each step, and check the answer makes sense."]],
  },
};
