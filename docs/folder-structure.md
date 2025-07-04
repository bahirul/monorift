# 📁 Project Structure

This document outlines the high-level directory and file structure of the Monorift boilerplate project.

```
├── dist/                          # Generated build folder
├── docs/
│   ├── getting-started.md         # Getting started guide
│   └── README.md                  # Documentation overview
├── logs/                          # Generated log folder
│   ├── app/
│   │   ├── config/
│   │   │   └── app.ts               # App-level configuration
│   │   ├── modules/                 # Feature modules
│   │   │   └── default/             # Default example module
│   │   │       ├── cli/             # CLI commands for the module
│   │   │       │   └── hello.ts
│   │   │       ├── controllers/       # Controllers (business logic)
│   │   │       │   └── default.ts
│   │   │       └── routes/            # API route definitions
│   │   │           └── default.ts
│   │   └── shared/                    # Shared resources
│   │       ├── middlewares/           # Express middlewares
│   │       │   ├── http-logger.ts
│   │       │   ├── malformed.ts
│   │       │   └── not-found.ts
│   │       └── utils/                 # Utility functions
│   │           ├── jsend.ts
│   │           ├── logger.ts
│   │           └── path-alias.ts
│   ├── console.ts                     # CLI entry point
│   └── server.ts                      # HTTP server entry point
├── .gitignore                     # Git ignore rules
├── .prettierrc                    # Prettier code formatting configuration
├── eslint.config.mjs              # ESLint config (modular)
├── example.config.yaml               # Example config file for development
├── LICENSE                        # Project license
├── package-lock.json              # NPM lockfile for dependency consistency
├── package.json                   # Project metadata and dependencies
├── README.md                      # Main project README
└── tsconfig.json                  # TypeScript compiler configuration
```

## Recommendation

In a modular monolith, each module should encapsulate its own responsibilities and dependencies. A well-structured module typically includes:

- Business logic (e.g., services, use cases)
- API routes and controllers
- CLI commands (optional)
- Data access (e.g., repository or model layer)
- Migrations (if applicable)
- Event emitters/listeners for internal pub/sub
- Integrations (3rd party APIs, services)
- This separation ensures high cohesion within modules and low coupling between them, making your monolith easier to maintain, test, and eventually extract into microservices if needed.

## Notes

- `src/app/modules/` follows a **modular monolith** pattern: each module is self-contained.
- `shared/` holds middlewares and utilities that can be reused across modules.
- CLI commands are extendable via each module’s `cli/` folder and invoked through `console.ts`.