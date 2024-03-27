const AppointmentsControl = require('../models/appointment')

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

  socket.on('attend-appointment', ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: 'The Desktop is mandatory',
      })
    }

    const appointment = appointmentsControl.attendAppointment(desktop)

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
        msg: 'There are no appointments to attend',
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
