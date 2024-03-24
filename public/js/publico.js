
// Referencias de elementos html
const lblTurno1      = document.querySelector('#lblTurno1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTurno2      = document.querySelector('#lblTurno2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTurno3      = document.querySelector('#lblTurno3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblTurno4      = document.querySelector('#lblTurno4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');


const socket = io();

socket.on('current-state', ( payload ) => {

    const audio = new Audio('./audio/new-turno.mp3');
    audio.play();

    const [ turno1, turno2, turno3, turno4 ] = payload;

    if ( turno1 ) {
        lblTurno1.innerText      = 'Turno ' + turno1.numero;
        lblEscritorio1.innerText = 'Escritorio ' + turno1.escritorio;
    };

    if ( turno2 ) {
        lblTurno2.innerText      = 'Turno ' + turno2.numero;
        lblEscritorio2.innerText = 'Escritorio ' + turno2.escritorio;
    };

    if ( turno3 ) {
        lblTurno3.innerText      = 'Turno ' + turno3.numero;
        lblEscritorio3.innerText = 'Escritorio ' + turno3.escritorio;
    };

    if ( turno4 ) {
        lblTurno4.innerText      = 'Turno ' + turno4.numero;
        lblEscritorio4.innerText = 'Escritorio ' + turno4.escritorio;
    };
});
