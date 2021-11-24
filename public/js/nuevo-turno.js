// Referencias de elementos html
const lblNuevoTurno = document.getElementById('lblNuevoTurno');
const btnCrearbutton = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    // console.log('conectado');
    
    btnCrearbutton.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    
    btnCrearbutton.disabled = true;
});

btnCrearbutton.addEventListener( 'click', () => {
    
    // Emito este evento hacia el servidor
    socket.emit( 'siguiente-turno', null, ( turno ) => {
        lblNuevoTurno.innerText = turno;
    } );
});

socket.on('ultimo-turno', (ultimo) => {

    lblNuevoTurno.innerText = 'Turno ' + ultimo;
});
