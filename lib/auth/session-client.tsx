'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
}

interface SessionContextType {
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isLoading: true,
});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionContextType>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setSession({ user: data.user, isLoading: false });
      } catch {
        setSession({ user: null, isLoading: false });
      }
    }

    loadSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}