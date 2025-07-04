/**
 * main module routes definition
 */
import { Router } from 'express';
import { getMainAction } from '../controllers/main.js';

// Create a new router
const mainRoutes = Router();

// GET /
mainRoutes.get('/', getMainAction);

export default mainRoutes;
