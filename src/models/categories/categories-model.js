'use strict'

/**
 * @file Exports an instance of the Categories model
 * @module src/models/categories/categories-model
 * @requires {@link https://github.com/kelektiv/node-uuid uuid}
 * @requires src/models/categories/categories-schema
 */

const MemoryModel = require('../memory')

const schema = require('./categories.schema')

/**
 * Class representing a Category. Extends the memory model class to create a Categories class.
 * @class Categories
 * @extends {MemoryModel}
 */
class Categories extends MemoryModel {
  static sampleRecord() {
    return {
      _id: '12345',
      name: 'electronics',
      display_name: 'Electronics, Computers & Office',
      description: '',
    }
  }
}

module.exports = new Categories(schema)
