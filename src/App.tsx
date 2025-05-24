import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import { AuthProvider, useAuth } from './context/AuthContext';

// Placeholder components for routes we haven't implemented fully yet
const Transfers = () => <div className="p-4"><h1 className="text-2xl font-bold">Transfers Page</h1><p className="mt-4">This page would display transfer requests and history.</p></div>;
const Bases = () => <div className="p-4"><h1 className="text-2xl font-bold">Bases Page</h1><p className="mt-4">This page would display information about different military bases.</p></div>;
const Personnel = () => <div className="p-4"><h1 className="text-2xl font-bold">Personnel Page</h1><p className="mt-4">This page would display personnel information and assignments.</p></div>;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}

function LoginPage() {
  const { login } = useAuth();
  
  const handleLogin = (role: 'commander' | 'logistics') => {
    login(role);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-slate-800 p-6">
          <div className="flex justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.42 12.37C20.42 16.98 16.63 20.65 12 20.65C7.37 20.65 3.58 16.98 3.58 12.37C3.58 7.76 7.37 4 12 4C16.63 4 20.42 7.76 20.42 12.37Z" stroke="#60A5FA" strokeWidth="1.5"/>
              <path d="M12 8V13" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 15L12 13" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="mt-4 text-center text-2xl font-bold text-white" style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
            MILITARY ASSET MANAGEMENT
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to access the system
          </p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Select Role to Login As:</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLogin('commander')}
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                >
                  Commander
                </button>
                <button
                  onClick={() => handleLogin('logistics')}
                  className="py-3 px-4 bg-slate-700 hover:bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition"
                >
                  Logistics Officer
                </button>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>This is a demo application. Click one of the roles above to enter.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/assets" element={
        <ProtectedRoute>
          <Layout>
            <Assets />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/transfers" element={
        <ProtectedRoute>
          <Layout>
            <Transfers />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/bases" element={
        <ProtectedRoute>
          <Layout>
            <Bases />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/personnel" element={
        <ProtectedRoute>
          <Layout>
            <Personnel />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Condensed:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
