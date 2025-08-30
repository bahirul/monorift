import { Request, Response } from 'express';
import { jsendSuccess } from '../../../shared/types/jsend';

/**
 * Handles the main GET request.
 * @param _req - The HTTP request object.
 * @param res - The HTTP response object.
 */
export const getMainAction = async (_req: Request, res: Response) => {
    res.json(
        jsendSuccess({
            message: 'OK!',
        }),
    );
};
