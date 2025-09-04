import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { clearUser, setError, checkAuthState } from './store/slices/authSlice';
import { useEffect } from 'react';
import React, { Suspense, lazy } from 'react';
import MainLandingB from './pages/MainLandingB/MainLandingB';
import ThanksPageOnFormDownload from './pages/ThanksPageOnFormDownload/ThanksPageOnFormDownload';
import Chat from './pages/Chat/Chat';

const MainLandingA = lazy(() => import('./pages/MainLandingA/MainLandingA'));
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

    const currentPath = window.location.pathname;
    const storedVersion = localStorage.getItem('abVersion');

    // Список страниц, где работает только A/B логика
    const abPaths = ['/a', '/b', '/'];

    if (abPaths.includes(currentPath)) {
      if (!storedVersion) {
        // Если версии нет, определяем её
        if (currentPath === '/a') {
          localStorage.setItem('abVersion', 'A');
        } else if (currentPath === '/b') {
          localStorage.setItem('abVersion', 'B');
        } else {
          // Если зашёл на "/" — назначаем A по умолчанию
          localStorage.setItem('abVersion', 'B');
          navigate('/', { replace: true });
        }
      } else {
        // Если версия уже есть
        if (storedVersion === 'A' && currentPath !== '/a') {
          navigate('/a', { replace: true });
        } else if (storedVersion === 'B' && currentPath !== '/b') {
          navigate('/b', { replace: true });
        }
      }
    }
  }, [dispatch, navigate]);

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
          <Route path='/' element={<MainLandingB />} />
          <Route path='/a' element={<MainLandingA />} />
          <Route path='/b' element={<MainLandingB />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/thanks' element={<ThanksPageOnFormDownload />} />
          {/* <Route path='/chat' element={<Chat />} /> */}
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
          <Route
            path='*'
            element={
              localStorage.getItem('abVersion') === 'B' ? <MainLandingB /> : <MainLandingA />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
