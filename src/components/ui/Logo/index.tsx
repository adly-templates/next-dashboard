import React from 'react';
import Image, { ImageProps } from 'next/image';

import { cn } from '@/utils';

export type LogoType = 'light';

export type LogoProps = {
  type?: LogoType;
} & Omit<ImageProps, 'src' | 'alt'>;

export const Logo = ({ width = 200, height = 100, className, type = 'light', ...props }: LogoProps) => {
  return (
    <Image
      src={
        {
          light: '/assets/images/logo.png',
        }[type]
      }
      alt="Dentaleem Logo"
      width={width}
      height={height}
      className={cn(className)}
      style={{
        height,
        width,
      }}
      {...props}
    />
  );
};
