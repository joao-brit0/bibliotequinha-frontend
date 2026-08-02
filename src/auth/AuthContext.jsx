import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'biblioteca-comunitaria:auth';

const AuthContext = createContext(null);

function readStoredSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    const parsedSession = JSON.parse(rawSession);

    if (!parsedSession || typeof parsedSession !== 'object') {
      return null;
    }

    return {
      id: parsedSession.id ?? null,
      name: parsedSession.name ?? '',
      role: parsedSession.role ?? 'guest',
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (session) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [session]);

  const value = useMemo(() => {
    return {
      session,
      isAuthenticated: Boolean(session),
      isAdmin: session?.role === 'admin',
      signIn: setSession,
      signOut: () => setSession(null),
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}