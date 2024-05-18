export class Event {
    id: number;
    name: string;
    startTime: Date;
    description: string;
}

export type EventDetails = {
  id: number
  name: string,
  startTime: Date,
  description: string,
  auditorium: Auditorium
  seatCategories: SeatCategory[]
}

export type Auditorium = {
  id: number
  image: string
  name: string,
  sectors: Sector[]
}

export type Sector = {
  id: number
  type: SeatType
  name: string,
  rows: Row[]
}

export type Row = {
  number: number,
  seats: Seat[]
}

export type Seat = {
  id: number
  row: number
  number: number
  sector: string
  label: string
  type: SeatType
  status: SeatStatus
  category: SeatCategory
}

export enum SeatType {
  SEATING='SEATING',
  STANDING='STANDING',
}

export type SeatCategory = {
  id: number
  name: string,
  price: number,
  color: string
}

export enum SeatStatus {
  OPEN='OPEN',
  PURCHASED='PURCHASED',
  RESERVED='RESERVED',
  CANCELED='CANCELED',
  ANOTHER_SELECTED='ANOTHER_SELECTED',
  SELECTED='SELECTED',
}
