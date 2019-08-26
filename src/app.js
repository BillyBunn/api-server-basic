/**
 *  @file Main server application where middleware, routes, and configurations are compiled
 *  @module src/app
 *  @requires {@link https://github.com/expressjs/express express}
 *  @requires {@link https://github.com/expressjs/morgan morgan}
 *  @requires {@link https://github.com/expressjs/cors cors}
 *  @requires src/api/v1
 *  @requires src/middleware/404
 *  @requires src/middleware/500
 */

'use strict'

const cwd = process.cwd()

// 3rd-party dependencies
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// Esoteric resources
const v1Router = require(`${cwd}/src/api/v1`)
const notFound = require(`${cwd}/src/middleware/404`)
const errorHandler = require(`${cwd}/src/middleware/500`)

// Prepare express app
const app = express()

// Application-level middleware
/** HTTP request logger */
app.use(morgan('dev'))

/** Shares resources from cross-origin requests */
app.use(cors())

/** Parses payload as JSON and exposes the resulting object on req.body. Based on body-parser. */
app.use(express.json())

/** Parses URL encoded data  and exposes the resulting object on req.body.
 * Note: browsers typically send form data in this format.
 */
app.use(express.urlencoded({ extended: true }))

// Routes
/** Static route to serve JSDocs */
app.use('/docs', express.static('docs'))

/** Test routes */
app.get('/', (req, res) =>
  res.send(`
<h1>REST API Server</h1>
<h3>Created by <a href="https://billybunn.com/">Billy Bunn</a></h3>
<p>Welcome to my basic REST API server, built with <a href="https://expressjs.com/">Express</a> in <a href="https://nodejs.org/">Node.js</a>.</p>
<p>Check out <a href="https://github.com/BillyBunn/api-server-basic">the README on Github</a> to learn how to use it and how it was built.</p>
`)
)
app.get('/error', (req, res, next) =>
  next({
    name: 'Test error',
    message: 'This route causes a 500 error on purpose'
  })
)

app.use(v1Router)

app.use(notFound)
app.use(errorHandler)

/**
 * Starts the server at specified port
 *
 * @param {integer} [port=process.env.PORT] - starts the express server at port specified
 */
const start = (port = process.env.PORT || 3000) =>
  app.listen(port, () => console.log(`Server up on port ${port}…`))

module.exports = { start, app }
