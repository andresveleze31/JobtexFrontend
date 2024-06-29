import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./layouts/PageLayout";
import Jobs from "./pages/Jobs";
import Employers from "./pages/Employers";
import Candidates from "./pages/Candidates";
import CandidateDetail from "./pages/CandidateDetail";
import EmployerDetails from "./pages/EmployerDetails";
import JobDetails from "./pages/JobDetails";
import EmployersLayout from "./layouts/EmployersLayout";
import Profile from "./pages/admin/employer/Profile";
import EmployerJobs from "./pages/admin/employer/EmployerJobs";
import NewJob from "./pages/admin/employer/NewJob";
import Applicants from "./pages/admin/employer/Applicants";
import Favorites from "./pages/admin/employer/Favorites";
import Messages from "./pages/admin/employer/Messages";
import ChangePassword from "./pages/admin/employer/ChangePassword";
import Logout from "./pages/admin/employer/Logout";
import CandidatesLayout from "./layouts/CandidatesLayout";
import CandidateProfile from "./pages/admin/candidate/CandidateProfile";
import CandidateJobs from "./pages/admin/candidate/CandidateJobs";
import CandidateResume from "./pages/admin/candidate/CandidateResume";
import CandidateFollowers from "./pages/admin/candidate/CandidateFollowers";
import CandidateFavorites from "./pages/admin/candidate/CandidateFavorites";
import CandidateMessages from "./pages/admin/candidate/CandidateMessages";
import CandidatePassword from "./pages/admin/candidate/CandidatePassword";
import CandidateLogout from "./pages/admin/candidate/CandidateLogout";
import { JobtexProvider } from "./context/JobtexProvider";
import { AuthCandidateProvider } from "./context/AuthCandidateProvider";
import { AuthEmployerProvider } from "./context/AuthEmployerProvider";
import ProtectedCandidate from "./layouts/ProtectedCandidate";
import ProtectedEmployer from "./layouts/ProtectedEmployer";
import EditJob from "./pages/admin/employer/EditJob";

function App() {
  return (
    <BrowserRouter>
      <JobtexProvider>
        <AuthCandidateProvider>
          <AuthEmployerProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<PageLayout />}>
                <Route path="jobs" element={<Jobs />} />
                <Route path="employers" element={<Employers />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="candidates/:id" element={<CandidateDetail />} />
                <Route path="employers/:id" element={<EmployerDetails />} />
                <Route path="jobs/:id" element={<JobDetails />} />
              </Route>

              <Route path="/" element={<ProtectedEmployer />}>
                <Route path="/admin/employer/" element={<EmployersLayout />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="jobs" element={<EmployerJobs />} />
                  <Route path="create-job" element={<NewJob />} />
                  <Route path="edit-job" element={<EditJob />} />
                  <Route path="job-applicants" element={<Applicants />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="change-password" element={<ChangePassword />} />
                  <Route path="logout" element={<Logout />} />
                </Route>
              </Route>

              <Route path="/" element={<ProtectedCandidate />}>
                <Route path="/admin/candidate/" element={<CandidatesLayout />}>
                  <Route path="profile" element={<CandidateProfile />} />
                  <Route path="my-applied" element={<CandidateJobs />} />
                  <Route path="resume" element={<CandidateResume />} />
                  <Route path="followers" element={<CandidateFollowers />} />
                  <Route path="favorites" element={<CandidateFavorites />} />
                  <Route path="messages" element={<CandidateMessages />} />
                  <Route
                    path="change-password"
                    element={<CandidatePassword />}
                  />
                  <Route path="logout" element={<CandidateLogout />} />
                </Route>
              </Route>
            </Routes>
          </AuthEmployerProvider>
        </AuthCandidateProvider>
      </JobtexProvider>
    </BrowserRouter>
  );
}

export default App;
