import React from 'react';

import { cn } from '@/utils';

export type MobileRenderProps = {
  className?: string;
  invert?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<'div'>;

export const MobileRender = ({ children, className, invert, ...props }: MobileRenderProps) => {
  return (
    <div className={cn('hidden md:block', invert && 'block md:hidden', className)} {...props}>
      {children}
    </div>
  );
};
