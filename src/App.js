import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
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
import { useState } from "react";
import Profile from "./pages/viewAndEdit/profile";
import StudentNotice from "./pages/notice/student/student.notice";
import SectionPage from "./pages/section/sectionPage";
import AddSection from "./pages/section/addSection";

function App() {
  const [userData, setUserData] = useState();
  const handleLoginData = (user) =>{
    setUserData(user)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLoginData} />} />

        <Route
          path="/admin/*"
          element={<ProtectedRoute Component={<DashboardLayout user={userData} />} permittedRole='admin'/>}
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="notice/add" element={<AddNotice />} />
          <Route path="class" element={<ClassPage />} />
          <Route path="class/add" element={<AddClass />} />
          <Route path="section" element={<SectionPage />} />
          <Route path="section/add" element={<AddSection />} />
          <Route path="complains" element={<AdminComplain />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/student/*"
          element={<ProtectedRoute Component={<StudentDashboardLayout user={userData} />} permittedRole="student" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="notice" element={<StudentNotice />} />
          <Route path="complains" element={<StudentComplain />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/teacher/*"
          element={<ProtectedRoute Component={<TeacherDashboardLayout user={userData} />} permittedRole="teacher" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to={"/login"} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
