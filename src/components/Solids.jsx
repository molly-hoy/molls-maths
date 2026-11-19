/* ==========================================================================
   Pie charts, 3D solids and labelled triangles for lessons
   --------------------------------------------------------------------------
   pie       { items: [{ label, value }], description }
             Slices are drawn from the values; each slice's angle is shown in
             the legend (value ÷ total × 360°).
   solid     { shape: "cuboid" | "cylinder" | "cone" | "pyramid", ... }
             A simple oblique drawing, not to scale. Labels show the
             measurements. Cuboid also takes { diagonal: true }.
   labelled  { pts: [[x,y],[x,y],[x,y]], names, sides, angles }
             A triangle with vertex names, side labels (sides[0] is AB,
             sides[1] is BC, sides[2] is CA) and angle labels.
   ========================================================================== */
import { useId } from "react";
import styles from "./Diagram.module.css";

const COLOURS = ["#1b5aa6", "#b2461a", "#11734f", "#4a3aa8", "#c48a00", "#8a2b5c"];
const FILLS = ["#d6e4f5", "#f6dccd", "#d2ecdf", "#e0dbf6", "#f7ecc7", "#f0d6e4"];

/* ---------------------------------- Pie ---------------------------------- */
export function Pie({ items, description }) {
  const W = 380, H = 230, cx = 110, cy = 115, r = 95;
  const total = items.reduce((s, it) => s + it.value, 0);
  let a = -Math.PI / 2;
  const slices = items.map((it, i) => {
    const sweep = (it.value / total) * 2 * Math.PI;
    const a0 = a, a1 = a + sweep;
    a = a1;
    const p = (t) => [cx + r * Math.cos(t), cy + r * Math.sin(t)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    const large = sweep > Math.PI ? 1 : 0;
    const d = items.length === 1
      ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
      : `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
    return { d, i, deg: (it.value / total) * 360, label: it.label, value: it.value, fill: FILLS[i % FILLS.length], stroke: COLOURS[i % COLOURS.length] };
  });
  const desc = description ?? `Pie chart: ${items.map((it) => `${it.label} ${it.value}`).join(", ")}.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={desc}>
        {slices.map((s) => <path key={s.i} d={s.d} fill={s.fill} stroke={s.stroke} strokeWidth="1.5" />)}
        {slices.map((s) => (
          <g key={"lg" + s.i}>
            <rect x={228} y={24 + s.i * 30} width={14} height={14} fill={s.fill} stroke={s.stroke} strokeWidth="1.5" />
            <text x={250} y={36 + s.i * 30} className={styles.curveLabel}>{`${s.label}: ${s.value} (${Number(s.deg.toFixed(1))}°)`}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/* --------------------------------- Solids -------------------------------- */
export function Solid({ shape, l = 4, w = 3, h = 2, r = 3, labels = {}, diagonal = false, description }) {
  const W = 360, H = 250;
  const m = Math.max(l, w, h);
  const note = <text x={W - 8} y={H - 8} textAnchor="end" className={styles.tickLabel}>not to scale</text>;
  const txt = (x, y, s, anchor = "middle") => <text x={x} y={y} textAnchor={anchor} className={styles.curveLabel}>{s}</text>;

  if (shape === "cuboid" || shape === "pyramid") {
    const fw = 150 * (l / m), fh = 150 * (h / m), fd = 110 * ((w ?? l) / m);
    const dx = fd * 0.6, dy = -fd * 0.5;
    const ox = 50, oy = 215;
    const pt = (x, y) => [x, y];
    const BL = pt(ox, oy), BR = pt(ox + fw, oy), TL = pt(ox, oy - fh), TR = pt(ox + fw, oy - fh);
    const bBL = pt(ox + dx, oy + dy), bBR = pt(ox + fw + dx, oy + dy), bTL = pt(ox + dx, oy - fh + dy), bTR = pt(ox + fw + dx, oy - fh + dy);
    const seg = (a, b, dashed = false, key) => <line key={key} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#1f1b16" strokeWidth="1.8" strokeDasharray={dashed ? "5 4" : undefined} />;
    const face = (pts) => <polygon points={pts.map((p) => p.join(",")).join(" ")} fill="#e8f0fb" stroke="none" />;
    if (shape === "pyramid") {
      // square base at the bottom, apex above the centre
      const apex = [ox + fw / 2 + dx / 2, oy - fh * 1.25];
      const c = [ox + fw / 2, oy];
      return (
        <figure className={styles.figure}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={description ?? `Square-based pyramid with base ${labels.l ?? "l"} and height ${labels.h ?? "h"}.`}>
            {face([BL, BR, bBR, bBL])}
            {seg(BL, BR, false, "b1")}{seg(BR, bBR)}{seg(bBR, bBL, true)}{seg(bBL, BL)}
            {seg(apex, BL)}{seg(apex, BR)}{seg(apex, bBR, true)}{seg(apex, bBL, true)}
            <line x1={c[0]} y1={c[1]} x2={apex[0]} y2={apex[1]} stroke="#1f1b16" strokeWidth="1.2" strokeDasharray="3 3" />
            {txt(c[0], c[1] + 16, labels.l ?? "l")}
            {txt(apex[0] + 10, (c[1] + apex[1]) / 2, labels.h ?? "h", "start")}
            {note}
          </svg>
        </figure>
      );
    }
    return (
      <figure className={styles.figure}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={description ?? `Cuboid with length ${labels.l ?? "l"}, width ${labels.w ?? "w"} and height ${labels.h ?? "h"}.`}>
          {face([TL, TR, bTR, bTL])}
          {face([BR, TR, bTR, bBR])}
          {face([TL, TR, bTR, bTL])}
          {face([BL, BR, TR, TL])}
          {seg(BL, BR)}{seg(BR, TR)}{seg(TR, TL)}{seg(TL, BL)}
          {seg(TL, bTL, true)}{seg(bTL, bTR, true)}{seg(bTL, bBL, true)}
          {seg(BR, bBR)}{seg(TR, bTR)}{seg(bBR, bTR)}{seg(bBR, bBL, true)}{seg(bBL, BL, true)}
          {diagonal && seg(BL, bTR, false, "diag")}
          {txt((BL[0] + BR[0]) / 2, oy + 18, labels.l ?? "l")}
          {txt(BR[0] + 10, (BR[1] + TR[1]) / 2, labels.h ?? "h", "start")}
          {txt((BR[0] + bBR[0]) / 2 + 6, (BR[1] + bBR[1]) / 2 - 8, labels.w ?? "w", "start")}
          {diagonal && txt((BL[0] + bTR[0]) / 2 - 10, (BL[1] + bTR[1]) / 2 - 8, labels.d ?? "d", "end")}
          {note}
        </svg>
      </figure>
    );
  }

  if (shape === "cylinder") {
    const rx = 62, ry = 18, hh = 130, cx = W / 2 - 10, top = 60;
    return (
      <figure className={styles.figure}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={description ?? `Cylinder with radius ${labels.r ?? "r"} and height ${labels.h ?? "h"}.`}>
          <rect x={cx - rx} y={top} width={2 * rx} height={hh} fill="#e8f0fb" stroke="none" />
          <line x1={cx - rx} y1={top} x2={cx - rx} y2={top + hh} stroke="#1f1b16" strokeWidth="1.8" />
          <line x1={cx + rx} y1={top} x2={cx + rx} y2={top + hh} stroke="#1f1b16" strokeWidth="1.8" />
          <ellipse cx={cx} cy={top + hh} rx={rx} ry={ry} fill="#e8f0fb" stroke="#1f1b16" strokeWidth="1.8" />
          <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="#f4f8fd" stroke="#1f1b16" strokeWidth="1.8" />
          <line x1={cx} y1={top} x2={cx + rx} y2={top} stroke="#1f1b16" strokeWidth="1.4" strokeDasharray="4 3" />
          {txt(cx + rx / 2, top - 6, labels.r ?? "r")}
          {txt(cx + rx + 12, top + hh / 2, labels.h ?? "h", "start")}
          {note}
        </svg>
      </figure>
    );
  }

  // cone
  const rx = 70, ry = 20, base = 200, apexY = 50, cx = W / 2 - 10;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={description ?? `Cone with radius ${labels.r ?? "r"} and height ${labels.h ?? "h"}.`}>
        <path d={`M ${cx - rx} ${base} L ${cx} ${apexY} L ${cx + rx} ${base} Z`} fill="#e8f0fb" stroke="#1f1b16" strokeWidth="1.8" />
        <ellipse cx={cx} cy={base} rx={rx} ry={ry} fill="#e8f0fb" stroke="#1f1b16" strokeWidth="1.8" />
        <line x1={cx} y1={apexY} x2={cx} y2={base} stroke="#1f1b16" strokeWidth="1.4" strokeDasharray="4 3" />
        <line x1={cx} y1={base} x2={cx + rx} y2={base} stroke="#1f1b16" strokeWidth="1.4" strokeDasharray="4 3" />
        {txt(cx + rx / 2, base + 16, labels.r ?? "r")}
        {txt(cx + 10, (apexY + base) / 2, labels.h ?? "h", "start")}
        {note}
      </svg>
    </figure>
  );
}

/* ------------------------------ Labelled triangle ------------------------ */
export function Labelled({ pts, names = [], sides = [], angles = [], description }) {
  const W = 360, H = 240, pad = 44;
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const k = Math.min((W - 2 * pad) / (x1 - x0 || 1), (H - 2 * pad) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * k) / 2, oy = (H - (y1 - y0) * k) / 2;
  const P = pts.map(([x, y]) => [ox + (x - x0) * k, H - oy - (y - y0) * k]);
  const cen = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
  const unit = (dx, dy) => { const d = Math.hypot(dx, dy) || 1; return [dx / d, dy / d]; };
  const desc = description ?? `Triangle ${names.join("")} with sides ${sides.filter(Boolean).join(", ")}${angles.some(Boolean) ? " and angles " + angles.filter(Boolean).join(", ") : ""}.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={desc}>
        <polygon points={P.map((p) => p.join(",")).join(" ")} fill="#e8f0fb" stroke="#1f1b16" strokeWidth="2" strokeLinejoin="round" />
        {/* Side labels: outside the midpoint of each side */}
        {[[0, 1], [1, 2], [2, 0]].map(([i, j], s) => {
          if (!sides[s]) return null;
          const mx = (P[i][0] + P[j][0]) / 2, my = (P[i][1] + P[j][1]) / 2;
          const [ux, uy] = unit(mx - cen[0], my - cen[1]);
          return <text key={"s" + s} x={mx + ux * 16} y={my + uy * 16 + 4} textAnchor="middle" className={styles.curveLabel}>{sides[s]}</text>;
        })}
        {/* Vertex names and angles */}
        {P.map((p, i) => {
          const [ux, uy] = unit(p[0] - cen[0], p[1] - cen[1]);
          return (
            <g key={"v" + i}>
              {names[i] && <text x={p[0] + ux * 14} y={p[1] + uy * 14 + 4} textAnchor="middle" className={styles.curveLabel}>{names[i]}</text>}
              {angles[i] && <text x={p[0] - ux * 30} y={p[1] - uy * 30 + 4} textAnchor="middle" className={styles.tickLabel}>{angles[i]}</text>}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/* ------------------------------ Grouped bars ----------------------------
   Two or more bars side by side for each category, with a key.
   { items: [{ label, values: [a, b] }], names: ["Boys", "Girls"], yMax, yStep } */
export function GroupBars({ items, names = [], yMax, yStep = 1, yLabel = "", xLabel = "", description }) {
  const W = 400, H = 300, L = 48, R = 12, T = 30, B = 46;
  const n = items.length, slot = (W - L - R) / n;
  const sy = (v) => H - B - (v / yMax) * (H - T - B);
  const yt = [];
  for (let v = 0; v <= yMax + 1e-9; v += yStep) yt.push(Number(v.toFixed(6)));
  const k = names.length || items[0].values.length;
  const desc = description ?? `Grouped bar chart of ${items.map((it) => `${it.label}: ${it.values.join(" and ")}`).join("; ")}.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={desc}>
        {yt.map((v) => <g key={v}><line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} className={styles.grid} /><text x={L - 6} y={sy(v) + 4} className={styles.tickLabelY}>{v}</text></g>)}
        <line x1={L} x2={L} y1={T} y2={H - B} className={styles.axisLine} />
        <line x1={L} x2={W - R} y1={H - B} y2={H - B} className={styles.axisLine} />
        {items.map((it, i) => {
          const group = slot * 0.7, bw = group / k, gx = L + slot * i + (slot - group) / 2;
          return (
            <g key={i}>
              {it.values.map((v, j) => (
                <g key={j}>
                  <rect x={gx + j * bw} y={sy(v)} width={bw - 2} height={H - B - sy(v)} fill={COLOURS[j % COLOURS.length]} opacity="0.85" />
                  <text x={gx + j * bw + (bw - 2) / 2} y={sy(v) - 4} textAnchor="middle" className={styles.tickLabelY}>{v}</text>
                </g>
              ))}
              <text x={L + slot * i + slot / 2} y={H - B + 16} textAnchor="middle" className={styles.tickLabel}>{it.label}</text>
            </g>
          );
        })}
        {names.map((nm, j) => (
          <g key={"key" + j}>
            <rect x={L + j * 90} y={6} width={12} height={12} fill={COLOURS[j % COLOURS.length]} opacity="0.85" />
            <text x={L + j * 90 + 18} y={16} className={styles.curveLabel}>{nm}</text>
          </g>
        ))}
        {xLabel && <text x={W - R} y={H - 8} textAnchor="end" className={styles.axisName}>{xLabel}</text>}
        {yLabel && <text x={L + 6} y={T - 6} className={styles.axisName}>{yLabel}</text>}
      </svg>
    </figure>
  );
}

/* ------------------------------ 3D space -----------------------------------
   Points and vectors in 3D, drawn in oblique projection. Coordinates are
   [x, y, z]. The x-axis runs right, the y-axis runs up and to the right, and
   the z-axis runs up. vectors: [{ from, to, label, colour }] (from defaults to
   the origin). points: [{ p, label }]. Use only non-negative coordinates. */
export function Space({ vectors = [], points = [], description }) {
  const uid = useId().replace(/:/g, "");
  const W = 360, H = 270;
  const all = [...vectors.flatMap((v) => [v.from ?? [0, 0, 0], v.to]), ...points.map((p) => p.p)];
  const mx = Math.max(1, ...all.map((p) => p[0])), my = Math.max(1, ...all.map((p) => p[1])), mz = Math.max(1, ...all.map((p) => p[2]));
  const S = Math.min(230 / (mx + 0.5 * my + 0.6), 165 / (0.35 * my + mz + 0.6));
  const ox = 40, oy = H - 44;
  const P = ([x, y, z]) => [ox + S * (x + 0.5 * y), oy + S * (-0.35 * y - z)];
  const seg = (a, b, key, colour = "#1f1b16", dash = false, marker = false) => {
    const [x1, y1] = P(a), [x2, y2] = P(b);
    return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth={marker ? 2.4 : 1.4} strokeDasharray={dash ? "5 4" : undefined} markerEnd={marker ? `url(#sp${uid}${colour.replace("#", "")})` : undefined} />;
  };
  const cols = ["#1b5aa6", "#b2461a", "#11734f", "#4a3aa8"];
  const desc = description ?? `3D diagram with axes x, y and z${vectors.length ? ", showing " + vectors.map((v) => v.label ?? "a vector").join(", ") : ""}${points.length ? ", with points " + points.map((p) => p.label).join(", ") : ""}.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={desc}>
        <defs>
          {cols.map((c) => (
            <marker key={c} id={`sp${uid}${c.replace("#", "")}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={c} />
            </marker>
          ))}
          <marker id={`sp${uid}1f1b16`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#1f1b16" />
          </marker>
        </defs>
        {/* axes */}
        {seg([0, 0, 0], [mx + 0.6, 0, 0], "ax")}
        {seg([0, 0, 0], [0, my + 0.6, 0], "ay")}
        {seg([0, 0, 0], [0, 0, mz + 0.6], "az")}
        <text x={P([mx + 0.8, 0, 0])[0]} y={P([mx + 0.8, 0, 0])[1] + 4} className={styles.axisName}>x</text>
        <text x={P([0, my + 0.8, 0])[0] + 4} y={P([0, my + 0.8, 0])[1]} className={styles.axisName}>y</text>
        <text x={P([0, 0, mz + 0.8])[0] + 6} y={P([0, 0, mz + 0.8])[1]} className={styles.axisName}>z</text>
        <text x={P([0, 0, 0])[0] - 10} y={P([0, 0, 0])[1] + 14} className={styles.tickLabelY}>O</text>
        {/* vectors */}
        {vectors.map((v, i) => {
          const col = v.colour ?? i;
          const c = cols[col % cols.length];
          const from = v.from ?? [0, 0, 0];
          const mid = [0, 1, 2].map((k) => (from[k] + v.to[k]) / 2);
          const [lx, ly] = P(mid);
          return (
            <g key={"v" + i}>
              <line x1={P(from)[0]} y1={P(from)[1]} x2={P(v.to)[0]} y2={P(v.to)[1]} stroke={c} strokeWidth="2.4" markerEnd={`url(#sp${uid}${c.replace("#", "")})`} />
              {v.label && <text x={lx + 8} y={ly - 6} className={styles.forceLabel} style={{ fill: c }}>{v.label}</text>}
            </g>
          );
        })}
        {/* points */}
        {points.map((p, i) => {
          const [x, y] = P(p.p);
          return (
            <g key={"p" + i}>
              <circle cx={x} cy={y} r={4} className={styles.dot} />
              {p.label && <text x={x + 7} y={y - 6} className={styles.curveLabel}>{p.label}</text>}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
