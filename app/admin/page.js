'use client';

import {
  Card, CardContent, Typography, Grid, Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import { PageContainer, StatusChip } from '@bluebonnet-tech/core/components';
import DASHBOARD_STATS from '../../src/constants/mockDashboard';
import MOCK_BOOKINGS from '../../src/constants/mockBookings';

const STATUS_MAP = {
  confirmed: 'active',
  completed: 'active',
  pending: 'pending',
  cancelled: 'error',
};

const recentBookings = MOCK_BOOKINGS.slice(0, 5);

export default function AdminDashboard() {
  return (
    <PageContainer title="Dashboard" subtitle="Overview of your barbershop">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {DASHBOARD_STATS.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Recent Bookings
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell sx={{ fontWeight: 500 }}>{booking.id}</TableCell>
                <TableCell>{booking.client}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <StatusChip
                    status={STATUS_MAP[booking.status] || 'default'}
                    label={booking.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}
