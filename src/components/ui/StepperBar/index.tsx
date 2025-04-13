import React from 'react';

import { cn } from '@/utils';

export type StepperBarProps = {
  steps: number;
  currentStep: number;
} & React.ComponentProps<'div'>;

export const StepperBar = ({ steps, currentStep, ...rest }: StepperBarProps) => {
  return (
    <div className={cn('flex flex-row-reverse gap-2')} {...rest}>
      {Array.from({ length: steps }).map((_, index) => (
        <div key={index} className={cn('w-full h-2 bg-gray-200 rounded-full', index < currentStep && 'bg-primary')} />
      ))}
    </div>
  );
};
