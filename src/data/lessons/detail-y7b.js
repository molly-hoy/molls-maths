/* ==========================================================================
   Going deeper: Year 7, Units 5–12 (fractions, decimals, percentages,
   sequences, measures, ratio, statistics, probability). Adds a real-world
   introduction and a "Real-world link" step to each lesson. Added by
   addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y7B = {
  /* ================== Unit 5: Fractions ================== */
  "y7-u5-l1": {
    intro: ["Fractions are everywhere in cooking and building: half a pizza, three quarters of a litre of milk, or a third of the journey done."],
    teach: [["Real-world link", [
      "A pizza cut into 8 slices where you eat 3 is 3/8 of the pizza: 8 is the number of equal slices and 3 is how many you have.",
      "A ruler split into 16 equal parts gives sixteenths, which is how carpenters measure small lengths.",
    ], "The bottom number is the number of equal parts; the top is how many you have."]],
  },
  "y7-u5-l2": {
    intro: ["Equivalent fractions are the same amount written in different ways, which is how a recipe scales from 4 people to 8."],
    teach: [["Real-world link", [
      "Half a cake is the same as 2/4 or 3/6 of a cake; the cake has not changed, only the way it is counted.",
      "A recipe for 4 people uses 1/2 cup of flour, which is 2/4 of a cup, so doubling it gives 4/4 = 1 cup.",
    ], "Multiply or divide top and bottom by the same number."]],
  },
  "y7-u5-l3": {
    intro: ["Simplifying fractions makes amounts easier to read, such as saying a shop has 3 out of every 4 items in stock rather than 24 out of 32."],
    teach: [["Real-world link", [
      "A survey found 24 out of 32 people liked a product. Simplifying 24/32 gives 3/4, which is easier to report.",
      "Measuring a screw of 6/8 inch is the same as 3/4 inch, which is how the length is written on a plan.",
    ], "Divide top and bottom by the highest common factor."]],
  },
  "y7-u5-l4": {
    intro: ["Comparing fractions tells you which is bigger when you choose between two offers, such as 3/5 of a discount or 2/3 of a discount."],
    teach: [["Real-world link", [
      "Two sale offers: 3/5 off or 5/8 off. Writing both with a common denominator (24) shows which saves more.",
      "Comparing 0.6 and 2/3 by changing to decimals shows which fraction is bigger when you are in a hurry.",
    ], "Use a common denominator or decimals to compare."]],
  },
  "y7-u5-l5": {
    intro: ["Mixed numbers and improper fractions are two ways of writing the same amount, such as a 2 1/2 hour film or 5/2 hours of work."],
    teach: [["Real-world link", [
      "A recipe that needs 2 1/2 cups of flour is the same as 5/2 cups. Either way, you measure out 2 full cups and a half cup.",
      "A race time of 7/4 hours is 1 3/4 hours, which is easier to say and to compare.",
    ], "A mixed number is a whole number plus a fraction."]],
  },
  "y7-u5-l6": {
    intro: ["Adding and subtracting fractions combines parts of a whole, such as how much of a day is spent at school and at football practice."],
    teach: [["Real-world link", [
      "Pouring 1/4 litre and 1/2 litre into a jug gives 3/4 litre; both fractions share the denominator 4 once one is rewritten.",
      "Spending 1/3 of a day on school and 1/6 of a day on travel: 1/3 + 1/6 = 3/6 = 1/2 of the day.",
    ], "Use a common denominator before you add or subtract."]],
  },
  "y7-u5-l7": {
    intro: ["Finding a fraction of an amount is how you work out a discount, a share of a budget or the part of a class that takes a bus."],
    teach: [["Real-world link", [
      "A 1/4 off discount on a £60 coat: 60 ÷ 4 = £15 off, so the price is £45.",
      "Two-thirds of a class of 27 pupils: 27 ÷ 3 × 2 = 18 pupils.",
    ], "Divide by the bottom number, then multiply by the top."]],
  },

  /* ================== Unit 6: Decimals, percentages and money ================== */
  "y7-u6-l1": {
    intro: ["Decimals are how money, measurements and sports times are written, so reading them correctly matters every day."],
    teach: [["Real-world link", [
      "A 100 m race time of 10.52 seconds: the digits after the point are tenths and hundredths of a second.",
      "A bank charge of £0.75 is 75 hundredths of a pound, which is why the decimal point must sit exactly in place.",
    ], "Decimal places continue the place value pattern to the right."]],
  },
  "y7-u6-l2": {
    intro: ["Adding decimals is how you total a bill that includes pence, or add up a set of measurements."],
    teach: [["Real-world link", [
      "A receipt: £3.49 + £12.00 + £0.75 must line up the points to total £16.24.",
      "Adding rainfall of 2.5 mm and 0.8 mm gives 3.3 mm.",
    ], "Line up the decimal points in a column."]],
  },
  "y7-u6-l3": {
    intro: ["Multiplying and dividing by 10, 100 or 1,000 is what happens when a unit changes, such as metres to centimetres or pounds to pence."],
    teach: [["Real-world link", [
      "A length of 2.3 m in centimetres: 2.3 × 100 = 230 cm, moving the digits two places left.",
      "A price of £4.20 in pence: 4.20 × 100 = 420p.",
    ], "Multiplying by 10 moves digits one place left; dividing moves them right."]],
  },
  "y7-u6-l4": {
    intro: ["Percentages let you compare things fairly, such as the share of students who passed a test in two classes of different sizes."],
    teach: [["Real-world link", [
      "A class of 25 with 20 passing and a class of 40 with 32 passing: 80% of each, so they can be compared fairly.",
      "A 15% off sale on a £80 item: 15% of £80 = £12 off.",
    ], "A percentage is a number out of 100."]],
  },
  "y7-u6-l5": {
    intro: ["Fractions, decimals and percentages are three ways of writing the same amount, and shops and banks use each one in different places."],
    teach: [["Real-world link", [
      "A discount may be shown as 1/4 off, 0.25 off or 25% off. They all mean the same saving.",
      "Interest rates are often given as decimals or percentages; 0.05 and 5% are the same rate.",
    ], "Learn the common conversions: 1/2 = 0.5 = 50%."]],
  },
  "y7-u6-l6": {
    intro: ["Finding percentages in your head, starting from 10%, is how you check a tip, a discount or a sales tax quickly."],
    teach: [["Real-world link", [
      "A restaurant bill of £48: 10% is £4.80, so a 15% tip is £4.80 + £2.40 = £7.20.",
      "A 20% discount on £35: 10% is £3.50, so 20% is £7.00 off.",
    ], "Find 10% first, then build other percentages from it."]],
  },

  /* ================== Unit 7: Sequences ================== */
  "y7-u7-l1": {
    intro: ["Sequences are patterns you meet in tiling, savings plans and the number of seats in a theatre row."],
    teach: [["Real-world link", [
      "A theatre with 10 seats in the first row, 12 in the second and 14 in the third is a sequence that goes up by 2 each row.",
      "A savings plan that puts in £5 more every month forms a sequence of monthly totals.",
    ], "Look for the rule that connects one term to the next."]],
  },
  "y7-u7-l2": {
    intro: ["A rule that takes you from one term to the next is what a bank or a game uses to work out the next value."],
    teach: [["Real-world link", [
      "A phone battery loses 4% every hour. The rule takes each reading and subtracts 4 to find the next.",
      "A plant that doubles its height each week uses the rule multiply by 2 each time.",
    ], "A term-to-term rule describes the step from one term to the next."]],
  },
  "y7-u7-l3": {
    intro: ["Generating terms from a starting number and a rule is what a calculator or spreadsheet does when it fills a column."],
    teach: [["Real-world link", [
      "A spreadsheet starts at 100 and adds 15 in each cell down the column. Each new cell is the previous cell plus 15.",
      "A running total of savings, starting at £20 and adding £10 each week, is generated term by term.",
    ], "Start with the first term, then apply the rule again and again."]],
  },
  "y7-u7-l4": {
    intro: ["Arithmetic sequences go up or down by the same amount each time, which is how a fixed-price saving plan grows."],
    teach: [["Real-world link", [
      "A taxi meter that adds the same £2 for every half mile is an arithmetic sequence, going up by a common difference of 2.",
      "A bank balance that goes down by £30 each week for a fixed bill is also arithmetic, but it goes down, so the common difference is negative.",
    ], "The common difference is the fixed step between terms."]],
  },
  "y7-u7-l5": {
    intro: ["The nth term lets you find any term of a pattern straight away, which is how a teacher knows the 100th term of a pattern without drawing it."],
    teach: [["Real-world link", [
      "A parking charge of £2 plus £3 for each hour: the charge after h hours is the nth-term rule 3h + 2, which works for any number of hours.",
      "The number of tiles in the 50th pattern of a floor design can be found from the nth-term rule instead of counting.",
    ], "The nth term gives the value at any position."]],
  },
  "y7-u7-l6": {
    intro: ["Patterns made from matchsticks, tiles or chairs are real examples of sequences, and builders use them to estimate material."],
    teach: [["Real-world link", [
      "A fence made of panels: each extra panel needs 3 more posts, so the number of posts follows a sequence that can be written as a rule.",
      "A row of tables: 1 table seats 4 people, 2 tables seat 6 and 3 tables seat 8. Each extra table adds 2 seats, so the seats follow 2n + 2.",
    ], "Count the parts that change from one pattern to the next."]],
  },

  /* ================== Unit 9: Perimeter, area and compound shapes ================== */
  "y7-u9-l1": {
    intro: ["Perimeter is what you need when you fit a fence round a garden or a skirting board round a room."],
    teach: [["Real-world link", [
      "A rectangular garden 8 m by 5 m needs 26 m of fencing: 8 + 5 + 8 + 5.",
      "A running track has a perimeter that decides how far an athlete runs each lap.",
    ], "Perimeter is the distance around the outside."]],
  },
  "y7-u9-l2": {
    intro: ["Area tells you how much carpet, paint or turf you need to cover a surface."],
    teach: [["Real-world link", [
      "A room 4 m long and 3 m wide has area 12 m², so you need 12 square metres of carpet.",
      "A paint tin that covers 10 m² of wall tells you how many tins to buy for a 35 m² wall: 4 tins.",
    ], "Area is measured in square units."]],
  },
  "y7-u9-l3": {
    intro: ["Triangles are used for sails, roof sections and sloping gardens, and their area is always half of a rectangle."],
    teach: [["Real-world link", [
      "A triangular sail with a base of 4 m and height of 6 m has area ½ × 4 × 6 = 12 m².",
      "A triangular roof section is a triangle, so the same rule gives the area of the panel to be painted.",
    ], "Triangle area is half of base times height."]],
  },
  "y7-u9-l4": {
    intro: ["Parallelograms are used in fold-out gates and sloping shelves, and their area uses the perpendicular height, not the slanted side."],
    teach: [["Real-world link", [
      "A sloping roof panel with a base of 6 m and a perpendicular height of 3 m has area 18 m². The slanted side is longer, so it must not be used.",
    ], "Use the perpendicular height, not the slanted side."]],
  },
  "y7-u9-l5": {
    intro: ["Most real floor plans and garden layouts are not single shapes: they are made of rectangles and triangles joined together."],
    teach: [["Real-world link", [
      "An L-shaped room is made of two rectangles. Find each area and add them, or take a corner off a big rectangle.",
      "A garden with a pond removed: the area of the lawn is the total area minus the area of the pond.",
    ], "Split into simple shapes, or subtract a missing piece."]],
  },
  "y7-u9-l6": {
    intro: ["Units must match before you calculate. A builder who mixes metres and centimetres can order the wrong amount of timber."],
    teach: [["Real-world link", [
      "A room 3.5 m long and 240 cm wide must be in the same units before its area is worked out: 3.5 m × 2.4 m = 8.4 m².",
      "A wall 4 m long and 80 cm high: convert to 400 cm and 80 cm, or 4 m and 0.8 m, before finding the area.",
    ], "Convert to the same units first."]],
  },

  /* ================== Unit 10: Ratio ================== */
  "y7-u10-l1": {
    intro: ["Ratios are used in paint mixes, cocktail recipes and maps, where the scale tells you how far apart places really are."],
    teach: [["Real-world link", [
      "Concrete is often mixed in a ratio of cement to sand. A 1 : 3 mix uses one bucket of cement for every three buckets of sand.",
      "A map scale of 1 : 50,000 means 1 cm on the map is 50,000 cm (500 m) on the ground.",
    ], "A ratio compares parts, not totals."]],
  },
  "y7-u10-l2": {
    intro: ["Simplifying a ratio gives the same mix in the smallest whole numbers, which is how a recipe becomes easy to scale."],
    teach: [["Real-world link", [
      "A paint mix of 6 litres of blue to 9 litres of white simplifies to 2 : 3, which is easier to follow when mixing a larger batch.",
      "A recipe for 10 people with 20 : 15 of two ingredients simplifies to 4 : 3.",
    ], "Divide both parts by their highest common factor."]],
  },
  "y7-u10-l3": {
    intro: ["Sharing money or a prize in a ratio is how partners split profits or how a prize is shared between teams."],
    teach: [["Real-world link", [
      "Two business partners share £600 profit in the ratio 2 : 3. There are 5 parts, each worth £120, so one gets £240 and the other £360.",
      "A prize of £90 is shared between three people in the ratio 1 : 2 : 3, which gives shares of £15, £30 and £45.",
    ], "Find the total number of parts, then the value of one part."]],
  },
  "y7-u10-l4": {
    intro: ["Ratios and fractions describe the same relationship, and each is useful for different questions."],
    teach: [["Real-world link", [
      "A jar with a 2 : 3 ratio of red to blue sweets means 2/5 of the sweets are red.",
      "A class where 3/4 of the pupils take a bus gives a ratio of bus to walk of 3 : 1.",
    ], "A ratio of 2 : 3 means 2 parts out of 5."]],
  },
  "y7-u10-l5": {
    intro: ["Scaling a recipe is a daily use of ratio: the ingredients must all change by the same factor."],
    teach: [["Real-world link", [
      "A cake for 4 people needs 200 g flour and 100 g sugar. For 6 people the scale factor is 1.5, so you need 300 g flour and 150 g sugar.",
      "A ratio of ingredients means you cannot change one without changing the others, or the cake will not work.",
    ], "Use one scale factor for every ingredient."]],
  },

  /* ================== Unit 11: Statistics ================== */
  "y7-u11-l1": {
    intro: ["The type of data you collect decides how you can show and summarise it, such as a survey of shoe sizes or favourite colours."],
    teach: [["Real-world link", [
      "Shoe size is numerical (discrete), favourite colour is categorical, and the time to finish a race is continuous.",
      "A school survey of heights is numerical data, which is best summarised with an average.",
    ], "The type of data decides the chart you use."]],
  },
  "y7-u11-l2": {
    intro: ["A good question gives good data. A survey that asks people to pick a favourite from a list is more useful than one that asks for a vague opinion."],
    teach: [["Real-world link", [
      "A shop asks customers how often they visit, with fixed choices: daily, weekly, monthly. This is easy to tally and compare.",
      "A survey of pupils that only asks in one lesson may not represent the whole school, which is a biased sample.",
    ], "Ask clear questions and sample fairly."]],
  },
  "y7-u11-l3": {
    intro: ["A tally chart is how you record data as it happens, such as counting cars passing a school gate."],
    teach: [["Real-world link", [
      "A survey counting how many pupils travel by each method: bus, car, bike, walk. The tally marks become a frequency table.",
      "A shop counts sales by item to see which products sell most often.",
    ], "Tally first, then total the frequencies."]],
  },
  "y7-u11-l4": {
    intro: ["Bar charts compare how often things happen, such as how many people chose each sport in a class vote."],
    teach: [["Real-world link", [
      "A bar chart of favourite fruit lets a canteen see at a glance which fruit to stock more of.",
      "A bar chart of monthly rainfall lets a farmer compare the wettest and driest months.",
    ], "Taller bars mean higher frequencies."]],
  },
  "y7-u11-l5": {
    intro: ["The mode, median and range each describe a set of data in a different way, which is how a report summarises a survey."],
    teach: [["Real-world link", [
      "A shoe shop's most common size is the mode, the one to order the most of.",
      "The median of a set of house prices is the middle value, so one very expensive house does not distort it.",
      "The range shows how spread out the data is, such as the gap between the cheapest and most expensive shoe.",
    ], "Mode, median and range each tell you something different."]],
  },
  "y7-u11-l6": {
    intro: ["The mean is the average most people mean, and it is used for things like average temperature or a team's average score."],
    teach: [["Real-world link", [
      "The average of 5 maths test scores is the mean: add them and divide by 5.",
      "A cafe's average daily sales are the mean of the takings over a week.",
    ], "Add the values, then divide by how many there are."]],
  },

  /* ================== Unit 12: Probability ================== */
  "y7-u12-l1": {
    intro: ["Probability words such as likely and unlikely are used in weather forecasts and sports predictions, and maths gives them a precise meaning."],
    teach: [["Real-world link", [
      "A forecast of a 30% chance of rain means it is unlikely, but not impossible.",
      "Saying a dice will land on a six is possible but not certain: it is one of six equally likely faces.",
    ], "Probability words describe how likely something is."]],
  },
  "y7-u12-l2": {
    intro: ["Probabilities from 0 to 1 are how weather apps and insurance companies describe risk."],
    teach: [["Real-world link", [
      "A probability of 0.9 that a train arrives on time is very likely; 0.1 is very unlikely.",
      "A 50% chance of heads on a coin is probability 0.5, halfway up the scale.",
    ], "0 is impossible, 1 is certain, 0.5 is an even chance."]],
  },
  "y7-u12-l3": {
    intro: ["When every outcome is equally likely, probability is the favourable outcomes divided by the total, which is how a lottery chance is worked out."],
    teach: [["Real-world link", [
      "A bag with 3 red and 7 blue counters: the chance of picking red is 3/10 because 3 of the 10 counters are red.",
      "A game show with 20 doors, one with a prize: the chance of picking it is 1/20.",
    ], "Favourable outcomes ÷ total outcomes."]],
  },
  "y7-u12-l4": {
    intro: ["Probabilities of an event and its opposite add to 1, which is how a forecast of rain also tells you the chance of no rain."],
    teach: [["Real-world link", [
      "If the chance of rain is 0.3, the chance of no rain is 1 − 0.3 = 0.7.",
      "If a team has a 0.6 chance of winning, its chance of not winning is 0.4.",
    ], "An event happens, or it does not: the two probabilities total 1."]],
  },
  "y7-u12-l5": {
    intro: ["A systematic list makes sure you have found every outcome, which matters when you plan options such as the combinations on a menu."],
    teach: [["Real-world link", [
      "A cafe offers 3 drinks and 2 cakes. Listing every pair shows all 6 combinations, so none is missed when pricing a combo.",
      "A combination lock with 3 digits can be tested systematically, one column at a time.",
    ], "A list in order makes sure no outcome is missed."]],
  },
};
