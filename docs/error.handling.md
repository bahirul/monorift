# Error Handling

The application has a robust error handling mechanism to catch and handle various types of errors. The error handling is implemented using middleware.

## Types of Errors

### 404 Not Found

If a request is made to a route that is not defined, the `notFoundMiddleware` will be triggered. This middleware will return a 404 Not Found response with a JSON payload.

### Malformed Request

If a request is made with a malformed JSON payload, the `malformedMiddleware` will be triggered. This middleware will return a 400 Bad Request response with a JSON payload.

### Internal Server Error

If an unhandled error occurs in the application, the global error handler will be triggered. This middleware will return a 500 Internal Server Error response with a JSON payload. In development mode, the error stack trace will be included in the response.

## Error Handling Middleware

### `notFoundMiddleware`

This middleware is defined in `src/app/shared/middlewares/not-found.ts`. It is responsible for handling requests to undefined routes.

### `malformedMiddleware`

This middleware is defined in `src/app/shared/middlewares/malformed.ts`. It is responsible for handling requests with malformed JSON payloads.

### Global Error Handler

The global error handler is defined in `src/http.ts`. It is responsible for handling all other unhandled errors.

## Error Status

Error triggered by client will return a `fail` status, while errors triggered by the server will return an `error` status.

## Example Error Response

### 404 Not Found

```json
{
  "status": "fail",
  "message": "resource not found",
}
```

### 400 Bad Request

```json
{
  "status": "fail",
  "message": "malformed request",
}
```

### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "internal server error",
}
```
