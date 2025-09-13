/**
 * Entry point for the HTTP server.
 *
 * This file initializes the HTTP server using the Express application and starts
 * listening on the configured port.
 */

import { AppConfig } from './config/app.config';
import app from './express';
import { logger } from './shared/services/logger';

/**
 * Load application configuration.
 */
const appConfig = AppConfig();
const port = appConfig.app.port || 50002;

/**
 * Start the HTTP server and listen on the specified port.
 */
app.listen(port, () => {
    logger.info(`server listen on port http://localhost:${port}`);
});
