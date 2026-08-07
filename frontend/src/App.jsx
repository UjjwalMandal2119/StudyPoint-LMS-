import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Subjects from './pages/Subjects';
import Batches from './pages/Batches';
import Exams from './pages/Exams';
import Questions from './pages/Questions';
import Assignments from './pages/Assignments';
import Users from './pages/Users';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Attendance from './pages/Attendance';
import Enrollments from './pages/Enrollments';
import Results from './pages/Results';
import Timetable from './pages/Timetable';
import Parents from './pages/Parents';
import Admissions from './pages/Admissions';
import Notices from './pages/Notices';
import Notifications from './pages/Notifications';
import StudyMaterials from './pages/StudyMaterials';
import Discussions from './pages/Discussions';
import Grievances from './pages/Grievances';

import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="parent-dashboard" element={<ParentDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="batches" element={<Batches />} />
        <Route path="exams" element={<Exams />} />
        <Route path="questions" element={<Questions />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="users" element={<Users />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="enrollments" element={<Enrollments />} />
        <Route path="results" element={<Results />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="parents" element={<Parents />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="notices" element={<Notices />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="study-materials" element={<StudyMaterials />} />
        <Route path="discussions" element={<Discussions />} />
        <Route path="grievances" element={<Grievances />} />
      </Route>
    </Routes>
  );
}

export default App;
