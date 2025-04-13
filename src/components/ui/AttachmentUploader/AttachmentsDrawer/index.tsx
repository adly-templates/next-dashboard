'use client';

import React from 'react';
import { X } from 'lucide-react';
import Image, { ImageProps } from 'next/image';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerContentProps,
  DrawerProps,
  DrawerTitle,
  DrawerTrigger,
  HoverImage,
  Spacer,
  Text,
  TextProps,
} from '@/components';
import { cn } from '@/utils';

const DEFAULT_DRAWER_HEIGHT = 'h-[35%]';

const DEFAULT_IMAGE_WIDTH = 150;
const DEFAULT_IMAGE_HEIGHT = 150;

export type AttachmentsDrawerProps = {
  attachments?: string[];
  title?: string;
  disabled?: boolean;
  disableIfEmpty?: boolean;
  titleProps?: TextProps;
  imageProps?: Omit<ImageProps, 'src' | 'alt'>;
  children?: React.ReactNode;
  drawerProps?: DrawerContentProps;
} & Omit<DrawerProps, 'fadeFromIndex'>;

// This component only handles images right now.
// TODO: Add other types of attachments: pdf, doc, etc.

export const AttachmentsDrawer = ({
  children,
  attachments = [],
  disabled = false,
  disableIfEmpty = false,
  title = 'ملحقات العنصر',
  titleProps: { className: titleClassName, style: titleStyle, ...titleProps } = {},
  imageProps: { className: imageClassName, style: imageStyle, ...imageProps } = {},
  drawerProps: { className: drawerClassName, style: drawerStyle, ...drawerProps } = {},
  ...props
}: AttachmentsDrawerProps) => {
  if (disabled || (disableIfEmpty && attachments?.length === 0)) return children;
  return (
    <Drawer direction="bottom" {...props}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent
        className={cn('w-full md:px-8 px-4', DEFAULT_DRAWER_HEIGHT, drawerClassName)}
        style={{ ...drawerStyle }}
        {...drawerProps}
      >
        <DrawerClose className="absolute top-4 right-4 size-10 center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-150">
          <X />
        </DrawerClose>
        <DrawerTitle className="center">
          <Text size="h2" className={cn('text-center', titleClassName)} style={{ ...titleStyle }} {...titleProps}>
            {title}
          </Text>
        </DrawerTitle>
        <Spacer height={10} />
        <div className="flex items-center justify-center flex-wrap md:!gap-4 gap-2">
          {attachments?.length === 0 && (
            <Text className="text-gray-500 mt-10" size="h3">
              لا يوجد ملحقات
            </Text>
          )}
          {attachments?.length > 0 &&
            attachments?.map((attachment, index) => (
              <HoverImage
                key={`image-${index}`}
                image={attachment}
                imageProps={{ className: imageClassName, style: imageStyle, ...imageProps }}
                hoverCardProps={{ style: { width: 400, height: 400 } }}
              >
                <Image
                  key={`image-${index}`}
                  src={attachment}
                  alt={`image-${index}`}
                  width={DEFAULT_IMAGE_WIDTH}
                  height={DEFAULT_IMAGE_HEIGHT}
                  className={cn('rounded-md border-[1px] border-gray-300 size-[150px] object-cover', imageClassName)}
                  style={{ objectFit: 'cover', objectPosition: 'center', ...imageStyle }}
                  {...imageProps}
                />
              </HoverImage>
            ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
