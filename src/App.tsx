import LoginPage from './pages/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>📚 BOOKARCHIVE-2025</h1>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/changepassword" element={<ChangePasswordPage/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
