import { Router } from 'express';
import bookingsRouter from './bookings';

const router = Router();

router.use('/bookings', bookingsRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Event Booking API'
  });
});

export default router;
