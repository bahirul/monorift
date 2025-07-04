# Routing Overview

This template supports two types of applications:

- HTTP Server – Handles web requests via Express
- Console Application – Handles CLI commands using Commander

# HTTP Routing

Register module routes in `src/server.ts` under the specified section:

```ts
// register module route here:
app.use('/', defaultRoutes);
```

Each module should export its own Express router, and it can be mounted here using app.use().


# Console Routing

Register console commands in `src/console.ts` under the following section:

```ts
// Register CLI commands. Use the format: <module>/<command>
program
  .command('default/hello-world')
  .description('Prints "hello world" from the default module')
  .action(helloWorld);
```

- Use the <module>/<command> format to maintain modularity.
- Keep each module's commands grouped for better organization and scalability.
- You can separate commands per module in individual files and import them here.
Here's the `routing.md` file for your application, detailing the routing mechanisms for both HTTP and CLI.

# Application Routing

This document outlines how routes are managed and processed in the Monorift application for both its HTTP server and Command Line Interface (CLI).

-----

## 1\. HTTP Routing

HTTP routing defines how incoming web requests are mapped to specific controller actions within the application. Monorift uses **Express.js** for its HTTP routing.

### 1.1. Core Routing Configuration

The main entry point for HTTP routing is `src/http.ts`.

  * **Express Router Initialization**:

    ```typescript
    import express, { Request, Response } from 'express';
    // ...
    const app = express();
    ```

    An Express application instance (`app`) is created, which will handle all incoming HTTP requests.

  * **Module Route Registration**:

    ```typescript
    import defaultRoutes from './app/modules/main/routes/main.js';
    // ...
    app.use('/', defaultRoutes);
    ```

    This line is crucial. It tells the Express application to use the `defaultRoutes` (which come from the `main` module) for any path that starts with `/`. This means any request to the root path or any sub-path will first be evaluated by the `defaultRoutes` router.

### 1.2. Module-Specific Routing

Each module is responsible for defining its own routes. In your current setup, the `main` module handles this.

  * **Route Definition (`src/app/modules/main/routes/main.ts`)**:
    ```typescript
    import { Router } from 'express';
    import { getMainAction } from '../controllers/main.js';

    // Create a new router
    const mainRoutes = Router();

    // GET /
    mainRoutes.get('/', getMainAction);

    export default mainRoutes;
    ```
    1.  A new **Express Router** instance (`mainRoutes`) is created. This allows you to group routes specific to a module.
    2.  `mainRoutes.get('/', getMainAction);`: This line defines a **GET** route for the root path (`/`) relative to where this router is mounted. When a `GET` request comes to `/`, the `getMainAction` function from `src/app/modules/main/controllers/main.ts` is executed.
    3.  `export default mainRoutes;`: The router is exported, making it available to be imported and used in `src/http.ts`.

### 1.3. Controller Actions

Controller actions are the functions that execute the business logic and send responses for specific routes.

  * **Controller Example (`src/app/modules/main/controllers/main.ts`)**:
    ```typescript
    import { Request, Response } from 'express';
    import { jsendSuccess } from '../../../shared/utils/jsend.js';

    // GET /
    export const getMainAction = async (req: Request, res: Response) => {
        res.json(
            jsendSuccess({
                message: 'OK!',
            }),
        );
    };
    ```
    The `getMainAction` function receives the `Request` and `Response` objects from Express. It constructs a JSend-formatted success response and sends it as JSON.

### 1.4. Routing Middleware

Middleware functions are executed in the order they are `use`d by Express and can perform tasks before a request reaches its final route handler, or handle requests themselves.

  * **Not Found (404) Middleware (`src/app/shared/middlewares/not-found.ts`)**:

    ```typescript
    import { Request, Response } from 'express';
    import { jsendFail } from '../utils/jsend.js';

    export default function notFoundMiddleware(_req: Request, res: Response) {
        res.status(404).json(jsendFail('resource not found'));
        return;
    }
    ```

    This middleware is mounted **after** all specific routes (`app.use(notFoundMiddleware);` in `src/http.ts`). If no preceding routes have handled the request, this middleware will be triggered, sending a 404 Not Found response.

  * **Error Handling Middleware (`src/http.ts`)**:

    ```typescript
    app.use((err: Error, req: Request, res: Response) => {
        // ... error logging and response
        res.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    });
    ```

    This is a special Express middleware with four arguments (`err, req, res, next`). It acts as a global error handler. If any error is thrown or passed to `next(err)` in the preceding routes or middleware, this function will catch it, log it, and send a `500 Internal Server Error` response.

-----

## 2\. CLI Routing (Commands)

The CLI component of Monorift uses the **Commander.js** library to define and handle commands.

### 2.1. Core CLI Configuration

The main entry point for CLI commands is `src/console.ts`.

  * **Commander Program Initialization**:
    ```typescript
    import { program } from 'commander';
    // ...
    program.name('console.ts').description('Console Command').version('1.0.0');
    ```
    This sets up the basic Commander program, defining its name, description, and version.

### 2.2. Command Registration

CLI commands are defined and registered with the Commander program.

  * **Command Definition (`src/console.ts`)**:
    ```typescript
    import { helloWorld } from './app/modules/main/cli/hello.js';
    // ...
    program
        .command('main/hello-world')
        .description('Prints "hello world" from main module')
        .action(helloWorld);
    ```
    1.  `.command('main/hello-world')`: This defines a new command named `main/hello-world`. CLI commands often use a `<module>/<command>` convention for organization.
    2.  `.description('...')`: Provides a short description for the command, visible when running `tsx src/console.ts --help`.
    3.  `.action(helloWorld)`: This associates the `helloWorld` function (`src/app/modules/main/cli/hello.ts`) with this command. When the `main/hello-world` command is executed, `helloWorld` will be called.

### 2.3. Command Action

Command actions are the functions that execute the logic for a specific CLI command.

  * **Action Example (`src/app/modules/main/cli/hello.ts`)**:
    ```typescript
    export const helloWorld = async () => {
        // this is a simple command that logs 'hello world' to the console
        console.log('hello world');
    };
    ```
    The `helloWorld` function contains the logic to be executed when the `main/hello-world` command is run. For this example, it simply logs "hello world" to the console.

### 2.4. Command Parsing

  * **Parsing Arguments (`src/console.ts`)**:
    ```typescript
    program.parse(process.argv);
    ```
    This line is essential for Commander. It parses the command-line arguments provided by the user (`process.argv`) and dispatches the execution to the appropriate command action based on the input.

-----

## 3\. Path Aliases

While not directly a routing mechanism for requests or commands, **path aliases** (`src/app/shared/utils/path-alias.ts`) are crucial for organizing and resolving file paths within the codebase. They ensure that modules can be imported consistently regardless of their location, indirectly supporting the modular structure that underpins routing.

This clear separation and modularity allow for easy expansion of both HTTP endpoints and CLI commands in Monorift.