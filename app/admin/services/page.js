'use client';

import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogContent, DialogActions, Box, Typography, TextField, Button,
  IconButton, Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PageContainer, StatusChip } from '@bluebonnet-tech/core/components';
import INITIAL_SERVICES from '../../../src/constants/services';

export default function AdminServices() {
  const [services, setServices] = useState(
    INITIAL_SERVICES.map((s) => ({ ...s, status: 'active' }))
  );
  const [selected, setSelected] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editBookingPrice, setEditBookingPrice] = useState('');

  function handleToggleStatus(e, serviceId) {
    e.stopPropagation();
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
          : s
      )
    );
  }

  function handleOpen(service) {
    setSelected(service);
    setEditDescription(service.description);
    setEditPrice(service.price);
    setEditBookingPrice(service.bookingPrice);
  }

  function handleClose() {
    setSelected(null);
  }

  function handleSave() {
    setServices((prev) =>
      prev.map((s) =>
        s.id === selected.id
          ? { ...s, description: editDescription, price: editPrice, bookingPrice: editBookingPrice }
          : s
      )
    );
    setSelected(null);
  }

  return (
    <PageContainer title="Services" subtitle="Your service offerings">
      <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price Range</TableCell>
              <TableCell>Booking Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow
                key={service.id}
                hover
                onClick={() => handleOpen(service)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{service.name}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.bookingPrice}</TableCell>
                <TableCell>
                  <StatusChip
                    status={service.status}
                    label={service.status === 'active' ? 'Active' : 'Inactive'}
                    onClick={(e) => handleToggleStatus(e, service.id)}
                    sx={{ cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={Boolean(selected)}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'background.paper',
              backgroundImage: 'none',
              borderRadius: { xs: 0, sm: 3 },
              m: { xs: 0, sm: 3 },
            },
          },
          backdrop: { sx: { backdropFilter: 'blur(4px)' } },
        }}
      >
        {selected && (
          <>
            <Box
              sx={{
                height: 6,
                background: 'linear-gradient(90deg, #A07D3F 0%, #C9A96E 50%, #E2C994 100%)',
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2.5, pb: 0 }}>
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
                {selected.name}
              </Typography>
              <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <DialogContent sx={{ px: 3, pt: 2, pb: 1 }}>
              <Stack spacing={2.5}>
                <TextField
                  label="Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  multiline
                  minRows={3}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Price Range"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Booking Price"
                    value={editBookingPrice}
                    onChange={(e) => setEditBookingPrice(e.target.value)}
                    fullWidth
                  />
                </Stack>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
              <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </PageContainer>
  );
}
