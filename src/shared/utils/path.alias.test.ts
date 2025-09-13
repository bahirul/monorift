/**
 * Unit tests for the Path Alias module.
 *
 * This file contains tests for the `formatPathAlias` and `getAlias` functions, which
 * are responsible for formatting path strings and resolving path aliases, respectively.
 */

import { describe, expect, it } from 'vitest';
import { formatPathAlias, getAlias } from './path.alias';

describe('Path Alias', () => {
    /**
     * Test case: Verifies that the `formatPathAlias` function formats paths correctly
     * by removing double slashes.
     */
    it('should format path correctly by remove double slashes', () => {
        const pathFormatted = formatPathAlias(
            '@src/app/shared/utils/path.alias//',
        );
        expect(pathFormatted).toBe('@src/app/shared/utils/path.alias');
    });

    /**
     * Test case: Verifies that the `getAlias` function resolves path aliases correctly
     * using a provided alias mapping.
     */
    it('should resolve path aliases correctly', () => {
        const mockAliases = {
            '@src': '/mnt/src',
            '@root': '/mnt',
        };

        const srcPath = getAlias(
            '@src/app/shared/utils/path.alias.ts',
            mockAliases,
        );

        expect(srcPath).toBe('/mnt/src/app/shared/utils/path.alias.ts');
    });

    /**
     * Test case: Verifies that the `getAlias` function falls back to the default alias
     * resolution when an alias is not found.
     */
    it('should resolve to fallback if @alias not found', () => {
        const mockAliases = {
            '@src': '/mnt/src',
            '@root': '/mnt',
        };

        const srcPath = getAlias('@shared/utils/path.alias.ts', mockAliases);

        expect(srcPath).toBe('/mnt/shared/utils/path.alias.ts');
    });
});
