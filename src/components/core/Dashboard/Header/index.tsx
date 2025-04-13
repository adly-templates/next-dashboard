import React from 'react';
import { useRouter } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  LIcon,
  LIconName,
  SidebarTrigger,
  Text,
  useSidebar,
} from '@/components';
import { useBreadcrumb } from '@/hooks';
import { cn } from '@/utils';

export const DashboardHeader = () => {
  const headerLinks = useBreadcrumb();
  const router = useRouter();
  const { state } = useSidebar();
  return (
    <header
      className="fixed top-0 z-[60] border-b border-border/40 flex h-16 shrink-0 items-center justify-between gap-2 bg-background/50 backdrop-blur transition-all duration-300 ease-in-out"
      style={{
        left: state === 'collapsed' ? 'calc(var(--sidebar-width-icon) + 20px)' : 'var(--sidebar-width)',
        width:
          state === 'collapsed' ? 'calc(100% - var(--sidebar-width-icon) - 40px)' : 'calc(100% - var(--sidebar-width))',
      }}
    >
      <div className="flex items-center gap-4 px-4 overflow-hidden">
        <SidebarTrigger className="-ml-1 border border-border/40 rounded-lg hover:bg-muted/50 transition-all duration-300" />
        <div className="h-4 w-px bg-gray-400 hidden sm:block" />
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {headerLinks.map((link, index) => (
            <Breadcrumb key={link.href + index}>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={link.href}
                    className={cn(
                      'text-muted-foreground whitespace-nowrap',
                      index === headerLinks.length - 1 && 'text-primary',
                    )}
                  >
                    {link.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== headerLinks.length - 1 && <BreadcrumbSeparator className="hidden sm:block rotate-180" />}
              </BreadcrumbList>
            </Breadcrumb>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 px-4">
        <HeaderIcon icon="Info" onClick={() => router.push('/faq')} className="hidden sm:flex" />
        <HeaderIcon icon="Settings" onClick={() => router.push('/settings')} />
      </div>
    </header>
  );
};

export type HeaderIconProps = {
  icon: LIconName;
  amount?: number;
  maxAmount?: number;
  dotted?: boolean;
} & React.ComponentProps<'div'>;

export const HeaderIcon = ({ icon, amount, maxAmount, dotted, ...rest }: HeaderIconProps) => {
  return (
    <div
      className="p-2 center bg-muted/50 hover:bg-muted/70 relative rounded-full cursor-pointer hover:opacity-80 transition-all duration-300"
      {...rest}
    >
      {amount !== undefined && amount > 0 && (
        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full center">
          <Text size="xs" className="text-white">
            {maxAmount && amount > maxAmount ? `${maxAmount}+` : amount}
          </Text>
        </div>
      )}
      {dotted && <div className="absolute top-0 right-0 size-3 bg-red-500 rounded-full center" />}
      <LIcon name={icon} size={20} className="text-primary" />
    </div>
  );
};
