'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { TenantProvider, CoreThemeProvider } from '@bluebonnet-tech/core';
import { AppShell } from '@bluebonnet-tech/core/components';
import tenantConfig from '../../src/config/tenant';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const NAV_ITEMS = [
  { label: 'Dashboard', path: `${basePath}/admin`, icon: <DashboardIcon /> },
  { label: 'Bookings', path: `${basePath}/admin/bookings`, icon: <CalendarMonthIcon /> },
  { label: 'Services', path: `${basePath}/admin/services`, icon: <ContentCutIcon /> },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const activePath = `${basePath}${pathname}`;

  const topBarActions = (
    <Button
      href={`${basePath}/`}
      size="small"
      startIcon={<ArrowBackIcon />}
      sx={{ color: 'text.secondary', textTransform: 'none' }}
    >
      Back to Site
    </Button>
  );

  return (
    <TenantProvider config={tenantConfig}>
      <CoreThemeProvider>
        <AppShell navItems={NAV_ITEMS} topBarActions={topBarActions}>
          {children}
        </AppShell>
      </CoreThemeProvider>
    </TenantProvider>
  );
}
