/**
 * Middleware to handle 404 error
 */
import { Request, Response } from 'express';
import { jsendFail } from '../utils/jsend.js';

export default function notFoundMiddleware(_req: Request, res: Response) {
    res.status(404).json(jsendFail('resource not found'));
    return;
}
