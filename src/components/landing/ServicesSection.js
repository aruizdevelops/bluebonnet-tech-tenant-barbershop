'use client';

import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import SERVICES from '../../constants/services';

export default function ServicesSection() {
  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            component="p"
            sx={{ color: 'primary.main', mb: 1.5, fontSize: '0.8rem' }}
          >
            Our Services
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Premium Grooming
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto' }}
          >
            Every service is delivered with precision, care, and the attention to detail you deserve.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <Grid key={service.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'default',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 3.5 }, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        bgcolor: 'rgba(201, 169, 110, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2.5,
                      }}
                    >
                      <IconComponent sx={{ color: 'primary.main', fontSize: 28 }} />
                    </Box>

                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        mb: 1,
                        fontSize: '1.15rem',
                        fontFamily: '"Playfair Display", "Georgia", serif',
                      }}
                    >
                      {service.name}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        color: 'primary.main',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        fontFamily: '"Playfair Display", "Georgia", serif',
                        mb: 1.5,
                      }}
                    >
                      {service.price}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
