'use client';

import { useState, useMemo } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, Button, IconButton, Stepper, Step, StepLabel,
  TextField, Stack, Card, CardActionArea, CardContent, Avatar,
  Chip, Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { sanitizeText } from '@bluebonnet-tech/core';
import SERVICES from '../../constants/services';
import BARBERS from '../../constants/barbers';
import { generateWeekSlots } from '../../constants/timeSlots';
import ConfirmationModal from './ConfirmationModal';

const STEPS = ['Service & Barber', 'Date & Time', 'Your Details'];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s()+-]{7,20}$/;

function StepServiceBarber({ selected, onSelect }) {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" component="p" sx={{ mb: 2, fontFamily: '"Playfair Display", serif', fontSize: '1.1rem' }}>
          Choose a Service
        </Typography>
        <Grid container spacing={1.5}>
          {SERVICES.map((service) => (
            <Grid key={service.id} size={{ xs: 6 }}>
              <Card
                sx={{
                  borderColor: selected.serviceId === service.id ? 'primary.main' : undefined,
                  borderWidth: selected.serviceId === service.id ? 2 : 1,
                }}
              >
                <CardActionArea onClick={() => onSelect({ serviceId: service.id })}>
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {service.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                      {service.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h6" component="p" sx={{ mb: 2, fontFamily: '"Playfair Display", serif', fontSize: '1.1rem' }}>
          Choose Your Barber
        </Typography>
        <Stack spacing={1.5}>
          {BARBERS.map((barber) => (
            <Card
              key={barber.id}
              sx={{
                borderColor: selected.barberId === barber.id ? 'primary.main' : undefined,
                borderWidth: selected.barberId === barber.id ? 2 : 1,
              }}
            >
              <CardActionArea onClick={() => onSelect({ barberId: barber.id })}>
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        background: 'linear-gradient(135deg, #C9A96E 0%, #E2C994 100%)',
                        color: '#0D0D0D',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      {barber.initials}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {barber.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'primary.main', display: 'block', mb: 0.5 }}>
                        {barber.specialty}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {barber.bio}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

function StepDateTime({ selected, onSelect }) {
  const weekSlots = useMemo(() => generateWeekSlots(), []);
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = weekSlots.find((d) => d.isToday);
    return today ? today.dateKey : weekSlots[0].dateKey;
  });

  const activeDay = weekSlots.find((d) => d.dateKey === selectedDay) || weekSlots[0];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" component="p" sx={{ mb: 2, fontFamily: '"Playfair Display", serif', fontSize: '1.1rem' }}>
          Select a Day
        </Typography>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
          {weekSlots.map((day) => (
            <Chip
              key={day.dateKey}
              label={`${day.dayLabel} ${day.dateLabel}`}
              onClick={() => { setSelectedDay(day.dateKey); onSelect({ date: null, time: null }); }}
              variant={selectedDay === day.dateKey ? 'filled' : 'outlined'}
              disabled={day.isPast}
              sx={{
                fontWeight: 500,
                bgcolor: selectedDay === day.dateKey ? 'primary.main' : undefined,
                color: selectedDay === day.dateKey ? 'primary.contrastText' : undefined,
                borderColor: 'rgba(201, 169, 110, 0.3)',
                flexShrink: 0,
                '&:hover': {
                  bgcolor: selectedDay === day.dateKey ? 'primary.dark' : 'rgba(201, 169, 110, 0.08)',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" component="p" sx={{ mb: 2, fontFamily: '"Playfair Display", serif', fontSize: '1.1rem' }}>
          Available Times
        </Typography>
        <Grid container spacing={1}>
          {activeDay.slots.map((slot) => (
            <Grid key={slot.time} size={{ xs: 4, sm: 3 }}>
              <Button
                fullWidth
                variant={selected.date === activeDay.dateKey && selected.time === slot.time ? 'contained' : 'outlined'}
                color="primary"
                disabled={!slot.available}
                onClick={() => onSelect({ date: activeDay.dateKey, time: slot.time })}
                sx={{
                  fontSize: '0.8rem',
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                {slot.time}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

function StepDetails({ values, errors, onChange }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="p" sx={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem' }}>
        Your Information
      </Typography>
      <TextField
        label="Full Name"
        name="name"
        value={values.name}
        onChange={onChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        autoComplete="name"
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={onChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        autoComplete="email"
        inputProps={{ maxLength: 254 }}
      />
      <TextField
        label="Phone Number"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={onChange}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth
        autoComplete="tel"
        inputProps={{ maxLength: 20 }}
      />
    </Stack>
  );
}

export default function BookingModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selections, setSelections] = useState({
    serviceId: null,
    barberId: null,
    date: null,
    time: null,
  });
  const [details, setDetails] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleSelectionsUpdate = (updates) => {
    setSelections((prev) => ({ ...prev, ...updates }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const canProceed = () => {
    if (step === 0) return !!(selections.serviceId && selections.barberId);
    if (step === 1) return !!(selections.date && selections.time);
    if (step === 2) {
      const name = details.name.trim();
      const email = details.email.trim();
      const phone = details.phone.trim();
      return !!(name && EMAIL_REGEX.test(email) && PHONE_REGEX.test(phone));
    }
    return false;
  };

  const handleNext = () => {
    if (step === 2) {
      const newErrors = {};
      if (!sanitizeText(details.name.trim())) newErrors.name = 'Name is required';
      if (!details.email.trim() || !EMAIL_REGEX.test(details.email.trim())) {
        newErrors.email = 'Valid email is required';
      }
      if (!details.phone.trim() || !PHONE_REGEX.test(details.phone.trim())) {
        newErrors.phone = 'Valid phone number is required';
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;
    }
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setStep(0);
    setSelections({ serviceId: null, barberId: null, date: null, time: null });
    setDetails({ name: '', email: '', phone: '' });
    setErrors({});
    setShowConfirmation(false);
  };

  const handleCloseAll = () => {
    handleReset();
    onClose();
  };

  const selectedService = SERVICES.find((s) => s.id === selections.serviceId);
  const selectedBarber = BARBERS.find((b) => b.id === selections.barberId);

  if (showConfirmation) {
    return (
      <ConfirmationModal
        open
        onClose={handleCloseAll}
        booking={{
          service: selectedService?.name,
          barber: selectedBarber?.name,
          date: selections.date,
          time: selections.time,
          name: sanitizeText(details.name.trim()),
          email: sanitizeText(details.email.trim()),
          phone: sanitizeText(details.phone.trim()),
        }}
      />
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={false}
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          borderRadius: { xs: 0, sm: 3 },
          m: { xs: 0, sm: 3 },
          maxHeight: { xs: '100%', sm: 'calc(100vh - 48px)' },
          height: { xs: '100%', sm: 'auto' },
          width: { xs: '100%', sm: undefined },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 6 }}>
        {step > 0 && (
          <IconButton onClick={handleBack} size="small" sx={{ color: 'text.secondary' }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component="span"
          sx={{ fontFamily: '"Playfair Display", serif', flex: 1 }}
        >
          Book Your Appointment
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
          aria-label="Close booking"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 3 }}>
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{
            '& .MuiStepIcon-root.Mui-active': { color: 'primary.main' },
            '& .MuiStepIcon-root.Mui-completed': { color: 'primary.main' },
          }}
        >
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{ sx: { fontSize: '1.4rem' } }}
                sx={{ '& .MuiStepLabel-label': { fontSize: '0.75rem', mt: 0.5 } }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        {step === 0 && (
          <StepServiceBarber selected={selections} onSelect={handleSelectionsUpdate} />
        )}
        {step === 1 && (
          <StepDateTime selected={selections} onSelect={handleSelectionsUpdate} />
        )}
        {step === 2 && (
          <>
            <StepDetails values={details} errors={errors} onChange={handleDetailsChange} />
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: 'rgba(201, 169, 110, 0.06)',
                border: '1px solid rgba(201, 169, 110, 0.12)',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                Booking Summary
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {selectedService?.name} &bull; {selectedService?.bookingPrice}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                with {selectedBarber?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {selections.date} at {selections.time}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {step === STEPS.length - 1 ? 'Confirm Booking' : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
