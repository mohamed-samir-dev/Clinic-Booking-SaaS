import { CheckCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const getIcon = (iconName?: string) => {
  if (!iconName) return CheckCircle;
  const Icon = (LucideIcons as unknown as Record<string, typeof CheckCircle>)[iconName];
  return Icon || CheckCircle;
};
