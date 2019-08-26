'use strict'

const MongoController = require('../mongo')

const mongoose = require('mongoose')
require('mongoose-schema-jsonschema')(mongoose)

/**
 * Mongoose schema
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const schema = mongoose.Schema({
  text: { type: String, required: true },
  board_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'kanbanboard',
    required: true
  },
  column_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'kanbanboard.columns',
    required: true
  },
  complete: { type: Boolean, required: true, default: false }
})

/**
 * Compiles schema into a model.
 * A model is a class with which we construct documents.
 * Each document will be a kanban card with properties and behaviors as declared in our schema.
 * 'KanbanCard' refers to the singular name of the collection the model is for (kanbancards)
 */
const model = mongoose.model('kanbancard', schema)

class KanbanCard extends MongoController {}

/** Exports an instance of a KanbanCard class with CRUD operations */
module.exports = new KanbanCard(model)

/*
Example entry using HTTPie:

echo '{
  "text":"This is a task",
  "board_id":"_______",
  "column_id":"______",
}' | http :3000/api/v1/kanban-cards

*/