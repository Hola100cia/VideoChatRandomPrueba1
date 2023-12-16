const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Escucha las señales del cliente y retransmite a otros clientes
    socket.on('signal', (data) => {
        io.emit('signal', { id: socket.id, data });
    });

    // Más lógica de señalización según sea necesario

    // Maneja la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
        // Puedes implementar más lógica aquí
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor de señalización escuchando en el puerto ${PORT}`);
});
