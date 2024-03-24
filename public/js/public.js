// HTML element references
const lblAppointment1 = document.querySelector('#lblAppointment1')
const lblDesktop1 = document.querySelector('#lblDesktop1')
const lblAppointment2 = document.querySelector('#lblAppointment2')
const lblDesktop2 = document.querySelector('#lblDesktop2')
const lblAppointment3 = document.querySelector('#lblAppointment3')
const lblDesktop3 = document.querySelector('#lblDesktop3')
const lblAppointment4 = document.querySelector('#lblAppointment4')
const lblDesktop4 = document.querySelector('#lblDesktop4')

const socket = io()

socket.on('current-state', (payload) => {
  const audio = new Audio('./audio/new-appointment.mp3')
  audio.play()

  const [appointment1, appointment2, appointment3, appointment4] = payload

  if (appointment1) {
    lblAppointment1.innerText = 'Appointment ' + appointment1.number
    lblDesktop1.innerText = 'Desktop ' + appointment1.desktop
  }

  if (appointment2) {
    lblAppointment2.innerText = 'Appointment ' + appointment2.number
    lblDesktop2.innerText = 'Desktop ' + appointment2.desktop
  }

  if (appointment3) {
    lblAppointment3.innerText = 'Appointment ' + appointment3.number
    lblDesktop3.innerText = 'Desktop ' + appointment3.desktop
  }

  if (appointment4) {
    lblAppointment4.innerText = 'Appointment ' + appointment4.number
    lblDesktop4.innerText = 'Desktop ' + appointment4.desktop
  }
})
