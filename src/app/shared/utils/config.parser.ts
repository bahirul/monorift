// parse boolean from string
function parseBoolean(value?: string, defaultVal = false): boolean {
    if (!value) return defaultVal;
    return ['true', '1', 'yes'].includes(value.toLowerCase());
}

// parse number from string
function parseNumber(value?: string, defaultVal = 0): number {
    return value ? Number(value) : defaultVal;
}

// parse array from comma-separated string
function parseArray(value?: string, separator = ','): string[] {
    if (!value) return [];
    return value
        .split(separator)
        .map((v) => v.trim())
        .filter(Boolean);
}

// parse string with trim
function parseString(value?: string, defaultVal = ''): string {
    return value?.trim() || defaultVal;
}

export { parseArray, parseBoolean, parseNumber, parseString };
