import { Event } from '../../entities/Event';

export interface IEventRepository {
  /**
   * Find an event by ID with optional relations
   */
  findById(id: number, includeBookings?: boolean): Promise<Event | null>;

  /**
   * Find all events
   */
  findAll(): Promise<Event[]>;

  /**
   * Create a new event
   */
  create(eventData: Partial<Event>): Promise<Event>;

  /**
   * Update an existing event
   */
  update(id: number, eventData: Partial<Event>): Promise<Event | null>;

  /**
   * Delete an event
   */
  delete(id: number): Promise<boolean>;

  /**
   * Check if an event exists
   */
  exists(id: number): Promise<boolean>;
}
