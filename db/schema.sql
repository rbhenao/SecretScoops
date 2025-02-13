CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('credit', 'paypal')) NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Processing' CHECK (status IN ('Processing', 'Preparing', 'Out for Delivery', 'Delivered')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);