/* ==========================================================================
   VISUALS (angles): parallel lines with F, Z and C shapes, and angles on a
   straight line, around a point and at crossing lines.
   Same format as visuals.js: lesson id, then heading.
   See Angles.jsx for the spec formats (kinds "parallel" and "rays").
   ========================================================================== */

export const VISUALS_ANGLES = {
  /* ---------------- Year 7: angle facts ---------------- */
  "y7-u8-l1": {
    "Types": {
      kind: "rays", arms: [0, 130],
      arcs: [{ from: 0, to: 1, label: "130° obtuse", hl: 0 }],
      caption: "An obtuse angle is between 90° and 180°.",
      description: "A ray pointing right and a second ray at 130 degrees, with the angle between them marked as obtuse.",
    },
  },
  "y7-u8-l3": {
    "The rule": {
      kind: "rays", arms: [0, 65, 180],
      arcs: [{ from: 0, to: 1, label: "65°", hl: 0 }, { from: 1, to: 2, label: "x", hl: 1 }],
      caption: "The angles on a straight line add to 180°, so x = 180° − 65° = 115°.",
      description: "A straight line with a ray from the middle. One angle is 65 degrees and the other is x.",
    },
  },
  "y7-u8-l4": {
    "The rule": {
      kind: "rays", arms: [0, 120, 270],
      arcs: [{ from: 0, to: 1, label: "120°", hl: 0 }, { from: 1, to: 2, label: "150°", hl: 1 }, { from: 2, to: 0, label: "x", hl: 2 }],
      caption: "The angles round a point add to 360°, so the third angle is 360° − 120° − 150° = 90°.",
      description: "Three rays from one point splitting the full turn into angles of 120 degrees, 150 degrees and x.",
    },
  },
  "y7-u8-l5": {
    "Two facts": {
      kind: "rays", arms: [0, 70, 180, 250],
      arcs: [
        { from: 0, to: 1, label: "70°", hl: 0 }, { from: 1, to: 2, label: "110°" },
        { from: 2, to: 3, label: "70°", hl: 0 }, { from: 3, to: 0, label: "110°" },
      ],
      caption: "Vertically opposite angles (the two blue ones) are equal. Neighbouring angles add to 180°.",
      description: "Two straight lines crossing. The two opposite angles are 70 degrees and the other two are 110 degrees.",
    },
  },

  /* ---------------- Year 8: parallel lines ---------------- */
  "y8-u8-l1": {
    "F shapes": {
      kind: "parallel", slant: 110,
      angles: [{ at: "top", pos: "ur", label: "70°", hl: 0 }, { at: "bottom", pos: "ur", label: "70°", hl: 0 }],
      caption: "F shape: the two blue angles in matching positions are equal.",
      description: "Two parallel lines with a transversal. The two angles in matching corners on the right are both 70 degrees.",
    },
  },
  "y8-u8-l2": {
    "Z shapes": {
      kind: "parallel", slant: 115,
      angles: [{ at: "top", pos: "dl", label: "65°", hl: 1 }, { at: "bottom", pos: "ur", label: "x", hl: 1 }],
      caption: "Z shape: alternate angles (the orange ones, on opposite sides of the transversal) are equal, so x = 65°.",
      description: "Two parallel lines with a transversal. The two angles on opposite sides of the transversal, inside the lines, are 65 degrees and x.",
    },
  },
  "y8-u8-l3": {
    "C shapes": {
      kind: "parallel", slant: 70,
      angles: [{ at: "top", pos: "dr", label: "70°", hl: 2 }, { at: "bottom", pos: "ur", label: "110°", hl: 2 }],
      caption: "C shape: co-interior angles (the green ones, on the same side of the transversal) add to 180°.",
      description: "Two parallel lines with a transversal. The two angles on the same side of the transversal, inside the lines, are 70 degrees and 110 degrees.",
    },
  },
};
