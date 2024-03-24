// Referencias de elementos html
const lblDesktop = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblAppointment      = document.querySelector('small');
const divAlert     = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');


const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desktop') ) {

    window.location = 'index.html';
    throw new Error('The Desktop is mandatory');
};


const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

btnAtender.addEventListener( 'click', () => {

    // Emito este evento hacia el servidor
    socket.emit( 'atender-turno', { desktop }, ( { ok, msg, turno } ) => {
        if ( !ok ) {
            lblAppointment.innerText = 'Nadie';
            return divAlert.style.display = '';
        };
        divAlert.style.display = 'none';

        lblAppointment.innerText = `Turno ${ turno.numero }`;
    });
});

socket.on('pending-appointments', ( turnos_pendientes ) => {

    if ( turnos_pendientes === 0) {
        lblPending.style.display = 'none';
        divAlert.style.display = '';
    } else {
        divAlert.style.display = 'none';
        lblPending.style.display = '';
        lblPending.innerText = turnos_pendientes;
    };
});
