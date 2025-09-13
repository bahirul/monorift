import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { logger } from '../services/logger';

/**
 * Morgan middleware for logging HTTP requests.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function.
 */
export default function morganMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    morgan('combined', {
        stream: {
            write: (message: string) => {
                logger.info(message.trim());
            },
        },
    })(req, res, next);
}
