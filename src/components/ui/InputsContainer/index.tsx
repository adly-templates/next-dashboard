import React from 'react';

import { cn } from '@/utils';

import { Loader } from '../Loader';

export type InputsContainerProps = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
} & React.ComponentProps<'div'>;

export const InputsContainer = ({ children, className, loading, ...props }: InputsContainerProps) => {
  return (
    <div className={cn('flex flex-wrap gap-4 relative', className)} {...props}>
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Loader />
          asdasdasd
        </div>
      )}
    </div>
  );
};
