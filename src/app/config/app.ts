import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the structure of the application configuration
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
        origin: boolean; // allow all origins
    };
}

// Function to get the configuration based on the environment
function getConfigByEnv(env: string): AppConfig {
    let configPath = path.resolve(__dirname, '../../../config.yaml');

    if (env === 'production') {
        configPath = path.resolve(__dirname, '../../../config.production.yaml');
        if (!fs.existsSync(configPath)) {
            console.warn(
                `⚠️ Production config file not found, falling back to default: ${configPath}`,
            );
            configPath = path.resolve(__dirname, '../../../config.yaml');
        }
    }

    if (env === 'development') {
        configPath = path.resolve(
            __dirname,
            '../../../config.development.yaml',
        );
        if (!fs.existsSync(configPath)) {
            console.warn(
                `⚠️ Development config file not found, falling back to default: ${configPath}`,
            );
            configPath = path.resolve(__dirname, '../../../config.yaml');
        }
    }

    if (!fs.existsSync(configPath)) {
        throw new Error(`🔥 Configuration file not found: ${configPath}`);
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
            throw new Error(
                `🔥 Failed to load configuration: ${error.message}`,
            );
        } else {
            throw new Error(`🔥 Failed to load configuration: Unknown error`);
        }
    }
}
