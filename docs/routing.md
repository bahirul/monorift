# Routing

Routing is the process of determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

## Defining Routes

Routes are defined in the `src/app/modules` directory. Each module can have its own routes, which are defined in a `routes` directory within the module.

For example, the `main` module has its routes defined in `src/app/modules/main/routes/main.route.ts`.

### Example Route Definition

```typescript
import { Router } from 'express';
import { main } from '../controllers/main.controller.ts';

const router = Router();

router.get('/', main);

export default router;
```

In this example, a new router is created, and a GET route is defined for the root path (`/`). The `main` controller is used to handle requests to this route.

## Registering Routes

Routes are registered in the `src/http.ts` file. The routes for each module are imported and then registered with the Express app.

### Example Route Registration

```typescript
import defaultRoutes from './app/modules/main/routes/main.route.ts';

// ...

app.use('/', defaultRoutes);
```

In this example, the `defaultRoutes` are registered with the Express app. The routes will be available under the `/` path.

## CLI Commands

In addition to HTTP routes, the application also supports CLI commands. CLI commands are defined in the `cli` directory within each module.

For example, the `main` module has a `hello` command defined in `src/app/modules/main/cli/hello.ts`.

### Example CLI Command

```typescript
import { Command } from 'commander';

const command = new Command('main/hello-world');

command.action(() => {
  console.log('Hello, world!');
});

export default command;
```

In this example, a new command is created with the name `main/hello-world`. The `action` method is used to define the code that will be executed when the command is run.

### Running CLI Commands

CLI commands can be run using the `src/console.ts` file.

```bash
npm run build
node ./dist/console.js main/hello-world
```
