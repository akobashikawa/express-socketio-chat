const { test, expect } = require('@playwright/test');

test('Debe ingresar un nombre y mostrar el saludo en la lista', async ({ page }) => {
    // Navegar a la página
    await page.goto('http://localhost:3000/vanilla/index.html');

    // Seleccionar el campo de texto y escribir "Juan"
    const nameInput = await page.locator('#nameInput');
    await nameInput.fill('Juan');

    // Hacer clic en el botón
    const greetButton = await page.locator('#greetButton');
    await greetButton.click();

    // Verificar que el mensaje de saludo se agregó a la lista como "emisor"
    const greetingMessages = await page.locator('#greetingMessages li');
    await expect(greetingMessages).toHaveCount(1); // Verificar que hay un mensaje en la lista
    await expect(greetingMessages.first()).toHaveText('Hola Juan! (mío)'); // Verificar el texto del primer mensaje
});

test('Debe agregar a la lista múltiples saludos', async ({ page }) => {
    // Navegar a la página
    await page.goto('http://localhost:3000/vanilla/index.html');

    // Enviar el primer nombre
    const nameInput = await page.locator('#nameInput');
    await nameInput.fill('Juan');
    const greetButton = await page.locator('#greetButton');
    await greetButton.click();

    // Enviar el segundo nombre
    await nameInput.fill('Maria');
    await greetButton.click();

    // Verificar que ambos mensajes se agregaron a la lista como "emisor"
    const greetingMessages = await page.locator('#greetingMessages li');
    await expect(greetingMessages).toHaveCount(2); // Verificar que hay dos mensajes en la lista
    await expect(greetingMessages.nth(0)).toHaveText('Hola Juan! (mío)'); // Verificar el texto del primer mensaje
    await expect(greetingMessages.nth(1)).toHaveText('Hola Maria! (mío)'); // Verificar el texto del segundo mensaje
});