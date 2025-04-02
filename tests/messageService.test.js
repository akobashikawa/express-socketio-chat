import { describe, it, expect } from 'vitest';
import { generateMessage } from '../messageService';

describe('generateMessage', () => {
    it('debería devolver "" si no se proporciona un mensaje', () => {
        expect(generateMessage('')).toBe('');
    });

    it('debería devolver el mensaje si se proporciona un mensaje', () => {
        expect(generateMessage('Hola Mundo!')).toBe('Hola Mundo!');
    });
});