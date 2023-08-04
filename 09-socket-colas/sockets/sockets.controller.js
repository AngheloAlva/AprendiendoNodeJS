/* eslint-disable n/no-callback-literal */
const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl()

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last)

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.next()
    callback(next)

    // TODO: Notify ticket pending
  })

  socket.on('attend-ticket', ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: 'Desktop is required'
      })
    }

    const ticket = ticketControl.attendTicket(desktop)
    if (!ticket) {
      callback({
        ok: false,
        msg: 'No hay tickets pendientes'
      })
    } else {
      callback({
        ok: true,
        ticket
      })
    }
  })
}

module.exports = {
  socketController
}
