/**
 * Middleware to handle 404 Not Found errors.
 *
 * This middleware is triggered when a requested resource cannot be found.
 * It responds with a 404 status code and a JSend fail response.
 *
 * @param _req - The incoming request object (unused).
 * @param res - The outgoing response object.
 */
import { Request, Response } from 'express';
import { jsendFail } from '../types/jsend';

export default function notFoundMiddleware(_req: Request, res: Response) {
    res.status(404).json(jsendFail({ endpoint: 'resource not found' }));
    return;
}
