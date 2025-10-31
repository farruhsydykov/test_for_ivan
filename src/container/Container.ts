import { EventRepository, BookingRepository } from '../repositories';
import { BookingService } from '../services/BookingService';
import { IEventRepository, IBookingRepository } from '../repositories';
import { IBookingService } from '../services/interfaces/IBookingService';

/**
 * Simple dependency injection container
 * In a larger application, consider using a DI library like inversify or tsyringe
 */
export class Container {
  private static instance: Container;
  
  // Repositories
  private _eventRepository: IEventRepository;
  private _bookingRepository: IBookingRepository;
  
  // Services
  private _bookingService: IBookingService;

  private constructor() {
    // Initialize repositories
    this._eventRepository = new EventRepository();
    this._bookingRepository = new BookingRepository();
    
    // Initialize services with injected dependencies
    this._bookingService = new BookingService(
      this._eventRepository,
      this._bookingRepository
    );
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  // Repository getters
  public get eventRepository(): IEventRepository {
    return this._eventRepository;
  }

  public get bookingRepository(): IBookingRepository {
    return this._bookingRepository;
  }

  // Service getters
  public get bookingService(): IBookingService {
    return this._bookingService;
  }
}
