"""
A level maths helpers: exact answers for calculus and friends
=============================================================

The A level worksheets need answers involving fractional and negative
powers, differentiation and integration. Rather than typing those by hand
(and risking mistakes), the questions are built from the same numbers the
answers are calculated from.

The main tool is `Poly`: a sum of terms a·x^n where n can be any fraction
(so x^½, x^−2 and 5 are all allowed). Everything is exact (Fraction), so
there is never a rounding error.

    f = Poly({3: 2, 1: -5, 0: 1})        # 2x^3 − 5x + 1
    f.text()           ->  "2x^3 − 5x + 1"
    f.diff().text()    ->  "6x^2 − 5"
    f.integ().text()   ->  "[[1//2]]x^4 − [[5//2]]x^2 + x"
    f(2)               ->  Fraction(7)

Text uses the worksheet markup: x^2 and x^{−1} for powers, [[a//b]] for
fractions, and a real minus sign "−".
"""
from fractions import Fraction as F
import math

MINUS = "−"


def fr(x, lead=False):
    """A number as markup: 3, −2, [[3//4]], −[[1//2]]."""
    x = F(x)
    sign = MINUS if x < 0 else ""
    x = abs(x)
    body = str(x.numerator) if x.denominator == 1 else f"[[{x.numerator}//{x.denominator}]]"
    return sign + body


def dec(x, dp=3):
    """A decimal answer rounded to dp places, trailing zeros kept to dp
    places only where they matter (e.g. 2.50 -> 2.5)."""
    s = f"{x:.{dp}f}"
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    return s.replace("-", MINUS) if s not in ("-0",) else "0"


def sf(x, n=3):
    """x to n significant figures, as text."""
    if x == 0:
        return "0"
    digits = n - int(math.floor(math.log10(abs(x)))) - 1
    v = round(x, digits)
    s = f"{v:.{max(digits, 0)}f}"
    return s.replace("-", MINUS)


def power_text(var, n):
    """x, x^2, x^{−1}, x^{1/2} (fractional powers written a/b in the index)."""
    n = F(n)
    if n == 1:
        return var
    if n.denominator == 1:
        p = str(n.numerator).replace("-", MINUS)
    else:
        p = f"{n.numerator}/{n.denominator}".replace("-", MINUS)
    return f"{var}^{{{p}}}" if len(p) > 1 else f"{var}^{p}"


class Poly:
    """A sum of terms coef·x^power, with Fraction coefficients and powers."""

    def __init__(self, terms=None, var="x"):
        self.t = {}
        for p, c in (terms or {}).items():
            c = F(c)
            if c:
                self.t[F(p)] = self.t.get(F(p), 0) + c
        self.t = {p: c for p, c in self.t.items() if c}
        self.var = var

    # ---- arithmetic ----
    def __add__(self, o):
        o = o if isinstance(o, Poly) else Poly({0: o}, self.var)
        r = dict(self.t)
        for p, c in o.t.items():
            r[p] = r.get(p, 0) + c
        return Poly(r, self.var)

    def __neg__(self):
        return Poly({p: -c for p, c in self.t.items()}, self.var)

    def __sub__(self, o):
        return self + (-(o if isinstance(o, Poly) else Poly({0: o}, self.var)))

    def __mul__(self, o):
        o = o if isinstance(o, Poly) else Poly({0: o}, self.var)
        r = {}
        for p1, c1 in self.t.items():
            for p2, c2 in o.t.items():
                r[p1 + p2] = r.get(p1 + p2, 0) + c1 * c2
        return Poly(r, self.var)

    __rmul__ = __mul__

    def __pow__(self, n):
        r = Poly({0: 1}, self.var)
        for _ in range(n):
            r = r * self
        return r

    def __call__(self, x):
        total = F(0)
        for p, c in self.t.items():
            if p.denominator == 1:
                total += c * F(x) ** int(p)
            else:
                return sum(float(c) * float(x) ** float(p) for p, c in self.t.items())
        return total

    # ---- calculus ----
    def diff(self):
        return Poly({p - 1: c * p for p, c in self.t.items() if p != 0}, self.var)

    def integ(self):
        assert F(-1) not in self.t, "can't integrate x^−1 as a power"
        return Poly({p + 1: c / (p + 1) for p, c in self.t.items()}, self.var)

    def definite(self, a, b):
        g = self.integ()
        return g(b) - g(a)

    # ---- text ----
    def text(self, order="desc"):
        if not self.t:
            return "0"
        out = []
        for p in sorted(self.t, reverse=(order == "desc")):
            c = self.t[p]
            neg = c < 0
            a = abs(c)
            if p == 0:
                body = fr(a)
            else:
                coef = "" if a == 1 else fr(a)
                body = coef + power_text(self.var, p)
            if not out:
                out.append((MINUS if neg else "") + body)
            else:
                out.append((f" {MINUS} " if neg else " + ") + body)
        return "".join(out)

    def degree(self):
        return max(self.t) if self.t else 0


def X(var="x"):
    return Poly({1: 1}, var)


def linear_text(a, b, var="x"):
    """ax + b as text, e.g. linear_text(3, -2) -> 3x − 2."""
    return Poly({1: a, 0: b}, var).text()


def signed(n):
    """'+ 3' or '− 3' for joining terms."""
    n = F(n)
    return f"+ {fr(n)}" if n >= 0 else f"{MINUS} {fr(-n)}"


def deg_solutions(fn, value, lo, hi, step=0.001):
    """All solutions of fn(θ) = value for θ in [lo, hi] degrees, found by
    scanning for sign changes and refining. Used to CHECK trig answers."""
    sols = []
    prev = fn(lo) - value
    t = lo
    while t < hi:
        t2 = min(t + step, hi)
        cur = fn(t2) - value
        if prev == 0:
            sols.append(t)
        elif prev * cur < 0:
            a, b = t, t2
            for _ in range(60):
                m = (a + b) / 2
                if (fn(a) - value) * (fn(m) - value) <= 0:
                    b = m
                else:
                    a = m
            sols.append((a + b) / 2)
        prev, t = cur, t2
    if abs(fn(hi) - value) < 1e-12:
        sols.append(hi)
    out = []
    for s in sols:
        if not out or abs(s - out[-1]) > 1e-6:
            out.append(s)
    return out


def sind(t):
    return math.sin(math.radians(t))


def cosd(t):
    return math.cos(math.radians(t))


def tand(t):
    return math.tan(math.radians(t))


def surd(n):
    """Simplify √n: returns (a, b) with √n = a√b."""
    a, b = 1, n
    k = 2
    while k * k <= b:
        while b % (k * k) == 0:
            a *= k
            b //= k * k
        k += 1
    return a, b


def surd_text(a, b):
    if b == 1:
        return str(a)
    return ("" if a == 1 else str(a)) + f"√{b}"


def ncr(n, r):
    return math.comb(n, r)
