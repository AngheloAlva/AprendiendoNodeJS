const lblTicket1 = document.querySelector('#lblTicket1')
const lblTicket2 = document.querySelector('#lblTicket2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblTicket4 = document.querySelector('#lblTicket4')
const lblDesktop1 = document.querySelector('#lblEscritorio1')
const lblDesktop2 = document.querySelector('#lblEscritorio2')
const lblDesktop3 = document.querySelector('#lblEscritorio3')
const lblDesktop4 = document.querySelector('#lblEscritorio4')

// eslint-disable-next-line no-undef
const socket = io()

socket.on('actual-state', (payload) => {
  const [ticket1, ticket2, ticket3, ticket4] = payload

  if (ticket1) {
    lblTicket1.innerText = `Ticket ${ticket1.number}`
    lblDesktop1.innerText = ticket1.desktop
  } else {
    lblTicket1.innerText = '...'
    lblDesktop1.innerText = '...'
  }

  if (ticket2) {
    lblTicket2.innerText = `Ticket ${ticket2.number}`
    lblDesktop2.innerText = ticket2.desktop
  } else {
    lblTicket2.innerText = '...'
    lblDesktop2.innerText = '...'
  }

  if (ticket3) {
    lblTicket3.innerText = `Ticket ${ticket3.number}`
    lblDesktop3.innerText = ticket3.desktop
  } else {
    lblTicket3.innerText = '...'
    lblDesktop3.innerText = '...'
  }

  if (ticket4) {
    lblTicket4.innerText = `Ticket ${ticket4.number}`
    lblDesktop4.innerText = ticket4.desktop
  } else {
    lblTicket4.innerText = '...'
    lblDesktop4.innerText = '...'
  }
})
