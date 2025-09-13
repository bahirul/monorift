/**
 * Logger for the application
 */
import winston from 'winston';

/**
 * Creates a Winston logger instance.
 * @param level - The logging level.
 * @returns A Winston logger instance.
 */
const createLogger = (level: string, silent = false) => {
    const logger = winston.createLogger({
        level,
        silent,
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp(),
            winston.format.printf(formatLogMessage),
        ),
        transports: [new winston.transports.Console()],
    });

    return logger;
};

/**
 * Formats a log message for output.
 * @param info - The log information.
 * @returns The formatted log message.
 */
const formatLogMessage = (info: winston.Logform.TransformableInfo) => {
    const { timestamp, level, message, context } = info;
    return `${timestamp} [${level}] ${
        context ? `[${context}] ` : ''
    }${message}`;
};

export { createLogger, formatLogMessage };
