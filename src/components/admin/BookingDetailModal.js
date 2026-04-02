'use client';

import {
  Dialog, DialogContent, Box, Typography, Button, Stack, IconButton, Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { StatusChip } from '@bluebonnet-tech/core/components';

const STATUS_MAP = {
  confirmed: 'active',
  completed: 'completed',
  pending: 'pending',
  cancelled: 'error',
};

const STATUS_ACTIONS = {
  pending: [
    { label: 'Confirm', value: 'confirmed', color: 'success', icon: CheckCircleIcon },
    { label: 'Cancel', value: 'cancelled', color: 'error', icon: CancelIcon },
  ],
  confirmed: [
    { label: 'Complete', value: 'completed', color: 'success', icon: CheckCircleIcon },
    { label: 'Cancel', value: 'cancelled', color: 'error', icon: CancelIcon },
  ],
  completed: [],
  cancelled: [],
};

function DetailRow({ icon: Icon, label, value }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Icon sx={{ fontSize: 18, color: 'text.secondary' }} />
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.65rem' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function BookingDetailModal({ open, onClose, booking, onStatusChange }) {
  if (!booking) return null;

  const actions = STATUS_ACTIONS[booking.status] || [];
  const isTerminal = actions.length === 0;

  const formattedDate = new Date(booking.date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          borderRadius: { xs: 0, sm: 3 },
          m: { xs: 0, sm: 3 },
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: 'blur(4px)' },
        },
      }}
    >
      <Box
        sx={{
          height: 6,
          background: 'linear-gradient(90deg, #A07D3F 0%, #C9A96E 50%, #E2C994 100%)',
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2.5, pb: 0 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.05em' }}>
          {booking.id}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, pt: 2, pb: 3 }}>
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
            {booking.client}
          </Typography>
          <StatusChip
            status={STATUS_MAP[booking.status] || 'default'}
            label={booking.status}
            sx={{ alignSelf: 'flex-start' }}
          />
        </Stack>

        <Stack
          spacing={2}
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: 'rgba(201, 169, 110, 0.06)',
            border: '1px solid rgba(201, 169, 110, 0.12)',
            mb: 3,
          }}
        >
          <DetailRow icon={ContentCutIcon} label="Service" value={`${booking.service} with ${booking.barber}`} />
          <DetailRow icon={CalendarTodayIcon} label="Date" value={formattedDate} />
          <DetailRow icon={AccessTimeIcon} label="Time" value={booking.time} />
          <DetailRow icon={EmailIcon} label="Email" value={booking.email} />
          <DetailRow icon={PhoneIcon} label="Phone" value={booking.phone} />
        </Stack>

        {isTerminal ? (
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center', fontStyle: 'italic' }}
          >
            This booking is {booking.status} — no further actions available.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Update Status
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              {actions.map((action) => (
                <Button
                  key={action.value}
                  variant={action.color === 'error' ? 'outlined' : 'contained'}
                  color={action.color}
                  startIcon={<action.icon />}
                  fullWidth
                  onClick={() => onStatusChange(booking.id, action.value)}
                  sx={{
                    py: 1.2,
                    fontWeight: 600,
                    ...(action.color === 'error' && {
                      borderColor: 'error.main',
                      '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.08)' },
                    }),
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
