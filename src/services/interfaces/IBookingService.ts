import { Booking } from '../../entities/Booking';

export interface BookingRequest {
  event_id: number;
  user_id: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: Booking;
}

export interface IBookingService {
  /**
   * Reserve a seat for a user at an event
   */
  reserveSeat(request: BookingRequest): Promise<BookingResponse>;

  /**
   * Get all bookings for an event
   */
  getEventBookings(eventId: number): Promise<Booking[]>;

  /**
   * Get all bookings for a user
   */
  getUserBookings(userId: string): Promise<Booking[]>;

  /**
   * Cancel a booking
   */
  cancelBooking(bookingId: number): Promise<BookingResponse>;
}
