const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos (como index.html)
app.use(express.static(__dirname + '/public'));

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Escuchar el evento 'nameSended' desde el cliente
    socket.on('nameSended', (name) => {
        console.log(`Nombre recibido: ${name}`);
        const message = `Hola ${name}!`;
        // Emitir el nombre a todos los clientes conectados
        io.emit('nameReceived', message);
        // Emitir el nombre al cliente que lo envió
        socket.emit('nameReceived', message + '*');
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});