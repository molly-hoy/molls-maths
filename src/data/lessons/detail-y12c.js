/* ==========================================================================
   Going deeper: Year 12 Statistics and Mechanics (Units 13–23)
   Extra teaching, one more worked example and one more common mistake for
   each lesson, added after the short teaching in y12-c.js by addDetail().
   Mechanics uses g = 9.8 m s⁻².
   ========================================================================== */

export const Y12C_DETAIL = {
  /* ================== Unit 13: Data collection ================== */
  "y12-u13-l1": {
    teach: [
      ["Population and sample", ["The population is everyone or everything you want to learn about. A sample is a smaller group taken from it. A census uses the whole population.", "To find the average height of 1000 students, a census measures all 1000. A sample of 50 gives a quicker estimate."], "A census is complete; a sample is quicker."],
      ["Choosing", ["A census is accurate but slow and expensive, and sometimes impossible if testing destroys the item. A sample is quicker, but it may not represent the population well."], "Trade off accuracy against cost and time."],
    ],
    ex: [["Give one reason a sample might be used instead of a census.", ["Think about time, cost and whether the test destroys items"], "It is quicker and cheaper, or testing would destroy everything"]],
    mis: [["Thinking a larger sample always removes bias.", "A large but biased sample is still biased.", "Check how the sample was chosen."]],
  },
  "y12-u13-l2": {
    teach: [
      ["Simple random sampling", ["Every member has the same chance of selection, for example by drawing names from a hat or using random numbers. It is fair but may miss small groups."], "Every member has an equal chance."],
      ["Stratified sampling", ["Split the population into groups (strata), then take a random sample from each in proportion to its size.", "For 200 students with 120 in Year 12 and 80 in Year 13, a sample of 50 needs 30 from Year 12 and 20 from Year 13."], "Sample from each group in proportion."],
    ],
    ex: [["A school has 600 pupils: 360 Year 7 and 240 Year 8. A stratified sample of 40 is taken. How many from Year 8?", ["Proportion: 240/600 = 0.4", "0.4 × 40"], "16"]],
    mis: [["Taking the sample sizes equal in each stratum.", "Stratified sampling is proportional to the group size.", "Multiply the total sample by each stratum's share."]],
  },
  "y12-u13-l3": {
    teach: [
      ["Common non-random methods", ["Opportunity sampling uses whoever is available. Quota sampling sets numbers for groups and fills them by choice. Convenience sampling uses the easiest data.", "Surveying students in the canteen at lunchtime is opportunity sampling, and it misses students who eat elsewhere."], "Non-random samples can be biased."],
      ["When they are useful", ["They are quick and cheap, which can suit a first look at a question. Be clear about the bias when you report results."], "Useful for a quick look, but report the bias."],
    ],
    ex: [["Name the sampling method and one source of bias: a survey of the first 20 people who enter a shop.", ["Choosing whoever is available"], "Opportunity sampling; biased towards people who visit at that time"]],
    mis: [["Calling a non-random sample representative.", "Non-random methods can't guarantee every group is included.", "Name the group that might be missed."]],
  },
  "y12-u13-l4": {
    teach: [
      ["Types of data", ["Discrete data takes separate values (e.g. shoe sizes). Continuous data can take any value in a range (e.g. heights). Grouped data puts values into classes.", "For grouped data, use the midpoint of each class to estimate the mean."], "Discrete counts; continuous measures."],
      ["Choosing a chart", ["Bar charts suit discrete data, histograms suit continuous data, and pie charts show proportions of a whole. Choose a chart that matches the data type."], "Match the chart to the data type."],
    ],
    ex: [["Estimate the mean for: 0–10 with 4 values; 10–20 with 6 values. Use midpoints 5 and 15.", ["Sum: 4 × 5 + 6 × 15 = 110", "Total frequency = 10"], "Mean = 11"]],
    mis: [["Using the class boundary instead of the midpoint for the mean.", "The midpoint represents the class.", "Add the lower and upper boundary and divide by 2."]],
  },
  "y12-u13-l5": {
    teach: [
      ["Know the data set", ["A large data set is a real collection of data your exam board provides. Know what each variable means, its units and where the data comes from.", "Questions can ask you to summarise, compare or comment on the data, so check the units before you calculate."], "Know the variables and units."],
      ["Using it in answers", ["Quote values from the data set to support your conclusions. Reference the variable names and units in your answer."], "Support conclusions with values from the data."],
    ],
    ex: [["Why should you check the units of a variable before calculating a mean?", ["Values in different units can't be averaged sensibly"], "To make sure the values are measured in the same way"]],
    mis: [["Comparing values with different units.", "Different units make the comparison meaningless.", "Convert to the same unit first."]],
  },

  /* ================== Unit 14: Averages and spread ================== */
  "y12-u14-l1": {
    teach: [
      ["The three averages", ["Mean = total ÷ number of values. Median = the middle value after ordering. Mode = the most common value.", "For 1, 2, 2, 3, 7: mean = 15 ÷ 5 = 3, median = 2, mode = 2."], "Order before finding the median."],
      ["Choosing one", ["The mean uses every value but is pulled by extreme values. The median is less affected by outliers. The mode suits categories."], "The mean is affected by extreme values."],
    ],
    ex: [["Find the mean, median and mode of 4, 4, 6, 9, 11.", ["Mean = 34/5", "Median is the middle value, 6"], "Mean 6.8, median 6, mode 4"]],
    mis: [["Finding the median without ordering the data.", "The median is the middle of the ordered list.", "Always sort first."]],
  },
  "y12-u14-l2": {
    teach: [
      ["Finding quartiles", ["For n ordered values, the lower quartile Q₁ is at position (n + 1)/4, the median at (n + 1)/2 and the upper quartile Q₃ at 3(n + 1)/4.", "For 2, 4, 6, 8, 10, 12, 14 (n = 7): Q₁ is at position 2 = 4, the median at position 4 = 8, and Q₃ at position 6 = 12."], "Use the positions, then read the values."],
      ["Grouped data", ["Use a cumulative frequency table and interpolate within the class that contains the quartile. Estimate the position within the class in proportion to its frequency."], "Interpolate within the class."],
    ],
    ex: [["Find Q₁, median and Q₃ for 3, 5, 7, 9, 11, 13, 15, 17.", ["n = 8: positions 2.25, 4.5, 6.75", "Interpolate between values"], "Q₁ = 5.5, median = 10, Q₃ = 14.5"]],
    mis: [["Using the wrong position formula for quartiles.", "Positions use n + 1, not n, for these averages.", "Write the position before finding the value."]],
  },
  "y12-u14-l3": {
    teach: [
      ["Interquartile range", ["IQR = Q₃ − Q₁. It is the spread of the middle half of the data, so it is not affected by extreme values."], "The range of the middle half."],
      ["Outliers", ["An outlier is below Q₁ − 1.5 × IQR or above Q₃ + 1.5 × IQR. For Q₁ = 4 and Q₃ = 12, IQR = 8, so the upper limit is 12 + 12 = 24."], "Any value above Q₃ + 1.5 IQR is an outlier."],
    ],
    ex: [["Q₁ = 10, Q₃ = 20. Find the outlier limits.", ["IQR = 10", "Lower: 10 − 15 = −5; upper: 20 + 15 = 35"], "Outliers below −5 or above 35"]],
    mis: [["Using the range instead of the IQR.", "The IQR is only the middle half, so it is more robust.", "Subtract the quartiles."]],
  },
  "y12-u14-l4": {
    teach: [
      ["The working", ["Find the mean, then the deviation of each value from it. Square the deviations, add them, divide by n for the population standard deviation (or n − 1 for a sample), then take the square root.", "For 2, 4, 4, 4, 5, 5, 7, 9: mean 5, sum of squared deviations 32, variance 32/8 = 4, so σ = 2."], "Square, average, then square root."],
      ["Sample standard deviation", ["If the data is a sample, divide the sum of squares by n − 1 instead, to correct for bias."], "Use n − 1 for samples."],
    ],
    ex: [["Find the standard deviation of 1, 3, 5 (population).", ["Mean 3, squares 4, 0, 4, total 8", "Variance 8/3"], "σ = √(8/3) ≈ 1.63"]],
    mis: [["Dividing by n in the sample formula, or by n − 1 for the population formula.", "Use the version that matches the question.", "State which you used."]],
  },
  "y12-u14-l5": {
    teach: [
      ["Coded data", ["If y = (x − a)/b, then ȳ = (x̄ − a)/b, and the standard deviation scales by 1/b: σ_y = σ_x/b.", "The shift a has no effect on the spread, and dividing by b changes both mean and standard deviation."], "Shifts change the mean; scaling changes the spread."],
      ["Using the rule", ["If x̄ = 120 and σ = 10, then y = (x − 100)/5 has ȳ = 4 and σ_y = 2."], "Apply the rule to both."],
    ],
    ex: [["Coded values y = (x − 50)/2 have mean 3 and standard deviation 4. Find the mean and standard deviation of x.", ["x̄ = 2 × 3 + 50", "σ_x = 2 × 4"], "Mean 56, standard deviation 8"]],
    mis: [["Scaling the mean and the standard deviation in the same way as each other.", "The shift does not change the standard deviation.", "Use the rule for each separately."]],
  },

  /* ================== Unit 15: Displaying data ================== */
  "y12-u15-l1": {
    teach: [
      ["Two rules", ["Use the IQR rule: outliers lie outside Q₁ − 1.5 IQR and Q₃ + 1.5 IQR. Or use standard deviations, where values more than 2 or 3 standard deviations from the mean are unusual.", "The rule to use is the one your question states, or the one your course uses."], "State which rule you use."],
      ["What to do with them", ["Check them for errors. If they are real, keep them and say how they affect the mean and range."], "Check before removing."],
    ],
    ex: [["A data set has Q₁ = 5 and Q₃ = 9. Is 16 an outlier?", ["IQR = 4", "Upper limit: 9 + 6 = 15"], "Yes, 16 is above 15"]],
    mis: [["Removing outliers without checking them.", "Outliers can be real, not errors.", "Explain the decision."]],
  },
  "y12-u15-l2": {
    teach: [
      ["The five-number summary", ["A box plot shows the minimum, Q₁, median, Q₃ and maximum. The box covers the IQR, and the median line splits it.", "Whiskers extend to the smallest and largest values that are not outliers. Outliers are plotted separately as points."], "Box for the middle half; whiskers to the non-outliers."],
      ["Comparing box plots", ["Compare two box plots by looking at medians, the spread (IQR and range), and whether the box plots overlap."], "Compare medians and spread."],
    ],
    ex: [["Write the five-number summary for 2, 4, 7, 10, 15.", ["Positions 1.5 and 4.5 for the quartiles", "Q₁ = 3, Q₃ = 12.5"], "Min 2, Q₁ 3, median 7, Q₃ 12.5, max 15"]],
    mis: [["Extending the whisker to an outlier.", "Whiskers stop at the last value inside the outlier limits.", "Calculate the limits first."]],
  },
  "y12-u15-l3": {
    teach: [
      ["Plotting", ["Plot the upper class boundary against cumulative frequency, and join the points with a smooth curve. Start from the lower boundary at zero frequency.", "The cumulative frequency is the running total of the frequencies."], "Plot the upper boundary against the running total."],
      ["Reading the graph", ["The median is at cumulative frequency n/2. Read across to the curve and down to the x-axis. The quartiles are at n/4 and 3n/4."], "Median at n/2, quartiles at n/4 and 3n/4."],
    ],
    ex: [["n = 40. Find the cumulative frequency for the median and the quartiles.", ["Median: 40/2", "Quartiles: 40/4 and 3 × 40/4"], "20, 10 and 30"]],
    mis: [["Plotting the lower boundary or the midpoint.", "The points use the upper class boundary.", "Check the x-axis label on each point."]],
  },
  "y12-u15-l4": {
    teach: [
      ["Area as frequency", ["In a histogram the bars are not counts. The area of each bar is its frequency. The height is the frequency density, which is frequency ÷ class width.", "For a class 10–20 with frequency 15, the width is 10 and the height is 1.5."], "Area = frequency; height = frequency ÷ width."],
      ["Unequal widths", ["Because area carries the frequency, classes of different widths can be compared fairly."], "Area makes unequal widths fair."],
    ],
    ex: [["A class 20–30 has frequency 24. Find its frequency density.", ["Width 10", "24 ÷ 10"], "2.4"]],
    mis: [["Using frequency as the height when the widths differ.", "The height must be the frequency density.", "Divide each frequency by its class width."]],
  },
  "y12-u15-l5": {
    teach: [
      ["Two comparisons", ["Compare a measure of location (mean or median) and a measure of spread (range, IQR or standard deviation). Make both comparisons in context.", "Boys have a higher median mark and a smaller IQR, so the boys' marks are higher and more consistent."], "Location and spread, in context."],
      ["Writing the conclusion", ["State which group is higher or more consistent, using the numbers, and use the words of the question."], "Use numbers and context in the conclusion."],
    ],
    ex: [["Group A: median 60, IQR 10. Group B: median 55, IQR 20. Compare them.", ["A has the higher median", "A has the smaller IQR"], "Group A scored higher and was more consistent"]],
    mis: [["Comparing only one measure.", "Compare both location and spread.", "Give one comparison of each type."]],
  },

  /* ================== Unit 16: Correlation and regression ================== */
  "y12-u16-l1": {
    teach: [
      ["Describing correlation", ["Describe the direction (positive or negative), the strength (strong, moderate or weak) and whether the relationship is linear.", "Strong positive correlation means the points lie close to a rising line."], "Direction, strength and form."],
      ["Correlation is not causation", ["A correlation does not show that one variable causes the other. Both may depend on a third variable."], "Correlation does not prove cause."],
    ],
    ex: [["The product-moment correlation coefficient is r = 0.9. Describe the correlation.", ["Close to 1, so strong", "Positive sign"], "Strong positive correlation"]],
    mis: [["Saying one variable causes the other.", "Correlation only shows that they move together.", "Use careful wording such as 'is associated with'."]],
  },
  "y12-u16-l2": {
    teach: [
      ["The regression line", ["y = a + bx, where b is the gradient (the change in y per unit of x) and a is the intercept. Use it to predict y from x.", "For y = 2 + 0.5x, each extra unit of x increases y by 0.5."], "b is the change per unit of x."],
      ["Interpolation and extrapolation", ["Predicting inside the range of the data (interpolation) is usually reliable. Predicting outside it (extrapolation) is less reliable."], "Predictions outside the data are less reliable."],
    ],
    ex: [["Using y = 2 + 0.5x, predict y when x = 10. Is this reliable if the data went up to x = 6?", ["y = 2 + 5 = 7", "x = 10 is outside the data"], "y = 7, but it is extrapolation so less reliable"]],
    mis: [["Using a regression line far outside the data range.", "Extrapolation may not follow the same pattern.", "Say whether the prediction is reliable."]],
  },

  /* ================== Unit 17: Probability ================== */
  "y12-u17-l1": {
    teach: [
      ["Complementary events", ["P(A′) = 1 − P(A), where A′ means 'not A'. Use this when it is easier to find the probability of the opposite.", "If P(rain) = 0.3, then P(no rain) = 0.7."], "P(not A) = 1 − P(A)."],
      ["Equally likely outcomes", ["When every outcome is equally likely, P(event) = number of favourable outcomes ÷ total outcomes."], "Count favourable outcomes ÷ total."],
    ],
    ex: [["A fair die is rolled. Find P(not a 6).", ["1 − 1/6"], "5/6"]],
    mis: [["Using P(A′) = P(A) instead of 1 − P(A).", "Probabilities of an event and its opposite add to 1.", "Check the total is 1."]],
  },
  "y12-u17-l2": {
    teach: [
      ["Overlapping events", ["P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Subtract the overlap, which would otherwise be counted twice.", "If P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2, then P(A ∪ B) = 0.7."], "Subtract the overlap once."],
      ["Filling in a Venn diagram", ["Start from the centre (A ∩ B), then fill the other regions by subtracting. Check the total is 1."], "Start from the middle."],
    ],
    ex: [["Using the values above, find P(A only).", ["P(A) − P(A ∩ B)"], "0.3"]],
    mis: [["Adding the probabilities without subtracting the overlap.", "The overlap is counted in both, so it must be removed once.", "Use the addition rule."]],
  },
  "y12-u17-l3": {
    teach: [
      ["Mutually exclusive", ["Events that cannot both happen have P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B).", "Two events can't be mutually exclusive and independent at the same time, unless one has probability zero."], "P(A ∩ B) = 0 for mutually exclusive events."],
      ["Independent", ["Events are independent when P(A ∩ B) = P(A) × P(B). Knowing one has happened doesn't change the probability of the other.", "For P(A) = 0.3 and P(B) = 0.4, independence gives P(A ∩ B) = 0.12."], "Test independence with a product."],
    ],
    ex: [["P(A) = 0.3, P(B) = 0.4 and A, B are independent. Find P(A ∪ B).", ["P(A ∩ B) = 0.3 × 0.4 = 0.12", "0.3 + 0.4 − 0.12"], "0.58"]],
    mis: [["Multiplying probabilities for mutually exclusive events.", "Mutually exclusive events have P(A ∩ B) = 0, not P(A) × P(B).", "Check the definition before choosing the rule."]],
  },
  "y12-u17-l4": {
    teach: [
      ["Multiply along, add between", ["Multiply the probabilities along each branch to get the probability of that path. Add the paths for the outcome you want.", "For a bag with 3 red and 2 blue balls drawn twice without replacement: P(RR) = 3/5 × 2/4 = 3/10."], "Multiply along paths; add paths."],
      ["Changing probabilities", ["When the first draw changes what is left, the probabilities on the second stage change too. Check the totals on every set of branches add to 1."], "Check each set of branches adds to 1."],
    ],
    ex: [["Using the bag above, find P(one red and one blue).", ["P(RB) + P(BR)", "3/5 × 2/4 + 2/5 × 3/4"], "3/5"]],
    mis: [["Not updating the probabilities when items are not replaced.", "The second draw depends on the first when there is no replacement.", "Subtract one from the total and the chosen colour."]],
  },

  /* ================== Unit 18: Discrete distributions ================== */
  "y12-u18-l1": {
    teach: [
      ["The table", ["A probability distribution lists each value x with its probability P(X = x). The probabilities must add to 1, and each is between 0 and 1.", "For P(0) = 0.1, P(1) = 0.4, P(2) = 0.3, P(3) = 0.2: the total is 1, so it is a valid distribution."], "Check the probabilities add to 1."],
      ["Mean of a distribution", ["E(X) = Σx P(X = x) is the mean. For the table above, E(X) = 0 + 0.4 + 0.6 + 0.6 = 1.6."], "E(X) weights each value by its probability."],
    ],
    ex: [["The table has values 1, 2, 3 and 4 only, with P(1) = 0.2, P(2) = 0.5, P(3) = 0.2. Find P(4).", ["Total 1", "1 − (0.2 + 0.5 + 0.2)"], "0.1"]],
    mis: [["Not checking the total is 1.", "Missing a probability means the table is wrong.", "Add all probabilities first."]],
  },
  "y12-u18-l2": {
    teach: [
      ["The binomial conditions", ["X ~ B(n, p) when there are a fixed number of independent trials n, each with two outcomes (success or failure) and a constant probability p of success.", "The probability of exactly r successes is P(X = r) = ⁿCᵣ pʳ (1 − p)ⁿ⁻ʳ."], "Check the conditions before using the formula."],
      ["Calculating", ["Find ⁿCᵣ, then multiply by pʳ and by (1 − p)ⁿ⁻ʳ. Your calculator can do all three steps."], "Use the formula or your calculator."],
    ],
    ex: [["X ~ B(5, 0.2). Find P(X = 2).", ["⁵C₂ = 10", "10 × 0.2² × 0.8³"], "0.2048"]],
    mis: [["Using p instead of (1 − p) for failures.", "The failures are the other outcome, with probability 1 − p.", "Write the failure probability out."]],
  },
  "y12-u18-l3": {
    teach: [
      ["The complement trick", ["P(X ≥ 3) = 1 − P(X ≤ 2). Use this when the 'or more' calculation has many terms.", "For B(5, 0.2): P(X ≥ 3) = 1 − P(X ≤ 2) = 1 − 0.9421 = 0.0579."], "Use 1 minus the complement."],
      ["Ranges", ["P(a ≤ X ≤ b) = P(X ≤ b) − P(X ≤ a − 1). Note the a − 1 at the bottom."], "Subtract the cumulative value below the range."],
    ],
    ex: [["X ~ B(5, 0.2). Find P(1 ≤ X ≤ 2).", ["P(X ≤ 2) − P(X ≤ 0)", "0.9421 − 0.3277"], "0.6144"]],
    mis: [["Using P(X ≤ a) instead of P(X ≤ a − 1) for a range.", "The start of the range is included, so subtract the value just below it.", "Write out which values are included."]],
  },

  /* ================== Unit 19: Hypothesis testing ================== */
  "y12-u19-l1": {
    teach: [
      ["The hypotheses", ["H₀ is the null hypothesis, which assumes the probability is what is stated (e.g. p = 0.2). H₁ is the alternative, which says it is different (e.g. p > 0.2).", "Test the sample result against H₀. Only reject H₀ if the result is unlikely if H₀ is true."], "H₀ is assumed true until the evidence says otherwise."],
      ["Significance level", ["The significance level α (e.g. 5%) is the probability of rejecting H₀ when it is true, and it sets the critical region."], "α sets how unlikely the result must be."],
    ],
    ex: [["A coin is tested for bias towards heads, so p is the probability of heads. Write H₀ and H₁.", ["H₀ is no bias", "H₁ is more heads"], "H₀: p = 0.5, H₁: p > 0.5"]],
    mis: [["Writing the hypotheses about the sample instead of the population probability.", "Hypotheses are about the population parameter p.", "State H₀ and H₁ in terms of p."]],
  },
  "y12-u19-l2": {
    teach: [
      ["Finding the critical region", ["Work out the probabilities for the tail of the distribution until the next value would take it over α. The region is the set of values in the tail.", "For X ~ B(10, 0.3), testing H₁: p < 0.3 at the 5% level: P(X = 0) = 0.028 < 0.05 but P(X ≤ 1) = 0.149 > 0.05, so the critical region is {0}."], "Add tail values while the total stays under α."],
      ["Using it", ["If the observed value is in the critical region, reject H₀. If not, you do not have enough evidence to reject H₀."], "In the region: reject H₀."],
    ],
    ex: [["Using the same test, the observed X = 1. Do you reject H₀?", ["1 is not in {0}", "Not enough evidence"], "Do not reject H₀"]],
    mis: [["Saying the hypothesis is proved true when it is not rejected.", "Not rejecting H₀ does not prove it.", "Write 'insufficient evidence to reject H₀'."]],
  },
  "y12-u19-l3": {
    teach: [
      ["Full test structure", ["State H₀ and H₁, state the distribution, find the critical region, find the probability of the observed value or the critical region, then give a conclusion in context."], "Follow the full structure in the answer."],
      ["Writing the conclusion", ["Refer to the situation: 'There is evidence at the 5% level that the probability has decreased.'"], "Conclude in context."],
    ],
    ex: [["Test H₁: p < 0.3 at 5% with X ~ B(10, 0.3) and X = 0. Write the conclusion.", ["0 is in the critical region {0}", "Reject H₀"], "There is evidence at the 5% level that p has decreased"]],
    mis: [["Giving a conclusion without context.", "The answer should mention the probability in the question.", "Say what the test shows about the situation."]],
  },
  "y12-u19-l4": {
    teach: [
      ["Halve the significance level", ["In a two-tailed test, the 5% level is split: 2.5% in each tail. Use α/2 for each tail.", "For X ~ B(10, 0.5): P(X ≤ 1) = 0.0107 and P(X ≥ 9) = 0.0107, so the critical region is {0, 1, 9, 10}. The actual significance level is about 2.15%, because P(X ≤ 2) = 0.0547 is too large."], "Each tail gets half the significance level."],
      ["Why the region is not exact", ["The discrete distribution does not allow every exact tail size, so the critical region may give a smaller significance level than the one you aimed for."], "The actual level may be below the target."],
    ],
    ex: [["Two-tailed test at 10% with X ~ B(10, 0.5). Each tail is 5%. Is X = 1 in the critical region?", ["P(X ≤ 1) = 0.0107 ≤ 0.05", "Yes, it is in the lower tail"], "Yes: reject H₀"]],
    mis: [["Using the full significance level in one tail.", "A two-tailed test shares α between both tails.", "Halve α for each tail."]],
  },

  /* ================== Unit 20: Mechanics modelling ================== */
  "y12-u20-l1": {
    teach: [
      ["The modelling cycle", ["Real situation → make assumptions → build a mathematical model → solve → interpret the result in context → check and refine the model.", "The model is useful when its predictions match what happens, not when it is perfectly realistic."], "Simplify, solve, then check."],
      ["Why simplify", ["A model that is too complicated can't be solved. Choose assumptions that keep the important features."], "Keep only what matters."],
    ],
    ex: [["Give the first step in the modelling cycle for a ball thrown in the air.", ["Think about the real situation first"], "Describe the real situation and make assumptions"]],
    mis: [["Presenting a model result without interpreting it.", "The answer should be explained in the real situation.", "Say what the answer means."]],
  },
  "y12-u20-l2": {
    teach: [
      ["Common assumptions", ["A particle: the object's size and shape are ignored, so all its mass is at one point. A light string: its mass is ignored. A smooth surface: there is no friction. A rod or pulley: the mass and friction are ignored.", "No air resistance means only the forces listed act on the object."], "Each assumption removes a complication."],
      ["Using them", ["State the assumptions you use at the start of each question. They tell the examiner which model you are using."], "State the assumptions clearly."],
    ],
    ex: [["Name one assumption for a car treated as a particle.", ["Size and shape are ignored"], "The car's size and shape are ignored, so it is a point mass"]],
    mis: [["Treating a light string as having mass.", "A light string has negligible mass in the model.", "Use the assumptions given in the question."]],
  },
  "y12-u20-l3": {
    teach: [
      ["SI units", ["Use metres (m) for distance, kilograms (kg) for mass and seconds (s) for time. Velocity is in m s⁻¹ and acceleration in m s⁻².", "Convert before calculating, e.g. 2 minutes = 120 s and 5 km = 5000 m."], "Convert to SI first."],
      ["Weight", ["Weight is a force, measured in newtons (N). W = mg with g = 9.8 m s⁻². A 5 kg mass has weight 5 × 9.8 = 49 N."], "Weight = mass × g, in newtons."],
    ],
    ex: [["A 3 kg object is pulled by gravity. Find its weight.", ["W = 3 × 9.8"], "29.4 N"]],
    mis: [["Using mass in newtons, or using weight in kilograms.", "Mass is in kg, weight is in N.", "Check the units match the quantity."]],
  },
  "y12-u20-l4": {
    teach: [
      ["Vector quantities", ["Displacement, velocity, acceleration and force are vectors: they have size and direction. Speed and distance are scalars.", "Velocity (3, 4) m s⁻¹ has speed √(9 + 16) = 5 m s⁻¹."], "Vectors have size and direction."],
      ["Speed from velocity", ["The speed is the magnitude of the velocity vector: √(x² + y²)."], "Speed is the size of velocity."],
    ],
    ex: [["Find the speed of a particle with velocity 6i − 8j m s⁻¹.", ["√(36 + 64)"], "10 m s⁻¹"]],
    mis: [["Adding the components to find speed.", "Speed is the magnitude, so use Pythagoras.", "Square, add, square root."]],
  },

  /* ================== Unit 21: Kinematics ================== */
  "y12-u21-l1": {
    teach: [
      ["Reading the graph", ["The gradient of a displacement–time graph is the velocity. A straight line means constant velocity.", "If the displacement goes from 0 to 12 m in 3 s along a straight line, the velocity is 4 m s⁻¹."], "Gradient = velocity."],
      ["Curves", ["On a curve, the gradient at a point is the velocity at that instant. Draw a tangent to measure it."], "Use a tangent for curves."],
    ],
    ex: [["A displacement graph goes from (0, 2) to (4, 10). Find the average velocity.", ["(10 − 2)/(4 − 0)"], "2 m s⁻¹"]],
    mis: [["Reading the height of the graph as the velocity.", "Velocity is the gradient, not the height.", "Calculate the rise over run."]],
  },
  "y12-u21-l2": {
    teach: [
      ["Velocity–time graphs", ["The gradient is acceleration. The area under the graph is displacement, and areas below the time axis count as negative.", "A velocity rising from 10 to 20 m s⁻¹ over 4 s has displacement ½(10 + 20) × 4 = 60 m."], "Area = displacement; gradient = acceleration."],
      ["Trapezium areas", ["For a trapezium-shaped area, use ½(sum of parallel sides) × height. Split a complicated area into triangles and rectangles."], "Split complicated shapes."],
    ],
    ex: [["Velocity rises from 10 to 20 m s⁻¹ over 4 s. Find the acceleration.", ["(20 − 10)/4"], "2.5 m s⁻²"]],
    mis: [["Using area for acceleration or gradient for displacement.", "The gradient gives acceleration; the area gives displacement.", "Label the axes first."]],
  },
  "y12-u21-l3": {
    teach: [
      ["The five suvat equations", ["v = u + at; s = ut + ½at²; s = ½(u + v)t; v² = u² + 2as; s = vt − ½at².", "Each equation uses four of the five quantities s, u, v, a and t, so pick the one that leaves out the quantity you don't know."], "Choose the equation without the unknown."],
      ["Worked example", ["u = 4, a = 2, t = 5: v = 4 + 10 = 14, and s = 4 × 5 + ½ × 2 × 25 = 45 m."], "List the values, then choose."],
    ],
    ex: [["A car starts at 10 m s⁻¹ and accelerates at 3 m s⁻² for 4 s. Find its speed at the end.", ["v = u + at", "10 + 12"], "22 m s⁻¹"]],
    mis: [["Using a suvat equation when acceleration is not constant.", "Suvat only works for constant acceleration.", "Check the acceleration is constant first."]],
  },
  "y12-u21-l4": {
    teach: [
      ["Separate the stages", ["Solve each stage on its own. The final velocity of one stage is the starting velocity of the next, and the displacements add up.", "An object accelerates from rest to 20 m s⁻¹ in 4 s, then moves at constant speed for 10 s."], "Final velocity becomes the next start."],
      ["Total displacement", ["Stage 1: s = ½ × 20 × 4 = 40 m. Stage 2: s = 20 × 10 = 200 m. Total 240 m."], "Add the stage displacements."],
    ],
    ex: [["An object starts at 5 m s⁻¹ and accelerates at 2 m s⁻² for 3 s. Find its final velocity.", ["v = 5 + 2 × 3"], "11 m s⁻¹"]],
    mis: [["Using the start velocity of the whole motion for the second stage.", "The second stage starts from the final velocity of the first.", "Write the velocity at each stage boundary."]],
  },
  "y12-u21-l5": {
    teach: [
      ["Free fall", ["A freely falling object has constant acceleration g = 9.8 m s⁻² downwards, so suvat applies.", "If you take down as positive, a = +9.8. If you take up as positive, a = −9.8."], "Choose the direction, then the sign of g."],
      ["Example", ["A ball is dropped from rest. After 3 s, v = 0 + 9.8 × 3 = 29.4 m s⁻¹, and s = ½ × 9.8 × 9 = 44.1 m (down)."], "Drop from rest: u = 0."],
    ],
    ex: [["A ball is thrown upwards at 10 m s⁻¹ (up positive, a = −9.8). Find the time to reach the top.", ["0 = 10 − 9.8t", "t = 10/9.8"], "t ≈ 1.02 s"]],
    mis: [["Using +9.8 when the object moves up with the positive direction up.", "Gravity acts opposite to upward motion, so a is negative.", "Write the sign of a at the start."]],
  },

  /* ================== Unit 22: Forces and Newton's laws ================== */
  "y12-u22-l1": {
    teach: [
      ["Force diagrams", ["Draw the object as a dot and add every force as an arrow from it. Include the weight, the normal reaction and any tension or friction.", "A 10 N force to the right and 4 N to the left give a resultant of 6 N to the right."], "Show every force as an arrow."],
      ["Resultant", ["The resultant is the single force that has the same effect as all the forces together. Add opposite directions with signs."], "Add forces with signs."],
    ],
    ex: [["A 7 N force acts up and 3 N acts down. Find the resultant.", ["7 − 3"], "4 N upwards"]],
    mis: [["Adding forces with the same magnitude but ignoring the direction.", "Forces in opposite directions subtract.", "Use a sign convention."]],
  },
  "y12-u22-l2": {
    teach: [
      ["Components", ["Forces are vectors, so write each as components. 3i + 4j and −i + 2j add to 2i + 6j.", "The magnitude of the resultant is √(2² + 6²) = √40 ≈ 6.32 N."], "Add the i parts and the j parts separately."],
      ["Direction", ["The direction is found from the components with tan θ = y/x, measured from the i direction."], "Use components to find direction."],
    ],
    ex: [["Forces 5i and −2i + 3j act on a particle. Find the resultant.", ["(5 − 2)i + 3j"], "3i + 3j"]],
    mis: [["Adding the i and j components together.", "Only the same direction components add.", "Write each component separately."]],
  },
  "y12-u22-l3": {
    teach: [
      ["F = ma", ["The resultant force equals mass × acceleration: F = ma. The acceleration is in the direction of the resultant force.", "A 3 kg object with a 12 N resultant force has a = 12/3 = 4 m s⁻²."], "F = ma, with F the resultant."],
      ["Units", ["Use kg for m, m s⁻² for a and N for F. 1 N is the force that gives 1 kg an acceleration of 1 m s⁻²."], "1 N = 1 kg m s⁻²."],
    ],
    ex: [["A 2 kg particle has a resultant force of 10 N. Find its acceleration.", ["a = F/m = 10/2"], "5 m s⁻²"]],
    mis: [["Using the total of the forces instead of the resultant.", "Only the resultant force gives the acceleration.", "Find the resultant first."]],
  },
  "y12-u22-l4": {
    teach: [
      ["Vector form", ["Write F = ma as a vector equation: F = ma, so a = F/m. Divide each component of F by m.", "For F = 4i + 3j N and m = 2 kg, a = 2i + 1.5j m s⁻²."], "Divide each component by the mass."],
      ["Magnitude", ["The size of the acceleration is √(a_x² + a_y²). For the example: √(4 + 2.25) = 2.5 m s⁻²."], "Find the size with Pythagoras."],
    ],
    ex: [["A 4 kg particle has F = 8i − 12j N. Find the acceleration.", ["a = (8i − 12j)/4"], "2i − 3j m s⁻²"]],
    mis: [["Dividing the whole vector by the mass without splitting it.", "It is the same, but mistakes often happen when the components are not separated.", "Write each component divided by m."]],
  },
  "y12-u22-l5": {
    teach: [
      ["Same acceleration", ["Two particles joined by a string move together, so they have the same acceleration. Apply F = ma to each particle, or to the whole system.", "Two particles of 2 kg and 4 kg are pulled by a 12 N force on the 2 kg particle along a smooth surface: a = 12/6 = 2 m s⁻²."], "Connected particles share acceleration."],
      ["Finding the tension", ["For the 4 kg particle, T = 4 × 2 = 8 N, which is the tension in the string joining them."], "Use one particle to find the tension."],
    ],
    ex: [["Using the example, find the tension in the string if the 2 kg particle is pulled by 12 N and the 4 kg particle is connected by the string.", ["T = 4a = 4 × 2"], "8 N"]],
    mis: [["Using the mass of only one particle for the whole system.", "The system's total mass is used for the whole system.", "Write which mass you are using."]],
  },
  "y12-u22-l6": {
    teach: [
      ["Smooth pulleys", ["A light, smooth pulley changes the direction of the string but not the tension. The tension is the same on both sides of the string.", "If the string passes over the pulley, the masses on each side have the same acceleration in size, but in opposite directions."], "Same tension and same acceleration size."],
      ["Two masses over a pulley", ["For masses m₁ = 3 kg and m₂ = 5 kg, the acceleration is a = (5 − 3)g/(3 + 5) = g/4 = 2.45 m s⁻², and the tension is 3(9.8 + 2.45) = 36.75 N."], "Use the difference of the weights over the total mass."],
    ],
    ex: [["Masses of 2 kg and 6 kg hang over a smooth pulley. Find the acceleration to 2 d.p.", ["a = (6 − 2)g/(2 + 6)", "= 4 × 9.8/8"], "4.90 m s⁻²"]],
    mis: [["Using the total weight rather than the difference.", "The net force is the difference between the two weights.", "Subtract the smaller weight from the larger."]],
  },

  /* ================== Unit 23: Variable acceleration ================== */
  "y12-u23-l1": {
    teach: [
      ["Functions of time", ["When acceleration is not constant, s, v and a are functions of time. Substitute the time to find each value at that instant.", "For s = t³ − 2t: at t = 2, s = 8 − 4 = 4 m, v = 3t² − 2 = 10 m s⁻¹ and a = 6t = 12 m s⁻²."], "Substitute the time into each function."],
      ["Checking the functions", ["Check the units of the functions match the quantities. Each derivative of s must be a velocity."], "Check the units."],
    ],
    ex: [["Using s = t³ − 2t, find the acceleration at t = 1.", ["a = 6t", "6 × 1"], "6 m s⁻²"]],
    mis: [["Using suvat when acceleration is not constant.", "Suvat only works for constant acceleration.", "Use calculus for variable acceleration."]],
  },
  "y12-u23-l2": {
    teach: [
      ["Differentiate", ["Velocity is the derivative of displacement: v = ds/dt. Acceleration is the derivative of velocity: a = dv/dt.", "For s = 2t³: v = 6t², and a = 12t."], "v = ds/dt; a = dv/dt."],
      ["Using it", ["Differentiate, then substitute the time. Show the derivative step."], "Differentiate, then substitute."],
    ],
    ex: [["A particle has s = 4t² − t. Find v and a.", ["v = 8t − 1", "a = 8"], "v = 8t − 1, a = 8 m s⁻²"]],
    mis: [["Integrating instead of differentiating.", "Velocity comes from differentiating displacement.", "Remember: displacement → velocity → acceleration is differentiation."]],
  },
  "y12-u23-l3": {
    teach: [
      ["Maximum displacement", ["The displacement is largest when the velocity is zero, so set v = 0 and solve. Check that the value gives a maximum.", "For s = 6t − t²: v = 6 − 2t = 0 at t = 3, so the maximum displacement is 18 − 9 = 9 m."], "Maximum displacement when v = 0."],
      ["Maximum velocity", ["Maximum velocity happens when a = 0. Set the acceleration to zero and solve."], "Maximum velocity when a = 0."],
    ],
    ex: [["For v = 12t − 3t², find the maximum velocity.", ["a = 12 − 6t = 0", "t = 2"], "v = 24 − 12 = 12 m s⁻¹"]],
    mis: [["Setting velocity to zero to find maximum velocity.", "Maximum velocity needs a = 0.", "Use the acceleration for maximum velocity."]],
  },
  "y12-u23-l4": {
    teach: [
      ["Integrating", ["Velocity is the integral of acceleration: v = ∫a dt. Displacement is the integral of velocity: s = ∫v dt. Use the initial conditions to find the constants.", "For a = 4t with v(0) = 3: v = 2t² + 3. Then with s(0) = 0, s = (2/3)t³ + 3t."], "Use the start values to find constants."],
      ["Constants", ["Each integral gives a constant, found from the initial velocity or displacement."], "Find each constant from the start."],
    ],
    ex: [["Given a = 6t and v(0) = 2, find v.", ["v = 3t² + C", "C = 2"], "v = 3t² + 2"]],
    mis: [["Forgetting the constant of integration.", "The constant is needed, and it comes from the start values.", "Find C from the given initial value."]],
  },
  "y12-u23-l5": {
    teach: [
      ["Deriving the suvat equations", ["Start from a = constant. Integrate to get v = u + at. Integrate again to get s = ut + ½at², with the constant zero because s = 0 at t = 0.", "The other suvat equations follow by combining these."], "Suvat comes from integrating constant acceleration."],
      ["When they apply", ["The derivation is only valid when acceleration is constant. This is why suvat cannot be used when acceleration varies."], "Only for constant acceleration."],
    ],
    ex: [["Use integration to derive s = ut + ½at² from v = u + at.", ["s = ∫(u + at) dt", "= ut + ½at² + C"], "s = ut + ½at² (with C = 0 since s = 0 at t = 0)"]],
    mis: [["Keeping the constant when the initial displacement is zero.", "When s = 0 at t = 0, the constant is zero.", "Use the start conditions."]],
  },
};
