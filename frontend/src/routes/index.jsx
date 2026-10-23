import React, { lazy } from 'react';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import PublicCourses from '../pages/public/Courses';

const Layout = lazy(() => import('../components/layout/Layout'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Dashboard = lazy(() => import('../dashboard/Dashboard'));
const AdminDashboard = lazy(() => import('../dashboard/AdminDashboard'));
const StudentDashboard = lazy(() => import('../dashboard/StudentDashboard'));
const TeacherDashboard = lazy(() => import('../dashboard/TeacherDashboard'));
const ParentDashboard = lazy(() => import('../dashboard/ParentDashboard'));
const Courses = lazy(() => import('../pages/Courses'));
const Subjects = lazy(() => import('../pages/Subjects'));
const Batches = lazy(() => import('../pages/Batches'));
const Exams = lazy(() => import('../pages/Exams'));
const Questions = lazy(() => import('../pages/Questions'));
const Assignments = lazy(() => import('../pages/Assignments'));
const Users = lazy(() => import('../pages/Users'));
const Students = lazy(() => import('../pages/Students'));
const Teachers = lazy(() => import('../pages/Teachers'));
const Attendance = lazy(() => import('../pages/Attendance'));
const Enrollments = lazy(() => import('../pages/Enrollments'));
const Results = lazy(() => import('../pages/Results'));
const Timetable = lazy(() => import('../pages/Timetable'));
const Parents = lazy(() => import('../pages/Parents'));
const Admissions = lazy(() => import('../pages/Admissions'));
const Notices = lazy(() => import('../pages/Notices'));
const Notifications = lazy(() => import('../pages/Notifications'));
const StudyMaterials = lazy(() => import('../pages/StudyMaterials'));
const Discussions = lazy(() => import('../pages/Discussions'));
const Grievances = lazy(() => import('../pages/Grievances'));

const routes = [
  { path: '/', element: <Home /> },
  { path: '/home', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/courses', element: <PublicCourses /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    path: 'dashboard',
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
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
    ],
  },
];

export default routes;