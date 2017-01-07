'use strict'

const PORT = process.env.APP_PORT || 1337

const express = require('express')
const app = express()

const faker = require('faker')
faker.locale = 'pl'

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

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})
