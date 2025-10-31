import { Booking } from '../../entities/Booking';

export interface IBookingRepository {
  /**
   * Find a booking by ID
   */
  findById(id: number): Promise<Booking | null>;

  /**
   * Find a booking by event ID and user ID
   */
  findByEventAndUser(eventId: number, userId: string): Promise<Booking | null>;

  /**
   * Find all bookings for a specific event
   */
  findByEventId(eventId: number): Promise<Booking[]>;

  /**
   * Find all bookings for a specific user
   */
  findByUserId(userId: string): Promise<Booking[]>;

  /**
   * Count total bookings for an event
   */
  countByEventId(eventId: number): Promise<number>;

  /**
   * Create a new booking
   */
  create(bookingData: Partial<Booking>): Promise<Booking>;

  /**
   * Delete a booking
   */
  delete(id: number): Promise<boolean>;

  /**
   * Check if a booking exists for event and user
   */
  existsForEventAndUser(eventId: number, userId: string): Promise<boolean>;
}
