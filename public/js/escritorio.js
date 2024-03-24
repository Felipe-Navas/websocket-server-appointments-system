// Referencias de elementos html
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTurno      = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ) {

    window.location = 'index.html';
    throw new Error('The Desktop is mandatory');
};


const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

btnAtender.addEventListener( 'click', () => {

    // Emito este evento hacia el servidor
    socket.emit( 'atender-turno', { escritorio }, ( { ok, msg, turno } ) => {
        if ( !ok ) {
            lblTurno.innerText = 'Nadie';
            return divAlerta.style.display = '';
        };
        divAlerta.style.display = 'none';

        lblTurno.innerText = `Turno ${ turno.numero }`;
    });
});

socket.on('pending-appointments', ( turnos_pendientes ) => {

    if ( turnos_pendientes === 0) {
        lblPendientes.style.display = 'none';
        divAlerta.style.display = '';
    } else {
        divAlerta.style.display = 'none';
        lblPendientes.style.display = '';
        lblPendientes.innerText = turnos_pendientes;
    };
});
