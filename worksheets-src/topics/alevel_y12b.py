"""A level Year 12 Pure, units 7–12: the binomial expansion, trigonometry,
vectors, differentiation, integration, and exponentials and logarithms.

Answers are calculated from the question's own numbers. Trigonometric
equations are solved by scanning the whole interval for every solution
(engine/calc.py: deg_solutions), so no solution can be missed."""
from fractions import Fraction as F
import math
from engine.draw import axes
from engine.charts import chart
from engine.calc import Poly, X, fr, dec, sf, MINUS, signed, power_text, deg_solutions, sind, cosd, tand, ncr
from topics.alevel_common import LEVEL, TOPIC, P, m, Surd, sqrt_text, quad_roots, quad_roots_float, line_y, line_general, pt


def angles_text(sols, dp=1):
    """A list of angles in degrees, e.g. '30°, 150°' (1 d.p. unless whole)."""
    out = []
    for s in sols:
        r = round(s)
        out.append(f"{r}°" if abs(s - r) < 1e-6 else f"{s:.{dp}f}°")
    return ", ".join(out) if out else "no solutions"


# ==========================================================================
# Unit 7: The binomial expansion
# ==========================================================================
def pascal(ws):
    ws.section("Practice")
    P(ws, "Write down the row of Pascal's triangle needed to expand", [(f"(a + b)^{n}", ", ".join(str(ncr(n, r)) for r in range(n + 1))) for n in (3, 4, 5, 6)])
    ex = [("(1 + x)^4", (Poly({0: 1, 1: 1})) ** 4), ("(x + 2)^3", Poly({1: 1, 0: 2}) ** 3), ("(1 − x)^5", Poly({0: 1, 1: -1}) ** 5),
          ("(2 + x)^4", Poly({0: 2, 1: 1}) ** 4)]
    P(ws, "Use Pascal's triangle to expand.", [(q, p.text(order="asc")) for q, p in ex], cols=1)
    ws.section("Problem solving")
    ws.question("The coefficient of x^2 in (1 + x)^n is 28. Find n.", "nC2 = [[n(n − 1)//2]] = 28, so n = 8", space=45)


def combinations(ws):
    ws.section("Practice")
    P(ws, "Work out without a calculator.", [("5!", str(math.factorial(5))), ("[[7!//5!]]", str(7 * 6)), ("[[10!//8! 2!]]", str(ncr(10, 2))),
                                            ("^{6}C_{2}", str(ncr(6, 2))), ("^{8}C_{3}", str(ncr(8, 3))), ("^{9}C_{9}", "1")], cols=3)
    P(ws, "Simplify.", [("[[n!//(n − 1)!]]", "n"), ("[[(n + 1)!//(n − 1)!]]", "n(n + 1)"), ("^{n}C_{2}", "[[n(n − 1)//2]]")], cols=3)
    ws.section("Problem solving")
    ws.question("How many ways can a team of 4 be chosen from 10 people? Explain why the answer is ^{10}C_{4}.",
                f"{ncr(10, 4)}: order doesn't matter when choosing a team", space=45)


def binomial_expansion(ws):
    ws.section("Practice")
    ex = [("(1 + 2x)^5", Poly({0: 1, 1: 2}) ** 5), ("(3 − x)^4", Poly({0: 3, 1: -1}) ** 4), ("(2x − 1)^4", Poly({1: 2, 0: -1}) ** 4),
          ("(1 + [[x//2]])^6", Poly({0: 1, 1: F(1, 2)}) ** 6)]
    P(ws, "Expand fully, in ascending powers of x.", [(q, p.text(order="asc")) for q, p in ex], cols=1, work=25)
    first = [("(1 − 3x)^8", Poly({0: 1, 1: -3}) ** 8), ("(2 + x)^7", Poly({0: 2, 1: 1}) ** 7), ("(4 − [[x//2]])^5", Poly({0: 4, 1: F(-1, 2)}) ** 5)]
    def first4(p):
        return Poly({k: v for k, v in p.t.items() if k <= 3}).text(order="asc")
    P(ws, "Find the first four terms, in ascending powers of x.", [(q, first4(p)) for q, p in first], cols=1)
    ws.section("Problem solving")
    ws.question("Expand (x + [[1//x]])^4 and simplify each term.", "x^4 + 4x^2 + 6 + 4x^{−2} + x^{−4}", space=45)


def finding_coefficients(ws):
    ws.section("Practice")
    def coef(a, b, n, k):
        return F(ncr(n, k)) * F(a) ** (n - k) * F(b) ** k
    qs = [((2, 3), 6, 3), ((1, -2), 8, 2), ((3, 1), 5, 4), ((1, F(1, 2)), 10, 3), ((4, -1), 6, 5), ((2, -5), 4, 2)]
    P(ws, "Find the coefficient of the given power of x.", [
        (f"x^{k} in ({fr(a)} {signed(b)}x)^{n}".replace("1x", "x") if abs(b) == 1 else f"x^{k} in ({fr(a)} {signed(b)}x)^{n}", fr(coef(a, b, n, k)))
        for (a, b), n, k in qs])
    ws.section("Problem solving")
    ws.question("The coefficient of x^2 in (1 + ax)^6 is 60. Find the possible values of a.", "15a^2 = 60, a = ±2", space=40)
    ws.question("Find the term independent of x in (2x + [[1//x]])^6.", f"^{{6}}C_{{3}} × 2^3 = {ncr(6, 3) * 8}", space=45)


def binomial_estimation(ws):
    ws.section("Practice")
    p = Poly({0: 1, 1: F(-1, 4)}) ** 10
    first3 = Poly({k: v for k, v in p.t.items() if k <= 2})
    est = float(first3(F(1, 5)))
    ws.question("(a) Find the first three terms of (1 − [[x//4]])^10 in ascending powers of x.\n(b) Use x = 0.2 to estimate 0.95^10.\n"
                "(c) Find the percentage error of your estimate.",
                f"(a) {first3.text(order='asc')}  (b) {est:.4f}  (c) actual {0.95 ** 10:.4f}, error {abs(est - 0.95 ** 10) / 0.95 ** 10 * 100:.2f}%", space=80)
    q = Poly({0: 1, 1: 2}) ** 8
    q3 = Poly({k: v for k, v in q.t.items() if k <= 3})
    ws.question("(a) Find the first four terms of (1 + 2x)^8.\n(b) Use them with a suitable x to estimate 1.02^8, to 5 d.p.",
                f"(a) {q3.text(order='asc')}  (b) x = 0.01: {float(q3(F(1, 100))):.5f} (actual {1.02 ** 8:.5f})", space=70)
    ws.section("Problem solving")
    ws.question("Explain why the estimate in Question 1 is better for small x.", "Later terms contain higher powers of x, which are very small, so leaving them out matters less", space=45)


# ==========================================================================
# Unit 8: Trigonometry
# ==========================================================================
def cosine_rule(ws):
    ws.section("Practice")
    sides = [(8, 11, 40), (5.2, 7.4, 115), (12, 9, 63), (6, 6, 30)]
    P(ws, "Find the third side, a, of each triangle, to 3 s.f. (b and c are the other sides; A is the angle between them.)",
      [(f"b = {b} cm, c = {c} cm, A = {A}°", f"{sf(math.sqrt(b * b + c * c - 2 * b * c * cosd(A)))} cm") for b, c, A in sides])
    tri = [(7, 8, 9), (5, 6, 10), (12, 13, 5), (4.5, 6.2, 7.1)]
    P(ws, "Find the largest angle of each triangle, to 1 d.p.",
      [(f"sides {a} cm, {b} cm, {c} cm", f"{math.degrees(math.acos((a * a + b * b - c * c) / (2 * a * b))):.1f}°") for a, b, c in tri])
    ws.section("Problem solving")
    d = math.sqrt(12 ** 2 + 9 ** 2 - 2 * 12 * 9 * cosd(110))
    ws.question("Two boats leave a harbour. One sails 12 km on a bearing of 040°, the other 9 km on a bearing of 150°. How far apart are they?",
                f"angle between = 110°: {sf(d)} km", space=55)


def sine_rule(ws):
    ws.section("Practice")
    cs = [(50, 65, 8), (38, 104, 12.5), (72, 41, 15)]
    P(ws, "Angles A and B and side a are given. Find side b to 3 s.f.",
      [(f"A = {A}°, B = {B}°, a = {a} cm", f"{sf(a * sind(B) / sind(A))} cm") for A, B, a in cs])
    cs2 = [(9, 12, 35), (14, 10, 70), (7.5, 6.8, 48)]
    P(ws, "Sides a and b and angle A are given (A is opposite a). Find the acute angle B to 1 d.p.",
      [(f"a = {a} cm, b = {b} cm, A = {A}°", f"{math.degrees(math.asin(b * sind(A) / a)):.1f}°") for a, b, A in cs2])
    ws.section("Problem solving")
    ws.question("In triangle ABC, AB = 8 cm, AC = 6 cm and angle ABC = 40°. Show there are two possible values of angle ACB, and find them.",
                f"sin C = [[8 sin 40°//6]] = {8 * sind(40) / 6:.4f}: C = {math.degrees(math.asin(8 * sind(40) / 6)):.1f}° or {180 - math.degrees(math.asin(8 * sind(40) / 6)):.1f}°", space=60)


def triangle_areas(ws):
    ws.section("Practice")
    cs = [(7, 9, 50), (12, 5, 120), (8.4, 6.2, 34), (10, 10, 90)]
    P(ws, "Find the area of each triangle to 3 s.f.", [(f"a = {a} cm, b = {b} cm, C = {C}°", f"{sf(0.5 * a * b * sind(C))} cm^2") for a, b, C in cs])
    ws.section("Problem solving")
    ws.question("A triangle has sides 6 cm and 9 cm and area 20 cm^2. Find the two possible sizes of the angle between them.",
                f"sin C = [[40//54]]: C = {math.degrees(math.asin(40 / 54)):.1f}° or {180 - math.degrees(math.asin(40 / 54)):.1f}°", space=50)
    ws.question("Find the exact area of an equilateral triangle with side 4 cm.", "[[1//2]] × 4 × 4 × sin 60° = 4√3 cm^2", space=40)


def triangle_problems(ws):
    ws.section("Problem solving")
    # quadrilateral split into two triangles
    bd = math.sqrt(7 ** 2 + 10 ** 2 - 2 * 7 * 10 * cosd(65))
    ws.question("In quadrilateral ABCD, AB = 7 cm, AD = 10 cm, angle BAD = 65°, BC = 9 cm and angle BCD = 80°.\n(a) Find BD.\n(b) Find angle BDC.",
                f"(a) BD = {sf(bd)} cm  (b) sin BDC = [[9 sin 80°//BD]], BDC = {math.degrees(math.asin(9 * sind(80) / bd)):.1f}°", space=90)
    h = 50 * sind(32) * sind(20) / sind(12)
    ws.question("From a point A, the angle of elevation of the top of a tower is 20°. From B, 50 m closer, it is 32°. Find the height of the tower.",
                f"Angle at the top = 12°; distance from B to the top = [[50 sin 20°//sin 12°]]; height = that × sin 32° = {sf(h)} m", space=90)
    ws.question("A ship sails 15 km on a bearing of 070°, then 22 km on a bearing of 160°. Find its distance and bearing from the start.",
                f"Right angle at the turn: distance √(15^2 + 22^2) = {sf(math.hypot(15, 22))} km; bearing 070° + {math.degrees(math.atan(22 / 15)):.1f}° = {70 + math.degrees(math.atan(22 / 15)):.1f}°", space=90)


def trig_graphs(ws):
    ws.section("Practice")
    sine = [(t, math.sin(math.radians(t))) for t in range(0, 361, 3)]
    ws.question("The graph shows y = sin x for 0° ≤ x ≤ 360°.\n(a) Write down its maximum and minimum values.\n(b) Write down the period.\n"
                "(c) Use the graph to find two solutions of sin x = 0.5.",
                "(a) 1 and −1  (b) 360°  (c) 30° and 150°",
                figure=chart(0, 360, -1.5, 1.5, 90, 0.5, [("line", sine)], xlabel="x (degrees)", ylabel="y"),
                fig_w=260, fig_h=160, fig_pos="right", space=10)
    P(ws, "For each graph, write down the coordinates of the points where it crosses the axes for 0° ≤ x ≤ 360°.", [
        ("y = sin x", "(0, 0), (180°, 0), (360°, 0)"), ("y = cos x", "(0, 1), (90°, 0), (270°, 0)"), ("y = tan x", "(0, 0), (180°, 0), (360°, 0); asymptotes x = 90°, 270°"),
        ("y = sin 2x", "(0, 0), (90°, 0), (180°, 0), (270°, 0), (360°, 0)"), ("y = cos(x + 90°)", "(0, 0), (180°, 0), (360°, 0)"), ("y = 3 sin x", "(0, 0), (180°, 0), (360°, 0)")], cols=1, work=12)
    ws.section("Problem solving")
    ws.question("Describe the transformation that maps y = cos x onto y = cos(x − 60°), and give the new period.", "translation by {{60;0}}; period still 360°", space=40)


def four_quadrants(ws):
    ws.section("Practice")
    qs = [("sin 210°", "−sin 30°"), ("cos 300°", "cos 60°"), ("tan 135°", "−tan 45°"), ("sin 330°", "−sin 30°"), ("cos 120°", "−cos 60°"), ("tan 240°", "tan 60°")]
    for q, a in qs:     # check each against the calculator
        ang = int(q.split()[1][:-1]); fn = {"sin": sind, "cos": cosd, "tan": tand}[q[:3]]
        ref = int(a.split()[-1][:-1]); val = fn(ref) * (-1 if a.startswith("−") else 1)
        assert abs(fn(ang) - val) < 1e-9, q
    P(ws, "Write each as a trigonometric ratio of an acute angle.", qs, cols=3)
    P(ws, "Write down all the angles between 0° and 360° with", [("the same sine as 40°", "40°, 140°"), ("the same cosine as 70°", "70°, 290°"),
                                                             ("the same tangent as 25°", "25°, 205°"), ("sine equal to −sin 20°", "200°, 340°")])
    ws.section("Problem solving")
    ws.question("Given that sin θ = [[3//5]] and θ is obtuse, find the exact values of cos θ and tan θ.", "cos θ = −[[4//5]], tan θ = −[[3//4]]", space=45)


def exact_values(ws):
    ws.section("Practice")
    P(ws, "Write down the exact value of", [("sin 60°", "[[√3//2]]"), ("cos 45°", "[[√2//2]]"), ("tan 30°", "[[√3//3]]"), ("cos 150°", "−[[√3//2]]"),
                                           ("tan 300°", "−√3"), ("sin 225°", "−[[√2//2]]")], cols=3)
    combos = [("sin 30° + cos 60°", Surd(1)), ("tan 60° × cos 30°", Surd(F(3, 2))), ("sin^2 45° + cos 60°", Surd(1)),
              ("2 sin 60° − tan 60°", Surd(0)), ("tan 45° + tan 60°", Surd(1, 1, 3)), ("cos 30° × sin 60°", Surd(F(3, 4)))]
    P(ws, "Find the exact value of", [(q, a.text()) for q, a in combos], cols=3)
    ws.section("Problem solving")
    ws.question("Show that sin 60° cos 30° − cos 60° sin 30° = [[1//2]].", "[[√3//2]] × [[√3//2]] − [[1//2]] × [[1//2]] = [[3//4]] − [[1//4]] = [[1//2]]", space=45)


def trig_identities(ws):
    ws.section("Practice")
    P(ws, "Simplify.", [("[[sin θ//cos θ]]", "tan θ"), ("1 − cos^2 θ", "sin^2 θ"), ("[[1 − sin^2 θ//cos θ]]", "cos θ"),
                        ("tan θ cos θ", "sin θ"), ("(sin θ + cos θ)^2 − 1", "2 sin θ cos θ"), ("[[sin^2 θ//1 − sin^2 θ]]", "tan^2 θ")], cols=3)
    P(ws, "Prove each identity.", [("[[1//cos θ]] − cos θ ≡ sin θ tan θ", "[[1 − cos^2 θ//cos θ]] = [[sin^2 θ//cos θ]] = sin θ tan θ"),
                                    ("(1 − sin θ)(1 + sin θ) ≡ cos^2 θ", "1 − sin^2 θ = cos^2 θ"),
                                    ("tan θ + [[1//tan θ]] ≡ [[1//sin θ cos θ]]", "[[sin^2 θ + cos^2 θ//sin θ cos θ]]")], cols=1, work=30)
    ws.section("Problem solving")
    ws.question("Given cos θ = [[5//13]] and θ is acute, find sin θ and tan θ without a calculator.", "sin θ = [[12//13]], tan θ = [[12//5]]", space=40)


def trig_eq_simple(ws):
    ws.section("Practice")
    eqs = [("sin x = 0.5", sind, 0.5), ("cos x = −0.5", cosd, -0.5), ("tan x = 1", tand, 1), ("sin x = −0.3", sind, -0.3),
           ("cos x = 0.8", cosd, 0.8), ("tan x = −2", tand, -2)]
    out = []
    for q, f, v in eqs:
        sols = [s for s in deg_solutions(f, v, 0, 360) if abs(f(s)) < 1e6]
        out.append((q, angles_text(sols)))
    P(ws, "Solve for 0° ≤ x ≤ 360°. Give answers to 1 d.p. where needed.", out, cols=2)
    eq2 = [("2 sin x = 1.6", sind, 0.8), ("5 cos x + 2 = 0", cosd, -0.4), ("3 tan x = √3", tand, 1 / math.sqrt(3))]
    P(ws, "Solve for 0° ≤ x ≤ 360°.", [(q, angles_text([s for s in deg_solutions(f, v, 0, 360) if abs(f(s)) < 1e6])) for q, f, v in eq2], cols=1)
    ws.section("Problem solving")
    ws.question("Solve sin θ = √3 cos θ for 0° ≤ θ ≤ 360°.", "tan θ = √3: θ = 60°, 240°", space=40)


def trig_eq_harder(ws):
    ws.section("Practice")
    cases = [("sin 2x = [[√3//2]]", lambda x: sind(2 * x), math.sqrt(3) / 2), ("cos(x − 30°) = 0.5", lambda x: cosd(x - 30), 0.5),
             ("tan 3x = 1", lambda x: tand(3 * x), 1), ("sin(x + 45°) = −0.4", lambda x: sind(x + 45), -0.4)]
    out = []
    for q, f, v in cases:
        sols = [s for s in deg_solutions(f, v, 0, 360) if abs(f(s)) < 1e6]
        out.append((q, angles_text(sols)))
    P(ws, "Solve for 0° ≤ x ≤ 360°.", out, cols=1, work=25)
    quad = [("2 sin^2 x − sin x − 1 = 0", lambda x: 2 * sind(x) ** 2 - sind(x) - 1), ("2 cos^2 x + 3 sin x = 3", lambda x: 2 * cosd(x) ** 2 + 3 * sind(x) - 3),
            ("tan x = 3 sin x", lambda x: tand(x) - 3 * sind(x)), ("4 sin^2 x = 3", lambda x: 4 * sind(x) ** 2 - 3)]
    out2 = []
    for q, f in quad:
        sols = []
        for s in deg_solutions(f, 0, 0, 360, step=0.01):
            if abs(f(s)) < 1e-6:
                sols.append(s)
        # touching zeros (repeated roots) don't change sign: add them by checking a fine grid
        for k in range(0, 361):
            if abs(f(k)) < 1e-9 and all(abs(k - s) > 1e-4 for s in sols):
                sols.append(k)
        out2.append((q, angles_text(sorted(sols))))
    P(ws, "Solve for 0° ≤ x ≤ 360°, giving answers to 1 d.p. where needed.", out2, cols=1, work=30)
    ws.section("Problem solving")
    ws.question("Explain why dividing both sides of sin x cos x = sin x by sin x loses solutions.", "When sin x = 0 (x = 0°, 180°, 360°) the equation holds, but dividing by zero removes those", space=45)


# ==========================================================================
# Unit 9: Vectors
# ==========================================================================
def vec(a, b):
    return f"{{{{{fr(a)};{fr(b)}}}}}"


def ij(a, b):
    out = ""
    if a:
        out = ("" if abs(a) == 1 else fr(abs(a))) + "i"
        out = (MINUS if a < 0 else "") + out
    if b:
        t = ("" if abs(b) == 1 else fr(abs(b))) + "j"
        out = (out + (" − " if b < 0 else " + ") + t) if out else ((MINUS if b < 0 else "") + t)
    return out or "0"


def vectors_basic(ws):
    ws.section("Practice")
    a, b, c = (3, -1), (-2, 4), (5, 2)
    calc = [("a + b", (a[0] + b[0], a[1] + b[1])), ("b − c", (b[0] - c[0], b[1] - c[1])), ("3a", (3 * a[0], 3 * a[1])),
            ("2a − b", (2 * a[0] - b[0], 2 * a[1] - b[1])), ("a + b + c", (a[0] + b[0] + c[0], a[1] + b[1] + c[1])), ("[[1//2]]b − a", (F(b[0], 2) - a[0], F(b[1], 2) - a[1]))]
    P(ws, f"a = {vec(*a)}, b = {vec(*b)} and c = {vec(*c)}. Work out", [(q, vec(*v)) for q, v in calc], cols=3)
    ws.section("Problem solving")
    ws.question(f"Find p and q such that p{vec(2, 1)} + q{vec(-1, 3)} = {vec(7, 7)}.", "2p − q = 7 and p + 3q = 7: p = 4, q = 1", space=50)
    ws.question("Show that the vectors 6i − 9j and −4i + 6j are parallel.", "−4i + 6j = −[[2//3]](6i − 9j)", space=40)


def representing_vectors(ws):
    ws.section("Practice")
    P(ws, "Write each vector in i, j form.", [(vec(3, 4), ij(3, 4)), (vec(-2, 5), ij(-2, 5)), (vec(0, -7), ij(0, -7)), (vec(F(1, 2), -3), ij(F(1, 2), -3))], cols=4)
    P(ws, "Write each vector as a column vector.", [("5i − 2j", vec(5, -2)), ("−i + 3j", vec(-1, 3)), ("4j", vec(0, 4)), ("−6i", vec(-6, 0))], cols=4)
    P(ws, "OABC is a parallelogram with OA = a and OC = c. M is the midpoint of AB. Find, in terms of a and c,", [
        ("AB", "c"), ("AC", "c − a"), ("OM", "a + [[1//2]]c"), ("MC", "[[1//2]]c − a")], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why the vector from A to B is b − a when A and B have position vectors a and b.", "AB = AO + OB = −a + b", space=40)


def magnitude_direction(ws):
    ws.section("Practice")
    vs = [(3, -4), (5, 12), (-2, 6), (-7, -1)]
    P(ws, "Find the magnitude of each vector (exact) and the angle it makes with i (to 1 d.p.).",
      [(ij(a, b), f"{sqrt_text(a * a + b * b)}; {math.degrees(math.atan2(b, a)):.1f}°") for a, b in vs])
    P(ws, "Find the unit vector in the direction of", [(ij(3, 4), f"[[1//5]](3i + 4j)"), (ij(5, -12), "[[1//13]](5i − 12j)"), (ij(1, 1), "[[1//√2]](i + j)")], cols=3)
    ws.section("Problem solving")
    ws.question("A vector has magnitude 10 and makes an angle of 30° with i (anticlockwise). Write it in i, j form, exactly.", "5√3 i + 5j", space=40)


def position_vectors(ws):
    ws.section("Practice")
    pairs = [((2, 5), (6, 8)), ((-1, 3), (4, -9)), ((0, -2), (6, 6))]
    out = []
    for A, B in pairs:
        AB = (B[0] - A[0], B[1] - A[1])
        out.append((f"A{pt(A)}, B{pt(B)}", f"AB = {ij(*AB)}; |AB| = {sqrt_text(AB[0] ** 2 + AB[1] ** 2)}; midpoint {pt(((A[0] + B[0]) / F(2), (A[1] + B[1]) / F(2)))}"))
    P(ws, "Find the vector AB, the distance AB and the position vector of the midpoint of AB.", out, cols=1)
    ws.section("Problem solving")
    ws.question("The points A, B and C have position vectors 2i + j, 5i + 3j and 11i + 7j. Show that A, B and C are collinear.",
                "AB = 3i + 2j, BC = 6i + 4j = 2AB, and B is shared", space=45)
    ws.question("OABC is a parallelogram. O is the origin, A is (4, 1) and C is (1, 3). Find the position vector of B.", "a + c = 5i + 4j", space=40)


def vector_geometry(ws):
    ws.section("Problem solving")
    ws.question("In triangle OAB, OA = a and OB = b. P is the point on AB with AP : PB = 1 : 2.\n(a) Find OP in terms of a and b.\n"
                "(b) M is the midpoint of OB. Find PM.", "(a) a + [[1//3]](b − a) = [[2//3]]a + [[1//3]]b  (b) [[1//2]]b − OP = −[[2//3]]a + [[1//6]]b", space=80)
    ws.question("OABC is a parallelogram with OA = a and OC = c. X is the midpoint of AC. Show that X is also the midpoint of OB.",
                "OX = a + [[1//2]](c − a) = [[1//2]](a + c) = [[1//2]]OB", space=70)
    ws.question("In triangle OAB, D is the midpoint of OA and E is the midpoint of OB. Prove that DE is parallel to AB and half its length.",
                "DE = [[1//2]]b − [[1//2]]a = [[1//2]](b − a) = [[1//2]]AB", space=70)


def modelling_vectors(ws):
    ws.section("Problem solving")
    ws.question("A boat moves with velocity (6i + 8j) km h^{−1}.\n(a) Find its speed.\n(b) Find its bearing.\n(c) It starts at 2i − 3j km. Find its position after 2.5 hours.",
                f"(a) 10 km h^{{−1}}  (b) {90 - math.degrees(math.atan2(8, 6)):.1f}° (from north, with j north)  (c) 2i − 3j + 2.5(6i + 8j) = 17i + 17j km", space=90)
    ws.question("Two forces, (3i − 2j) N and (5i + 8j) N, act on a particle. Find the resultant force, its magnitude and the angle it makes with i.",
                f"8i + 6j N; 10 N; {math.degrees(math.atan2(6, 8)):.1f}°", space=60)
    ws.question("A swimmer swims at 2 m s^{−1} straight across a river (j) while the current flows at 1.5 m s^{−1} (i). Find the swimmer's actual speed.",
                "√(1.5^2 + 2^2) = 2.5 m s^{−1}", space=45)


# ==========================================================================
# Unit 10: Differentiation
# ==========================================================================
def poly_from(text_terms):
    return Poly(text_terms)


def gradients_of_curves(ws):
    ws.section("Practice")
    f = lambda x: x * x
    rows = [(3, 4), (3, 3.1), (3, 3.01), (3, 3.001)]
    P(ws, "For y = x^2, find the gradient of the chord joining the points with these x-coordinates.",
      [(f"x = {a} and x = {b}", dec((f(b) - f(a)) / (b - a), 4)) for a, b in rows], cols=2)
    ws.question("What do your answers suggest about the gradient of the curve y = x^2 at x = 3?", "The chord gradients approach 6", space=35)
    ws.section("Problem solving")
    ws.question("Repeat for y = x^3 at x = 2, using x = 2.1, 2.01 and 2.001. Predict the gradient of the curve at x = 2.",
                f"{(2.1 ** 3 - 8) / 0.1:.3f}, {(2.01 ** 3 - 8) / 0.01:.4f}, {(2.001 ** 3 - 8) / 0.001:.5f}: approaching 12", space=55)


def first_principles(ws):
    ws.section("Practice")
    P(ws, "Prove from first principles that", [
        ("the derivative of x^2 is 2x", "[[(x + h)^2 − x^2//h]] = 2x + h → 2x as h → 0"),
        ("the derivative of x^3 is 3x^2", "[[(x + h)^3 − x^3//h]] = 3x^2 + 3xh + h^2 → 3x^2"),
        ("the derivative of 5x^2 − 3x is 10x − 3", "[[5(x + h)^2 − 3(x + h) − 5x^2 + 3x//h]] = 10x + 5h − 3 → 10x − 3"),
        ("the derivative of kx is k", "[[k(x + h) − kx//h]] = k")], cols=1, work=35)
    ws.section("Problem solving")
    ws.question("Use first principles to find the gradient of y = x^2 + 4x at the point (1, 5).", "f′(x) = 2x + 4, so 6", space=55)


def diff_xn(ws):
    ws.section("Practice")
    terms = [Poly({5: 1}), Poly({3: 4}), Poly({-1: 1}), Poly({-2: 3}), Poly({F(1, 2): 1}), Poly({F(3, 2): 6}), Poly({F(-1, 2): 2}), Poly({F(2, 3): 9})]
    P(ws, "Find [[dy//dx]] when y equals", [(t.text(), t.diff().text()) for t in terms], cols=4)
    rewrite = [("[[1//x^3]]", Poly({-3: 1})), ("√x", Poly({F(1, 2): 1})), ("[[4//√x]]", Poly({F(-1, 2): 4})), ("∛x^2", Poly({F(2, 3): 1}))]
    P(ws, "Write each as a power of x, then differentiate.", [(q, f"{p.text()}; {p.diff().text()}") for q, p in rewrite], cols=2)
    ws.section("Problem solving")
    ws.question("Find the gradient of y = 8√x at the point where x = 4.", f"[[dy//dx]] = 4x^{{−1/2}} = {fr(Poly({F(-1, 2): 4})(4))}", space=40)


def diff_sums(ws):
    ws.section("Practice")
    ps = [Poly({3: 2, 2: -5, 1: 3, 0: -7}), Poly({4: 1, 2: -6, 0: 2}), Poly({2: 3, -1: 4}), Poly({F(1, 2): 6, -2: -2})]
    P(ws, "Find f′(x).", [(f"f(x) = {p.text()}", p.diff().text()) for p in ps])
    prep = [("(x + 3)(x − 2)", Poly({2: 1, 1: 1, 0: -6})), ("[[x^3 + 4x//x]]", Poly({2: 1, 0: 4})), ("[[x^2 − 3//√x]]", Poly({F(3, 2): 1, F(-1, 2): -3})),
            ("(2x − 1)^2", Poly({2: 4, 1: -4, 0: 1}))]
    P(ws, "Simplify, then differentiate.", [(f"y = {q}", f"{p.text()}; [[dy//dx]] = {p.diff().text()}") for q, p in prep], cols=1, work=25)
    ws.section("Problem solving")
    f = Poly({3: 1, 2: -6, 1: 9})
    ws.question(f"Find the points on y = {f.text()} where the gradient is 0.", "3x^2 − 12x + 9 = 0, x = 1 or 3: (1, 4) and (3, 0)", space=45)


def tangents_normals(ws):
    ws.section("Practice")
    cases = [(Poly({2: 1, 1: -3, 0: 2}), 3), (Poly({3: 1, 1: -4}), 1), (Poly({F(1, 2): 4}), 4), (Poly({-1: 6, 1: 1}), 2)]
    out = []
    for f, a in cases:
        y0 = F(f(a)) if not isinstance(f(a), float) else F(f(a)).limit_denominator(1000)
        g = f.diff()(a)
        g = F(g) if not isinstance(g, float) else F(g).limit_denominator(1000)
        out.append((f"y = {f.text()} at x = {a}", f"tangent {line_y(g, y0 - g * a)}; normal {line_general(-1 / g, y0 + a / g)}"))
    P(ws, "Find the equations of the tangent (y = mx + c) and the normal (ax + by + c = 0) at the given point.", out, cols=1, work=35)
    ws.section("Problem solving")
    ws.question("The normal to y = x^2 at (1, 1) meets the curve again at P. Find P.", "Normal y = −[[1//2]]x + [[3//2]]; x^2 + [[1//2]]x − [[3//2]] = 0 gives x = −[[3//2]]: P(−[[3//2]], [[9//4]])", space=60)


def increasing_decreasing(ws):
    ws.section("Practice")
    cubics = [Poly({3: 1, 2: -3, 1: -9, 0: 2}), Poly({3: -2, 2: 3, 1: 12}), Poly({3: 1, 2: 6, 1: 9})]
    out = []
    for f in cubics:
        d = f.diff()
        a, b = d.t.get(2, 0), d.t.get(1, 0)
        r = sorted(quad_roots_float(float(a), float(b), float(d.t.get(0, 0))))
        lo, hi = [fr(F(v).limit_denominator(100)) for v in r]
        inc = f"x < {lo} or x > {hi}" if a > 0 else f"{lo} < x < {hi}"
        out.append((f"f(x) = {f.text()}", f"f′(x) = {d.text()}; increasing for {inc}"))
    P(ws, "Find the values of x for which each function is increasing.", out, cols=1, work=30)
    ws.section("Problem solving")
    ws.question("Show that f(x) = x^3 + 3x − 5 is increasing for all x.", "f′(x) = 3x^2 + 3 ≥ 3 > 0", space=40)
    ws.question("Find the interval on which f(x) = x^2 − 8√x is decreasing (x > 0).", "f′(x) = 2x − 4x^{−1/2} < 0 when x^{3/2} < 2, so 0 < x < ∛4", space=50)


def second_derivatives(ws):
    ws.section("Practice")
    ps = [Poly({4: 1, 3: -2, 1: 5}), Poly({3: 3, 2: -6, 0: 1}), Poly({-1: 2, 2: 1}), Poly({F(3, 2): 4})]
    P(ws, "Find f′(x) and f″(x).", [(f"f(x) = {p.text()}", f"f′(x) = {p.diff().text()}; f″(x) = {p.diff().diff().text()}") for p in ps], cols=1, work=20)
    f = Poly({3: 1, 2: -3, 1: 4})
    P(ws, f"f(x) = {f.text()}. Find", [("f″(2)", fr(f.diff().diff()(2))), ("the value of x where f″(x) = 0", "x = 1")], cols=2)
    ws.section("Problem solving")
    ws.question("Explain what f″(x) tells you about the graph of y = f(x).", "How the gradient changes: f″ > 0 means the gradient is increasing (convex, ∪ shape)", space=40)


def stationary_points(ws):
    ws.section("Practice")
    # f′(x) = 3(x − p)(x − q) -> f = x^3 − (3/2)(p + q)x^2 + 3pq x + c
    cases = [(1, 3, 2), (-2, 2, 0), (-1, 4, 5)]
    out = []
    for p, q, c in cases:
        f = Poly({3: 1, 2: F(-3, 2) * (p + q), 1: 3 * p * q, 0: c})
        pts = []
        for x0 in (p, q):
            kind = "minimum" if f.diff().diff()(x0) > 0 else "maximum"
            pts.append(f"{pt((x0, f(x0)))} {kind}")
        out.append((f"y = {f.text()}", "; ".join(pts)))
    P(ws, "Find the stationary points and decide whether each is a maximum or a minimum.", out, cols=1, work=40)
    ws.section("Problem solving")
    g = Poly({2: 1, -1: 16})
    ws.question(f"Find the stationary point of y = {g.text()} (x > 0) and show it is a minimum.", "2x − 16x^{−2} = 0, x = 2: (2, 12); [[d^2y//dx^2]] = 2 + 32x^{−3} = 6 > 0", space=55)


def gradient_sketch(ws):
    ws.section("Practice")
    fs = [(lambda x: (x - 1) ** 2 - 2, "turning point at x = 1: f′ is a straight line crossing the x-axis at x = 1, negative to the left"),
          (lambda x: x ** 3 / 3 - x, "turning points at x = ±1: f′ is a ∪-shaped curve crossing the x-axis at x = −1 and x = 1"),
          (lambda x: -(x + 1) * (x - 2) ** 2 / 2, "turning points at x = 0 and x = 2: f′ is a ∩ curve crossing at x = 0 and x = 2")]
    for i, (f, ans) in enumerate(fs):
        ws.question("The graph shows y = f(x). Sketch the graph of y = f′(x) in the space beside it.", ans,
                    figure=axes(-3, 4, -4, 4, [("curve", f, -2.8, 3.8)], ystep=1), fig_w=190, fig_h=150, fig_pos="right", space=10)
    ws.section("Problem solving")
    ws.question("Explain how to find where f′(x) = 0 from the graph of y = f(x).", "At the turning points of y = f(x) the gradient is zero", space=40)


def optimisation(ws):
    ws.section("Problem solving")
    V = lambda x: x * (30 - 2 * x) ** 2
    ws.question("A square sheet of card 30 cm wide has a square of side x cm cut from each corner and is folded into an open box.\n"
                "(a) Show that V = x(30 − 2x)^2.\n(b) Find the value of x that gives the greatest volume, and the volume.",
                f"(b) V = 4x^3 − 120x^2 + 900x, V′ = 12x^2 − 240x + 900 = 0 gives x = 5 (x = 15 gives 0); V = {V(5)} cm^3", space=100)
    ws.question("A closed cylinder has volume 128π cm^3.\n(a) Show that its surface area is A = 2πr^2 + [[256π//r]].\n(b) Find the radius that "
                "minimises A, and the minimum area.", "(b) A′ = 4πr − 256πr^{−2} = 0, r^3 = 64, r = 4: h = 8, A = 96π cm^2", space=100)
    ws.question("A farmer encloses a rectangular field of 800 m^2 next to a river (no fence needed along the river). Find the least length of fencing.",
                "L = x + [[1600//x]]; L′ = 1 − 1600x^{−2} = 0 at x = 40: L = 80 m (40 m by 20 m)", space=80)


# ==========================================================================
# Unit 11: Integration
# ==========================================================================
def integ_xn(ws):
    ws.section("Practice")
    ts = [Poly({4: 1}), Poly({2: 6}), Poly({-2: 1}), Poly({-3: 4}), Poly({F(1, 2): 1}), Poly({F(-1, 2): 3}), Poly({0: 7}), Poly({F(2, 3): 5})]
    P(ws, "Find", [(f"∫ {t.text()} dx", t.integ().text() + " + c") for t in ts], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why ∫ x^{−1} dx can't be found using the rule for ∫ x^n dx.", "n + 1 = 0, so you would divide by zero", space=40)


def indefinite(ws):
    ws.section("Practice")
    ps = [Poly({3: 4, 1: -6, 0: 1}), Poly({2: 3, -2: 2}), Poly({F(1, 2): 3, F(-1, 2): -1}), Poly({4: 5, 2: -9, 0: 2})]
    P(ws, "Find", [(f"∫ ({p.text()}) dx", p.integ().text() + " + c") for p in ps], cols=1)
    prep = [("(x + 2)(x − 3)", Poly({2: 1, 1: -1, 0: -6})), ("[[x^4 − 3//x^2]]", Poly({2: 1, -2: -3})), ("(√x + 1)^2", Poly({1: 1, F(1, 2): 2, 0: 1}))]
    P(ws, "Simplify, then integrate.", [(f"∫ {q} dx", f"{p.integ().text()} + c") for q, p in prep], cols=1)
    ws.section("Problem solving")
    ws.question("Find ∫ [[(2 + x)^2//√x]] dx.", Poly({F(-1, 2): 4, F(1, 2): 4, F(3, 2): 1}).integ().text() + " + c", space=50)


def finding_functions(ws):
    ws.section("Practice")
    cases = [(Poly({1: 6, 0: -2}), (1, 5)), (Poly({2: 3, 1: -4}), (2, 3)), (Poly({F(-1, 2): 2}), (4, 10)), (Poly({-2: 1, 0: 1}), (1, 0))]
    out = []
    for d, (x0, y0) in cases:
        g = d.integ()
        c = F(y0) - (F(g(x0)) if not isinstance(g(x0), float) else F(g(x0)).limit_denominator(1000))
        out.append((f"f′(x) = {d.text()}, and the curve passes through {pt((x0, y0))}", "f(x) = " + (g + c).text()))
    P(ws, "Find f(x).", out, cols=1, work=30)
    ws.section("Problem solving")
    ws.question("The gradient of a curve is 3x^2 − 4. The curve passes through (2, 5). Find where it crosses the y-axis.", "y = x^3 − 4x + 5: (0, 5)", space=45)


def definite(ws):
    ws.section("Practice")
    cs = [(Poly({2: 3}), 1, 2), (Poly({1: 4, 0: -1}), 0, 3), (Poly({3: 1, 1: -2}), -1, 2), (Poly({-2: 1}), 1, 4), (Poly({F(1, 2): 1}), 1, 4), (Poly({F(-1, 2): 6}), 4, 9)]
    out = []
    for f, a, b in cs:
        v = f.integ()(b) - f.integ()(a)
        v = F(v) if not isinstance(v, float) else F(v).limit_denominator(1000)
        out.append((f"∫_{{{a}}}^{{{b}}} {f.text()} dx".replace("{−", "{−"), fr(v)))
    P(ws, "Evaluate.", [(q.replace("-", MINUS), a) for q, a in out], cols=3)
    ws.section("Problem solving")
    ws.question("Given that ∫_{1}^{k} 2x dx = 15 and k > 0, find k.", "k^2 − 1 = 15, k = 4", space=40)


def areas_under(ws):
    ws.section("Practice")
    cs = [(Poly({2: 1, 0: 2}), 0, 3), (Poly({1: 1, 2: -1, 0: 6}), -2, 3), (Poly({F(1, 2): 1}), 0, 9), (Poly({-2: 4}), 1, 4)]
    out = []
    for f, a, b in cs:
        v = f.integ()(b) - f.integ()(a)
        v = F(v) if not isinstance(v, float) else F(v).limit_denominator(1000)
        out.append((f"y = {f.text()}, from x = {a} to x = {b}", fr(v)))
    P(ws, "Find the area between each curve and the x-axis, between the given values of x.", [(q.replace("-", MINUS), a) for q, a in out], cols=1)
    ws.section("Problem solving")
    ws.question("Find the area enclosed by y = 4x − x^2 and the x-axis.", "Roots 0 and 4: ∫_{0}^{4} (4x − x^2) dx = [[32//3]]", space=50)


def areas_below(ws):
    ws.section("Practice")
    def area(f, roots):
        tot = F(0)
        g = f.integ()
        for a, b in zip(roots, roots[1:]):
            tot += abs(g(b) - g(a))
        return tot
    cs = [(Poly({2: 1, 1: -4}), [0, 4]), (Poly({3: 1, 1: -1}), [-1, 0, 1]), (Poly({2: 1, 1: -2, 0: -3}), [-1, 3]), (Poly({3: 1, 2: -3, 1: 2}), [0, 1, 2])]
    P(ws, "Find the total area between each curve and the x-axis, for the part of the curve between its roots shown.",
      [(f"y = {f.text()}, x = {r[0]} to x = {r[-1]}".replace("-", MINUS), fr(area(f, r))) for f, r in cs], cols=1)
    ws.section("Problem solving")
    ws.question("Explain why ∫_{−1}^{1} x^3 dx = 0, even though the curve encloses a region with the x-axis.", "The areas above and below the axis are equal (each [[1//4]]) and cancel", space=45)


def areas_between(ws):
    ws.section("Practice")
    cs = [(Poly({2: 1}), Poly({1: 2, 0: 3})), (Poly({2: 1, 1: -2}), Poly({1: 1})), (Poly({2: -1, 0: 8}), Poly({1: 2})), (Poly({2: 1, 0: 1}), Poly({1: 3, 0: -1}))]
    out = []
    for curve, line in cs:
        d = line - curve
        r = sorted(quad_roots_float(float(d.t.get(2, 0)), float(d.t.get(1, 0)), float(d.t.get(0, 0))))
        a, b = [F(v).limit_denominator(100) for v in r]
        out.append((f"y = {curve.text()} and y = {line.text()}", f"meet at x = {fr(a)} and x = {fr(b)}; area {fr(abs(d.definite(a, b)))}"))
    P(ws, "Find the area enclosed between the curve and the line.", out, cols=1, work=35)
    ws.section("Problem solving")
    ws.question("Find the area enclosed between the curves y = x^2 and y = 8 − x^2.", "Meet at x = ±2: ∫(8 − 2x^2) dx from −2 to 2 = [[64//3]]", space=55)


# ==========================================================================
# Unit 12: Exponentials and logarithms
# ==========================================================================
def exp_functions(ws):
    ws.section("Practice")
    P(ws, "Solve.", [("2^x = 32", "x = 5"), ("3^x = [[1//9]]", "x = −2"), ("4^x = 8", "x = [[3//2]]"), ("5^{x + 1} = 125", "x = 2"), ("9^x = 27^{x − 1}", "x = 3"), ("2^{3x} = 4^{x + 2}", "x = 4")], cols=3)
    P(ws, "For each graph, write down the y-intercept and the equation of the asymptote.", [("y = 3^x", "(0, 1); y = 0"), ("y = 2^x + 4", "(0, 5); y = 4"),
                                                                                            ("y = ([[1//2]])^x", "(0, 1); y = 0"), ("y = 5 − 2^x", "(0, 4); y = 5")])
    ws.section("Problem solving")
    ws.question("Sketch y = 2^x and y = 2^{−x} on the same axes. Describe how they are related.", "Reflections of each other in the y-axis; both pass through (0, 1)",
                figure=axes(-3, 3, 0, 8, [], ystep=1), fig_w=180, fig_h=170, fig_pos="right", space=10)


def e_x(ws):
    ws.section("Practice")
    ks = [(3, 1), (-2, 0), (0.5, 4), (5, 0.2)]
    kx = lambda k: ("" if k == 1 else ("−" if k == -1 else dec(k).replace("-", MINUS))) + "x"
    P(ws, "Find [[dy//dx]], then the gradient at the given x, to 3 s.f.",
      [(f"y = e^{{{kx(k)}}} at x = {dec(x0)}", f"{dec(k).replace('-', MINUS)}e^{{{kx(k)}}}; {sf(k * math.exp(k * x0))}") for k, x0 in ks])
    P(ws, "Find [[dy//dx]].", [("y = 4e^{2x}", "8e^{2x}"), ("y = e^{−x} + 3x^2", "−e^{−x} + 6x"), ("y = 5e^{0.5x}", "2.5e^{0.5x}"),
                              ("y = 2e^{3x} − e^{−2x}", "6e^{3x} + 2e^{−2x}")])
    ws.section("Problem solving")
    ws.question("Explain what is special about the graph of y = e^x.", "Its gradient at every point equals its y-value", space=40)


def exp_modelling(ws):
    ws.section("Problem solving")
    P0, k = 2000, 0.03
    ws.question("The population of a town is modelled by P = 2000e^{0.03t}, where t is the number of years after 2020.\n(a) Find the population in 2030.\n"
                "(b) Find the year in which the population first exceeds 5000.\n(c) Find the rate of growth when t = 10.",
                f"(a) {P0 * math.exp(k * 10):.0f}  (b) t = [[ln 2.5//0.03]] = {math.log(2.5) / k:.1f}, so {2020 + math.ceil(math.log(2.5) / k)}  (c) {P0 * k * math.exp(k * 10):.1f} people per year", space=100)
    T = lambda t: 20 + 70 * math.exp(-0.05 * t)
    ws.question("A cup of tea cools so that its temperature after t minutes is T = 20 + 70e^{−0.05t} °C.\n(a) Find the starting temperature.\n"
                "(b) Find the temperature after 10 minutes.\n(c) What does the model say happens in the long run?",
                f"(a) 90 °C  (b) {T(10):.1f} °C  (c) it approaches room temperature, 20 °C", space=90)
    ws.question("A car bought for £18 000 loses value so that V = 18 000e^{−0.15t}. After how many whole years is it first worth less than half its price?",
                f"t > [[ln 2//0.15]] = {math.log(2) / 0.15:.2f}: after 5 years", space=55)


def logarithms(ws):
    ws.section("Practice")
    P(ws, "Evaluate.", [("log_{2} 8", "3"), ("log_{5} 25", "2"), ("log_{3} 81", "4"), ("log_{10} 0.01", "−2"), ("log_{4} 2", "[[1//2]]"), ("log_{2} [[1//16]]", "−4")], cols=3)
    P(ws, "Write each as a logarithm.", [("2^5 = 32", "log_{2} 32 = 5"), ("10^3 = 1000", "log_{10} 1000 = 3"), ("3^{−2} = [[1//9]]", "log_{3} [[1//9]] = −2"), ("a^b = c", "log_{a} c = b")])
    ws.section("Problem solving")
    ws.question("Solve log_{x} 64 = 3.", "x^3 = 64, x = 4", space=35)


def log_laws(ws):
    ws.section("Practice")
    P(ws, "Write as a single logarithm.", [("log 3 + log 5", "log 15"), ("log 20 − log 4", "log 5"), ("2 log 3 + log 4", "log 36"),
                                          ("3 log 2 − log 4 + log 5", "log 10"), ("[[1//2]] log 25 + log 3", "log 15"), ("log x + 2 log y − log z", "log [[xy^2//z]]")])
    P(ws, "Given log_{a} 2 = p and log_{a} 3 = q, write in terms of p and q.", [("log_{a} 6", "p + q"), ("log_{a} 18", "p + 2q"), ("log_{a} [[8//3]]", "3p − q"), ("log_{a} √12", "p + [[1//2]]q")])
    ws.section("Problem solving")
    ws.question("Solve log_{2}(x + 4) + log_{2} x = 5.", "x(x + 4) = 32, (x + 8)(x − 4) = 0, x = 4 (x > 0)", space=50)


def solving_logs(ws):
    ws.section("Practice")
    cs = [("3^x = 20", math.log(20) / math.log(3)), ("5^x = 0.4", math.log(0.4) / math.log(5)), ("7^{2x} = 50", math.log(50) / math.log(7) / 2),
          ("2^{x − 1} = 9", 1 + math.log(9) / math.log(2)), ("4^{3x + 1} = 100", (math.log(100) / math.log(4) - 1) / 3), ("6^x = 2^{x + 3}", 3 * math.log(2) / (math.log(6) - math.log(2)))]
    # check each answer by substituting it back into the equation
    checks = [lambda x: 3 ** x - 20, lambda x: 5 ** x - 0.4, lambda x: 7 ** (2 * x) - 50, lambda x: 2 ** (x - 1) - 9,
              lambda x: 4 ** (3 * x + 1) - 100, lambda x: 6 ** x - 2 ** (x + 3)]
    for (q, v), chk in zip(cs, checks):
        assert abs(chk(v)) < 1e-9, q
    P(ws, "Solve, giving answers to 3 s.f.", [(q, f"x = {sf(v)}") for q, v in cs], cols=3)
    ws.section("Problem solving")
    ws.question("Solve 2^{2x} − 6(2^x) + 8 = 0.", "Let u = 2^x: (u − 2)(u − 4) = 0, so x = 1 or x = 2", space=45)
    ws.question("Solve 3^{2x} − 3^{x + 1} − 10 = 0, giving your answer to 3 s.f.", f"u^2 − 3u − 10 = 0, u = 5 (u = −2 impossible): x = {sf(math.log(5) / math.log(3))}", space=50)


def natural_logs(ws):
    ws.section("Practice")
    cs = [("e^{2x} = 7", "x = [[1//2]] ln 7", math.log(7) / 2), ("ln(x + 2) = 3", "x = e^3 − 2", math.e ** 3 - 2), ("3e^{x} − 1 = 11", "x = ln 4", math.log(4)),
          ("ln x + ln 3 = 2", "x = [[e^2//3]]", math.e ** 2 / 3), ("e^{−0.5x} = 0.2", "x = −2 ln 0.2 = 2 ln 5", 2 * math.log(5)), ("2 ln x = ln 18 − ln 2", "x = 3", 3)]
    P(ws, "Solve, giving exact answers and then answers to 3 s.f.", [(q, f"{a} ({sf(v)})") for q, a, v in cs])
    ws.section("Problem solving")
    ws.question("Solve e^{2x} − 5e^x + 6 = 0, giving exact answers.", "(e^x − 2)(e^x − 3) = 0: x = ln 2 or x = ln 3", space=45)


def log_data(ws):
    ws.section("Problem solving")
    a, b = 3.2, 1.6
    ws.question(f"Data are thought to fit y = ab^x. A graph of log_{{10}} y against x is a straight line with gradient {math.log10(b):.3f} "
                f"and intercept {math.log10(a):.3f}.\n(a) Explain why the graph is a straight line.\n(b) Find a and b, to 2 s.f.",
                f"(a) log y = log a + x log b, which has the form Y = c + mx  (b) a = 10^{{{math.log10(a):.3f}}} = {a}, b = 10^{{{math.log10(b):.3f}}} = {b}", space=90)
    ws.question("Data fit y = ax^n. The graph of log_{10} y against log_{10} x passes through (0, 0.477) and (2, 3.477).\n(a) Find n and a.\n(b) Predict y when x = 5.",
                f"(a) gradient n = 1.5, log a = 0.477 so a = 3.00 (to 3 s.f.)  (b) y = 3 × 5^{{1.5}} = {3 * 5 ** 1.5:.1f}", space=90)
    ws.question("Explain why a graph of ln y against t is used to test whether data follow y = Ae^{kt}.", "ln y = ln A + kt: a straight line with gradient k and intercept ln A", space=45)


SHEETS = [
    ({"slug": "alevel-pascals-triangle", "title": "A level: Pascal's triangle", "lesson": "y12-u7-l1"}, pascal),
    ({"slug": "alevel-factorials-combinations", "title": "A level: Factorials and combinations", "lesson": "y12-u7-l2"}, combinations),
    ({"slug": "alevel-binomial-expansion", "title": "A level: The binomial expansion", "lesson": "y12-u7-l3"}, binomial_expansion),
    ({"slug": "alevel-binomial-coefficients", "title": "A level: Finding binomial coefficients", "lesson": "y12-u7-l4"}, finding_coefficients),
    ({"slug": "alevel-binomial-estimation", "title": "A level: Binomial estimation", "lesson": "y12-u7-l5"}, binomial_estimation),
    ({"slug": "alevel-cosine-rule", "title": "A level: The cosine rule", "lesson": "y12-u8-l1"}, cosine_rule),
    ({"slug": "alevel-sine-rule", "title": "A level: The sine rule", "lesson": "y12-u8-l2"}, sine_rule),
    ({"slug": "alevel-triangle-areas", "title": "A level: Areas of triangles", "lesson": "y12-u8-l3"}, triangle_areas),
    ({"slug": "alevel-triangle-problems", "title": "A level: Solving triangle problems", "lesson": "y12-u8-l4"}, triangle_problems),
    ({"slug": "alevel-trig-graphs", "title": "A level: Graphs of sine, cosine and tangent", "lesson": "y12-u8-l5"}, trig_graphs),
    ({"slug": "alevel-angles-four-quadrants", "title": "A level: Angles in all four quadrants", "lesson": "y12-u8-l6"}, four_quadrants),
    ({"slug": "alevel-trig-exact-values", "title": "A level: Exact trigonometric values", "lesson": "y12-u8-l7"}, exact_values),
    ({"slug": "alevel-trig-identities", "title": "A level: Trigonometric identities", "lesson": "y12-u8-l8"}, trig_identities),
    ({"slug": "alevel-trig-equations-simple", "title": "A level: Simple trigonometric equations", "lesson": "y12-u8-l9"}, trig_eq_simple),
    ({"slug": "alevel-trig-equations-harder", "title": "A level: Harder trigonometric equations", "lesson": "y12-u8-l10"}, trig_eq_harder),
    ({"slug": "alevel-vectors", "title": "A level: Vectors", "lesson": "y12-u9-l1"}, vectors_basic),
    ({"slug": "alevel-representing-vectors", "title": "A level: Representing vectors", "lesson": "y12-u9-l2"}, representing_vectors),
    ({"slug": "alevel-magnitude-direction", "title": "A level: Magnitude and direction", "lesson": "y12-u9-l3"}, magnitude_direction),
    ({"slug": "alevel-position-vectors", "title": "A level: Position vectors", "lesson": "y12-u9-l4"}, position_vectors),
    ({"slug": "alevel-vector-geometry", "title": "A level: Solving geometric problems with vectors", "lesson": "y12-u9-l5"}, vector_geometry),
    ({"slug": "alevel-modelling-vectors", "title": "A level: Modelling with vectors", "lesson": "y12-u9-l6"}, modelling_vectors),
    ({"slug": "alevel-gradients-of-curves", "title": "A level: Gradients of curves", "lesson": "y12-u10-l1"}, gradients_of_curves),
    ({"slug": "alevel-first-principles", "title": "A level: Differentiating from first principles", "lesson": "y12-u10-l2"}, first_principles),
    ({"slug": "alevel-differentiating-xn", "title": "A level: Differentiating xⁿ", "lesson": "y12-u10-l3"}, diff_xn),
    ({"slug": "alevel-differentiating-sums", "title": "A level: Differentiating sums of terms", "lesson": "y12-u10-l4"}, diff_sums),
    ({"slug": "alevel-tangents-normals", "title": "A level: Tangents and normals", "lesson": "y12-u10-l5"}, tangents_normals),
    ({"slug": "alevel-increasing-decreasing", "title": "A level: Increasing and decreasing functions", "lesson": "y12-u10-l6"}, increasing_decreasing),
    ({"slug": "alevel-second-derivatives", "title": "A level: Second derivatives", "lesson": "y12-u10-l7"}, second_derivatives),
    ({"slug": "alevel-stationary-points", "title": "A level: Stationary points", "lesson": "y12-u10-l8"}, stationary_points),
    ({"slug": "alevel-sketching-gradient-functions", "title": "A level: Sketching gradient functions", "lesson": "y12-u10-l9"}, gradient_sketch),
    ({"slug": "alevel-optimisation", "title": "A level: Optimisation problems", "lesson": "y12-u10-l10"}, optimisation),
    ({"slug": "alevel-integrating-xn", "title": "A level: Integrating xⁿ", "lesson": "y12-u11-l1"}, integ_xn),
    ({"slug": "alevel-indefinite-integrals", "title": "A level: Indefinite integrals", "lesson": "y12-u11-l2"}, indefinite),
    ({"slug": "alevel-finding-functions", "title": "A level: Finding functions from the gradient", "lesson": "y12-u11-l3"}, finding_functions),
    ({"slug": "alevel-definite-integrals", "title": "A level: Definite integrals", "lesson": "y12-u11-l4"}, definite),
    ({"slug": "alevel-areas-under-curves", "title": "A level: Areas under curves", "lesson": "y12-u11-l5"}, areas_under),
    ({"slug": "alevel-areas-below-axis", "title": "A level: Areas below the x-axis", "lesson": "y12-u11-l6"}, areas_below),
    ({"slug": "alevel-areas-between-curves", "title": "A level: Areas between curves and lines", "lesson": "y12-u11-l7"}, areas_between),
    ({"slug": "alevel-exponential-functions", "title": "A level: Exponential functions", "lesson": "y12-u12-l1"}, exp_functions),
    ({"slug": "alevel-e-to-the-x", "title": "A level: The function eˣ", "lesson": "y12-u12-l2"}, e_x),
    ({"slug": "alevel-exponential-modelling", "title": "A level: Exponential modelling", "lesson": "y12-u12-l3"}, exp_modelling),
    ({"slug": "alevel-logarithms", "title": "A level: Logarithms", "lesson": "y12-u12-l4"}, logarithms),
    ({"slug": "alevel-laws-of-logarithms", "title": "A level: Laws of logarithms", "lesson": "y12-u12-l5"}, log_laws),
    ({"slug": "alevel-solving-with-logarithms", "title": "A level: Solving equations using logarithms", "lesson": "y12-u12-l6"}, solving_logs),
    ({"slug": "alevel-natural-logarithms", "title": "A level: Natural logarithms", "lesson": "y12-u12-l7"}, natural_logs),
    ({"slug": "alevel-logarithms-non-linear-data", "title": "A level: Logarithms and non-linear data", "lesson": "y12-u12-l8"}, log_data),
]

for _meta, _ in SHEETS:
    _meta.setdefault("topic", TOPIC)
    _meta.setdefault("level", LEVEL)
