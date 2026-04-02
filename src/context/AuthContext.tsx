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
    const fetchProfile = async (authUser: any) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
          
        if (error) {
          setUser({ id: authUser.id, email: authUser.email, role: 'user' });
        } else {
          setUser({
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
        setUser({ id: authUser.id, email: authUser.email, role: 'user' });
      } finally {
        setLoading(false);
      }
    };

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => {
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
