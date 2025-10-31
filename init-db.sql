-- Database initialization script
-- This will create tables and sample data when PostgreSQL container starts

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    total_seats INTEGER NOT NULL
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    UNIQUE(event_id, user_id)
);

-- Insert sample events
INSERT INTO events (name, total_seats) VALUES 
('Tech Conference 2024', 100),
('Music Festival', 500),
('Workshop: Node.js Basics', 30)
ON CONFLICT DO NOTHING;
