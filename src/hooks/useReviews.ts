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
    const targetReview = allReviews.find(r => r.id === id);
    // If not found locally, we could theoretically still update, but we need the email for the notification
    if (!targetReview) {
      console.error('Review not found in local state, cannot generate notification.');
    }

    const { error } = await supabase
      .from('reviews')
      .update({ verified })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating review status:', error);
      return false;
    }

    if (targetReview) {
      const type = verified ? 'approved' : 'rejected';
      const orchName = targetReview.orchestra.charAt(0).toUpperCase() + targetReview.orchestra.slice(1);
      const message = verified 
        ? `Your review for ${orchName} has been approved and published.` 
        : `Your review for ${orchName} did not pass the verification guidelines.`;

      await supabase.from('notifications').insert([
        {
          user_email: targetReview.user_email,
          review_id: targetReview.id,
          type,
          message
        }
      ]);
    }
    
    // Optimistic local update
    setAllReviews(prev => prev.map(rev => 
      rev.id === id ? { ...rev, verified } : rev
    ));
    setVerifiedReviews(prev => {
      if (verified) {
        return prev;
      } else {
        return prev.filter(r => r.id !== id);
      }
    });

    fetchReviews();
    return true;
  };

  return { allReviews, verifiedReviews, loading, refetch: fetchReviews, updateReviewVerification };
};
