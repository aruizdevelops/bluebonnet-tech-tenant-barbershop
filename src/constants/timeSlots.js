/**
 * Generate mock time slots for the booking flow.
 * Produces slots for the current week (Mon–Sat).
 * Some slots are randomly marked unavailable for realism.
 *
 * Time-awareness (US Central):
 * - After 5 PM CT, today is treated as past and the next day is selected.
 * - On the current day, time slots at or before the current hour are unavailable.
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

const DAY_CUTOFF_HOUR = 17; // 5 PM CT — after this hour, today counts as past

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getNowCentral() {
  const now = new Date();
  const centralStr = now.toLocaleString('en-US', { timeZone: 'America/Chicago' });
  return new Date(centralStr);
}

function parseSlotHour(timeStr) {
  const [timePart, period] = timeStr.split(' ');
  let [hours] = timePart.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours;
}

export function generateWeekSlots() {
  const nowCentral = getNowCentral();
  const centralHour = nowCentral.getHours();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayIsPast = centralHour >= DAY_CUTOFF_HOUR;

  // Start from today (or tomorrow if past the cutoff) and collect the next 6
  // business days (Mon–Sat, skipping Sundays).
  const start = new Date(today);
  if (todayIsPast) start.setDate(start.getDate() + 1);

  const days = [];
  const cursor = new Date(start);
  while (days.length < 6) {
    // Skip Sundays (day 0)
    if (cursor.getDay() !== 0) {
      const dayLabel = cursor.toLocaleDateString('en-US', { weekday: 'short' });
      const dateLabel = cursor.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dateKey = cursor.toISOString().split('T')[0];
      const isToday = cursor.getTime() === today.getTime();

      const slots = SLOT_TIMES.map((time, idx) => {
        const seed = cursor.getDate() * 100 + idx;
        const slotPast = isToday && parseSlotHour(time) <= centralHour;
        const available = !slotPast && seededRandom(seed) > 0.3;
        return { time, available };
      });

      days.push({
        dayLabel,
        dateLabel,
        dateKey,
        isPast: false,
        isToday,
        slots,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}
