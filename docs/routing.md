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
