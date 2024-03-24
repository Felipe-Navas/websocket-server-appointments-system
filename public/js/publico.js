
// Referencias de elementos html
const lblAppointment1      = document.querySelector('#lblAppointment1');
const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblAppointment2      = document.querySelector('#lblAppointment2');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblAppointment3      = document.querySelector('#lblAppointment3');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblAppointment4      = document.querySelector('#lblAppointment4');
const lblDesktop4 = document.querySelector('#lblDesktop4');


const socket = io();

socket.on('current-state', ( payload ) => {

    const audio = new Audio('./audio/new-turno.mp3');
    audio.play();

    const [ turno1, turno2, turno3, turno4 ] = payload;

    if ( turno1 ) {
        lblAppointment1.innerText      = 'Turno ' + turno1.numero;
        lblDesktop1.innerText = 'Desktop ' + turno1.desktop;
    };

    if ( turno2 ) {
        lblAppointment2.innerText      = 'Turno ' + turno2.numero;
        lblDesktop2.innerText = 'Desktop ' + turno2.desktop;
    };

    if ( turno3 ) {
        lblAppointment3.innerText      = 'Turno ' + turno3.numero;
        lblDesktop3.innerText = 'Desktop ' + turno3.desktop;
    };

    if ( turno4 ) {
        lblAppointment4.innerText      = 'Turno ' + turno4.numero;
        lblDesktop4.innerText = 'Desktop ' + turno4.desktop;
    };
});
