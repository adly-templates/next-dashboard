import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';

import { Fallback, NotFound } from '@/components';

import { useLoading } from './loading.context';

export type NotFoundContextType = {
  notFound: boolean;
  setNotFound: (notFound: boolean) => void;
};

export const NotFoundContext = createContext<NotFoundContextType | null>(null);

export const NotFoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [notFound, setNotFoundState] = useState(false);
  const { isLoading } = useLoading();

  const setNotFound = useCallback(
    (notFound: boolean) => {
      if (!isLoading) setNotFoundState(notFound);
    },
    [isLoading],
  );

  const values = useMemo(() => ({ notFound, setNotFound }), [notFound, setNotFound]);

  return <NotFoundContext.Provider value={values}>{children}</NotFoundContext.Provider>;
};

export const NotFoundUI = ({ children }: { children: React.ReactNode }) => {
  const { notFound } = useNotFound();
  return (
    <Fallback fallback={<NotFound />} disabled={!notFound}>
      {children}
    </Fallback>
  );
};

export const useNotFound = () => {
  const context = useContext(NotFoundContext);
  if (!context) throw new Error('useNotFound must be used within a NotFoundProvider');
  return context;
};

export const useTraceNotFound = (notFound?: boolean) => {
  const { setNotFound } = useNotFound();
  useLayoutEffect(() => setNotFound(!!notFound), [notFound]);
  return !!notFound;
};

export const useTraceLoadingAndNotFound = (loading: boolean, notFound: boolean) => {
  const { setLoading } = useLoading();
  const { setNotFound } = useNotFound();

  useLayoutEffect(() => {
    setLoading(loading);
    setNotFound(notFound);
  }, [loading, notFound]);

  return loading || notFound;
};
