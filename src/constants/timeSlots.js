/**
 * Generate mock time slots for the booking flow.
 * Produces slots for the current week (Mon–Sat).
 * Some slots are randomly marked unavailable for realism.
 */

const SLOT_TIMES = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateWeekSlots() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const days = [];
  for (let i = 0; i < 6; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const dateKey = date.toISOString().split('T')[0];
    const isPast = date.toDateString() !== today.toDateString() && date < today;

    const slots = SLOT_TIMES.map((time, idx) => {
      const seed = date.getDate() * 100 + idx;
      const available = !isPast && seededRandom(seed) > 0.3;
      return { time, available };
    });

    days.push({
      dayLabel,
      dateLabel,
      dateKey,
      isPast,
      isToday: date.toDateString() === today.toDateString(),
      slots,
    });
  }

  return days;
}
