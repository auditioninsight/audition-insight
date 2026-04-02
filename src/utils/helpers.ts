import type { AuditionReview } from '../types';

export const getReviewOverallAverage = (review: AuditionReview): number => {
  return review.rating || 0;
};
