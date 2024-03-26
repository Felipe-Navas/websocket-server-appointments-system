// HTML element references
const lblNewAppointment = document.getElementById('lblNewAppointment')
const btnGenerateAppointment = document.querySelector('button')

const socket = io()

socket.on('connect', () => {
  btnGenerateAppointment.disabled = false
})

socket.on('disconnect', () => {
  btnGenerateAppointment.disabled = true
})

btnGenerateAppointment.addEventListener('click', () => {
  // I emit this event to the server
  socket.emit('next-appointment', null, (appointment) => {
    lblNewAppointment.innerText = appointment
  })
})

socket.on('last-appointment', (last) => {
  lblNewAppointment.innerText = 'Appointment ' + last
})
