import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {
    parseArray,
    parseBoolean,
    parseNumber,
} from '../shared/utils/config.parser';

// define the structure of the application configuration
interface AppConfig {
    app: {
        id: string;
        env: string;
        debug: boolean;
        port: number;
        logLevel: string;
    };

    cors: {
        credentials: boolean; // enable credentials for cookies
        origin: boolean | string | string[]; // allow all origins or specific ones
    };
}

// get the configuration based on the environment
function getConfigByEnv(env: string): AppConfig {
    const defaultConfigPath = path.resolve(__dirname, '../../../.env');
    const envConfigPath = path.resolve(__dirname, `../../../${env}.env`);

    let configPath = defaultConfigPath;

    // Check for environment-specific config file
    if (fs.existsSync(envConfigPath)) {
        configPath = envConfigPath;
    } else {
        console.warn(
            `⚠️ ${env} config file not found, falling back to default: ${defaultConfigPath}`,
        );
    }

    if (!fs.existsSync(configPath)) {
        console.error(`🔥 configuration file not found: ${configPath}`);
        process.exit(1);
    }

    // load environment variables from .env file
    dotenv.config({ path: configPath });

    const config: AppConfig = {
        app: {
            id: process.env.APP_ID || 'my-app',
            env: process.env.NODE_ENV || 'development',
            debug: parseBoolean(process.env.APP_DEBUG),
            port: parseNumber(process.env.APP_PORT, 3000),
            logLevel: process.env.APP_LOG_LEVEL || 'info',
        },
        cors: {
            credentials: parseBoolean(process.env.CORS_CREDENTIALS),
            origin: parseArray(process.env.CORS_ORIGIN),
        },
    };

    return config;
}

// Use variable to hold the configuration, initialized to null
let config: AppConfig | null = null;

// Export the configuration function
export function loadConfig(): AppConfig {
    const env = process.env.NODE_ENV || 'development';

    // If config is already loaded, return it
    if (config) {
        return config;
    }

    try {
        // Load the configuration based on the environment
        config = getConfigByEnv(env);
        return config;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`🔥 failed to load configuration: ${error.message}`);
            process.exit(1);
        } else {
            throw new Error(`🔥 failed to load configuration: unknown error`);
        }
    }
}
