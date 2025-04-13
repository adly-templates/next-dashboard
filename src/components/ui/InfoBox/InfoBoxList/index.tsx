import React from 'react';

import { Separator } from '@/components';
import { cn } from '@/utils';

import { InfoBox, InfoBoxProps } from '..';

export type InfoBoxListProps = {
  list: InfoBoxProps[];
  className?: string;
  wrap?: boolean;
  separate?: boolean;
  gap?: number;
  centerLabel?: boolean;
  hideSeparatorOnMobile?: boolean;
  orientation?: 'horizontal' | 'vertical';
  containerClassName?: string;
  style?: React.CSSProperties;
} & React.ComponentProps<'div'>;

export const InfoBoxList = ({
  list,
  orientation = 'horizontal',
  wrap = true,
  separate = true,
  gap = 20,
  hideSeparatorOnMobile = false,
  centerLabel = true,
  className,
  style,
  containerClassName,
  ...props
}: InfoBoxListProps) => {
  return (
    <div
      className={cn(
        'flex flex-wrap w-full',
        {
          'flex-row': orientation === 'horizontal',
          'flex-col': orientation === 'vertical',
          'flex-nowrap': !wrap,
        },
        className,
      )}
      style={{ ...style, gap: `${gap}px` }}
      {...props}
    >
      {list.map((item, index) => (
        <div key={item.label} className={cn('flex items-center', containerClassName)} style={{ gap: `${gap}px` }}>
          <InfoBox {...item} centerLabel={centerLabel || item.centerLabel} />
          {separate && index !== list.length - 1 && (
            <Separator orientation="vertical" className={cn({ 'hidden md:block': hideSeparatorOnMobile })} />
          )}
        </div>
      ))}
    </div>
  );
};
