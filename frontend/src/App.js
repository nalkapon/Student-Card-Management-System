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

function App() {
  const userId = getCurrentUserId();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Layout hideNavbar={true} theme={theme} setTheme={setTheme}><Login /></Layout>} />
        <Route path="/signup" element={<Layout hideNavbar={true} theme={theme} setTheme={setTheme}><SignUp /></Layout>} />
        <Route path="/home" element={userId ? <Layout theme={theme} setTheme={setTheme}><Home /></Layout> : <Navigate to="/login" />} />
        <Route path="/courses" element={<Layout theme={theme} setTheme={setTheme}><Courses /></Layout>} />
        <Route path="/enrollments" element={<Layout theme={theme} setTheme={setTheme}><Enrollments /></Layout>} />
        <Route path="/manage-friends" element={<Layout theme={theme} setTheme={setTheme}><ManageFriends /></Layout>} />
        <Route path="/student-cards" element={<Layout theme={theme} setTheme={setTheme}><StudentCards /></Layout>} />
        <Route path="/student-cards/validate-payment-method" element={<Layout theme={theme} setTheme={setTheme}><ValidatePaymentMethod /></Layout>} />
        <Route path="/users" element={<Layout theme={theme} setTheme={setTheme}><Users /></Layout>} />
        <Route path="/daily-menu" element={<Layout theme={theme} setTheme={setTheme}><DailyMenu /></Layout>} />
        <Route path="/empty-classrooms" element={<Layout theme={theme} setTheme={setTheme}><EmptyClassrooms /></Layout>} />
        <Route path="/syllabus" element={<Layout theme={theme} setTheme={setTheme}><Syllabus /></Layout>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
