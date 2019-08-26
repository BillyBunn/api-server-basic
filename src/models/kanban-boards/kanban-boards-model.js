'use strict'

const MongoController = require('../mongo')

const mongoose = require('mongoose')
require('mongoose-schema-jsonschema')(mongoose)

/**
 * Mongoose schema
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const schema = mongoose.Schema({
  name: { type: String, required: true },
  columns: {
    type: [String],
    default: ['To do', 'In progress', 'Review', 'Done'],
    validate: [
      function() {
        return this.columns.length <= 5
      },
      'Field "{PATH}" exceeds the limit of 5'
    ],
    required: true
  },
  description: { type: String }
})

/**
 * Compiles schema into a model.
 * A model is a class with which we construct documents.
 * Each document will be a kanban board with properties and behaviors as declared in our schema.
 * 'KanbanBoard' refers to the singular name of the collection the model is for (kanbanboards)
 */
const model = mongoose.model('kanbanboard', schema)

class KanbanBoard extends MongoController {}

/** Exports an instance of a KanbanBoard class with CRUD operations */
module.exports = new KanbanBoard(model)
