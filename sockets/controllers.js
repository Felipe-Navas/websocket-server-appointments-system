const AppointmentsControl = require("../models/appointmet");

const appointmentsControl = new AppointmentsControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', appointmentsControl.ultimo);

    socket.on('siguiente-turno', ( payload, callback ) => {

        const siguiente = appointmentsControl.siguiente();
        callback( siguiente );

        // TODO: Notificar que hay un nuevo turno pendiente
    });
};


module.exports = {
    socketController,
};
