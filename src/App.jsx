/* ==========================================================================
   App: the list of pages (routes)
   --------------------------------------------------------------------------
   Each <Route> pairs an address with a page. ":year", ":unitId" etc. are
   placeholders: /lesson/y7-u1-l3 opens LessonPage with lessonId "y7-u1-l3".
   ========================================================================== */
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { ProgressProvider } from "./state/ProgressContext.jsx";
import ProgressSync from "./state/ProgressSync.jsx";
import { PupilReportPage, ReportsPage } from "./pages/PupilReports.jsx";
import { AuthProvider, useAuth } from "./state/AuthContext.jsx";
import MembersOnly from "./components/MembersOnly.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import YearPage from "./pages/YearPage.jsx";
import UnitPage from "./pages/UnitPage.jsx";
import TopicPage from "./pages/TopicPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import KS3Page from "./pages/KS3Page.jsx";
import GCSEPage from "./pages/GCSEPage.jsx";
import RevisionPage from "./pages/RevisionPage.jsx";
import PlannerPage from "./pages/PlannerPage.jsx";
import PracticePage from "./pages/PracticePage.jsx";
import WorksheetsPage from "./pages/WorksheetsPage.jsx";
import { AssessmentRunPage, AssessmentsPage } from "./pages/AssessmentsPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";
import CurriculumMapPage from "./pages/CurriculumMapPage.jsx";
import TutorPage from "./pages/TutorPage.jsx";
import { AboutPage, ContactPage } from "./pages/InfoPages.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/* Pages only paid members can see. Everything else (home, about, contact,
   the privacy notice and the account page, where people log in) is open. */
const MEMBERS_ONLY_PAGES = [
  /^\/year\//, /^\/unit\//, /^\/topic\//, /^\/lesson\//,
  /^\/ks3$/, /^\/gcse$/, /^\/revision\//, /^\/practice$/, /^\/worksheets$/,
  /^\/assessments/, /^\/progress$/, /^\/tutor$/, /^\/pupils\//, /^\/reports$/,
];

/* The page for each address. */
function PageRoutes() {
  const { pathname } = useLocation();
  const { hasAccess } = useAuth();
  if (!hasAccess && MEMBERS_ONLY_PAGES.some((pattern) => pattern.test(pathname))) return <MembersOnly />;
  return (
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/year/:year" element={<YearPage />} />
          <Route path="/unit/:unitId" element={<UnitPage />} />
          <Route path="/topic/:strandId" element={<TopicPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/ks3" element={<KS3Page />} />
          <Route path="/gcse" element={<GCSEPage />} />
          <Route path="/revision/foundation" element={<RevisionPage tier="F" />} />
          <Route path="/revision/higher" element={<RevisionPage tier="H" />} />
          <Route path="/revision/planner" element={<PlannerPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/worksheets" element={<WorksheetsPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/assessments/:assessmentId" element={<AssessmentRunPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/curriculum-map" element={<CurriculumMapPage />} />
          <Route path="/tutor" element={<TutorPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/pupils/:studentId" element={<PupilReportPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
      <ProgressProvider>
        <ProgressSync />
        <Layout>
          <PageRoutes />
        </Layout>
      </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
