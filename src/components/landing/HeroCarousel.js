'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CAROUSEL_SLIDES from '../../constants/carousel';

const AUTO_ROTATE_MS = 20000;
const TRANSITION_MS = 600;

export default function HeroCarousel({ onBookOpen }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  const lastTransitionRef = useRef(0);
  const total = CAROUSEL_SLIDES.length;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTO_ROTATE_MS);
  }, [total]);

  const goTo = useCallback((index) => {
    const now = Date.now();
    if (now - lastTransitionRef.current < TRANSITION_MS) return;
    lastTransitionRef.current = now;
    setCurrent(((index % total) + total) % total);
    resetTimer();
  }, [total, resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    setTouchStart(null);
  };

  return (
    <Box
      component="section"
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: 500,
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {CAROUSEL_SLIDES.map((slide, index) => (
        <Box
          key={slide.id}
          role="img"
          aria-hidden={index !== current}
          aria-label={slide.alt}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === current ? 1 : 0,
            transform: index === current ? 'scale(1)' : 'scale(1.05)',
            transition: `opacity ${TRANSITION_MS}ms ease-in-out, transform ${TRANSITION_MS}ms ease-in-out`,
          }}
        />
      ))}

      <Box
        aria-live="polite"
        aria-atomic="true"
        sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
      >
        Slide {current + 1} of {total}: {CAROUSEL_SLIDES[current].alt}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.55) 50%, rgba(13,13,13,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack alignItems="center" textAlign="center" spacing={3}>
          <Typography
            variant="overline"
            component="p"
            sx={{
              color: 'primary.main',
              letterSpacing: '0.2em',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            Crafted Cuts &bull; Timeless Style
          </Typography>

          <Typography
            variant="h1"
            component="h1"
            sx={{ color: 'text.primary', maxWidth: 700 }}
          >
            Where Tradition Meets Precision
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 520,
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            Experience the art of barbering at its finest. Premium cuts, classic shaves, and a space built for gentlemen.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onBookOpen}
            >
              Book Your Chair
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="#services"
            >
              View Services
            </Button>
          </Stack>
        </Stack>
      </Container>

      <IconButton
        aria-label="Previous slide"
        onClick={() => goTo(current - 1)}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          color: 'rgba(201, 169, 110, 0.7)',
          bgcolor: 'rgba(13, 13, 13, 0.4)',
          '&:hover': { bgcolor: 'rgba(13, 13, 13, 0.6)', color: 'primary.main' },
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
      </IconButton>

      <IconButton
        aria-label="Next slide"
        onClick={() => goTo(current + 1)}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          color: 'rgba(201, 169, 110, 0.7)',
          bgcolor: 'rgba(13, 13, 13, 0.4)',
          '&:hover': { bgcolor: 'rgba(13, 13, 13, 0.6)', color: 'primary.main' },
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
      </IconButton>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 36 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        {CAROUSEL_SLIDES.map((slide, index) => (
          <Box
            key={slide.id}
            component="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            sx={{
              width: index === current ? 28 : 10,
              height: 10,
              borderRadius: 5,
              border: 'none',
              cursor: 'pointer',
              bgcolor: index === current ? 'primary.main' : 'rgba(245, 240, 235, 0.35)',
              transition: 'all 300ms ease',
              p: 0,
              '&:hover': { bgcolor: index === current ? 'primary.main' : 'rgba(245, 240, 235, 0.55)' },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
