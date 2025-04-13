'use client';

import React, { useRef, useState } from 'react';
import { ChevronsLeft, Info } from 'lucide-react';
import { toast } from 'sonner';

import {
  Button,
  Card,
  CardProps,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Spacer,
  Text,
  TextProps,
} from '@/components';
import { cn, convertToBase64 } from '@/utils';

import { ImageUploader, ImageUploaderProps } from './ImageUploader';

export * from './AttachmentsDrawer';
export * from './HoverImage';

const DEFAULT_MAX_ATTACHMENTS = 10;
type AttachmentType = 'image' | 'file';
type AcceptType = 'image/jpeg' | 'image/png' | 'image/jpg' | 'application/pdf';

const ACCEPT_TYPES: Record<AttachmentType, AcceptType[]> = {
  image: ['image/jpeg', 'image/png', 'image/jpg'],
  file: ['application/pdf'],
};

export type AttachmentUploaderProps = {
  label?: string;
  name?: string;
  labelProps?: TextProps;
  altValue?: string;
  required?: boolean;
  multiple?: boolean;
  type?: AttachmentType;
  containerProps?: React.ComponentProps<'div'>;
  uploaderProps?: Omit<ImageUploaderProps, 'images'>;
  attachments?: string[]; // url or base64
  attachment?: string;
  removable?: boolean;
  addable?: boolean;
  hoverable?: boolean;
  maxAttachments?: number;
  onAttachmentRemove?: (url: string, index: number) => void;
  onAttachmentsChange?: (attachments: string[]) => void;
} & Omit<CardProps, 'children'>;

export const AttachmentUploader = ({
  label,
  name,
  labelProps: { className: labelClassName, ...labelProps } = {},
  altValue,
  className,
  required = false,
  multiple = false,
  type = 'image',
  containerProps: { className: containerClassName, ...containerProps } = {},
  attachments: initialAttachments = [],
  attachment,
  removable = true,
  addable = true,
  hoverable = true,
  maxAttachments = attachment || !multiple ? 1 : DEFAULT_MAX_ATTACHMENTS,
  uploaderProps,
  onAttachmentRemove,
  ...props
}: AttachmentUploaderProps) => {
  const [attachments, setAttachments] = useState<string[]>(
    (initialAttachments.length > 0 ? initialAttachments : [attachment]).filter(Boolean) as string[],
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const isImageType = type === 'image';

  const handleRemove = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    onAttachmentRemove?.(attachments[index], index);
    setAttachments(newAttachments);
  };

  const handleAdd = (files: FileList) => {
    if (attachments.length + files.length > maxAttachments) {
      toast.error(`لا يمكنك إضافة أكثر من ${maxAttachments} ملفات`);
      return;
    }

    const filePromises = Array.from(files).map(convertToBase64);

    Promise.all(filePromises).then((base64Files) => setAttachments([...attachments, ...base64Files]));
  };

  return (
    <div className={cn('flex flex-col items-start', containerClassName)} {...containerProps}>
      {!!label && (
        <HoverCard openDelay={5} closeDelay={5}>
          <div className="flex items-center gap-2">
            <Text className={cn(labelClassName, 'font-[600]')} size="md" {...labelProps}>
              {label}
            </Text>
            {required && (
              <Text className="text-red-500" size="md">
                *
              </Text>
            )}
            {!!altValue && (
              <HoverCardTrigger className={cn('cursor-pointer center bg-gray-200 rounded-full')}>
                <Info className="text-xl" />
              </HoverCardTrigger>
            )}
            {addable && (
              <>
                <ChevronsLeft size={16} className="text-gray-500" />
                <Button variant="link" onClick={() => inputRef.current?.click()} type="button" className="h-fit p-0">
                  {multiple ? 'إضافة صور' : 'إضافة صورة'}
                </Button>
              </>
            )}
            <HoverCardContent className="flex items-end justify-start">
              <Text size="md" className="text-gray-600">
                {altValue}
              </Text>
            </HoverCardContent>
          </div>
          <Spacer height={10} />
        </HoverCard>
      )}
      <Card
        className={cn(
          'flex flex-row bg-white/50 border-[1px] !px-2 !p-1 gap-2 relative min-h-[90px]',
          attachments.length === 0 && 'center',
          className,
        )}
        {...props}
      >
        {attachments.length === 0 && (
          <Text size="md" className="text-gray-600">
            {multiple ? 'لا يوجد ملفات مرفقة' : 'لا يوجد ملف مرفق'}
          </Text>
        )}
        {/* VIEWER */}
        {isImageType && (
          <ImageUploader
            images={attachments}
            removable={removable}
            onRemove={handleRemove}
            hoverable={hoverable}
            {...uploaderProps}
          />
        )}
        {addable && (
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) => !!e.target.files && handleAdd(e.target.files)}
            accept={ACCEPT_TYPES[type].join(',')}
            multiple={multiple}
          />
        )}
        {/* INPUTS */}
        <div className="hidden">
          {attachments.map((attachment, index) => (
            <input
              type="text"
              name={multiple ? `${name}.${index}` : `${name}`}
              defaultValue={attachment || ''}
              key={index}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
