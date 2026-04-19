export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface AuditionReview {
  id: string;
  created_at: string;
  user_email: string;
  country: string;
  orchestra: string;
  instrument: string;
  rating: number;
  awarded: 'yes' | 'no' | 'unknown';
  verified: boolean;
  
  organization: {
    punctuality: number;
    scheduleDistribution?: number; // legacy
    timeSchedulesAssigned?: boolean;
    scheduleDistributionType?: string;
    invitationReceived: boolean;
    invitationTiming?: string;
  };
  treatment: {
    respect: number;
    atmosphere: number;
    supportStaffPresent?: boolean;
  };
  transparency: {
    communicationOfResults: number;
    screenUsed?: boolean; // legacy
  };
  feedback: {
    feedbackGiven: boolean;
    feedbackQuality: number | null;
    feedbackTiming?: string;
  };
  logistics: {
    warmUpRoom: boolean;
    warmUpType: string;
    preStageRoom: boolean;
    called10MinBefore: boolean;
    screenUsed: boolean;
    numberOfRounds: number;
  };
}

export interface AppNotification {
  id: string;
  user_email: string;
  review_id: string | null;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface PersonalAudition {
  id: string;
  user_id: string;
  date: string;
  title: string;
  orchestra: string;
  created_at: string;
}
