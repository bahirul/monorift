# monorift

Monorift is an Express.js-based project designed with a modular monolith architecture. It aims to provide a structured and scalable foundation for building RESTful APIs using Node.js and TypeScript, emphasizing organization and maintainability through distinct modules and shared utilities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them:

*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/bahirul/monorift.git
    cd monorift
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Create configuration files**
    The project uses `config.yaml` for default settings and `config.production.yaml` or `config.development.yaml` for environment-specific overrides. You can start by copying the `example.config.yaml` or creating your own.
    
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

## Project Structure

The project follows a structured folder layout to maintain clarity and organization. Below is an overview of the key directories and files:

```plaintext
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── app.config.ts                 # Application configuration loading and interface
│   │   ├── modules/
│   │   │   └── main/
│   │   │       ├── cli/
│   │   │       │   └── hello.cli.ts       # CLI command for "hello world"
│   │   │       ├── controllers/           
│   │   │       │   │   └── main.controller.ts    # Controller for main module API endpoints
│   │   │       └── routes/
│   │   │           └── main.route.ts        # Routes definition for the main module
│   │   └── shared/
│   │       ├── services/
│   │       │   ├── logger.ts          # Centralized Winston logger service
│   │       ├── middlewares/
│   │       │   ├── http.logger.ts     # HTTP request logging middleware (Morgan)
│   │       │   ├── malformed.ts       # Middleware to catch malformed request errors
│   │       │   └── not.found.ts       # Middleware for handling 404 Not Found errors
│   │       └── utils/
│   │           ├── jsend.ts           # JSend response format helpers
│   │           └── path.alias.ts      # Utility for resolving path aliases
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

## Documentation

For detailed documentation on various aspects of the project, refer to the following sections:

- [Configuration](docs/configuration.md): Learn how to configure the application using YAML files.
- [Routing](docs/routing.md): Understand how routing is implemented in the application.
- [Application Lifecycle](docs/lifecycle.md): Explore the lifecycle of the application from startup to shutdown.
- [Error Handling](docs/error.handling.md): Learn about the error handling mechanisms in