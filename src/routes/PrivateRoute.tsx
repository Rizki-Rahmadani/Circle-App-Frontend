import PrivateLayout from '@/layouts/PrivateLayout';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  // Cek apakah data pengguna sudah ada di localStorage
  const isAuthenticated = !!localStorage.getItem('auth-token');

  return isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
