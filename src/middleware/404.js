'use strict'

/**
 * @file 404 middleware
 * @module middleware/404
 */

/**
 * Sends a JSON formatted "404 Not Found" response
 *
 * @param {object} req - Express HTTP request object
 * @param {object} res - Express HTTP response object
 * @param {function} next - Express middleware function
 */
module.exports = function notFound(req, res, next) {
  let error = { error: '404 Not Found' }
  res
    .status(404)
    .json(error)
    .end()
}
