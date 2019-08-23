'use strict'

const MemoryModel = require('../memory-model')

const schema = {
  _id: { required: true },
  name: { required: true },
  display_name: { required: true },
  not_required: { required: false },
  required_not_specified: { something: 10 }
}

class Categories extends MemoryModel {}

module.exports = new Categories(schema)
