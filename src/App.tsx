import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import { Route, Routes } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';

import ResetPasswordInfoPage from './pages/auth/ResetPasswordInfoPage';
import HomePage from './pages/HomePage';
import MyShelfPage from './pages/book/MyShelfPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdminRoute from './routes/AdminRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import PasswordRequestPage from './pages/admin/PasswordRequestPage';
import ReadingStatusPage from './pages/admin/ReadingStatusPage';

const App = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* user area */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/changepassword"
              element={<ChangePasswordPage />}
            ></Route>
            <Route
              path="/information"
              element={<ResetPasswordInfoPage />}
            ></Route>
          </Route>

          {/* only login user area */}
          <Route element={<ProtectedRoute />}>
            <Route path="/bookarchive" element={<HomePage />}></Route>
            <Route path="/bookarchive/:userId" element={<MyShelfPage />} />
          </Route>

          {/* admin-only routes*/}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />}>
              <Route path="reading-status" element={<ReadingStatusPage />} />
              <Route
                path="password-requests"
                element={<PasswordRequestPage />}
              />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
};

export default App;
