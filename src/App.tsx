// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth';
import ForgotPassword from './pages/Auth/forgotPassword';
import ResetPassword from './pages/Auth/resetPassword';
import Register from './pages/Auth/register';
import Follows from './pages/Follows';
import PrivateRoute from './routes/PrivateRoute';
import Status from './pages/Status/Status';
import Profile from './pages/MyProfile';
import Search from './pages/Search';
import UserProfile from './pages/UsersProfile';

function App() {
  const logo = 'circle';
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follows" element={<Follows />} />
          <Route path="/status/:id" element={<Status />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword logo={logo} />}
        />
        <Route path="/reset-password" element={<ResetPassword logo={logo} />} />
      </Routes>
    </div>
  );
}

export default App;
