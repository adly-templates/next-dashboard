import React from 'react';
import loadingLottie from '#/assets/lotties/loading.json';
import Lottie, { LottieComponentProps } from 'lottie-react';

import { cn } from '@/utils';

export type LoaderProps = {
  className?: string;
  lottieProps?: Omit<LottieComponentProps, 'animationData'>;
  lottieClassName?: string;
} & React.ComponentProps<'div'>;

export const Loader = ({ className, lottieProps, lottieClassName }: LoaderProps) => {
  return (
    <div className={cn('size-24 center', className)}>
      <Lottie
        animationData={loadingLottie}
        className={cn('size-[100px]', lottieClassName)}
        loop={true}
        {...lottieProps}
      />
    </div>
  );
};
