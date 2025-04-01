const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { handleMessageSent } = require('./messageHandlers'); // Importar el controlador

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos (como index.html)
app.use(express.static(__dirname + '/public'));

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Usar el controlador para manejar 'messageSent'
    socket.on('messageSent', handleMessageSent(socket, io));

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});