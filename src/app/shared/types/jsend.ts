/**
 * Represents the possible statuses in a JSend response.
 * - `success`: Indicates the request was successful.
 * - `fail`: Indicates the request failed due to client-side issues.
 * - `error`: Indicates the request failed due to server-side issues.
 */
type JSendStatus = 'success' | 'fail' | 'error';

/**
 * Base structure for all JSend responses.
 */
interface JSendBase {
    /**
     * The status of the response.
     */
    status: JSendStatus;
}

/**
 * Represents a successful JSend response.
 * @template T The type of the data payload.
 */
export interface JSendSuccessResponse<T> extends JSendBase {
    status: 'success';
    /**
     * The data payload of the response.
     */
    data: T;
}

/**
 * Represents a failed JSend response.
 * @template T The type of the data payload.
 */
export interface JSendFailResponse<T> extends JSendBase {
    status: 'fail';
    /**
     * The data payload of the response.
     */
    data: T;
}

/**
 * Represents an error JSend response.
 * @template T The type of the optional data payload.
 */
export interface JSendErrorResponse<T> extends JSendBase {
    status: 'error';
    /**
     * A message describing the error.
     */
    message: string;
    /**
     * An optional error code.
     */
    code: number | null;
    /**
     * Optional additional data related to the error.
     */
    data: T | null;
}

/**
 * Creates a JSend success response.
 * @template T The type of the data payload.
 * @param data - The data payload to include in the response.
 * @returns A JSend success response object.
 */
const jsendSuccess = <T>(data: T): JSendSuccessResponse<T> => ({
    status: 'success',
    data,
});

/**
 * Creates a JSend fail response.
 * @template T The type of the data payload.
 * @param data - The data payload to include in the response.
 * @returns A JSend fail response object.
 */
const jsendFail = <T>(data: T): JSendFailResponse<T> => ({
    status: 'fail',
    data,
});

/**
 * Creates a JSend error response.
 * @template T The type of the optional data payload.
 * @param message - A message describing the error.
 * @param options - Additional options for the error response, including optional data and an error code.
 * @returns A JSend error response object.
 */
const jsendError = <T>(
    message: string,
    options: { data?: T; code?: number } = {},
): JSendErrorResponse<T> => ({
    status: 'error',
    message,
    code: options.code ?? null,
    data: options.data ?? null,
});

export { jsendError, jsendFail, jsendSuccess };
