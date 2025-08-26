// src/components/PrivateRoute/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, roles }) {
  const { user, loading } = useSelector((state) => state.auth);

  // Пока идёт инициализация — не делаем редиректы
  if (loading) {
    console.log('auth state', { user, loading });
    return <div className='loading'>Проверка доступа...</div>;
  }

  if (!user || (roles && !roles.includes(user.role))) {
    console.log('auth state', { user, loading });
    return <Navigate to='/login' replace />;
  }

  return children;
}
