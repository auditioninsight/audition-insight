import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { PersonalAudition } from '../types';

export const usePersonalAuditions = () => {
  const { user } = useAuth();
  const [auditions, setAuditions] = useState<PersonalAudition[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuditions = useCallback(async () => {
    if (!user?.id) {
      setAuditions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('personal_auditions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching personal auditions:', error);
    } else if (data) {
      setAuditions(data as PersonalAudition[]);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    fetchAuditions();
  }, [fetchAuditions]);

  const addAudition = async (date: string, title: string, orchestra: string) => {
    if (!user?.id) return null;

    const newAudition = {
      user_id: user.id,
      date,
      title,
      orchestra,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('personal_auditions')
      .insert([newAudition])
      .select()
      .single();

    if (error) {
      console.error('Error adding personal audition:', error);
      return null;
    }

    if (data) {
      const added = data as PersonalAudition;
      setAuditions(prev => [...prev, added].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      return added;
    }
    return null;
  };

  const removeAudition = async (id: string) => {
    if (!user?.id) return false;

    const { error } = await supabase
      .from('personal_auditions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error removing personal audition:', error);
      return false;
    }

    setAuditions(prev => prev.filter(a => a.id !== id));
    return true;
  };

  return { auditions, loading, addAudition, removeAudition, refresh: fetchAuditions };
};
