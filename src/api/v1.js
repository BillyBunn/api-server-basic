'use strict'

/**
 * @file API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), patch(), .delete())
 * @module src/api/v1
 * @requires {@link https://github.com/expressjs/express express}
 * @requires src/middleware/model-finder
 */

const cwd = process.cwd()

const express = require('express')

const {
  attachModel,
  listModels
} = require(`${cwd}/src/middleware/model-finder.js`)

const router = express.Router()

/** Evaluate the model, dynamically */
router.param('model', attachModel)

/** List array of available models */
router.get('/api/v1/models', (req, res) => {
  listModels().then(models => res.status(200).json(models))
})

/** Return the schema for a model in JSON format */
router.get('/api/v1/:model/schema', (req, res) => {
  console.log('req.model', req.model)
  res.status(200).json(req.model.jsonSchema());
});

// API routes
router.get('/api/v1/:model', handleGetAll)
router.post('/api/v1/:model', handlePost)
router.get('/api/v1/:model/:id', handleGetOne)
router.put('/api/v1/:model/:id', handlePut)
router.patch('/api/v1/:model/:id', handlePatch)
router.delete('/api/v1/:model/:id', handleDelete)

function handleGetAll(req, res, next) {
  // expects an array of object to be returned from the model
  req.model
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

function handleGetOne(req, res, next) {
  // expects an array with the one matching record from the model
  req.model
    .get(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next)
}

function handlePost(req, res, next) {
  // expects the record that was just added to the database
  req.model
    .post(req.body)
    .then(result => res.status(201).json(result))
    .catch(next)
}

function handlePut(req, res, next) {
  // expects the record that was just updated in the database
  req.model
    .put(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next)
}

function handlePatch(req, res, next) {
  // expects the record that was just patched in the database
  req.model
    .patch(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next)
}

function handleDelete(req, res, next) {
  // Expects no return value (resource was deleted)
  req.model
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next)
}

module.exports = router
