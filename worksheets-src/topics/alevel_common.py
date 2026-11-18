"""Shared helpers for the A level Pure worksheets (alevel_*.py).

Everything that produces an answer works exactly (Fraction, whole-number
surds), so answers can't suffer from rounding errors."""
from fractions import Fraction as F
import math
from engine.calc import Poly, X, fr, dec, sf, MINUS, signed, surd, surd_text, power_text
from engine.algebra import expand

LEVEL = "A Level"
TOPIC = "Pure mathematics"


def P(ws, prompt, qa, cols=2, work=30, **kw):
    """A practice question with lettered parts and room for working."""
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, work=work, **kw)


def m(t):
    """Turn ASCII '-' in a ready-made string into a real minus sign."""
    return t.replace("-", MINUS)


# --------------------------------------------------------------------------
# Monomials such as 6x^3y^{−1}
# --------------------------------------------------------------------------
class Mono:
    def __init__(self, c, **pw):
        self.c = F(c)
        self.pw = {k: F(v) for k, v in pw.items() if F(v) != 0}

    def __mul__(self, o):
        pw = dict(self.pw)
        for k, v in o.pw.items():
            pw[k] = pw.get(k, 0) + v
        return Mono(self.c * o.c, **pw)

    def __truediv__(self, o):
        pw = dict(self.pw)
        for k, v in o.pw.items():
            pw[k] = pw.get(k, 0) - v
        return Mono(self.c / o.c, **pw)

    def __pow__(self, n):
        n = F(n)
        c = self.c ** n if n.denominator == 1 else F(round(float(self.c) ** float(n), 9)).limit_denominator(1000)
        return Mono(c, **{k: v * n for k, v in self.pw.items()})

    def text(self):
        letters = "".join(power_text(k, v) for k, v in sorted(self.pw.items()))
        if not letters:
            return fr(self.c)
        if self.c == 1:
            return letters
        if self.c == -1:
            return MINUS + letters
        return fr(self.c) + letters


# --------------------------------------------------------------------------
# Numbers of the form a + b√k (a, b fractions, k a whole number)
# --------------------------------------------------------------------------
class Surd:
    def __init__(self, a=0, b=0, k=1):
        a, b = F(a), F(b)
        if k > 1 and b:
            s, k2 = surd(k)
            b, k = b * s, k2
        if k == 1:
            a, b = a + b, F(0)
        self.a, self.b, self.k = a, b, (k if b else 1)

    def _match(self, o):
        o = o if isinstance(o, Surd) else Surd(o)
        k = self.k if self.k > 1 else o.k
        assert self.k in (1, k) and o.k in (1, k), "different surds"
        return o, k

    def __add__(self, o):
        o, k = self._match(o)
        return Surd(self.a + o.a, self.b + o.b, k)

    def __sub__(self, o):
        o, k = self._match(o)
        return Surd(self.a - o.a, self.b - o.b, k)

    def __mul__(self, o):
        o, k = self._match(o)
        return Surd(self.a * o.a + self.b * o.b * k, self.a * o.b + self.b * o.a, k)

    def conj(self):
        return Surd(self.a, -self.b, self.k)

    def __truediv__(self, o):
        o, k = self._match(o)
        top = self * o.conj()
        bottom = (o * o.conj()).a          # a whole number (or fraction)
        return Surd(top.a / bottom, top.b / bottom, top.k)

    def text(self):
        def part_b(b):
            return ("" if abs(b) == 1 else fr(abs(b))) + f"√{self.k}"
        if self.b == 0:
            return fr(self.a)
        # put a fraction over a single denominator: (p + q√k)/d
        d = math.lcm(self.a.denominator, self.b.denominator)
        if d > 1:
            pa, pb = self.a * d, self.b * d
            g = math.gcd(math.gcd(int(pa), int(pb)), d) or 1
            pa, pb, d = int(pa) // g, int(pb) // g, d // g
            if d > 1:
                num = Surd(pa, pb, self.k).text()
                return f"[[{num}//{d}]]"
        if self.a == 0:
            return (MINUS if self.b < 0 else "") + part_b(self.b)
        if self.a < 0 < self.b:                       # √2 − 1 reads better than −1 + √2
            return f"{part_b(self.b)} − {fr(-self.a)}"
        return fr(self.a) + (f" − " if self.b < 0 else " + ") + part_b(self.b)


def sqrt_text(n):
    """√n simplified, for a positive whole number n."""
    a, b = surd(n)
    return surd_text(a, b)


# --------------------------------------------------------------------------
# Quadratics
# --------------------------------------------------------------------------
def quad_text(a, b, c, var="x"):
    return Poly({2: a, 1: b, 0: c}, var).text()


def quad_roots(a, b, c):
    """Exact roots of ax² + bx + c = 0 as text, e.g. 'x = 3 or x = −[[1//2]]'
    or 'x = [[3 ± √5//2]]', or 'no real roots'."""
    a, b, c = F(a), F(b), F(c)
    D = b * b - 4 * a * c
    if D < 0:
        return "no real roots"
    # rational square root?
    num, den = D.numerator, D.denominator
    rn, rd = math.isqrt(num), math.isqrt(den)
    if rn * rn == num and rd * rd == den:
        r = F(rn, rd)
        x1, x2 = (-b - r) / (2 * a), (-b + r) / (2 * a)
        x1, x2 = sorted([x1, x2])
        return f"x = {fr(x1)}" if x1 == x2 else f"x = {fr(x1)} or x = {fr(x2)}"
    # irrational: (−b ± √D)/2a, simplified
    # scale so everything is whole
    L = math.lcm(a.denominator, b.denominator, c.denominator)
    A, B, C = int(a * L), int(b * L), int(c * L)
    Dw = B * B - 4 * A * C
    s, k = surd(Dw)
    p, q, d = -B, s, 2 * A
    g = math.gcd(math.gcd(abs(p), abs(q)), abs(d))
    p, q, d = p // g, q // g, d // g
    if d < 0:
        p, d = -p, -d
    sq = ("" if q == 1 else str(q)) + f"√{k}"
    top = f"{fr(p)} ± {sq}" if p else f"±{sq}"
    return f"x = {top}" if d == 1 else f"x = [[{top}//{d}]]"


def quad_roots_float(a, b, c):
    D = b * b - 4 * a * c
    if D < 0:
        return []
    r = math.sqrt(D)
    return sorted({(-b - r) / (2 * a), (-b + r) / (2 * a)})


def completed_square(a, b, c, var="x"):
    """a(x + p)^2 + q as text."""
    a, b, c = F(a), F(b), F(c)
    p = b / (2 * a)
    q = c - b * b / (4 * a)
    inner = f"({var} {signed(p)})" if p else var
    front = "" if a == 1 else (MINUS if a == -1 else fr(a))
    out = f"{front}{inner}^2"
    if q:
        out += f" {signed(q)}"
    return out


# --------------------------------------------------------------------------
# Straight lines and circles
# --------------------------------------------------------------------------
def line_y(mg, c):
    """y = mx + c as text."""
    return "y = " + Poly({1: mg, 0: c}).text()


def line_general(mg, c):
    """The line y = mx + c written as ax + by + c = 0 with whole numbers, a > 0."""
    mg, c = F(mg), F(c)
    L = math.lcm(mg.denominator, c.denominator)
    A, B, C = -mg * L, F(L), -c * L          # Ax + By + C = 0
    if A < 0 or (A == 0 and B < 0):
        A, B, C = -A, -B, -C
    g = math.gcd(math.gcd(int(A), int(B)), int(C)) or 1
    A, B, C = int(A) // g, int(B) // g, int(C) // g
    out = Poly({1: A}, "x").text() if A else ""
    if B:
        yb = Poly({1: B}, "y").text()
        out = yb if not out else out + (f" {MINUS} " + yb[1:] if yb.startswith(MINUS) else " + " + yb)
    if C:
        out += f" {signed(C)}"
    return out + " = 0"


def circle_text(a, b, r2):
    """(x − a)^2 + (y − b)^2 = r²."""
    def sq(var, v):
        return f"{var}^2" if v == 0 else f"({var} {signed(-v)})^2"
    return f"{sq('x', a)} + {sq('y', b)} = {fr(r2)}"


def dist_text(p, q):
    d2 = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2
    d2 = F(d2)
    if d2.denominator == 1:
        return sqrt_text(int(d2))
    return f"√{fr(d2)}"


def pt(p):
    return "(" + ", ".join(fr(v) for v in p) + ")"


def set_or(parts):
    """{x : x < 2} ∪ {x : x > 5}"""
    return " ∪ ".join(f"{{x : {p}}}" for p in parts)
