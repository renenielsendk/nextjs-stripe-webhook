import { NextResponse } from 'next/server';
import { apiHandler } from '@/libs/api';
import { ApiRequestProps } from '@/types/api';
import { paymentIntentSucceeded } from './_services/payment-intent-succeeded';
import { accountUpdated } from './_services/account-updated';

// The route is wrapped with apiHandler to manage error handling, request validation, and other middleware logic.
export const POST = apiHandler(async ({ req, params, stripeEvent }: ApiRequestProps) => {
  // 'req' can be used for extracting headers, cookies, and other request-level data.
  // 'params' can be used for extracting query parameters, route parameters, etc.
  // Example: const { routeId } = params;

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

  // Return a JSON response with a 200 status code upon successful execution of the logic
  return NextResponse.json({}, { status: 200 });
});
