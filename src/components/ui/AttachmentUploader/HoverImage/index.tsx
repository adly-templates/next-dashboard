import React from 'react';
import { HoverCardContentProps, HoverCardProps } from '@radix-ui/react-hover-card';
import Image, { ImageProps } from 'next/image';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components';
import { cn } from '@/utils';

const DEFAULT_HOVER_CARD_WIDTH = 200;
const DEFAULT_HOVER_CARD_HEIGHT = 200;

export type HoverImageProps = {
  image: string;
  alt?: string;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
  children?: React.ReactNode;
  hoverCardProps?: HoverCardContentProps;
} & HoverCardProps;

export const HoverImage = ({
  children,
  image,
  alt = 'image',
  imageProps: { className: imageClassName, style: imageStyle, ...imageProps } = {},
  hoverCardProps: { className: hoverCardClassName, style: hoverCardStyle, ...hoverCardProps } = {},
  ...props
}: HoverImageProps) => {
  return (
    <HoverCard openDelay={5} closeDelay={5} {...props}>
      <HoverCardTrigger className="size-fit">{children}</HoverCardTrigger>
      <HoverCardContent
        className={cn('center p-[2px]', hoverCardClassName)}
        style={{ width: DEFAULT_HOVER_CARD_WIDTH, height: DEFAULT_HOVER_CARD_HEIGHT, ...hoverCardStyle }}
        {...hoverCardProps}
      >
        <Image
          src={image}
          alt={alt}
          width={100}
          height={100}
          className={cn('rounded-md border-[1px] border-gray-300 size-[100px] object-cover', imageClassName)}
          style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', ...imageStyle }}
          {...imageProps}
        />
      </HoverCardContent>
    </HoverCard>
  );
};
