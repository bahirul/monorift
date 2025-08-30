/**
 * Parses a boolean value from a string.
 *
 * @param value - The string to parse.
 * @param defaultVal - The default value to return if the string is undefined or empty.
 * @returns `true` if the string represents a truthy value (e.g., 'true', '1', 'yes'), otherwise `false`.
 */
function parseBoolean(value?: string, defaultVal = false): boolean {
    if (!value) return defaultVal;
    return ['true', '1', 'yes'].includes(value.trim().toLowerCase());
}

/**
 * Parses a number from a string.
 *
 * @param value - The string to parse.
 * @param defaultVal - The default value to return if the string is undefined or empty.
 * @returns The parsed number, or the default value if parsing fails.
 */
function parseNumber(value?: string, defaultVal = 0): number {
    return value ? Number(value.trim()) : defaultVal;
}

/**
 * Parses an array of strings from a comma-separated string.
 *
 * @param value - The comma-separated string to parse.
 * @param separator - The character used to separate values in the string. Defaults to ','.
 * @returns An array of trimmed, non-empty strings.
 */
function parseArray(value?: string, separator = ','): string[] {
    if (!value) return [];
    return value
        .split(separator)
        .map((v) => v.trim())
        .filter(Boolean);
}

/**
 * Parses a string and trims whitespace.
 *
 * @param value - The string to parse.
 * @param defaultVal - The default value to return if the string is undefined or empty.
 * @returns The trimmed string, or the default value if the string is undefined or empty.
 */
function parseString(value?: string, defaultVal = ''): string {
    return value?.trim() || defaultVal;
}

export { parseArray, parseBoolean, parseNumber, parseString };
