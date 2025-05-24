import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftRight, BarChart4, Box, LogOut, Menu, Shield, Truck, Users, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Condensed:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <BarChart4 size={20} /> },
    { name: 'Assets', path: '/assets', icon: <Box size={20} /> },
    { name: 'Transfers', path: '/transfers', icon: <ArrowLeftRight size={20} /> },
    { name: 'Bases', path: '/bases', icon: <Truck size={20} /> },
    { name: 'Personnel', path: '/personnel', icon: <Users size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-800 transition duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 px-6 bg-slate-900">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold text-white" style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>MILITARY ASSETS</span>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
          </div>
          
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-slate-700 ${
                isActive(item.path) ? 'bg-slate-700 text-white border-l-4 border-blue-400' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span className="mx-3">{item.name}</span>
            </Link>
          ))}

          <div className="px-4 py-3 mt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
          </div>
          
          <button
            onClick={logout}
            className="w-full flex items-center px-6 py-3 text-gray-300 hover:bg-slate-700"
          >
            <LogOut size={20} />
            <span className="mx-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center">
            <div className="relative">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
