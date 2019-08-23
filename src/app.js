/**
 *  @file Main server application where middleware, routes, and configurations are compiled
 *  @module src/app
 *  @requires {@link https://github.com/expressjs/express express}
 *  @requires {@link https://github.com/expressjs/morgan morgan}
 */

'use strict'

const cwd = process.cwd()

// 3rd-party dependencies
const express = require('express')
const morgan = require('morgan')

// Esoteric resources
const notFound = require(`${cwd}/src/middleware/404.js`)

// Models
const Categories = require('./models/categories')
const categories = new Categories()

// Prepare express app
const app = express()

// Application-level middleware
/** HTTP request logger */
app.use(morgan('dev'))
/** Parses payload as JSON and exposes the resulting object on req.body. Based on body-parser. */
app.use(express.json())
/** Parses URL encoded data  and exposes the resulting object on req.body.
 * Note: browsers typically send form data in this format.
 */
app.use(express.urlencoded({ extended: true }))

// Routes --------------------------------------------------
/** Static route to serve JSDocs */
app.use('/docs', express.static('docs'))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/error', (req, res, next) =>
  next({
    name: 'Test error',
    message: 'This route causes a 500 error on purpose'
  })
)

// Categories
app.get('/categories', getCategories)
app.post('/categories', postCategory)
app.get('/categories/:id', getCategory)
app.put('/categories/:id', putCategory)
app.patch('/categories/:id', patchCategory)
app.delete('/categories/:id', deleteCategory)

function getCategories(req, res, next) {
  // expects an array of object to be returned from the model
  categories
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data
      }
      res.status(200).json(output)
    })
    .catch(next)
}

function getCategory(req, res, next) {
  // expects an array with the one matching record from the model
  categories
    .get(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next)
}

function postCategory(req, res, next) {
  // expects the record that was just added to the database
  categories
    .post(req.body)
    .then(result => res.status(201).json(result))
    .catch(next)
}

function putCategory(req, res, next) {
  // expects the record that was just updated in the database
  categories
    .put(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next)
}

function patchCategory(req, res, next) {
  // expects the record that was just patched in the database
  categories
    .patch(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next)
}

function deleteCategory(req, res, next) {
  // Expects no return value (resource was deleted)
  categories
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next)
}

app.use(notFound)
app.use(errorHandler)

/**
 * Sends a JSON formatted "500 Internal Server Error" response
 *
 * @param {(object|string)} err - Express server error message
 * @param {object} req - Express HTTP request object
 * @param {object} res - Express HTTP response object
 * @param {function} next - Express middleware function
 */
function errorHandler(err, req, res, next) {
  console.error('ERROR:', err)

  const status = err.status || 500,
    error = err.name || 'Unknown Error',
    message = typeof err === 'string' ? err : err.message || 'An error occurred'

  res
    .status(status)
    .json({ status, error, message })
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
