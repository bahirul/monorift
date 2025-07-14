import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { loadConfig } from './app/config/app.js';
import defaultRoutes from './app/modules/main/routes/main.js';
import httpLoggerMiddleware from './app/shared/middlewares/http.logger.js';
import notFoundMiddleware from './app/shared/middlewares/not.found.js';
import { logger } from './app/shared/utils/logger.js';

// create express app
const app = express();
const appConfig = loadConfig();
const port = appConfig.app.port || 50002;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(httpLoggerMiddleware);
app.use(
    cors({
        credentials: appConfig.cors.credentials || false,
        origin: appConfig.cors.origin || true,
    }),
);

// register module route here:
app.use('/', defaultRoutes);

// not found (404) middleware
app.use(notFoundMiddleware);

// error handler
app.use((err: Error, req: Request, res: Response) => {
    logger.error({
        action: 'errorHandler',
        message: (err as Error)?.message,
        stack: appConfig.app.debug ? (err as Error)?.stack : null,
    });

    res.status(500).json({
        status: 'error',
        message: 'internal server error',
    });
});

// start server
app.listen(port, () => {
    logger.info(`server listen on port http://localhost:${port}`);
});
