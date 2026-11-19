/* ==========================================================================
   The strands (topics) of the curriculum
   --------------------------------------------------------------------------
   The first six run through Years 7 to 11 (GCSE). The last three are A level
   only: pure, A level statistics and mechanics. Their `aLevel: true` lets
   menus show them under an "A level" heading, separate from GCSE. The GCSE
   statistics strand and the A level statistics strand are different strands,
   so each has its own page and its own units.
   --------------------------------------------------------------------------
   Colours were checked with a palette validator so they stay distinguishable
   for colour-blind students. Two of them are pale against white, so a
   strand is ALWAYS shown with its name as well, never by colour alone.
   `ink` is a darker shade used for text. The two A level colours were
   added later and checked for text contrast (ink on white and on tint both
   pass WCAG AA, at least 5.2:1).
   ========================================================================== */
export const STRANDS = [
  { id: "number", name: "Number", colour: "#2a78d6", ink: "#1b5aa6", tint: "#e8f1fc", icon: "number" },
  { id: "algebra", name: "Algebra", colour: "#eb6834", ink: "#b2461a", tint: "#fdeee7", icon: "algebra" },
  { id: "ratio", name: "Ratio, Proportion and Rates of Change", short: "Ratio & Proportion", colour: "#1baf7a", ink: "#11734f", tint: "#e3f6ef", icon: "ratio" },
  { id: "geometry", name: "Geometry and Measures", short: "Geometry", colour: "#6250d6", ink: "#4a3aa8", tint: "#eeebfb", icon: "geometry" },
  { id: "statistics", name: "Statistics", colour: "#008300", ink: "#006400", tint: "#e3f3e3", icon: "statistics" },
  { id: "probability", name: "Probability", colour: "#e87ba4", ink: "#a8325f", tint: "#fcebf2", icon: "probability" },
  { id: "pure", name: "Pure Mathematics", short: "Pure", colour: "#c48a0a", ink: "#875d00", tint: "#fbf2dc", icon: "pure", aLevel: true },
  { id: "alevel-statistics", name: "A level Statistics", short: "Statistics", colour: "#6a9a1a", ink: "#3d6400", tint: "#eef6dc", icon: "statistics", aLevel: true },
  { id: "mechanics", name: "Mechanics", colour: "#118da3", ink: "#0b6476", tint: "#e1f3f6", icon: "mechanics", aLevel: true },
];

export const getStrand = (id) => STRANDS.find((s) => s.id === id);
