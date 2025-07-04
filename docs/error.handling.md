Below is the `error.handling.md` for your repository.

-----

# Error Handling

This document outlines the error handling strategy implemented in the **Monorift** application. A robust error handling mechanism is crucial for maintaining application stability, providing meaningful feedback to users, and facilitating debugging.

-----

## HTTP Server Error Handling (`src/http.ts`)

The Express.js application centralizes error handling to ensure consistent responses for unhandled exceptions.

### Global Error Handler

All unhandled errors within the Express.js application are caught by a global error handler middleware. This middleware is the last `app.use()` defined in `src/http.ts`.

```typescript
// src/http.ts
app.use((err: Error, req: Request, res: Response) => {
    logger.error({
        action: 'errorHandler',
        message: (err as Error)?.message,
        stack: appConfig.app.debug ? (err as Error)?.stack : null,
    });

    res.status(500).json({
        status: 'error',
        message: 'internal server error',
    });
});
```

Here's how it works:

  * **Error Logging:** When an error occurs, it's logged using the **Winston logger** (`src/app/shared/utils/logger.ts`).
      * The **error message** is always logged.
      * The **stack trace** is included in the logs only if the `app.debug` configuration is set to `true`. This prevents sensitive information from being exposed in production environments.
  * **Generic Error Response:** A generic "Internal Server Error" message is sent to the client with a `500` HTTP status code. This prevents internal application details from being leaked to the public. The response follows the **JSend** specification for error responses.

-----

## Specific Error Handling Middlewares

In addition to the global error handler, specific middlewares are used to catch and handle common HTTP-related errors more granularly.

### Not Found (404) Middleware (`src/app/shared/middlewares/not-found.ts`)

This middleware handles requests to routes that do not exist.

```typescript
// src/app/shared/middlewares/not-found.ts
import { Request, Response } from 'express';
import { jsendFail } from '../utils/jsend.js';

export default function notFoundMiddleware(_req: Request, res: Response) {
    res.status(404).json(jsendFail('resource not found'));
    return;
}
```

  * It responds with a `404 Not Found` status code.
  * The response body uses the **JSend `fail` status** to indicate that the requested resource could not be found.

### Malformed Request (400) Middleware (`src/app/shared/middlewares/malformed.ts`)

This middleware is designed to catch malformed request errors, such as invalid JSON body formats.

```typescript
// src/app/shared/middlewares/malformed.ts
import { NextFunction, Request, Response } from 'express';
import { jsendFail } from '../utils/jsend.js';

interface MalformedError extends Error {
    expose: boolean;
    statusCode: number;
    status: number;
    body: string;
    type: string;
}

export default function malformedMiddleware(
    err: MalformedError,
    _req: Request,
    res: Response,
    next: NextFunction,
): void {
    // catch 400 error code
    if (err.statusCode === 400) {
        res.status(400).send(jsendFail('malformed request'));
        return;
    }

    next(err); // if it's not a 400, let the default error handling do it.
}
```

  * It specifically checks for errors with a `statusCode` of `400`.
  * If a `400` error is detected, it sends a `400 Bad Request` status and a JSend `fail` response indicating a "malformed request."
  * For any other error code, it passes the error to the next error handling middleware (which would typically be the global error handler).

-----

## Configuration Loading Errors (`src/app/config/app.ts`)

The application's configuration loading also incorporates error handling.

```typescript
// src/app/config/app.ts
export function loadConfig(): AppConfig {
    const env = process.env.NODE_ENV || 'development';

    if (config) {
        return config;
    }

    try {
        config = getConfigByEnv(env);
        return config;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                `🔥 Failed to load configuration: ${error.message}`,
            );
        } else {
            throw new Error(`🔥 Failed to load configuration: Unknown error`);
        }
    }
}
```

  * The `loadConfig` function attempts to load the appropriate configuration file based on the environment.
  * If an error occurs during the configuration loading process (e.g., file not found, YAML parsing error), a new `Error` is thrown with a descriptive message, indicating that the configuration failed to load. This prevents the application from starting with an invalid configuration.

-----

## Logging Errors (`src/app/shared/utils/logger.ts`)

The **Winston logger** is configured to output errors to a dedicated `error.log` file, as well as to the console.

```typescript
// src/app/shared/utils/logger.ts
export const logger = winston.createLogger({
    level: appConfig.app.logLevel,
    transports: [
        new winston.transports.File({
            filename: getAlias('@logs/error.log'),
            level: 'error',
            // ... formatting
        }),
        // ... other transports
    ],
});
```

This ensures that all critical errors are persisted to a file for later analysis, regardless of where they originate in the application.

-----

## JSend Response Format (`src/app/shared/utils/jsend.ts`)

The application uses the JSend specification for API responses, which defines a standardized way to structure success, fail, and error responses. This consistency helps clients understand the nature of the API response.

  * **`jsendSuccess(data)`:** Used for successful operations.
  * **`jsendFail(data)`:** Used when an operation fails due to client-side issues (e.g., invalid input).
  * **`jsendError(message, data?, code?)`:** Used for server-side errors, providing a message and optionally an error code and additional data.

-----