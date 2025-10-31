import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './Booking';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ name: 'total_seats', type: 'int' })
  totalSeats!: number;

  @OneToMany(() => Booking, booking => booking.event)
  bookings!: Booking[];
}