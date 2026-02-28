import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api.service';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { email: string; name: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing session on mount — validate token with backend
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');

    if (storedToken && storedUser) {
      // Optimistically set state, then verify with backend
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);

      // Verify token is still valid
      authApi.me()
        .then((res: any) => {
          const backendUser = res.data?.user;
          if (backendUser) {
            const u = { email: backendUser.email, name: backendUser.name, role: backendUser.role };
            setUser(u);
            localStorage.setItem('adminUser', JSON.stringify(u));
          }
        })
        .catch(() => {
          // Token invalid/expired — clear session silently
          console.info('[Auth] Session expired or token invalid — please log in again.');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password);
      const { token: jwt, user: backendUser } = response.data;

      const u = { email: backendUser.email, name: backendUser.name, role: backendUser.role };

      setToken(jwt);
      setUser(u);
      setIsAuthenticated(true);

      localStorage.setItem('adminToken', jwt);
      localStorage.setItem('adminUser', JSON.stringify(u));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
