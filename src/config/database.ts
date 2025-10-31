import { DataSource } from 'typeorm';
import { Event, Booking } from '../entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'booking_db',
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in development
  logging: process.env.NODE_ENV === 'development',
  entities: [Event, Booking],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});
