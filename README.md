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
3.  **Create a configuration file**
    The project loads environment variables from `.env.{env}` (e.g., `.env.development`, `.env.production`), falling back to `.env` if no environment-specific file is found. You can start by copying the provided example:

    ```bash
    cp .env.example .env.development
    ```

    Example `.env.development`:
    ```env
    APP_ID=monorift-app
    APP_ENV=development
    APP_PORT=50001

    LOGGER_LEVEL=debug

    CORS_CREDENTIALS=true
    CORS_ORIGIN=*
    ```

## Usage

### Running the Development Server

To start the server in development mode with hot-reloading:

```bash
npm run dev
```

The server will run on `http://localhost:50001` (or the port specified in your configuration).

### API Endpoints

The main API endpoint is available at `http://localhost:50001/`:

```
GET http://localhost:50001/
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
│   ├── config/
│   │   └── app.config.ts                  # Application configuration loading and interface
│   ├── modules/
│   │   └── main/
│   │       ├── commands/
│   │       │   └── hello.command.ts       # Example command handler
│   │       ├── handlers/
│   │       │   └── main.handler.ts        # Request handler for main module endpoints
│   │       └── routes/
│   │           └── main.route.ts          # Route definitions for the main module
│   ├── shared/
│   │   ├── middlewares/
│   │   │   ├── async.handler.ts           # Async error-forwarding wrapper
│   │   │   ├── malformed.ts               # Middleware to catch malformed request errors
│   │   │   ├── morgan.ts                  # HTTP request logging middleware (Morgan)
│   │   │   └── not.found.ts               # Middleware for handling 404 Not Found errors
│   │   ├── services/
│   │   │   ├── logger.ts                  # Centralized Winston logger service
│   │   │   └── logger.factory.ts          # Logger factory for creating custom loggers
│   │   ├── types/
│   │   │   └── jsend.ts                   # JSend response format helpers
│   │   └── utils/
│   │       ├── config.parser.ts           # Utility for parsing configuration values
│   │       └── path.alias.ts              # Utility for resolving path aliases
│   ├── express.ts                         # Express application setup and middleware
│   └── http.ts                            # Main entry point for the HTTP server
├── .env.example                           # Example environment configuration
├── package.json                           # Project metadata and dependencies
├── tsconfig.json                          # TypeScript configuration
├── eslint.config.mjs                      # ESLint configuration
└── .prettierrc                            # Prettier configuration
```

## Documentation

For detailed documentation on various aspects of the project, refer to the following sections:

- [Configuration](docs/configuration.md): Learn how to configure the application using environment variables.
- [Routing](docs/routing.md): Understand how routing is implemented in the application.
- [Application Lifecycle](docs/request.lifecycle.md): Explore the lifecycle of the application from startup to shutdown.
- [Error Handling](docs/error.handling.md): Learn about the error handling mechanisms in the project.
