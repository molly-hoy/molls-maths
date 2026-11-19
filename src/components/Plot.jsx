/* ==========================================================================
   Plots, trees, force diagrams and bar charts for lessons
   --------------------------------------------------------------------------
   These are drawn from data in the lesson files and attached to a teaching
   step (see Diagram.jsx and LessonPage.jsx). Each one has a text description
   for screen-reader users.

   Plot (kind "plot") draws axes, grid, curves, points, lines, shaded areas,
   arrows and inequality regions on one set of axes. Example:
     { kind: "plot", x: [-3, 3], y: [-2, 6], xStep: 1, yStep: 1,
       curves: [{ f: (x) => x * x, label: "y = x²" }],
       points: [{ x: 1, y: 1, label: "(1, 1)" }],
       vlines: [{ x: 0, dashed: true }] }
   Curves can be a formula (f), a list of points (pts), or both limited by
   from/to. Colour numbers 0–3 pick the line colour.
   ========================================================================== */
import { useId } from "react";
import { fmt } from "../engine/numbers.js";
import styles from "./Diagram.module.css";

const W = 400, H = 340, L = 44, R = 16, T = 16, B = 40;
const LINE_CLASS = [styles.curve, styles.curve2, styles.curve3, styles.curve4];
const FILL_CLASS = [styles.region, styles.regionOrange, styles.regionGreen, styles.regionPurple];
const ARROW_COLOUR = ["#1b5aa6", "#b2461a", "#11734f", "#4a3aa8"];

// Sample a formula over [a, b] as a list of unbroken pieces. Where the value
// is missing or huge (an asymptote, or a function that is not defined), the
// line is broken so it doesn't join across the gap.
function sampleFn(f, a, b, y0, y1, n = 240) {
  const limit = 10 * (Math.max(Math.abs(y0), Math.abs(y1)) + (y1 - y0));
  const pieces = [];
  let cur = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    let y;
    try { y = f(x); } catch { y = NaN; }
    if (!Number.isFinite(y) || Math.abs(y) > limit) {
      if (cur.length > 1) pieces.push(cur);
      cur = [];
    } else {
      cur.push([x, y]);
    }
  }
  if (cur.length > 1) pieces.push(cur);
  return pieces;
}

const ticks = (a, b, step) => {
  const out = [];
  for (let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(Number(v.toFixed(6)));
  return out;
};

/* ---------------------------------- Plot ---------------------------------- */
// Keeps a record of every piece of text drawn on a plot, so labels can be
// placed without landing on each other. place() puts a label beside a point,
// flips it to the left near the right edge, and moves it up or down if needed.
function makePlacer() {
  const boxes = [];
  const boxOf = (x, y, text, size, anchor) => {
    const w = String(text).length * size * 0.7;
    const x0 = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x;
    return { x0, x1: x0 + w, y0: y - size * 0.78, y1: y + size * 0.22 };
  };
  const clash = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
  return {
    add(text, x, y, size = 13, anchor = "start") {
      boxes.push(boxOf(x, y, text, size, anchor));
    },
    // For labels with a fixed x: moves them up or down only, to avoid other labels. Returns the new y.
    fit(text, x, y, anchor = "start", size = 13) {
      const clamp = (v) => Math.max(T + 12, Math.min(H - B - 4, v));
      for (const d of [0, 14, -14, 28, -28, 42, -42]) {
        const yy = y + d;
        if (yy < T + 12 || yy > H - B - 4) continue; // never move a label off the plot
        const b = boxOf(x, yy, text, size, anchor);
        if (!boxes.some((o) => clash(o, b))) { boxes.push(b); return yy; }
      }
      boxes.push(boxOf(x, clamp(y), text, size, anchor));
      return clamp(y);
    },
    place(text, px, py, size = 13) {
      const w = String(text).length * size * 0.7;
      const flip = px + 6 + w > W - 4;
      const anchor = flip ? "end" : "start";
      const x = flip ? px - 6 : px + 6;
      const clamp = (v) => Math.max(T + 12, Math.min(H - B - 4, v));
      let best = null;
      // Start from the nearest spot inside the plot, then try moving the label up and down
      const base = clamp(py);
      for (const d of [0, 14, -14, 28, -28, 42, -42, 56, -56, 70, 84]) {
        const y = base + d;
        if (y < T + 12 || y > H - B - 4) continue; // keep the label inside the plot
        const b = boxOf(x, y, text, size, anchor);
        if (!boxes.some((o) => clash(o, b))) { best = { x, y, anchor }; break; }
      }
      if (!best) best = { x, y: base, anchor };
      boxes.push(boxOf(best.x, best.y, text, size, anchor));
      return best;
    },
  };
}

export function Plot({
  x, y, xStep = 1, yStep = 1, xLabel = "x", yLabel = "y", description, labelEvery = 1, equal = false,
  curves = [], points = [], vlines = [], hlines = [], shade = [], regions = [], arrows = [], bars = [],
}) {
  const uid = useId().replace(/:/g, "");
  // Scale: stretched to fill the box, or (equal: true) the same on both axes, so circles look round
  const plotW = W - L - R, plotH = H - T - B;
  const kx = equal ? Math.min(plotW / (x[1] - x[0]), plotH / (y[1] - y[0])) : plotW / (x[1] - x[0]);
  const ky = equal ? kx : plotH / (y[1] - y[0]);
  const offX = equal ? (plotW - (x[1] - x[0]) * kx) / 2 : 0;
  const offY = equal ? (plotH - (y[1] - y[0]) * ky) / 2 : 0;
  const sx = (v) => L + offX + (v - x[0]) * kx;
  const sy = (v) => H - B - offY - (v - y[0]) * ky;
  const xs = ticks(x[0], x[1], xStep), ys = ticks(y[0], y[1], yStep);
  const axisY = y[0] <= 0 && y[1] >= 0 ? sy(0) : H - B;     // the x-axis (horizontal line)
  const axisX = x[0] <= 0 && x[1] >= 0 ? sx(0) : L;          // the y-axis (vertical line)
  const clipId = `clip${uid}`;
  const toPts = (list) => list.map(([a, b]) => `${sx(a)},${sy(b)}`).join(" ");
  const cellW = (x[1] - x[0]) / 50, cellH = (y[1] - y[0]) / 40;
  // Show fewer tick numbers when they would be too close together on the picture
  const xEvery = Math.max(labelEvery, Math.ceil(18 / (kx * xStep)));
  const yEvery = Math.max(labelEvery, Math.ceil(13 / (ky * yStep)));
  const placer = makePlacer();
  // Where the axes cross inside the picture, the numbers next to the origin would land on each other, so skip them
  const crossed = axisY < H - B - 1 && axisX > L + 1;
  const xNums = xs.filter((v, i) => i % xEvery === 0 && v !== 0 && !(crossed && Math.abs(sx(v) - axisX) < 16));
  const yNums = ys.filter((v, i) => i % yEvery === 0 && v !== 0 && !(crossed && Math.abs(sy(v) - axisY) < 24));
  xNums.forEach((v) => placer.add(fmt(v), sx(v), Math.min(axisY + 16, H - B + 16), 13, "middle"));
  yNums.forEach((v) => placer.add(fmt(v), axisX - 6, sy(v) + 4, 12, "end"));
  placer.add(xLabel, W - R, H - 6, 13, "end");
  placer.add(yLabel, axisX + 6, T + 12, 13, "start");

  // Every curve, as drawable pieces
  const drawn = curves.map((c, i) => ({
    ...c,
    colour: c.colour ?? i % 4,
    pieces: c.f ? sampleFn(c.f, c.from ?? x[0], c.to ?? x[1], y[0], y[1]) : [c.pts],
  }));

  const description_ = description ?? `Graph with x from ${fmt(x[0])} to ${fmt(x[1])} and y from ${fmt(y[0])} to ${fmt(y[1])}`
    + (drawn.length ? `, showing ${drawn.map((c) => c.label ?? "a curve").join(", ")}` : "")
    + (points.length ? `, with points ${points.map((p) => p.label ?? `(${fmt(p.x)}, ${fmt(p.y)})`).join(", ")}` : "")
    + ".";

  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={description_}>
        <defs>
          <clipPath id={clipId}><rect x={L} y={T} width={W - L - R} height={H - T - B} /></clipPath>
          {ARROW_COLOUR.map((c, i) => (
            <marker key={i} id={`arr${uid}${i}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={c} />
            </marker>
          ))}
        </defs>

        {/* Grid and axes */}
        {xs.map((v) => <line key={"gx" + v} x1={sx(v)} x2={sx(v)} y1={T} y2={H - B} className={styles.grid} />)}
        {ys.map((v) => <line key={"gy" + v} y1={sy(v)} y2={sy(v)} x1={L} x2={W - R} className={styles.grid} />)}
        <line x1={L} x2={W - R} y1={axisY} y2={axisY} className={styles.axisLine} />
        <line y1={T} y2={H - B} x1={axisX} x2={axisX} className={styles.axisLine} />
        {xNums.map((v) => <text key={"lx" + v} x={sx(v)} y={Math.min(axisY + 16, H - B + 16)} className={styles.tickLabel}>{fmt(v)}</text>)}
        {yNums.map((v) => <text key={"ly" + v} x={axisX - 6} y={sy(v) + 4} className={styles.tickLabelY}>{fmt(v)}</text>)}
        {xs.includes(0) && <text x={axisX - 6} y={axisY + 14} className={styles.tickLabelY}>0</text>}
        <text x={W - R} y={H - 6} className={styles.axisName} textAnchor="end">{xLabel}</text>
        <text x={axisX + 6} y={T + 12} className={styles.axisName}>{yLabel}</text>

        <g clipPath={`url(#${clipId})`}>
          {/* Inequality regions: shaded cells where the test is true */}
          {regions.map((r, k) => {
            const cells = [];
            for (let i = 0; i < 50; i++) for (let j = 0; j < 40; j++) {
              const cx = x[0] + (i + 0.5) * cellW, cy = y[0] + (j + 0.5) * cellH;
              if (r.test(cx, cy)) cells.push(<rect key={`${i}-${j}`} x={sx(x[0] + i * cellW)} y={sy(y[0] + (j + 1) * cellH)} width={sx(x[0] + (i + 1) * cellW) - sx(x[0] + i * cellW) + 0.5} height={sy(y[0] + j * cellH) - sy(y[0] + (j + 1) * cellH) + 0.5} className={FILL_CLASS[r.colour ?? k % 4]} />);
            }
            return <g key={"reg" + k}>{cells}</g>;
          })}

          {/* Shaded areas between two curves (or a curve and the x-axis) */}
          {shade.map((s, k) => {
            const a = s.from ?? x[0], b = s.to ?? x[1], n = 120;
            const top = [], bottom = [];
            for (let i = 0; i <= n; i++) {
              const xi = a + ((b - a) * i) / n;
              top.push([xi, s.f ? s.f(xi) : 0]);
              bottom.push([xi, s.g ? s.g(xi) : 0]);
            }
            const poly = [...top, ...bottom.reverse()];
            return <polygon key={"sh" + k} points={toPts(poly)} className={FILL_CLASS[s.colour ?? k % 4]} />;
          })}

          {/* Bars (for histograms: each bar has x0, x1 and height h) */}
          {bars.map((b, i) => <rect key={"b" + i} x={sx(b.x0)} y={sy(b.h)} width={sx(b.x1) - sx(b.x0)} height={sy(y[0]) - sy(b.h)} className={styles.bar} />)}

          {/* Vertical and horizontal guide lines */}
          {vlines.map((v, i) => <line key={"v" + i} x1={sx(v.x)} x2={sx(v.x)} y1={T} y2={H - B} className={v.dashed === false ? styles.axisLine : styles.curveDashed} />)}
          {hlines.map((h, i) => <line key={"h" + i} x1={L} x2={W - R} y1={sy(h.y)} y2={sy(h.y)} className={h.dashed === false ? styles.axisLine : styles.curveDashed} />)}

          {/* Curves and straight lines */}
          {drawn.map((c, i) => c.pieces.map((piece, j) => (
            <polyline key={`c${i}-${j}`} points={toPts(piece)} className={c.dashed ? styles.curveDashed : LINE_CLASS[c.colour]} />
          )))}

          {/* Arrows (for vectors) */}
          {arrows.map((a, i) => {
            const col = a.colour ?? 0;
            return <line key={"a" + i} x1={sx(a.from[0])} y1={sy(a.from[1])} x2={sx(a.to[0])} y2={sy(a.to[1])} stroke={ARROW_COLOUR[col]} strokeWidth="2.5" markerEnd={`url(#arr${uid}${col})`} />;
          })}
        </g>

        {/* Labels for curves, arrows and vlines/hlines sit outside the clip so they are never cut off */}
        {drawn.filter((c) => c.label).map((c, i) => {
          const pts = c.labelAt ?? (c.pieces.length ? c.pieces[c.pieces.length - 1].slice(-1)[0] : [x[0], y[0]]);
          const lp = placer.place(c.label, sx(pts[0]), sy(pts[1]) - 6);
          return <text key={"cl" + i} x={lp.x} y={lp.y} textAnchor={lp.anchor} className={styles.curveLabel}>{c.label}</text>;
        })}
        {arrows.filter((a) => a.label).map((a, i) => { const lp = placer.place(a.label, sx(a.to[0]), sy(a.to[1]) - 6); return <text key={"al" + i} x={lp.x} y={lp.y} textAnchor={lp.anchor} className={styles.curveLabel}>{a.label}</text>; })}
        {vlines.filter((v) => v.label).map((v, i) => <text key={"vl" + i} x={sx(v.x) + 5} y={placer.fit(v.label, sx(v.x) + 5, T + 26 + i * 14)} className={styles.curveLabel}>{v.label}</text>)}
        {hlines.filter((h) => h.label).map((h, i) => <text key={"hl" + i} x={W - R - 4} y={placer.fit(h.label, W - R - 4, sy(h.y) - 5, "end")} className={styles.curveLabel} textAnchor="end">{h.label}</text>)}

        {points.map((p, i) => (
          <g key={"p" + i}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={4.5} className={p.open ? styles.dotOpen : styles.dot} />
            {p.label && (() => { const lp = placer.place(p.label, sx(p.x) + 1, sy(p.y) - 7); return <text x={lp.x} y={lp.y} textAnchor={lp.anchor} className={styles.curveLabel}>{p.label}</text>; })()}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/* ---------------------------------- Tree ----------------------------------
   A probability tree. Each branch: { p: "0.6", label: "Heads", children: [...] }.
   A leaf can show its result: { result: "0.12" }.  The root is { children: [...] }. */
export function Tree({ root, description }) {
  const rowH = 74, leafStart = 26;
  let leaves = 0, depth = 0;
  const place = (node, d) => {
    depth = Math.max(depth, d);
    if (!node.children?.length) { node._y = leafStart + leaves * rowH; leaves++; }
    else {
      node.children.forEach((c) => place(c, d + 1));
      node._y = (node.children[0]._y + node.children[node.children.length - 1]._y) / 2;
    }
    node._d = d;
  };
  place(root, 0);
  const width = 440, colW = (width - 170) / Math.max(depth, 1);
  const X = (d) => 12 + d * colW;
  const height = leafStart + leaves * rowH + 10;
  const lines = [];
  const walk = (node) => {
    for (const c of node.children ?? []) {
      lines.push(
        <g key={`${node._y}-${c._y}-${c._d}-${c.label}`}>
          <line x1={X(node._d)} y1={node._y} x2={X(c._d)} y2={c._y} className={styles.treeEdge} />
          <text x={(X(node._d) + X(c._d)) / 2} y={(node._y + c._y) / 2 - 18} className={styles.treeOutcome} textAnchor="middle">{c.label}</text>
          {c.p && <text x={(X(node._d) + X(c._d)) / 2} y={(node._y + c._y) / 2 + 5} className={styles.treeProb} textAnchor="middle">{c.p}</text>}
          {c.result && !c.children?.length && <text x={X(c._d) + 8} y={c._y + 5} className={styles.treeResult}>{c.result}</text>}
        </g>
      );
      walk(c);
    }
  };
  walk(root);
  const desc = description ?? "Probability tree diagram with branches showing the outcomes and their probabilities.";
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.tree} role="img" aria-label={desc}>
        {lines}
      </svg>
    </figure>
  );
}

/* -------------------------------- Forces --------------------------------
   A body with forces drawn from its centre. Each force: { deg, label, size }
   where deg is the direction measured anticlockwise from the positive x-axis
   (0 = right, 90 = up), and size (1 = normal, 1.4 = longer) scales its length.
   incline: optional angle in degrees; the body then sits on a slope at that
   angle, and the forces' directions are still given as absolute angles. */
export function Forces({ forces = [], incline = null, description, title }) {
  const uid = useId().replace(/:/g, "");
  const W = 360, H = 300, cx = 180, cy = 150, len = 92;
  const th = incline ? (incline * Math.PI) / 180 : 0;
  // The body's centre: on the slope if there is one, otherwise at the centre
  const bodyX = incline ? cx - 13 * Math.sin(th) : cx;
  const bodyY = incline ? cy + 30 - 13 * Math.cos(th) : cy;
  const desc = description ?? `Force diagram${title ? " for " + title : ""} with ${forces.map((f) => f.label).join(", ")} acting on the body.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.forces} role="img" aria-label={desc}>
        <defs>
          {[0, 1, 2, 3].map((i) => (
            <marker key={i} id={`fa${uid}${i}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={ARROW_COLOUR[i]} />
            </marker>
          ))}
        </defs>
        {incline && (() => {
          // The slope rises to the right at the given angle; the ground is shaded below it
          const ax = cx - 150 * Math.cos(th), ay = cy + 30 + 150 * Math.sin(th);
          const bx = cx + 150 * Math.cos(th), by = cy + 30 - 150 * Math.sin(th);
          return (
            <g>
              <polygon points={`${ax},${ay} ${bx},${by} ${bx},${H - 14} ${ax},${H - 14}`} className={styles.ground} />
              <line x1={ax} y1={ay} x2={bx} y2={by} className={styles.slopeLine} />
              <text x={ax + 46} y={ay - 8} className={styles.smallLabel}>{incline}°</text>
            </g>
          );
        })()}
        {/* The body (a block) */}
        <g transform={incline ? `rotate(${-incline} ${bodyX} ${bodyY})` : undefined}>
          <rect x={bodyX - 26} y={bodyY - 14} width="52" height="28" rx="3" className={styles.body} />
        </g>
        {forces.map((f, i) => {
          const a = (f.deg * Math.PI) / 180, l = len * (f.size ?? 1);
          const tx = bodyX + l * Math.cos(a), ty = bodyY - l * Math.sin(a);
          const col = f.colour ?? i % 4;
          const lx = bodyX + (l + 14) * Math.cos(a), ly = bodyY - (l + 14) * Math.sin(a);
          return (
            <g key={i}>
              <line x1={bodyX} y1={bodyY} x2={tx} y2={ty} stroke={ARROW_COLOUR[col]} strokeWidth="2.5" markerEnd={`url(#fa${uid}${col})`} />
              <text x={lx} y={ly + 4} textAnchor={Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle"} className={styles.forceLabel} style={{ fill: ARROW_COLOUR[col] }}>{f.label}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/* --------------------------------- Bars ---------------------------------
   A bar chart of categories: { items: [{ label, value }], yMax, yStep, yLabel, xLabel }. */
export function Bars({ items, yMax, yStep = 1, yLabel = "", xLabel = "", description }) {
  const W = 400, H = 300, L = 48, R = 12, T = 14, B = 46;
  const n = items.length, slot = (W - L - R) / n;
  const sy = (v) => H - B - (v / yMax) * (H - T - B);
  const yt = ticks(0, yMax, yStep);
  const desc = description ?? `Bar chart of ${items.map((it) => `${it.label} ${it.value}`).join(", ")}.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={desc}>
        {yt.map((v) => <g key={v}><line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} className={styles.grid} /><text x={L - 6} y={sy(v) + 4} className={styles.tickLabelY}>{fmt(v)}</text></g>)}
        <line x1={L} x2={L} y1={T} y2={H - B} className={styles.axisLine} />
        <line x1={L} x2={W - R} y1={H - B} y2={H - B} className={styles.axisLine} />
        {items.map((it, i) => {
          const bw = slot * 0.6, bx = L + slot * i + (slot - bw) / 2;
          return (
            <g key={i}>
              <rect x={bx} y={sy(it.value)} width={bw} height={H - B - sy(it.value)} className={styles.bar} />
              <text x={bx + bw / 2} y={sy(it.value) - 5} textAnchor="middle" className={styles.curveLabel}>{fmt(it.value)}</text>
              <text x={bx + bw / 2} y={H - B + 16} textAnchor="middle" className={styles.tickLabel}>{it.label}</text>
            </g>
          );
        })}
        {xLabel && <text x={W - R} y={H - 8} textAnchor="end" className={styles.axisName}>{xLabel}</text>}
        {yLabel && <text x={L + 6} y={T + 10} className={styles.axisName}>{yLabel}</text>}
      </svg>
    </figure>
  );
}
