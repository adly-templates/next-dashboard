'use client';

import React from 'react';
import { XIcon } from 'lucide-react';
import Image from 'next/image';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components';
import { cn } from '@/utils';

const HOVER_IMAGE_WIDTH = 300;
const HOVER_IMAGE_HEIGHT = 300;

export type ImageUploaderProps = {
  images: string[]; // url or base64
  imageProps?: Partial<Omit<React.ComponentProps<typeof Image>, 'src'>>;
  wrapperProps?: Omit<React.ComponentProps<'div'>, 'children'>;
  className?: string;
  removable?: boolean;
  hoverable?: boolean;
  cover?: boolean;
  onRemove?: (index: number) => void;
  hoverCardProps?: Omit<React.ComponentProps<typeof HoverCardContent>, 'children'>;
} & Omit<React.ComponentProps<'div'>, 'children'>;

export const ImageUploader = ({
  images = [],
  className,
  imageProps: {
    className: imageClassName,
    alt: imageAlt,
    style: imageStyle,
    ...imageProps
  } = {} as React.ComponentProps<typeof Image>,
  wrapperProps: { className: wrapperClassName, ...wrapperProps } = {} as React.ComponentProps<'div'>,
  removable,
  onRemove,
  hoverable = true,
  cover = false,
  hoverCardProps: {
    className: hoverCardClassName,
    style: hoverCardStyle,
    ...hoverCardProps
  } = {} as React.ComponentProps<typeof HoverCardContent>,
  ...props
}: ImageUploaderProps) => {
  const ImageSelf = ({ src, alt, ...props }: { src: string; alt: string } & React.ComponentProps<typeof Image>) => (
    <Image
      src={src}
      alt={alt || 'image'}
      width={100}
      height={100}
      className={cn('rounded-md border-[1px] border-gray-300', cover && 'w-full h-full', imageClassName)}
      {...props}
    />
  );
  return (
    <div className={cn('flex flex-wrap gap-2', className)} {...props}>
      {images.map((image, index) => (
        <div
          key={`image-${imageAlt || 'key'}-${index}`}
          className={cn('relative', cover && 'w-full h-full', wrapperClassName)}
          {...wrapperProps}
        >
          {!hoverable && <ImageSelf src={image} alt={imageAlt || 'image'} {...imageProps} />}
          {hoverable && (
            <HoverCard openDelay={5} closeDelay={5}>
              <HoverCardTrigger
                className={cn('cursor-pointer center bg-gray-200 rounded-full', cover && 'w-full h-full')}
              >
                <ImageSelf src={image} alt={imageAlt || 'image'} {...imageProps} />
              </HoverCardTrigger>
              <HoverCardContent
                className={cn('center p-[2px]', hoverCardClassName)}
                style={{ width: HOVER_IMAGE_WIDTH, height: HOVER_IMAGE_HEIGHT, ...hoverCardStyle }}
                {...hoverCardProps}
              >
                <ImageSelf
                  src={image}
                  alt={imageAlt || 'image'}
                  width={HOVER_IMAGE_WIDTH}
                  height={HOVER_IMAGE_HEIGHT}
                  className={cn('rounded-md border-[1px] border-gray-300 size-[500px] object-cover', imageClassName)}
                  style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', ...imageStyle }}
                  {...imageProps}
                />
              </HoverCardContent>
            </HoverCard>
          )}
          {removable && (
            <XIcon
              className="text-lg text-white bg-red-500 rounded-full size-5 p-[2px] absolute -top-2 -right-2 transition-colors duration-300 hover:bg-red-600 cursor-pointer"
              onClick={() => onRemove?.(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
