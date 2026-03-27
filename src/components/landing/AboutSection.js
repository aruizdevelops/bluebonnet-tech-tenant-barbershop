'use client';

import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const HIGHLIGHTS = [
  'Master barbers with decades of combined experience',
  'Premium grooming products and sterilized tools',
  'Relaxed atmosphere built for gentlemen',
  'Walk-ins welcome, appointments preferred',
];

export default function AboutSection() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 3,
                background: 'linear-gradient(145deg, rgba(201, 169, 110, 0.15) 0%, rgba(201, 169, 110, 0.05) 100%)',
                border: '1px solid rgba(201, 169, 110, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                role="img"
                aria-label="Barbershop tools and atmosphere"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.7,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13,13,13,0.6) 0%, transparent 60%)',
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="overline"
              component="p"
              sx={{ color: 'primary.main', mb: 1.5, fontSize: '0.8rem' }}
            >
              About Us
            </Typography>

            <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
              More Than a Haircut
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', mb: 4, maxWidth: 540 }}
            >
              Iron & Oak was founded on a simple idea: every man deserves a space
              where craftsmanship, comfort, and style come together. We blend
              time-honored barbering traditions with modern techniques to deliver
              an experience that goes beyond the chair. Step in, unwind, and leave
              looking your absolute best.
            </Typography>

            <Stack spacing={2}>
              {HIGHLIGHTS.map((item) => (
                <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
