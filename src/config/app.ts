/**
 * App configuration
 */
import { loadEnv } from '../env';

loadEnv();

const appConfig = {
    // app configuration
    env: process.env.NODE_ENV || 'development',
    id: process.env.APP_ID || 'app',
    port: parseInt(process.env.APP_PORT || '3000'),

    // log configuration
    log: {
        level: process.env.LOG_LEVEL || 'http',
    },
};

export default appConfig;
