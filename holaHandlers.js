const { generateMessage } = require('./messageService'); // Importar el servicio

function handleNameSended(socket, io) {
    return (name) => {
        console.log(`Nombre recibido: ${name}`);
        const message = generateMessage(name); // Usar el servicio para generar el mensaje
        console.log(`Mensaje a enviar: ${message}`);
        // Emitir el mensaje a todos los clientes conectados, incluyendo el senderId
        io.emit('nameReceived', { message, senderId: socket.id });
        // Emitir el nombre solo al cliente que lo envió
        // socket.emit('nameReceived', message);
    };
}

module.exports = {
    handleNameSended,
};