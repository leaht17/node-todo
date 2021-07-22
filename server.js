// set up
const express = require('express')
const mongoose = require('mongoose')        // mongoose for mongodb
const morgan = require('morgan')            // log requests to console (express4)
const bodyParser = require('body-parser')   // pull info from HTML POST (express4)
const methodOverride = require('method-override')   // stimulate DELETE and PUT (express4)

const db = mongoose.connection
const dbConfig = require('./config/database')

const app = express()                     // create app with express
const port = process.env.PORT || 8080

// configuration
mongoose.connect(process.env.CUSTOMCONNSTR_MyConnectionString || dbConfig.connection)     // connect to mongodb database

db.on('error', (err) => {
  console.error(err.message)
  mongoose.disconnect()
})

db.on('disconnected', () => {
  mongoose.connect(dbConfig.connection)
})

app.use(express.static('./public'))
app.use(morgan('dev'))                    // log every request to console
app.use(bodyParser.urlencoded({ 'extended': true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride('X-HTTP-Method-Override'))

// routes
require('./app/routes.js')(app)

// listen (start app with node server.js)
app.listen(port)
console.log(`App listening on port ${port}`)
