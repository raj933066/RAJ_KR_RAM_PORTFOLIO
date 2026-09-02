import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AnimatedBackground from './components/ui/AnimatedBackground';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import BackToTop from './components/ui/BackToTop';
import ErrorBoundary from './components/ui/ErrorBoundary';
  
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminLogin = lazy(() => import('./pages/Admin').then((module) => ({ default: module.AdminLogin })));

function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <ScrollProgressBar />
        <Navbar />

        <main>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <BackToTop />
        <ToastContainer position="bottom-right" theme="dark" autoClose={4000} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
