/* ==========================================================================
   Reads a list of pupils from a CSV file (for example, saved from Excel)
   --------------------------------------------------------------------------
   Each row should have three columns: first name, last name, year group.
   A header row (one that starts with "first name") is skipped.
   Commas, semicolons and tabs are all accepted as separators, because
   Excel saves a different one depending on the country setting.

   Each row comes back with a "problem" message if something is wrong, so
   the teacher can fix it before any accounts are made.
   ========================================================================== */

export function parsePupilCsv(text) {
  // Remove the invisible character some spreadsheet programs add at the start,
  // then split into lines, ignoring blank ones.
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((line) => line.trim() !== "");

  return lines.map((line, index) => {
    // Pick the separator this line uses.
    const separator = line.includes("\t") ? "\t" : (line.includes(";") && !line.includes(",") ? ";" : ",");
    const cells = line.split(separator).map((cell) => cell.trim().replace(/^"(.*)"$/, "$1").trim());

    return { index, cells };
  }).filter(({ index, cells }) => !(index === 0 && /^first/i.test(cells[0] ?? "")))
    .map(({ index, cells }) => {
      const [firstName = "", lastName = "", yearText = ""] = cells;
      const yearGroup = Number(yearText);
      let problem = "";
      if (!firstName || !lastName) problem = "Needs a first name and a last name";
      else if (!(yearGroup >= 7 && yearGroup <= 11)) problem = "Year group must be 7 to 11";
      return { line: index + 1, firstName, lastName, yearGroup, problem };
    });
}
