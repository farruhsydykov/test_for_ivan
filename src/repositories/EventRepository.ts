import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Event } from '../entities/Event';
import { IEventRepository } from './interfaces/IEventRepository';

export class EventRepository implements IEventRepository {
  private repository: Repository<Event>;

  constructor() {
    this.repository = AppDataSource.getRepository(Event);
  }

  /**
   * Find an event by ID with optional relations
   */
  async findById(id: number, includeBookings: boolean = false): Promise<Event | null> {
    const relations = includeBookings ? ['bookings'] : [];
    
    return this.repository.findOne({
      where: { id },
      relations
    });
  }

  /**
   * Find all events
   */
  async findAll(): Promise<Event[]> {
    return this.repository.find({
      order: { id: 'ASC' }
    });
  }

  /**
   * Create a new event
   */
  async create(eventData: Partial<Event>): Promise<Event> {
    const event = this.repository.create(eventData);
    return this.repository.save(event);
  }

  /**
   * Update an existing event
   */
  async update(id: number, eventData: Partial<Event>): Promise<Event | null> {
    await this.repository.update(id, eventData);
    return this.findById(id);
  }

  /**
   * Delete an event
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Check if an event exists
   */
  async exists(id: number): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }
}
