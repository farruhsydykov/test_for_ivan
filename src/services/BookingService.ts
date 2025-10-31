import { IEventRepository } from '../repositories/interfaces/IEventRepository';
import { IBookingRepository } from '../repositories/interfaces/IBookingRepository';
import { IBookingService, BookingRequest, BookingResponse } from './interfaces/IBookingService';
import { Booking } from '../entities/Booking';

export class BookingService implements IBookingService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly bookingRepository: IBookingRepository
  ) {}

  /**
   * Reserve a seat for a user at an event
   * Implements business rules: event exists, no duplicate bookings, seat availability
   */
  async reserveSeat(request: BookingRequest): Promise<BookingResponse> {
    const { event_id, user_id } = request;

    try {
      // Business Rule 1: Event must exist
      const event = await this.eventRepository.findById(event_id);
      if (!event) {
        return this.createErrorResponse('Event not found');
      }

      // Business Rule 2: Prevent duplicate bookings
      const existingBooking = await this.bookingRepository.findByEventAndUser(event_id, user_id);
      if (existingBooking) {
        return this.createErrorResponse('User already has a booking for this event');
      }

      // Business Rule 3: Check seat availability
      const currentBookingCount = await this.bookingRepository.countByEventId(event_id);
      if (currentBookingCount >= event.totalSeats) {
        return this.createErrorResponse('No available seats for this event');
      }

      // Create booking if all business rules pass
      const booking = await this.bookingRepository.create({
        eventId: event_id,
        userId: user_id
      });

      return this.createSuccessResponse('Booking created successfully', booking);

    } catch (error: any) {
      // Handle database constraint violations gracefully
      if (this.isDuplicateBookingError(error)) {
        return this.createErrorResponse('User already has a booking for this event');
      }

      // Re-throw unexpected errors
      throw error;
    }
  }

  /**
   * Get all bookings for an event
   */
  async getEventBookings(eventId: number): Promise<Booking[]> {
    return this.bookingRepository.findByEventId(eventId);
  }

  /**
   * Get all bookings for a user
   */
  async getUserBookings(userId: string): Promise<Booking[]> {
    return this.bookingRepository.findByUserId(userId);
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: number): Promise<BookingResponse> {
    const booking = await this.bookingRepository.findById(bookingId);
    
    if (!booking) {
      return this.createErrorResponse('Booking not found');
    }

    const deleted = await this.bookingRepository.delete(bookingId);
    
    if (deleted) {
      return this.createSuccessResponse('Booking cancelled successfully');
    } else {
      return this.createErrorResponse('Failed to cancel booking');
    }
  }

  // Private helper methods for clean code
  private createErrorResponse(message: string): BookingResponse {
    return {
      success: false,
      message
    };
  }

  private createSuccessResponse(message: string, booking?: Booking): BookingResponse {
    return {
      success: true,
      message,
      booking
    };
  }

  private isDuplicateBookingError(error: any): boolean {
    return error.code === '23505'; // PostgreSQL unique constraint violation
  }
}