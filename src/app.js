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



app.use(notFound)

/**
 * Sends a JSON formatted 404 response
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
 * Starts the server at specified port
 *
 * @param {integer} [port=process.env.PORT] - starts the express server at port specified
 */
const start = (port = process.env.PORT) =>
  app.listen(port, () => console.log(`Server up on port ${port}…`))

module.exports = { start }
