/**
 * Logger for the application
 */
import winston from 'winston';
import { getAppConfig } from '../../../config/app';
import { getAlias } from './path-alias';

const { combine, timestamp, printf } = winston.format;
const timestampFormat = 'DD/MMM/YYYY HH:mm:ss';
const appConfig = getAppConfig();

// Winston colorize
winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'white',
});

export const logger = winston.createLogger({
    level: appConfig.log.level,
    transports: [
        new winston.transports.File({
            filename: getAlias('@logs/error.log'),
            level: 'error',
            format: combine(
                winston.format.colorize(),
                timestamp({ format: timestampFormat }),
                printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}] ${message}`;
                }),
            ),
        }),
        new winston.transports.File({
            filename: getAlias('@logs/app.log'),
            format: combine(
                winston.format.colorize(),
                timestamp({ format: timestampFormat }),
                printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}] ${message}`;
                }),
            ),
        }),
        new winston.transports.Console({
            format: combine(
                timestamp({ format: timestampFormat }),
                printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}] ${message}`;
                }),
            ),
        }),
    ],
});
