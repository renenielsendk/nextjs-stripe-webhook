import { NextRequest, NextResponse } from 'next/server';
import { ApiRequestProps, APIError } from '@/types/api';
import { initializeLogger } from './logger';
import { validateRequest } from './stripe';

export const apiHandler = (handler: ({ req, params }: ApiRequestProps) => Promise<any>) => {
  return async function (req: NextRequest, { params }: any) {
    // Initialize logger for API request
    const logger = initializeLogger(req);

    try {
      // Validate the Stripe event
      const stripeEvent = await validateRequest(req);

      // Execute the handler function for the API route
      const response = await handler({ req, params, stripeEvent });

      // Log the end of the API request
      logger.info('Request ended');

      // Return the response
      return response;
    } catch (error: any) {
      // Log the error
      logger.error('error', error);

      // Handle custom API errors
      if (error instanceof APIError) {
        switch (error.type) {
          case 'ValidationError': {
            return NextResponse.json({ message: error.message || 'ValidationError' }, { status: 400 });
          }
          case 'UnauthorizedError': {
            return NextResponse.json({ message: error.message || 'UnauthorizedError' }, { status: 401 });
          }
          case 'NotFoundError': {
            return NextResponse.json({ message: error.message || 'NotFoundError' }, { status: 404 });
          }
          default: {
            // We never want to return the error message to the client
            return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
          }
        }
      } else {
        // Return a generic server error if the error is not a custom API error
        return NextResponse.json({ message: 'ServerError' }, { status: 500 });
      }
    }
  };
};
