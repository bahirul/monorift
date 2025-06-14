import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import defaultRoutes from './app/modules/default/routes/default';
import httpLoggerMiddleware from './app/shared/middlewares/http-logger';
import notFoundMiddleware from './app/shared/middlewares/not-found';
import { logger } from './app/shared/utils/logger';
import appConfig from './config/app';

// create express app
const app = express();
const port = appConfig.port;

// middlewares
app.use(express.json());
app.use(helmet());
app.use(httpLoggerMiddleware);
app.use(
    cors({
        credentials: true, // enable credentials for cookies
        origin: true, // allow all origins
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
        stack: appConfig.env === 'development' ? (err as Error)?.stack : null,
    });

    res.status(500).json({
        status: 'error',
        message: 'internal server error',
    });
});

// start server
app.listen(port, () => {
    logger.info(`✅ server listen on port ${port}`);
});
