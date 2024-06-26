import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  redirect,
} from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import StudentPage from "./pages/student/studentPage";
import TeacherPage from "./pages/teacher/teacherPage";
import ProtectedRoute from "./components/ProtecttedRoute";
import NoticePage from "./pages/notice/noticePage";
import AddNotice from "./pages/notice/addNotice";
import AddStudent from "./pages/student/addStudent";
import AddTeacher from "./pages/teacher/addTeacher";
import ClassPage from "./pages/class/classPage";
import AddClass from "./pages/class/addClass";
import StudentDashboardLayout from "./layout/StudentDashboardLayout";
import TeacherDashboardLayout from "./layout/TeacherDashboardLayout";
import StudentComplain from "./pages/complain/StudentComplain";
import AdminComplain from "./pages/complain/AdminComplain";
import Profile from "./pages/viewAndEdit/profile";
import StudentNotice from "./pages/notice/student/student.notice";
import SectionPage from "./pages/section/sectionPage";
import AddSection from "./pages/section/addSection";
import SubjectPage from "./pages/subject/subjectPage";
import AddSubject from "./pages/subject/addSubject";
import ExamPage from "./pages/exam/examPage";
import AddExam from "./pages/exam/addExam";
import MarkPage from "./pages/mark/admin/markPage";
import AddMark from "./pages/mark/teacher/addMark";
import AdminPage from "./pages/admin/adminPage";
import AddAdmin from "./pages/admin/addAdmin";
import TeacherExamPage from "./pages/exam/teacher/examPage";
import TeacherMarkPage from "./pages/mark/teacher/markPage";
import TeacherAddMark from "./pages/mark/teacher/addMark";
import ResultPage from "./pages/result/student/result";
import StudentDashboard from "./pages/dashboard/student/student_dashboard";
import EditNotice from "./pages/notice/editNotice";
import EditSubject from "./pages/subject/editSubject";
import EditExam from "./pages/exam/editExam";
import EditClass from "./pages/class/editClass";
import EditSection from "./pages/section/editSection";
import EditTeacher from "./pages/teacher/editTeacher";
import EditStudent from "./pages/student/editStudent";
import EditAdmin from "./pages/admin/editAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              Component={<DashboardLayout />}
              permittedRole="admin"
            />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admins" element={<AdminPage />} />
          <Route path="admins/add" element={<AddAdmin />} />
          <Route path="admins/edit/:id" element={<EditAdmin />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="teachers/edit/:id" element={<EditTeacher />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="notice/add" element={<AddNotice role="admin" />} />
          <Route path="notice/edit/:id" element={<EditNotice role="admin" />} />
          <Route path="class" element={<ClassPage />} />
          <Route path="class/add" element={<AddClass />} />
          <Route path="class/edit/:id" element={<EditClass />} />
          <Route path="exam" element={<ExamPage />} />
          <Route path="exam/add" element={<AddExam />} />
          <Route path="exam/edit/:id" element={<EditExam />} />
          <Route path="subject" element={<SubjectPage />} />
          <Route path="subject/add" element={<AddSubject />} />
          <Route path="subject/edit/:id" element={<EditSubject />} />
          <Route path="mark" element={<MarkPage />} />
          <Route path="section" element={<SectionPage />} />
          <Route path="section/add" element={<AddSection />} />
          <Route path="section/edit/:id" element={<EditSection />} />
          <Route path="complains" element={<AdminComplain />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Route>
        <Route
          path="/student/*"
          element={
            <ProtectedRoute
              Component={<StudentDashboardLayout />}
              permittedRole="student"
            />
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="notice" element={<StudentNotice />} />
          <Route path="complains" element={<StudentComplain />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute
              Component={<TeacherDashboardLayout />}
              permittedRole="teacher"
            />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="exam" element={<TeacherExamPage />} />
          <Route path="mark" element={<TeacherMarkPage />} />
          <Route path="mark/add" element={<TeacherAddMark />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="notice/add" element={<AddNotice role="teacher" />} />
          <Route path="notice/edit/:id" element={<EditNotice role="teacher" />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
