const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const messageTxt = document.querySelector('#messageTxt')
const sendBtn = document.querySelector('#sendBtn')

// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  lblOnline.style.display = ''
  lblOffline.style.display = 'none'
})

socket.on('disconnect', () => {
  console.log('Desconectado')

  lblOnline.style.display = 'none'
  lblOffline.style.display = ''
})

socket.on('send-message', (payload) => {
  console.log(payload)
})

sendBtn.addEventListener('click', () => {
  const message = messageTxt.value
  const payload = {
    message,
    id: '123ABC',
    date: new Date().getTime()
  }

  socket.emit('send-message', payload, (id) => {
    console.log('Desde el server', id)
  })
})
