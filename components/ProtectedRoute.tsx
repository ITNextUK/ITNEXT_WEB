import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Check localStorage directly as a fallback — guards against browser
  // extensions (e.g. StreamGrabber) that intercept replaceState/pushState
  // and wipe in-memory router state before React commits the auth state update.
  const hasStoredSession = !!localStorage.getItem('adminToken');
  const isAllowed = isAuthenticated || hasStoredSession;

  useEffect(() => {
    if (!isLoading && !isAllowed) {
      // Use direct hash assignment to bypass StreamGrabber's replaceState interception
      window.location.hash = '#/admin';
    }
  }, [isLoading, isAllowed]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-2 border-zinc-700 border-t-brand-accent rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Verifying Access</span>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    // Return null while the useEffect redirect takes effect
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
