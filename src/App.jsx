// src/App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import Home from './components/DashboardComponents/Home/Home';
import Clients from './components/DashboardComponents/Clients/Clients';
import Sidebar from './components/DashboardComponents/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { clearUser, setError, checkAuthState } from './store/slices/authSlice';
import { useEffect } from 'react';
import LoginForm from './pages/Login/Login';
import RegisterForm from './pages/Register/Register';
import MainLanding from './pages/MainLanding/MainLanding';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import TrelloTable from './components/DashboardComponents/TrelloTable/TrelloTable';

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
      <Routes>
        {/* Публичные */}
        <Route path='/' element={<MainLanding />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        {/* Приватные */}
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
    </div>
  );
}
