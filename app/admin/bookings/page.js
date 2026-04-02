'use client';

import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Stack, useMediaQuery, useTheme,
} from '@mui/material';
import { PageContainer, StatusChip } from '@bluebonnet-tech/core/components';
import MOCK_BOOKINGS from '../../../src/constants/mockBookings';
import BookingDetailModal from '../../../src/components/admin/BookingDetailModal';

const STATUS_MAP = {
  confirmed: 'active',
  completed: 'completed',
  pending: 'pending',
  cancelled: 'error',
};

const FILTERS = ['all', 'confirmed', 'pending', 'completed', 'cancelled'];

export default function AdminBookings() {
  const [filter, setFilter] = useState('all');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filtered = filter === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filter);

  function handleStatusChange(bookingId, newStatus) {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    setSelectedBooking(null);
  }

  return (
    <PageContainer title="Bookings" subtitle="Manage appointments">
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f.charAt(0).toUpperCase() + f.slice(1)}
            onClick={() => setFilter(f)}
            variant={filter === f ? 'filled' : 'outlined'}
            sx={{
              fontWeight: 500,
              textTransform: 'capitalize',
              bgcolor: filter === f ? 'primary.main' : undefined,
              color: filter === f ? 'primary.contrastText' : undefined,
              borderColor: 'rgba(201, 169, 110, 0.3)',
              '&:hover': {
                bgcolor: filter === f ? 'primary.dark' : 'rgba(201, 169, 110, 0.08)',
              },
            }}
          />
        ))}
      </Stack>

      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              {!isMobile && <TableCell>ID</TableCell>}
              <TableCell>Client</TableCell>
              <TableCell>Service</TableCell>
              {!isMobile && <TableCell>Barber</TableCell>}
              {!isMobile && <TableCell>Date</TableCell>}
              {!isMobile && <TableCell>Time</TableCell>}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((booking) => (
              <TableRow
                key={booking.id}
                hover
                onClick={() => setSelectedBooking(booking)}
                sx={{ cursor: 'pointer' }}
              >
                {!isMobile && <TableCell sx={{ fontWeight: 500 }}>{booking.id}</TableCell>}
                <TableCell sx={{ fontWeight: 500 }}>{booking.client}</TableCell>
                <TableCell>{booking.service}</TableCell>
                {!isMobile && <TableCell>{booking.barber}</TableCell>}
                {!isMobile && <TableCell>{booking.date}</TableCell>}
                {!isMobile && <TableCell>{booking.time}</TableCell>}
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

      <BookingDetailModal
        open={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
        onStatusChange={handleStatusChange}
      />
    </PageContainer>
  );
}
