import { AppConfig } from '../../config/app.config';
import { createLogger } from './logger.factory';

/**
 * Create a logger instance with the specified configuration.
 */
const logger = createLogger(AppConfig().logger.level);
export { logger };
