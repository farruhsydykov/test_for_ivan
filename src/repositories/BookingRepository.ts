import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Booking } from '../entities/Booking';
import { IBookingRepository } from './interfaces/IBookingRepository';

export class BookingRepository implements IBookingRepository {
  private repository: Repository<Booking>;

  constructor() {
    this.repository = AppDataSource.getRepository(Booking);
  }

  /**
   * Find a booking by ID
   */
  async findById(id: number): Promise<Booking | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['event']
    });
  }

  /**
   * Find a booking by event ID and user ID
   */
  async findByEventAndUser(eventId: number, userId: string): Promise<Booking | null> {
    return this.repository.findOne({
      where: {
        eventId,
        userId
      }
    });
  }

  /**
   * Find all bookings for a specific event
   */
  async findByEventId(eventId: number): Promise<Booking[]> {
    return this.repository.find({
      where: { eventId },
      relations: ['event'],
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Find all bookings for a specific user
   */
  async findByUserId(userId: string): Promise<Booking[]> {
    return this.repository.find({
      where: { userId },
      relations: ['event'],
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Count total bookings for an event
   */
  async countByEventId(eventId: number): Promise<number> {
    return this.repository.count({
      where: { eventId }
    });
  }

  /**
   * Create a new booking
   */
  async create(bookingData: Partial<Booking>): Promise<Booking> {
    const booking = this.repository.create(bookingData);
    return this.repository.save(booking);
  }

  /**
   * Delete a booking
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Check if a booking exists for event and user
   */
  async existsForEventAndUser(eventId: number, userId: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        eventId,
        userId
      }
    });
    return count > 0;
  }
}
