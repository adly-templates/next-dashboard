'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components';
import { goToUrl } from '@/utils';

import type { LucideIcon } from 'lucide-react';

export function NavMain({
  groups,
  calculateActive,
  fullNavigation = false,
}: {
  groups: {
    label: string;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      calculateActive?: () => boolean;
    }[];
  }[];
  fullNavigation?: boolean;
  calculateActive?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const calculateActiveMethod = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={
                    calculateActive && (item.isActive || item.calculateActive?.() || calculateActiveMethod(item.url))
                  }
                  onClick={() => (fullNavigation ? goToUrl(item.url) : router.push(item.url))}
                  size="lg"
                  className="group-data-[collapsible=icon]:center"
                >
                  {item.icon && <item.icon />}
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
