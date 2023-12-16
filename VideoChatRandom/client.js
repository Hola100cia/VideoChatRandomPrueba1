const socket = io();

let localStream;
let peerConnection;

// ... (resto del código)

// Evento para el botón de "Iniciar/Parar"
startStopButton.addEventListener('click', () => {
    startStopClicks++;

    if (startStopClicks === 1) {
        // Primer clic, cambiar a "Parar"
        startStopButton.textContent = 'Parar';
        isRunning = true;

        // Obtener el acceso a la cámara y el micrófono
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localStream = stream;
                localVideo.srcObject = stream;

                // Configurar la conexión de WebRTC aquí
                createPeerConnection();
            })
            .catch(error => {
                console.error('Error al obtener acceso a la cámara y al micrófono:', error);
            });
    } else if (startStopClicks === 2) {
        // Segundo clic, detener la conexión y reiniciar el botón
        startStopButton.textContent = 'Iniciar';
        startStopClicks = 0;
        isRunning = false;
        stopConnection();
    }

    if (isRunning) {
        // Si está en ejecución, conectar con una nueva persona
        connectWithNewPerson();
    }
});

function createPeerConnection() {
    peerConnection = new RTCPeerConnection();

    // Agregar la corriente local a la conexión
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Escuchar eventos de señalización desde el servidor
    socket.on('signal', (data) => {
        if (data.id !== socket.id) {
            handleSignalData(data.data);
        }
    });

    // Escuchar eventos de señalización desde el servidor y enviar señales
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('signal', { id: socket.id, data: { candidate: event.candidate } });
        }
    };

    // Implementar más lógica para manejar la conexión remota
    // como la creación y establecimiento de ofertas y respuestas
}

function handleSignalData(data) {
    // Implementar la lógica para manejar las señales del otro usuario
    // como la creación y establecimiento de ofertas y respuestas,
    // así como el manejo de candidatos ICE
}

function stopConnection() {
    // Lógica para detener la conexión con la otra persona.
    // Esto puede incluir el cierre de la conexión WebRTC.
    console.log('Conexión detenida con la otra persona...');
}

function connectWithNewPerson() {
    // Lógica para conectar con el siguiente usuario.
    // Esto puede incluir la creación de una nueva oferta/respuesta de WebRTC.
    // Recuerda actualizar la interfaz para mostrar la información del nuevo usuario.
    console.log('Conectando con una nueva persona...');
}
