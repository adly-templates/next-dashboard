'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Toaster } from '@/components';
// CONTEXTS
import { ApolloProvider } from '@/contexts/apollo.context';
import { LoadingProvider } from '@/contexts/loading.context';
// UTILS
import { extractUrlParam } from '@/utils';

import { NotFoundProvider } from './notfound.context';

export * from './apollo.context';
export * from './loading.context';
export * from './notfound.context';

type InitializerProps = {
  children: React.ReactNode;
};

export const Initializer = ({ children }: InitializerProps) => {
  const pathname = usePathname();

  useEffect(() => {
    // EXPERIMENTAL
    if (extractUrlParam('refresh') === 'true') window.location.href = pathname;
  }, [pathname]);

  return (
    <>
      <ApolloProvider>
        <LoadingProvider>
          <NotFoundProvider>{children}</NotFoundProvider>
        </LoadingProvider>
      </ApolloProvider>
      <Toaster />
    </>
  );
};
