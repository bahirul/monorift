import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {
    parseArray,
    parseBoolean,
    parseString,
} from '../shared/utils/config.parser';

/**
 * Loads environment variables from a `.env` file based on the specified environment.
 *
 * This function attempts to load environment variables from a file matching the
 * provided environment name (e.g., `.development.env`). If no matching file is found,
 * it falls back to `.env`. If neither file exists, the process exits with an error.
 *
 * @param env - The environment name (e.g., 'development', 'production'). Defaults to 'development'.
 */
function loadEnv(env = 'development') {
    // Load environment variables from .env files default fallback to .env
    const envFile = [`.${env}.env`, '.env'].find((file) =>
        fs.existsSync(path.resolve(process.cwd(), file)),
    );

    // Load the environment variables from the found file
    if (envFile) {
        dotenv.config({ path: path.resolve(process.cwd(), envFile) });
    } else {
        console.error(`🔥 no environment file found for: ${env}`);
        process.exit(1);
    }
}

/**
 * Represents the application configuration structure.
 */
interface Config {
    app: {
        /**
         * The application ID.
         */
        id: string;
        /**
         * The current environment (e.g., 'development', 'production', 'test).
         *
         * IMPORTANT: value read/injected to config from NODE_ENV not .env file
         */
        env: string;
        /**
         * The port number the application listens on.
         */
        port: number;
    };
    logger: {
        /**
         * The logging level (e.g., 'info', 'debug').
         */
        level: string;
    };
    cors: {
        /**
         * Whether credentials are allowed in CORS requests.
         */
        credentials: boolean;
        /**
         * The allowed origins for CORS requests.
         */
        origin: string[];
    };
}

/**
 * Creates the application configuration by parsing environment variables.
 *
 * @param overrides - Optional overrides for environment variables.
 * @returns The parsed application configuration.
 */
function createConfig(overrides: NodeJS.ProcessEnv = {}): Config {
    const NODE_ENV =
        overrides.NODE_ENV || process.env.NODE_ENV || 'development';

    // Load environment variables from .env files
    loadEnv(NODE_ENV);

    // Merge environment variables
    const env = {
        ...process.env,
        ...overrides,
    };

    return {
        app: {
            id: parseString(env.APP_ID, 'my-app'),
            /**
             * The application environment.
             * Read from NODE_ENV if not defined read from APP_ENV then fallback to 'development'
             */
            env: parseString(NODE_ENV || env.APP_ENV, 'development'),
            port: parseInt(env.APP_PORT || '50001'),
        },
        logger: {
            level: parseString(env.LOG_LEVEL, 'info'),
        },
        cors: {
            credentials: parseBoolean(env.CORS_CREDENTIALS, true),
            origin: parseArray(env.CORS_ORIGIN || '*'),
        },
    };
}

/**
 * App configuration loader.
 *
 * This function loads the application configuration, creating it if it doesn't already exist.
 */
let loadedConfig: Config;
const AppConfig = () => {
    if (!loadedConfig) {
        loadedConfig = createConfig();
    }
    return loadedConfig;
};

export { AppConfig };
