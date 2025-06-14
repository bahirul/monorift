# Contributing

Your contributions help improve the project for everyone. This guide outlines how to get started.

---

## Prerequisites

- Node.js (>= 20)
- npm
- Git

---

## Getting Started

1. **Fork the repository**  
2. **Clone your fork**

```bash
git clone https://github.com/your-username/monorift.git
cd monorift
```

3. **Install dependencies**

```bash
npm install
```

4. **Run the app**

```bash
npm run dev
```

---

## How to Contribute

### Bug Reports & Feature Requests

- Use [Issues](https://github.com/bahirul/monorift/issues) to report bugs or request features.
- Clearly describe the problem or feature with steps to reproduce or expected behavior.

### Pull Requests

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes.
3. Run linting and formatting:

```bash
npm run lint
```

4. Commit your changes with a meaningful message.
5. Push the branch and open a Pull Request against the `main` branch.

---

## Code Style

- Follow the existing coding style (Prettier + ESLint).
- Use `npm run lint` to check for issues.
- Structure code into modules inside `src/app/modules`.