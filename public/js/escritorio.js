// Referencias de elementos html
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTurno      = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');


const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ) {

    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
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

        lblTurno.innerText = `Ticket ${ turno.numero }`;
    });
});

socket.on('ultimo-ticket', (ultimo) => {

    // lblNuevoTurno.innerText = 'Turno' + ultimo;
});
