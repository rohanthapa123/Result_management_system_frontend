import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import ProtectedRoute from "./components/ProtecttedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import StudentDashboardLayout from "./layout/StudentDashboardLayout";
import TeacherDashboardLayout from "./layout/TeacherDashboardLayout";
import AddAdmin from "./pages/admin/addAdmin";
import AdminPage from "./pages/admin/adminPage";
import EditAdmin from "./pages/admin/editAdmin";
import AddClass from "./pages/class/addClass";
import ClassPage from "./pages/class/classPage";
import EditClass from "./pages/class/editClass";
import AdminComplain from "./pages/complain/AdminComplain";
import StudentComplain from "./pages/complain/StudentComplain";
import Dashboard from "./pages/dashboard/dashboard";
import StudentDashboard from "./pages/dashboard/student/student_dashboard";
import TeacherDashboard from "./pages/dashboard/teacher/TeacherDashboard";
import AddExam from "./pages/exam/addExam";
import EditExam from "./pages/exam/editExam";
import ExamPage from "./pages/exam/examPage";
import TeacherExamPage from "./pages/exam/teacher/examPage";
import LoginPage from "./pages/login/loginPage";
import MarkPage from "./pages/mark/admin/markPage";
import TeacherMarkPage from "./pages/mark/teacher/markPage";
import AddNotice from "./pages/notice/addNotice";
import EditNotice from "./pages/notice/editNotice";
import NoticePage from "./pages/notice/noticePage";
import StudentNotice from "./pages/notice/student/student.notice";
import ResultPage from "./pages/result/student/result";
import AddSection from "./pages/section/addSection";
import EditSection from "./pages/section/editSection";
import SectionPage from "./pages/section/sectionPage";
import AddStudent from "./pages/student/addStudent";
import EditStudent from "./pages/student/editStudent";
import StudentPage from "./pages/student/studentPage";
import AddSubject from "./pages/subject/addSubject";
import EditSubject from "./pages/subject/editSubject";
import SubjectPage from "./pages/subject/subjectPage";
import AddTeacher from "./pages/teacher/addTeacher";
import EditTeacher from "./pages/teacher/editTeacher";
import TeacherPage from "./pages/teacher/teacherPage";
import Profile from "./pages/viewAndEdit/profile";

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
          <Route path="*" element={<Navigate to={"/login"} />} />
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
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="exam" element={<TeacherExamPage />} />
          <Route path="mark" element={<TeacherMarkPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="notice/add" element={<AddNotice role="teacher" />} />
          <Route
            path="notice/edit/:id"
            element={<EditNotice role="teacher" />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Route>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
