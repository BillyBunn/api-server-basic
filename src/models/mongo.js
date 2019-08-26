'use strict'

/**
 * @file Mongo Controller
 * Defines class with CRUD operations utilizing Mongoose model methods
 * @module src/models/mongo-controller
 */

/** Class representing a generic MongoDB CRUD controller */
class Model {
  /**
   * Model constructor
   * @param model {object} A Mongoose model, i.e., a class with which underlying MongoDB documents can be created and read.
   */
  constructor(model) {
    this.model = model
  }

  /**
   * Schema-listing method provided by 'mongoose-schema-jsonschema'
   * @returns {object} A JSON schema of the Mongoose schema used to construct the model
   */
  jsonSchema() {
    return typeof this.model.jsonSchema === 'function'
      ? this.model.jsonSchema()
      : {}
  }

  /**
   * Retrieves one or more records (MongoDB documents)
   * @param _id {string} optional MongoDB document _id
   * @returns {Promise<array|object>} Result of the query; a promise that contains the individual document of the _id provided or an array of all documents in the collection
   */
  get(_id) {
    return _id ? this.model.find({ _id }) : this.model.find()
  }

  /**
   * Create a new record (an instance of the Mongoose model, a "document")
   * Mongoose documents represent a one-to-one mapping to documents as stored in MongoDB
   * @param entry {object} matches the format of the schema
   * @returns {*}
   */
  post(entry) {
    const newDocument = new this.model(entry)
    return newDocument.save()
  }

  /**
   * Updates a document in the collection
   * @param _id {string} A string representation of the MongoDB ObjectID assigned to the document
   * @param update {object} The data to replace
   * @returns {Promise<object>} A promise that contains the document updated in the database
   */
  put(_id, update) {
    return this.model.findByIdAndUpdate(_id, update, {
      new: true,
      upsert: true
    })
  }

  /**
   * Deletes a document in the collection
   * @param _id {string} A string representation of the MongoDB ObjectID assigned to the document
   * @returns {Promise<object>} A promise that contains the document deleted
   */
  delete(_id) {
    return this.model.findByIdAndDelete(_id)
  }
}

module.exports = Model

/*
echo '{"columns":["To do", "In progress", "Review", "Done"], "name": "1st Board"}' | http :3000/api/v1/kanban-boards
echo '{"columns":["waiting", "working", "review", "complete", "fifth", "sixth"], "name": "2nd Board"}' | http :3000/api/v1/kanban-boards
*/
