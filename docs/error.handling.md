# Error Handling

This app follows the official [Express.js Error Handling Guide](https://expressjs.com/en/guide/error-handling.html).

---

## Location

Error handling middleware is defined in:

- `src/http.ts` → Global error handler and 404 middleware

---

## Error Middleware Example

```ts
app.use((err: Error, req: Request, res: Response) => {
  logger.error({
    action: 'errorHandler',
    message: err.message,
    stack: appConfig.env === 'development' ? err.stack : undefined,
  });

  res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});
```

---

## Notes

- Always place error-handling middleware **after** all routes.
- Customize the response message and log stack traces only in development.

