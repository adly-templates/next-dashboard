import React from 'react';
import IonIcon from '@reacticons/ionicons';
import Lottie from 'lottie-react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

export * from './ui';
export * from './shadcn-ui';
export * from './core';
export * from './shared';

type IconName = React.ComponentProps<typeof IonIcon>['name'];
type LucideIconName = keyof typeof LucideIcons;

export { Link, IonIcon as Icon, IonIcon, Lottie, LucideIcons };
export type { IconName, LucideIconName };
