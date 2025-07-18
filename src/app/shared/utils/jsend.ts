/**
 * JSend response format for success, fail and error
 *
 * @see https://github.com/omniti-labs/jsend
 */
interface JSendSuccessResponse<T> {
    status: 'success';
    data: T;
}

interface JSendFailResponse<T> {
    status: 'fail';
    data: T;
}

interface JSendErrorResponse<T> {
    status: 'error';
    message: string;
    code?: number | null;
    data?: T | null;
}

export const jsendSuccess = <T>(data: T): JSendSuccessResponse<T> => {
    return {
        status: 'success',
        data,
    };
};

export const jsendFail = <T>(data: T): JSendFailResponse<T> => {
    return {
        status: 'fail',
        data,
    };
};

interface JSendErrorOptions<T> {
    message: string;
    data?: T | null | undefined;
    code?: number;
}

export const jsendError = <T>(
    options: JSendErrorOptions<T>,
): JSendErrorResponse<T> => {
    const { message, data, code } = options;
    return {
        status: 'error',
        message,
        code: code === undefined ? null : code, // only error has code as defined in https://github.com/omniti-labs/jsend
        data: data === undefined ? null : data,
    };
};
