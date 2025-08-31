/**
 * Express application setup and configuration.
 *
 * This file initializes the Express application, applies middlewares, and sets up routes.
 */

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { AppConfig } from './app/config/app.config';
import defaultRoutes from './app/modules/main/routes/main.route';
import malformedMiddleware from './app/shared/middlewares/malformed';
import morganMiddleware from './app/shared/middlewares/morgan';
import notFoundMiddleware from './app/shared/middlewares/not.found';
import { logger } from './app/shared/services/logger';
import { jsendError } from './app/shared/types/jsend';

// create express app
const app = express();
const appConfig = AppConfig();

// middlewares
app.use(morganMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(appConfig.cors));
app.use(malformedMiddleware);

/**
 * Registers the default module routes.
 */
app.use('/', defaultRoutes);

/**
 * Middleware to handle 404 Not Found errors.
 */
app.use(notFoundMiddleware);

/**
 * Global error handler middleware.
 *
 * @param err - The error object.
 * @param _req - The incoming request object (unused).
 * @param res - The outgoing response object.
 */
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    // log error
    logger.log({
        level: 'error',
        context: req.path,
        message: JSON.stringify(err.stack || err.message),
    });

    // send error response to client
    res.status(500).json(
        jsendError(
            appConfig.app.env === 'development'
                ? err.message
                : 'internal server error',
            {
                data: appConfig.app.env === 'development' ? err.stack : null,
            },
        ),
    );
});

export default app;
