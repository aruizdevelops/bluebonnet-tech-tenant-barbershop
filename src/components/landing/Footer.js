'use client';

import { Box, Container, Typography, Grid, Stack, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: '#0A0A0A',
        borderTop: '1px solid rgba(201, 169, 110, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                color: 'primary.main',
                mb: 1.5,
              }}
            >
              Iron & Oak
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 280 }}>
              Crafted Cuts. Timeless Style. A modern barbershop built for the gentleman who values precision and quality.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'primary.main',
                mb: 2,
                fontSize: '0.75rem',
              }}
            >
              Hours
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AccessTimeIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                    Mon – Fri
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    9:00 AM – 6:00 PM
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AccessTimeIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                    Saturday
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    9:00 AM – 4:00 PM
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', pl: 4.5 }}>
                Closed Sundays
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'primary.main',
                mb: 2,
                fontSize: '0.75rem',
              }}
            >
              Contact
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  742 Oakwood Ave, Suite 100
                  <br />
                  Austin, TX 78701
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  (512) 555-0187
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(201, 169, 110, 0.08)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            &copy; {new Date().getFullYear()} Iron & Oak Barbershop. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.6 }}>
            This is a fictional business for portfolio demonstration.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
