import { customAlphabet } from 'nanoid';
import pino, { Logger } from 'pino';

// Initialize the logger with an empty name
let logger: Logger = pino({ name: '' });

/**
 * Initialize API Logger.
 * @param req - The request object.
 */
export const initializeLogger = (req: Request) => {
  // Generating a unique id for each request
  const id = customAlphabet('1234567890abcdef', 20)();

  // Creating a logger instance for each request
  logger = pino({
    name: `${req.method}:${req.url}`,
    // Writing logs to the browser console
    browser: {
      write: (o) => console.log(JSON.stringify(o)),
    },
  }).child({ requestId: id });

  return createChildLogger({ trace: 'initializeLogger' });
};

/**
 * Creates a child logger for better log management.
 * @param trace - The caller name.
 */
export const createChildLogger = ({ trace, ...params }: { trace: string; [key: string]: any }) => {
  const childLogger = logger.child({ trace, ...params });
  childLogger.info('Running');

  return childLogger;
};
