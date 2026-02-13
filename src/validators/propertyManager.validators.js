// src/validators/propertyManager.validators.js
import { z } from 'zod';

export const propertyValidator = {
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string().optional(),
    address: z.string({ required_error: 'Address is required' }),
    city: z.string({ required_error: 'City is required' }),
    state: z.string({ required_error: 'State is required' }),
    pricingUnit: z.enum(['month', 'night', 'day', 'event'], {
      required_error: 'Pricing unit is required',
    }),
    basePrice: z.number({ required_error: 'Base price is required' }),
    categoryId: z.string().optional(),
    managerId: z.string({ required_error: 'Manager ID is required' }),
  }),
};
