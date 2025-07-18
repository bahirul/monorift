import { Request, Response } from 'express';
import { jsendSuccess } from '../../../../shared/utils/jsend.js';

// GET /
export const getMainAction = async (_req: Request, res: Response) => {
    res.json(
        jsendSuccess({
            message: 'OK!',
        }),
    );
};
