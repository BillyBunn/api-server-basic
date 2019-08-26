'use strict'

const MongoController = require('../mongo')

const mongoose = require('mongoose')
require('mongoose-schema-jsonschema')(mongoose)

const columnSchema = mongoose.Schema({ name: { type: String, required: true } })

/**
 * Mongoose schema
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    columns: {
      type: [columnSchema],
      default: [
        { name: 'To do' },
        { name: 'In progress' },
        { name: 'Review' },
        { name: 'Done' }
      ],
      validate: [
        function() {
          return this.columns.length <= 5
        },
        'Field "{PATH}" exceeds the limit of 5'
      ],
      required: true
    },
    description: { type: String }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

schema.virtual('tasks', {
  ref: 'kanbancard',
  localField: '_id',
  foreignField: 'board_id',
  justOne: false
})

schema.pre('find', function() {
  try {
    this.populate('tasks')
  } catch (e) {
    console.error('Find Error', e)
  }
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

/*
echo '{"columns":[{"name":"To do"}, {"name":"In progress"}, {"name":"Review"}, {"name":"Done"}], "name": "1st Board"}' | http :3000/api/v1/kanban-boards

echo '{"columns":[{"name":"waiting"}, {"name":"working"}, {"name":"review"}, {"name":"complete"}, {"name":"celebrate"}], "name": "1st Board"}' | http :3000/api/v1/kanban-boards

echo '{"columns":["To do", "In progress", "Review", "Done"], "name": "1st Board"}' | http :3000/api/v1/kanban-boards

echo '{"name": "1st Board"}' | http :3000/api/v1/kanban-boards

echo '{"columns":["waiting", "working", "review", "complete", "celebrate"], "name": "2nd Board"}' | http :3000/api/v1/kanban-boards
*/
// "[{"name":"To do"}, {"name":"In progress"}, {"name":"Review"}, {"name":"Done"}]"


/*

Example entry using HTTPie:

echo '{
  "columns":[
    {"name":"waiting"}, 
    {"name":"working"}, 
    {"name":"review"}, 
    {"name":"complete"}, 
    {"name":"celebrate"}
  ], 
  "name": "1st Board",
  "description": "My very 1st kanban board"
}' | http :3000/api/v1/kanban-boards

echo '{
  "columns":[
    {"name":"To do"}, 
    {"name":"In progress"}, 
    {"name":"Being reviewed"}, 
    {"name":"Completed"}
  ], 
  "name": "Another Board"
}' | http :3000/api/v1/kanban-boards

echo '{
  "text":"This is a task",
  "board_id":"_______",
  "column_id":"______",
}' | http :3000/api/v1/kanban-cards



*/