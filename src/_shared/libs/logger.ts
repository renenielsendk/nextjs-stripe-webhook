import { customAlphabet } from 'nanoid';
import pino, { Logger } from 'pino';

// Initialize the logger with an empty name, which will be customized per request
let logger: Logger = pino({ name: '' });

/**
 * Initializes the API logger for the incoming request.
 * This function sets up a unique logger instance for each request, 
 * allowing for detailed tracking and logging of individual request lifecycles.
 *
 * @param req - The incoming HTTP request object.
 * @returns The initialized child logger.
 */
export const initializeLogger = (req: Request) => {
  // Generate a unique ID for each request to track it across logs
  const id = customAlphabet('1234567890abcdef', 20)();

  // Create a logger instance specific to this request, including method and URL in the name
  logger = pino({
    name: `${req.method}:${req.url}`,
    // Configure logging output to the browser console (for debugging in client-side environments)
    browser: {
      write: (o) => console.log(JSON.stringify(o)),
    },
  }).child({ requestId: id });

  // Return a child logger with additional trace information for better log management
  return createChildLogger({ trace: 'initializeLogger' });
};

/**
 * Creates a child logger for more granular log management within a specific scope or function.
 * This is particularly useful for tracing the flow within individual parts of the application.
 *
 * @param trace - The name of the caller or the current trace context.
 * @param params - Additional parameters to include in the child logger's context.
 * @returns The created child logger.
 */
export const createChildLogger = ({ trace, ...params }: { trace: string;[key: string]: any }) => {
  // Create a child logger with the provided trace context and any additional parameters
  const childLogger = logger.child({ trace, ...params });

  // Log an initial message indicating that the child logger has been activated
  childLogger.info('Running');

  return childLogger;
};