'use client';

import React, { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils';

import { Loader } from '../Loader';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hoverable?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Omit<React.ComponentProps<'div'>, 'onClick'>;

export type CardPropsWithoutChildren = Omit<CardProps, 'children'>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, href, onClick, hoverable = false, loading = false, ...props }, ref) => {
    const router = useRouter();

    const isLink = !!href;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (isLink) router.push(href);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm p-3 md:p-5 transition-all duration-200 border-border',
          { 'cursor-pointer hover:shadow-md hover:scale-[1.01]': isLink || hoverable },
          { 'hover:border-primary': isLink },
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    );
  },
);

Card.displayName = 'Card';
