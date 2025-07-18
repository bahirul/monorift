import { Router } from 'express';
import { getMainAction } from '../controllers/main.js';

// main routes
const mainRoutes = Router();

// register main routes
mainRoutes.get('/', getMainAction);

export default mainRoutes;
