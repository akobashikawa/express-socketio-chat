const { generateMessage } = require('./messageService'); // Importar el servicio

function handleNameSended(socket, io) {
    return (name) => {
        console.log(`Nombre recibido: ${name}`);
        const message = generateMessage(name); // Usar el servicio para generar el mensaje
        console.log(`Mensaje a enviar: ${message}`);
        // Emitir el nombre a todos los clientes conectados
        io.emit('nameReceived', 'broadcast: ' + message);
        // Emitir el nombre al cliente que lo envió
        socket.emit('nameReceived', 'privado: ' + message);
    };
}

module.exports = {
    handleNameSended,
};