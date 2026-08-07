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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
        <Route path="courses" element={<Courses />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="batches" element={<Batches />} />
        <Route path="exams" element={<Exams />} />
        <Route path="questions" element={<Questions />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;

