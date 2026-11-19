/* ==========================================================================
   Angle diagrams for lessons
   --------------------------------------------------------------------------
   rays      { arms: [deg, ...], arcs: [{ from, to, label, hl }], caption }
             Arms leave one point at the angles given, in degrees, measured
             anticlockwise from the right. Each arc marks the angle from arm
             "from" to arm "to" (counted anticlockwise) with a label. The
             optional hl (0, 1 or 2) picks a highlight colour, so that angles
             which are equal or add up to 180° can be matched by colour.
   parallel  { slant, angles: [{ at, pos, label, hl }], caption }
             Two parallel lines cut by a transversal (a line crossing them).
             at is "top" or "bottom" (which line the angle sits on).
             pos is ul, ur, dl or dr: up or down, and left or right of the
             transversal. slant is the angle the transversal makes with the
             top line, in degrees, measured the same way as the diagram.
   ========================================================================== */
import styles from "./Diagram.module.css";

// Highlight colours: blue, orange, green (same family as the graph colours)
const HL = [
  { stroke: "#2a78d6", fill: "rgba(42, 120, 214, 0.22)", text: "#1b5aa6" },
  { stroke: "#eb6834", fill: "rgba(235, 104, 52, 0.22)", text: "#b2461a" },
  { stroke: "#1baf7a", fill: "rgba(27, 175, 122, 0.25)", text: "#15805b" },
];
const PLAIN = { stroke: "#6b7385", fill: "rgba(107, 115, 133, 0.10)", text: "#15203b" };

const rad = (deg) => (deg * Math.PI) / 180;

// A filled sector between two angles (in the SVG frame, clockwise from the right).
// Start and end are in degrees with end > start.
function sector(cx, cy, r, startDeg, endDeg) {
  const p = (d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
  const [x1, y1] = p(startDeg);
  const [x2, y2] = p(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
}

// Label text for an angle, placed on the mid-angle of the sector.
function Label({ cx, cy, R, midDeg, text, colour }) {
  const x = cx + R * Math.cos(rad(midDeg));
  const y = cy + R * Math.sin(rad(midDeg));
  return (
    <text x={x.toFixed(2)} y={(y + 5).toFixed(2)} textAnchor="middle"
      style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font)", fill: colour, paintOrder: "stroke", stroke: "#fff", strokeWidth: 3 }}>
      {text}
    </text>
  );
}

export function Rays({ arms = [], arcs = [], caption, description }) {
  const W = 360, H = 250, cx = 180, cy = 130, L = 100, r = 34, R = 62;
  const desc = description ?? `Angle diagram with ${arcs.map((a) => a.label).join(", ")} marked.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={desc}>
        {/* Sectors first so the arms sit on top of them */}
        {arcs.map((a, i) => {
          const f = arms[a.from];
          const span = ((arms[a.to] - f + 360) % 360) || 360;
          const c = a.hl !== undefined ? HL[a.hl] : PLAIN;
          // Maths angles run anticlockwise, the SVG frame runs clockwise, so flip the sign
          return <path key={"s" + i} d={sector(cx, cy, r, -(f + span), -f)} fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />;
        })}
        {arms.map((deg, i) => (
          <line key={"a" + i} x1={cx} y1={cy} x2={(cx + L * Math.cos(rad(deg))).toFixed(2)} y2={(cy - L * Math.sin(rad(deg))).toFixed(2)}
            stroke="#15203b" strokeWidth="2.5" strokeLinecap="round" />
        ))}
        {arcs.map((a, i) => {
          const f = arms[a.from];
          const span = ((arms[a.to] - f + 360) % 360) || 360;
          const c = a.hl !== undefined ? HL[a.hl] : PLAIN;
          const mid = f + span / 2;
          return <Label key={"l" + i} cx={cx} cy={cy} R={R} midDeg={-mid} text={a.label} colour={c.text} />;
        })}
      </svg>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

// Small double-chevron marks on a line, showing that the two lines are parallel
function Chevrons({ y }) {
  const xs = [292, 306];
  return (
    <g stroke="#15203b" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {xs.map((x) => <path key={x} d={`M${x - 6},${y - 5} L${x},${y} L${x - 6},${y + 5}`} />)}
    </g>
  );
}

export function Parallel({ slant = 65, angles = [], caption, description }) {
  const W = 360, H = 260, yTop = 75, yBot = 195, r = 24, R = 46;
  const dy = yBot - yTop;
  const dx = dy / Math.tan(rad(slant));
  const P1 = [170, yTop];
  const P2 = [170 + dx, yBot];
  const k = 0.35;
  const T0 = [P1[0] - k * dx, yTop - k * dy];
  const T1 = [P2[0] + k * dx, yBot + k * dy];
  // Each intersection's sectors, in SVG degrees (clockwise from the right)
  const sectors = {
    dr: [0, slant],
    dl: [slant, 180],
    ul: [180, slant + 180],
    ur: [slant + 180, 360],
  };
  const centre = { top: P1, bottom: P2 };
  const desc = description ?? `Two parallel lines with a transversal. Marked angles: ${angles.map((a) => a.label).join(", ")}.`;
  return (
    <figure className={styles.figure}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.graph} role="img" aria-label={desc}>
        {angles.map((a, i) => {
          const [cx, cy] = centre[a.at];
          const [s, e] = sectors[a.pos];
          const c = a.hl !== undefined ? HL[a.hl] : PLAIN;
          return <path key={"s" + i} d={sector(cx, cy, r, s, e)} fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />;
        })}
        <line x1="20" y1={yTop} x2="340" y2={yTop} stroke="#15203b" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1={yBot} x2="340" y2={yBot} stroke="#15203b" strokeWidth="2.5" strokeLinecap="round" />
        <Chevrons y={yTop} />
        <Chevrons y={yBot} />
        <line x1={T0[0].toFixed(2)} y1={T0[1].toFixed(2)} x2={T1[0].toFixed(2)} y2={T1[1].toFixed(2)} stroke="#15203b" strokeWidth="2.5" strokeLinecap="round" />
        {angles.map((a, i) => {
          const [cx, cy] = centre[a.at];
          const [s, e] = sectors[a.pos];
          const c = a.hl !== undefined ? HL[a.hl] : PLAIN;
          return <Label key={"l" + i} cx={cx} cy={cy} R={R} midDeg={(s + e) / 2} text={a.label} colour={c.text} />;
        })}
      </svg>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
