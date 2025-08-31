import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            all: false,
            exclude: [
                './src/app/config/app.config.ts', // exclude app config from coverage
            ],
        },
    },
});
