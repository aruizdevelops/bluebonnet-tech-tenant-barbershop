'use client';

import { TenantProvider, CoreThemeProvider } from '@bluebonnet-tech/core';
import tenantConfig from '../src/config/tenant';
import HomePage from '../src/components/landing/HomePage';

export default function Home() {
  return (
    <TenantProvider config={tenantConfig}>
      <CoreThemeProvider>
        <HomePage />
      </CoreThemeProvider>
    </TenantProvider>
  );
}
