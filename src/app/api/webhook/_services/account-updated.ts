import { createChildLogger } from '@/libs/logger';
import Stripe from 'stripe';

type Props = {
  event: Stripe.Event;
};

/**
 * Handles the `account.updated` event from Stripe.
 *
 * @param {Stripe.Event} event - The Stripe event object representing the account updated event.
 * @returns {Promise<void>} - A promise that resolves when the process is complete.
 */
export const accountUpdated = async ({ event }: Props): Promise<void> => {
  const logger = createChildLogger({ trace: 'accountUpdated' });

  // Cast the event data to the specific type for account updates.
  const data = event.data as Stripe.AccountUpdatedEvent.Data;

  // Implement logic to handle Stripe Connect account updates.
  // Example implementation is provided below based on another project:

  // Check if the account is present in the event; log and return if missing.
  // if (!event.account) {
  //   logger.info('No account found in event');
  //   return;
  // }
  // Check if the account is enabled for charges and payouts; log and return if not.
  // else if (!data.object.charges_enabled || !data.object.payouts_enabled) {
  //   logger.info('Account is not enabled for charges or payouts');
  //   return;
  // }

  // Look up the account in the database using the Stripe connect account ID.
  // logger.info({ accountId: event.account }, 'Found accountId in event');
  // const account = await dbClient.account.findFirst({
  //   where: { connectAccountId: event.account },
  // });

  // If the account is not found in the database, log and return.
  // if (!account) {
  //   logger.info('No connected account found');
  //   return;
  // }
  // If the account is already verified, log and return.
  // else if (account.connectStatus === 'verified') {
  //   logger.info('Account already marked as verified');
  //   return;
  // }

  // Update the account status to 'verified' in the database.
  // await dbClient.account.update({
  //   where: { connectAccountId: event.account },
  //   data: { connectStatus: 'verified' },
  // });
};
