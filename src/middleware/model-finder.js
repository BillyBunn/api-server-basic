'use strict'

/**
 * @file Data model utilities and middleware
 * @module middleware/model-finder
 */

const { readdir, statSync, lstatSync } = require('fs')
const { promisify } = require('util')

const modelsFolder = `${__dirname}/../models`

function attachModel(req, res, next) {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '')
  req.model = require(`../models/${modelName}/${modelName}-model.js`)
  next()
}

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
