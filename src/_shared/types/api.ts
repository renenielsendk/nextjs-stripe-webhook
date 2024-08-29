import { NextRequest } from 'next/server';
import Stripe from 'stripe';

type ErrorTypes = 'ValidationError' | 'NotFoundError' | 'UnauthorizedError' | 'ServerError';

// Custom error class to handle API-specific errors
export class APIError extends Error {
  type: ErrorTypes;

  constructor({ message, type }: { message?: string; type: ErrorTypes }) {
    super(message);
    this.type = type;
  }
}

// Defines the properties available in an API request, allowing for extension with additional properties
export type ApiRequestProps = {
  req: NextRequest;  // The incoming HTTP request object from Next.js
  params?: any;      // Optional parameters that may include query parameters, route parameters, etc.
  stripeEvent: Stripe.Event; // The Stripe event object, if applicable
};