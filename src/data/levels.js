/* ==========================================================================
   WHICH LEVELS ARE LIVE
   --------------------------------------------------------------------------
   ALEVEL_UNDER_CONSTRUCTION = true   → A level is shown as "Under construction" and locked:
       • its menu links and topics are greyed out and can't be opened
       • every A level address (Year 12, Year 13, its units, lessons, topics
         and the A level page) shows the Under construction page instead
       • its entries are left out of site search
   Set it to false when the A level content is ready to open.
   ========================================================================== */
export const ALEVEL_UNDER_CONSTRUCTION = true;

// A level topics (strands that only exist at A level)
export const ALEVEL_TOPICS = ["pure", "alevel-statistics", "mechanics"];

// Is this address part of the locked A level section?
export function isLockedPath(pathname) {
  if (!ALEVEL_UNDER_CONSTRUCTION || !pathname) return false;
  const path = pathname.replace(/\/$/, "");
  if (path === "/a-level") return true;
  if (/^\/year\/1[23]$/.test(path)) return true;
  if (/^\/(unit|lesson|assessments)\/y1[23]-/.test(path)) return true;
  if (path.startsWith("/topic/")) return ALEVEL_TOPICS.includes(path.split("/")[2]);
  return false;
}

// Is this topic (strand) locked?
export const isLockedTopic = (strandId) => ALEVEL_UNDER_CONSTRUCTION && ALEVEL_TOPICS.includes(strandId);

// Is this unit or lesson id part of Year 12 or 13?
export const isLockedId = (id) => ALEVEL_UNDER_CONSTRUCTION && /^y1[23]-/.test(id);
