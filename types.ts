import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  isPrivate?: boolean;
  isWarning?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  color: 'primary' | 'secondary';
  warning?: boolean;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
  isTerminate?: boolean;
}