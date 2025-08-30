/**
 * Generates an error message based on the environment.
 *
 * In the development environment, it returns the error stack if available,
 * otherwise it returns the error message. In the production environment,
 * it returns a generic error message.
 *
 * @param env - The current environment (e.g., 'development' or 'production').
 * @param err - The error object containing the message and stack trace.
 * @returns The appropriate error message based on the environment.
 */
function errorMessage(
    env: string,
    err: Error,
): {
    message: string;
    stack?: string | null;
} {
    if (env === 'development') {
        return {
            message: err.message,
            stack: err.stack || null,
        };
    }
    return {
        message: 'internal server error',
        stack: null,
    };
}

export { errorMessage };
