/* ==========================================================================
   Answer checking
   --------------------------------------------------------------------------
   checkAnswer(question, response) → { status, message }
     status "correct"   : right answer
     status "incorrect" : a real attempt that is wrong
     status "invalid"   : couldn't be read (e.g. "3/" or empty); this does
                          NOT count as a wrong attempt, the student is just
                          asked to fix the format

   Every question has a `type` and an `answer` describing what is correct.
   Questions can also list `traps`: answers we expect from a particular
   misconception, with feedback that explains the specific mistake (much
   more useful than just "wrong").
   ========================================================================== */
import { clean, fmt, parseFraction, parseNumber, simplify } from "./numbers.js";
import { countTerms, equivalent, evaluate, hasUnexpandedBrackets, isProduct, lettersIn, parseExpression } from "./expression.js";

const ok = (message = "Correct, well done.") => ({ status: "correct", message });
const wrong = (message) => ({ status: "incorrect", message });
const invalid = (message) => ({ status: "invalid", message });

const same = (a, b, tolerance = 0) => Math.abs(clean(a) - clean(b)) <= tolerance + 1e-9;

// Look for a matching trap, i.e. a predictable wrong answer.
function trapFeedback(question, value) {
  const trap = (question.traps ?? []).find((t) => same(t.value, value));
  return trap ? trap.feedback : null;
}

function checkNumeric(q, raw) {
  const text = String(raw ?? "").trim().replace(/^£/, "").replace(/(°C|cm|m|kg|g)$/i, "").trim();
  let value = parseNumber(text);
  if (value === null) {
    // Allow an exact fraction for a numeric answer ("7/100" for 0.07),
    // unless a set number of decimal places is required.
    const f = q.answer.dp === undefined ? parseFraction(text) : null;
    if (f && f.d !== 1) value = f.n / f.d;
    else return checkExactForm(q, text);
  }
  const { value: target, dp, tolerance = 0 } = q.answer;

  if (same(value, target, tolerance)) {
    // Right value, but is it written to the required accuracy?
    if (dp !== undefined) {
      const typed = text.replace(/[−]/g, "-").replace(/,/g, "");
      const typedDp = typed.includes(".") ? typed.split(".")[1].length : 0;
      if (typedDp !== dp) {
        return wrong(`That is the right value, but rounding to ${dp} decimal place${dp === 1 ? "" : "s"} means writing exactly ${dp} digit${dp === 1 ? "" : "s"} after the point: ${fmt(target, dp)}. Any final zeros show how accurate the answer is, so keep them.`);
      }
    }
    return ok();
  }
  return wrong(trapFeedback(q, value) ?? "Check your working and try again.");
}

/* An answer typed with symbols from the symbol box, such as 2√3, π/4 or
   5^(1/2), instead of a plain number. We work out its value safely (no
   eval: see expression.js).
     - If the question wants a rounded decimal, ask for the decimal.
     - If the true answer is a "nice" number (whole, or a short decimal),
       ask for that number: otherwise typing the question's own
       calculation back in (e.g. 8^(2/3)) would count as correct.
     - If the true answer is irrational (like √2), an exact form with the
       right value is accepted. */
function checkExactForm(q, text) {
  const notANumber = invalid("Please enter a number, for example 42, −7 or 3.5.");
  if (!/[√π^⁰¹²³⁴⁵⁶⁷⁸⁹()]/.test(text)) return notANumber;
  let tree;
  try { tree = parseExpression(text); } catch { return notANumber; }
  if (lettersIn(tree).length) return invalid("This answer is a number, so it shouldn't contain letters.");
  const value = evaluate(tree, {});
  if (!Number.isFinite(value)) return invalid("That can't be worked out (for example, the square root of a negative number).");
  const { value: target, dp } = q.answer;
  if (dp !== undefined) return invalid(`Please work out the value and give it as a decimal rounded to ${dp} decimal place${dp === 1 ? "" : "s"}.`);
  const nice = Math.abs(target * 10000 - Math.round(target * 10000)) < 1e-6;
  if (nice) return invalid("Please work this out and give your answer as a single number.");
  if (same(value, target)) return ok("Correct, well done. That exact form is right.");
  return wrong(trapFeedback(q, value) ?? "Check your working and try again.");
}

function checkPercentage(q, raw) {
  const text = String(raw ?? "").trim().replace(/%$/, "").trim();
  const value = parseNumber(text);
  if (value === null) return invalid("Please enter a percentage, for example 35 or 35%.");
  if (same(value, q.answer.value, q.answer.tolerance ?? 0)) return ok();
  return wrong(trapFeedback(q, value) ?? "Check your working and try again.");
}

function checkFraction(q, raw) {
  const f = parseFraction(raw);
  if (!f) return invalid("Please write a fraction using /, for example 3/4 (or 1 1/2 for a mixed number).");
  const target = simplify(q.answer);
  const given = simplify(f);
  if (given.n !== target.n || given.d !== target.d) {
    return wrong(trapFeedback(q, f.n / f.d) ?? "That fraction isn't equal to the answer. Try again.");
  }
  if (q.answer.simplest && simplify(f).d !== f.d) {
    return wrong(`${f.n}/${f.d} is equivalent, but it isn't in its simplest form yet. Can you divide the top and bottom by a common factor?`);
  }
  if (q.answer.improper === false && !f.mixed && Math.abs(f.n) > f.d) {
    return wrong("The value is right, but the question asks for a mixed number, such as 1 1/2.");
  }
  return ok();
}

function checkExpression(q, raw) {
  let given;
  try {
    given = parseExpression(String(raw ?? ""));
  } catch (error) {
    return invalid(`${error.message}. Type algebra like 5x + 3y, 2(x + 1) or x^2.`);
  }
  const target = parseExpression(q.answer.expr);
  if (!equivalent(given, target)) {
    const trap = (q.traps ?? []).find((t) => equivalent(given, parseExpression(t.expr)));
    return wrong(trap?.feedback ?? "That expression isn't equivalent to the answer. Check each term carefully.");
  }
  if (q.answer.simplified && countTerms(given) > countTerms(target)) {
    return wrong("That's equivalent, but it isn't fully simplified. Collect any like terms together.");
  }
  const typed = String(raw ?? "");
  if (q.answer.noPowers && /\^|²|³/.test(typed)) {
    return wrong("That's equivalent, but it isn't simplified yet. Factorise the top and bottom, then cancel the common factor.");
  }
  if (q.answer.singleFraction && (typed.match(/\/|÷/g) ?? []).length > 1) {
    return wrong("That's equivalent, but the question asks for a single fraction. Use a common denominator.");
  }
  if (q.answer.factorised && !isProduct(given)) {
    return wrong("That's equivalent, but the question asks you to factorise: write it as brackets multiplied together.");
  }
  if (q.answer.expanded && hasUnexpandedBrackets(given)) {
    return wrong("That's equivalent, but the question asks you to expand the brackets.");
  }
  return ok();
}

function checkChoice(q, response) {
  if (response === null || response === undefined || response === "") return invalid("Choose one of the options.");
  const index = Number(response);
  if (index === q.answer.index) return ok();
  return wrong(q.options[index]?.feedback ?? "Not that one. Think again and choose another option.");
}

function checkOrder(q, response) {
  const correct = q.answer.order;
  const right = response.filter((item, i) => item === correct[i]).length;
  if (right === correct.length) return ok();
  return wrong(`${right} of ${correct.length} are in the correct position. Check the ${q.answer.direction ?? "order"} again.`);
}

function checkMatch(q, response) {
  const total = q.pairs.length;
  const answered = q.pairs.filter((_, i) => response?.[i]).length;
  if (answered < total) return invalid("Match every item before checking.");
  const right = q.pairs.filter((p, i) => response[i] === p.right).length;
  if (right === total) return ok();
  return wrong(`${right} of ${total} matches are correct. Look again at the others.`);
}

export function checkAnswer(question, response) {
  switch (question.type) {
    case "numeric": return checkNumeric(question, response);
    case "percentage": return checkPercentage(question, response);
    case "fraction": return checkFraction(question, response);
    case "expression": return checkExpression(question, response);
    case "choice": return checkChoice(question, response);
    case "order": return checkOrder(question, response);
    case "match": return checkMatch(question, response);
    default: return invalid("This question type can't be checked.");
  }
}

/* Multi-step questions are checked one step at a time. The whole question
   is correct only when every step is. */
export function checkResponse(question, response) {
  if (question.type !== "multistep") return checkAnswer(question, response);
  const stepResults = question.steps.map((step, i) => checkAnswer(step, response?.[i]));
  if (stepResults.some((r) => r.status === "invalid")) {
    const i = stepResults.findIndex((r) => r.status === "invalid");
    return { status: "invalid", message: `Step ${i + 1}: ${stepResults[i].message}`, stepResults };
  }
  const wrongSteps = stepResults.map((r, i) => (r.status === "correct" ? null : i)).filter((i) => i !== null);
  if (wrongSteps.length === 0) return { status: "correct", message: "Correct, every step is right.", stepResults };
  return {
    status: "incorrect",
    message: wrongSteps.map((i) => `Step ${i + 1}: ${stepResults[i].message}`).join(" "),
    stepResults,
  };
}

// What an unanswered response looks like for each question type.
export function emptyResponse(question) {
  if (question.type === "order") return [...question.items];
  if (question.type === "match") return question.pairs.map(() => "");
  if (question.type === "multistep") return question.steps.map(() => "");
  return "";
}
