Sure, here's the `lifecycle.md` file for your application, covering both the CLI and HTTP aspects.

````markdown
# Application Lifecycle

This document outlines the lifecycle of the Monorift application, encompassing both its HTTP server and Command Line Interface (CLI) components.

---

## 1. Project Initialization & Setup

This phase covers the initial setup and dependency management for the application.

### Dependencies

Dependencies are defined in `package.json`. These include:
* **Production Dependencies (`dependencies`):** Libraries required for the application to run in a production environment (e.g., `express`, `commander`, `winston`, `knex`, `luxon`).
* **Development Dependencies (`devDependencies`):** Libraries used for development, testing, and building (e.g., `typescript`, `nodemon`, `tsx`, `eslint`, `rimraf`).

### Installation

To install all necessary dependencies, run:

```bash
npm install
````

-----

## 2\. Configuration Loading

The application loads its configuration based on the environment.

### Process

1.  The `loadConfig()` function in `src/app/config/app.ts` is responsible for loading the application's settings.
2.  It determines the environment using `process.env.NODE_ENV`. If not set, it defaults to `development`.
3.  Based on the environment, it attempts to load `config.<env>.yaml` (e.g., `config.production.yaml`, `config.development.yaml`).
4.  If an environment-specific config file is not found, it falls back to `config.yaml`.
5.  The configuration is parsed from the YAML file and made available globally within the application.
6.  This ensures that settings like port, debug mode, and log level are correctly applied at startup.

-----

## 3\. Building the Application

The application is written in TypeScript and needs to be compiled to JavaScript before execution.

### Build Command

The `build` script in `package.json` handles this process:

```json
"build": "npm run clean && tsc"
```

### Process

1.  **`npm run clean`**: This command executes `rimraf ./dist`, which recursively deletes the `dist` directory. This ensures a clean build by removing any old compiled files.
2.  **`tsc`**: The TypeScript compiler (`tsc`) then compiles all TypeScript files from the `src` directory into JavaScript, outputting them into the `dist` directory.

-----

## 4\. Application Execution

The Monorift application can be run in two primary modes: HTTP server and CLI.

-----

### 4.1. HTTP Server Lifecycle

This describes the flow when the application is run as an HTTP server.

#### Startup Command

The HTTP server is started using the `start` script:

```json
"start": "node ./dist/http.js"
```

For development, `nodemon` with `tsx` is used for live reloading:

```json
"dev": "nodemon --exec tsx ./src/http.ts"
```

#### Process (`src/http.ts`)

1.  **Express App Initialization**: An Express.js application instance is created.
2.  **Configuration Loading**: The `loadConfig()` function is called to retrieve application settings, including the port and CORS configurations.
3.  **Middleware Registration**:
      * `express.json()`: Parses incoming requests with JSON payloads.
      * `express.urlencoded({ extended: true })`: Parses incoming requests with URL-encoded payloads.
      * `helmet()`: Helps secure Express apps by setting various HTTP headers.
      * `httpLoggerMiddleware`: Logs HTTP requests using Morgan and custom logic, including request body logging in debug mode.
      * `cors`: Configures Cross-Origin Resource Sharing based on loaded settings.
      * (Potentially `malformedMiddleware`): Catches and handles malformed request errors, though it's imported but not explicitly used in `src/http.ts`. It would typically be placed early in the middleware chain after body parsers.
4.  **Route Registration**:
      * `app.use('/', defaultRoutes);`: Registers the main module's routes (`src/app/modules/main/routes/main.ts`) at the root path. This includes the `GET /` endpoint handled by `getMainAction`.
5.  **Not Found (404) Middleware**:
      * `notFoundMiddleware`: Catches requests that don't match any defined routes and returns a 404 "resource not found" error using JSend format.
6.  **Global Error Handler**:
      * A catch-all error handling middleware is defined. This middleware logs server-side errors and returns a generic 500 "internal server error" response to the client (with stack trace in debug mode).
7.  **Server Start**: The Express app starts listening on the configured port. A success message is logged to the console using the application's logger.

#### Request Flow (Example: `GET /`)

1.  A client sends a `GET` request to the application's root URL.
2.  The request passes through the **middlewares**: `express.json()`, `express.urlencoded()`, `helmet()`, `httpLoggerMiddleware`, and `cors`.
3.  The request then hits the **route handler** defined in `src/app/modules/main/routes/main.ts`: `mainRoutes.get('/', getMainAction)`.
4.  The `getMainAction` controller (`src/app/modules/main/controllers/main.ts`) is executed.
5.  `getMainAction` uses `jsendSuccess` to format a successful JSON response: `{ status: 'success', data: { message: 'OK!' } }`.
6.  The response is sent back to the client.

-----

### 4.2. CLI (Commander/Console) Lifecycle

This describes the flow when the application is run as a CLI tool.

#### Startup Command

The CLI is typically run directly via `tsx` during development or `node` after building:

```bash
# During development
tsx src/console.ts <command> [options]

# After building
node dist/console.js <command> [options]
```

#### Process (`src/console.ts`)

1.  **Commander Initialization**: The `commander` library is initialized to set up the CLI program, including its name, description, and version.
2.  **Command Registration**:
      * Commands are registered using `program.command()`. Each command has a name and a description.
      * An `action` function is associated with each command. This function is executed when the command is invoked.
      * Example: `program.command('main/hello-world').action(helloWorld);`
3.  **Argument Parsing**: `program.parse(process.argv)` parses the command-line arguments provided by the user. Based on these arguments, Commander identifies and executes the corresponding registered command's action.

#### Command Flow (Example: `main/hello-world`)

1.  The user executes `tsx src/console.ts main/hello-world`.
2.  Commander parses `process.argv` and matches the `main/hello-world` command.
3.  The `helloWorld` function (`src/app/modules/main/cli/hello.ts`) is invoked.
4.  `helloWorld` simply logs "hello world" to the console.

-----

## 5\. Logging

The application utilizes `winston` for robust logging.

### Configuration (`src/app/shared/utils/logger.ts`)

  * **Log Levels**: Configured based on `app.logLevel` from `appConfig` (e.g., `error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`).
  * **Transports**:
      * **File Transport (Error)**: Logs messages with `error` level to `logs/error.log`.
      * **File Transport (General App)**: Logs all messages at or above the configured `logLevel` to `logs/app.log`.
      * **Console Transport**: Outputs all messages to the console.
  * **Formatting**: Logs include timestamps and colorization for better readability.
  * **Path Alias**: Log file paths are resolved using the `@logs` alias defined in `src/app/shared/utils/path-alias.ts`.

### Usage

The `logger` instance is exported and used throughout the application (e.g., in `http.ts` for server startup/error logging, `http-logger.ts` for HTTP request logging).

-----

## 6\. Error Handling

The application implements several layers of error handling for a robust user experience.

  * **Malformed Request Middleware (`src/app/shared/middlewares/malformed.ts`)**: Catches `400 Bad Request` errors, typically from malformed JSON bodies, and returns a JSend `fail` response.
  * **Not Found Middleware (`src/app/shared/middlewares/not-found.ts`)**: Handles `404 Not Found` errors for unmatched routes, returning a JSend `fail` response.
  * **Global Error Handler (`src/http.ts`)**: A final catch-all middleware for any unhandled errors in the HTTP server. It logs the error (including stack trace in debug mode) and sends a generic `500 Internal Server Error` JSend response.

-----

## 7\. Utility Functions

The `src/app/shared/utils` directory contains various utility functions.

  * **`jsend.ts`**: Provides helper functions (`jsendSuccess`, `jsendFail`, `jsendError`) to format API responses according to the JSend specification.
  * **`path-alias.ts`**: Defines and resolves path aliases (e.g., `@root`, `@src`, `@logs`) to absolute file system paths, simplifying imports and file access.
  * **`logger.ts`**: Configures and exports the Winston logger instance, as described in section 5.

-----

## 8\. Development Workflow

For active development, the `dev` script in `package.json` is highly recommended.

```json
"dev": "nodemon --exec tsx ./src/http.ts"
```

  * `nodemon` watches for file changes in the project.
  * `tsx` allows direct execution of TypeScript files without a prior build step, making the development cycle much faster.
  * Any changes saved will automatically restart the HTTP server or re-run the CLI if you're using `tsx` to execute CLI commands directly.

<!-- end list -->

```
```