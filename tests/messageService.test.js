import { describe, it, expect } from 'vitest';
import { generateMessage } from '../messageService';

describe('generateMessage', () => {
    it('debería devolver "Hola!" si no se proporciona un nombre', () => {
        expect(generateMessage('')).toBe('Hola!');
    });

    it('debería devolver "Hola [nombre]!" si se proporciona un nombre', () => {
        expect(generateMessage('Juan')).toBe('Hola Juan!');
    });
});