// HTML element references
const lblDesktop = document.querySelector('h1')
const btnAttend = document.querySelector('button')
const lblAppointment = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPending = document.querySelector('#lblPending')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('desktop')) {
  window.location = 'index.html'
  throw new Error('The Desktop is mandatory')
}

const desktop = searchParams.get('desktop')
lblDesktop.innerText = desktop

divAlert.style.display = 'none'

const socket = io()

socket.on('connect', () => {
  btnAttend.disabled = false
})

socket.on('disconnect', () => {
  btnAttend.disabled = true
})

btnAttend.addEventListener('click', () => {
  // I emit this event to the server
  socket.emit('attend-appointment', { desktop }, ({ ok, msg, appointment }) => {
    if (!ok) {
      lblAppointment.innerText = 'Nobody'
      return (divAlert.style.display = '')
    }
    divAlert.style.display = 'none'

    lblAppointment.innerText = `Appointment ${appointment.number}`
  })
})

socket.on('pending-appointments', (pending_appointments) => {
  if (pending_appointments === 0) {
    lblPending.style.display = 'none'
    divAlert.style.display = ''
  } else {
    divAlert.style.display = 'none'
    lblPending.style.display = ''
    lblPending.innerText = pending_appointments
  }
})
