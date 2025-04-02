import { defineConfig } from '@playwright/test';

export default defineConfig({
    testMatch: ['public/vanilla/vanilla-e2e.test.js', 'public/vue-simple/vue-simple-e2e.test.js'],
    workers: 1,
});