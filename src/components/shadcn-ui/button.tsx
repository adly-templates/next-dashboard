'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import loadingLottie from '#/assets/lotties/loading-white.json';
import { cva } from 'class-variance-authority';
import { useRouter } from 'next/navigation';

import { Icon, IconName, Lottie, LucideIconName, LucideIcons } from '@/components';
import { cn } from '@/utils';

import type { VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 opacityHover',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm',
        outline: 'border border-input bg-background shadow-sm hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80',
        ghost: 'hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[46.2px] px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        xl: 'h-[42px] rounded-md px-10',
        '2xl': 'h-[46px] rounded-md px-12',
        '3xl': 'h-[50px] rounded-md px-14',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    icon?: IconName;
    iconProps?: Omit<React.ComponentProps<typeof Icon>, 'name'>;
    iconNode?: React.ReactNode;
    href?: string;
    loading?: boolean;
    lucideIcon?: LucideIconName;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      icon,
      disabled: defaultDisabled = false,
      iconProps = {},
      iconNode = null,
      href,
      onClick,
      loading,
      lucideIcon,
      ...props
    },
    ref,
  ) => {
    const router = useRouter();
    const Comp = asChild ? Slot : 'button';

    const disabled = defaultDisabled || loading;

    const LucideIcon = lucideIcon ? (LucideIcons[lucideIcon] as React.ElementType) : null;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), 'flex flex-row gap-3')}
        ref={ref}
        onClick={(e) => {
          if (href) router.push(href);
          onClick?.(e);
        }}
        disabled={disabled}
        {...props}
      >
        {loading && <Lottie animationData={loadingLottie} className="h-[100px]" loop={true} />}
        {!loading && icon ? <Icon name={icon} {...iconProps} /> : iconNode}
        {!loading && LucideIcon && <LucideIcon {...iconProps} />}
        {!loading && children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
