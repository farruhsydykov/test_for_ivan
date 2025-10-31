import { Router, Request, Response } from 'express';
import { BookingRequest } from '../services/interfaces/IBookingService';
import { Container } from '../container/Container';

const router = Router();

// Get service from dependency injection container
const container = Container.getInstance();
const bookingService = container.bookingService;

/**
 * Reserve a seat for an event
 * POST /api/bookings/reserve
 */
router.post('/reserve', async (req: Request, res: Response) => {
  try {
    const { event_id, user_id }: BookingRequest = req.body;
    // Validate request body
    if (!event_id || !user_id) {
      return res.status(400).json({
        success: false,
        message: 'event_id and user_id are required'
      });
    }

    if (typeof event_id !== 'number' || typeof user_id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'event_id must be a number and user_id must be a string'
      });
    }
    const result = await bookingService.reserveSeat({ event_id, user_id });

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {
    console.error('Error reserving seat:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * Get bookings for an event
 * GET /api/bookings/event/:eventId
 */
router.get('/event/:eventId', async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.eventId);
    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID'
      });
    }
    const bookings = await bookingService.getEventBookings(eventId);

    return res.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error('Error getting event bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * Get bookings for a user
 * GET /api/bookings/user/:userId
 */
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const bookings = await bookingService.getUserBookings(userId);

    return res.json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error('Error getting user bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
