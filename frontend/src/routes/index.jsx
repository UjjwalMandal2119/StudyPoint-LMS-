import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Layout from '../components/layout/Layout';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import ParentDashboard from '../pages/parent/ParentDashboard';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';

import Courses from '../pages/Courses';
import Subjects from '../pages/Subjects';
import Batches from '../pages/Batches';
import Exams from '../pages/Exams';
import Questions from '../pages/Questions';
import Assignments from '../pages/Assignments';
import Users from '../pages/Users';
import Students from '../pages/Students';
import Teachers from '../pages/Teachers';
import Attendance from '../pages/Attendance';
import Enrollments from '../pages/Enrollments';
import Results from '../pages/Results';
import Timetable from '../pages/Timetable';
import Parents from '../pages/Parents';
import Admissions from '../pages/Admissions';
import Notices from '../pages/Notices';
import Notifications from '../pages/Notifications';
import StudyMaterials from '../pages/StudyMaterials';
import Discussions from '../pages/Discussions';
import Grievances from '../pages/Grievances';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'admin-dashboard', element: <AdminDashboard /> },
      { path: 'student-dashboard', element: <StudentDashboard /> },
      { path: 'teacher-dashboard', element: <TeacherDashboard /> },
      { path: 'parent-dashboard', element: <ParentDashboard /> },
      { path: 'courses', element: <Courses /> },
      { path: 'subjects', element: <Subjects /> },
      { path: 'batches', element: <Batches /> },
      { path: 'exams', element: <Exams /> },
      { path: 'questions', element: <Questions /> },
      { path: 'assignments', element: <Assignments /> },
      { path: 'users', element: <Users /> },
      { path: 'students', element: <Students /> },
      { path: 'teachers', element: <Teachers /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'enrollments', element: <Enrollments /> },
      { path: 'results', element: <Results /> },
      { path: 'timetable', element: <Timetable /> },
      { path: 'parents', element: <Parents /> },
      { path: 'admissions', element: <Admissions /> },
      { path: 'notices', element: <Notices /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'study-materials', element: <StudyMaterials /> },
      { path: 'discussions', element: <Discussions /> },
      { path: 'grievances', element: <Grievances /> },
      { index: true, element: <Navigate to="/dashboard" replace /> },
    ],
  },
];

export default routes;