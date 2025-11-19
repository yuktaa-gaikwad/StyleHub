-- Add payment method column to orders table
ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'upi';
ALTER TABLE orders ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN stripe_session_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN shipping_address TEXT;
ALTER TABLE orders ADD COLUMN phone_number VARCHAR(20);

-- Create index for faster lookups
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_stripe_session_id ON orders(stripe_session_id);
