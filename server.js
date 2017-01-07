'use strict'


/**
 * Load modules
 */
const http = require('http')
const express = require('express')
const faker = require('faker')


/**
 * Set port to listening
 * @type {Number}
 */
const PORT = process.env.PORT || 80

/**
 * Setup locale
 * @type {String}
 */
faker.locale = 'pl'

/**
 * Setup express app
 */
const app = express()

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/numbers.json', function (req, res) {
  let numbers = { data:[] }
  let length = req.query.length

  if(!length) length = 10
  else if(length > 50) length = 50

  for (var i = 0; i < length; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    numbers.data.push({
      id: i+1,
      attributes: {
        name: firstName,
        surname: lastName,
        email: faker.internet.email(firstName,lastName),
        phone: faker.phone.phoneNumber(),
        avatar: faker.image.avatar()
      }

    })

  }


  res.json(numbers)
})

app.use('/', express.static('assets'))

/**
 * Setup http server
 */
const server = http.createServer(app).listen(PORT)

server.on('request',(req, res) => {
  console.log(`${new Date().toISOString().replace(/T|Z/g,' ')}: ${res.req.method} : ${res.req.url} `)
})
