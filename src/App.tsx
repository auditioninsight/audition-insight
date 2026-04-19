import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ReviewsProvider } from './context/ReviewsContext';

// Layout
import Layout from './components/Layout/Layout';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Audition Pages
import CountriesList from './pages/Auditions/CountriesList';
import OrchestrasList from './pages/Auditions/OrchestrasList';
import InstrumentsList from './pages/Auditions/InstrumentsList';
import PositionsList from './pages/Auditions/PositionsList';
import AuditionList from './pages/Auditions/AuditionList';

// Review
import ReviewForm from './pages/Review/ReviewForm';

// Statistics
import Overview from './pages/Statistics/Overview';
import StatisticsOrchestrasList from './pages/Statistics/StatisticsOrchestrasList';
import StatisticsInstrumentsList from './pages/Statistics/StatisticsInstrumentsList';
import InstrumentStatisticsDetail from './pages/Statistics/InstrumentStatisticsDetail.tsx';

import Profile from './pages/Profile/Profile';
import Contact from './pages/Contact/Contact';
import CalendarPage from './pages/Calendar/CalendarPage';

import AdminPanel from './pages/Admin/AdminPanel';

// Auth Guard
import ProtectedRoute from './components/Auth/ProtectedRoute';

const AppRoutes = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Navigate to="/auditions" replace />} />

      <Route element={
        <ProtectedRoute>
          <Layout onLogout={handleLogout} />
        </ProtectedRoute>
      }>
        {/* Auditions Hierarchy */}
        <Route path="/auditions">
          <Route index element={<CountriesList />} />
          <Route path=":country">
            <Route index element={<OrchestrasList />} />
            <Route path=":orchestra">
              <Route index element={<InstrumentsList />} />
              <Route path=":instrument">
                <Route index element={<PositionsList />} />
                
                {/* Protected Form Route - Only logged in users can submit reviews */}
                <Route path=":position" element={
                  <ProtectedRoute>
                    <ReviewForm />
                  </ProtectedRoute>
                } />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Global Public Feed */}
        <Route path="/feed" element={<AuditionList />} />

        {/* Statistics Section (Public) */}
        <Route path="/statistics" element={<Overview />} />
        <Route path="/statistics/:country" element={<StatisticsOrchestrasList />} />
        <Route path="/statistics/:country/:orchestra" element={<StatisticsInstrumentsList />} />
        <Route path="/statistics/:country/:orchestra/:instrument" element={<InstrumentStatisticsDetail />} />

        {/* Profile (Protected) */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Contact (Protected) */}
        <Route path="/contact" element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />

        {/* Calendar (Protected) */}
        <Route path="/calendar" element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        } />

        {/* Admin Section (Protected) */}
        <Route path="/verification" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="*" element={<Navigate to="/auditions" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ReviewsProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ReviewsProvider>
    </AuthProvider>
  );
}
