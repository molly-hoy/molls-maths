/* ==========================================================================
   THE MAIN MENU
   --------------------------------------------------------------------------
   The header draws its menu from this list, and the site search uses it to
   find pages. Change a page here and both update.

   Each top-level item is one of:
     • a single link:  { to: "/progress", label: "My progress" }
     • a drop-down:    { label: "Learn", sections: [ ... ] }
         A drop-down holds one or more sections. Each section has an optional
         small heading and a list of links. A link can have a "hint": the
         short grey description shown under it (also used by the search).
     • the topics menu: { label: "Topics", topics: true }
         Its contents are made automatically from the curriculum (every
         topic and its units), so there is nothing to list here.

   Options on a drop-down:
     wide: true        show its sections side by side
     alignRight: true  open leftwards (for items near the right of the bar)
   ========================================================================== */
export const NAV = [
  { to: "/", label: "Home", end: true },
  {
    label: "Learn",
    wide: true,
    sections: [
      {
        heading: "Year groups",
        links: [
          { to: "/year/7", label: "Year 7" },
          { to: "/year/8", label: "Year 8" },
          { to: "/year/9", label: "Year 9" },
          { to: "/year/10", label: "Year 10" },
          { to: "/year/11", label: "Year 11" },
        ],
      },
      {
        heading: "Courses",
        links: [
          { to: "/ks3", label: "KS3 Mathematics", hint: "Years 7 to 9" },
          { to: "/gcse", label: "GCSE Mathematics", hint: "Years 10 and 11" },
          { to: "/curriculum-map", label: "Curriculum map", hint: "Years 7 to 11, unit by unit" },
        ],
      },
    ],
  },
  { label: "Topics", topics: true },
  {
    label: "Practise",
    sections: [
      {
        links: [
          { to: "/practice", label: "Practice questions", hint: "Answer online and get instant feedback" },
          { to: "/worksheets", label: "Worksheets", hint: "Printable PDFs with answers" },
          { to: "/assessments", label: "Quizzes and assessments", hint: "Check what you've learned" },
        ],
      },
    ],
  },
  {
    label: "Revision",
    sections: [
      {
        links: [
          { to: "/revision/foundation", label: "Foundation revision", hint: "GCSE Foundation tier" },
          { to: "/revision/higher", label: "Higher revision", hint: "GCSE Higher tier" },
          { to: "/revision/planner", label: "Revision planner", hint: "Plan your weeks before the exams" },
        ],
      },
    ],
  },
  { to: "/progress", label: "My progress" },
  {
    label: "About",
    alignRight: true,
    sections: [
      {
        links: [
          { to: "/about", label: "About Moll's Maths" },
          { to: "/contact", label: "Contact" },
        ],
      },
    ],
  },
];

/** Every page link in the menu as a flat list (used by the search). */
export const NAV_PAGES = NAV.flatMap((item) => {
  if (item.to) return [{ to: item.to, label: item.label, hint: "" }];
  if (item.sections) return item.sections.flatMap((s) => s.links.map((l) => ({ ...l, group: s.heading ?? item.label })));
  return [];
});
