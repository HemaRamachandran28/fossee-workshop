import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';
import BackToTop from './components/ui/BackToTop.jsx';
import CursorGlow from './components/ui/CursorGlow.jsx';
import PageTransition from './components/layout/PageTransition.jsx';

import Landing        from './pages/Landing.jsx';
import Login          from './pages/Login.jsx';
import Register       from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ChangePassword  from './pages/ChangePassword.jsx';
import WorkshopsPage  from './pages/WorkshopsPage.jsx';
import WorkshopDetail from './pages/WorkshopDetail.jsx';
import Propose        from './pages/Propose.jsx';
import Dashboard      from './pages/Dashboard.jsx';
import StatisticsPage from './pages/StatisticsPage.jsx';
import Profile        from './pages/Profile.jsx';
import NotFound       from './pages/NotFound.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/login"           element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register"        element={<PageTransition><Register /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/change-password" element={<PageTransition><ChangePassword /></PageTransition>} />
        <Route path="/workshops"       element={<PageTransition><WorkshopsPage /></PageTransition>} />
        <Route path="/workshops/:id"   element={<PageTransition><WorkshopDetail /></PageTransition>} />
        <Route path="/propose"         element={<PageTransition><Propose /></PageTransition>} />
        <Route path="/dashboard"       element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/statistics"      element={<PageTransition><StatisticsPage /></PageTransition>} />
        <Route path="/profile"         element={<PageTransition><Profile /></PageTransition>} />
        <Route path="*"                element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollProgress />
          <CursorGlow />
          <BackToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
