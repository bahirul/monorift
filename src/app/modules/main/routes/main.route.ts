import { Router } from 'express';
import { asyncHandler } from '../../../shared/middlewares/async.handler';
import { getMainAction } from '../controllers/main.controller';

// main routes
const mainRoutes = Router();

// register main routes
mainRoutes.get('/', asyncHandler(getMainAction));

export default mainRoutes;
