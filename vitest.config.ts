import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            all: false,
            exclude: [
                './src/app/config/app.config.ts', // Exclude app config from coverage
            ],
        },
    },
});
