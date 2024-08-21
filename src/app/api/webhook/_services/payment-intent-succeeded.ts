import { createChildLogger } from '@/libs/logger';
import Stripe from 'stripe';

type Props = {
  event: Stripe.Event;
};

/**
 * Handles the `payment_succeeded` event from Stripe.
 * @param {Stripe.Event} event - The Stripe event object representing the payment succeeded event.
 * @returns {Promise<void>} - A promise that resolves when the process is complete.
 */
export const paymentIntentSucceeded = async ({ event }: Props): Promise<void> => {
  const logger = createChildLogger({ trace: 'paymentIntentSucceeded' });

  // Stripe uses dynamic types based on event type, so we need to cast the data to the correct type for this function
  const data = event.data as Stripe.PaymentIntentSucceededEvent.Data;

  // Implement the logic to handle the payment completed event.
  // Example implementation is provided below based on another project:

  // Retrieve the order ID from the event metadata, added during the checkout process.
  // if (!data.object.metadata?.order_id) {
  //   logger.error('order_id missing in metadata');
  //   throw new APIError({ type: 'NotFoundError' });
  // }

  // Look up the order in the database using the retrieved order ID.
  // const orderId = data.object.metadata.order_id;
  // logger.info({ orderId }, 'order_id found in metadata');
  // const order = await dbClient.orders.findUnique({
  //   where: { id: orderId },
  // }).catch(() => {
  //   throw new APIError({ type: 'NotFoundError' });
  // });

  // If the order is not found, log the information and throw an error.
  // if (!order) {
  //   logger.info({ orderId }, 'Order not found');
  //   throw new APIError({ type: 'NotFoundError' });
  // }

  // Ensure idempotency by checking if the order is already completed; log and return if true.
  // if (order.status === 'completed') {
  //   logger.info({ orderId }, 'Order already completed, returning');
  //   return;
  // }

  // Update the order status to 'completed' and enroll the user in the course.
  // await Promise.all([
  //   dbClient.order.update({
  //     where: { id: orderId },
  //     data: {
  //       payment: JSON.parse(JSON.stringify(data.object)),
  //       status: 'completed',
  //     },
  //   }),
  //   dbClient.enrollment.create({
  //     data: {
  //       userId: order.userId,
  //       orderId: order.id,
  //       active: true,
  //     },
  //   }),
  // ]);
};
