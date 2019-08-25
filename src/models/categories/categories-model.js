'use strict'

/**
 * @file Categories
 * @module src/models/memory-model
 * @requires {@link https://github.com/kelektiv/node-uuid uuid}
 */


// Exports an instance of a data model for categories.

const MemoryModel = require('../memory-model')

const schema = {
  _id: { required: true },
  name: { required: true },
  display_name: { required: true },
  not_required: { required: false },
  required_not_specified: { something: 10 }
}

/**
 * Class representing a Category. Extends the memory model class to create a Categories class.
 * @class Categories
 * @extends {MemoryModel}
 */
class Categories extends MemoryModel {}

module.exports = new Categories(schema)
