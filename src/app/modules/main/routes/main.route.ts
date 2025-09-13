import { Router } from 'express';
import { asyncHandler } from '../../../shared/middlewares/async.handler';
import { getMainHandler } from '../handlers/main.handler';

// main routes
const mainRoutes = Router();

// register main routes
mainRoutes.get('/', asyncHandler(getMainHandler));

export default mainRoutes;
