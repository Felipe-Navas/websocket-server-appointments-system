
// Referencias de elementos html
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');


const socket = io();

socket.on('connect', () => {
    // console.log('conectado');
    
    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    lblOffline.style.display = '';
    lblOnline.style.display  = 'none';
});

btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: 'asd123!#D',
        fecha: new Date().getDate()
    };
    
    // Emito este evento hacia el servidor
    socket.emit( 'enviar-mensaje-cliente', payload, ( id ) => {
        console.log('Desde el server', id);
    } );
});

// Escucho el evento que viene desde el servidor
socket.on('enviar-mensaje-servidor', (payload) => {

    console.log(payload);
    // txtMensaje.value = payload.mensaje;
});
