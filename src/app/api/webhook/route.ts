import { NextResponse } from 'next/server';
import { paymentIntentSucceeded } from './_services/payment-intent-succeeded';
import { apiHandler } from '@/libs/api';
import { ApiRequestProps } from '@/types/api';
import { accountUpdated } from './_services/account-updated';

// Routes is wrapped with the apiHandler to handle the logic around error handling, request validation, etc.
export const POST = apiHandler(async ({ req, params, stripeEvent }: ApiRequestProps) => {
  // Example implementations of different Stripe events
  // Payment link success
  if (stripeEvent.type === 'payment_intent.succeeded') {
    paymentIntentSucceeded({
      event: stripeEvent,
    });
  }
  // Connect account updated
  else if (stripeEvent.type === 'account.updated') {
    accountUpdated({
      event: stripeEvent,
    });
  }
  // Implement other event types here

  return NextResponse.json({}, { status: 200 });
});
