import React from 'react';

import { Button, ButtonProps, Icon, IconName } from '@/components';

export type DownloadButtonProps = {
  label: string;
  icon: IconName | React.ReactNode;
} & ButtonProps;

export const DownloadButton = ({ label = 'تحميل', icon = 'arrow-down' }: DownloadButtonProps) => {
  return (
    <Button className="center h-[40px]">
      {label}
      <div className="size-6 bg-primary-dark rounded-full center">
        {typeof icon === 'string' ? <Icon name={icon as IconName} size="large" className="center !size-4" /> : icon}
      </div>
    </Button>
  );
};
