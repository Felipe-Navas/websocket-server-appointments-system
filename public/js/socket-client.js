// HTML element references
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMessage = document.querySelector('#txtMessage')
const btnSend = document.querySelector('#btnSend')

const socket = io()

socket.on('connect', () => {
  lblOffline.style.display = 'none'
  lblOnline.style.display = ''
})

socket.on('disconnect', () => {
  lblOffline.style.display = ''
  lblOnline.style.display = 'none'
})

btnSend.addEventListener('click', () => {
  const message = txtMessage.value
  const payload = {
    message,
    id: 'asd123!#D',
    date: new Date().getDate(),
  }

  // I emit this event to the server
  socket.emit('send-message-client', payload, (id) => {
    console.log('From the server', id)
  })
})

// I listen to the event coming from the server
socket.on('send-message-server', (payload) => {
  console.log(payload)
  // txtMessage.value = payload.message;
})
