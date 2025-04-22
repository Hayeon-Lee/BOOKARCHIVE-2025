import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import { Route, Routes } from 'react-router-dom';
import ResetPasswordInfoPage from './pages/auth/ResetPasswordInfoPage';
import HomePage from './pages/HomePage';
import MyShelfPage from './pages/book/MyShelfPage';

const App = () => {
  return (
    <div>
      <h1>📚 BOOKARCHIVE-2025</h1>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/changepassword" element={<ChangePasswordPage />}></Route>
        <Route path="/information" element={<ResetPasswordInfoPage />}></Route>
        <Route path="/bookarchive" element={<HomePage />}></Route>
        <Route path="/bookarchive/:userId" element={<MyShelfPage/>} />
      </Routes>
    </div>
  );
};

export default App;
