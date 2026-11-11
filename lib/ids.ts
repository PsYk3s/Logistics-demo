let eventSeq = 1000;
let ticketSeq = 1839;
let driverSeq = 100;
let truckSeq = 100;

export function createEventId(): string {
  eventSeq += 1;
  return `EV-${eventSeq}`;
}

export function createTicketId(): string {
  ticketSeq += 1;
  return `TK-${ticketSeq}`;
}

export function createDriverId(): string {
  driverSeq += 1;
  return `DRV-${driverSeq}`;
}

export function createTruckId(): string {
  truckSeq += 1;
  return `TRK-${truckSeq}`;
}
