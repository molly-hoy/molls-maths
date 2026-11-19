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
