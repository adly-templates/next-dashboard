'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ButtonProps } from '@/components';
import { cn } from '@/utils';

import { GroupedButton, GroupedButtonProps } from '../GroupedButton';

type Tab = {
  id: string;
  label: string;
  renderContent: () => React.ReactNode;
  buttonProps?: ButtonProps;
};

export type GroupedTabsManagerProps = {
  groups: {
    label?: string;
    tabs: Tab[];
  }[];
  renderTabs?: (Slot: React.ReactNode) => React.ReactNode;
  currentActiveTab?: string;
  defaultActiveTab?: string;
  onTabChange?: (tab: Tab) => void;
} & Omit<GroupedButtonProps, 'buttons'>;

export const GroupedTabsManager = ({
  groups,
  renderTabs = (Slot) => Slot,
  currentActiveTab,
  defaultActiveTab,
  onTabChange,
  ...props
}: GroupedTabsManagerProps) => {
  const tabsFlattened = groups.flatMap((group) => group.tabs);

  const findTab = useCallback(
    () =>
      currentActiveTab
        ? tabsFlattened.find((tab) => tab.id === currentActiveTab)
        : defaultActiveTab
          ? tabsFlattened.find((tab) => tab.id === defaultActiveTab)
          : tabsFlattened[0],
    [currentActiveTab, defaultActiveTab, tabsFlattened],
  );

  useEffect(() => setActiveTab(findTab()), [groups]);

  const [tab, setActiveTab] = useState<Tab | undefined>(findTab());

  const activeTab = useMemo(
    () => tabsFlattened.find((tab) => tab.id === currentActiveTab) || tab,
    [currentActiveTab, tab],
  );

  const handleTabChange = useCallback(
    (id: string) => {
      const tab = tabsFlattened.find((tab) => tab.id === id);
      if (!tab) return;

      setActiveTab(tab);
      onTabChange?.(tab);
    },
    [onTabChange],
  );

  return (
    <div className="flex flex-col gap-4">
      {renderTabs(
        <div className="flex gap-2">
          {groups.map((group) => (
            <GroupedButton
              key={group.label}
              title={group.label}
              className="w-fit"
              onButtonChange={handleTabChange}
              currentActiveButton={activeTab?.id}
              defaultActiveButton={defaultActiveTab}
              buttons={group.tabs.map((tab) => {
                const { className, ...buttonProps } = tab.buttonProps || {};

                return {
                  id: tab.id,
                  className: cn('py-1 min-w-[100px] h-[30px]', className),
                  ...buttonProps,
                  ...(!!tab.label && { children: tab.label }),
                };
              })}
              {...props}
            />
          ))}
        </div>,
      )}
      {activeTab?.renderContent()}
    </div>
  );
};
