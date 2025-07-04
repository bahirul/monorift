# monorift

Monorift is an Express.js-based project designed with a modular monolith architecture. It aims to provide a structured and scalable foundation for building RESTful APIs using Node.js and TypeScript, emphasizing organization and maintainability through distinct modules and shared utilities.

## Features

* **Modular Architecture**: Organizes features into independent modules, promoting code reusability and separation of concerns.
* **Express.js Framework**: Leverages the robust and flexible Express.js for building web applications and APIs.
* **TypeScript Support**: Enhances code quality, readability, and maintainability with static typing.
* **Configuration Management**: Handles environment-specific configurations using YAML files.
* **Centralized Logging**: Provides a unified logging mechanism with different log levels and file/console outputs.
* **HTTP Request Logging**: Includes a middleware for logging incoming HTTP requests.
* **Error Handling**: Implements middleware for catching 404 (Not Found) errors and general internal server errors, as well as malformed request errors.
* **CORS and Security**: Configures Cross-Origin Resource Sharing (CORS) and utilizes Helmet for enhanced security.
* **CLI Commands**: Supports command-line interface (CLI) commands for various utilities.
* **Path Aliasing**: Simplifies module imports with predefined path aliases.
* **JSend Response Formatting**: Adheres to the JSend specification for consistent API responses.

---

## Installation

To set up the project, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd monorift
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Create configuration files**:
    The project uses `config.yaml` for default settings and `config.production.yaml` or `config.development.yaml` for environment-specific overrides. You can start by copying the `config.example.yaml` () or creating your own.
    
    Example `config.yaml`:
    ```yaml
    app:
      id: "monorift-app"
      env: "development" # or production
      debug: true
      port: 50002
      logLevel: "debug" # error, warn, info, http, verbose, debug, silly
    
    cors:
      credentials: true
      origin: true # set to true to allow all, or specify an array of origins
    ```

---

## Usage

### Running the Development Server

To start the server in development mode with hot-reloading:

```bash
npm run dev
```

The server will typically run on http://localhost:50002 (or the port specified in your configuration).

### Running CLI Commands

Execute console commands using `npx tsx ./src/console.ts <command>` or directly with the compiled JavaScript file in the `dist` directory.

Example:

```bash
node ./dist/console.js main/hello-world
```

Or:

```bash
npm run build
node ./dist/console.js main/hello-world
```

### API Endpoints

The main API endpoint is available at `http://localhost:50002/`. You can access the main action by navigating to:

```
GET http://localhost:50002/
```

Response:
```json
{
  "status": "success",
  "data": {
    "message": "OK!"
  }
}
```

## Folder Structure

The project follows a structured folder layout to maintain clarity and organization. Below is an overview of the key directories and files:

```plaintext
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── app.ts                 # Application configuration loading and interface
│   │   ├── modules/
│   │   │   └── main/
│   │   │       ├── cli/
│   │   │       │   └── hello.ts       # CLI command for "hello world"
│   │   │       ├── controllers/
│   │   │       │   └── main.ts        # Controller for main module API endpoints
│   │   │       └── routes/
│   │   │           └── main.ts        # Routes definition for the main module
│   │   └── shared/
│   │       ├── middlewares/
│   │       │   ├── http-logger.ts     # HTTP request logging middleware (Morgan)
│   │       │   ├── malformed.ts       # Middleware to catch malformed request errors
│   │       │   └── not-found.ts       # Middleware for handling 404 Not Found errors
│   │       └── utils/
│   │           ├── jsend.ts           # JSend response format helpers
│   │           ├── logger.ts          # Centralized Winston logger configuration
│   │           └── path-alias.ts      # Utility for resolving path aliases
│   ├── console.ts                     # Main entry point for CLI commands
│   └── http.ts                        # Main entry point for the HTTP server (Express app)
├── package.json                       # Project metadata and dependencies
├── tsconfig.json                      # TypeScript configuration
└── config.example.yaml                # Example configuration file
└── tsconfig.json                      # TypeScript configuration for the project
└── eslint.config.mjs                  # ESLint configuration file
└── .prettierrc                        # Prettier configuration file
└── .gitignore                         # Git ignore file
```

## Configuration

The project uses YAML files for configuration, located at the root level.

- `config.yaml`: The default configuration file.
- `config.development.yaml`: Overrides settings for the development environment.
- `config.production.yaml`: Overrides settings for the production environment.

The NODE_ENV environment variable determines which configuration file is loaded. If a specific environment file is not found, it falls back to config.yaml.

Key configuration parameters defined in `src/app/config/app.ts`:

- `app.id`: Application identifier.
- `app.env`: Application environment (development or production).
- `app.debug`: Enables/disables debug mode.
- `app.port`: The port on which the Express server will listen.
- `app.logLevel`: Minimum log level for the application (e.g., info, debug, error).
- `cors.credentials`: Enables or disables Access-Control-Allow-Credentials.
- `cors.origin`: Specifies allowed origins for CORS. Can be true (allow all), false (no CORS), or an array of allowed origins.


## Scripts or Commands

The package.json file defines several useful scripts:

- `npm start`: Starts the compiled Node.js server (after running npm run build).
- `npm run dev`: Starts the development server with nodemon and tsx for hot-reloading and TypeScript compilation on the fly.
- `npm run clean`: Removes the dist directory.
- `npm run build`: Cleans the dist directory and then compiles the TypeScript code to JavaScript.
- `npm test`: Placeholder for running tests.

## Documentation

For detailed documentation on how to use the project, refer to the following files:

- [docs/configuration.md](docs/configuration.md): Guide on configuring the application, including environment-specific settings.
- [docs/lifecycle.md](docs/lifecycle.md): Overview of the application lifecycle, including startup and shutdown processes.
- [docs/error.handling.md](docs/error.handling.md): Explanation of error handling strategies, including middleware for catching errors and formatting responses.
- [docs/routing.md](docs/routing.md): Information on how to define and register routes for both HTTP and CLI commands.

## Dependencies

Please refer to the `package.json` file for a complete list of dependencies.


## Contributing to Repository Content Generator

Want to help make this project better? Awesome\! Here's how you can contribute.

-----

### Found a Bug?

If something's broken, please [open an issue](https://github.com/bahirul/monorift/issues) on GitHub. Tell us what went wrong and how we can see it too.

### Have an Idea?

Got a suggestion for a new feature or an improvement? [Open an issue](https://github.com/bahirul/monorift/issues) and share your thoughts\!

### Want to Code?

If you'd like to write code to fix a bug or add a feature:

1.  **Fork** this project.
2.  **Clone** your copy to your computer.
3.  **Create a new branch** for your changes.
4.  **Make your changes**.
5.  **Test your code**.
6.  **Commit** your changes with a clear message.
7.  **Push** your branch.
8.  **Open a Pull Request** to our main project. Explain what you did\!