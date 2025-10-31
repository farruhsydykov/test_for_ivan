import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Event } from './Event';

@Entity('bookings')
@Index(['eventId', 'userId'], { unique: true }) // Prevent duplicate bookings
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'event_id', type: 'int' })
  eventId!: number;

  @Column({ name: 'user_id', type: 'varchar', length: 255 })
  userId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Event, event => event.bookings)
  @JoinColumn({ name: 'event_id' })
  event!: Event;
}
