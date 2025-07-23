import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import ManageFriends from './pages/ManageFriends';
import StudentCards from './pages/StudentCards';
import Users from './pages/Users';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import DailyMenu from './pages/DailyMenu';
import EmptyClassrooms from './pages/EmptyClassrooms';
import ValidatePaymentMethod from './pages/ValidatePaymentMethod';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { getCurrentUserId } from './utils/userUtils';
import ProtectedRoute from './components/ProtectedRoute'; // Burası önemli!

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Layout hideNavbar={true}><Login /></Layout>} />
        <Route path="/signup" element={<Layout hideNavbar={true}><SignUp /></Layout>} />

        {/* Protected (Korumalı) tüm sayfalar */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><Home /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><Courses /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/enrollments"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><Enrollments /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-friends"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><ManageFriends /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-cards"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><StudentCards /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-cards/validate-payment-method"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><ValidatePaymentMethod /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><Users /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/daily-menu"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><DailyMenu /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/empty-classrooms"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><EmptyClassrooms /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/syllabus"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}><Syllabus /></Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
