"""A level Year 12 Pure, units 1–6: algebraic expressions, quadratics,
equations and inequalities, graphs and transformations, straight lines and
circles, algebraic methods and proof.

Each worksheet's META says which lesson it belongs to ("lesson"), so the
website can show it on that lesson's page. Answers are calculated from the
same numbers as the questions (see alevel_common.py and engine/calc.py)."""
from fractions import Fraction as F
import math
from engine.draw import axes
from engine.calc import Poly, X, fr, dec, MINUS, signed, power_text
from engine.algebra import expand
from topics.alevel_common import (LEVEL, TOPIC, P, m, Mono, Surd, sqrt_text, quad_text, quad_roots, quad_roots_float,
                                  completed_square, line_y, line_general, circle_text, dist_text, pt, set_or)


def lin(a, b, var="x"):
    return Poly({1: a, 0: b}, var).text()


def factor_text(r, var="x"):
    """(x − r)"""
    return f"({var} {signed(-r)})" if r else var


def fac_str(roots, lead=1):
    """Factorised form with repeated factors as powers: x^2(x − 3)(x + 1)^2."""
    out = "" if lead == 1 else (MINUS if lead == -1 else fr(lead))
    for r in sorted(set(roots), key=lambda v: (v != 0, v)):
        k = roots.count(r)
        f = factor_text(r)
        out += (f"{f}^{k}" if k > 1 else f) if r else (f"x^{k}" if k > 1 else "x")
    return out


# ==========================================================================
# Unit 1: Algebraic expressions
# ==========================================================================
def index_laws(ws):
    ws.section("Practice")
    x = lambda c, n: Mono(c, x=n)
    qs = [("x^5 × x^3", x(1, 5) * x(1, 3)), ("(2x^3)^4", x(2, 3) ** 4), ("[[12x^7//3x^2]]", x(12, 7) / x(3, 2)),
          ("4x^3 × 5x^{−1}", x(4, 3) * x(5, -1)), ("(3x^{−2})^3", x(3, -2) ** 3), ("[[10x^2//4x^5]]", x(10, 2) / x(4, 5))]
    P(ws, "Simplify, writing each answer in the form ax^n.", [(q, a.text()) for q, a in qs])
    two = [("(x^2y^3)^2 × xy", Mono(1, x=2, y=3) ** 2 * Mono(1, x=1, y=1)),
           ("[[(3a^2b)^3//9ab^2]]", Mono(3, a=2, b=1) ** 3 / Mono(9, a=1, b=2)),
           ("[[6p^4q × 2pq^3//4p^2q^2]]", Mono(6, p=4, q=1) * Mono(2, p=1, q=3) / Mono(4, p=2, q=2)),
           ("(2m^3n^{−1})^2 × 5mn^4", Mono(2, m=3, n=-1) ** 2 * Mono(5, m=1, n=4))]
    P(ws, "Simplify fully.", [(q, a.text()) for q, a in two])
    ws.section("Problem solving")
    ws.question("Given that 2^{3x} × 4^{x + 1} = 2^{12}, find x.", "2^{3x} × 2^{2x + 2} = 2^{5x + 2}, so 5x + 2 = 12 and x = 2", space=50)
    ws.question("Write 9^{x} × 3^{2 − x} as a single power of 3.", "3^{2x} × 3^{2 − x} = 3^{x + 2}", space=40)


def expanding(ws):
    ws.section("Practice")
    qs = ["(x + 3)(x − 5)", "(2x − 1)(3x + 4)", "(x + 2)^2", "(3x − 2)^2", "(x + 1)(x^2 − 3x + 2)", "(2x + 1)(x^2 + 4x − 3)"]
    P(ws, "Expand and simplify.", [(q, expand(q)) for q in qs])
    q3 = ["(x + 1)(x + 2)(x + 3)", "(x − 2)(x + 4)(x − 1)", "(2x + 1)(x − 3)(x + 2)", "(x + 2)^3"]
    P(ws, "Expand and simplify.", [(q, expand(q)) for q in q3], work=40)
    ws.section("Problem solving")
    ws.question("(x + a)(x + 2)(x − 3) ≡ x^3 + bx^2 − 9x − 18. Find a and b.",
                "Constant: −6a = −18 so a = 3; then b = a + 2 − 3 = 2", space=60)


def factorising(ws):
    ws.section("Practice")
    quads = [(1, 7, 12), (1, -2, -15), (2, 5, -3), (3, -10, 8), (6, 1, -2), (4, -12, 9)]
    def fac(a, b, c):
        # find (px + q)(rx + s) by search: answers come from the search, then checked by expanding
        for p in range(1, abs(a) + 1):
            if a % p:
                continue
            r = a // p
            for q in range(-abs(c), abs(c) + 1):
                if q == 0 or c % q:
                    continue
                s = c // q
                if p * s + q * r == b:
                    t = f"({lin(p, q)})({lin(r, s)})"
                    if (p, q) == (r, s):
                        t = f"({lin(p, q)})^2"
                    assert expand(t) == quad_text(a, b, c), t
                    return t
    P(ws, "Factorise.", [(quad_text(a, b, c), fac(a, b, c)) for a, b, c in quads], cols=3)
    cub = [("x^3 − 9x", "x(x − 3)(x + 3)"), ("x^3 + 5x^2 + 6x", "x(x + 2)(x + 3)"), ("2x^3 − 8x", "2x(x − 2)(x + 2)"),
           ("x^3 − 6x^2 + 9x", "x(x − 3)^2"), ("4x^4 − 25x^2", "x^2(2x − 5)(2x + 5)"), ("x^4 − 1", "(x − 1)(x + 1)(x^2 + 1)")]
    for q, a in cub:
        assert expand(a) == q, (q, expand(a))
    P(ws, "Factorise completely.", cub, cols=3)
    ws.section("Problem solving")
    ws.question("Factorise x^4 − 5x^2 + 4 completely.", "(x^2 − 1)(x^2 − 4) = (x − 1)(x + 1)(x − 2)(x + 2)", space=50)


def frac_indices(ws):
    ws.section("Practice")
    # evaluate b^(p/q) exactly
    def ev(base, pw):
        base, pw = F(base), F(pw)
        rootn = lambda v, n: F(round(v.numerator ** (1 / n)), round(v.denominator ** (1 / n)))
        r = rootn(base, pw.denominator)
        assert r ** pw.denominator == base
        return r ** pw.numerator
    nums = [(8, F(2, 3)), (27, F(-1, 3)), (16, F(3, 4)), (32, F(-2, 5)), (F(4, 9), F(-1, 2)), (F(16, 81), F(3, 4)), (125, F(-2, 3)), (F(1, 64), F(-1, 3))]
    P(ws, "Evaluate without a calculator.", [(f"{fr(b) if F(b).denominator == 1 else '(' + fr(b) + ')'}^{{{fr(p).replace('[[', '').replace(']]', '').replace('//', '/')}}}", fr(ev(b, p))) for b, p in nums], cols=4)
    forms = [("[[3//√x]]", Poly({F(-1, 2): 3})), ("[[2//x^3]]", Poly({-3: 2})), ("x^2√x", Poly({F(5, 2): 1})),
             ("[[1//4∛x]]", Poly({F(-1, 3): F(1, 4)})), ("[[x^2 + 3//√x]]", Poly({F(3, 2): 1, F(-1, 2): 3})),
             ("[[5x − 2//x^2]]", Poly({-1: 5, -2: -2}))]
    P(ws, "Write each expression as a sum of terms of the form ax^n.", [(q, a.text()) for q, a in forms])
    ws.section("Problem solving")
    ws.question("Solve x^{3/2} = 27.", "x = 27^{2/3} = 9", space=35)


def surds(ws):
    ws.section("Practice")
    P(ws, "Simplify.", [(f"√{n}", sqrt_text(n)) for n in (50, 72, 108, 200, 63, 300)], cols=3)
    exprs = [("√12 + √27", Surd(0, 2, 3) + Surd(0, 3, 3)), ("√80 − √20", Surd(0, 4, 5) - Surd(0, 2, 5)),
             ("(2 + √3)(4 − √3)", Surd(2, 1, 3) * Surd(4, -1, 3)), ("(√5 − 1)^2", Surd(-1, 1, 5) * Surd(-1, 1, 5)),
             ("(3 + 2√2)(3 − 2√2)", Surd(3, 2, 2) * Surd(3, -2, 2)), ("√6 × √15", Surd(0, 3, 10))]
    P(ws, "Simplify, giving answers in the form a + b√c where possible.", [(q, a.text()) for q, a in exprs])
    ws.section("Problem solving")
    ws.question("A rectangle has sides (3 + √5) cm and (3 − √5) cm. Find its area and the length of its diagonal.",
                "Area = 9 − 5 = 4 cm^2. Diagonal^2 = (3 + √5)^2 + (3 − √5)^2 = 28, so diagonal = 2√7 cm", space=60)


def rationalising(ws):
    ws.section("Practice")
    qs = [("[[1//√3]]", Surd(1) / Surd(0, 1, 3)), ("[[10//√5]]", Surd(10) / Surd(0, 1, 5)), ("[[3//2√6]]", Surd(3) / Surd(0, 2, 6)),
          ("[[1//1 + √2]]", Surd(1) / Surd(1, 1, 2)), ("[[4//3 − √5]]", Surd(4) / Surd(3, -1, 5)), ("[[2 + √3//2 − √3]]", Surd(2, 1, 3) / Surd(2, -1, 3)),
          ("[[√5 + 1//√5 − 1]]", Surd(1, 1, 5) / Surd(-1, 1, 5)), ("[[6//√7 + √3]]", None)]
    out = []
    for q, a in qs:
        out.append((q, a.text() if a else "[[3(√7 − √3)//2]]"))       # 6(√7 − √3)/(7 − 3)
    P(ws, "Rationalise the denominator and simplify.", out)
    ws.section("Problem solving")
    ws.question("Show that [[1//√3 + 1]] + [[1//√3 − 1]] = √3.", "Common denominator 3 − 1 = 2: [[(√3 − 1) + (√3 + 1)//2]] = [[2√3//2]] = √3", space=55)


# ==========================================================================
# Unit 2: Quadratics
# ==========================================================================
def solving_quadratics(ws):
    ws.section("Practice")
    fq = [(1, -2, -15), (2, 7, 3), (3, -5, -2), (1, 0, -49), (4, -9, 0), (6, 7, -5)]
    P(ws, "Solve by factorising.", [(quad_text(a, b, c) + " = 0", quad_roots(a, b, c)) for a, b, c in fq])
    gq = [(1, -6, 4), (1, 4, -1), (2, -3, -1), (3, 2, -2), (1, -1, -3), (5, 8, 1)]
    P(ws, "Solve, giving exact answers in simplest surd form.", [(quad_text(a, b, c) + " = 0", quad_roots(a, b, c)) for a, b, c in gq])
    ws.section("Problem solving")
    ws.question("Solve x^4 − 13x^2 + 36 = 0.", "Let u = x^2: (u − 4)(u − 9) = 0, so x = ±2 or x = ±3", space=50)
    ws.question("Solve x − 5√x + 6 = 0.", "Let u = √x: (u − 2)(u − 3) = 0, so √x = 2 or 3, x = 4 or x = 9", space=50)


def completing_square(ws):
    ws.section("Practice")
    a1 = [(1, 8, 3), (1, -6, 11), (1, 5, 1), (1, -3, -2)]
    P(ws, "Write in the form (x + p)^2 + q.", [(quad_text(a, b, c), completed_square(a, b, c)) for a, b, c in a1])
    a2 = [(2, 12, 5), (3, -12, 1), (-1, 6, 2), (2, 6, -1)]
    P(ws, "Write in the form a(x + p)^2 + q.", [(quad_text(a, b, c), completed_square(a, b, c)) for a, b, c in a2])
    ws.section("Problem solving")
    ws.question("Use your answer to part (a) of Question 1 to write down the minimum value of x^2 + 8x + 3 and the value of x where it happens.",
                "(x + 4)^2 − 13: minimum −13 when x = −4", space=40)
    ws.question("Solve x^2 − 6x + 4 = 0 by completing the square.", "(x − 3)^2 = 5, x = 3 ± √5", space=45)


def functions_y12(ws):
    ws.section("Practice")
    f = Poly({2: 1, 1: -3, 0: -10})
    P(ws, f"f(x) = {f.text()}. Find", [("f(2)", fr(f(2))), ("f(−4)", fr(f(-4))), ("f([[1//2]])", fr(f(F(1, 2)))),
                                         ("the roots of f(x) = 0", quad_roots(1, -3, -10)), ("x when f(x) = 8", quad_roots(1, -3, -18)),
                                         ("f(x + 1), simplified", (Poly({2: 1, 1: 2, 0: 1}) + Poly({1: -3, 0: -3}) + (-10)).text())], cols=3)
    g = [(2, -8, 3), (-1, 4, 5), (1, 6, 9)]
    P(ws, "Find the minimum or maximum value of each function, and where it occurs.",
      [(f"g(x) = {quad_text(a, b, c)}", f"{'minimum' if a > 0 else 'maximum'} {fr(F(c) - F(b * b, 4 * a))} at x = {fr(F(-b, 2 * a))}") for a, b, c in g], cols=1)
    ws.section("Problem solving")
    ws.question("h(x) = x^2 + kx + 7 and h(2) = 3. Find k, then find the roots of h(x) = 0.", "4 + 2k + 7 = 3 so k = −4; x^2 − 4x + 7 has no real roots (discriminant −12)", space=55)


def quad_graphs(ws):
    ws.section("Practice")
    qs = [(1, -2, -8), (1, 4, 3), (-1, 2, 3), (2, -4, -6)]
    out = []
    for a, b, c in qs:
        xs = quad_roots_float(a, b, c)
        tx = F(-b, 2 * a)
        ty = F(c) - F(b * b, 4 * a)
        out.append((f"y = {quad_text(a, b, c)}",
                    f"crosses y-axis at (0, {fr(c)}); x-axis at {', '.join(pt((r, 0)) for r in [F(v).limit_denominator(100) for v in xs])}; turning point {pt((tx, ty))}"))
    P(ws, "For each graph, find where it crosses the axes and its turning point, then sketch it.", out, cols=1, work=55)
    ws.section("Problem solving")
    ws.question("A quadratic graph has roots x = −1 and x = 5 and passes through (0, −10). Find its equation.",
                "y = a(x + 1)(x − 5); at x = 0, −5a = −10 so a = 2: y = 2x^2 − 8x − 10", space=50)


def discriminant(ws):
    ws.section("Practice")
    qs = [(1, 6, 9), (2, -3, 4), (1, -5, 2), (3, 1, -2), (4, -12, 9), (1, 1, 1)]
    def n_roots(a, b, c):
        D = b * b - 4 * a * c
        return f"b^2 − 4ac = {fr(D)}: " + ("two real roots" if D > 0 else "one repeated root" if D == 0 else "no real roots")
    P(ws, "Work out the discriminant and say how many real roots each equation has.", [(quad_text(a, b, c) + " = 0", n_roots(a, b, c)) for a, b, c in qs])
    P(ws, "Find the value(s) of k for which each equation has equal roots.", [
        ("x^2 + kx + 9 = 0", "k^2 − 36 = 0, k = ±6"), ("kx^2 − 8x + 4 = 0", "64 − 16k = 0, k = 4"),
        ("x^2 + 2kx + 3k = 0", "4k^2 − 12k = 0, k = 0 or k = 3"), ("2x^2 + (k + 1)x + 2 = 0", "(k + 1)^2 = 16, k = 3 or k = −5")])
    ws.section("Problem solving")
    ws.question("Find the set of values of k for which x^2 + 6x + k = 0 has two distinct real roots.", "36 − 4k > 0, so k < 9", space=40)
    ws.question("Show that x^2 + (k − 2)x − k = 0 has real roots for every value of k.", "Discriminant (k − 2)^2 + 4k = k^2 + 4 > 0 for all k", space=50)


def modelling_quadratics(ws):
    ws.section("Problem solving")
    # h = −5t² + 20t + 2
    t_land = max(quad_roots_float(-5, 20, 2))
    ws.question("A ball is thrown upwards. Its height, h metres, after t seconds is h = −5t^2 + 20t + 2.\n(a) Write h in the form "
                "a − b(t − c)^2.\n(b) Find the greatest height and when it happens.\n(c) When does the ball hit the ground? Give your answer to 2 d.p.",
                f"(a) h = 22 − 5(t − 2)^2  (b) 22 m at t = 2 s  (c) t = {t_land:.2f} s", space=90)
    ws.question("A farmer has 60 m of fencing to make three sides of a rectangular pen against a long wall. The side parallel to the wall is "
                "x m.\n(a) Show the area is A = [[1//2]]x(60 − x).\n(b) Find the greatest possible area.",
                "(a) the other two sides are (60 − x)/2 each  (b) A = 30x − [[1//2]]x^2 = 450 − [[1//2]](x − 30)^2, so 450 m^2 when x = 30", space=90)
    ws.question("A company's profit, £P thousand, from selling x thousand items is modelled by P = −2x^2 + 24x − 40.\n(a) Find the values of x "
                "for which the company makes a profit.\n(b) Give one limitation of the model.",
                "(a) −2(x − 2)(x − 10) > 0, so 2 < x < 10  (b) e.g. a smooth curve ignores real price changes; it may not apply for large x", space=80)


# ==========================================================================
# Unit 3: Equations and inequalities
# ==========================================================================
def sim_linear(ws):
    ws.section("Practice")
    sols = [(3, 2), (-1, 4), (F(1, 2), 3), (5, -2), (-3, -4), (2, F(-1, 2))]
    coefs = [((2, 3), (1, -1)), ((3, 1), (2, 5)), ((4, 1), (2, -3)), ((3, 4), (5, 3)), ((2, -1), (3, 2)), ((5, 2), (3, -4))]
    out = []
    for (x0, y0), ((a, b), (c, d)) in zip(sols, coefs):
        e1 = f"{Poly({1: a}).text()} {'+' if b > 0 else MINUS} {Poly({1: abs(b)}, 'y').text()} = {fr(a * x0 + b * y0)}"
        e2 = f"{Poly({1: c}).text()} {'+' if d > 0 else MINUS} {Poly({1: abs(d)}, 'y').text()} = {fr(c * x0 + d * y0)}"
        out.append((f"{e1},   {e2}", f"x = {fr(x0)}, y = {fr(y0)}"))
    P(ws, "Solve the simultaneous equations.", out)
    ws.section("Problem solving")
    ws.question("3 pens and 2 rulers cost £4.20; 5 pens and 3 rulers cost £6.70. Find the cost of each.", "pen 80p, ruler 90p", space=50)


def sim_quadratic(ws):
    ws.section("Practice")
    # (curve, two integer points on it) -> the line through them; answers are those points
    cases = [("x^2 + y^2 = 25", (3, 4), (-4, -3)), ("x^2 + y^2 = 10", (1, 3), (3, -1)), ("y = x^2 − 3", (-1, -2), (2, 1)),
             ("xy = 12", (2, 6), (4, 3)), ("x^2 + 2y^2 = 9", (1, 2), (3, 0)), ("y = 2x^2 − x", (0, 0), (2, 6))]
    out = []
    for curve, a, b in cases:
        mg = F(b[1] - a[1], b[0] - a[0])
        c = F(a[1]) - mg * a[0]
        out.append((f"{line_y(mg, c)},   {curve}", f"{pt(a)} and {pt(b)}"))
    P(ws, "Solve the simultaneous equations.", out, work=45)
    ws.section("Problem solving")
    ws.question("Show that the line y = 2x + 7 and the curve y = x^2 + 2x + 1 meet at exactly two points, and find them.",
                "x^2 = 6, x = ±√6: (√6, 7 + 2√6) and (−√6, 7 − 2√6)", space=55)


def sim_graphs(ws):
    ws.section("Practice")
    ws.question("The graph shows y = x^2 − 2x − 3 and y = x + 1.\n(a) Use the graph to solve x^2 − 2x − 3 = x + 1.\n(b) Check your answer algebraically.",
                "(a) x = −1 and x = 4  (b) x^2 − 3x − 4 = (x + 1)(x − 4) = 0",
                figure=axes(-3, 6, -5, 8, [("curve", lambda x: x * x - 2 * x - 3, -2.4, 4.4), ("line", [(-3, -2), (6, 7)])], ystep=1),
                fig_w=230, fig_h=220, fig_pos="right", space=10)
    P(ws, "How many times does the line meet the curve? Use the discriminant.", [
        ("y = 2x + 1 and y = x^2 + 4", "x^2 − 2x + 3 = 0, discriminant −8: none"), ("y = 4x − 4 and y = x^2", "x^2 − 4x + 4 = 0, discriminant 0: once (tangent)"),
        ("y = x + 5 and y = x^2 − x + 2", "x^2 − 2x − 3 = 0, discriminant 16: twice"), ("y = 3 − x and x^2 + y^2 = 4", "2x^2 − 6x + 5 = 0, discriminant −4: none")], cols=1)
    ws.section("Problem solving")
    ws.question("The line y = kx − 1 is a tangent to y = x^2 + 3. Find the possible values of k.", "x^2 − kx + 4 = 0, k^2 − 16 = 0, k = ±4", space=50)


def lin_ineq(ws):
    ws.section("Practice")
    P(ws, "Solve, giving your answer in set notation.", [
        ("3x + 5 > 17", "{x : x > 4}"), ("7 − 2x ≤ 13", "{x : x ≥ −3}"), ("5(x − 1) < 2x + 7", "{x : x < 4}"),
        ("[[x + 3//4]] ≥ 2x − 1", "{x : x ≤ 1}"), ("−3 < 2x + 1 ≤ 9", "{x : −2 < x ≤ 4}"), ("4 − x > 3x − 8", "{x : x < 3}")])
    P(ws, "Find the values of x that satisfy both inequalities.", [
        ("2x − 1 > 5 and 3x < 24", "{x : 3 < x < 8}"), ("x + 4 ≥ 1 and 2x − 3 < x", "{x : −3 ≤ x < 3}"),
        ("5x < 2x + 9 and 3 − x < 1", "{x : 2 < x < 3}"), ("4x + 1 ≤ 9 or x > 6", "{x : x ≤ 2} ∪ {x : x > 6}")])
    ws.section("Problem solving")
    ws.question("A rectangle is x cm by (x + 3) cm. Its perimeter is less than 40 cm and its width is more than 2 cm. Find the possible values of x.",
                "4x + 6 < 40 gives x < 8.5; so 2 < x < 8.5", space=45)


def quad_ineq(ws):
    ws.section("Practice")
    def solve(a, b, c, sign):
        r = sorted(quad_roots_float(a, b, c))
        lo, hi = [fr(F(v).limit_denominator(100)) for v in r]
        inside = (sign in "<≤") == (a > 0)
        eq = "≤" if sign in "≤≥" else "<"
        if inside:
            return f"{{x : {lo} {eq} x {eq} {hi}}}"
        gt = "≥" if sign in "≤≥" else ">"
        return set_or([f"x {eq} {lo}", f"x {gt} {hi}"])
    qs = [((1, -7, 10), "<"), ((1, 2, -15), ">"), ((2, -5, -3), "≤"), ((1, 0, -9), "≥"), ((-1, 4, 12), ">"), ((3, 5, -2), "<")]
    P(ws, "Solve, giving your answer in set notation.", [(quad_text(a, b, c) + f" {s} 0", solve(a, b, c, s)) for (a, b, c), s in qs])
    ws.section("Problem solving")
    ws.question("Find the set of values of k for which x^2 + kx + 4 = 0 has no real roots.", "k^2 − 16 < 0, so {k : −4 < k < 4}", space=45)
    ws.question("Solve [[6//x]] > 2 for x ≠ 0.", "Multiply by x^2: 6x > 2x^2, so 2x(x − 3) < 0 and {x : 0 < x < 3}", space=50)


def ineq_graphs(ws):
    ws.section("Practice")
    ws.question("On a sketch, shade the region that satisfies y > x^2 − 4 and y < x + 2. Find the x-coordinates of the corners of the region.",
                "x^2 − 4 = x + 2 gives x = −2 and x = 3; the region lies above the curve and below the line, between them",
                figure=axes(-4, 4, -5, 7, [], ystep=1), fig_w=220, fig_h=220, fig_pos="right", space=10)
    P(ws, "Write down the inequalities that describe each region R.", [
        ("Between y = 2x and y = 6 − x, below both, above the x-axis", "y ≥ 0, y ≤ 2x, y ≤ 6 − x"),
        ("Inside the curve y = 9 − x^2 and above the line y = 5", "y < 9 − x^2 and y > 5"),
        ("Above y = x^2 − 2x and below y = 3", "y > x^2 − 2x and y < 3")], cols=1, work=20)
    ws.section("Problem solving")
    ws.question("Explain whether a dashed or solid line should be used for the boundary y = 2x + 1 when shading y ≤ 2x + 1.",
                "Solid: points on the line satisfy ≤", space=35)


# ==========================================================================
# Unit 4: Graphs and transformations
# ==========================================================================
def roots_poly(roots, lead=1):
    p = Poly({0: lead})
    for r in roots:
        p = p * Poly({1: 1, 0: -r})
    return p


def cubic_graphs(ws):
    ws.section("Practice")
    cs = [[1, -2, 3], [0, 2, -4], [-1, -1, 3], [2, 2, -1]]
    out = []
    for r in cs:
        p = roots_poly(r)
        fac = fac_str(r)
        uniq = sorted(set(r))
        touches = [v for v in uniq if r.count(v) == 2]
        out.append((f"y = {fac}", f"crosses the x-axis at x = {', '.join(fr(v) for v in uniq)}"
                    + (f" (touches at x = {', '.join(fr(v) for v in touches)})" if touches else "") + f"; y-intercept {fr(p(0))}"))
    P(ws, "Sketch each graph, showing where it meets the axes.", out, cols=1, work=50)
    ws.section("Problem solving")
    ws.question("Sketch y = −x(x − 2)(x + 3), showing where it meets the axes.", "Negative cubic (top-left to bottom-right); crosses at x = −3, 0, 2; y-intercept 0", space=80)


def quartic_graphs(ws):
    ws.section("Practice")
    cs = [([1, -1, 2, -2], 1), ([0, 0, 3, -1], 1), ([2, 2, -1, -1], 1), ([1, 3, 0, 0], -1)]
    out = []
    for r, a in cs:
        fac = fac_str(r, a)
        p = roots_poly(r, a)
        uniq = sorted(set(r))
        out.append((f"y = {fac}", f"meets the x-axis at x = {', '.join(fr(v) for v in uniq)}"
                    + "".join(f"; touches at x = {fr(v)}" for v in uniq if r.count(v) == 2) + f"; y-intercept {fr(p(0))}"
                    + ("; both ends go down" if a < 0 else "; both ends go up")))
    P(ws, "Sketch each graph, showing where it meets the axes.", out, cols=1, work=50)
    ws.section("Problem solving")
    ws.question("A quartic graph touches the x-axis at x = 2, crosses it at x = −1 and x = 3, and passes through (0, 12). Find its equation.",
                "y = a(x − 2)^2(x + 1)(x − 3); at x = 0: 4 × 1 × (−3)a = 12, a = −1: y = −(x − 2)^2(x + 1)(x − 3)", space=60)


def reciprocal_graphs(ws):
    ws.section("Practice")
    P(ws, "Write down the equations of the asymptotes of each graph.", [
        ("y = [[4//x]]", "x = 0 and y = 0"), ("y = −[[2//x^2]]", "x = 0 and y = 0"), ("y = [[1//x − 3]]", "x = 3 and y = 0"),
        ("y = [[2//x]] + 5", "x = 0 and y = 5"), ("y = [[1//x + 2]] − 1", "x = −2 and y = −1"), ("y = [[3//(x − 1)^2]]", "x = 1 and y = 0")])
    ws.question("Sketch y = [[3//x]] and y = [[3//x^2]] on the same axes. Describe how the two graphs differ.",
                "y = 3/x is in the 1st and 3rd quadrants; y = 3/x^2 is in the 1st and 2nd (always positive); they meet at (1, 3)",
                figure=axes(-4, 4, -4, 4, [], ystep=1), fig_w=200, fig_h=200, fig_pos="right", space=10)
    ws.section("Problem solving")
    ws.question("The graph of y = [[a//x + b]] has asymptote x = −4 and passes through (0, 2). Find a and b.", "b = 4; 2 = a/4, a = 8", space=40)


def intersections(ws):
    ws.section("Practice")
    def count(f, g, lo=-20, hi=20):
        n, prev, x = 0, None, lo
        while x <= hi:
            try:
                d = f(x) - g(x)
            except ZeroDivisionError:
                prev, x = None, x + 0.001
                continue
            if prev is not None and (d == 0 or prev * d < 0) and abs(d - prev) < 50:
                n += 1
            prev, x = d, x + 0.001
        return n
    pairs = [("y = x^2(x − 3) and y = [[2//x]]", lambda x: x * x * (x - 3), lambda x: 2 / x if x else 1e9),
             ("y = x(x − 2)(x + 2) and y = x^2", lambda x: x * (x - 2) * (x + 2), lambda x: x * x),
             ("y = (x − 1)^2(x + 2) and y = 3", lambda x: (x - 1) ** 2 * (x + 2), lambda x: 3),
             ("y = [[1//x]] and y = −x^2 − 1", lambda x: 1 / x if x else 1e9, lambda x: -x * x - 1)]
    P(ws, "Sketch each pair of graphs on the same axes and state how many solutions the equation formed by them has.",
      [(q, f"{count(f, g)} point{'s' if count(f, g) != 1 else ''} of intersection") for q, f, g in pairs], cols=1, work=45)
    ws.section("Problem solving")
    ws.question("Use a sketch to explain why x^3 = x − 1 has exactly one real solution.", "y = x^3 and y = x − 1 cross once (at a negative x)", space=60)


def translations(ws):
    ws.section("Practice")
    p = (2, 5)
    T = [("y = f(x + 3)", (-1, 5)), ("y = f(x) − 4", (2, 1)), ("y = f(x − 1) + 2", (3, 7)), ("y = f(x + 2) − 5", (0, 0))]
    P(ws, "The point (2, 5) lies on y = f(x). Find its image on each graph.", [(q, pt(a)) for q, a in T], cols=2)
    P(ws, "f(x) = x^2. Describe the transformation from y = f(x) to", [
        ("y = (x − 4)^2", "translation by {{4;0}}"), ("y = x^2 + 3", "translation by {{0;3}}"), ("y = (x + 1)^2 − 6", "translation by {{−1;−6}}")], cols=1)
    ws.section("Problem solving")
    ws.question("f(x) = x(x − 3)^2. Sketch y = f(x + 2), showing where it meets the axes.", "f(x + 2) = (x + 2)(x − 1)^2: crosses at x = −2, touches at x = 1, y-intercept 2", space=70)


def stretches(ws):
    ws.section("Practice")
    T = [("y = 3f(x)", (4, -6)), ("y = f(2x)", (2, -2)), ("y = f(−x)", (-4, -2)), ("y = −f(x)", (4, 2)), ("y = f([[1//2]]x)", (8, -2)), ("y = [[1//2]]f(x)", (4, -1))]
    P(ws, "The point (4, −2) lies on y = f(x). Find its image on each graph.", [(q, pt(a)) for q, a in T], cols=3)
    P(ws, "Describe the single transformation that maps y = f(x) to", [
        ("y = f(3x)", "stretch parallel to the x-axis, scale factor [[1//3]]"), ("y = 4f(x)", "stretch parallel to the y-axis, scale factor 4"),
        ("y = f(−x)", "reflection in the y-axis"), ("y = −f(x)", "reflection in the x-axis")], cols=1)
    ws.section("Problem solving")
    ws.question("f(x) = x^2 − 4. Sketch y = f(2x) and give the points where it meets the axes.", "4x^2 − 4: crosses x-axis at x = ±1, y-axis at −4", space=60)


def transforming_functions(ws):
    ws.section("Practice")
    ws.question("y = f(x) has a maximum at (2, 6), crosses the x-axis at (−1, 0) and (5, 0), and has asymptote y = 1 as x → −∞.\n"
                "For each graph give the new maximum, x-axis crossings and asymptote:\n(a) y = f(x − 3)  (b) y = 2f(x)  (c) y = f(2x)  (d) y = −f(x)",
                "(a) (5, 6); (2, 0), (8, 0); y = 1  (b) (2, 12); (−1, 0), (5, 0); y = 2  (c) (1, 6); (−[[1//2]], 0), ([[5//2]], 0); y = 1  "
                "(d) minimum (2, −6); (−1, 0), (5, 0); y = −1", space=110)
    ws.section("Problem solving")
    ws.question("The curve y = x^2 − 6x + 5 is translated so its turning point is at the origin. Write down the translation vector.",
                "(x − 3)^2 − 4: turning point (3, −4), so translate by {{−3;4}}", space=50)
    ws.question("Find the equation of the graph after y = [[1//x]] is translated by {{2;−3}}. State its asymptotes.",
                "y = [[1//x − 2]] − 3; asymptotes x = 2 and y = −3", space=50)


# ==========================================================================
# Unit 5: Straight lines and circles
# ==========================================================================
def line_eqs(ws):
    ws.section("Practice")
    gp = [(3, (1, 4)), (-2, (3, -1)), (F(1, 2), (4, 0)), (F(-2, 3), (-3, 5))]
    P(ws, "Find the equation of the line with the given gradient through the given point, in the form ax + by + c = 0.",
      [(f"gradient {fr(g)}, through {pt(p)}", line_general(g, F(p[1]) - g * p[0])) for g, p in gp])
    pp = [((1, 2), (3, 8)), ((-2, 5), (4, 2)), ((0, -3), (6, 1)), ((-1, -4), (2, 5))]
    out = []
    for a, b in pp:
        g = F(b[1] - a[1], b[0] - a[0])
        out.append((f"through {pt(a)} and {pt(b)}", line_y(g, F(a[1]) - g * a[0])))
    P(ws, "Find the equation of the line through the two points, in the form y = mx + c.", out)
    ws.section("Problem solving")
    ws.question("The line 3x − 4y + 12 = 0 meets the axes at A and B. Find the coordinates of A and B.", "A(−4, 0), B(0, 3)", space=40)


def par_perp(ws):
    ws.section("Practice")
    P(ws, "Are the lines parallel, perpendicular or neither?", [
        ("y = 3x + 1 and 6x − 2y = 5", "parallel (both gradient 3)"), ("y = [[1//2]]x − 4 and 2x + y = 7", "perpendicular ([[1//2]] × −2 = −1)"),
        ("4x + 3y = 2 and 3x − 4y = 1", "perpendicular (−[[4//3]] × [[3//4]] = −1)"), ("y = 2x and x + 2y = 3", "perpendicular"),
        ("5x − y = 1 and y = 5x − 8", "parallel"), ("y = x + 2 and y = 2x + 1", "neither")])
    cases = [((2, 3), 4), ((-1, 5), F(-1, 3)), ((6, -2), F(3, 2))]
    out = []
    for p, g in cases:
        pg = -1 / F(g)
        out.append((f"perpendicular to a line of gradient {fr(g)}, through {pt(p)}", line_general(pg, F(p[1]) - pg * p[0])))
    P(ws, "Find the equation of each line in the form ax + by + c = 0.", out, cols=1)
    ws.section("Problem solving")
    ws.question("A(1, 2) and B(7, 6). Find the equation of the perpendicular bisector of AB.", "midpoint (4, 4), gradient −[[3//2]]: 3x + 2y − 20 = 0", space=50)


def lengths_areas(ws):
    ws.section("Practice")
    pairs = [((1, 2), (4, 6)), ((-3, 1), (2, -11)), ((0, 4), (6, 1)), ((-2, -5), (4, 7))]
    P(ws, "Find the distance between the points, in simplest surd form.", [(f"{pt(a)} and {pt(b)}", dist_text(a, b)) for a, b in pairs])
    tri = [((0, 0), (6, 0), (2, 5)), ((1, 1), (7, 3), (3, 6)), ((-2, 3), (4, -1), (5, 6))]
    def area(a, b, c):
        return abs(F((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]), 2))
    P(ws, "Find the area of the triangle with these corners.", [(f"{pt(a)}, {pt(b)}, {pt(c)}", fr(area(a, b, c))) for a, b, c in tri], cols=1)
    ws.section("Problem solving")
    ws.question("The line 2x + 3y = 12 meets the axes at P and Q. Find the area of triangle OPQ and the length PQ.", "P(6, 0), Q(0, 4): area 12, PQ = 2√13", space=50)


def modelling_lines(ws):
    ws.section("Problem solving")
    ws.question("A plumber charges a fixed call-out fee plus an hourly rate. A 2-hour job costs £110 and a 5-hour job costs £200.\n"
                "(a) Find a linear model C = a + bt.\n(b) Interpret a and b in context.\n(c) Comment on using the model for a 12-hour job.",
                "(a) b = 30, a = 50: C = 50 + 30t  (b) £50 call-out fee; £30 per hour  (c) extrapolation; a long job may be priced differently", space=80)
    ws.question("Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F).\n(a) Find F in terms of C.\n(b) At what temperature are the readings equal?",
                "(a) F = 1.8C + 32  (b) C = 1.8C + 32 gives C = −40", space=70)
    ws.question("A plant is 4 cm tall when planted and grows 1.5 cm a week. Write a model for its height and explain why it can't be valid for ever.",
                "h = 4 + 1.5w; plants don't grow at a constant rate for ever", space=55)


def circle_eq(ws):
    ws.section("Practice")
    cs = [((2, 3), 5), ((-1, 4), 3), ((0, -2), 7), ((-3, -5), 2)]
    P(ws, "Write down the equation of each circle.", [(f"centre {pt(c)}, radius {r}", circle_text(c[0], c[1], r * r)) for c, r in cs])
    gen = [(-4, 6, -3), (2, -8, 8), (6, 0, -16), (-10, 4, 20)]
    out = []
    for D, E, Fc in gen:
        a, b = F(-D, 2), F(-E, 2)
        r2 = a * a + b * b - Fc
        out.append((f"x^2 + y^2 {signed(D)}x {signed(E)}y {signed(Fc)} = 0".replace(" + 0x", "").replace(" + 0y", ""),
                    f"centre {pt((a, b))}, radius {sqrt_text(int(r2)) if r2.denominator == 1 else fr(r2)}"))
    P(ws, "Find the centre and radius of each circle.", out)
    ws.section("Problem solving")
    ws.question("A circle has diameter AB where A(1, 2) and B(7, 10). Find its equation.", "centre (4, 6), radius 5: (x − 4)^2 + (y − 6)^2 = 25", space=50)


def line_circle(ws):
    ws.section("Practice")
    cases = [("x^2 + y^2 = 25", (3, 4), (5, 0)), ("(x − 1)^2 + y^2 = 10", (2, 3), (4, -1)), ("x^2 + (y − 2)^2 = 20", (2, 6), (-4, 0))]
    out = []
    for cir, a, b in cases:
        g = F(b[1] - a[1], b[0] - a[0])
        out.append((f"{line_y(g, F(a[1]) - g * a[0])} and {cir}", f"{pt(a)} and {pt(b)}"))
    P(ws, "Find where the line meets the circle.", out, cols=1, work=40)
    P(ws, "Does the line cross, touch or miss the circle x^2 + y^2 = 8?", [
        ("y = x + 4", "touches (2x^2 + 8x + 8 = 0, discriminant 0)"), ("y = x", "crosses"), ("y = x + 5", "misses (discriminant −36)")], cols=1)
    ws.section("Problem solving")
    ws.question("Find the values of k for which y = x + k is a tangent to x^2 + y^2 = 18.", "2x^2 + 2kx + k^2 − 18 = 0; 4k^2 − 8(k^2 − 18) = 0, k = ±6", space=55)


def tangents_chords(ws):
    ws.section("Practice")
    cases = [((0, 0), (3, 4)), ((2, 1), (5, 5)), ((-1, 3), (1, -1))]
    out = []
    for c, p in cases:
        rg = F(p[1] - c[1], p[0] - c[0])
        tg = -1 / rg
        out.append((f"circle centre {pt(c)}, at the point {pt(p)}", line_general(tg, F(p[1]) - tg * p[0])))
    P(ws, "Find the equation of the tangent to each circle at the given point, in the form ax + by + c = 0.", out, cols=1)
    ws.section("Problem solving")
    ws.question("A chord of a circle joins (2, 8) and (8, 2). The centre lies on y = 2x − 3. Find the centre.",
                "Perpendicular bisector of the chord is y = x; y = x and y = 2x − 3 meet at (3, 3)", space=55)
    ws.question("A circle has centre (5, 2) and radius 4. Find the length of the tangent from the point (12, 6) to the circle.",
                "distance to centre √65; tangent length √(65 − 16) = 7", space=50)


def circles_triangles(ws):
    ws.section("Practice")
    ws.question("A(0, 6), B(8, 0) and C(0, 0) form a right-angled triangle. Find the equation of the circle through A, B and C.",
                "AB is a diameter: centre (4, 3), radius 5: (x − 4)^2 + (y − 3)^2 = 25", space=60)
    # circumcentre with integer answer
    A, B, C = (1, 5), (7, 5), (1, -1)
    ws.question(f"Find the centre and radius of the circle through {pt(A)}, {pt(B)} and {pt(C)}.",
                "Perpendicular bisectors x = 4 and y = 2 meet at (4, 2); radius √18 = 3√2", space=70)
    ws.section("Problem solving")
    ws.question("Show that P(−2, 1), Q(2, 5) and R(5, 2) form a right-angled triangle, and find the area of the circle through all three.",
                "PQ gradient 1, QR gradient −1, so the angle at Q is 90°. PR is a diameter: PR = √50, radius [[√50//2]], area [[25π//2]]", space=70)


# ==========================================================================
# Unit 6: Algebraic methods and proof
# ==========================================================================
def alg_fractions(ws):
    ws.section("Practice")
    cs = [((3, -3), (-3, 2)), ((2, 5), (2, -1)), ((-4, 1), (-4, -4)), ((1, 6), (1, -2))]
    # (x + a)(x + b) / ((x + a)(x + c)) -> (x + b)/(x + c)
    out = []
    for (a, b), (_, c) in cs:
        top = expand(f"({lin(1, a)})({lin(1, b)})")
        bot = expand(f"({lin(1, a)})({lin(1, c)})")
        out.append((f"[[{top}//{bot}]]", f"[[{lin(1, b)}//{lin(1, c)}]]"))
    P(ws, "Simplify fully.", out)
    P(ws, "Simplify fully.", [("[[2x^2 − 8//x^2 + x − 6]]", "[[2(x + 2)//x + 3]]"), ("[[x^3 − 9x//x^2 + 3x]]", "x − 3"),
                              ("[[3x^2 + 5x − 2//x^2 − 4]]", "[[3x − 1//x − 2]]"), ("[[x^2 − 5x//25 − x^2]]", "−[[x//x + 5]]")])
    ws.section("Problem solving")
    ws.question("Simplify [[x^2 − 1//x^2 + 3x + 2]] ÷ [[x − 1//x + 4]].", "[[(x − 1)(x + 1)//(x + 1)(x + 2)]] × [[x + 4//x − 1]] = [[x + 4//x + 2]]", space=55)


def dividing_polys(ws):
    ws.section("Practice")
    # (divisor, quotient): the question is their product, so the division is exact
    cs = [(Poly({1: 1, 0: -2}), Poly({2: 1, 1: 3, 0: -1})), (Poly({1: 1, 0: 1}), Poly({2: 2, 1: -1, 0: 4})),
          (Poly({1: 1, 0: -3}), Poly({2: 1, 0: -5})), (Poly({1: 1, 0: 2}), Poly({2: 3, 1: 1, 0: 2})),
          (Poly({1: 2, 0: -1}), Poly({2: 1, 1: 2, 0: -3}))]
    out = []
    for div, quot in cs:
        out.append((f"({(div * quot).text()}) ÷ ({div.text()})", quot.text()))
    P(ws, "Divide.", out, cols=1, work=40)
    ws.section("Problem solving")
    ws.question("Find the remainder when x^3 + 4x^2 − 3x + 5 is divided by (x − 2).", "f(2) = 8 + 16 − 6 + 5 = 23", space=40)


def factor_theorem(ws):
    ws.section("Practice")
    cs = [[1, -2, 3], [-1, 2, 4], [1, 1, -3], [2, -1, -5]]
    out = []
    for r in cs:
        p = roots_poly(r)
        out.append((f"Show that (x {signed(-r[0])}) is a factor of {p.text()}, then factorise it fully.",
                    "f(" + fr(r[0]) + ") = 0; " + fac_str(r)))
    P(ws, "Use the factor theorem.", out, cols=1, work=45)
    ws.section("Problem solving")
    ws.question("(x + 1) is a factor of x^3 + kx^2 − 4x − 4. Find k and factorise the cubic fully.",
                "f(−1) = −1 + k + 4 − 4 = 0 so k = 1; (x + 1)(x − 2)(x + 2)", space=55)
    ws.question("(x − 2) and (x + 3) are factors of x^3 + ax^2 + bx − 12. Find a and b.", "8 + 4a + 2b = 12 and −27 + 9a − 3b = 12: a = 3, b = −4", space=55)


def proof_deduction(ws):
    ws.section("Practice")
    P(ws, "Prove each statement.", [
        ("The sum of any three consecutive integers is a multiple of 3.", "n + (n + 1) + (n + 2) = 3(n + 1)"),
        ("The sum of two odd numbers is even.", "(2m + 1) + (2n + 1) = 2(m + n + 1)"),
        ("The product of two odd numbers is odd.", "(2m + 1)(2n + 1) = 2(2mn + m + n) + 1"),
        ("(n + 1)^2 − (n − 1)^2 is a multiple of 4 for any integer n.", "Expands to 4n"),
        ("x^2 − 6x + 10 > 0 for all real x.", "(x − 3)^2 + 1 ≥ 1 > 0"),
        ("The difference between the squares of two consecutive odd numbers is a multiple of 8.", "(2n + 1)^2 − (2n − 1)^2 = 8n")], cols=1, work=30)
    ws.section("Problem solving")
    ws.question("Prove that the line y = 2x − 5 is a tangent to the circle x^2 + y^2 = 5.", "x^2 + (2x − 5)^2 = 5 gives 5(x − 2)^2 = 0: one point (2, −1)", space=55)


def proof_exhaustion(ws):
    ws.section("Practice")
    def table(f, ns):
        return "; ".join(f"{n}: {f(n)}" for n in ns)
    P(ws, "Prove each statement by exhaustion.", [
        ("For 1 ≤ n ≤ 6, n^2 + n + 11 is prime.", table(lambda n: n * n + n + 11, range(1, 7)) + " (all prime)"),
        ("No square number ends in 2, 3, 7 or 8.", "Last digits 0–9 squared end in 0, 1, 4, 9, 6, 5, 6, 9, 4, 1"),
        ("For integers 2 ≤ n ≤ 5, 2^n > n + 1.", table(lambda n: f"{2 ** n} > {n + 1}", range(2, 6))),
        ("Every cube number is a multiple of 9, or one more or one less than a multiple of 9.",
         "n = 3k, 3k ± 1: n^3 = 27k^3, 27k^3 ± 27k^2 + 9k ± 1")], cols=1, work=35)
    ws.section("Problem solving")
    ws.question("Prove that n^2 − n is even for every integer n by considering n even and n odd.",
                "n = 2k: 2k(2k − 1), even. n = 2k + 1: (2k + 1)(2k), even", space=55)


def counter_example(ws):
    ws.section("Practice")
    # counter-examples found by searching, not typed in
    n1 = next(n for n in range(1, 100) if any((n * n - n + 41) % d == 0 for d in range(2, int(math.isqrt(n * n - n + 41)) + 1)))
    p2 = next(p for p in (2, 3, 5, 7, 11, 13) if any((2 ** p - 1) % d == 0 for d in range(2, int(math.isqrt(2 ** p - 1)) + 1)))
    d2 = next(d for d in range(2, 100) if (2 ** p2 - 1) % d == 0)
    P(ws, "Find a counter-example to show each statement is false.", [
        ("n^2 − n + 41 is prime for every positive integer n.", f"n = {n1}: {n1 * n1 - n1 + 41} = 41^2"),
        ("2^p − 1 is prime for every prime p.", f"p = {p2}: {2 ** p2 - 1} = {d2} × {(2 ** p2 - 1) // d2}"),
        ("x^2 > x for every real number x.", "x = [[1//2]]: [[1//4]] < [[1//2]]"),
        ("If a > b then a^2 > b^2.", "a = 1, b = −2"),
        ("The sum of two prime numbers is even.", "2 + 3 = 5"),
        ("√(a + b) = √a + √b for all positive a, b.", "a = b = 1: √2 ≠ 2")], cols=1, work=20)
    ws.section("Problem solving")
    ws.question("Sam says 'n^2 + 1 is never a multiple of 3'. Decide whether this is true, and prove or disprove it.",
                "True: n^2 is 0 or 1 more than a multiple of 3, so n^2 + 1 is 1 or 2 more", space=55)


SHEETS = [
    ({"slug": "alevel-index-laws", "title": "A level: Index laws", "lesson": "y12-u1-l1"}, index_laws),
    ({"slug": "alevel-expanding-brackets", "title": "A level: Expanding brackets", "lesson": "y12-u1-l2"}, expanding),
    ({"slug": "alevel-factorising", "title": "A level: Factorising", "lesson": "y12-u1-l3"}, factorising),
    ({"slug": "alevel-negative-fractional-indices", "title": "A level: Negative and fractional indices", "lesson": "y12-u1-l4"}, frac_indices),
    ({"slug": "alevel-surds", "title": "A level: Surds", "lesson": "y12-u1-l5"}, surds),
    ({"slug": "alevel-rationalising-denominators", "title": "A level: Rationalising denominators", "lesson": "y12-u1-l6"}, rationalising),
    ({"slug": "alevel-solving-quadratics", "title": "A level: Solving quadratic equations", "lesson": "y12-u2-l1"}, solving_quadratics),
    ({"slug": "alevel-completing-the-square", "title": "A level: Completing the square", "lesson": "y12-u2-l2"}, completing_square),
    ({"slug": "alevel-functions-notation", "title": "A level: Functions", "lesson": "y12-u2-l3"}, functions_y12),
    ({"slug": "alevel-quadratic-graphs", "title": "A level: Quadratic graphs", "lesson": "y12-u2-l4"}, quad_graphs),
    ({"slug": "alevel-discriminant", "title": "A level: The discriminant", "lesson": "y12-u2-l5"}, discriminant),
    ({"slug": "alevel-modelling-quadratics", "title": "A level: Modelling with quadratics", "lesson": "y12-u2-l6"}, modelling_quadratics),
    ({"slug": "alevel-simultaneous-linear", "title": "A level: Linear simultaneous equations", "lesson": "y12-u3-l1"}, sim_linear),
    ({"slug": "alevel-simultaneous-quadratic", "title": "A level: Quadratic simultaneous equations", "lesson": "y12-u3-l2"}, sim_quadratic),
    ({"slug": "alevel-simultaneous-graphs", "title": "A level: Simultaneous equations on graphs", "lesson": "y12-u3-l3"}, sim_graphs),
    ({"slug": "alevel-linear-inequalities", "title": "A level: Linear inequalities", "lesson": "y12-u3-l4"}, lin_ineq),
    ({"slug": "alevel-quadratic-inequalities", "title": "A level: Quadratic inequalities", "lesson": "y12-u3-l5"}, quad_ineq),
    ({"slug": "alevel-inequalities-on-graphs", "title": "A level: Inequalities on graphs", "lesson": "y12-u3-l6"}, ineq_graphs),
    ({"slug": "alevel-cubic-graphs", "title": "A level: Cubic graphs", "lesson": "y12-u4-l1"}, cubic_graphs),
    ({"slug": "alevel-quartic-graphs", "title": "A level: Quartic graphs", "lesson": "y12-u4-l2"}, quartic_graphs),
    ({"slug": "alevel-reciprocal-graphs", "title": "A level: Reciprocal graphs", "lesson": "y12-u4-l3"}, reciprocal_graphs),
    ({"slug": "alevel-points-of-intersection", "title": "A level: Points of intersection", "lesson": "y12-u4-l4"}, intersections),
    ({"slug": "alevel-translating-graphs", "title": "A level: Translating graphs", "lesson": "y12-u4-l5"}, translations),
    ({"slug": "alevel-stretching-graphs", "title": "A level: Stretching and reflecting graphs", "lesson": "y12-u4-l6"}, stretches),
    ({"slug": "alevel-transforming-functions", "title": "A level: Transforming functions", "lesson": "y12-u4-l7"}, transforming_functions),
    ({"slug": "alevel-equations-of-lines", "title": "A level: Equations of straight lines", "lesson": "y12-u5-l1"}, line_eqs),
    ({"slug": "alevel-parallel-perpendicular", "title": "A level: Parallel and perpendicular lines", "lesson": "y12-u5-l2"}, par_perp),
    ({"slug": "alevel-lengths-and-areas", "title": "A level: Lengths and areas", "lesson": "y12-u5-l3"}, lengths_areas),
    ({"slug": "alevel-modelling-straight-lines", "title": "A level: Modelling with straight lines", "lesson": "y12-u5-l4"}, modelling_lines),
    ({"slug": "alevel-equation-of-a-circle", "title": "A level: The equation of a circle", "lesson": "y12-u5-l5"}, circle_eq),
    ({"slug": "alevel-lines-meeting-circles", "title": "A level: Lines meeting circles", "lesson": "y12-u5-l6"}, line_circle),
    ({"slug": "alevel-tangents-chords", "title": "A level: Tangents and chords", "lesson": "y12-u5-l7"}, tangents_chords),
    ({"slug": "alevel-circles-triangles", "title": "A level: Circles and triangles", "lesson": "y12-u5-l8"}, circles_triangles),
    ({"slug": "alevel-algebraic-fractions", "title": "A level: Algebraic fractions", "lesson": "y12-u6-l1"}, alg_fractions),
    ({"slug": "alevel-dividing-polynomials", "title": "A level: Dividing polynomials", "lesson": "y12-u6-l2"}, dividing_polys),
    ({"slug": "alevel-factor-theorem", "title": "A level: The factor theorem", "lesson": "y12-u6-l3"}, factor_theorem),
    ({"slug": "alevel-proof-by-deduction", "title": "A level: Proof by deduction", "lesson": "y12-u6-l4"}, proof_deduction),
    ({"slug": "alevel-proof-by-exhaustion", "title": "A level: Proof by exhaustion", "lesson": "y12-u6-l5"}, proof_exhaustion),
    ({"slug": "alevel-counter-examples", "title": "A level: Disproof by counter-example", "lesson": "y12-u6-l6"}, counter_example),
]

# Every worksheet here is A level Pure (used to add them to the master list)
for _meta, _ in SHEETS:
    _meta.setdefault("topic", TOPIC)
    _meta.setdefault("level", LEVEL)
