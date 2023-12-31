const lblDesktop = document.querySelector('h1')
const btnAttend = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPendings = document.querySelector('#lblPendings')

const searchParams = new URLSearchParams(window.location.search)
const desktop = searchParams.get('escritorio')

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('Desktop is required')
}

lblDesktop.innerText = desktop
divAlert.style.display = 'none'

// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  btnAttend.disabled = false
})

socket.on('disconnect', () => {
  btnAttend.disabled = true
})

socket.on('pending-tickets', (pendingTickets) => {
  if (pendingTickets === 0) {
    lblPendings.style.display = 'none'
  } else {
    lblPendings.style.display = ''
    lblPendings.innerText = pendingTickets
  }

  console.log(pendingTickets)
})

btnAttend.addEventListener('click', () => {
  socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = 'No hay tickets pendientes'
      // eslint-disable-next-line no-return-assign
      return divAlert.style.display = ''
    }

    lblTicket.innerText = `Ticket ${ticket.number}`
  })
})
