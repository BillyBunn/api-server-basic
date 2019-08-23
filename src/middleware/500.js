'use strict'

/**
 * @file Error-handler middleware
 * @module middleware/500
 */

/**
 * Sends a JSON formatted error response
 * Defaults to status 500 if error thrown does not specify
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

module.exports = errorHandler
