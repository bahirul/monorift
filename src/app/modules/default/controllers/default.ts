import { Request, Response } from 'express';
import { jsendSuccess } from '../../../shared/utils/jsend';

// GET /
export const getDefaultAction = async (req: Request, res: Response) => {
    res.json(
        jsendSuccess({
            message: 'hello world',
        }),
    );
};
