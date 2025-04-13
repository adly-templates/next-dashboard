import React, { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';

import { Loader } from '@/components';
import { cn } from '@/utils';

export type LoadingContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (context === undefined) throw new Error('useLoading must be used within a LoadingProvider');

  return context;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  const values = useMemo(() => ({ isLoading, setLoading }), [isLoading]);

  return <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>;
};

export const LoadingUI = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  const { isLoading } = useLoading();

  return (
    <>
      {/* <div className={cn('', isLoading ? 'invisible' : 'visible')}>{children}</div> */}
      <div
        className={cn('transition-opacity duration-300 size-full', isLoading ? 'opacity-0' : 'opacity-100', className)}
        {...props}
      >
        {children}
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
    </>
  );
};

export const useTraceLoading = (loading?: boolean) => {
  const { setLoading } = useLoading();

  useLayoutEffect(() => {
    setLoading(!!loading);
  }, [loading, setLoading]);

  return !!loading;
};
