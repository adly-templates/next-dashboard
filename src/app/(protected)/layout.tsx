'use client';

import React from 'react';

import { Dashboard } from '@/components';
import { NotFoundUI } from '@/contexts';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Dashboard>
      <NotFoundUI>{children}</NotFoundUI>
    </Dashboard>
  );
};

export default Layout;
