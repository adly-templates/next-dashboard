'use client';

import React, { useCallback, useMemo } from 'react';
import { Home } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Logo,
  NavMain,
  NavUser,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const params = useSearchParams();

  const _isPhaseActive = useCallback(
    (phase: string) => {
      return params.get('phase') === phase;
    },
    [params],
  );

  const groups = useMemo(
    () => [
      {
        label: 'Main',
        items: [
          {
            title: 'Dashboard',
            url: '/',
            icon: Home,
          },
        ],
      },
    ],
    [],
  );

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="center cursor-pointer" onClick={() => router.push('/')}>
        <Logo height={60} width={180} className="py-3 px-12 h-[70px] w-[70px]" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={groups} calculateActive fullNavigation />
      </SidebarContent>
      <SidebarFooter className="mb-2">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
