const { generateMessage } = require('./messageService'); // Importar el servicio

function handleMessageSent(socket, io) {
    return (receivedMessage) => {
        console.log(`Mensaje recibido: ${receivedMessage}`);
        const message = generateMessage(receivedMessage); // Usar el servicio para generar el mensaje
        console.log(`Mensaje a enviar: ${message}`);
        // Emitir el mensaje a todos los clientes conectados, incluyendo el senderId
        io.emit('messageReceived', { message, senderId: socket.id });
        // Emitir el nombre solo al cliente que lo envió
        // socket.emit('messageReceived', message);
    };
}

module.exports = {
    handleMessageSent,
};