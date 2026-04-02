function getDateString(daysFromToday) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().slice(0, 10);
}

const MOCK_BOOKINGS = [
  { id: 'BK-001', client: 'Marcus T.', service: 'The Classic Cut', barber: 'Marcus Cole', date: getDateString(0), time: '10:00 AM', status: 'confirmed', email: 'marcus.t@email.com', phone: '(512) 555-0112' },
  { id: 'BK-002', client: 'James R.', service: 'The Full Service', barber: 'James Rivera', date: getDateString(0), time: '10:30 AM', status: 'confirmed', email: 'james.r@email.com', phone: '(512) 555-0134' },
  { id: 'BK-003', client: 'David K.', service: 'The Clean Shave', barber: 'Deon Washington', date: getDateString(0), time: '11:00 AM', status: 'pending', email: 'david.k@email.com', phone: '(512) 555-0156' },
  { id: 'BK-004', client: 'Chris M.', service: 'The Full Service', barber: 'Marcus Cole', date: getDateString(0), time: '1:00 PM', status: 'confirmed', email: 'chris.m@email.com', phone: '(512) 555-0178' },
  { id: 'BK-005', client: 'Alex P.', service: 'The Classic Cut', barber: 'James Rivera', date: getDateString(0), time: '2:00 PM', status: 'cancelled', email: 'alex.p@email.com', phone: '(512) 555-0190' },
  { id: 'BK-006', client: 'Jordan L.', service: 'The Junior Cut', barber: 'Deon Washington', date: getDateString(1), time: '9:00 AM', status: 'confirmed', email: 'jordan.l@email.com', phone: '(512) 555-0201' },
  { id: 'BK-007', client: 'Ryan W.', service: 'The Classic Cut', barber: 'Marcus Cole', date: getDateString(-1), time: '3:00 PM', status: 'completed', email: 'ryan.w@email.com', phone: '(512) 555-0223' },
  { id: 'BK-008', client: 'Tyler S.', service: 'The Full Service', barber: 'James Rivera', date: getDateString(-1), time: '11:30 AM', status: 'completed', email: 'tyler.s@email.com', phone: '(512) 555-0245' },
];

export default MOCK_BOOKINGS;
