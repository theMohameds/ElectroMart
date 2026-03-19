import * as dotenv from 'dotenv';
dotenv.config();

// Exercise 2: Externalized Configuration
//
// All previously hardcoded values are now read from environment variables.
// Copy .env.example to .env (backend/) and adjust the values there.
// When running with Docker Compose you can pass them via the `environment:`
// section or an env_file — no code change required.

export const config = {
  taxRate: parseFloat(process.env.TAX_RATE ?? '1.25'),
  discountRate: parseFloat(process.env.DISCOUNT_RATE ?? '0.10'),
  port: parseInt(process.env.PORT ?? '3001'),
};
