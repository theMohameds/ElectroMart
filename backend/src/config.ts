import * as dotenv from 'dotenv';
dotenv.config();


export const config = {
  taxRate: parseFloat(process.env.TAX_RATE ?? '1.25'),
  discountRate: parseFloat(process.env.DISCOUNT_RATE ?? '0.10'),
  port: parseInt(process.env.PORT ?? '3001'),

  featureUnfinishedEnabled: process.env.FEATURE_UNFINISHED_ENABLED === 'true',
};
