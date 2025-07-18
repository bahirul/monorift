import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

// define the structure of the application configuration
interface AppConfig {
    app: {
        id: string;
        env: string;
        debug: boolean;
        port: number;
        logLevel:
            | 'info'
            | 'debug'
            | 'warn'
            | 'error'
            | 'silly'
            | 'http'
            | 'verbose';
    };

    cors: {
        credentials: boolean; // enable credentials for cookies
        origin: boolean | string | string[]; // allow all origins or specific ones
    };

    minio: {
        endPoint: string;
        accessKey: string;
        secretKey: string;
        port: number;
        useSSL: boolean;
        pathStyle: boolean;
    };

    secureMode: boolean; // Enable secure mode for the application

    ipFilter: {
        allowList: string[]; // List of allowed IP addresses
    };
}

// get the configuration based on the environment
function getConfigByEnv(env: string): AppConfig {
    const defaultConfigPath = path.resolve(__dirname, '../../../config.yaml');
    const envConfigPath = path.resolve(
        __dirname,
        `../../../config.${env}.yaml`,
    );

    let configPath = defaultConfigPath;

    // Check for environment-specific config file
    if (env !== 'development' && fs.existsSync(envConfigPath)) {
        configPath = envConfigPath;
    } else if (env !== 'development') {
        console.warn(
            `⚠️ ${env} config file not found, falling back to default: ${envConfigPath}`,
        );
    }

    if (!fs.existsSync(configPath)) {
        console.error(`🔥 configuration file not found: ${configPath}`);
        process.exit(1);
    }

    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = parse(fileContents) as AppConfig;
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
