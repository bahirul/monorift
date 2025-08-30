/**
 * Unit tests for the Logger Factory module.
 *
 * This file contains tests for the `createLogger` function, which is responsible
 * for creating and configuring a Winston logger instance.
 */

import { describe, expect, it } from 'vitest';
import winston from 'winston';
import { createLogger, formatLogMessage } from './logger.factory';

/**
 * Test suite for the Logger Factory.
 */
describe('Logger Factory', () => {
    /**
     * Test case: Verifies that the `createLogger` function creates a valid
     * instance of a Winston logger.
     */
    it('should create a logger instance', () => {
        const logger = createLogger('info');
        expect(logger).toBeInstanceOf(winston.Logger);
    });

    /**
     * Test case: Verifies that the `formatLogMessage` function formats log messages correctly.
     */
    it('should format the log message correctly', () => {
        const date = new Date().toISOString();
        const formatMessage = formatLogMessage({
            timestamp: date,
            level: 'info',
            message: 'Test log message',
        });

        expect(formatMessage).toMatch(`${date} [info]: Test log message`);
    });
});
