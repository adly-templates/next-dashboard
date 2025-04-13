import { cva } from 'class-variance-authority';

export const textStyles = cva('font-normal', {
  variants: {
    size: {
      '2xs': 'text-[10px] leading-[14px]',
      xs: 'text-[12px] leading-[18px]',
      sm: 'text-[14px] leading-[21px]',
      smd: 'text-[15px] leading-[21px]',
      md: 'text-[16px] leading-[20px]',
      lg: 'text-[18px] leading-[30px]',
      xl: 'text-[20px] leading-[30px]',
      '2xl': 'text-[22px] leading-[30px]',
      '3xl': 'text-[24px] leading-[30px]',
      h1: 'text-[32px] leading-[48px] font-medium',
      h2: 'text-[28px] leading-[42px] font-medium',
      h3: 'text-[24px] font-medium',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
