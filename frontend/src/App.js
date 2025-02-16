import React, { useEffect } from 'react';
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
import { getCurrentUserId } from './utils/userUtils'; // Kullanıcı ID kontrolü

function App() {
  const userId = getCurrentUserId(); // Kullanıcı ID'sini kontrol et

  return (
    <Router>
      <Routes>
        {/* İlk başta login sayfasına yönlendirme */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Sayfası */}
        <Route
          path="/login"
          element={
            <Layout hideNavbar={true}>
              <Login />
            </Layout>
          }
        />

        {/* Sign Up Sayfası */}
        <Route
          path="/signup"
          element={
            <Layout hideNavbar={true}>
              <SignUp />
            </Layout>
          }
        />

        {/* Home Sayfası - Kullanıcı giriş yaptıysa gösterilecek */}
        <Route
          path="/home"
          element={
            userId ? (
              <Layout hideNavbar={false}>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" /> // Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendir
            )
          }
        />

        {/* Diğer Routes (Navbar ile birlikte) */}
        <Route
          path="/courses"
          element={
            <Layout hideNavbar={false}>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/enrollments"
          element={
            <Layout hideNavbar={false}>
              <Enrollments />
            </Layout>
          }
        />
        <Route
          path="/manage-friends"
          element={
            <Layout hideNavbar={false}>
              <ManageFriends />
            </Layout>
          }
        />
        <Route
          path="/student-cards"
          element={
            <Layout hideNavbar={false}>
              <StudentCards />
            </Layout>
          }
        />
        <Route
          path="/student-cards/validate-payment-method"
          element={
            <Layout hideNavbar={false}>
              <ValidatePaymentMethod />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout hideNavbar={false}>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/daily-menu"
          element={
            <Layout hideNavbar={false}>
              <DailyMenu />
            </Layout>
          }
        />
        <Route
          path="/empty-classrooms"
          element={
            <Layout hideNavbar={false}>
              <EmptyClassrooms />
            </Layout>
          }
        />
        <Route
          path="/syllabus"
          element={
            <Layout hideNavbar={false}>
              <Syllabus />
            </Layout>
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
