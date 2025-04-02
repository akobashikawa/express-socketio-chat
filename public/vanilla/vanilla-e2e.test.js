const { test, expect } = require('@playwright/test');

test('Debe ingresar un mensaje y mostrarlo en la lista', async ({ page }) => {
    // Navegar a la página
    await page.goto('http://localhost:3000/vanilla/index.html');

    // Seleccionar el campo de texto y escribir "Juan"
    const messageInput = await page.locator('#messageInput');
    await messageInput.fill('Hola Juan');

    // Hacer clic en el botón
    const sendButton = await page.locator('#sendButton');
    await sendButton.click();

    // Verificar que el mensaje se agregó a la lista como "emisor"
    const receivedMessages = await page.locator('#receivedMessages li');
    await expect(receivedMessages).toHaveCount(1); // Verificar que hay un mensaje en la lista
    await expect(receivedMessages.first()).toHaveText('Hola Juan'); // Verificar el texto del primer mensaje
});

test('Debe agregar a la lista múltiples mensajes', async ({ page }) => {
    // Navegar a la página
    await page.goto('http://localhost:3000/vanilla/index.html');

    // Enviar el primer nombre
    const messageInput = await page.locator('#messageInput');
    await messageInput.fill('Hola Juan');
    const sendButton = await page.locator('#sendButton');
    await sendButton.click();

    // Enviar el segundo nombre
    await messageInput.fill('Hola Maria');
    await sendButton.click();

    // Verificar que ambos mensajes se agregaron a la lista como "emisor"
    const receivedMessages = await page.locator('#receivedMessages li');
    await expect(receivedMessages).toHaveCount(2); // Verificar que hay dos mensajes en la lista
    await expect(receivedMessages.nth(0)).toHaveText('Hola Juan'); // Verificar el texto del primer mensaje
    await expect(receivedMessages.nth(1)).toHaveText('Hola Maria'); // Verificar el texto del segundo mensaje
});

test('Debe ingresar un mensaje y mostrarlo en la lista como propio', async ({ page }) => {
    // Navegar a la página
    await page.goto('http://localhost:3000/vanilla/index.html');

    // Seleccionar el campo de texto y escribir "Hola Juan"
    const messageInput = await page.locator('#messageInput');
    await messageInput.fill('Hola Juan');

    // Hacer clic en el botón
    const sendButton = await page.locator('#sendButton');
    await sendButton.click();

    // Verificar que el mensaje se agregó a la lista como "propio"
    const receivedMessages = await page.locator('#receivedMessages li');
    await expect(receivedMessages).toHaveCount(1); // Verificar que hay un mensaje en la lista
    await expect(receivedMessages.first()).toHaveClass(/mine/); // Verificar que tiene la clase "mine"
    await expect(receivedMessages.first()).toHaveText('Hola Juan'); // Verificar el texto del mensaje
});

test('Debe agregar múltiples mensajes a la lista como propios', async ({ page }) => {
    // Navegar a la página
    await page.goto('http://localhost:3000/vanilla/index.html');

    // Enviar el primer mensaje
    const messageInput = await page.locator('#messageInput');
    await messageInput.fill('Hola Juan');
    const sendButton = await page.locator('#sendButton');
    await sendButton.click();

    // Enviar el segundo mensaje
    await messageInput.fill('Hola Maria');
    await sendButton.click();

    // Verificar que ambos mensajes se agregaron a la lista como "propios"
    const receivedMessages = await page.locator('#receivedMessages li');
    await expect(receivedMessages).toHaveCount(2); // Verificar que hay dos mensajes en la lista
    await expect(receivedMessages.nth(0)).toHaveClass(/mine/); // Verificar que el primer mensaje tiene la clase "mine"
    await expect(receivedMessages.nth(0)).toHaveText('Hola Juan'); // Verificar el texto del primer mensaje
    await expect(receivedMessages.nth(1)).toHaveClass(/mine/); // Verificar que el segundo mensaje tiene la clase "mine"
    await expect(receivedMessages.nth(1)).toHaveText('Hola Maria'); // Verificar el texto del segundo mensaje
});

test('Debe mostrar mensajes de otros clientes con su clientId', async ({ page, browser }) => {
    // Crear dos contextos de navegador para simular dos clientes
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Navegar a la página en ambos contextos
    await page1.goto('http://localhost:3000/vanilla/index.html');
    await page2.goto('http://localhost:3000/vanilla/index.html');

    // Obtener el clientId del segundo cliente
    // const clientId2 = await page2.evaluate(() => socket.id);
    const clientId2 = await page2.waitForFunction(() => socket.id);// safer

    // Enviar un mensaje desde el segundo cliente
    const messageInput2 = await page2.locator('#messageInput');
    await messageInput2.fill('Hola desde el cliente 2');
    const sendButton2 = await page2.locator('#sendButton');
    await sendButton2.click();

    // Verificar que el primer cliente ve el mensaje del segundo cliente con su clientId
    const receivedMessages1 = await page1.locator('#receivedMessages li');
    await expect(receivedMessages1).toHaveCount(1); // Verificar que hay un mensaje en la lista
    await expect(receivedMessages1.first()).toHaveText(`Hola desde el cliente 2 (from ${clientId2})`); // Verificar el texto del mensaje
});