/* ==========================================================================
   Going deeper: Year 7, Units 1–4 (number, written methods, factors,
   algebra). Adds a real-world introduction and a "Real-world link" step to
   each lesson. Added by addDetail() in light.js.
   ========================================================================== */

export const DETAIL_Y7A = {
  /* ================== Unit 1: Place value, rounding and negatives ================== */
  "y7-u1-l1": {
    intro: ["Place value is how a shop, a bank or a sports scoreboard keeps track of big numbers: a £1,000 house deposit and a £10 shopping bill use the same columns."],
    teach: [["Real-world link", [
      "A bus timetable shows the time 14:05 in the same column system: the 1 in 14 is worth ten hours, not one.",
      "Football attendances of 34,000 and 3,400 differ only in where the 3 sits, which changes the number by a factor of ten.",
      "Money uses decimal places: £2.50 is 2 pounds and 5 tenths of a pound, so the column after the point is worth tenths.",
    ], "Where a digit sits decides what it is worth."]],
  },
  "y7-u1-l2": {
    intro: ["Comparing numbers is what you do when you check which deal is cheaper, which runner was faster or which phone has more storage."],
    teach: [["Real-world link", [
      "Two bags of crisps: 0.45 kg and 0.5 kg. Comparing decimals as tenths and hundredths shows the 0.5 kg bag is heavier.",
      "Sports results are compared as numbers too: a race time of 9.58 seconds is faster than 9.61 seconds.",
      "When you are checking a bank statement, the larger balance is the one with more money in it.",
    ], "Line up the place values before you compare."]],
  },
  "y7-u1-l3": {
    intro: ["Rounding is how newspapers, shops and scientists report numbers that are close enough to be useful: a crowd of 1,987 is usually reported as about 2,000."],
    teach: [["Real-world link", [
      "A shop price of £4.99 is rounded to the nearest pound when you estimate a shopping total in your head.",
      "A population of 5,462,000 is written as 5.5 million when a report is summarised.",
      "Measurements in sport, such as a long jump of 6.84 m, are often rounded to the nearest centimetre for the scoreboard.",
    ], "Rounding keeps the number close to the true value."]],
  },
  "y7-u1-l4": {
    intro: ["A calculator can show many more digits than anyone needs. Rounding to decimal places gives an answer you can actually use, such as a price in pounds and pence."],
    teach: [["Real-world link", [
      "Sharing £10 between 3 people gives £3.333…; in money you round to £3.33 so every penny is accounted for.",
      "Petrol prices are shown to a tenth of a penny, such as 139.9p per litre.",
      "Ages and heights in a survey are often rounded to one decimal place for the report.",
    ], "Round to the accuracy the situation needs."]],
  },
  "y7-u1-l5": {
    intro: ["Estimating is the skill of getting a rough answer quickly. It tells you whether a calculator answer is sensible before you rely on it."],
    teach: [["Real-world link", [
      "Working out the cost of 19 items at £4.90 each: round to 20 × £5 = £100, so the real answer is a little under £100.",
      "Planning a journey: a 298 km drive at about 60 km/h takes roughly 5 hours, so you know to leave early.",
      "Checking your calculator: if you type 39 × 21 and get 8,190, an estimate of 40 × 20 = 800 tells you a key was pressed wrongly.",
    ], "A quick estimate protects you from big mistakes."]],
  },
  "y7-u1-l6": {
    intro: ["Negative numbers are everywhere once you look: temperatures below zero, overdrawn bank accounts, and heights below sea level."],
    teach: [["Real-world link", [
      "A temperature of −4 °C means four degrees below freezing. Going from −4 °C to 3 °C is a rise of 7 degrees.",
      "A bank account at −£20 is overdrawn by £20, so putting in £35 leaves you with +£15.",
      "The Dead Sea shore is about 430 m below sea level, which is written as −430 m on a height chart.",
    ], "Zero is the reference point; negatives are below it."]],
  },
  "y7-u1-l7": {
    intro: ["Ordering negative numbers matters in weather forecasts, where −8 °C is colder than −3 °C, even though 8 is bigger than 3."],
    teach: [["Real-world link", [
      "The coldest temperature in a list of daily lows is the most negative one, not the one with the largest digits.",
      "A lift that goes down to −3 (car park) and −1 (basement) is ordered: −3 is further down, so it is lower.",
      "Golf scores below par are negative: −5 is better than −2.",
    ], "The further from zero on the negative side, the smaller the number."]],
  },
  "y7-u1-l8": {
    intro: ["The order of operations stops two people getting different answers to the same sum. It is what makes calculators and spreadsheets agree."],
    teach: [["Real-world link", [
      "A till adds up 3 × £2.50 + £1.00 by doing the multiplication first: £8.50, not £13.",
      "Spreadsheet formulas follow the same order, so a total written as =A1+B1*C1 multiplies before it adds.",
      "Recipes with brackets, such as 2 × (150 g + 50 g), work in the same way.",
    ], "Multiply and divide before you add and subtract."]],
  },

  /* ================== Unit 2: Written and mental methods ================== */
  "y7-u2-l1": {
    intro: ["Written methods let you add large numbers accurately without a calculator, which is useful when you check a bill or a bank statement."],
    teach: [["Real-world link", [
      "Adding up a shopping bill column by column keeps every penny lined up, just like a receipt.",
      "A school adds up the number of pupils in each year group to get a total roll call.",
    ], "Keep the digits in their columns."]],
  },
  "y7-u2-l2": {
    intro: ["Subtraction is how you work out change, the difference between two scores or how much is left in a budget."],
    teach: [["Real-world link", [
      "You pay £20 for a £13.45 item. Working out the change is a subtraction with exchanging: 20.00 − 13.45 = 6.55.",
      "A marathon time of 3:12 compared with 2:58 is found by subtracting, and exchanging is needed when the minutes are borrowed from the hour.",
    ], "Exchange when the top digit is too small."]],
  },
  "y7-u2-l3": {
    intro: ["Multiplying is how you work out the cost of several items, the area of a room or the total of a repeated payment."],
    teach: [["Real-world link", [
      "A delivery of 18 boxes with 24 eggs in each: 24 × 18 gives the total number of eggs.",
      "A cinema with 26 rows of 35 seats has 910 seats, found by a long multiplication.",
    ], "Break a big multiplication into smaller parts you can check."]],
  },
  "y7-u2-l4": {
    intro: ["Short division shares a quantity equally, which is how you work out how many people can each get the same amount from a bag of sweets."],
    teach: [["Real-world link", [
      "A class of 28 pupils goes on a trip in minibuses that take 6 people each: 28 ÷ 6 gives 4 full minibuses and a remainder, so 5 are needed.",
      "Splitting a restaurant bill of £84 between 4 friends gives £21 each.",
    ], "A remainder tells you what is left over."]],
  },
  "y7-u2-l5": {
    intro: ["Written division works for bigger numbers and for money, where the answer often needs decimals."],
    teach: [["Real-world link", [
      "Dividing a £325 wage by 12 months gives a monthly figure, which needs decimals to be exact.",
      "A delivery of 1,200 bricks shared across 24 walls is a long division by a two-digit number.",
    ], "Decimals let you share something exactly."]],
  },
  "y7-u2-l6": {
    intro: ["Mental methods let you check a calculation in your head, which is quicker than reaching for a calculator when you are shopping."],
    teach: [["Real-world link", [
      "Adding £19 to a shop total is quicker as 20 − 1 than as a full written sum.",
      "Working out 4 × 25p in your head: four quarters is £1.",
      "Finding 10% of a £60 bill by moving the decimal point gives £6, then adding 10% again for a tip.",
    ], "Use friendly numbers to make the sum easier."]],
  },
  "y7-u2-l7": {
    intro: ["Real problems are written in words. Deciding which operation to use, and then checking the answer makes sense, is the skill that matters."],
    teach: [["Real-world link", [
      "Working out how much change you get from £50 when you spend £36.80 is a subtraction.",
      "Finding how many 250 ml drinks you can fill from a 3-litre bottle is a division: 3000 ÷ 250 = 12.",
      "Splitting a 3-hour journey into equal parts of 45 minutes needs a division of time, which is 4 parts.",
    ], "Identify the operation from the words, then check it makes sense."]],
  },

  /* ================== Unit 3: Factors, multiples and primes ================== */
  "y7-u3-l1": {
    intro: ["Factors show up when you share things into equal groups: 12 cakes can be shared between 3 or 4 people with none left over."],
    teach: [["Real-world link", [
      "A rectangular tray of 24 biscuits can be arranged as 1 × 24, 2 × 12, 3 × 8 or 4 × 6, which is why 24 has eight factors.",
      "Garden beds of 30 plants can be laid out in rows of 1, 2, 3, 5, 6, 10, 15 or 30 without any left over.",
    ], "Factors divide a number exactly."]],
  },
  "y7-u3-l2": {
    intro: ["Multiples are the times tables, and they tell you when two things will line up again, such as two buses leaving the same stop."],
    teach: [["Real-world link", [
      "Bus A leaves every 6 minutes and bus B every 8 minutes. Both leave together at multiples of 24 minutes.",
      "Whole packs of 6 biscuits always give a multiple of 6 in total: 6, 12, 18, 24 and so on.",
    ], "Multiples are where things line up."]],
  },
  "y7-u3-l3": {
    intro: ["Prime numbers are the building blocks of all whole numbers and are used to keep online banking and messages secure."],
    teach: [["Real-world link", [
      "Internet security uses very large prime numbers, because they are easy to multiply but very hard to split back into factors.",
      "A prime number of chairs cannot be arranged in a full rectangle, except as one row, which is useful for planning seating.",
    ], "A prime has exactly two factors: 1 and itself."]],
  },
  "y7-u3-l4": {
    intro: ["Square and cube numbers describe areas and volumes: a square tile of side 5 cm has an area of 25 cm²."],
    teach: [["Real-world link", [
      "A square garden with sides of 7 m has an area of 7² = 49 m².",
      "A cube-shaped box with sides of 3 cm holds 3³ = 27 cm³ of space.",
    ], "Squares describe area; cubes describe volume."]],
  },
  "y7-u3-l5": {
    intro: ["The highest common factor is the biggest size you can make a set of identical packs or tiles without cutting anything."],
    teach: [["Real-world link", [
      "A workshop wants to cut two planks of 24 cm and 36 cm into the longest equal pieces. The HCF of 24 and 36 is 12, so the pieces are 12 cm long.",
      "Tiles of the largest possible square size that fit a 60 cm by 84 cm floor without cutting: the HCF is 12 cm.",
    ], "HCF gives the largest equal size."]],
  },
  "y7-u3-l6": {
    intro: ["The lowest common multiple tells you the first time two repeating events match up, which is useful for planning timetables."],
    teach: [["Real-world link", [
      "Two trains leave a station: one every 12 minutes and one every 18 minutes. They next leave together after 36 minutes, the LCM of 12 and 18.",
      "A baker needs cakes that come in packs of 4 and icing that comes in packs of 6. The LCM is 12, so 12 items are needed to use both with nothing left over.",
    ], "LCM gives the first point where two things match."]],
  },

  /* ================== Unit 4: Introducing algebra ================== */
  "y7-u4-l1": {
    intro: ["Algebra is used everywhere money and measurement are involved: a phone plan costs £10 + £2n, where n is the number of gigabytes used."],
    teach: [["Real-world link", [
      "A taxi charges £3 plus £2 per mile. If m is the number of miles, the fare is 3 + 2m, which works for any journey.",
      "A rectangle of width w and length 3w has area 3w², so one expression describes every size of that shape.",
    ], "A letter stands for a number that can change."]],
  },
  "y7-u4-l2": {
    intro: ["The shorthand of algebra saves time and avoids mistakes, in the same way that a recipe uses short forms such as tsp."],
    teach: [["Real-world link", [
      "A recipe that needs 3 eggs for every person is written 3p, not 3 × p.",
      "A phone bill of 5 texts a day for d days is 5d, which is shorter and easier to read.",
    ], "Leave out the × sign and write numbers first."]],
  },
  "y7-u4-l3": {
    intro: ["Collecting like terms is how you simplify a bill or a set of costs that share the same unit, such as pounds."],
    teach: [["Real-world link", [
      "A shopping list of 3 apples and 2 apples and 5 bananas is 5 apples and 5 bananas, which you cannot combine further.",
      "A phone bill that charges £3 per month plus £2 per month simplifies to £5 per month.",
    ], "Only combine terms with the same letters."]],
  },
  "y7-u4-l4": {
    intro: ["Multiplying and dividing letters comes up in area, rates and the cost of sharing."],
    teach: [["Real-world link", [
      "The area of a rectangle with sides a and b is ab, which is why a × b is written as ab.",
      "Sharing a bill of £x between p people gives x ÷ p each, written as x/p.",
    ], "Multiply and divide the numbers and letters separately."]],
  },
  "y7-u4-l5": {
    intro: ["Substitution means putting a real value into a formula, which is how a spreadsheet or a payroll system calculates an answer."],
    teach: [["Real-world link", [
      "A parking cost formula C = 2h + 1 gives the cost for h hours. Substituting h = 3 gives £7.",
      "Celsius to Fahrenheit: a formula with a letter for the temperature gives the answer for any day's weather.",
    ], "Replace each letter with its value, then calculate carefully."]],
  },
  "y7-u4-l6": {
    intro: ["Turning a description into algebra is how a problem becomes something you can solve or check."],
    teach: [["Real-world link", [
      "A gym charges a £20 joining fee plus £15 per month. For m months the total is 20 + 15m.",
      "A rectangular garden is 4 m longer than it is wide. If the width is w, the length is w + 4 and the perimeter is 2w + 2(w + 4).",
    ], "Describe the quantities with letters, then write the link between them."]],
  },
  "y7-u4-l7": {
    intro: ["Expanding brackets is how a builder works out the area of a shape that is made up of rectangles, without measuring every piece."],
    teach: [["Real-world link", [
      "A room measured as (x + 2) by 3 has area 3(x + 2) = 3x + 6, so you can compare the area with the carpet price.",
      "The total cost of 4 items each costing (p + 3) pounds is 4(p + 3) = 4p + 12.",
    ], "Multiply every term inside by the term outside."]],
  },
};
