"use client";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

interface SessionUser {
  token: string;
  username: string;
  balance: number;
}

type SessionValue =
  | {
      status: "authenticated";
      user: SessionUser;
    }
  | {
      status: "loading";
      user: null;
    }
  | {
      status: "unauthenticated";
      user: null;
    };

interface SessionContextProps {
  session: SessionValue;
  logout: () => void;
  setSession: (session: SessionValue) => void;
}

export const SESSION_COOKIE = "session_token";

export const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps,
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionValue>({
    status: "loading",
    user: null,
  });

  const updateSession = async () => {
    const token = getCookie(SESSION_COOKIE);

    if (!token) {
      setSession({
        status: "unauthenticated",
        user: null,
      });

      return;
    }

    const response = await fetch("https://ccbank.tkbstudios.com/api/v1/me", {
      headers: {
        "Session-Token": token,
      },
    });

    if (response.status !== 200) {
      deleteCookie(SESSION_COOKIE);

      setSession({
        status: "unauthenticated",
        user: null,
      });

      return;
    }

    const data = await response.json();

    setSession({
      status: "authenticated",
      user: {
        token,
        username: data.username,
        balance: Number(data.balance),
      },
    });
  };

  const logout = () => {
    deleteCookie(SESSION_COOKIE);

    setSession({
      status: "unauthenticated",
      user: null,
    });
  }

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
