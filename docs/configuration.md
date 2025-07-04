# Application Configuration

This project uses a centralized configuration system to manage all settings. The goal is to keep configuration logic in a single place and prevent scattering process.env access across the codebase.

## Default Configuration

Configuration variables are accessed and processed in:

```bash
src/config/app.ts
```

This file reads values from `config.yaml` and sets up the application configuration. It uses the `loadConfig()` function in `config/app.ts` to load configuration variables.

## Environment Configuration

You can maintain separate configuration files for different stages:
- `config.development.yaml` – for development
- `config.production.yaml` – for production

`config/app.ts` will automatically load the appropriate configuration file based on the `NODE_ENV` environment variable.

## Extending Configuration

You can create additional configuration files under src/config as needed.

For example:

```bash
src/config/database.ts
src/config/logger.ts
```

If a file depends on configuration variables, make sure to call `loadConfig()` from `config/app.ts` to ensure all configuration variables are loaded before accessing them.

To get started, copy the example file:

```bash
cp example.config.yaml config.yaml
```

Feel free to extend these variables as needed. When you add new keys, make sure to update your config files to include them.