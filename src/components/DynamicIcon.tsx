import React from 'react';
import {
  GraduationCap,
  Stethoscope,
  HandCoins,
  ShieldAlert,
  Home,
  Sparkles,
  Building2,
  Landmark,
  Newspaper,
  Leaf,
  Laptop,
  Users,
  Handshake,
  HeartHandshake,
  ShieldCheck,
  Globe,
  TrendingUp,
  Music,
  Heart,
  Droplets,
  Coins,
  Megaphone,
  TreePine,
  HelpCircle,
  LucideProps
} from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'Stethoscope':
      return <Stethoscope {...props} />;
    case 'HandCoins':
      return <HandCoins {...props} />;
    case 'ShieldAlert':
      return <ShieldAlert {...props} />;
    case 'Home':
      return <Home {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Building2':
      return <Building2 {...props} />;
    case 'Landmark':
      return <Landmark {...props} />;
    case 'Newspaper':
      return <Newspaper {...props} />;
    case 'Leaf':
      return <Leaf {...props} />;
    case 'Laptop':
      return <Laptop {...props} />;
    case 'Users':
      return <Users {...props} />;
    case 'Handshake':
      return <Handshake {...props} />;
    case 'HeartHandshake':
      return <HeartHandshake {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Globe':
      return <Globe {...props} />;
    case 'TrendingUp':
      return <TrendingUp {...props} />;
    case 'Music':
      return <Music {...props} />;
    case 'Heart':
      return <Heart {...props} />;
    case 'Droplets':
      return <Droplets {...props} />;
    case 'Coins':
      return <Coins {...props} />;
    case 'Megaphone':
      return <Megaphone {...props} />;
    case 'TreePine':
      return <TreePine {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
