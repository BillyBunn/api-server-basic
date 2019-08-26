'use strict'

/**
 * @file Exports a schema for the Categories model
 * @module src/models/categories/categories-model
 */

const schema = {
  _id: { required: true },
  name: { required: true },
  display_name: { required: true },
  description: { required: false },
}

module.exports = schema
