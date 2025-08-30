/**
 * This middleware is used to catch malformed request errors like invalid JSON body request.
 */
import { NextFunction, Request, Response } from 'express';
import { jsendFail } from '../types/jsend';

export default function malformedMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
): void {
    /**
     * Handle known malformed request errors.
     */
    if ('status' in err && 'type' in err) {
        res.status(err.status as number).json(
            jsendFail({
                body: err.type,
            }),
        );
        return;
    }

    next(err); // if it's not a 400, let the default error handling do it.
}
