export type CategoryCluster = 
  | 'education-tech'
  | 'health-care'
  | 'relief-welfare'
  | 'civic-peace'
  | 'global-advocacy'
  | 'sustainability-culture';

export interface Initiative {
  id: number;
  number: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: CategoryCluster;
  categoryLabel: string;
  iconName: string;
  accentColor: string; // Hex for high-contrast
  colors: {
    bgLight: string;
    bgHover: string;
    border: string;
    borderAccent: string;
    text: string;
    textMuted: string;
    badgeBg: string;
    gradient: string;
    printBg: string;
  };
  impactMetric: string;
  impactTarget: string;
  actionPrompt: string;
  audioBlurb: string;
  sdgGoals: number[];
}
