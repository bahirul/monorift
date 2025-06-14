# Getting Started

Welcome to **Monorift**, a boilerplate for building modular Express APIs using a monolithic architecture. This guide will help you get your project up and running quickly.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Creating a New Project

Clone the repository:

```bash
git clone https://github.com/bahirul/monorift.git my-app
cd my-app
npm install
```

> 💡 You can rename `my-app` to whatever fits your project.

## Running the Project

After installing dependencies, start the development server:

```bash
npm run dev
```

By default, the server will run on `http://localhost:50002`.

You can also build and run the app in production mode:

```bash
npm run build
npm start
```

## Project Structure

Here's a quick look at the default folder layout:

```
my-app/
├── bin/                    # CLI scripts (e.g., create project command)
├── docs/                   # Project documentation
├── logs/                   # Runtime and error logs
├── src/                    # Application source code
│   ├── app/
│   │   ├── modules/        # Feature modules (e.g., default)
│   │   │   └── default/
│   │   │       ├── cli/            # Module-specific CLI commands
│   │   │       ├── controllers/    # Business logic handlers
│   │   │       └── routes/         # Express route definitions
│   │   └── shared/         # Common code reused across modules
│   │       ├── middlewares/       # Express middlewares (error handling, logging)
│   │       └── utils/             # Helper functions and tools
│   ├── config/             #  Application configuration
│   ├── console.ts          # Entrypoint for CLI tools
│   └── env.ts              # Environment loading script
│   └── server.ts           # Entrypoint for HTTP server
├── .env.development.example    # Enviroment file example
├── .gitignore              # .gitignore 
├── .prettierrc             # Prettier rules
├── .eslint.config.mjs      # Linting rules
├── LICENSE                 # Project license
├── README.md               # Project overview
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript compiler config
```

## Environment Variables

To get started, copy the example file:

```bash
cp .env.development.example .env
```

You can maintain separate environment files for different stages:
- `.env.development` – for development
- `.env.prodcution` – for procution


You can extend this as needed (e.g., add DB connection strings, secrets, etc.).

## Next Steps

- Learn about the [folder structure](folder-structure.md)
- See how to [configure the application](configuration.md)
- Explore [routing and modules](routing.md)

---

Need help or want to contribute? Check the [contributing guide](contributing.md).