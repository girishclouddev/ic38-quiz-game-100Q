import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './utils/auth';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Round from './pages/Round';
import Result from './pages/Result';
import MockTest from './pages/MockTest';
import MockResult from './pages/MockResult';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/round/:id"
          element={<ProtectedRoute><Round /></ProtectedRoute>}
        />
        <Route
          path="/result"
          element={<ProtectedRoute><Result /></ProtectedRoute>}
        />
        <Route
          path="/mock-test"
          element={<ProtectedRoute><MockTest /></ProtectedRoute>}
        />
        <Route
          path="/mock-result"
          element={<ProtectedRoute><MockResult /></ProtectedRoute>}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute><Settings /></ProtectedRoute>}
        />
        {/* Default: redirect to dashboard (or login if unauthenticated) */}
        <Route
          path="*"
          element={<Navigate to={getCurrentUser() ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
