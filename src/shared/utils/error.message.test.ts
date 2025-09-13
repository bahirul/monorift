/**
 * Unit tests for the `errorMessage` utility function.
 *
 * This file contains tests to verify the behavior of the `errorMessage` function
 * in different environments (development and production) and with various error scenarios.
 */

import { describe, expect, it } from 'vitest';
import { errorMessage } from './error.message';

describe('errorMessage', () => {
    /**
     * Test case: Verifies that the `errorMessage` function returns the error stack
     * in the development environment when the stack is available.
     */
    it('should return the error stack in development', () => {
        const env = 'development';
        const error = new Error('Test error');
        error.stack =
            'Error: Test error\n    at Object.<anonymous> (test.js:1:1)';
        const result = errorMessage(env, error);
        expect(result).toEqual({
            message: 'Test error',
            stack: 'Error: Test error\n    at Object.<anonymous> (test.js:1:1)',
        });
    });

    /**
     * Test case: Verifies that the `errorMessage` function returns only the error message
     * in the development environment when the stack is not available.
     */
    it('should return the error message in development without stack', () => {
        const env = 'development';
        const error = new Error('Test error');
        error.stack = undefined;
        const result = errorMessage(env, error);
        expect(result).toEqual({
            message: 'Test error',
            stack: null,
        });
    });

    /**
     * Test case: Verifies that the `errorMessage` function returns a generic error message
     * in the production environment.
     */
    it('should return a generic error message in production', () => {
        const env = 'production';
        const error = new Error('Test error');
        const result = errorMessage(env, error);
        expect(result).toEqual({
            message: 'internal server error',
            stack: null,
        });
    });
});
