'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export const useBreadcrumb = () => {
  const pathname = usePathname();

  const headerLinks = useMemo(() => calculateBreadcrumb(pathname), [pathname]);

  return headerLinks;
};

const calculateBreadcrumb = (pathname: string) => {
  const headerLinks = [
    {
      label: 'Home',
      href: '/',
    },
  ];

  const paths = pathname.split('/').filter(Boolean);
  const pageType = paths[0];

  const page = paths[1];

  switch (pageType) {
    case 'orders':
      headerLinks.push({
        label: 'Orders',
        href: `/orders/phases/all`,
      });
      if (paths.length === 2) {
        headerLinks.push({
          label: paths[1].replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          href: `/orders/phases/${paths[1]}`,
        });
      }
      if (paths.length === 3) {
        headerLinks.push({
          label: paths[2].replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          href: `/orders/phases/${paths[2]}`,
        });
      }
      break;
    case 'clinics':
      headerLinks.push({
        label: 'Clinics',
        href: `/clinics`,
      });
      if (paths.length > 1) {
        headerLinks.push({
          label: paths[1].replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          href: `/clinics/${paths[1]}`,
        });
      }
      break;
    case 'doctors':
      headerLinks.push({
        label: 'Doctors',
        href: `/doctors`,
      });
      if (paths.length > 1) {
        headerLinks.push({
          label: paths[1].replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          href: `/doctors/${paths[1]}`,
        });
      }
      break;
    case 'patients':
      headerLinks.push({
        label: 'Patients',
        href: `/patients`,
      });
      if (paths.length > 1) {
        headerLinks.push({
          label: paths[1].replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          href: `/patients/${paths[1]}`,
        });
      }
      break;
  }

  switch (page) {
    case 'create':
      headerLinks.push({
        label: 'Create Order',
        href: `/orders/create`,
      });
      break;
  }

  return headerLinks;
};
