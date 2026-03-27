'use client';

import { useEffect, useState } from 'react';
import {
  Dialog, DialogContent, Box, Typography, Button, Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ConfirmationModal({ open, onClose, booking }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setAnimate(true), 100);
      return () => clearTimeout(timer);
    }
    setAnimate(false);
  }, [open]);

  const formattedDate = booking?.date
    ? new Date(booking.date + 'T12:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : '';

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
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          height: 6,
          background: 'linear-gradient(90deg, #A07D3F 0%, #C9A96E 50%, #E2C994 100%)',
        }}
      />

      <DialogContent sx={{ textAlign: 'center', py: 5, px: 4 }}>
        <Box
          sx={{
            mb: 3,
            transform: animate ? 'scale(1)' : 'scale(0)',
            opacity: animate ? 1 : 0,
            transition: 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease',
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 72,
              color: 'primary.main',
              filter: 'drop-shadow(0 4px 20px rgba(201, 169, 110, 0.4))',
            }}
          />
        </Box>

        <Typography
          variant="h3"
          sx={{
            mb: 1,
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 400ms ease 200ms',
          }}
        >
          You&apos;re On the List
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 400ms ease 300ms',
          }}
        >
          Looking sharp already, {booking?.name?.split(' ')[0] || 'friend'}.
        </Typography>

        <Stack
          spacing={1.5}
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: 'rgba(201, 169, 110, 0.06)',
            border: '1px solid rgba(201, 169, 110, 0.12)',
            mb: 4,
            opacity: animate ? 1 : 0,
            transition: 'opacity 400ms ease 400ms',
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Service
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {booking?.service}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Barber
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {booking?.barber}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              When
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formattedDate} at {booking?.time}
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={onClose}
          sx={{
            opacity: animate ? 1 : 0,
            transition: 'opacity 400ms ease 500ms',
          }}
        >
          Done
        </Button>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 2,
            color: 'text.secondary',
            opacity: animate ? 0.7 : 0,
            transition: 'opacity 400ms ease 600ms',
          }}
        >
          This is a demo booking — no real appointment was created.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
