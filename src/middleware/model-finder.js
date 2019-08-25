'use strict'

/**
 * @file Data model utilities and middleware
 * @module middleware/model-finder
 *  @requires {@link https://nodejs.org/api/fs.html#fs_file_system fs}
 *  @requires {@link https://nodejs.org/api/util.html#util_util util}
 */

const { readdir, statSync, lstatSync } = require('fs')
const { promisify } = require('util')

const modelsFolder = `${__dirname}/../models`

/**
 * Evaluates req.params.model (i.e. /api/v1/:model/) and attaches an instance of the specified model onto the Express request object
 * @param {object} req - Express HTTP request object
 * @param {object} res - Express HTTP response object
 * @param {function} next - Express middleware function
 */
function attachModel(req, res, next) {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '')
  req.model = require(`../models/${modelName}/${modelName}-model.js`)
  next()
}

/**
 * Lists all available models in the 'src/models/' directory using the Node file system module
 * @returns {Promise<array>} A promise that contains an array of all available data models
 */
function listModels() {
  return promisify(readdir)(modelsFolder)
    .then(contents =>
      contents.filter(
        item =>
          lstatSync(`${modelsFolder}/${item}`).isDirectory() &&
          statSync(`${modelsFolder}/${item}/${item}-model.js`)
      )
    )
    .catch(console.error)
}

module.exports = { attachModel, listModels }
