"""A level Year 13 Pure, units 7–12 and exam preparation: trigonometry and
modelling, parametric equations, differentiation, numerical methods,
integration, and vectors in three dimensions.

HOW THE CALCULUS ANSWERS ARE CHECKED
Derivatives and integrals are written out by hand as text (e.g.
"15(3x + 2)^4"), so each one also carries the real functions, and the build
checks them numerically at several points:
  • a derivative answer must match the slope of the original function
  • an integral answer, when differentiated, must give back the integrand
If any answer were mistyped, the build would stop with an error naming it."""
from fractions import Fraction as F
import math
from engine.draw import axes
from engine.calc import Poly, fr, dec, sf, MINUS, signed, deg_solutions, sind, cosd, tand
from topics.alevel_common import LEVEL, TOPIC, P, Surd, sqrt_text, quad_roots, pt

H = 1e-5
SAMPLES = (0.6, 0.8, 1.3, 2.1)       # test points (above 0.5, so every function here is defined)


def slope(f, x):
    return (f(x + H) - f(x - H)) / (2 * H)


def check_derivative(name, f, fd, xs=SAMPLES):
    for x in xs:
        a, b = slope(f, x), fd(x)
        assert abs(a - b) < 1e-4 * max(1, abs(b)), f"derivative answer wrong: {name} at x = {x}: {a} vs {b}"


def check_integral(name, f, Fi, xs=SAMPLES):
    check_derivative("∫ " + name, Fi, f, xs)


def D(ws, prompt, items, cols=2, work=30):
    """Differentiation parts: (question, answer, f, f′) with each answer checked."""
    for q, a, f, fd in items:
        check_derivative(q, f, fd)
    P(ws, prompt, [(q, a) for q, a, _, _ in items], cols=cols, work=work)


def I(ws, prompt, items, cols=2, work=30):
    """Integration parts: (question, answer, integrand, antiderivative) with each answer checked."""
    for q, a, f, Fi in items:
        check_integral(q, f, Fi)
    P(ws, prompt, [(q, a + " + c") for q, a, _, _ in items], cols=cols, work=work)


def simpson(f, a, b, n=2000):
    h = (b - a) / n
    s = f(a) + f(b) + sum((4 if k % 2 else 2) * f(a + k * h) for k in range(1, n))
    return s * h / 3


def angles_text(sols, dp=1):
    out = []
    for s in sols:
        r = round(s)
        out.append(f"{r}°" if abs(s - r) < 1e-6 else f"{s:.{dp}f}°")
    return ", ".join(out) if out else "no solutions"


def all_solutions(f, lo=0, hi=360):
    """Every solution of f(x) = 0 in [lo, hi] degrees, including ones where the
    graph only touches zero (found by also checking each whole degree)."""
    sols = [s for s in deg_solutions(f, 0, lo, hi, step=0.01) if abs(f(s)) < 1e-6]
    for k in range(lo, hi + 1):
        try:
            if abs(f(k)) < 1e-9 and all(abs(k - s) > 1e-4 for s in sols):
                sols.append(k)
        except ZeroDivisionError:
            pass
    return sorted(sols)


# ==========================================================================
# Unit 7: Trigonometry and modelling
# ==========================================================================
def addition_formulae(ws):
    ws.section("Practice")
    r2, r3, r6 = math.sqrt(2), math.sqrt(3), math.sqrt(6)
    exact = [("sin 75°", "[[√6 + √2//4]]", (r6 + r2) / 4, sind(75)), ("cos 15°", "[[√6 + √2//4]]", (r6 + r2) / 4, cosd(15)),
             ("sin 15°", "[[√6 − √2//4]]", (r6 - r2) / 4, sind(15)), ("cos 105°", "[[√2 − √6//4]]", (r2 - r6) / 4, cosd(105)),
             ("tan 75°", "2 + √3", 2 + r3, tand(75)), ("tan 15°", "2 − √3", 2 - r3, tand(15))]
    for q, a, v, true in exact:
        assert abs(v - true) < 1e-12, q
    P(ws, "Use the addition formulae to find the exact value of", [(q, a) for q, a, _, _ in exact], cols=3)
    P(ws, "Write as a single trigonometric function.", [("sin 40° cos 20° + cos 40° sin 20°", "sin 60°"), ("cos 70° cos 10° + sin 70° sin 10°", "cos 60°"),
                                                     ("[[tan 50° − tan 20°//1 + tan 50° tan 20°]]", "tan 30°"), ("sin 2x cos x − cos 2x sin x", "sin x")])
    ws.section("Problem solving")
    ws.question("Prove that sin(A + B) + sin(A − B) ≡ 2 sin A cos B.", "Expand both: the cos A sin B terms cancel", space=45)


def using_addition(ws):
    ws.section("Practice")
    sA, cA = F(3, 5), F(4, 5)          # A acute
    sB, cB = F(12, 13), F(5, 13)       # B acute
    tA, tB = sA / cA, sB / cB
    P(ws, "sin A = [[3//5]] and cos B = [[5//13]], where A and B are acute. Find the exact value of", [
        ("sin(A + B)", fr(sA * cB + cA * sB)), ("cos(A + B)", fr(cA * cB - sA * sB)), ("sin(A − B)", fr(sA * cB - cA * sB)),
        ("tan(A + B)", fr((tA + tB) / (1 - tA * tB))), ("cos(A − B)", fr(cA * cB + sA * sB)), ("tan(A − B)", fr((tA - tB) / (1 + tA * tB)))], cols=3)
    ws.section("Problem solving")
    ws.question("Solve sin(x + 30°) = 2 cos x for 0° ≤ x ≤ 360°.", "sin x cos 30° + cos x sin 30° = 2 cos x gives tan x = √3: "
                + angles_text(all_solutions(lambda x: sind(x + 30) - 2 * cosd(x))), space=55)


def double_angle(ws):
    ws.section("Practice")
    s, c = F(-5, 13), F(12, 13)       # x in the 4th quadrant
    t = s / c
    P(ws, "cos x = [[12//13]] and x is in the 4th quadrant. Find the exact value of", [("sin 2x", fr(2 * s * c)), ("cos 2x", fr(c * c - s * s)),
                                                                                       ("tan 2x", fr(2 * t / (1 - t * t)))], cols=3)
    P(ws, "Write as a single trigonometric ratio, then evaluate exactly.", [("2 sin 15° cos 15°", "sin 30° = [[1//2]]"), ("cos^2 22.5° − sin^2 22.5°", "cos 45° = [[√2//2]]"),
                                                                            ("[[2 tan 22.5°//1 − tan^2 22.5°]]", "tan 45° = 1"), ("1 − 2 sin^2 75°", "cos 150° = −[[√3//2]]")])
    ws.section("Problem solving")
    ws.question("Show that cos 3x ≡ 4 cos^3 x − 3 cos x.", "cos(2x + x) = cos 2x cos x − sin 2x sin x; use cos 2x = 2cos^2 x − 1 and sin^2 x = 1 − cos^2 x", space=60)


def solving_y13(ws):
    ws.section("Practice")
    cases = [("sin 2x = sin x", lambda x: sind(2 * x) - sind(x)), ("cos 2x = 3 cos x − 2", lambda x: cosd(2 * x) - 3 * cosd(x) + 2),
             ("cos 2x + sin x = 0", lambda x: cosd(2 * x) + sind(x)), ("3 cos 2x + cos x + 2 = 0", lambda x: 3 * cosd(2 * x) + cosd(x) + 2),
             ("sin 2x = tan x", lambda x: sind(2 * x) - tand(x)), ("2 sin x = 3 cos x", lambda x: 2 * sind(x) - 3 * cosd(x))]
    out = []
    for q, f in cases:
        sols = [s for s in all_solutions(f) if abs(cosd(s)) > 1e-9 or "tan" not in q]
        out.append((q, angles_text(sols)))
    P(ws, "Solve for 0° ≤ x ≤ 360°, giving answers to 1 d.p. where needed.", out, cols=1, work=30)
    ws.section("Problem solving")
    ws.question("Explain why it is better to rewrite sin 2x = sin x as sin x(2 cos x − 1) = 0 than to divide by sin x.", "Dividing by sin x loses the solutions where sin x = 0", space=40)


def r_form(ws):
    ws.section("Practice")
    cases = [(3, 4, "cos", "−"), (5, 12, "sin", "+"), (1, math.sqrt(3), "cos", "−"), (2, 1, "sin", "−")]
    out = []
    for a, b, fn, sg in cases:
        R = math.hypot(a, b)
        Rt = str(round(R)) if abs(R - round(R)) < 1e-9 else sqrt_text(round(R * R))      # 5, 13, 2 or √5
        al = math.degrees(math.atan2(b, a))
        bt = "√3" if abs(b - math.sqrt(3)) < 1e-9 else dec(b)
        if fn == "cos":          # a cos x + b sin x = R cos(x − α)
            q = f"{'' if a == 1 else dec(a) + ' '}cos x + {bt} sin x"
            ans = f"{Rt} cos(x − {dec(al, 1)}°)"
            assert all(abs(a * cosd(x) + b * sind(x) - R * cosd(x - al)) < 1e-9 for x in (10, 100, 250))
        else:                    # a sin x ± b cos x = R sin(x ± α)
            s_ = 1 if sg == "+" else -1
            q = f"{dec(a)} sin x {sg} {'' if b == 1 else bt + ' '}cos x"
            ans = f"{Rt} sin(x {sg} {dec(al, 1)}°)"
            assert all(abs(a * sind(x) + s_ * b * cosd(x) - R * sind(x + s_ * al)) < 1e-9 for x in (10, 100, 250))
        out.append((q, ans))
    P(ws, "Write each expression in the form R cos(x − α) or R sin(x ± α), with R > 0 and 0 < α < 90°.", out, cols=1, work=30)
    f = lambda x: 3 * cosd(x) + 4 * sind(x) - 2
    ws.question("Hence solve 3 cos x + 4 sin x = 2 for 0° ≤ x ≤ 360°, and state the maximum value of 3 cos x + 4 sin x.",
                f"5 cos(x − 53.1°) = 2: x = {angles_text(all_solutions(f))}; maximum 5", space=55)
    ws.section("Problem solving")
    ws.question("Find the maximum value of [[1//10 + 3 cos x + 4 sin x]] and the smallest positive x where it happens.",
                "10 + 5 cos(x − 53.1°) is least (5) when x − 53.1° = 180°: maximum [[1//5]] at x = 233.1°", space=50)


def proving_identities(ws):
    ws.section("Practice")
    P(ws, "Prove each identity.", [("[[sin 2x//1 + cos 2x]] ≡ tan x", "[[2 sin x cos x//2 cos^2 x]]"), ("cot x − tan x ≡ 2 cot 2x", "[[cos^2 x − sin^2 x//sin x cos x]] = [[2 cos 2x//sin 2x]]"),
                                    ("[[1 − cos 2x//sin 2x]] ≡ tan x", "[[2 sin^2 x//2 sin x cos x]]"), ("(sin x + cos x)^2 ≡ 1 + sin 2x", "sin^2 x + cos^2 x + 2 sin x cos x"),
                                    ("cosec 2x + cot 2x ≡ cot x", "[[1 + cos 2x//sin 2x]] = [[2 cos^2 x//2 sin x cos x]]"), ("[[cos x//1 − sin x]] − tan x ≡ sec x", "Common denominator (1 − sin x)cos x")], cols=1, work=30)
    for g in (lambda x: sind(2 * x) / (1 + cosd(2 * x)) - tand(x), lambda x: 1 / tand(x) - tand(x) - 2 / tand(2 * x), lambda x: (1 - cosd(2 * x)) / sind(2 * x) - tand(x),
              lambda x: (sind(x) + cosd(x)) ** 2 - 1 - sind(2 * x), lambda x: 1 / sind(2 * x) + 1 / tand(2 * x) - 1 / tand(x), lambda x: cosd(x) / (1 - sind(x)) - tand(x) - 1 / cosd(x)):
        assert all(abs(g(x)) < 1e-9 for x in (20, 35, 70)), "identity check failed"
    ws.section("Problem solving")
    ws.question("Prove that sin 3x ≡ 3 sin x − 4 sin^3 x.", "sin(2x + x), then cos^2 x = 1 − sin^2 x", space=60)


def trig_modelling(ws):
    ws.section("Problem solving")
    h = lambda t: 4 + 2.5 * sind(30 * t)
    times = [t for t in deg_solutions(lambda t: h(t), 5.5, 0, 12, step=0.001)]
    ws.question("The depth of water in a harbour, d metres, t hours after midnight is d = 4 + 2.5 sin(30t)°, 0 ≤ t ≤ 12.\n(a) Find the greatest and least depths.\n"
                "(b) Find the times when the depth is 5.5 m.", f"(a) 6.5 m and 1.5 m  (b) t = {', '.join(f'{t:.2f}' for t in times)} hours", space=80)
    ws.question("The temperature in a room is modelled by T = 20 − 3 cos(15t)° + 4 sin(15t)°, t hours after 6 am.\n(a) Write T in the form 20 + R sin(15t − α)°.\n"
                "(b) Find the maximum temperature and when it first happens.",
                f"(a) T = 20 + 5 sin(15t − {math.degrees(math.atan2(3, 4)):.1f}°)  (b) 25 °C when 15t − {math.degrees(math.atan2(3, 4)):.1f} = 90, t = {(90 + math.degrees(math.atan2(3, 4))) / 15:.2f} h", space=90)
    assert all(abs(20 - 3 * cosd(15 * t) + 4 * sind(15 * t) - (20 + 5 * sind(15 * t - math.degrees(math.atan2(3, 4))))) < 1e-9 for t in (1, 3, 7))


# ==========================================================================
# Unit 8: Parametric equations
# ==========================================================================
def parametric(ws):
    ws.section("Practice")
    P(ws, "Find a Cartesian equation for each curve.", [("x = t^2, y = 2t", "y^2 = 4x"), ("x = 2t + 1, y = t − 3", "y = [[x − 7//2]]"),
                                                       ("x = [[1//t]], y = t^2 + 1", "y = [[1//x^2]] + 1"), ("x = e^{t}, y = e^{2t} − 1", "y = x^2 − 1"),
                                                       ("x = t + 1, y = [[2//t]]", "y = [[2//x − 1]]"), ("x = 3t, y = 9t^2 − 6t", "y = x^2 − 2x")], cols=2)
    ws.section("Problem solving")
    ws.question("A curve has x = t − 2, y = t^2 + 1 for −1 ≤ t ≤ 3. Find its Cartesian equation, with its domain and range.", "y = (x + 2)^2 + 1; −3 ≤ x ≤ 1; 1 ≤ y ≤ 10", space=50)


def parametric_trig(ws):
    ws.section("Practice")
    P(ws, "Find a Cartesian equation for each curve.", [("x = 3 cos t, y = 3 sin t", "x^2 + y^2 = 9"), ("x = 2 + cos t, y = sin t − 1", "(x − 2)^2 + (y + 1)^2 = 1"),
                                                       ("x = sin t, y = cos 2t", "y = 1 − 2x^2"), ("x = 2 sec t, y = 3 tan t", "[[x^2//4]] − [[y^2//9]] = 1"),
                                                       ("x = 4 cos t, y = 2 sin t", "[[x^2//16]] + [[y^2//4]] = 1"), ("x = cos t, y = sin 2t", "y^2 = 4x^2(1 − x^2)")], cols=1, work=25)
    ws.section("Problem solving")
    ws.question("Describe the curve x = 5 + 2 cos t, y = 2 sin t − 3, 0 ≤ t < 2π.", "A circle, centre (5, −3), radius 2", space=40)


def parametric_sketch(ws):
    ws.section("Practice")
    ts = [-2, -1, 0, 1, 2, 3]
    vals = [(t * t - 1, 2 * t + 1) for t in ts]
    ws.question("x = t^2 − 1, y = 2t + 1.\n(a) Copy and complete a table of x and y for t = −2, −1, 0, 1, 2, 3.\n(b) Plot the curve.\n(c) Find where it crosses the axes.",
                f"(a) {', '.join(pt(v) for v in vals)}  (c) y-axis when t = ±1: (0, −1) and (0, 3); x-axis when t = −[[1//2]]: (−[[3//4]], 0)",
                figure=axes(-2, 9, -4, 8, [], ystep=1), fig_w=230, fig_h=220, fig_pos="right", space=10)
    ws.section("Problem solving")
    ws.question("Sketch x = cos t, y = sin t for 0 ≤ t ≤ π and describe the curve.", "The upper semicircle of radius 1, centre the origin, traced from (1, 0) to (−1, 0)", space=60)


def parametric_intersections(ws):
    ws.section("Practice")
    out = []
    for (xf, yf, xt, yt), (mline, cline) in [((lambda t: t * t, lambda t: 2 * t, "t^2", "2t"), (1, -3)), ((lambda t: t + 1, lambda t: t * t - 4, "t + 1", "t^2 − 4"), (2, -3)),
                                             ((lambda t: 3 * t, lambda t: 3 / t, "3t", "[[3//t]]"), (-1, 10))]:
        # solve y(t) = m·x(t) + c by scanning t
        ts = []
        t, step, prev = -20.0, 0.0005, None
        while t < 20:
            try:
                d = yf(t) - (mline * xf(t) + cline)
            except ZeroDivisionError:
                d = None
            if d is not None and prev is not None and prev * d <= 0 and abs(d - prev) < 1:
                ts.append(round(t, 6))
            prev, t = d, t + step
        pts = sorted({(round(xf(v), 3), round(yf(v), 3)) for v in ts})
        out.append((f"x = {xt}, y = {yt} and y = {Poly({1: mline, 0: cline}).text()}", ", ".join(pt((F(p[0]).limit_denominator(100), F(p[1]).limit_denominator(100))) for p in pts)))
    P(ws, "Find the coordinates of the points where the curve meets the line.", out, cols=1, work=35)
    ws.section("Problem solving")
    ws.question("Find where x = t − 1, y = t^2 − 4 meets the coordinate axes.", "x = 0 when t = 1: (0, −3); y = 0 when t = ±2: (1, 0) and (−3, 0)", space=45)


def parametric_modelling(ws):
    ws.section("Problem solving")
    ws.question("A ball is kicked so that its position after t seconds is x = 20t, y = 15t − 4.9t^2 (metres).\n(a) Find when it lands.\n(b) Find how far it travels horizontally.\n(c) Find its greatest height.",
                f"(a) t = [[15//4.9]] = {15 / 4.9:.2f} s  (b) {20 * 15 / 4.9:.1f} m  (c) at t = [[15//9.8]]: {15 * 15 / 9.8 - 4.9 * (15 / 9.8) ** 2:.2f} m", space=90)
    ws.question("A Ferris wheel is modelled by x = 20 sin(0.1t), y = 22 − 20 cos(0.1t), with t in seconds and lengths in metres.\n(a) Find the height of the centre and the radius.\n"
                "(b) How long does one revolution take?\n(c) When is a passenger first 32 m high?",
                f"(a) 22 m; 20 m  (b) [[2π//0.1]] = {2 * math.pi / 0.1:.1f} s  (c) cos(0.1t) = −0.5, t = [[20π//3]] = {20 * math.pi / 3:.1f} s", space=90)


# ==========================================================================
# Unit 9: Differentiation
# ==========================================================================
def diff_sin_cos(ws):
    ws.section("Practice")
    D(ws, "Differentiate.", [
        ("y = 3 sin x", "3 cos x", lambda x: 3 * math.sin(x), lambda x: 3 * math.cos(x)),
        ("y = 2 cos x − sin x", "−2 sin x − cos x", lambda x: 2 * math.cos(x) - math.sin(x), lambda x: -2 * math.sin(x) - math.cos(x)),
        ("y = sin x + x^2", "cos x + 2x", lambda x: math.sin(x) + x * x, lambda x: math.cos(x) + 2 * x),
        ("y = 5 cos x + 4x", "−5 sin x + 4", lambda x: 5 * math.cos(x) + 4 * x, lambda x: -5 * math.sin(x) + 4)])
    ws.question("Find the gradient of y = 4 sin x − cos x at x = [[π//2]].", "4 cos x + sin x = 1", space=35)
    ws.section("Problem solving")
    ws.question("Prove from first principles that the derivative of sin x is cos x. (You may use [[sin h//h]] → 1 and [[cos h − 1//h]] → 0.)",
                "[[sin(x + h) − sin x//h]] = sin x [[cos h − 1//h]] + cos x [[sin h//h]] → cos x", space=70)


def diff_exp_log(ws):
    ws.section("Practice")
    D(ws, "Differentiate.", [
        ("y = e^{5x}", "5e^{5x}", lambda x: math.exp(5 * x), lambda x: 5 * math.exp(5 * x)),
        ("y = 3 ln x", "[[3//x]]", lambda x: 3 * math.log(x), lambda x: 3 / x),
        ("y = ln(4x)", "[[1//x]]", lambda x: math.log(4 * x), lambda x: 1 / x),
        ("y = 2^{x}", "2^{x} ln 2", lambda x: 2 ** x, lambda x: 2 ** x * math.log(2)),
        ("y = 4e^{−2x} + ln x^3", "−8e^{−2x} + [[3//x]]", lambda x: 4 * math.exp(-2 * x) + math.log(x ** 3), lambda x: -8 * math.exp(-2 * x) + 3 / x),
        ("y = 5^{x} − e^{x}", "5^{x} ln 5 − e^{x}", lambda x: 5 ** x - math.exp(x), lambda x: 5 ** x * math.log(5) - math.exp(x))])
    ws.section("Problem solving")
    ws.question("Find the equation of the tangent to y = e^{2x} at x = 0.", "gradient 2, point (0, 1): y = 2x + 1", space=40)
    ws.question("Find the x-coordinate of the stationary point of y = x − ln x.", "1 − [[1//x]] = 0, x = 1", space=35)


def chain_rule(ws):
    ws.section("Practice")
    D(ws, "Differentiate.", [
        ("y = (3x + 2)^5", "15(3x + 2)^4", lambda x: (3 * x + 2) ** 5, lambda x: 15 * (3 * x + 2) ** 4),
        ("y = √(x^2 + 1)", "[[x//√(x^2 + 1)]]", lambda x: math.sqrt(x * x + 1), lambda x: x / math.sqrt(x * x + 1)),
        ("y = e^{x²}", "2xe^{x²}", lambda x: math.exp(x * x), lambda x: 2 * x * math.exp(x * x)),
        ("y = ln(x^2 + 5)", "[[2x//x^2 + 5]]", lambda x: math.log(x * x + 5), lambda x: 2 * x / (x * x + 5)),
        ("y = sin 4x", "4 cos 4x", lambda x: math.sin(4 * x), lambda x: 4 * math.cos(4 * x)),
        ("y = (1 − 2x)^{−3}", "6(1 − 2x)^{−4}", lambda x: (1 - 2 * x) ** -3, lambda x: 6 * (1 - 2 * x) ** -4),
        ("y = cos^3 x", "−3 cos^2 x sin x", lambda x: math.cos(x) ** 3, lambda x: -3 * math.cos(x) ** 2 * math.sin(x)),
        ("y = e^{sin x}", "cos x e^{sin x}", lambda x: math.exp(math.sin(x)), lambda x: math.cos(x) * math.exp(math.sin(x)))])
    ws.section("Problem solving")
    ws.question("Use the chain rule to find [[dx//dy]] when x = y^3 + 2y, and hence [[dy//dx]] at the point where y = 1.", "[[dx//dy]] = 3y^2 + 2 = 5, so [[dy//dx]] = [[1//5]]", space=45)


def product_rule(ws):
    ws.section("Practice")
    D(ws, "Differentiate.", [
        ("y = x^2 e^{x}", "e^{x}(x^2 + 2x)", lambda x: x * x * math.exp(x), lambda x: math.exp(x) * (x * x + 2 * x)),
        ("y = x sin x", "sin x + x cos x", lambda x: x * math.sin(x), lambda x: math.sin(x) + x * math.cos(x)),
        ("y = x^3 ln x", "x^2(3 ln x + 1)", lambda x: x ** 3 * math.log(x), lambda x: x * x * (3 * math.log(x) + 1)),
        ("y = (x + 1)(2x − 3)^4", "(2x − 3)^3(10x + 5)", lambda x: (x + 1) * (2 * x - 3) ** 4, lambda x: (2 * x - 3) ** 3 * (10 * x + 5)),
        ("y = e^{2x} cos x", "e^{2x}(2 cos x − sin x)", lambda x: math.exp(2 * x) * math.cos(x), lambda x: math.exp(2 * x) * (2 * math.cos(x) - math.sin(x))),
        ("y = x√(x + 4)", "[[3x + 8//2√(x + 4)]]", lambda x: x * math.sqrt(x + 4), lambda x: (3 * x + 8) / (2 * math.sqrt(x + 4)))])
    ws.section("Problem solving")
    ws.question("Find the stationary point of y = xe^{−x} and decide its nature.", "e^{−x}(1 − x) = 0, x = 1: (1, e^{−1}); a maximum", space=50)


def quotient_rule(ws):
    ws.section("Practice")
    D(ws, "Differentiate.", [
        ("y = [[x//x + 1]]", "[[1//(x + 1)^2]]", lambda x: x / (x + 1), lambda x: 1 / (x + 1) ** 2),
        ("y = [[e^{x}//x]]", "[[e^{x}(x − 1)//x^2]]", lambda x: math.exp(x) / x, lambda x: math.exp(x) * (x - 1) / x ** 2),
        ("y = [[ln x//x]]", "[[1 − ln x//x^2]]", lambda x: math.log(x) / x, lambda x: (1 - math.log(x)) / x ** 2),
        ("y = [[sin x//x]]", "[[x cos x − sin x//x^2]]", lambda x: math.sin(x) / x, lambda x: (x * math.cos(x) - math.sin(x)) / x ** 2),
        ("y = [[2x + 3//x − 4]]", "−[[11//(x − 4)^2]]", lambda x: (2 * x + 3) / (x - 4), lambda x: -11 / (x - 4) ** 2),
        ("y = [[x^2//e^{x}]]", "[[x(2 − x)//e^{x}]]", lambda x: x * x / math.exp(x), lambda x: x * (2 - x) / math.exp(x))])
    ws.section("Problem solving")
    ws.question("Use the quotient rule to show that the derivative of tan x is sec^2 x.", "[[cos x cos x + sin x sin x//cos^2 x]] = [[1//cos^2 x]]", space=45)


def diff_trig(ws):
    ws.section("Practice")
    sec = lambda x: 1 / math.cos(x)
    cosec = lambda x: 1 / math.sin(x)
    cot = lambda x: 1 / math.tan(x)
    D(ws, "Differentiate.", [
        ("y = tan 3x", "3 sec^2 3x", lambda x: math.tan(3 * x), lambda x: 3 * sec(3 * x) ** 2),
        ("y = sec x", "sec x tan x", sec, lambda x: sec(x) * math.tan(x)),
        ("y = cosec 2x", "−2 cosec 2x cot 2x", lambda x: cosec(2 * x), lambda x: -2 * cosec(2 * x) * cot(2 * x)),
        ("y = cot x", "−cosec^2 x", cot, lambda x: -cosec(x) ** 2),
        ("y = sin^2 x", "sin 2x", lambda x: math.sin(x) ** 2, lambda x: math.sin(2 * x)),
        ("y = x tan x", "tan x + x sec^2 x", lambda x: x * math.tan(x), lambda x: math.tan(x) + x * sec(x) ** 2)])
    ws.section("Problem solving")
    ws.question("Given x = tan y, show that [[dy//dx]] = [[1//1 + x^2]].", "[[dx//dy]] = sec^2 y = 1 + tan^2 y = 1 + x^2", space=50)


def parametric_diff(ws):
    ws.section("Practice")
    cases = [("x = t^2, y = 4t", "[[2//t]]", lambda t: 2 / t, (lambda t: t * t, lambda t: 4 * t)),
             ("x = 3t + 1, y = t^3", "t^2", lambda t: t * t, (lambda t: 3 * t + 1, lambda t: t ** 3)),
             ("x = cos t, y = sin t", "−cot t", lambda t: -1 / math.tan(t), (math.cos, math.sin)),
             ("x = e^{t}, y = e^{2t} + t", "2e^{t} + e^{−t}", lambda t: 2 * math.exp(t) + math.exp(-t), (math.exp, lambda t: math.exp(2 * t) + t))]
    for q, a, g, (xf, yf) in cases:
        for t in SAMPLES:
            assert abs(slope(yf, t) / slope(xf, t) - g(t)) < 1e-4 * max(1, abs(g(t))), q
    P(ws, "Find [[dy//dx]] in terms of t.", [(q, a) for q, a, _, _ in cases])
    ws.question("A curve has x = t^2 + 1, y = t^3 − 2t. Find the equation of the tangent at t = 2.", "[[dy//dx]] = [[3t^2 − 2//2t]] = [[5//2]]; point (5, 4): y = [[5//2]]x − [[17//2]]", space=50)
    ws.section("Problem solving")
    ws.question("Find the points on x = t^2, y = t^3 − 3t where the tangent is horizontal.", "3t^2 − 3 = 0, t = ±1: (1, −2) and (1, 2)", space=45)


def implicit(ws):
    ws.section("Practice")
    # each: curve F(x, y) = 0, a point on it, the dy/dx formula (text) and the value there
    cases = [("x^2 + y^2 = 25", lambda x, y: x * x + y * y - 25, (3, 4), "−[[x//y]]", F(-3, 4)),
             ("x^2 + xy + y^2 = 7", lambda x, y: x * x + x * y + y * y - 7, (1, 2), "−[[2x + y//x + 2y]]", F(-4, 5)),
             ("x^3 + y^3 = 9xy", lambda x, y: x ** 3 + y ** 3 - 9 * x * y, (2, 4), "[[3y − x^2//y^2 − 3x]]", F(4, 5)),
             ("e^{y} = x^2 + 1", lambda x, y: math.exp(y) - x * x - 1, (0, 0), "[[2x//x^2 + 1]]", F(0))]
    for q, Fxy, (x0, y0), _, val in cases:
        x0, y0 = float(x0), float(y0)
        assert abs(Fxy(x0, y0)) < 1e-9, f"point not on curve: {q}"
        fx = (Fxy(x0 + H, y0) - Fxy(x0 - H, y0)) / (2 * H)
        fy = (Fxy(x0, y0 + H) - Fxy(x0, y0 - H)) / (2 * H)
        assert abs(-fx / fy - float(val)) < 1e-5, f"implicit gradient wrong: {q}"
    P(ws, "Find [[dy//dx]] in terms of x and y, and its value at the given point.", [(f"{q} at {pt(p)}", f"{a}; {fr(v)}") for q, _, p, a, v in cases], cols=1, work=35)
    ws.section("Problem solving")
    ws.question("Find the equation of the tangent to x^2 + y^2 = 25 at (3, 4).", "y − 4 = −[[3//4]](x − 3): 3x + 4y = 25", space=40)


def second_deriv_y13(ws):
    ws.section("Practice")
    f = Poly({3: 1, 2: -6, 0: 5})
    P(ws, f"f(x) = {f.text()}.", [("Find f″(x).", f.diff().diff().text()), ("Find the point of inflection.", pt((2, f(2)))),
                                   ("For which x is f concave?", "x < 2"), ("For which x is f convex?", "x > 2")], cols=2)
    P(ws, "Find the values of x for which each curve is concave.", [("y = x^4 − 6x^2", "f″ = 12x^2 − 12 < 0: −1 < x < 1"), ("y = xe^{x}", "f″ = e^{x}(x + 2) < 0: x < −2"),
                                                                   ("y = ln x − x^2 (x > 0)", "f″ = −[[1//x^2]] − 2 < 0: all x > 0")], cols=1)
    ws.section("Problem solving")
    ws.question("Show that y = x^4 has no point of inflection at x = 0, even though [[d^2y//dx^2]] = 0 there.", "y″ = 12x^2 ≥ 0 on both sides, so the curve is convex either side; the concavity doesn't change", space=50)


def rates_of_change(ws):
    ws.section("Problem solving")
    ws.question("The volume of a sphere increases at 10 cm^3 s^{−1}. Find the rate at which the radius increases when r = 5 cm.",
                f"[[dV//dt]] = 4πr^2 [[dr//dt]]: [[dr//dt]] = [[10//100π]] = [[1//10π]] = {1 / (10 * math.pi):.4f} cm s^{{−1}}", space=60)
    ws.question("A cube's side increases at 0.2 cm s^{−1}. Find the rate of increase of its surface area when the side is 6 cm.", "A = 6x^2, [[dA//dt]] = 12x × 0.2 = 14.4 cm^2 s^{−1}", space=55)
    ws.question("Oil spreads in a circle. Its area increases at 30 m^2 per minute. How fast is the radius growing when the area is 100 m^2?",
                f"r = √([[100//π]]); [[dr//dt]] = [[30//2πr]] = {30 / (2 * math.pi * math.sqrt(100 / math.pi)):.3f} m per minute", space=60)
    ws.question("Water is poured into a cone (vertex down) of semi-vertical angle 45° at 2 cm^3 s^{−1}. Find the rate the depth rises when it is 4 cm.",
                f"V = [[1//3]]πh^3, [[dh//dt]] = [[2//πh^2]] = [[1//8π]] = {1 / (8 * math.pi):.4f} cm s^{{−1}}", space=60)


# ==========================================================================
# Unit 10: Numerical methods
# ==========================================================================
def bisect(f, a, b):
    for _ in range(80):
        m = (a + b) / 2
        if f(a) * f(m) <= 0:
            b = m
        else:
            a = m
    return (a + b) / 2


def locating_roots(ws):
    ws.section("Practice")
    cases = [("x^3 − 3x − 5 = 0", lambda x: x ** 3 - 3 * x - 5, 2, 3), ("e^{x} − 4x = 0", lambda x: math.exp(x) - 4 * x, 2, 3),
             ("ln x + x − 3 = 0", lambda x: math.log(x) + x - 3, 2, 3), ("x^4 − 2x − 7 = 0", lambda x: x ** 4 - 2 * x - 7, 1, 2)]
    out = []
    for q, f, a, b in cases:
        assert f(a) * f(b) < 0
        out.append((f"Show that {q} has a root between {a} and {b}.", f"f({a}) = {dec(f(a), 3)}, f({b}) = {dec(f(b), 3)}: change of sign"))
    P(ws, "Use a change of sign.", out, cols=1, work=25)
    f = lambda x: x ** 3 - 3 * x - 5
    r = bisect(f, 2, 3)
    r2 = round(r, 2)
    ws.question(f"Show that the root of x^3 − 3x − 5 = 0 between 2 and 3 is {r2:.2f} to 2 d.p.",
                f"f({r2 - 0.005:.3f}) = {f(r2 - 0.005):.4f} and f({r2 + 0.005:.3f}) = {f(r2 + 0.005):.4f}: change of sign".replace("-", MINUS), space=50)
    assert f(r2 - 0.005) * f(r2 + 0.005) < 0
    ws.section("Problem solving")
    ws.question("Explain why a change of sign doesn't prove a root exists for f(x) = [[1//x − 2]] between 1 and 3.", "f is not continuous: it has an asymptote at x = 2", space=45)


def iteration(ws):
    ws.section("Practice")
    g = lambda x: (3 * x + 5) ** (1 / 3)
    xs = [2.0]
    for _ in range(4):
        xs.append(g(xs[-1]))
    ws.question("(a) Show that x^3 − 3x − 5 = 0 can be rearranged to x = ∛(3x + 5).\n(b) Use x_{n+1} = ∛(3x_{n} + 5) with x_{0} = 2 to find x_{1} to x_{4} to 4 d.p.",
                "(a) x^3 = 3x + 5  (b) " + ", ".join(f"{v:.4f}" for v in xs[1:]), space=70)
    h = lambda x: math.exp(-x) + 1
    ys = [1.0]
    for _ in range(4):
        ys.append(h(ys[-1]))
    ws.question("Use x_{n+1} = 1 + exp(−x_{n}) with x_{0} = 1 to find x_{4} to 4 d.p.", f"{ys[4]:.4f}", space=45)
    ws.section("Problem solving")
    ws.question("Explain the difference between a staircase diagram and a cobweb diagram for an iteration.", "Staircase: the values approach the root from one side; cobweb: they alternate either side", space=45)


def newton_raphson(ws):
    ws.section("Practice")
    f = lambda x: x ** 3 - 2 * x - 5
    fd = lambda x: 3 * x * x - 2
    xs = [2.0]
    for _ in range(3):
        xs.append(xs[-1] - f(xs[-1]) / fd(xs[-1]))
    ws.question("Use the Newton–Raphson method with x_{0} = 2 to find x_{1}, x_{2} and x_{3} for x^3 − 2x − 5 = 0, to 5 d.p.", ", ".join(f"{v:.5f}" for v in xs[1:]), space=60)
    g = lambda x: math.exp(x) - 3 * x
    gd = lambda x: math.exp(x) - 3
    ys = [1.5]
    for _ in range(3):
        ys.append(ys[-1] - g(ys[-1]) / gd(ys[-1]))
    ws.question("Use the Newton–Raphson method with x_{0} = 1.5 to find a root of e^{x} = 3x to 4 d.p.", f"{ys[-1]:.4f}", space=55)
    ws.section("Problem solving")
    ws.question("Explain why the Newton–Raphson method fails for x^3 − 3x + 1 = 0 starting at x_{0} = 1.", "f′(1) = 0: the tangent is horizontal, so you would divide by zero", space=45)


def numerical_modelling(ws):
    ws.section("Problem solving")
    h = lambda t: 30 * t - 4.9 * t * t + 5 * math.log(t + 1)
    root = bisect(lambda t: h(t) - 20, 0, 1)
    ws.question("The height of a model rocket is h = 30t − 4.9t^2 + 5 ln(t + 1) metres, t seconds after launch.\n(a) Show that h = 20 for some t between 0.5 and 1.\n"
                "(b) Use the Newton–Raphson method with t_{0} = 0.7 to find this time to 3 d.p.",
                f"(a) h(0.5) − 20 = {h(0.5) - 20:.3f}, h(1) − 20 = {h(1) - 20:.3f}: change of sign  (b) t = {root:.3f} s".replace("-", MINUS), space=100)
    k = bisect(lambda r: 1000 * (1 + r) ** 10 - 1500, 0.01, 0.1)
    ws.question("An investment of £1000 grows to £1500 in 10 years. Use a numerical method to find the annual interest rate to 2 d.p.",
                f"(1 + r)^{{10}} = 1.5: r = {k * 100:.2f}%", space=60)


# ==========================================================================
# Unit 11: Integration
# ==========================================================================
def integ_standard(ws):
    ws.section("Practice")
    I(ws, "Find", [
        ("∫ (3e^{x} + [[2//x]]) dx", "3e^{x} + 2 ln|x|", lambda x: 3 * math.exp(x) + 2 / x, lambda x: 3 * math.exp(x) + 2 * math.log(abs(x))),
        ("∫ (cos x − 4 sin x) dx", "sin x + 4 cos x", lambda x: math.cos(x) - 4 * math.sin(x), lambda x: math.sin(x) + 4 * math.cos(x)),
        ("∫ sec^2 x dx", "tan x", lambda x: 1 / math.cos(x) ** 2, math.tan),
        ("∫ ([[1//x]] + x^2) dx", "ln|x| + [[1//3]]x^3", lambda x: 1 / x + x * x, lambda x: math.log(abs(x)) + x ** 3 / 3),
        ("∫ cosec x cot x dx", "−cosec x", lambda x: 1 / math.sin(x) / math.tan(x), lambda x: -1 / math.sin(x)),
        ("∫ (e^{x} − sec x tan x) dx", "e^{x} − sec x", lambda x: math.exp(x) - math.tan(x) / math.cos(x), lambda x: math.exp(x) - 1 / math.cos(x))])
    ws.section("Problem solving")
    ws.question("Find the exact value of ∫_{1}^{e} [[3//x]] dx.", "3(ln e − ln 1) = 3", space=35)


def integ_axb(ws):
    ws.section("Practice")
    I(ws, "Find", [
        ("∫ e^{3x + 1} dx", "[[1//3]]e^{3x + 1}", lambda x: math.exp(3 * x + 1), lambda x: math.exp(3 * x + 1) / 3),
        ("∫ cos 2x dx", "[[1//2]] sin 2x", lambda x: math.cos(2 * x), lambda x: math.sin(2 * x) / 2),
        ("∫ [[1//2x + 3]] dx", "[[1//2]] ln|2x + 3|", lambda x: 1 / (2 * x + 3), lambda x: math.log(abs(2 * x + 3)) / 2),
        ("∫ (4x − 1)^5 dx", "[[1//24]](4x − 1)^6", lambda x: (4 * x - 1) ** 5, lambda x: (4 * x - 1) ** 6 / 24),
        ("∫ sec^2 3x dx", "[[1//3]] tan 3x", lambda x: 1 / math.cos(3 * x) ** 2, lambda x: math.tan(3 * x) / 3),
        ("∫ sin(5x − 2) dx", "−[[1//5]] cos(5x − 2)", lambda x: math.sin(5 * x - 2), lambda x: -math.cos(5 * x - 2) / 5)])
    ws.section("Problem solving")
    v = simpson(lambda x: math.exp(2 * x), 0, 1)
    assert abs(v - (math.e ** 2 - 1) / 2) < 1e-9
    ws.question("Find the exact value of ∫_{0}^{1} e^{2x} dx.", "[[1//2]](e^2 − 1)", space=35)


def integ_trig_identities(ws):
    ws.section("Practice")
    I(ws, "Find", [
        ("∫ sin^2 x dx", "[[1//2]]x − [[1//4]] sin 2x", lambda x: math.sin(x) ** 2, lambda x: x / 2 - math.sin(2 * x) / 4),
        ("∫ cos^2 x dx", "[[1//2]]x + [[1//4]] sin 2x", lambda x: math.cos(x) ** 2, lambda x: x / 2 + math.sin(2 * x) / 4),
        ("∫ tan^2 x dx", "tan x − x", lambda x: math.tan(x) ** 2, lambda x: math.tan(x) - x),
        ("∫ sin x cos x dx", "−[[1//4]] cos 2x", lambda x: math.sin(x) * math.cos(x), lambda x: -math.cos(2 * x) / 4),
        ("∫ (sin x + cos x)^2 dx", "x − [[1//2]] cos 2x", lambda x: (math.sin(x) + math.cos(x)) ** 2, lambda x: x - math.cos(2 * x) / 2),
        ("∫ cot^2 x dx", "−cot x − x", lambda x: 1 / math.tan(x) ** 2, lambda x: -1 / math.tan(x) - x)])
    ws.section("Problem solving")
    v = simpson(lambda x: math.sin(x) ** 2, 0, math.pi)
    assert abs(v - math.pi / 2) < 1e-9
    ws.question("Find the exact value of ∫_{0}^{π} sin^2 x dx.", "[[π//2]]", space=35)


def reverse_chain(ws):
    ws.section("Practice")
    I(ws, "Find", [
        ("∫ x(x^2 + 1)^4 dx", "[[1//10]](x^2 + 1)^5", lambda x: x * (x * x + 1) ** 4, lambda x: (x * x + 1) ** 5 / 10),
        ("∫ [[2x//x^2 + 3]] dx", "ln(x^2 + 3)", lambda x: 2 * x / (x * x + 3), lambda x: math.log(x * x + 3)),
        ("∫ cos x e^{sin x} dx", "e^{sin x}", lambda x: math.cos(x) * math.exp(math.sin(x)), lambda x: math.exp(math.sin(x))),
        ("∫ xe^{x²} dx", "[[1//2]]e^{x²}", lambda x: x * math.exp(x * x), lambda x: math.exp(x * x) / 2),
        ("∫ [[cos x//sin x]] dx", "ln|sin x|", lambda x: math.cos(x) / math.sin(x), lambda x: math.log(abs(math.sin(x)))),
        ("∫ x^2 √(x^3 + 1) dx", "[[2//9]](x^3 + 1)^{3/2}", lambda x: x * x * math.sqrt(x ** 3 + 1), lambda x: 2 / 9 * (x ** 3 + 1) ** 1.5)])
    ws.section("Problem solving")
    ws.question("Show that ∫ tan x dx = ln|sec x| + c.", "tan x = [[sin x//cos x]] = −[[−sin x//cos x]]: −ln|cos x| = ln|sec x|", space=45)


def substitution(ws):
    ws.section("Practice")
    I(ws, "Use the given substitution to find", [
        ("∫ x√(x + 1) dx, u = x + 1", "[[2//5]](x + 1)^{5/2} − [[2//3]](x + 1)^{3/2}", lambda x: x * math.sqrt(x + 1), lambda x: 0.4 * (x + 1) ** 2.5 - (2 / 3) * (x + 1) ** 1.5),
        ("∫ [[x//√(2x − 1)]] dx, u = 2x − 1", "[[1//6]](2x − 1)^{3/2} + [[1//2]](2x − 1)^{1/2}", lambda x: x / math.sqrt(2 * x - 1), lambda x: (2 * x - 1) ** 1.5 / 6 + (2 * x - 1) ** 0.5 / 2),
        ("∫ sin^3 x cos x dx, u = sin x", "[[1//4]] sin^4 x", lambda x: math.sin(x) ** 3 * math.cos(x), lambda x: math.sin(x) ** 4 / 4)], cols=1)
    v = simpson(lambda x: x * (2 * x + 1) ** 3, 0, 1)
    exact = F(v).limit_denominator(1000)
    assert abs(float(exact) - v) < 1e-9
    ws.question("Use u = 2x + 1 to find the exact value of ∫_{0}^{1} x(2x + 1)^3 dx.", fr(exact), space=55)
    ws.section("Problem solving")
    ws.question("Explain why the limits must change when you substitute in a definite integral.", "The limits are values of x; after substituting, the integral is in terms of u, so use the matching u values", space=45)


def by_parts(ws):
    ws.section("Practice")
    I(ws, "Use integration by parts to find", [
        ("∫ xe^{x} dx", "xe^{x} − e^{x}", lambda x: x * math.exp(x), lambda x: x * math.exp(x) - math.exp(x)),
        ("∫ x cos x dx", "x sin x + cos x", lambda x: x * math.cos(x), lambda x: x * math.sin(x) + math.cos(x)),
        ("∫ ln x dx", "x ln x − x", math.log, lambda x: x * math.log(x) - x),
        ("∫ x^2 e^{x} dx", "e^{x}(x^2 − 2x + 2)", lambda x: x * x * math.exp(x), lambda x: math.exp(x) * (x * x - 2 * x + 2)),
        ("∫ x sin 2x dx", "−[[1//2]]x cos 2x + [[1//4]] sin 2x", lambda x: x * math.sin(2 * x), lambda x: -x * math.cos(2 * x) / 2 + math.sin(2 * x) / 4),
        ("∫ x^3 ln x dx", "[[1//4]]x^4 ln x − [[1//16]]x^4", lambda x: x ** 3 * math.log(x), lambda x: x ** 4 * math.log(x) / 4 - x ** 4 / 16)])
    ws.section("Problem solving")
    v = simpson(lambda x: x * math.exp(x), 0, 1)
    assert abs(v - 1) < 1e-9
    ws.question("Find the exact value of ∫_{0}^{1} xe^{x} dx.", "[xe^{x} − e^{x}] from 0 to 1 = 0 − (−1) = 1", space=40)


def integ_partial(ws):
    ws.section("Practice")
    I(ws, "Use partial fractions to find", [
        ("∫ [[1//(x + 1)(x + 2)]] dx", "ln|x + 1| − ln|x + 2|", lambda x: 1 / ((x + 1) * (x + 2)), lambda x: math.log(abs(x + 1)) - math.log(abs(x + 2))),
        ("∫ [[5x + 1//(x − 1)(x + 2)]] dx", "2 ln|x − 1| + 3 ln|x + 2|", lambda x: (5 * x + 1) / ((x - 1) * (x + 2)), lambda x: 2 * math.log(abs(x - 1)) + 3 * math.log(abs(x + 2))),
        ("∫ [[4//x^2 − 4]] dx", "ln|x − 2| − ln|x + 2|", lambda x: 4 / (x * x - 4), lambda x: math.log(abs(x - 2)) - math.log(abs(x + 2))),
        ("∫ [[3x//(x + 1)^2]] dx", "3 ln|x + 1| + [[3//x + 1]]", lambda x: 3 * x / (x + 1) ** 2, lambda x: 3 * math.log(abs(x + 1)) + 3 / (x + 1))], cols=1)
    v = simpson(lambda x: 3 / ((x - 1) * (x + 2)), 2, 4)
    assert abs(v - math.log(2)) < 1e-9
    ws.question("Show that ∫_{2}^{4} [[3//(x − 1)(x + 2)]] dx = ln 2.", "[ln|x − 1| − ln|x + 2|] from 2 to 4 = ln [[3//6]] − ln [[1//4]] = ln 2", space=50)
    ws.section("Problem solving")
    ws.question("Explain why ∫ [[1//x^2 + 4]] dx can't be done with partial fractions over the real numbers.", "x^2 + 4 doesn't factorise into real linear factors", space=40)


def finding_areas(ws):
    ws.section("Practice")
    cases = [("y = sin x, from x = 0 to x = π", lambda x: math.sin(x), 0, math.pi, "2"), ("y = [[1//x]], from x = 1 to x = e", lambda x: 1 / x, 1, math.e, "1"),
             ("y = e^{x}, from x = 0 to x = ln 3", math.exp, 0, math.log(3), "2"), ("y = xe^{x}, from x = 0 to x = 2", lambda x: x * math.exp(x), 0, 2, "e^2 + 1")]
    for q, f, a, b, ans in cases:
        val = {"2": 2, "1": 1, "e^2 + 1": math.e ** 2 + 1}[ans]
        assert abs(simpson(f, a, b) - val) < 1e-8, q
    P(ws, "Find the exact area between each curve and the x-axis.", [(q, a) for q, _, _, _, a in cases], cols=1)
    ws.section("Problem solving")
    ws.question("Find the area enclosed between y = sin x and y = cos x for [[π//4]] ≤ x ≤ [[5π//4]].", "∫(sin x − cos x) dx = 2√2", space=45)
    assert abs(simpson(lambda x: math.sin(x) - math.cos(x), math.pi / 4, 5 * math.pi / 4) - 2 * math.sqrt(2)) < 1e-9


def trapezium(ws):
    ws.section("Practice")
    def trap(f, a, b, n):
        h = (b - a) / n
        return h / 2 * (f(a) + f(b) + 2 * sum(f(a + k * h) for k in range(1, n)))
    cases = [("∫_{0}^{2} √(1 + x^3) dx", lambda x: math.sqrt(1 + x ** 3), 0, 2, 4), ("∫_{1}^{3} ln x dx", math.log, 1, 3, 4),
             ("∫_{0}^{1} e^{x²} dx", lambda x: math.exp(x * x), 0, 1, 5)]
    P(ws, "Use the trapezium rule with the given number of strips to estimate each integral, to 4 s.f.",
      [(f"{q} with {n} strips", sf(trap(f, a, b, n), 4)) for q, f, a, b, n in cases], cols=1)
    exact = 3 * math.log(3) - 2
    ws.question("(a) Find ∫_{1}^{3} ln x dx exactly.\n(b) Find the percentage error in your estimate from Question 1(b).",
                f"(a) 3 ln 3 − 2 = {exact:.4f}  (b) {abs(trap(math.log, 1, 3, 4) - exact) / exact * 100:.2f}%", space=55)
    ws.section("Problem solving")
    ws.question("Explain why the trapezium rule underestimates ∫ ln x dx.", "ln x is concave, so the straight tops of the trapezia lie below the curve", space=40)


def solving_des(ws):
    ws.section("Practice")
    P(ws, "Find the general solution.", [("[[dy//dx]] = 2xy", "y = Ae^{x²}"), ("[[dy//dx]] = [[y//x]]", "y = Ax"), ("[[dy//dx]] = e^{x − y}", "e^{y} = e^{x} + c"),
                                          ("[[dy//dx]] = y^2 cos x", "−[[1//y]] = sin x + c"), ("[[dy//dx]] = 3y", "y = Ae^{3x}"), ("x[[dy//dx]] = y + 1", "y = Ax − 1")])
    # check each general solution satisfies its equation for a sample constant
    sols = [(lambda x: 2 * math.exp(x * x), lambda x, y: 2 * x * y), (lambda x: 3 * x, lambda x, y: y / x), (lambda x: math.log(math.exp(x) + 1), lambda x, y: math.exp(x - y)),
            (lambda x: -1 / (math.sin(x) + 2), lambda x, y: y * y * math.cos(x)), (lambda x: 5 * math.exp(3 * x), lambda x, y: 3 * y), (lambda x: 4 * x - 1, lambda x, y: (y + 1) / x)]
    for yf, rhs in sols:
        for x in SAMPLES:
            assert abs(slope(yf, x) - rhs(x, yf(x))) < 1e-4 * max(1, abs(rhs(x, yf(x)))), "DE solution check failed"
    ws.question("Solve [[dy//dx]] = 2xy given that y = 3 when x = 0.", "y = 3e^{x²}", space=40)
    ws.section("Problem solving")
    ws.question("Find the particular solution of [[dy//dx]] = [[y//x]] that passes through (2, 5).", "y = [[5//2]]x", space=40)


def modelling_des(ws):
    ws.section("Problem solving")
    k = math.log(70 / 40) / 5
    t = math.log(70 / 10) / k
    ws.question("Tea cools according to [[dT//dt]] = −k(T − 20). It starts at 90 °C and is 60 °C after 5 minutes.\n(a) Show that T = 20 + 70e^{−kt}.\n(b) Find k to 4 s.f.\n(c) When will it be 30 °C?",
                f"(a) separate: ln|T − 20| = −kt + c  (b) k = [[1//5]] ln [[7//4]] = {k:.4f}  (c) t = [[ln 7//k]] = {t:.1f} minutes", space=100)
    r = math.log(2) / 3
    ws.question("A population P grows at a rate proportional to its size. It doubles every 3 years and starts at 500.\n(a) Write a differential equation and solve it.\n(b) Find P after 10 years.",
                f"(a) [[dP//dt]] = kP, P = 500e^{{kt}}, k = [[ln 2//3]] = {r:.4f}  (b) {500 * math.exp(r * 10):.0f}", space=90)
    ws.question("Explain one limitation of the population model above.", "Growth can't continue forever: food and space are limited", space=40)


def limit_of_sum(ws):
    ws.section("Practice")
    f = lambda x: x * x
    sums = {n: sum(f(1 + k * (2 / n)) * (2 / n) for k in range(n)) for n in (4, 10, 100)}
    ws.question("The area under y = x^2 from x = 1 to x = 3 is estimated using n rectangles of width [[2//n]], with heights taken at the left of each strip.\n"
                "(a) Find the estimates for n = 4, 10 and 100.\n(b) Find the exact area.\n(c) Explain what happens as n increases.",
                f"(a) {', '.join(f'{sums[n]:.4f}' for n in (4, 10, 100))}  (b) [[26//3]] = {26 / 3:.4f}  (c) the estimates approach the exact value: ∫ is the limit of the sum", space=100)
    ws.section("Problem solving")
    ws.question("Write lim_{δx→0} Σ_{x=0}^{2} (3x^2 + 1) δx as an integral and evaluate it.", "∫_{0}^{2} (3x^2 + 1) dx = 10", space=45)


# ==========================================================================
# Unit 12: Vectors in three dimensions
# ==========================================================================
def v3(a, b, c):
    out = []
    for v, u in ((a, "i"), (b, "j"), (c, "k")):
        if v == 0:
            continue
        t = ("" if abs(v) == 1 else fr(abs(v))) + u
        out.append((MINUS if v < 0 else "+", t))
    s = ""
    for i, (sg, t) in enumerate(out):
        s += (MINUS if sg == MINUS else "") + t if i == 0 else f" {sg} {t}"
    return s or "0"


def coords_3d(ws):
    ws.section("Practice")
    pairs = [((1, 2, 3), (4, 6, 15)), ((-2, 0, 5), (1, 4, 5)), ((3, -1, 2), (5, 1, 3)), ((0, 0, 0), (2, -3, 6))]
    P(ws, "Find the distance between each pair of points, exactly.", [(f"{pt(a)} and {pt(b)}", sqrt_text(sum((q - p) ** 2 for p, q in zip(a, b)))) for a, b in pairs])
    ws.section("Problem solving")
    ws.question("The point (k, 3, 1) is 7 units from (2, −3, −1). Find the possible values of k.", "(k − 2)^2 + 36 + 4 = 49, k − 2 = ±3: k = 5 or k = −1", space=45)


def vectors_3d(ws):
    ws.section("Practice")
    vs = [(2, -1, 2), (1, 4, -8), (3, 0, -4), (-6, 2, 3)]
    P(ws, "Find the magnitude and a unit vector in the direction of each vector.",
      [(v3(*v), f"{sqrt_text(sum(c * c for c in v))}; [[1//{sqrt_text(sum(c * c for c in v))}]]({v3(*v)})") for v in vs], cols=1)
    v = (2, -1, 2)
    P(ws, f"Find the angle that {v3(*v)} makes with each axis, to 1 d.p.", [(f"the {ax}-axis", f"{math.degrees(math.acos(c / 3)):.1f}°") for ax, c in zip("xyz", v)], cols=3)
    ws.section("Problem solving")
    ws.question("a = 2i + j − k and b = i − 3j + 2k. Find |2a − b|.", f"2a − b = 3i + 5j − 4k, |2a − b| = {sqrt_text(9 + 25 + 16)}", space=40)


def geometry_3d(ws):
    ws.section("Problem solving")
    ws.question("A(1, 2, 0), B(4, 3, 2) and C(2, 5, 3). Find the position vector of D so that ABCD is a parallelogram.", "d = a + c − b = −i + 4j + k", space=45)
    ws.question("Show that P(1, −1, 2), Q(3, 3, 5) and R(7, 11, 11) are collinear.", "PQ = 2i + 4j + 3k, QR = 4i + 8j + 6k = 2PQ", space=45)
    ws.question("Find the midpoint of A(2, −4, 7) and B(6, 0, −1), and the distance AB.", f"(4, −2, 3); AB = {sqrt_text(16 + 16 + 64)}", space=45)
    ws.question("Triangle ABC has A(0, 0, 0), B(3, 0, 4) and C(3, 5, 4). Show it is right-angled and find its area.",
                "AB = 5, BC = 5, AC = √50: AB^2 + BC^2 = AC^2, so the right angle is at B; area [[25//2]]", space=55)


def vectors_mechanics_3d(ws):
    ws.section("Problem solving")
    ws.question("Forces (2i + j − 3k) N, (i − 4j + 2k) N and (3i + 2j + 5k) N act on a particle of mass 2 kg.\n(a) Find the resultant force.\n(b) Find the magnitude of the acceleration.",
                f"(a) 6i − j + 4k N  (b) a = [[1//2]](6i − j + 4k), |a| = [[√53//2]] = {math.sqrt(53) / 2:.2f} m s^{{−2}}", space=80)
    ws.question("A drone moves from (0, 0, 10) with constant velocity (3i + 4j − 2k) m s^{−1}. Find its position after 4 s and its speed.",
                "(12, 16, 2); speed √29 m s^{−1}", space=50)


# ==========================================================================
# Exam preparation: mixed practice
# ==========================================================================
def mixed_1(ws):
    ws.section("Practice")
    P(ws, "Answer each question. They are from across Years 12 and 13.", [
        ("Solve 2^{x + 1} = 7, to 3 s.f.", f"x = {sf(math.log(7) / math.log(2) - 1)}"),
        ("Differentiate y = x^2 sin x.", "2x sin x + x^2 cos x"),
        ("Find ∫_{0}^{2} (3x^2 − 2x) dx.", "4"),
        ("Find the centre and radius of x^2 + y^2 − 6x + 4y = 3.", "(3, −2), 4"),
        ("Find the sum to infinity of 18 − 6 + 2 − …", "[[27//2]]"),
        ("Express [[x + 7//(x − 1)(x + 2)]] in partial fractions.", "[[8//3(x − 1)]] − [[5//3(x + 2)]]"),
        ("Solve |2x − 3| < 5.", "−1 < x < 4"),
        ("Find the coefficient of x^3 in (2 − x)^6.", "−160")], cols=1, work=30)
    assert abs(simpson(lambda x: 3 * x * x - 2 * x, 0, 2) - 4) < 1e-9
    assert all(abs((x + 7) / ((x - 1) * (x + 2)) - (8 / 3 / (x - 1) - 5 / 3 / (x + 2))) < 1e-9 for x in (0.3, 2.5, 4))
    ws.section("Problem solving")
    ws.question("The curve y = x^3 − 3x^2 − 9x + 5 has two stationary points. Find them and decide their nature.", "3x^2 − 6x − 9 = 0, x = −1 or 3: (−1, 10) maximum; (3, −22) minimum", space=70)


def mixed_2(ws):
    ws.section("Problem solving")
    k = math.log(2) / 5
    ws.question("A radioactive substance decays so that [[dm//dt]] = −km. Its half-life is 5 years and it starts at 80 g.\n(a) Find m in terms of t.\n(b) After how long is 10 g left?",
                f"(a) m = 80e^{{−kt}}, k = [[ln 2//5]]  (b) [[ln 8//k]] = 15 years", space=85)
    ws.question("Prove that the product of any two consecutive integers is even.", "n(n + 1): one of n, n + 1 is even", space=45)
    ws.question("A curve has parametric equations x = 2t^2, y = 4t. Find the equation of the normal at t = 1 and where it meets the curve again.",
                "[[dy//dx]] = [[1//t]] = 1, normal y = −x + 6; 4t = −2t^2 + 6 gives t = −3: (18, −12)", space=70)
    ws.question("Use the substitution u = e^{x} to find ∫ [[e^{x}//1 + e^{x}]] dx, then evaluate it from 0 to ln 3.", "ln(1 + e^{x}) + c; ln 4 − ln 2 = ln 2", space=60)
    assert abs(simpson(lambda x: math.exp(x) / (1 + math.exp(x)), 0, math.log(3)) - math.log(2)) < 1e-9


SHEETS = [
    ({"slug": "alevel-addition-formulae", "title": "A level: Addition formulae", "lesson": "y13-u7-l1"}, addition_formulae),
    ({"slug": "alevel-using-addition-formulae", "title": "A level: Using the addition formulae", "lesson": "y13-u7-l2"}, using_addition),
    ({"slug": "alevel-double-angle-formulae", "title": "A level: Double-angle formulae", "lesson": "y13-u7-l3"}, double_angle),
    ({"slug": "alevel-trig-equations-y13", "title": "A level: Solving trigonometric equations with identities", "lesson": "y13-u7-l4"}, solving_y13),
    ({"slug": "alevel-r-cos-form", "title": "A level: Simplifying a cos x ± b sin x", "lesson": "y13-u7-l5"}, r_form),
    ({"slug": "alevel-proving-trig-identities", "title": "A level: Proving trigonometric identities", "lesson": "y13-u7-l6"}, proving_identities),
    ({"slug": "alevel-modelling-trig", "title": "A level: Modelling with trigonometric functions", "lesson": "y13-u7-l7"}, trig_modelling),
    ({"slug": "alevel-parametric-equations", "title": "A level: Parametric equations", "lesson": "y13-u8-l1"}, parametric),
    ({"slug": "alevel-parametric-trig", "title": "A level: Parametric equations with trigonometric identities", "lesson": "y13-u8-l2"}, parametric_trig),
    ({"slug": "alevel-parametric-sketching", "title": "A level: Sketching parametric curves", "lesson": "y13-u8-l3"}, parametric_sketch),
    ({"slug": "alevel-parametric-intersections", "title": "A level: Parametric curves: points of intersection", "lesson": "y13-u8-l4"}, parametric_intersections),
    ({"slug": "alevel-parametric-modelling", "title": "A level: Modelling with parametric equations", "lesson": "y13-u8-l5"}, parametric_modelling),
    ({"slug": "alevel-differentiating-sin-cos", "title": "A level: Differentiating sin x and cos x", "lesson": "y13-u9-l1"}, diff_sin_cos),
    ({"slug": "alevel-differentiating-exp-log", "title": "A level: Differentiating exponentials and logarithms", "lesson": "y13-u9-l2"}, diff_exp_log),
    ({"slug": "alevel-chain-rule", "title": "A level: The chain rule", "lesson": "y13-u9-l3"}, chain_rule),
    ({"slug": "alevel-product-rule", "title": "A level: The product rule", "lesson": "y13-u9-l4"}, product_rule),
    ({"slug": "alevel-quotient-rule", "title": "A level: The quotient rule", "lesson": "y13-u9-l5"}, quotient_rule),
    ({"slug": "alevel-differentiating-trig", "title": "A level: Differentiating trigonometric functions", "lesson": "y13-u9-l6"}, diff_trig),
    ({"slug": "alevel-parametric-differentiation", "title": "A level: Parametric differentiation", "lesson": "y13-u9-l7"}, parametric_diff),
    ({"slug": "alevel-implicit-differentiation", "title": "A level: Implicit differentiation", "lesson": "y13-u9-l8"}, implicit),
    ({"slug": "alevel-concavity-inflection", "title": "A level: Second derivatives, concavity and inflection", "lesson": "y13-u9-l9"}, second_deriv_y13),
    ({"slug": "alevel-connected-rates-of-change", "title": "A level: Rates of change", "lesson": "y13-u9-l10"}, rates_of_change),
    ({"slug": "alevel-locating-roots", "title": "A level: Locating roots", "lesson": "y13-u10-l1"}, locating_roots),
    ({"slug": "alevel-iteration", "title": "A level: Iteration", "lesson": "y13-u10-l2"}, iteration),
    ({"slug": "alevel-newton-raphson", "title": "A level: The Newton–Raphson method", "lesson": "y13-u10-l3"}, newton_raphson),
    ({"slug": "alevel-numerical-modelling", "title": "A level: Numerical methods in modelling", "lesson": "y13-u10-l4"}, numerical_modelling),
    ({"slug": "alevel-integrating-standard-functions", "title": "A level: Integrating standard functions", "lesson": "y13-u11-l1"}, integ_standard),
    ({"slug": "alevel-integrating-f-ax-b", "title": "A level: Integrating f(ax + b)", "lesson": "y13-u11-l2"}, integ_axb),
    ({"slug": "alevel-integration-trig-identities", "title": "A level: Integration using trigonometric identities", "lesson": "y13-u11-l3"}, integ_trig_identities),
    ({"slug": "alevel-reverse-chain-rule", "title": "A level: The reverse chain rule", "lesson": "y13-u11-l4"}, reverse_chain),
    ({"slug": "alevel-integration-by-substitution", "title": "A level: Integration by substitution", "lesson": "y13-u11-l5"}, substitution),
    ({"slug": "alevel-integration-by-parts", "title": "A level: Integration by parts", "lesson": "y13-u11-l6"}, by_parts),
    ({"slug": "alevel-integration-partial-fractions", "title": "A level: Integration using partial fractions", "lesson": "y13-u11-l7"}, integ_partial),
    ({"slug": "alevel-finding-areas", "title": "A level: Finding areas by integration", "lesson": "y13-u11-l8"}, finding_areas),
    ({"slug": "alevel-trapezium-rule", "title": "A level: The trapezium rule", "lesson": "y13-u11-l9"}, trapezium),
    ({"slug": "alevel-solving-differential-equations", "title": "A level: Solving differential equations", "lesson": "y13-u11-l10"}, solving_des),
    ({"slug": "alevel-modelling-differential-equations", "title": "A level: Modelling with differential equations", "lesson": "y13-u11-l11"}, modelling_des),
    ({"slug": "alevel-integration-limit-of-sum", "title": "A level: Integration as the limit of a sum", "lesson": "y13-u11-l12"}, limit_of_sum),
    ({"slug": "alevel-3d-coordinates", "title": "A level: 3D coordinates", "lesson": "y13-u12-l1"}, coords_3d),
    ({"slug": "alevel-vectors-3d", "title": "A level: Vectors in 3D", "lesson": "y13-u12-l2"}, vectors_3d),
    ({"slug": "alevel-3d-geometric-problems", "title": "A level: Solving geometric problems in 3D", "lesson": "y13-u12-l3"}, geometry_3d),
    ({"slug": "alevel-3d-vectors-mechanics", "title": "A level: 3D vectors in mechanics", "lesson": "y13-u12-l4"}, vectors_mechanics_3d),
    ({"slug": "alevel-pure-mixed-practice", "title": "A level: Pure mixed practice", "lesson": "y13-u21-l4"}, mixed_1),
    ({"slug": "alevel-pure-problem-solving", "title": "A level: Pure problem solving and modelling", "lesson": "y13-u21-l1"}, mixed_2),
]

for _meta, _ in SHEETS:
    _meta.setdefault("topic", TOPIC)
    _meta.setdefault("level", LEVEL)
