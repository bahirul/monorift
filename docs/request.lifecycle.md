# Request Lifecycle

This document explains the lifecycle of a request in the Monorift application, detailing how it is processed from the moment it is received by the server to the point where a response is sent back to the client.

## Overview

The request lifecycle follows these steps:

1. **Request Received**: The Express server listens for incoming HTTP requests.
2. **Middleware Execution**: Various middlewares are applied to process the request.
3. **Route Handling**: The request is routed to the appropriate controller based on the defined routes.
4. **Response Generation**: The controller processes the request and generates a response.
5. **Error Handling**: If an error occurs at any stage, it is handled by the global error handler.

## Detailed Steps

### 1. Request Received

The Express server is initialized in `src/express.ts`. It listens for incoming HTTP requests on the configured port.

### 2. Middleware Execution

Middlewares are applied in the following order:

- **Morgan Middleware**: Logs HTTP requests for debugging and monitoring.
- **Cookie Parser**: Parses cookies attached to the request.
- **Body Parsers**: Parses JSON and URL-encoded payloads.
- **Helmet**: Adds security headers to the request.
- **CORS Middleware**: Handles Cross-Origin Resource Sharing based on the configuration.
- **Malformed Middleware**: Catches and handles malformed requests.

### 3. Route Handling

Routes are defined in `src/app/modules/main/routes/main.route.ts`. The request is matched to a route, and the corresponding controller is invoked to handle the request.

### 4. Response Generation

The controller processes the request, performs any necessary business logic, and generates a response. The response is sent back to the client in a standardized JSend format.

### 5. Error Handling

If an error occurs at any stage of the lifecycle, it is passed to the global error handler defined in `src/express.ts`. The error handler:

- Formats the error message using the `errorMessage` utility.
- Logs the error using the centralized logger.
- Sends a JSend error response to the client.

## Example Lifecycle

Here is an example of a request lifecycle:

1. **Request**: A client sends a `GET` request to `http://localhost:50002/`.
2. **Middleware**: The request passes through the middlewares (e.g., logging, parsing, security).
3. **Route Matching**: The request matches the root route `/`.
4. **Controller Execution**: The controller generates a success response.
5. **Response**: The server sends the response back to the client.

Response:
```json
{
  "status": "success",
  "data": {
    "message": "OK!"
  }
}
```

## Conclusion

The request lifecycle is designed to be modular and maintainable, ensuring that each stage of the process is clearly defined and easy to extend. By following this lifecycle, the application can handle requests efficiently and provide meaningful responses to clients.
