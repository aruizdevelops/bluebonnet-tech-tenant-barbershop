'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import Navigation from './Navigation';
import HeroCarousel from './HeroCarousel';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import Footer from './Footer';
import FloatingBookButton from './FloatingBookButton';
import BookingModal from '../booking/BookingModal';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleBookOpen = () => setBookingOpen(true);
  const handleBookClose = () => setBookingOpen(false);

  return (
    <>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          '&:focus': {
            position: 'fixed',
            top: 16,
            left: 16,
            width: 'auto',
            height: 'auto',
            zIndex: 9999,
            bgcolor: 'background.paper',
            color: 'text.primary',
            p: 2,
            borderRadius: 1,
            boxShadow: 4,
          },
        }}
      >
        Skip to main content
      </Box>

      <Navigation onBookOpen={handleBookOpen} />

      <main id="main-content">
        <HeroCarousel onBookOpen={handleBookOpen} />
        <ServicesSection />
        <AboutSection />
      </main>

      <Footer />
      <FloatingBookButton onClick={handleBookOpen} />
      <BookingModal open={bookingOpen} onClose={handleBookClose} />
    </>
  );
}
