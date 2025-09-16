import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { clearUser, setError, checkAuthState } from './store/slices/authSlice';
import { useEffect } from 'react';
import React, { Suspense, lazy } from 'react';
import MainLandingB from './pages/MainLandingB/MainLandingB';
import ThanksPageOnFormDownload from './pages/ThanksPageOnFormDownload/ThanksPageOnFormDownload';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import GoogleAds from './pages/GoogleAds/GoogleAds';
import WebDevelopment from './pages/WebDevelopment/WebDevelopment';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import BusinessAutomation from './pages/BusinessAutomation/BusinessAutomation';
import GoogleAdsAudit from './pages/GoogleAdsAudit/GoogleAdsAudit';
import CookieConsent from './components/CookieConsent/CookieConsent';
import AutoServiceLanding from './pages/AutoServiceLanding/AutoServiceLanding';

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
  const location = useLocation();
  const hostname = window.location.hostname;

  useEffect(() => {
    dispatch(checkAuthState());
    // Якщо субдомен auto.impossiblead.com і ми на корені, редіректимо на /auto
    if (hostname === 'auto.impossiblead.com' && location.pathname === '/') {
      navigate('/auto');
    }
  }, [dispatch, navigate, location.pathname, hostname]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/login');
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  if (loading)
    return (
      <div className='loader-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

  if (error) return <div className='error'>Ошибка: {error}</div>;

  return (
    <div>
      <CookieConsent />
      <Suspense fallback={<div className='loading'>Загрузка...</div>}>
        <Routes>
          <Route path='/' element={<MainLandingB />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/thanks' element={<ThanksPageOnFormDownload />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/google-ads-audit' element={<GoogleAdsAudit />} />
          <Route path='/google-ads' element={<GoogleAds />} />
          <Route path='/web-development' element={<WebDevelopment />} />
          <Route path='/business-automation' element={<BusinessAutomation />} />
          <Route path='/auto' element={<AutoServiceLanding />} />
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
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
