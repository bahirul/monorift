/**
 * Resolve path alias to the actual path in the project
 */
import path from 'path';

/**
 * Formats a path string by removing double slashes and joining the segments.
 *
 * @param pathStr - The path string to format.
 * @returns The formatted path string with double slashes removed.
 */
function formatPathAlias(pathStr: string): string {
    // remove double slashes
    const paths = pathStr.split('/').filter((p) => p != '');
    return paths.join('/');
}

/**
 * Default path aliases used for resolving paths in the project.
 */
const defaultAliases = {
    '@root': path.resolve(__dirname, '../../../../'),
    '@src': path.resolve(__dirname, '../../../../src'),
};

/**
 * Resolves a path alias to its actual path based on the provided aliases.
 *
 * @param pathStr - The path string to resolve.
 * @param aliases - A record of aliases to use for resolution. Defaults to `defaultAliases`.
 * @returns The resolved path string.
 */
function getAlias(
    pathStr: string,
    aliases: Record<string, string> = defaultAliases,
) {
    // match alias
    const pathFormatted = formatPathAlias(pathStr);
    for (const alias in aliases) {
        if (pathStr.startsWith(alias)) {
            return pathFormatted.replace(alias, aliases[alias]);
        }
    }

    // fallback to -> @root. example @unknown -> @root/unknown
    return path.resolve(aliases['@root'], pathFormatted.replace('@', ''));
}

export { formatPathAlias, getAlias };
