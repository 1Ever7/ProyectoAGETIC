// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'juez' | 'visor' | null;

interface AuthContextType {
  user: { role: UserRole } | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('userRole') as UserRole;
    if (savedUser) {
      setUser({ role: savedUser });
    }
  }, []);

  const login = (role: UserRole) => {
    if (!role) return;
    setUser({ role });
    localStorage.setItem('userRole', role);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userRole');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};