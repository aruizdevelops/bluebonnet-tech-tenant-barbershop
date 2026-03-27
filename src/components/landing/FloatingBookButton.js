'use client';

import { Fab } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

export default function FloatingBookButton({ onClick }) {
  return (
    <Fab
      variant="extended"
      color="primary"
      aria-label="Book appointment"
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: { xs: 20, md: 28 },
        right: { xs: 16, md: 28 },
        zIndex: 1100,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        px: 3,
        background: 'linear-gradient(135deg, #C9A96E 0%, #E2C994 100%)',
        color: '#0D0D0D',
        boxShadow: '0 6px 24px rgba(201, 169, 110, 0.35)',
        '&:hover': {
          background: 'linear-gradient(135deg, #A07D3F 0%, #C9A96E 100%)',
          boxShadow: '0 8px 32px rgba(201, 169, 110, 0.45)',
        },
      }}
    >
      <EventIcon sx={{ mr: 1, fontSize: 20 }} />
      Book Now
    </Fab>
  );
}
