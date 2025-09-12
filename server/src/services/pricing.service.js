import dayjs from 'dayjs';

function daterange(start, end) {
  const arr = [];
  let cur = start.startOf('day');
  while (cur.isBefore(end)) {
    arr.push(cur.toDate());
    cur = cur.add(1, 'day');
  }
  return arr;
}

function dateInRange(date, spStart, spEnd) {
  return !(date < spStart || date > spEnd);
}

export const calculateTotalPrice = (hotel, startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (!start.isValid() || !end.isValid() || !end.isAfter(start)) {
    throw new Error('Invalid date range');
  }

  const days = daterange(start, end);
  let total = 0;

  for (const day of days) {
    let applied = null;
    for (const sp of hotel.specialPrices || []) {
      const spStart = dayjs(sp.startDate).startOf('day').toDate();
      const spEnd = dayjs(sp.endDate).startOf('day').toDate();
      if (dateInRange(day, spStart, spEnd)) {
        applied = sp.price;
        break;
      }
    }
    total += (applied != null ? applied : hotel.defaultPrice);
  }

  return total;
}

