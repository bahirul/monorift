# Application Configuration

This project uses a centralized configuration system to manage all environment-specific settings. The goal is to keep configuration logic in a single place and prevent scattering process.env access across the codebase.

# Default Configuration

Environment variables are accessed and processed in:

```bash
src/config/app.ts
```

This file reads values from `process.env` and exports a structured config object.

> ✅ **Best Practice:**  
> Do **not** use `process.env` directly in other parts of the application. Always import values from the configuration module instead.  
> This makes the codebase easier to maintain when environment variables change.

---

## Extending Configuration

You can create additional configuration files under src/config as needed.
For example:

```bash
src/config/database.ts
src/config/logger.ts
```

If a file depends on environment variables, make sure to call `loadEnv()` from `src/env.ts` before accessing them.


## Managing Environment Files

Environment variables are loaded from `.env` files. You can create separate files for different environments:

- `.env.development` – for local development
- `.env.production` – for production deployment

To get started, copy the example file:

```bash
cp .env.development.example .env
```

Feel free to extend these variables as needed. When you add new keys, make sure to update your config files to include them.