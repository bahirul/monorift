import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { getAlias } from './app/shared/utils/path-alias';

/**
 * Loads the environment variables from the appropriate .env file.
 * Priority:
 *  1. .env.{NODE_ENV}
 *  2. .env (fallback)
 */
export function loadEnv(): void {
    const NODE_ENV = process.env.NODE_ENV || 'development';
    const envFile = getAlias(`@root/.env.${NODE_ENV}`);

    if (existsSync(envFile)) {
        dotenv.config({ path: envFile });
        console.log(`✅ Loaded environment config from .env.${NODE_ENV}`);
    } else {
        const fallback = getAlias('@root/.env');
        dotenv.config({ path: fallback });
        console.warn('⚠️ Fallback: Loaded environment config from .env');
    }
}
