import { NextFunction, Request, Response } from 'express';

/**
 * Wraps an async function in a try/catch block and passes any errors to the next middleware.
 * @param fn The async function to wrap.
 * @returns A middleware function.
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.log('asyncHandler caught an error:', err);
            next(err);
        }
    };
};
