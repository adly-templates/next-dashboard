'use client';

import React from 'react';

import { Link, Text } from '@/components';
import { useCurrentPagination } from '@/hooks';
import { cn } from '@/utils';

export type PaginationProps = {
  totalPages?: number;
  currentPage?: number;
  pagesToShow?: number;
  itemsPerPage?: number;
  totalItems?: number;
  hideText?: boolean;
} & React.ComponentProps<'div'>;

const COMMON_SEPARATOR = '...';

export const Pagination = ({
  totalPages = 1,
  currentPage = 1,
  pagesToShow = 5,
  itemsPerPage = 10,
  hideText = false,
  totalItems: initialTotalItems,
  ...props
}: PaginationProps) => {
  const { page } = useCurrentPagination();
  currentPage = page;

  const MAX_PAGES = totalPages;
  const MIN_PAGES = 0;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;
  const isFewLessPages = currentPage - Math.floor(pagesToShow / 2) > 1;
  const isALotMorePages = currentPage + Math.floor(pagesToShow / 2) < totalPages;
  const defaultTotalItems = initialTotalItems || itemsPerPage * totalPages;
  const start = defaultTotalItems === 0 ? 0 : itemsPerPage * (currentPage - 1) + 1;
  const end = Math.min(start + itemsPerPage - 1, defaultTotalItems);
  const totalItems = defaultTotalItems || end;
  return (
    <div className="flex items-center flex-wrap justify-between" {...props}>
      {!hideText && (
        <div className="flex items-center gap-1">
          <PaginationSeparator>معروض</PaginationSeparator>
          <span className="flex items-center">
            <Text bold>{start}</Text>
            <PaginationSeparator> - </PaginationSeparator>
            <Text bold>{end}</Text>
          </span>
          <PaginationSeparator>من أصل</PaginationSeparator>
          <Text bold>{totalItems}</Text>
        </div>
      )}
      <div className="flex items-center gap-2 select-none">
        {!isFirstPage && <PaginationItem page={currentPage - 1} label="السابق" isCurrent={false} />}
        {isFewLessPages && <PaginationItem page={currentPage - 1} label={COMMON_SEPARATOR} isCurrent={false} />}
        <div className="flex items-center gap-2">
          {getNNearPages({ pagesToShow, currentPage, minPages: MIN_PAGES, maxPages: MAX_PAGES }).map((page) => (
            <PaginationItem key={page} page={page} isCurrent={page === currentPage} />
          ))}
        </div>
        {isALotMorePages && <PaginationItem page={currentPage + 1} label={COMMON_SEPARATOR} isCurrent={false} />}
        {!isLastPage && <PaginationItem page={currentPage + 1} label="التالي" isCurrent={false} />}
      </div>
    </div>
  );
};

export type PaginationItemProps = {
  page: number;
  label?: string;
  isCurrent: boolean;
} & Omit<React.ComponentProps<typeof Link>, 'href'>;

export const PaginationItem = ({ page, label, isCurrent, ...props }: PaginationItemProps) => {
  const isSeparator = label === COMMON_SEPARATOR;
  return (
    <Link
      href={isSeparator ? '#' : `?page=${page}`}
      className={cn('rounded-md px-2 py-1 bg-white border transition-colors duration-200', {
        'bg-primary text-white opacityHover': isCurrent,
        'text-muted-foreground hover:bg-muted hover:text-foreground': !isCurrent,
        'w-8 aspect-square center': typeof label === 'undefined',
      })}
      {...props}
    >
      {label || page}
    </Link>
  );
};

export const PaginationSeparator = ({ children, ...props }: React.ComponentProps<typeof Text>) => {
  return (
    <Text className="text-muted-foreground" {...props}>
      {children}
    </Text>
  );
};

const getNNearPages = ({
  pagesToShow,
  currentPage,
  minPages,
  maxPages,
}: {
  pagesToShow: number;
  currentPage: number;
  minPages: number;
  maxPages: number;
}) =>
  [...Array(pagesToShow)]
    .map((_, i) => currentPage + i - Math.floor(pagesToShow / 2))
    .filter((page) => page > minPages && page <= maxPages);
