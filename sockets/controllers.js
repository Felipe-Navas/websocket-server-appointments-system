const AppointmentsControl = require("../models/appointmet");

const appointmentsControl = new AppointmentsControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', appointmentsControl.ultimo);

    socket.on('siguiente-turno', ( payload, callback ) => {

        const siguiente = appointmentsControl.siguiente();
        callback( siguiente );

        // TODO: Notificar que hay un nuevo turno pendiente
    });

    socket.on('atender-turno', ( { escritorio }, callback) => {
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        };

        const turno = appointmentsControl.atenderTurno( escritorio );

        // TODO: Notificar cambio en los ultimos4


        if ( !turno ) {
            callback({
                ok: false,
                msg: 'No hay tickets para atender'
            });
        } else {
            callback({
                ok: true,
                turno
            });
        };
    });
};


module.exports = {
    socketController,
};
