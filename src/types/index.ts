export type NavigationTab = 'MAIN' | 'STORE' | 'INFO' | 'PROFILE';

export interface RankPerk {
  id: string;
  name: string;
  price: string; // e.g. "6,99₾"
  period: string; // "1 Month Access"
  icon: string;
  themeColor: string; // pink, gold, cyan, emerald
  tagline: string;
  buyUrl: string;
  popular?: boolean;
  bestValue?: boolean;
  commands: string[];
  kits: string[];
  exclusiveFeatures: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Founder & Owner' | 'SR.DEVELOPER' | 'DEVELOPER' | 'ADMIN';
  discord: string;
  badge?: string;
  avatarSeed: string;
  description: string;
}

export interface LeaderboardPlayer {
  rank: number;
  username: string;
  score: string;
  metricLabel: string;
  subValue: string;
  avatarSeed: string;
  tier: 'gold' | 'pink' | 'silver' | 'standard';
}

export interface PurchaseHistoryItem {
  id: string;
  rankName: string;
  price: string;
  date: string;
  status: 'DELIVERED' | 'IN_REVIEW' | 'PROCESSING';
  invoiceName: string;
  minecraftName: string;
  discordId: string;
}

export interface UserAccount {
  email: string;
  phone: string;
  inGameName: string;
  discordId?: string;
  serverRank: string;
  avatarUrl: string;
  joinedDate: string;
  age?: number;
}
