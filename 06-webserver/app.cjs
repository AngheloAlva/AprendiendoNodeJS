const express = require('express')
const hbs = require('hbs')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home', {
    name: 'Anghelo Alva',
    title: 'NodeJS - Express - HBS'
  })
})

app.get('/generic', function (req, res) {
  res.render('generic', {
    name: 'Anghelo Alva',
    title: 'NodeJS - Express - HBS'
  })
})

app.get('/elements', function (req, res) {
  res.render('elements', {
    name: 'Anghelo Alva',
    title: 'NodeJS - Express - HBS'
  })
})

app.get('/index', function (req, res) {
  res.redirect('/')
})

app.get('/*', function (req, res) {
  res.send('404 Not Found')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
