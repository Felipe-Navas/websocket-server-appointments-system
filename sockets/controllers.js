const AppointmentsControl = require("../models/appointmet");

const appointmentsControl = new AppointmentsControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', appointmentsControl.ultimo);
    socket.emit('estado-actual', appointmentsControl.ultimos4);
    socket.emit('turnos-pendientes', appointmentsControl.turnos.length);


    socket.on('siguiente-turno', ( payload, callback ) => {

        const siguiente = appointmentsControl.siguiente();
        callback( siguiente );

        socket.broadcast.emit('turnos-pendientes', appointmentsControl.turnos.length);
    });

    socket.on('atender-turno', ( { escritorio }, callback) => {
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        };

        const turno = appointmentsControl.atenderTurno( escritorio );

        // Notifico el cambio de los ultimos4
        socket.broadcast.emit('estado-actual', appointmentsControl.ultimos4);

        socket.emit('turnos-pendientes', appointmentsControl.turnos.length);
        socket.broadcast.emit('turnos-pendientes', appointmentsControl.turnos.length);

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
