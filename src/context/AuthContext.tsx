import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { currentUser as mockUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser); // Pre-authenticated for demo

  const login = (role: UserRole) => {
    // In a real app, this would validate credentials with an API
    // For the demo, we'll just switch the role
    setUser({
      ...mockUser,
      role
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
