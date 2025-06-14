# 📁 Project Structure

This document outlines the high-level directory and file structure of the Monorift boilerplate project.

```
├── dist/                          # Generated build folder
├── docs/
│   ├── getting-started.md         # Getting started guide
│   └── README.md                  # Documentation overview
├── logs/                          # Generated log folder
│   ├── app/
│   │   ├── modules/               # Feature modules
│   │   │   └── default/           # Default example module
│   │   │       ├── cli/           # CLI commands for the module
│   │   │       │   └── hello.ts
│   │   │       ├── controllers/   # Controllers (business logic)
│   │   │       │   └── default.ts
│   │   │       └── routes/        # API route definitions
│   │   │           └── default.ts
│   │   └── shared/                # Shared resources
│   │       ├── middlewares/       # Express middlewares
│   │       │   ├── http-logger.ts
│   │       │   ├── malformed.ts
│   │       │   └── not-found.ts
│   │       └── utils/             # Utility functions
│   │           ├── jsend.ts
│   │           ├── logger.ts
│   │           └── path-alias.ts
│   ├── config/
│   │   └── app.ts                 # App-level configuration
│   ├── console.ts                 # CLI entry point
│   └── env.ts                      # Environment loading script
│   └── server.ts                  # HTTP server entry point
├── .env.development.example       # Example env file for development
├── .gitignore                     # Git ignore rules
├── .prettierrc                    # Prettier code formatting configuration
├── eslint.config.mjs              # ESLint config (modular)
├── LICENSE                        # Project license
├── package-lock.json              # NPM lockfile for dependency consistency
├── package.json                   # Project metadata and dependencies
├── README.md                      # Main project README
└── tsconfig.json                  # TypeScript compiler configuration
```

## Notes

- `src/app/modules/` follows a **modular monolith** pattern: each module is self-contained.
- `shared/` holds middlewares and utilities that can be reused across modules.
- CLI commands are extendable via each module’s `cli/` folder and invoked through `console.ts`.