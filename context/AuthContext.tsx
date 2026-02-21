import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call to backend
      // const response = await fetch('http://localhost:5000/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // For now, using temporary credentials for development
      // IMPORTANT: Replace this with actual backend authentication
      if (email === 'admin@itnext.uk' && password === 'admin123') {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = {
          email: email,
          name: 'ITNEXT Admin',
          role: 'admin'
        };

        setToken(mockToken);
        setUser(mockUser);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('adminToken', mockToken);
        localStorage.setItem('adminUser', JSON.stringify(mockUser));
        
        return true;
      }
      
      return false;
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
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, token }}>
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
