import { createChildLogger } from '@/libs/logger';
import { CustomAPIError } from '@/types/api';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { STRIPE_CONFIG } from 'src/config/stripe';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_CONFIG.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
  typescript: true,
});

export const validateRequest = async (req: NextRequest): Promise<Stripe.Event> => {
  const logger = createChildLogger({ trace: 'validateRequest' });

  const signature = headers().get('stripe-signature');
  if (!signature) {
    logger.error('Missing stripe-signature');
    throw new CustomAPIError({
      type: 'ValidationError',
      message: 'Missing stripe-signature',
    });
  }

  if (!STRIPE_CONFIG.STRIPE_WEBHOOK_SECRET) {
    logger.error('Missing STRIPE_WEBHOOK_SECRET');
    throw new CustomAPIError({
      type: 'ValidationError',
      message: 'Missing STRIPE_WEBHOOK_SECRET',
    });
  }

  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_CONFIG.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error(`Webhook signature verification failed. ${err.message}`);
    throw new CustomAPIError({
      type: 'ValidationError',
      message: 'Webhook signature verification failed.',
    });
  }

  return event;
};
