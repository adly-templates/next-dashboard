import React from 'react';

import type { Metadata } from 'next';

import './globals.css';

import { Initializer } from '@/contexts';

export const metadata: Metadata = {
  title: 'OpenEG AI',
  description: 'OpenEG AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://kit.fontawesome.com/e6c13277a1.js" crossOrigin="anonymous" />
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
      </head>
      <body>
        <Initializer>{children}</Initializer>
      </body>
    </html>
  );
}
