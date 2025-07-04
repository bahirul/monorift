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

## Configuration files

To get started, copy the example file:

```bash
cp example.config.yaml config.yaml
```

You can maintain separate configuration files for different stages:
- `config.development.yaml` – for development
- `config.production.yaml` – for production

`config/app.ts` will automatically load the appropriate configuration file based on the `NODE_ENV` environment variable.

## Next Steps

- Learn about the [folder structure](folder-structure.md)
- See how to [configure the application](configuration.md)
- Explore [routing and modules](routing.md)

---

Need help or want to contribute? Check the [contributing guide](contributing.md).