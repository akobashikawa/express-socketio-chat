const { test, expect } = require('@playwright/test');

test('Debe ingresar un nombre y mostrar el saludo', async ({ page }) => {
    // Navegar a la página
    await page.goto('http://localhost:3000/vue/index.html');

    // Seleccionar el campo de texto y escribir "Juan"
    const nameInput = await page.locator('#nameInput');
    await nameInput.fill('Juan');

    // Hacer clic en el botón
    const greetButton = await page.locator('#greetButton');
    await greetButton.click();

    // Verificar que el mensaje de saludo se actualizó correctamente
    const greetingMessage = await page.locator('#greetingMessage');
    await expect(greetingMessage).toHaveText('Hola Juan!*');
});