/**
 *  @file Main server application where middleware, routes, and configurations are compiled
 *  @module src/app
 *  @requires {@link https://github.com/expressjs/express express}
 *  @requires {@link https://github.com/expressjs/morgan morgan}
 */

'use strict'

// 3rd-party dependencies
const express = require('express')
const morgan = require('morgan')

// Prepare express app
const app = express()

// Application-level middleware
/** HTTP request logger */
app.use(morgan('dev'))

// Routes
/** Static route to serve JSDocs */
app.use('/docs', express.static('docs'))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/error', (req, res, next) => next('error on purpose'))

app.use(notFound)
app.use(errorHandler)

/**
 * Sends a JSON formatted "404 Not Found" response
 *
 * @param {object} req - Express HTTP request object
 * @param {object} res - Express HTTP response object
 * @param {function} next - Express middleware function
 */
function notFound(req, res, next) {
  let error = { error: '404 Not Found' }
  res
    .status(404)
    .json(error)
    .end()
}

/**
 * Sends a JSON formatted "500 Internal Server Error" response
 *
 * @param {(object|string)} err - Express server error message
 * @param {object} req - Express HTTP request object
 * @param {object} res - Express HTTP response object
 * @param {function} next - Express middleware function
 */
function errorHandler(err, req, res, next) {
  console.log('BOOYAH', typeof err)
  console.log({ err })
  let error = { error: err }
  res
    .status(500)
    .json(error)
    .end()
}

/**
 * Starts the server at specified port
 *
 * @param {integer} [port=process.env.PORT] - starts the express server at port specified
 */
const start = (port = process.env.PORT) =>
  app.listen(port, () => console.log(`Server up on port ${port}…`))

module.exports = { start }
