'use client';

import React, { Suspense } from 'react';

import { AppSidebar, Loader, SidebarInset, SidebarProvider } from '@/components';
import { LoadingUI } from '@/contexts';

import { DashboardHeader } from './Header';

type DashboardProps = {
  children?: React.ReactNode;
};

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <SidebarProvider>
      <Suspense fallback={<Loader />}>
        <AppSidebar />
        <SidebarInset className="p-2">
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-4 p-2 md:p-4 rounded-xl">
            <div
              className="min-h-[100vh] flex-1 md:min-h-min flex justify-center py-4 size-full"
              style={{ paddingTop: '60px' }}
            >
              <LoadingUI>{children}</LoadingUI>
            </div>
          </div>
        </SidebarInset>
      </Suspense>
    </SidebarProvider>
  );
};
