"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createSession } from "./api";

const STORAGE_KEY = "saude-em-dia:session_id";

interface SessionContextValue {
  sessionId: string | null;
  isLoading: boolean;
  error: string | null;
  renewSession: () => Promise<string | null>;
}

const SessionContext = createContext<SessionContextValue>({
  sessionId: null,
  isLoading: true,
  error: null,
  renewSession: async () => null,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSessionId(stored);
      setIsLoading(false);
      return;
    }

    createSession()
      .then((id) => {
        window.localStorage.setItem(STORAGE_KEY, id);
        setSessionId(id);
      })
      .catch(() => {
        setError("Não foi possível iniciar a sessão. Tente novamente.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function renewSession() {
    try {
      const id = await createSession();
      window.localStorage.setItem(STORAGE_KEY, id);
      setSessionId(id);
      setError(null);
      return id;
    } catch {
      setError("Não foi possível iniciar a sessão. Tente novamente.");
      return null;
    }
  }

  return (
    <SessionContext.Provider
      value={{ sessionId, isLoading, error, renewSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
