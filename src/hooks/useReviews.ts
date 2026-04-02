import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { AuditionReview } from '../types';

export const useReviews = () => {
  const [allReviews, setAllReviews] = useState<AuditionReview[]>([]);
  const [verifiedReviews, setVerifiedReviews] = useState<AuditionReview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
      return;
    }

    if (data) {
      const typedData = data as AuditionReview[];
      setAllReviews(typedData);
      setVerifiedReviews(typedData.filter(r => r.verified === true));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Method tailored for AdminPanel logic
  const updateReviewVerification = async (id: string, verified: boolean) => {
    const { error } = await supabase
      .from('reviews')
      .update({ verified })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating review status:', error);
      return false;
    }
    
    // Optimistic local update
    setAllReviews(prev => prev.map(rev => 
      rev.id === id ? { ...rev, verified } : rev
    ));
    setVerifiedReviews(prev => {
      if (verified) {
        return prev; // We don't dynamically append to the verified stream unless forcing a refetch for purity, but we could.
        // For simplicity, we just trigger a full refetch so things align perfectly:
      } else {
        return prev.filter(r => r.id !== id);
      }
    });

    // We can also just fetch again silently to make sure it's mathematically sound
    fetchReviews();

    return true;
  };

  return { allReviews, verifiedReviews, loading, refetch: fetchReviews, updateReviewVerification };
};
