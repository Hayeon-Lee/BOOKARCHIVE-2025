import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import { Route, Routes } from 'react-router-dom';
import ResetPasswordInfoPage from './pages/auth/ResetPasswordInfoPage';
import HomePage from './pages/HomePage';
import MyShelfPage from './pages/book/MyShelfPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import Header from './components/common/Header';

const App = () => {
  return (
    <div>
      <Header />
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
      </Routes>
    </div>
  );
};

export default App;
