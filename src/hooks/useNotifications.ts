import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AppNotification } from '../types';
import { useAuth } from '../context/AuthContext';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    if (!user?.email) return;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_email', user.email)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const typedData = data as AppNotification[];
      setNotifications(typedData);
      setUnreadCount(typedData.filter(n => !n.read).length);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchNotifications();

    // Set up realtime subscription tailored for this user's notifications if possible, but basic polling or manual refetch works too
  }, [fetchNotifications]);

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);
    
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!user?.email) return;
    
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_email', user.email)
      .eq('read', false);
      
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead, refresh: fetchNotifications };
};
