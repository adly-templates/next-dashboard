'use client';

import React from 'react';

import { Spacer, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import { cn } from '@/utils';

export type TabsManagerProps = {
  tabs: {
    value: string;
    label: string;
    count?: number;
    renderContent: () => React.ReactNode;
  }[];
  spacer?: number;
  tabsContainerClassName?: string;
  contentContainerClassName?: string;
  tabsListClassName?: string;
  triggerClassName?: string;
  renderTabs?: (Slot: React.ReactNode) => React.ReactNode;
  className?: string;
  defaultTab?: string;
} & React.ComponentProps<'div'>;

export const TabsManager = ({
  tabs,
  spacer = 10,
  className,
  tabsContainerClassName,
  contentContainerClassName,
  tabsListClassName,
  triggerClassName,
  renderTabs,
  defaultTab,
  ...props
}: TabsManagerProps) => {
  renderTabs ||= (Slot: React.ReactNode) => Slot;
  return (
    <div className={cn(className)} {...props}>
      <Tabs defaultValue={defaultTab ?? tabs[0].value} className={cn(tabsContainerClassName)}>
        {renderTabs?.(
          <TabsList className={cn('bg-transparent', tabsListClassName)}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} count={tab.count} className={cn(triggerClassName)}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>,
        )}
        {!!spacer && <Spacer height={spacer} />}
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className={cn(contentContainerClassName)}>
            {tab.renderContent()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
