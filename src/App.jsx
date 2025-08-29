import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { clearUser, setError, checkAuthState } from './store/slices/authSlice';
import { useEffect } from 'react';
import React, { Suspense, lazy } from 'react';

const MainLanding = lazy(() => import('./pages/MainLanding/MainLanding'));
const LoginForm = lazy(() => import('./pages/Login/Login'));
const RegisterForm = lazy(() => import('./pages/Register/Register'));
const Home = lazy(() => import('./components/DashboardComponents/Home/Home'));
const Clients = lazy(() => import('./components/DashboardComponents/Clients/Clients'));
const Sidebar = lazy(() => import('./components/DashboardComponents/Sidebar/Sidebar'));
const TrelloTable = lazy(() => import('./components/DashboardComponents/TrelloTable/TrelloTable'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute/PrivateRoute'));

export default function App() {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/login');
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  if (loading) return <div className='loading'>Загрузка...</div>;
  if (error) return <div className='error'>Ошибка: {error}</div>;

  return (
    <div>
      <Suspense fallback={<div className='loading'>Загрузка...</div>}>
        <Routes>
          <Route path='/' element={<MainLanding />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route
            path='/home'
            element={
              <PrivateRoute roles={['admin', 'moderator']}>
                <div className='app'>
                  <Sidebar onSignOut={handleSignOut} />
                  <div className='main-content'>
                    <Home />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path='/clients'
            element={
              <PrivateRoute roles={['admin', 'moderator']}>
                <div className='app'>
                  <Sidebar onSignOut={handleSignOut} />
                  <div className='main-content'>
                    <Clients />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path='/trello-table'
            element={
              <PrivateRoute roles={['admin', 'moderator']}>
                <div className='app'>
                  <Sidebar onSignOut={handleSignOut} />
                  <div className='main-content'>
                    <TrelloTable />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route path='*' element={<MainLanding />} />
        </Routes>
      </Suspense>
    </div>
  );
}
