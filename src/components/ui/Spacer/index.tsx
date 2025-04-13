import React, { HTMLAttributes } from 'react';

import { cn } from '@/utils';

// testing, remove later
// red color for vertical spacer
// blue color for horizontal spacer
const TEST: boolean = false;

export type SpacerProps = {
  height?: number | `${number}%`;
  width?: number | `${number}%`;
  separate?: boolean;
} & HTMLAttributes<HTMLDivElement>;

// Spacers
export const Spacer = ({ height, width, separate, className, ...props }: SpacerProps) => {
  return height ? (
    <HorizontalSpacer height={height} className={cn({ 'h-px bg-border my-2': separate }, className)} {...props} />
  ) : width ? (
    <VerticalSpacer width={width} className={cn({ 'w-px bg-border mx-2': separate }, className)} {...props} />
  ) : null;
};

export const VerticalSpacer = ({ width = 10, className, ...props }: SpacerProps) => {
  return <div className={cn('h-full', { test: TEST }, className)} style={{ width }} {...props} />;
};

export const HorizontalSpacer = ({ height = 10, className, ...props }: SpacerProps) => {
  return <div className={cn('w-full', { 'bg-blue-500': TEST }, className)} style={{ height }} {...props} />;
};
