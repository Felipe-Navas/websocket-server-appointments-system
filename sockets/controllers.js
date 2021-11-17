const Appointment = require("../models/appointmet");

const appointment = new Appointment();


const socketController = (socket) => {

    socket.on('enviar-mensaje-cliente', ( payload, callback ) => {

        const id = 123456;

        // Asi llamo al callback que envio el cliente al servidor
        callback( id );

        // Emito este evento hacia el cliente
        socket.broadcast.emit('enviar-mensaje-servidor', payload);
    });
};


module.exports = {
    socketController,
};
