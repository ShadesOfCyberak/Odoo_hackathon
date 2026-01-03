
export enum ActivityType {
  SIGHTSEEING = 'Sightseeing',
  FOOD = 'Food & Dining',
  ADVENTURE = 'Adventure',
  CULTURE = 'Culture',
  RELAXATION = 'Relaxation',
  TRANSPORT = 'Transport',
  ACCOMMODATION = 'Accommodation'
}

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  description: string;
  cost: number;
  duration: string;
  time?: string;
}

export interface TripStop {
  id: string;
  city: string;
  country: string;
  description: string; // New field for Section info
  startDate: string;
  endDate: string;
  activities: Activity[];
  budget: number;
  image?: string;
  position?: { x: number; y: number };
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage?: string;
  stops: TripStop[];
  totalBudget: number;
  status: 'planning' | 'upcoming' | 'completed';
  isPublic: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  preferences: {
    language: string;
    currency: string;
  };
}
