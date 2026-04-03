import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type Role = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  role: Role;
  instrument?: string;
  education_status?: string;
  birth_date?: string;
  nationality?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Safety fallback: if Supabase completely hangs for any reason, force unlock after 4 seconds
    const safetyTimeout = setTimeout(() => {
      if (mounted && loading) {
        setLoading(false);
      }
    }, 4000);

    const fetchProfile = async (authUser: any) => {
      if (mounted) setLoading(true); // Always force loading screen when shifting session context
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
          
        if (error) {
          if (mounted) setUser({ id: authUser.id, email: authUser.email, role: 'user' });
        } else {
          if (mounted) setUser({
            id: data.id,
            email: data.email || authUser.email,
            role: (data.role as Role) || 'user',
            instrument: data.instrument,
            education_status: data.education_status,
            birth_date: data.birth_date,
            nationality: data.nationality
          });
        }
      } catch (err) {
        if (mounted) setUser({ id: authUser.id, email: authUser.email, role: 'user' });
      } finally {
        if (mounted) setLoading(false);
        clearTimeout(safetyTimeout);
      }
    };

    // 1. Immediately invoke getSession to bypass React 18 Strict Mode INITIAL_SESSION miss
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Session error:", error.message);
        if (mounted) { setUser(null); setLoading(false); }
      } else if (session?.user) {
        fetchProfile(session.user); // Do not await in outer scope to prevent blocking
      } else {
        if (mounted) { setUser(null); setLoading(false); }
      }
    });

    // 2. Listen to state changes without deadlocking the Supabase async queue
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchProfile(session.user); // Fire and forget. DO NOT AWAIT THIS.
        } else {
          if (mounted) {
            setUser(null);
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', backgroundColor: '#f9fafb' }}>
        <div style={{ border: '3px solid #e5e7eb', borderTop: '3px solid #3b82f6', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6b7280', fontFamily: 'sans-serif' }}>Authenticating user session...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
