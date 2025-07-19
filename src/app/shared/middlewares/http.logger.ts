/**
 * Morgan HTTP request logger middleware for express
 */
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { loadConfig } from '../../config/app.config';
import { logger } from '../services/logger';

const appConfig = loadConfig();
const httpLoggerMiddleware = [
    morgan(':status :method - :url - :remote-addr - :response-time ms', {
        stream: {
            write: (message: string) => logger.http(`🌏 ${message.trim()}`),
        },
    }),
    function logRequestBody(req: Request, _res: Response, next: NextFunction) {
        if (appConfig.app.debug) {
            const shouldLog =
                req.method === 'POST' ||
                req.method === 'PUT' ||
                req.method === 'PATCH';

            if (shouldLog) {
                // debug log request body and other details
                logger.debug(
                    JSON.stringify(
                        {
                            method: req.method,
                            url: req.originalUrl,
                            body: req.body,
                            headers: req.headers,
                            params: req.params,
                            query: req.query,
                            remoteAddr: req.socket.remoteAddress,
                            remotePort: req.socket.remotePort,
                            userAgent: req.headers['user-agent'],
                            ip: req.ip,
                            protocol: req.protocol,
                            hostname: req.hostname,
                            secure: req.secure,
                            httpVersion: req.httpVersion,
                            httpVersionMajor: req.httpVersionMajor,
                            httpVersionMinor: req.httpVersionMinor,
                            baseUrl: req.baseUrl,
                        },
                        null,
                        2,
                    ),
                );
            }
        }
        next();
    },
];

export default httpLoggerMiddleware;
