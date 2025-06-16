# Entry Points & Lifecycle

This app has two entry points:

- `src/http.ts` → Starts HTTP server
- `src/console.ts` → Runs CLI commands

---

## 1. CLI Mode (`console.ts`)

Handles command-line tools using `commander`.

```bash
ts-node src/console.ts default/hello-world
# Output: hello world
```

- Loads env via `loadEnv()`
- Registers commands
- Parses input args

---

## 2. HTTP Mode (`http.ts`)

Starts an Express server with middlewares and routes.

```bash
ts-node src/http.ts
# Server runs at port from .env
```

Includes:
- CORS, Helmet, Logger
- 404 and Error handling
- Loads routes like `defaultRoutes`
- Register module router
