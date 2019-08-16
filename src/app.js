/**
 *  @file Main server application where middleware, routes, and configurations are compiled
 *  @module src/app
 *  @requires {@link https://github.com/expressjs/express express}
 */

'use strict'

// 3rd-party dependencies
const express = require('express')

// Prepare express app
const app = express()

// Routes
//  --- Static Routes
app.use('/docs', express.static('docs'))

app.get('/', (req, res) => res.send('Hello World!'))

/**
 * Starts the server at specified port
 *
 * @param {integer} [port=process.env.PORT] - starts the express server at port specified
 */
const start = (port = process.env.PORT) =>
  app.listen(port, () => console.log(`Server up on port ${port}…`))

module.exports = { start }
