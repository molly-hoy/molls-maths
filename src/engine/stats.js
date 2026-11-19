/* ==========================================================================
   stats.js: the probability maths behind the A level Statistics questions
   --------------------------------------------------------------------------
   binomPmf(n, p, r)  P(X = r) for X ~ B(n, p)
   binomCdf(n, p, r)  P(X ≤ r)
   normCdf(z)         P(Z ≤ z) for the standard normal Z ~ N(0, 1)
   normalCdf(x, μ, σ) P(X ≤ x) for X ~ N(μ, σ²)
   invNorm(p)         the z with P(Z ≤ z) = p
   These give the same answers as a calculator to at least 6 decimal places.
   ========================================================================== */

// ⁿCᵣ, worked out by multiplying and dividing a step at a time (no huge factorials)
export function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  let v = 1;
  for (let k = 1; k <= r; k++) v = (v * (n - r + k)) / k;
  return Math.round(v);
}

export function binomPmf(n, p, r) {
  if (r < 0 || r > n) return 0;
  return nCr(n, r) * p ** r * (1 - p) ** (n - r);
}

export function binomCdf(n, p, r) {
  let s = 0;
  for (let k = 0; k <= Math.min(r, n); k++) s += binomPmf(n, p, k);
  return Math.min(1, s);
}

// The error function, using a series for small x and a continued fraction
// for large x, accurate to about 1e-12 (far better than a calculator needs)
function erf(x) {
  const sgn = x < 0 ? -1 : 1;
  x = Math.abs(x);
  if (x < 3) {
    // Taylor series: erf x = 2/√π Σ (−1)ⁿ x²ⁿ⁺¹ / (n!(2n + 1))
    let term = x, sum = x;
    for (let n = 1; n < 200; n++) {
      term *= (-x * x) / n;
      const add = term / (2 * n + 1);
      sum += add;
      if (Math.abs(add) < 1e-17) break;
    }
    return sgn * (2 / Math.sqrt(Math.PI)) * sum;
  }
  // Continued fraction for erfc when x is large
  let f = 0;
  for (let k = 60; k >= 1; k--) f = (k / 2) / (x + f);
  const erfc = Math.exp(-x * x) / Math.sqrt(Math.PI) / (x + f);
  return sgn * (1 - erfc);
}

export function normCdf(z) {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

export function normalCdf(x, mu, sigma) {
  return normCdf((x - mu) / sigma);
}

// Inverse normal by halving the search interval (bisection): simple and safe
export function invNorm(p) {
  let lo = -10, hi = 10;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (normCdf(mid) < p) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
