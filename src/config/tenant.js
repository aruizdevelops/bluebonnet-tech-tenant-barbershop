/**
 * Tenant configuration for Iron & Oak Barbershop.
 * Dark-mode, upscale, masculine barbershop palette.
 * All placeholder content — does not copy any real business.
 */
const tenantConfig = {
  id: 'iron-oak-barbershop',
  name: 'Iron & Oak Barbershop',
  logo: null,
  theme: {
    palette: {
      mode: 'dark',
      primary: {
        main: '#C9A96E',
        light: '#E2C994',
        dark: '#A07D3F',
        contrastText: '#0D0D0D',
      },
      secondary: {
        main: '#F5E6D3',
        light: '#FFF5EC',
        dark: '#D4C4B0',
        contrastText: '#0D0D0D',
      },
      background: {
        default: '#0D0D0D',
        paper: '#1A1A1A',
      },
      text: {
        primary: '#F5F0EB',
        secondary: '#A09080',
      },
      error: {
        main: '#C0392B',
      },
      warning: {
        main: '#D4A03C',
      },
      success: {
        main: '#5B8C5A',
      },
      info: {
        main: '#5B7FA5',
      },
      divider: 'rgba(201, 169, 110, 0.15)',
    },
    typography: {
      h1: {
        fontSize: 'clamp(2.25rem, 1.5rem + 3vw, 3.75rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.01em',
        fontFamily: '"Playfair Display", "Georgia", serif',
      },
      h2: {
        fontSize: 'clamp(1.75rem, 1.15rem + 2.2vw, 2.75rem)',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        fontFamily: '"Playfair Display", "Georgia", serif',
      },
      h3: {
        fontSize: 'clamp(1.35rem, 1rem + 1.2vw, 2rem)',
        fontWeight: 600,
        lineHeight: 1.2,
        fontFamily: '"Playfair Display", "Georgia", serif',
      },
      h4: {
        fontWeight: 600,
        fontFamily: '"Playfair Display", "Georgia", serif',
      },
      h5: {
        fontWeight: 600,
        fontFamily: '"Playfair Display", "Georgia", serif',
      },
      h6: {
        fontWeight: 600,
        fontFamily: '"Playfair Display", "Georgia", serif',
      },
      body1: {
        fontSize: '1.0625rem',
        lineHeight: 1.7,
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      },
      body2: {
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      },
      button: {
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontWeight: 600,
        letterSpacing: '0.06em',
      },
      overline: {
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontWeight: 500,
        letterSpacing: '0.15em',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '10px 28px',
            fontWeight: 600,
            textTransform: 'uppercase',
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #C9A96E 0%, #E2C994 100%)',
            color: '#0D0D0D',
            boxShadow: '0 4px 16px rgba(201, 169, 110, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #A07D3F 0%, #C9A96E 100%)',
              boxShadow: '0 6px 24px rgba(201, 169, 110, 0.35)',
            },
          },
          outlinedPrimary: {
            borderColor: 'rgba(201, 169, 110, 0.5)',
            color: '#C9A96E',
            '&:hover': {
              borderColor: '#C9A96E',
              backgroundColor: 'rgba(201, 169, 110, 0.08)',
            },
          },
          sizeLarge: {
            padding: '14px 36px',
            fontSize: '0.9rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#1A1A1A',
            border: '1px solid rgba(201, 169, 110, 0.12)',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.3)',
            borderRadius: 12,
            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms',
            '&:hover': {
              borderColor: 'rgba(201, 169, 110, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backdropFilter: 'blur(12px)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '& fieldset': {
                borderColor: 'rgba(201, 169, 110, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(201, 169, 110, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#C9A96E',
              },
            },
          },
        },
      },
    },
  },
  features: {
    booking: true,
  },
};

export default tenantConfig;
