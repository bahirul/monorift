/**
 * Unit tests for the Config Parser module.
 *
 * This file contains tests for various parsing utility functions, including:
 * - `parseBoolean`: Parses a boolean value from a string.
 * - `parseNumber`: Parses a number value from a string.
 * - `parseArray`: Parses an array of strings from a comma-separated string.
 * - `parseString`: Parses a string value with a default fallback.
 */

import { describe, expect, it } from 'vitest';
import {
    parseArray,
    parseBoolean,
    parseNumber,
    parseString,
} from './config.parser';

describe('Config Parser', () => {
    /**
     * Test case: Verifies the `parseBoolean` function parses boolean values correctly.
     */
    it('should parse boolean', () => {
        expect(parseBoolean(undefined, false)).toBe(false);
        expect(parseBoolean('true')).toBe(true);
    });

    /**
     * Test case: Verifies the `parseNumber` function parses numeric values correctly.
     */
    it('should parse number', () => {
        expect(parseNumber('123')).toBe(123);
        expect(parseNumber(undefined, 0)).toBe(0);
    });

    /**
     * Test case: Verifies the `parseArray` function parses arrays correctly.
     */
    it('should parse array', () => {
        expect(parseArray('a,b,c')).toEqual(['a', 'b', 'c']);
        expect(parseArray(undefined)).toEqual([]);
    });

    /**
     * Test case: Verifies the `parseString` function parses string values with default fallbacks correctly.
     */
    it('should parse string with default value', () => {
        expect(parseString(undefined, 'default')).toBe('default');
        expect(parseString('custom', 'default')).toBe('custom');
    });
});
