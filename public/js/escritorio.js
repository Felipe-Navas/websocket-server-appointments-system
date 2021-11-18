
const searchParams = new URLSearchParams( window.location.search );

if ( searchParams.has('escritorio') ) {

    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
};


const 