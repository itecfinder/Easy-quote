import { useEffect, useState } from 'react';

export const useSession = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/session', {
          credentials: 'include',
        });

        if (!res.ok) {
          setSession(null);
          return;
        }

        const data = await res.json();
        setSession(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    session,
    email: session?.email ?? null,
    loggedIn: !!session?.loggedIn,
    loading,
  };
};
