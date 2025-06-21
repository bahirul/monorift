/**
 * main module routes definition
 */
import { Router } from 'express';
import { getDefaultAction } from '../controllers/default';

// Create a new router
const defaultRoutes = Router();

// GET /
defaultRoutes.get('/', getDefaultAction);

export default defaultRoutes;
