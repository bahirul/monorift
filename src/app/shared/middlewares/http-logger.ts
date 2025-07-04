/**
 * Morgan HTTP request logger middleware for express
 */
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { loadConfig } from '../../config/app.js';
import { logger } from '../utils/logger.js';

const appConfig = loadConfig();
const httpLoggerMiddleware = [
    morgan(':status :method - :url - :remote-addr - :response-time ms', {
        stream: {
            write: (message: string) => logger.http(`🌏 ${message.trim()}`),
        },
    }),
    function logRequestBody(req: Request, _res: Response, next: NextFunction) {
        if (appConfig.app.logLevel === 'debug') {
            const shouldLog =
                req.method === 'POST' ||
                req.method === 'PUT' ||
                req.method === 'PATCH';

            if (shouldLog) {
                logger.debug(
                    `📦 body request for ${req.method} ${req.originalUrl}\n` +
                        JSON.stringify(req.body, null, 2),
                );
            }
        }
        next();
    },
];

export default httpLoggerMiddleware;
