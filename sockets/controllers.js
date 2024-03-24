const AppointmentsControl = require('../models/appointmet')

const appointmentsControl = new AppointmentsControl()

const socketController = (socket) => {
  socket.emit('last-appointment', appointmentsControl.last)
  socket.emit('current-state', appointmentsControl.last4)
  socket.emit('pending-appointments', appointmentsControl.appointments.length)

  socket.on('next-appointment', (payload, callback) => {
    const nextAppointment = appointmentsControl.nextAppointment()
    callback(nextAppointment)

    socket.broadcast.emit(
      'pending-appointments',
      appointmentsControl.appointments.length
    )
  })

  socket.on('atender-turno', ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: 'The Desktop is mandatory',
      })
    }

    const appointment = appointmentsControl.atenderTurno(desktop)

    // I notify the change of the last 4
    socket.broadcast.emit('current-state', appointmentsControl.last4)

    socket.emit('pending-appointments', appointmentsControl.appointments.length)
    socket.broadcast.emit(
      'pending-appointments',
      appointmentsControl.appointments.length
    )

    if (!appointment) {
      callback({
        ok: false,
        msg: 'No hay turnos para atender',
      })
    } else {
      callback({
        ok: true,
        appointment,
      })
    }
  })
}

module.exports = {
  socketController,
}
