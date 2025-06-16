# Logging

This app uses [`winston`](https://www.npmjs.com/package/winston) for custom logging and [`morgan`](https://www.npmjs.com/package/morgan) for HTTP request logging.

---

## Packages Used

- `winston` — Application logging (info, error, debug, etc.)
- `morgan` — HTTP request logs via middleware

---

## Relevant Files

- `src/app/shared/utils/logger.ts` — Custom `winston` logger instance
- `src/app/shared/middlewares/http-logger.ts` — Express middleware using `morgan`

---

## Usage

```ts
import { logger } from '@/app/shared/utils/logger';

logger.info('App started');
logger.error({ action: 'dbConnect', message: err.message });
```

---

## Customization

You can configure log level, format, and output (console/file) in `logger.ts`.

