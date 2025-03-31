'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

// Import i18n configuration (this will initialize i18n)
import '@/lib/i18n/i18n';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // This ensures i18n is initialized only on the client side
  useEffect(() => {
    // i18n is already initialized via the import above
    // This is just to ensure the import happens on client only
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
} 