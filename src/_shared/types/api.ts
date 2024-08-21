import { NextRequest } from 'next/server';
import Stripe from 'stripe';

type ErrorTypes = 'ValidationError' | 'NotFoundError' | 'UnauthorizedError' | 'ServerError';

export class APIError extends Error {
  type: ErrorTypes;

  constructor({ message, type }: { message?: string; type: ErrorTypes }) {
    super(message);
    this.type = type;
  }
}

export type ApiRequestProps = {
  req: NextRequest;
  params?: any;
  stripeEvent: Stripe.Event;
};
