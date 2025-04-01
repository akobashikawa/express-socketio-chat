import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.js'], // Solo incluir pruebas en el directorio tests/
    },
});