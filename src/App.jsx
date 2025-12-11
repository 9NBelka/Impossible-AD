import { Routes, Route, useLocation } from 'react-router-dom';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { clearUser, setError, checkAuthState } from './store/slices/authSlice';
import { useEffect, Suspense, lazy } from 'react';

// IMPOSSIBLEAD MAIN
import MainLandingB from './pages/MainLandingB/MainLandingB';

// IMPOSSIBLEAD ThanksPage
import ThanksPageOnFormDownload from './pages/ThanksPageOnFormDownload/ThanksPageOnFormDownload';

// IMPOSSIBLEAD Another Pages
import GoogleAds from './pages/GoogleAds/GoogleAds';
import WebDevelopment from './pages/WebDevelopment/WebDevelopment';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import BusinessAutomation from './pages/BusinessAutomation/BusinessAutomation';
import GoogleAdsAudit from './pages/GoogleAdsAudit/GoogleAdsAudit';

// AutoService MAIN
import AutoServiceLanding from './pages/AutoServiceLanding/AutoServiceLanding';
import AutoServiceLandingBlack from './pages/AutoServiceLandingBlack/AutoServiceLandingBlack';

//ANOTHER LANGUAGES
import AutoServiceLandingEN from './pages/Languages/LangEN/AutoServiceLandingEN/AutoServiceLandingEN';
import AutoServiceLandingBlackEN from './pages/Languages/LangEN/AutoServiceLandingBlackEN/AutoServiceLandingBlackEN';

// ThanksPages
import ThanksPageOnFormDownloadAutoService from './pages/ThanksPageOnFormDownloadAutoService/ThanksPageOnFormDownloadAutoService';
import ThanksPageOnFormFireAuto from './pages/ThanksPageOnFormFireAuto/ThanksPageOnFormFireAuto';

import ContactForms from './components/DashboardComponents/ContactForms/ContactForms';

import FireAutoLanding from './pages/FireAutoLanding/FireAutoLanding';

//ANOTHERS
import CookieConsent from './components/CookieConsent/CookieConsent';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import useAnalytics from './hooks/useAnalytics';
import TemplateSto from './pages/Templates/TemplateSto/TemplateSto';
import Templates from './pages/Templates/Templates';
import TemplateStoTwo from './pages/Templates/TemplateStoTwo/TemplateStoTwo';
import ChatImpossibleAD from './components/ChatImpossibleAD/ChatImpossibleAD';

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
  const location = useLocation();
  const hostname = window.location.hostname;
  const isAutoSubdomain = hostname === 'autoservice.impossiblead.com';
  const isFireAuto = hostname === 'fireauto.impossiblead.com';

  // Выбираем Google Analytics ID по домену

  let analytics = {
    gtagId: null,
    adsId: null,
    gtmId: null,
  };

  if (isFireAuto) {
    analytics = {
      gtagId: 'G-J63LPTKLY5',
      adsId: 'GT-55VSTDNM',
      gtmId: 'GTM-K92X7PSC',
    };
  } else if (isAutoSubdomain) {
    analytics = {
      gtagId: 'G-71KMDRDGDB',
      adsId: 'AW-17620991857',
      gtmId: 'GTM-5RHT9JN4',
    };
  } else {
    analytics = {
      gtagId: 'G-71KMDRDGDB',
      adsId: 'AW-17620991857',
      gtmId: 'GTM-5RHT9JN4',
    };
  }

  useAnalytics(analytics);

  useEffect(() => {
    if (!isFireAuto) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
    (function(d, w, s) {
      var widgetHash = 'g4qua891hs3vtaotx6w3', ctw = d.createElement(s); 
      ctw.type = 'text/javascript'; 
      ctw.async = true;
      ctw.src = '//widgets.binotel.com/calltracking/widgets/' + widgetHash + '.js';
      var sn = d.getElementsByTagName(s)[0]; 
      sn.parentNode.insertBefore(ctw, sn);
    })(document, window, 'script');
  `;

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [isFireAuto]);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      if (hostname === 'autoservice.impossiblead.com') {
        window.location.href = 'https://autoservice.impossiblead.com/login';
      } else {
        window.location.href = 'https://impossiblead.com/login';
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  if (loading) {
    return (
      <div className='loader-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (error) {
    return <div className='error'>Ошибка: {error}</div>;
  }

  function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
      if (hash) {
        const targetElement = document.getElementById(hash.replace('#', ''));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [hash]);

    return null;
  }

  return (
    <div>
      <CookieConsent />
      <Suspense fallback={<div className='loading'>Загрузка...</div>}>
        <ScrollToHash />
        <Routes>
          {isFireAuto ? (
            <>
              <Route path='/' element={<FireAutoLanding />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path='/thanks-fireauto' element={<ThanksPageOnFormFireAuto />} />
            </>
          ) : isAutoSubdomain ? (
            <>
              <Route path='/' element={<AutoServiceLanding />} />
              {/* <Route path='/templateSto' element={<TemplateSto />} /> */}
              <Route path='/autoblack' element={<AutoServiceLandingBlack />} />
              <Route
                path='/thanks-auto-service'
                element={<ThanksPageOnFormDownloadAutoService />}
              />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='*' element={<NotFoundPage />} />
            </>
          ) : (
            <>
              {/* <Route path='/d' element={<FireAutoLanding />} /> */}
              <Route path='/' element={<MainLandingB />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<RegisterForm />} />
              <Route path='/thanks' element={<ThanksPageOnFormDownload />} />
              <Route
                path='/thanks-auto-service'
                element={<ThanksPageOnFormDownloadAutoService />}
              />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/google-ads-audit' element={<GoogleAdsAudit />} />
              <Route path='/google-ads' element={<GoogleAds />} />
              <Route path='/web-development' element={<WebDevelopment />} />
              <Route path='/business-automation' element={<BusinessAutomation />} />
              <Route path='/auto' element={<AutoServiceLanding />} />
              {/* <Route path='/chat-test' element={<ChatImpossibleAD />} /> */}
              {/* <Route path='/auto/en' element={<AutoServiceLandingEN />} /> */}
              <Route path='/autoblack' element={<AutoServiceLandingBlack />} />
              {/* <Route path='/autoblack/en' element={<AutoServiceLandingBlackEN />} /> */}

              {/* <Route path='/templates' element={<Templates />} />
              <Route path='/templateSto' element={<TemplateSto />} />
              <Route path='/templateStoTwo' element={<TemplateStoTwo />} /> */}
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
                path='/contact-forms'
                element={
                  <PrivateRoute roles={['admin', 'moderator']}>
                    <div className='app'>
                      <Sidebar onSignOut={handleSignOut} />
                      <div className='main-content'>
                        <ContactForms />
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
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}
