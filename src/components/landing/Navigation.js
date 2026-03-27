'use client';

import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Container,
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NAV_ITEMS, NAV_BRAND, NAV_CTA } from '../../constants/navigation';

export default function Navigation({ onBookOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? 'rgba(13, 13, 13, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201, 169, 110, 0.12)' : '1px solid transparent',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ height: 72 }}>
            <Typography
              variant="h6"
              component="a"
              href="#"
              sx={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: scrolled ? 'primary.main' : '#C9A96E',
                textDecoration: 'none',
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 6 },
                transition: 'color 300ms',
                fontSize: '1.35rem',
              }}
            >
              {NAV_BRAND}
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, flexGrow: 1, justifyContent: 'center' }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  sx={{
                    color: scrolled ? 'text.secondary' : 'rgba(245, 240, 235, 0.75)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    px: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'color 300ms',
                    '&:hover': {
                      color: scrolled ? 'primary.main' : '#F5F0EB',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={onBookOpen}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {NAV_CTA.label}
            </Button>

            <IconButton
              aria-label="Open menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { md: 'none' },
                color: scrolled ? 'primary.main' : '#C9A96E',
                transition: 'color 300ms',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            borderLeft: '1px solid rgba(201, 169, 110, 0.12)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 700,
              color: 'primary.main',
              fontSize: '1.1rem',
            }}
          >
            {NAV_BRAND}
          </Typography>
          <IconButton onClick={handleDrawerToggle} aria-label="Close menu" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={handleNavClick}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontSize: '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => { handleNavClick(); onBookOpen(); }}
            >
              {NAV_CTA.label}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
