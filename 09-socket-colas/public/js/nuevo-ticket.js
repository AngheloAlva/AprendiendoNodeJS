const lblNewTicket = document.querySelector('#lblNewTicket')
const btnCreate = document.querySelector('button')

// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  btnCreate.disabled = false
})

socket.on('disconnect', () => {
  btnCreate.disabled = true
})

socket.on('last-ticket', (last) => {
  lblNewTicket.innerText = 'Ticket ' + last
})

btnCreate.addEventListener('click', () => {
  socket.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket
  })
})
