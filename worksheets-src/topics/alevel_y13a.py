"""A level Year 13 Pure, units 1–6: proof and algebraic methods, functions
and graphs, sequences and series, the binomial expansion for any power,
radians, and trigonometric functions.

Partial fractions are built backwards: the answer (A/(x − p) + ...) is chosen
first and the question's numerator is worked out from it, so every
decomposition is exactly right. Series sums use exact fractions."""
from fractions import Fraction as F
import math
from engine.draw import axes
from engine.calc import Poly, X, fr, dec, sf, MINUS, signed, deg_solutions, sind, cosd, tand
from topics.alevel_common import LEVEL, TOPIC, P, m, Surd, sqrt_text, quad_roots, quad_roots_float, pt, set_or


def lf(p, var="x"):
    """The linear factor (x − p)."""
    return f"({var} {signed(-p)})" if p else var


def lin(a, b):
    return Poly({1: a, 0: b}).text()


def pf_term(A, factor, power=1):
    """A/(factor) or A/(factor)^2 as markup, with the sign pulled out front."""
    sign = MINUS if A < 0 else "+"
    den = factor + (f"^{power}" if power > 1 else "")
    return sign, f"[[{fr(abs(A))}//{den}]]"


def join_terms(terms):
    out = ""
    for sign, t in terms:
        out += (MINUS if sign == MINUS else "") + t if not out else f" {sign} {t}"
    return out


def pi_text(frac_of_pi):
    """k·π as markup: π, [[π//6]], [[5π//6]], 2π, −[[π//3]]."""
    f = F(frac_of_pi)
    if f == 0:
        return "0"
    sign = MINUS if f < 0 else ""
    f = abs(f)
    num = ("" if f.numerator == 1 else str(f.numerator)) + "π"
    return sign + (num if f.denominator == 1 else f"[[{num}//{f.denominator}]]")


def rad_text(x):
    """A radian answer: an exact multiple of π if it is one (denominator ≤ 12), else 3 s.f."""
    f = F(x / math.pi).limit_denominator(12)
    if abs(float(f) * math.pi - x) < 1e-9:
        return pi_text(f)
    return sf(x)


# ==========================================================================
# Unit 1: Proof and algebraic methods
# ==========================================================================
def proof_contradiction(ws):
    ws.section("Practice")
    P(ws, "Prove each statement by contradiction.", [
        ("√2 is irrational.", "Assume √2 = [[a//b]] in lowest terms; a^2 = 2b^2 so a is even, a = 2k; then b^2 = 2k^2 so b is even: contradiction"),
        ("There are infinitely many prime numbers.", "Assume finitely many, p_{1}…p_{n}; N = p_{1}p_{2}…p_{n} + 1 leaves remainder 1 on division by each, so has a prime factor not in the list"),
        ("If n^2 is even, then n is even.", "Assume n odd, n = 2k + 1: n^2 = 2(2k^2 + 2k) + 1 is odd: contradiction"),
        ("There is no greatest even number.", "Assume G is the greatest; G + 2 is even and greater: contradiction"),
        ("There are no integers a and b with 21a + 14b = 1.", "21a + 14b = 7(3a + 2b) is a multiple of 7, but 1 is not"),
        ("√3 is irrational.", "As for √2: a^2 = 3b^2 means 3 divides a, then 3 divides b")], cols=1, work=40)
    ws.section("Problem solving")
    ws.question("Prove by contradiction that if a^2 is not a multiple of 3, then a is not a multiple of 3.", "Assume a = 3k: a^2 = 9k^2 = 3(3k^2), a multiple of 3: contradiction", space=55)


def alg_fractions_y13(ws):
    ws.section("Practice")
    cases = [((3, -1), (2, 2)), ((5, 2), (-1, -3)), ((1, 4), (2, -1)), ((4, 0), (-3, 1))]
    # A/(x − p) + B/(x − q) = (A(x − q) + B(x − p))/((x − p)(x − q))
    out = []
    for (A, p), (B, q) in cases:
        num = Poly({1: A, 0: -A * q}) + Poly({1: B, 0: -B * p})
        s1, t1 = pf_term(A, lf(p))
        s2, t2 = pf_term(B, lf(q))
        out.append((join_terms([(s1, t1), (s2, t2)]), f"[[{num.text()}//{lf(p)}{lf(q)}]]"))
    P(ws, "Write as a single fraction.", out)
    P(ws, "Simplify.", [("[[x^2 − 4//x + 3]] × [[2x + 6//x − 2]]", "2(x + 2)"), ("[[x^2 + 5x//x^2 − 25]] ÷ [[3x//x − 5]]", "[[1//3]]"),
                        ("[[2//x^2 − 1]] − [[1//x + 1]]", "[[3 − x//(x − 1)(x + 1)]]"), ("[[x//x − 3]] − [[18//x^2 − 9]]", "[[x + 6//x + 3]]")])
    ws.section("Problem solving")
    ws.question("Solve [[3//x − 1]] − [[2//x + 2]] = 1.", f"3(x + 2) − 2(x − 1) = (x − 1)(x + 2): x + 8 = x^2 + x − 2, x = ±√10", space=55)


def partial_fractions(ws):
    ws.section("Practice")
    cases = [((3, 1), (2, -2)), ((5, -1), (-2, 3)), ((1, 0), (4, 5)), ((2, 2), (-3, -4))]
    out = []
    for (A, p), (B, q) in cases:
        num = Poly({1: A, 0: -A * q}) + Poly({1: B, 0: -B * p})
        out.append((f"[[{num.text()}//{lf(p)}{lf(q)}]]", join_terms([pf_term(A, lf(p)), pf_term(B, lf(q))])))
    P(ws, "Split into partial fractions.", out, work=40)
    # three factors
    A, B, C, p, q, r = 2, -1, 3, 0, 1, -2
    num = Poly({2: 0})
    for k, others in ((A, (q, r)), (B, (p, r)), (C, (p, q))):
        num = num + k * Poly({1: 1, 0: -others[0]}) * Poly({1: 1, 0: -others[1]})
    ws.question(f"Express [[{num.text()}//x(x − 1)(x + 2)]] in partial fractions.", join_terms([pf_term(A, "x"), pf_term(B, lf(q)), pf_term(C, lf(r))]), space=60)
    ws.section("Problem solving")
    ws.question("Use partial fractions to show that [[1//r(r + 1)]] = [[1//r]] − [[1//r + 1]], and hence find [[1//1 × 2]] + [[1//2 × 3]] + … + [[1//99 × 100]].",
                "The terms cancel in pairs (a telescoping sum): 1 − [[1//100]] = [[99//100]]", space=60)


def repeated_factors(ws):
    ws.section("Practice")
    cases = [(2, 3, -1, 1, -2), (1, -2, 4, 0, 3), (-3, 5, 2, 2, -1)]
    # A/(x − p) + B/(x − p)^2 + C/(x − q)
    out = []
    for A, B, C, p, q in cases:
        num = A * Poly({1: 1, 0: -p}) * Poly({1: 1, 0: -q}) + B * Poly({1: 1, 0: -q}) + C * Poly({1: 1, 0: -p}) ** 2
        den = f"{lf(p)}^2{lf(q)}" if p else f"x^2{lf(q)}"
        out.append((f"[[{num.text()}//{den}]]", join_terms([pf_term(A, lf(p)), pf_term(B, lf(p), 2), pf_term(C, lf(q))])))
    P(ws, "Split into partial fractions.", out, cols=1, work=45)
    ws.section("Problem solving")
    ws.question("Explain why [[5x + 3//(x + 1)^2(x − 2)]] needs three partial fractions, not two.", "The repeated factor needs both [[A//x + 1]] and [[B//(x + 1)^2]]", space=45)


def improper_division(ws):
    ws.section("Practice")
    # N = Q·D + R, with the answer Q + R/D (R split into partial fractions where D factorises)
    cases = [(Poly({1: 1, 0: 2}), Poly({1: 1, 0: -1}), 5), (Poly({2: 2, 1: -1}), Poly({1: 1, 0: 3}), -4), (Poly({1: 3, 0: 0}), Poly({1: 1, 0: 2}), 7)]
    out = []
    for Q, D, R in cases:
        N = Q * D + R
        out.append((f"[[{N.text()}//{D.text()}]]", f"{Q.text()} {signed(R)[0]} [[{abs(R)}//{D.text()}]]"))
    P(ws, "Write in the form Q(x) + [[R//D(x)]], where R is a constant.", out, cols=1, work=40)
    # x^2 / ((x − 1)(x + 2)) = 1 + A/(x − 1) + B/(x + 2): x^2 = (x − 1)(x + 2) + A(x + 2) + B(x − 1)
    A, B = F(1, 3), F(-4, 3)
    ws.question("Express [[x^2//(x − 1)(x + 2)]] in the form P + [[A//x − 1]] + [[B//x + 2]].", f"P = 1, A = {fr(A)}, B = {fr(B)}", space=60)
    ws.section("Problem solving")
    ws.question("Explain why you must divide before using partial fractions when the numerator's degree is not less than the denominator's.",
                "Partial fractions only work for proper fractions; dividing first gives a polynomial plus a proper fraction", space=45)


# ==========================================================================
# Unit 2: Functions and graphs
# ==========================================================================
def solve_mod_eq(a, b, c, d):
    """Solutions of |ax + b| = cx + d (checked)."""
    sols = set()
    for s in (1, -1):
        # s(ax + b) = cx + d -> (sa − c)x = d − sb
        if s * a - c != 0:
            x = F(d - s * b, s * a - c)
            if abs(a * x + b) == c * x + d:
                sols.add(x)
    return sorted(sols)


def modulus_function(ws):
    ws.section("Practice")
    cases = [(2, -1, 0, 5), (1, 3, 0, 7), (3, -6, 1, 2), (1, 1, 2, -4)]
    out = []
    for a, b, c, d in cases:
        rhs = Poly({1: c, 0: d}).text() if c else fr(d)
        sols = solve_mod_eq(a, b, c, d)
        out.append((f"|{lin(a, b)}| = {rhs}", " or ".join(f"x = {fr(s)}" for s in sols) or "no solutions"))
    P(ws, "Solve.", out)
    P(ws, "Sketch each graph, giving the coordinates of its vertex and y-intercept.", [
        ("y = |2x − 4|", "vertex (2, 0); y-intercept (0, 4)"), ("y = |x + 1| − 3", "vertex (−1, −3); y-intercept (0, −2)"),
        ("y = 5 − |x − 2|", "vertex (2, 5) (a maximum); y-intercept (0, 3)")], cols=1, work=30)
    ws.section("Problem solving")
    ws.question("Explain why |x + 1| = 2x − 4 has only one solution.", "x + 1 = 2x − 4 gives x = 5 (valid); −(x + 1) = 2x − 4 gives x = 1, but then 2x − 4 < 0, so reject", space=50)


def functions_mappings(ws):
    ws.section("Practice")
    P(ws, "State the range of each function.", [("f(x) = x^2 + 3, x ∈ ℝ", "f(x) ≥ 3"), ("f(x) = 2x − 1, x ≥ 2", "f(x) ≥ 3"),
                                                 ("f(x) = e^{x} + 1, x ∈ ℝ", "f(x) > 1"), ("f(x) = (x − 2)^2 − 5, x ∈ ℝ", "f(x) ≥ −5"),
                                                 ("f(x) = [[1//x]], x > 0", "f(x) > 0"), ("f(x) = √(x − 4), x ≥ 4", "f(x) ≥ 0")])
    P(ws, "Is each mapping one-to-one or many-to-one? Is it a function?", [("y = x^3", "one-to-one; a function"), ("y = x^2, x ∈ ℝ", "many-to-one; a function"),
                                                                           ("y = ±√x", "one-to-many; not a function"), ("y = sin x", "many-to-one; a function")])
    ws.section("Problem solving")
    ws.question("f(x) = x^2 − 6x + 10. Find the largest domain of the form x ≥ k for which f is one-to-one, and state the range.", "(x − 3)^2 + 1: x ≥ 3; range f(x) ≥ 1", space=50)


def composite(ws):
    ws.section("Practice")
    f = Poly({1: 2, 0: 3})
    g = Poly({2: 1})
    h = Poly({1: -1, 0: 5})
    fg = Poly({2: 2, 0: 3})
    gf = f * f
    P(ws, f"f(x) = {f.text()}, g(x) = {g.text()} and h(x) = {h.text()}. Find", [("fg(2)", fr(fg(2))), ("gf(2)", fr(gf(2))), ("fh(−1)", fr(f(h(-1)))),
                                                                              ("fg(x)", fg.text()), ("gf(x)", gf.text()), ("hf(x)", (-f + 5).text()),
                                                                              ("ff(x)", (2 * f + 3).text()), ("hh(x)", "x")], cols=4)
    ws.section("Problem solving")
    ws.question("Using the functions above, solve fg(x) = gf(x).", f"2x^2 + 3 = 4x^2 + 12x + 9, so x^2 + 6x + 3 = 0: {quad_roots(1, 6, 3)}", space=55)
    ws.question("p(x) = e^{x} and q(x) = 3x − 1. Solve pq(x) = 10, giving an exact answer.", "e^{3x − 1} = 10, x = [[1 + ln 10//3]]", space=45)


def inverse(ws):
    ws.section("Practice")
    P(ws, "Find f^{−1}(x) and state its domain.", [("f(x) = [[3x − 1//2]], x ∈ ℝ", "[[2x + 1//3]], x ∈ ℝ"), ("f(x) = x^2 + 4, x ≥ 0", "√(x − 4), x ≥ 4"),
                                                   ("f(x) = e^{2x} − 1, x ∈ ℝ", "[[1//2]] ln(x + 1), x > −1"), ("f(x) = [[1//x − 2]], x > 2", "[[1//x]] + 2, x > 0"),
                                                   ("f(x) = ln(x + 3), x > −3", "e^{x} − 3, x ∈ ℝ"), ("f(x) = (x − 1)^2 + 2, x ≥ 1", "1 + √(x − 2), x ≥ 2")], cols=1, work=20)
    ws.section("Problem solving")
    ws.question("Show that f(x) = [[x + 2//x − 1]], x ≠ 1, is its own inverse.", "y(x − 1) = x + 2 gives x = [[y + 2//y − 1]], so f^{−1}(x) = f(x)", space=55)
    ws.question("Explain how the graphs of y = f(x) and y = f^{−1}(x) are related.", "Each is the reflection of the other in the line y = x", space=40)


def modulus_graphs(ws):
    ws.section("Practice")
    ws.question("f(x) = x^2 − 4x.\n(a) Sketch y = |f(x)|, giving where it meets the axes and its local maximum.\n(b) Sketch y = f(|x|), giving where it meets the axes and its minimum points.",
                "(a) meets the axes at (0, 0) and (4, 0); the part between is reflected up, local maximum (2, 4)  "
                "(b) symmetrical in the y-axis: meets at (−4, 0), (0, 0), (4, 0); minima (±2, −4)", space=120)
    ws.question("y = f(x) is a straight line through (0, −3) and (2, 1).\n(a) Sketch y = |f(x)|.\n(b) Sketch y = f(|x|).",
                "f(x) = 2x − 3. (a) V shape, vertex ([[3//2]], 0), y-intercept 3  (b) symmetrical V, vertex (0, −3), meets x-axis at ±[[3//2]]", space=100)
    ws.section("Problem solving")
    ws.question("How many solutions does |x^2 − 4x| = 3 have? Use a sketch.", "4 (the line y = 3 is below the local maximum 4, so it meets the graph four times)", space=55)


def combining_transformations(ws):
    ws.section("Practice")
    p = (3, 4)
    T = [("y = 2f(x − 1) + 3", (4, 11)), ("y = f(2x) − 5", (F(3, 2), -1)), ("y = −f(x + 2)", (1, -4)), ("y = [[1//2]]f(−x) + 1", (-3, 3)),
         ("y = 3f([[x//2]])", (6, 12))]
    P(ws, f"The point {pt(p)} lies on y = f(x). Find its image on each graph.", [(q, pt(a)) for q, a in T], cols=3)
    ws.section("Problem solving")
    ws.question("y = f(x) has a minimum at (2, −1) and an asymptote y = 4. Write down the minimum and asymptote of y = 3f(x + 1) − 2.",
                "minimum (1, −5); asymptote y = 10", space=45)
    ws.question("Describe a sequence of transformations that maps y = x^2 onto y = 2(x − 3)^2 + 1.", "translate by {{3;0}}, stretch parallel to the y-axis scale factor 2, then translate by {{0;1}}", space=50)


def modulus_problems(ws):
    ws.section("Practice")
    P(ws, "Solve.", [("|x − 2| < 3", "−1 < x < 5"), ("|2x + 1| ≥ 5", "x ≤ −3 or x ≥ 2"), ("|3 − x| ≤ 4", "−1 ≤ x ≤ 7"), ("|4x − 2| > 6", "x < −1 or x > 2")])
    # |ax + b| = |cx + d|: square both sides
    cases = [(1, -1, 2, 3), (1, 2, 3, -6), (2, -5, 1, 1)]
    out = []
    for a, b, c, d in cases:
        sols = set()
        for s in (1, -1):
            if a - s * c != 0:
                sols.add(F(s * d - b, a - s * c))
        sols = sorted(x for x in sols if abs(a * x + b) == abs(c * x + d))
        out.append((f"|{lin(a, b)}| = |{lin(c, d)}|", " or ".join(f"x = {fr(s)}" for s in sols)))
    P(ws, "Solve.", out, cols=1)
    ws.section("Problem solving")
    ws.question("Solve |x^2 − 9| = 7.", "x^2 = 16 or x^2 = 2: x = ±4 or x = ±√2", space=45)


# ==========================================================================
# Unit 3: Sequences and series
# ==========================================================================
def arithmetic_sequences(ws):
    ws.section("Practice")
    seqs = [(5, 3), (40, -4), (F(1, 2), F(3, 2)), (-7, 6)]
    P(ws, "For each arithmetic sequence, find the nth term and the 25th term.",
      [(", ".join(fr(a + k * d) for k in range(4)) + ", …", f"{Poly({1: d, 0: F(a) - d}).text().replace('x', 'n')}; {fr(a + 24 * d)}") for a, d in seqs])
    ws.section("Problem solving")
    ws.question("The 4th term of an arithmetic sequence is 17 and the 10th term is 47. Find the first term and the common difference.", "6d = 30, d = 5, a = 2", space=45)
    ws.question("Which term of 7, 11, 15, … is the first to exceed 500?", "4n + 3 > 500, n > 124.25: the 125th term", space=40)


def arithmetic_series(ws):
    ws.section("Practice")
    cs = [(3, 4, 20), (100, -7, 15), (F(1, 2), F(1, 2), 40), (-10, 3, 30)]
    P(ws, "Find the sum of the first n terms.", [(f"{', '.join(fr(a + k * d) for k in range(3))}, …  with n = {n}", fr(F(n, 2) * (2 * a + (n - 1) * d))) for a, d, n in cs])
    P(ws, "Find", [("the sum of the integers from 1 to 200", str(200 * 201 // 2)), ("the sum of the odd numbers from 1 to 99", "2500"),
                   ("the sum of the multiples of 3 between 100 and 200", str(sum(range(102, 200, 3))))], cols=1)
    ws.section("Problem solving")
    ws.question("Prove that the sum of the first n terms of an arithmetic series is [[n//2]](2a + (n − 1)d).", "Write S forwards and backwards, add: 2S = n(2a + (n − 1)d)", space=55)
    ws.question("The sum of the first n terms of 2 + 5 + 8 + … is 155. Find n.", "[[n//2]](3n + 1) = 155, 3n^2 + n − 310 = 0, n = 10", space=45)


def geometric_sequences(ws):
    ws.section("Practice")
    seqs = [(3, 2), (64, F(1, 2)), (5, -3), (F(2, 3), 3)]
    P(ws, "Find the common ratio and the 8th term.", [(", ".join(fr(a * r ** k) for k in range(4)) + ", …", f"r = {fr(r)}; {fr(a * r ** 7)}") for a, r in seqs])
    ws.section("Problem solving")
    ws.question("The 2nd term of a geometric sequence is 12 and the 5th term is 324. Find the first term and the common ratio.", "r^3 = 27, r = 3, a = 4", space=45)
    ws.question("Find the first term of 2, 6, 18, … that is greater than 1 million.", f"2 × 3^{{n − 1}} > 10^6: n = {next(n for n in range(1, 30) if 2 * 3 ** (n - 1) > 10 ** 6)}, term {2 * 3 ** (next(n for n in range(1, 30) if 2 * 3 ** (n - 1) > 10 ** 6) - 1)}", space=50)


def geometric_series(ws):
    ws.section("Practice")
    cs = [(3, 2, 10), (80, F(1, 2), 6), (1, -2, 9), (5, 3, 8)]
    S = lambda a, r, n: F(a) * (1 - F(r) ** n) / (1 - F(r))
    P(ws, "Find the sum of the first n terms.", [(f"{', '.join(fr(a * F(r) ** k) for k in range(3))}, …  with n = {n}", fr(S(a, r, n))) for a, r, n in cs])
    ws.section("Problem solving")
    ws.question("Prove that the sum of the first n terms of a geometric series is [[a(1 − r^n)//1 − r]].", "S − rS = a − ar^n", space=55)
    n = next(n for n in range(1, 100) if S(1, 2, n) > 1000)
    ws.question("How many terms of 1 + 2 + 4 + … are needed for the sum to exceed 1000?", f"2^n − 1 > 1000: n = {n}", space=40)


def sum_to_infinity(ws):
    ws.section("Practice")
    cs = [(12, F(1, 3)), (50, F(-1, 4)), (9, F(2, 3)), (F(1, 2), F(1, 2))]
    P(ws, "Find the sum to infinity.", [(f"{', '.join(fr(a * r ** k) for k in range(3))}, …", fr(F(a) / (1 - r))) for a, r in cs])
    ws.section("Problem solving")
    ws.question("A geometric series has first term 8 and sum to infinity 20. Find the common ratio.", "[[8//1 − r]] = 20, r = [[3//5]]", space=40)
    ws.question("For which values of x does 1 + 2x + 4x^2 + … have a sum to infinity? Find the sum.", "|2x| < 1, so −[[1//2]] < x < [[1//2]]; sum [[1//1 − 2x]]", space=45)
    ws.question("Write 0.{.4}{.5} (0.454545…) as a fraction using a geometric series.", "[[45//100]] ÷ (1 − [[1//100]]) = [[45//99]] = [[5//11]]", space=45)


def sigma(ws):
    ws.section("Practice")
    cs = [("Σ_{r=1}^{20} (2r + 1)", sum(2 * r + 1 for r in range(1, 21))), ("Σ_{r=1}^{10} 3 × 2^{r}", sum(3 * 2 ** r for r in range(1, 11))),
          ("Σ_{r=5}^{15} (4r − 3)", sum(4 * r - 3 for r in range(5, 16))), ("Σ_{r=0}^{6} 2^{r}", sum(2 ** r for r in range(7))),
          ("Σ_{r=1}^{50} r", 50 * 51 // 2), ("Σ_{r=1}^{8} 5", 40)]
    P(ws, "Evaluate.", [(q, str(v)) for q, v in cs], cols=3)
    P(ws, "Write in sigma notation.", [("2 + 4 + 6 + … + 100", "Σ_{r=1}^{50} 2r"), ("3 + 9 + 27 + … + 3^{8}", "Σ_{r=1}^{8} 3^{r}"), ("1 + 4 + 7 + … + 58", "Σ_{r=1}^{20} (3r − 2)")], cols=1)
    ws.section("Problem solving")
    ws.question("Find Σ_{r=1}^{∞} 6(0.4)^{r}.", f"First term 2.4, r = 0.4: [[2.4//0.6]] = 4", space=40)


def recurrence(ws):
    ws.section("Practice")
    def terms(f, u1, n=5):
        out = [F(u1)]
        for _ in range(n - 1):
            out.append(f(out[-1]))
        return out
    cs = [("u_{n+1} = 2u_{n} + 3, u_{1} = 1", lambda u: 2 * u + 3, 1), ("u_{n+1} = [[1//u_{n}]], u_{1} = 4", lambda u: 1 / u, 4),
          ("u_{n+1} = 5 − u_{n}, u_{1} = 2", lambda u: 5 - u, 2), ("u_{n+1} = [[u_{n}//2]] + 6, u_{1} = 20", lambda u: u / 2 + 6, 20)]
    P(ws, "Write down the first five terms.", [(q, ", ".join(fr(t) for t in terms(f, u))) for q, f, u in cs], cols=1)
    P(ws, "Is each sequence increasing, decreasing or periodic?", [("Question 1(a)", "increasing"), ("Question 1(b)", "periodic (order 2)"),
                                                                   ("Question 1(c)", "periodic (order 2)"), ("Question 1(d)", "decreasing")], cols=4, work=0)
    ws.section("Problem solving")
    ws.question("u_{n+1} = ku_{n} − 2 and u_{1} = 3. Given u_{3} = 6, find the possible values of k.", "u_{2} = 3k − 2, u_{3} = 3k^2 − 2k − 2 = 6, so (3k + 4)(k − 2) = 0: k = 2 or k = −[[4//3]]", space=55)


def modelling_series(ws):
    ws.section("Problem solving")
    sal = [28000 * 1.03 ** k for k in range(10)]
    ws.question("A teacher's salary starts at £28 000 and rises by 3% each year.\n(a) Find the salary in the 10th year.\n(b) Find the total earned over 10 years.",
                f"(a) 28 000 × 1.03^9 = £{sal[-1]:,.0f}  (b) [[28 000(1.03^{{10}} − 1)//0.03]] = £{sum(sal):,.0f}", space=80)
    n = next(n for n in range(1, 100) if n / 2 * (2 * 50 + (n - 1) * 10) >= 5000)
    ws.question("Sam saves £50 in month 1, £60 in month 2, £70 in month 3, and so on. In which month does the total first reach £5000?",
                f"[[n//2]](100 + 10(n − 1)) ≥ 5000: month {n}", space=60)
    ws.question("A ball is dropped from 5 m. Each bounce reaches [[3//5]] of the previous height. Find the total distance travelled before it comes to rest.",
                "5 + 2 × [[3//1 − 0.6]] = 5 + 15 = 20 m", space=60)


# ==========================================================================
# Unit 4: Binomial expansion for any power
# ==========================================================================
def gen_coef(n, k):
    c = F(1)
    for i in range(k):
        c *= (F(n) - i)
    return c / math.factorial(k)


def series_text(coefs):
    return Poly({k: c for k, c in enumerate(coefs)}).text(order="asc")


def binom_1x(ws):
    ws.section("Practice")
    cs = [(F(-1), 1), (F(1, 2), 1), (F(-2), 1), (F(1, 3), 1), (F(-1, 2), -2), (F(3, 2), 4)]
    out = []
    for n, b in cs:
        coefs = [gen_coef(n, k) * F(b) ** k for k in range(4)]
        valid = "|x| < 1" if abs(b) == 1 else f"|x| < {fr(F(1, abs(b)))}"
        out.append((f"{bracket(1, b)}^{{{power_label(n)}}}", f"{series_text(coefs)}; valid for {valid}"))
    P(ws, "Find the first four terms in ascending powers of x, and state the values of x for which the expansion is valid.", out, cols=1, work=25)
    ws.section("Problem solving")
    c = [gen_coef(F(1, 2), k) * F(-1, 100) ** k for k in range(3)]   # √(0.99)
    ws.question("Use the expansion of √(1 − x) with a suitable x to find √0.99 to 6 d.p.", f"x = 0.01: 1 − 0.005 − 0.0000125 = {float(sum(c)):.6f}", space=50)


def rational_power(a, n):
    """a^n exactly, for a whole number a and a fraction n where the root is whole."""
    n = F(n)
    r = round(a ** (1 / n.denominator))
    assert r ** n.denominator == a, (a, n)
    return F(r) ** n.numerator


def power_label(n):
    """−1/2 style text for an index."""
    return fr(n).replace("[[", "").replace("]]", "").replace("//", "/")


def bracket(a, b):
    """(a + bx) as text, e.g. (8 − x), (2 + 3x)."""
    return f"({a} {'+' if b > 0 else MINUS} {'' if abs(b) == 1 else abs(b)}x)"


def binom_abx(ws):
    ws.section("Practice")
    cs = [(4, 1, F(1, 2)), (2, 3, F(-1)), (8, -1, F(1, 3)), (3, 2, F(-2))]
    out = []
    for a, b, n in cs:
        lead = rational_power(a, n)
        coefs = [lead * gen_coef(n, k) * F(b, a) ** k for k in range(3)]
        out.append((f"{bracket(a, b)}^{{{power_label(n)}}}", f"{series_text(coefs)}; valid for |x| < {fr(abs(F(a, b)))}"))
    P(ws, "Find the first three terms in ascending powers of x, and state the range of validity.", out, cols=1, work=30)
    ws.section("Problem solving")
    ws.question("Explain why (4 + x)^{1/2} is written as 2(1 + [[x//4]])^{1/2} before expanding.", "The expansion formula needs the form (1 + …)^n; 4^{1/2} = 2 comes outside", space=45)


def binom_partial(ws):
    ws.section("Practice")
    # A/(1 + x) + B/(1 − 2x) with A = 2, B = 3: numerator A(1 − 2x) + B(1 + x) = 5 − x
    A, B = 2, 3
    num = Poly({0: A + B, 1: -2 * A + B})
    coefs = [A * (-1) ** k + B * 2 ** k for k in range(4)]
    ws.question(f"(a) Express [[{num.text()}//(1 + x)(1 − 2x)]] in partial fractions.\n(b) Hence find the first four terms of its expansion in ascending powers of x.\n(c) State the range of validity.",
                f"(a) [[{A}//1 + x]] + [[{B}//1 − 2x]]  (b) {series_text(coefs)}  (c) |x| < [[1//2]]", space=110)
    A2, B2 = 1, -2       # 1/(1 − x) − 2/(2 + x) = 1/(1 − x) − (1 + x/2)^{−1}
    num2 = Poly({0: A2 * 2 + B2, 1: A2 + (-B2)})          # A(2 + x) + B(1 − x)
    # 1/(1 − x) = Σ x^k and 2/(2 + x) = (1 + x/2)^{−1} = Σ (−1/2)^k x^k
    coefs2 = [F(1) - F(-1, 2) ** k for k in range(3)]
    ws.question(f"(a) Express [[{num2.text()}//(1 − x)(2 + x)]] in partial fractions.\n(b) Hence find the first three terms of its expansion.",
                f"(a) [[1//1 − x]] − [[2//2 + x]]  (b) {series_text(coefs2)}", space=100)
    ws.section("Problem solving")
    ws.question("Why is the expansion in Question 1 valid only for |x| < [[1//2]], not |x| < 1?", "Both parts must be valid: |x| < 1 and |2x| < 1; the stricter is |x| < [[1//2]]", space=45)


# ==========================================================================
# Unit 5: Radians
# ==========================================================================
def radian_measure(ws):
    ws.section("Practice")
    degs = [180, 90, 60, 45, 30, 120, 270, 135, 330, 15]
    P(ws, "Convert to radians, as exact multiples of π.", [(f"{d}°", pi_text(F(d, 180))) for d in degs], cols=5)
    rads = [F(1, 4), F(2, 3), F(5, 6), F(3, 2), F(7, 4)]
    P(ws, "Convert to degrees.", [(pi_text(r), f"{fr(r * 180)}°") for r in rads], cols=5)
    P(ws, "Convert to degrees, to 1 d.p.", [(f"{r} rad", f"{math.degrees(r):.1f}°") for r in (1, 2.5, 0.3)], cols=3)
    ws.section("Problem solving")
    ws.question("Find the exact values of sin [[π//3]], cos [[3π//4]] and tan [[π//6]].", "[[√3//2]], −[[√2//2]], [[√3//3]]", space=40)


def arc_length(ws):
    ws.section("Practice")
    # θ is either an exact multiple of π (a Fraction) or a decimal number of radians
    cs = [(6, F(1, 3)), (10, 1.2), (9, F(5, 6)), (8, 2)]
    out = []
    for r, t in cs:
        if isinstance(t, F):
            out.append((f"r = {r} cm, θ = {pi_text(t)}", f"{pi_text(r * t)} cm ({sf(r * float(t) * math.pi)} cm)"))
        else:
            out.append((f"r = {r} cm, θ = {t}", f"{sf(r * t)} cm"))
    P(ws, "Find the arc length.", out)
    ws.section("Problem solving")
    ws.question("A sector has radius 5 cm and perimeter 18 cm. Find the angle at the centre in radians.", "10 + 5θ = 18, θ = 1.6 rad", space=40)
    ws.question("An arc of length 12 cm subtends 0.75 rad at the centre. Find the radius.", "r = [[12//0.75]] = 16 cm", space=35)


def sectors_segments(ws):
    ws.section("Practice")
    cs = [(6, F(1, 3)), (8, 0.9), (5, F(2, 3)), (12, 1.5)]
    out = []
    for r, t in cs:
        th = float(t) * (math.pi if isinstance(t, F) else 1)
        sector = 0.5 * r * r * th
        seg = 0.5 * r * r * (th - math.sin(th))
        out.append((f"r = {r} cm, θ = {pi_text(t) if isinstance(t, F) else t}", f"sector {sf(sector)} cm^2; segment {sf(seg)} cm^2"))
    P(ws, "Find the area of the sector and of the segment, to 3 s.f.", out)
    ws.section("Problem solving")
    ws.question("A sector of radius r has angle 1.2 rad and area 30 cm^2. Find r and the perimeter of the sector.", "0.6r^2 = 30, r = √50 = 7.07 cm; perimeter 2r + 1.2r = 3.2r = 22.6 cm", space=50)
    ws.question("Show that the area of the segment cut off by a chord subtending θ at the centre is [[1//2]]r^2(θ − sin θ).", "sector [[1//2]]r^2θ minus triangle [[1//2]]r^2 sin θ", space=45)


def trig_eq_radians(ws):
    ws.section("Practice")
    def solve(f, v, hi=2 * math.pi):
        sols = []
        x, prev, step = 0.0, f(0.0) - v, 1e-4
        if abs(prev) < 1e-12:
            sols.append(0.0)
        while x < hi:
            x2 = min(x + step, hi)
            cur = f(x2) - v
            if prev * cur < 0 and abs(cur - prev) < 1:
                a, b = x, x2
                for _ in range(60):
                    m = (a + b) / 2
                    if (f(a) - v) * (f(m) - v) <= 0:
                        b = m
                    else:
                        a = m
                sols.append((a + b) / 2)
            elif abs(cur) < 1e-12:
                sols.append(x2)
            prev, x = cur, x2
        return sols
    cs = [("sin x = [[1//2]]", math.sin, 0.5), ("cos x = −[[√2//2]]", math.cos, -math.sqrt(2) / 2), ("tan x = √3", math.tan, math.sqrt(3)),
          ("sin 2x = 0.6", lambda x: math.sin(2 * x), 0.6), ("cos(x − [[π//4]]) = 0.3", lambda x: math.cos(x - math.pi / 4), 0.3), ("tan x = −1", math.tan, -1)]
    P(ws, "Solve for 0 ≤ x ≤ 2π. Give exact answers where possible, otherwise 3 s.f.", [(q, ", ".join(rad_text(s) for s in solve(f, v))) for q, f, v in cs])
    ws.section("Problem solving")
    # sin x = −1 (x = 3π/2) only touches zero, so the scan can't see it; it is added below
    sols = solve(lambda x: 2 * math.sin(x) ** 2 + math.sin(x) - 1, 0)
    ws.question("Solve 2 sin^2 x + sin x − 1 = 0 for 0 ≤ x ≤ 2π.", "sin x = [[1//2]] or −1: " + ", ".join(rad_text(s) for s in sorted(sols + [3 * math.pi / 2])), space=50)


def small_angles(ws):
    ws.section("Practice")
    P(ws, "For small θ, find an approximation for each expression in the form a + bθ + cθ^2.", [
        ("cos 2θ", "1 − 2θ^2"), ("sin 3θ + cos θ", "1 + 3θ − [[1//2]]θ^2"), ("tan θ − cos θ", "−1 + θ + [[1//2]]θ^2"), ("2 cos θ − sin θ", "2 − θ − θ^2")], cols=2)
    P(ws, "Use small angle approximations to find the value of each expression when θ is small.", [
        ("[[sin 4θ//θ]]", "4"), ("[[1 − cos 2θ//θ sin θ]]", "2"), ("[[tan 2θ + sin θ//3θ]]", "1"), ("[[θ tan θ//1 − cos θ]]", "2")], cols=2)
    ws.section("Problem solving")
    ws.question(f"Use the approximation cos θ ≈ 1 − [[θ^2//2]] to estimate cos 0.1, and find the percentage error.",
                f"0.995; actual {math.cos(0.1):.6f}; error {abs(0.995 - math.cos(0.1)) / math.cos(0.1) * 100:.5f}%", space=45)


# ==========================================================================
# Unit 6: Trigonometric functions
# ==========================================================================
def sec_cosec_cot(ws):
    ws.section("Practice")
    P(ws, "Find the exact value.", [("sec 60°", "2"), ("cosec 45°", "√2"), ("cot 30°", "√3"), ("sec 135°", "−√2"), ("cosec 210°", "−2"), ("cot 300°", "−[[√3//3]]")], cols=3)
    for q, a, v in [("sec 60°", "2", 1 / cosd(60)), ("cosec 45°", "√2", 1 / sind(45)), ("cot 30°", "√3", 1 / tand(30)), ("sec 135°", "−√2", 1 / cosd(135)),
                    ("cosec 210°", "−2", 1 / sind(210)), ("cot 300°", "−√3/3", 1 / tand(300))]:
        exp = {"2": 2, "√2": math.sqrt(2), "√3": math.sqrt(3), "−√2": -math.sqrt(2), "−2": -2, "−√3/3": -math.sqrt(3) / 3}[a]
        assert abs(v - exp) < 1e-9, q
    P(ws, "Use a calculator to find, to 3 s.f.", [("sec 50°", sf(1 / cosd(50))), ("cosec 200°", sf(1 / sind(200))), ("cot 1.2 (radians)", sf(1 / math.tan(1.2)))], cols=3)
    ws.section("Problem solving")
    ws.question("Simplify [[sec θ//cosec θ]].", "[[sin θ//cos θ]] = tan θ", space=35)


def sec_graphs(ws):
    ws.section("Practice")
    P(ws, "For each graph on 0° ≤ x ≤ 360°, write down the equations of the asymptotes and the range.", [
        ("y = sec x", "x = 90°, 270°; y ≤ −1 or y ≥ 1"), ("y = cosec x", "x = 0°, 180°, 360°; y ≤ −1 or y ≥ 1"),
        ("y = cot x", "x = 0°, 180°, 360°; all real values"), ("y = 2 sec x", "x = 90°, 270°; y ≤ −2 or y ≥ 2")], cols=1, work=12)
    ws.question("Sketch y = sec x for 0° ≤ x ≤ 360° and mark its turning points.", "Minimum (0°, 1) and (360°, 1); maximum (180°, −1); asymptotes x = 90°, 270°", space=120)
    ws.section("Problem solving")
    ws.question("Explain why y = sec x never takes values between −1 and 1.", "sec x = [[1//cos x]] and −1 ≤ cos x ≤ 1, so |sec x| ≥ 1", space=40)


def using_sec(ws):
    ws.section("Practice")
    def sol(f, v):
        return angles_text([s for s in deg_solutions(f, v, 0, 360) if abs(f(s)) < 1e6])
    cs = [("sec x = 2", lambda x: cosd(x), 0.5), ("cosec x = −2", lambda x: sind(x), -0.5), ("cot x = 0.5", lambda x: tand(x), 2),
          ("sec x = −3", lambda x: cosd(x), -1 / 3), ("cosec 2x = 4", lambda x: sind(2 * x), 0.25), ("3 cot x = 4", lambda x: tand(x), 0.75)]
    P(ws, "Solve for 0° ≤ x ≤ 360°, to 1 d.p. where needed.", [(q, sol(f, v)) for q, f, v in cs])
    ws.section("Problem solving")
    ws.question("Solve sec^2 x = 4 for 0° ≤ x ≤ 360°.", "cos x = ±[[1//2]]: 60°, 120°, 240°, 300°", space=40)


def angles_text(sols, dp=1):
    out = []
    for s in sols:
        r = round(s)
        out.append(f"{r}°" if abs(s - r) < 1e-6 else f"{s:.{dp}f}°")
    return ", ".join(out) if out else "no solutions"


def reciprocal_identities(ws):
    ws.section("Practice")
    P(ws, "Prove each identity.", [("1 + tan^2 θ ≡ sec^2 θ", "Divide sin^2 θ + cos^2 θ ≡ 1 by cos^2 θ"), ("1 + cot^2 θ ≡ cosec^2 θ", "Divide by sin^2 θ"),
                                    ("(sec θ − tan θ)(sec θ + tan θ) ≡ 1", "sec^2 θ − tan^2 θ = 1"), ("[[cosec θ//cot θ + tan θ]] ≡ cos θ", "Write in sin and cos: [[1//sin θ]] × sin θ cos θ")], cols=1, work=30)
    f = lambda x: 2 * tand(x) ** 2 + 1 / cosd(x) - 1
    sols = []
    for s in deg_solutions(f, 0, 0, 360, step=0.01):
        if abs(f(s)) < 1e-6:
            sols.append(s)
    for k in (0, 360):
        if abs(f(k)) < 1e-9 and all(abs(k - s) > 1e-4 for s in sols):
            sols.append(k)
    ws.question("Solve 2 tan^2 x + sec x = 1 for 0° ≤ x ≤ 360°.", "2 sec^2 x + sec x − 3 = 0, sec x = 1 or −[[3//2]]: " + angles_text(sorted(sols)), space=60)
    ws.section("Problem solving")
    ws.question("Given tan θ = [[3//4]] and θ is reflex, find sec θ and cosec θ.", "θ in 3rd quadrant: sec θ = −[[5//4]], cosec θ = −[[5//3]]", space=45)


def inverse_trig(ws):
    ws.section("Practice")
    P(ws, "Find the exact value, in radians.", [("arcsin [[1//2]]", pi_text(F(1, 6))), ("arccos 0", pi_text(F(1, 2))), ("arctan 1", pi_text(F(1, 4))),
                                               ("arcsin(−[[√3//2]])", pi_text(F(-1, 3))), ("arccos(−1)", "π"), ("arctan(−√3)", pi_text(F(-1, 3)))], cols=3)
    P(ws, "State the domain and range of", [("y = arcsin x", "−1 ≤ x ≤ 1; −[[π//2]] ≤ y ≤ [[π//2]]"), ("y = arccos x", "−1 ≤ x ≤ 1; 0 ≤ y ≤ π"),
                                            ("y = arctan x", "x ∈ ℝ; −[[π//2]] < y < [[π//2]]")], cols=1)
    ws.section("Problem solving")
    ws.question("Show that sin(arccos x) = √(1 − x^2) for −1 ≤ x ≤ 1.", "Let θ = arccos x, so cos θ = x and 0 ≤ θ ≤ π; sin θ ≥ 0, so sin θ = √(1 − cos^2 θ)", space=50)


SHEETS = [
    ({"slug": "alevel-proof-by-contradiction", "title": "A level: Proof by contradiction", "lesson": "y13-u1-l1"}, proof_contradiction),
    ({"slug": "alevel-algebraic-fractions-y13", "title": "A level: Adding and simplifying algebraic fractions", "lesson": "y13-u1-l2"}, alg_fractions_y13),
    ({"slug": "alevel-partial-fractions", "title": "A level: Partial fractions", "lesson": "y13-u1-l3"}, partial_fractions),
    ({"slug": "alevel-partial-fractions-repeated", "title": "A level: Partial fractions with repeated factors", "lesson": "y13-u1-l4"}, repeated_factors),
    ({"slug": "alevel-algebraic-division", "title": "A level: Algebraic division and improper fractions", "lesson": "y13-u1-l5"}, improper_division),
    ({"slug": "alevel-modulus-function", "title": "A level: The modulus function", "lesson": "y13-u2-l1"}, modulus_function),
    ({"slug": "alevel-functions-mappings", "title": "A level: Functions and mappings", "lesson": "y13-u2-l2"}, functions_mappings),
    ({"slug": "alevel-composite-functions", "title": "A level: Composite functions", "lesson": "y13-u2-l3"}, composite),
    ({"slug": "alevel-inverse-functions", "title": "A level: Inverse functions", "lesson": "y13-u2-l4"}, inverse),
    ({"slug": "alevel-modulus-graphs", "title": "A level: y = |f(x)| and y = f(|x|)", "lesson": "y13-u2-l5"}, modulus_graphs),
    ({"slug": "alevel-combining-transformations", "title": "A level: Combining transformations", "lesson": "y13-u2-l6"}, combining_transformations),
    ({"slug": "alevel-modulus-problems", "title": "A level: Solving modulus problems", "lesson": "y13-u2-l7"}, modulus_problems),
    ({"slug": "alevel-arithmetic-sequences", "title": "A level: Arithmetic sequences", "lesson": "y13-u3-l1"}, arithmetic_sequences),
    ({"slug": "alevel-arithmetic-series", "title": "A level: Arithmetic series", "lesson": "y13-u3-l2"}, arithmetic_series),
    ({"slug": "alevel-geometric-sequences", "title": "A level: Geometric sequences", "lesson": "y13-u3-l3"}, geometric_sequences),
    ({"slug": "alevel-geometric-series", "title": "A level: Geometric series", "lesson": "y13-u3-l4"}, geometric_series),
    ({"slug": "alevel-sum-to-infinity", "title": "A level: Sum to infinity", "lesson": "y13-u3-l5"}, sum_to_infinity),
    ({"slug": "alevel-sigma-notation", "title": "A level: Sigma notation", "lesson": "y13-u3-l6"}, sigma),
    ({"slug": "alevel-recurrence-relations", "title": "A level: Recurrence relations", "lesson": "y13-u3-l7"}, recurrence),
    ({"slug": "alevel-modelling-with-series", "title": "A level: Modelling with series", "lesson": "y13-u3-l8"}, modelling_series),
    ({"slug": "alevel-binomial-any-power", "title": "A level: Expanding (1 + x)ⁿ for any n", "lesson": "y13-u4-l1"}, binom_1x),
    ({"slug": "alevel-binomial-a-plus-bx", "title": "A level: Expanding (a + bx)ⁿ", "lesson": "y13-u4-l2"}, binom_abx),
    ({"slug": "alevel-binomial-partial-fractions", "title": "A level: Binomial expansion using partial fractions", "lesson": "y13-u4-l3"}, binom_partial),
    ({"slug": "alevel-radian-measure", "title": "A level: Radian measure", "lesson": "y13-u5-l1"}, radian_measure),
    ({"slug": "alevel-arc-length", "title": "A level: Arc length", "lesson": "y13-u5-l2"}, arc_length),
    ({"slug": "alevel-sectors-segments", "title": "A level: Areas of sectors and segments", "lesson": "y13-u5-l3"}, sectors_segments),
    ({"slug": "alevel-trig-equations-radians", "title": "A level: Trigonometric equations in radians", "lesson": "y13-u5-l4"}, trig_eq_radians),
    ({"slug": "alevel-small-angle-approximations", "title": "A level: Small angle approximations", "lesson": "y13-u5-l5"}, small_angles),
    ({"slug": "alevel-sec-cosec-cot", "title": "A level: Secant, cosecant and cotangent", "lesson": "y13-u6-l1"}, sec_cosec_cot),
    ({"slug": "alevel-sec-cosec-cot-graphs", "title": "A level: Graphs of sec x, cosec x and cot x", "lesson": "y13-u6-l2"}, sec_graphs),
    ({"slug": "alevel-using-sec-cosec-cot", "title": "A level: Using sec x, cosec x and cot x", "lesson": "y13-u6-l3"}, using_sec),
    ({"slug": "alevel-reciprocal-trig-identities", "title": "A level: Trigonometric identities with sec, cosec and cot", "lesson": "y13-u6-l4"}, reciprocal_identities),
    ({"slug": "alevel-inverse-trig-functions", "title": "A level: Inverse trigonometric functions", "lesson": "y13-u6-l5"}, inverse_trig),
]

for _meta, _ in SHEETS:
    _meta.setdefault("topic", TOPIC)
    _meta.setdefault("level", LEVEL)
