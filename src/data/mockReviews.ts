export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface AuditionReview {
  id: string;
  country: string;
  orchestra_id: string;
  instrument: string;
  position: string;
  createdAt: string;
  status: ReviewStatus;
  proofImage: string;
  fileType: 'pdf' | 'image';
  outcome: 'yes' | 'no' | 'unknown';
  
  // Objective Ratings
  ratings: {
    punctuality: number;
    scheduleDistribution: number;
    respect: number;
    atmosphere: number;
    communicationOfResults: number;
    feedbackQuality: number | null; // Null if feedback was not given
  };
  
  // Derived Toggles and Meta
  logistics: {
    screenUsedTransparency: boolean;
    feedbackGiven: boolean;
    warmUpRoom: boolean;
    warmUpType: string;
    preStageRoom: boolean;
    called10MinBefore: boolean;
    screenUsedLogistics: boolean;
    numberOfRounds: number;
  };
}

// A generic helper to calculate the flat average of all populated ratings for this exact review
export const getReviewOverallAverage = (review: AuditionReview): number => {
  const scores = Object.values(review.ratings).filter(val => val !== null) as number[];
  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
};

// Initial robust dataset using real database IDs
export const dbMockReviews: AuditionReview[] = [
  // --- HORN ---
  {
    id: 'rev_horn1', country: 'germany', orchestra_id: 'berliner-philharmoniker', instrument: 'Horn', position: 'Principal', createdAt: '2026-03-01T10:00:00Z', status: 'approved', proofImage: 'berlin-phil-horn1.pdf', fileType: 'pdf', outcome: 'yes',
    ratings: { punctuality: 5, scheduleDistribution: 5, respect: 4, atmosphere: 5, communicationOfResults: 5, feedbackQuality: 4 },
    logistics: { screenUsedTransparency: true, feedbackGiven: true, warmUpRoom: true, warmUpType: 'individual', preStageRoom: true, called10MinBefore: true, screenUsedLogistics: true, numberOfRounds: 3 }
  },
  {
    id: 'rev_horn2', country: 'germany', orchestra_id: 'berliner-philharmoniker', instrument: 'Horn', position: 'Second', createdAt: '2026-03-05T12:00:00Z', status: 'approved', proofImage: 'berlin-phil-horn2.jpg', fileType: 'image', outcome: 'no',
    ratings: { punctuality: 4, scheduleDistribution: 4, respect: 3, atmosphere: 3, communicationOfResults: 4, feedbackQuality: null },
    logistics: { screenUsedTransparency: true, feedbackGiven: false, warmUpRoom: true, warmUpType: 'shared', preStageRoom: false, called10MinBefore: true, screenUsedLogistics: true, numberOfRounds: 2 }
  },
  {
    id: 'rev_horn3', country: 'united-kingdom', orchestra_id: 'london-symphony-orchestra', instrument: 'Horn', position: 'Tutti', createdAt: '2026-03-10T14:00:00Z', status: 'approved', proofImage: 'lso-horn.pdf', fileType: 'pdf', outcome: 'unknown',
    ratings: { punctuality: 5, scheduleDistribution: 4, respect: 5, atmosphere: 5, communicationOfResults: 4, feedbackQuality: 5 },
    logistics: { screenUsedTransparency: false, feedbackGiven: true, warmUpRoom: true, warmUpType: 'individual', preStageRoom: true, called10MinBefore: true, screenUsedLogistics: false, numberOfRounds: 3 }
  },
  
  // --- VIOLIN ---
  {
    id: 'rev_vln1', country: 'spain', orchestra_id: 'orquesta-nacional-de-espana', instrument: 'Violin', position: 'Tutti Section', createdAt: '2026-02-15T09:00:00Z', status: 'approved', proofImage: 'one-vln.pdf', fileType: 'pdf', outcome: 'yes',
    ratings: { punctuality: 5, scheduleDistribution: 5, respect: 5, atmosphere: 4, communicationOfResults: 5, feedbackQuality: null },
    logistics: { screenUsedTransparency: true, feedbackGiven: false, warmUpRoom: true, warmUpType: 'individual', preStageRoom: true, called10MinBefore: true, screenUsedLogistics: true, numberOfRounds: 4 }
  },
  {
    id: 'rev_vln2', country: 'spain', orchestra_id: 'orquesta-nacional-de-espana', instrument: 'Violin', position: 'Co-Principal', createdAt: '2026-02-16T11:00:00Z', status: 'approved', proofImage: 'one-vln-prin.jpg', fileType: 'image', outcome: 'no',
    ratings: { punctuality: 4, scheduleDistribution: 4, respect: 4, atmosphere: 4, communicationOfResults: 3, feedbackQuality: 4 },
    logistics: { screenUsedTransparency: false, feedbackGiven: true, warmUpRoom: true, warmUpType: 'individual', preStageRoom: true, called10MinBefore: true, screenUsedLogistics: false, numberOfRounds: 3 }
  },
  {
    id: 'rev_vln3', country: 'austria', orchestra_id: 'wiener-philharmoniker', instrument: 'Violin', position: 'Tutti Section', createdAt: '2026-01-20T10:00:00Z', status: 'pending', proofImage: 'wphil-vln-pending.pdf', fileType: 'pdf', outcome: 'unknown',
    ratings: { punctuality: 2, scheduleDistribution: 2, respect: 2, atmosphere: 1, communicationOfResults: 2, feedbackQuality: null },
    logistics: { screenUsedTransparency: true, feedbackGiven: false, warmUpRoom: false, warmUpType: 'none', preStageRoom: false, called10MinBefore: false, screenUsedLogistics: true, numberOfRounds: 1 }
  },
  
  // --- CELLO ---
  {
    id: 'rev_cl1', country: 'austria', orchestra_id: 'wiener-philharmoniker', instrument: 'Cello', position: 'Principal', createdAt: '2026-02-28T15:00:00Z', status: 'approved', proofImage: 'wphil-cl-prin.pdf', fileType: 'pdf', outcome: 'yes',
    ratings: { punctuality: 4, scheduleDistribution: 3, respect: 4, atmosphere: 3, communicationOfResults: 4, feedbackQuality: null },
    logistics: { screenUsedTransparency: false, feedbackGiven: false, warmUpRoom: true, warmUpType: 'shared', preStageRoom: true, called10MinBefore: false, screenUsedLogistics: false, numberOfRounds: 3 }
  },
  {
    id: 'rev_cl2', country: 'germany', orchestra_id: 'bamberger-symphoniker', instrument: 'Cello', position: 'Tutti', createdAt: '2026-03-02T09:30:00Z', status: 'rejected', proofImage: 'fake-invite.jpg', fileType: 'image', outcome: 'no',
    ratings: { punctuality: 1, scheduleDistribution: 1, respect: 1, atmosphere: 1, communicationOfResults: 1, feedbackQuality: null },
    logistics: { screenUsedTransparency: false, feedbackGiven: false, warmUpRoom: false, warmUpType: 'none', preStageRoom: false, called10MinBefore: false, screenUsedLogistics: false, numberOfRounds: 1 }
  }
];
