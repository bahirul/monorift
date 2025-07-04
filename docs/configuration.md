-----

# Configuration

This document outlines the configuration options for the `monorift` project, a modular monolith Express.js application.

The project uses YAML files for environment-specific configurations, which are loaded through `src/app/config/app.ts`.

-----

## Configuration Files

The application looks for configuration files in the root directory of the project. The primary configuration file is `config.yaml`. For specific environments, it will attempt to load `config.development.yaml` or `config.production.yaml` if they exist. If an environment-specific file is not found, it falls back to `config.yaml`.

  * **`config.yaml`**: The default configuration file.
  * **`config.development.yaml`**: Overrides `config.yaml` values for the `development` environment.
  * **`config.production.yaml`**: Overrides `config.yaml` values for the `production` environment.

-----

## Environment Variables

The application's behavior is influenced by the `NODE_ENV` environment variable, which determines which configuration file to load.

  * **`NODE_ENV`**: Set to `development` for local development or `production` for production deployments. If not set, it defaults to `development`.

-----

## Application Configuration (`app.ts`)

The `src/app/config/app.ts` file defines the structure and loading mechanism for the application's configuration.

### AppConfig Interface

The `AppConfig` interface defines the expected structure of the configuration.

```typescript
interface AppConfig {
    app: {
        id: string;
        env: string;
        debug: boolean;
        port: number;
        logLevel: string;
    };
    cors: {
        credentials: boolean; // enable credentials for cookies
        origin: boolean; // allow all origins
    };
}
```

### Configuration Properties

Here's a breakdown of the configuration properties:

#### `app`

| Property   | Type      | Description                                                                  | Default (if not specified in files) |
| :--------- | :-------- | :--------------------------------------------------------------------------- | :---------------------------------- |
| `id`       | `string`  | Unique identifier for the application.                                       | N/A                                 |
| `env`      | `string`  | The current environment (`development`, `production`).                       | Determined by `NODE_ENV`            |
| `debug`    | `boolean` | Enables or disables debug-specific features (e.g., detailed error stacks).   | N/A                                 |
| `port`     | `number`  | The port on which the Express.js server will listen.                         | `50002`                             |
| `logLevel` | `string`  | The minimum level of logs to display (e.g., `info`, `debug`, `error`).       | `info`                              |

#### `cors`

| Property      | Type      | Description                                                | Default (if not specified in files) |
| :------------ | :-------- | :--------------------------------------------------------- | :---------------------------------- |
| `credentials` | `boolean` | Specifies whether CORS requests should include credentials. | `false`                             |
| `origin`      | `boolean` | Specifies the allowed origins for CORS requests. `true` allows all. | `true`                              |

-----

## Logging Configuration (`logger.ts`)

The application uses `winston` for logging, configured in `src/app/shared/utils/logger.ts`. The logging behavior is influenced by the `app.logLevel` setting from the main application configuration.

### Log Levels

The following log levels are supported: `error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`. The `app.logLevel` setting determines the minimum level of messages that will be logged.

### Log Outputs

Logs are output to:

  * **Console**: All logs at or above the configured `logLevel`.
  * **`logs/error.log`**: Only `error` level logs.
  * **`logs/app.log`**: All logs at or above the configured `logLevel`.

-----

## HTTP Request Logging (`http-logger.ts`)

The `src/app/shared/middlewares/http-logger.ts` middleware uses `morgan` to log HTTP requests.

  * **Request Body Logging**: If `app.logLevel` is set to `debug`, the middleware will log the request body for `POST`, `PUT`, and `PATCH` requests. This is useful for debugging but should be avoided in production environments due to potential sensitive data exposure and performance overhead.

-----

## Path Aliases (`path-alias.ts`)

The `src/app/shared/utils/path-alias.ts` file defines aliases to simplify module imports. These aliases help in maintaining a clean and organized project structure, especially in larger applications.

| Alias   | Resolves To                      | Description                                   |
| :------ | :------------------------------- | :-------------------------------------------- |
| `@root` | `../../../../` (project root)    | Points to the root directory of the project.  |
| `@src`  | `../../../../src` (src directory) | Points to the `src` directory.                |
| `@logs` | `../../../../logs` (logs directory) | Points to the `logs` directory for log files. |

For example, `getAlias('@logs/error.log')` will resolve to the actual path of `logs/error.log` relative to the project root.

-----