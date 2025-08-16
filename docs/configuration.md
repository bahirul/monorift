# Configuration

The project uses YAML files for configuration, located at the root level. The configuration is loaded using the `loadConfig` function in `src/app/config/app.ts`.

## Configuration Files

-   `.env`: The default configuration file.
-   `.development.env`: Overrides settings for the development environment.
-   `.production.env`: Overrides settings for the production environment.

The `NODE_ENV` environment variable determines which configuration file is loaded. If a specific environment file is not found, it falls back to `.env`.

## Configuration Parameters

Key configuration parameters are defined in `src/app/config/app.ts`:

### `app.id`

-   **Type**: `string`
-   **Description**: A unique identifier for the application.
-   **Example**: `monorift-app`

### `app.env`

-   **Type**: `string`
-   **Description**: The application environment. Can be `development` or `production`.
-   **Example**: `development`

### `app.debug`

-   **Type**: `boolean`
-   **Description**: Enables or disables debug mode. When enabled, the error handler will include the stack trace in the response.
-   **Example**: `true`

### `app.port`

-   **Type**: `number`
-   **Description**: The port on which the Express server will listen.
-   **Example**: `50002`

### `app.logLevel`

-   **Type**: `string`
-   **Description**: The minimum log level for the application. The available levels are `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly`.
-   **Example**: `debug`

### `cors.credentials`

-   **Type**: `boolean`
-   **Description**: Enables or disables the `Access-Control-Allow-Credentials` header.
-   **Example**: `true`

### `cors.origin`

-   **Type**: `boolean` or `string[]`
-   **Description**: Specifies the allowed origins for CORS. Can be `true` (allow all), `false` (no CORS), or an array of allowed origins.
-   **Example**: `true` or `["http://localhost:3000"]`

## Example Configuration

### `.env`

```env
APP_ID=monorift-app
APP_ENV=development
APP_DEBUG=true
APP_PORT=50001
APP_LOG_LEVEL=debug

CORS_CREDENTIALS=true
CORS_ORIGIN=*
```

### `.production.env`

```env
APP_ID=monorift-app
APP_ENV=production
APP_DEBUG=false
APP_PORT=50002
APP_LOG_LEVEL=info

CORS_CREDENTIALS=true
CORS_ORIGIN=https://your-production-domain.com
```
