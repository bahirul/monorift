# Configuration

The project uses YAML files for configuration, located at the root level. The configuration is loaded using the `loadConfig` function in `src/app/config/app.ts`.

## Configuration Files

-   `config.yaml`: The default configuration file.
-   `config.development.yaml`: Overrides settings for the development environment.
-   `config.production.yaml`: Overrides settings for the production environment.

The `NODE_ENV` environment variable determines which configuration file is loaded. If a specific environment file is not found, it falls back to `config.yaml`.

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

### `config.yaml`

```yaml
app:
  id: "monorift-app"
  env: "development"
  debug: true
  port: 50002
  logLevel: "debug"

cors:
  credentials: true
  origin: ['*']
```

### `config.production.yaml`

```yaml
app:
  id: "monorift-app"
  env: "production"
  debug: false
  port: 50002
  logLevel: "info"

cors:
  credentials: true
  origin: ["https://your-production-domain.com"]
```
