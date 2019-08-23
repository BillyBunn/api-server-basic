'use strict'

/**
 * @file Memory Data Model
 * @module src/models/memory-model
 * @requires {@link https://github.com/kelektiv/node-uuid uuid}
 */

const uuid = require('uuid/v4')

/**
 * Creates an instance of a memory Model.
 * @param {object} schema An outline of the fields and pieces of data that are required by each data model. This may vary in each Model instance, e.g., the Players data model may have different required fields in its schema than the Teams data model.
 */

/** Class representing a memory data model with CRUD methods */
class MemoryModel {
  /**
   * Model constructor
   * @param {object} schema Outline of the data fields required and allowed
   * @memberof Categories
   */
  constructor(schema) {
    this.db = []
    this.schema = schema
    this.requiredFields = Object.entries(schema).reduce(
      (arr, [field, { required }]) => {
        if (required) arr.push(field)
        return arr
      },
      []
    )
  }

  /**
   * Retrieves an individual record (by id) or a list of all records
   * @param {string} _id Unique identifier of an individual record
   * @returns {Promise<array|object>} A promise that contains the individual record of the _id provided or an array of all records in the model
   */
  get(_id) {
    let response
    if (_id) {
      this.existsInDB(_id) // throws if _id doesn't exist
      response = this.db.filter(record => record._id === _id)[0]
      // const idx = this.db.findIndex(record => record._id === _id) // find the record
    } else {
      response = this.db
    }

    return Promise.resolve(response)
  }

  /**
   * Creates a new record with a unique _id property
   * @param {object} entry New record entry matching the format of the schema
   * @returns Calls get(_id) method to return the created record in database
   */
  post(entry) {
    entry._id = uuid()
    // this.hasAllRequiredFields(entry) // throws if required fields are missing
    const record = this.sanitize(entry)
    this.db.push(record)
    // return Promise.resolve(record)
    return this.get(record._id)
  }

  /**
   * Replaces an entire individual record in the database
   * @param {string} id Unique identifier of an individual record (UUID format)
   * @param {object} entry New record entry matching the format of the schema
   * @returns {function} Calls get(_id) method to return updated record in database
   */
  put(_id, entry) {
    this.existsInDB(_id)
    entry._id = _id
    // this.hasAllRequiredFields(entry)
    const newRecord = this.sanitize(entry)

    this.db = this.db.map(dbRecord =>
      dbRecord._id === _id ? (dbRecord = newRecord) : dbRecord
    )

    // TODO: Consider mutable method below
    // const idx = this.db.findIndex(record => record._id === _id) // find the record
    // this.db[idx] = entry

    return this.get(_id)
  }

  patch(_id, updates) {
    this.existsInDB(_id)
    this.db = this.db.map(record =>
      record._id === _id ? (record = { ...record, ...updates }) : record
    )
    return this.get(_id)
  }

  /**
   * Deletes an individual record from the database
   * @param {string} _id Unique identifier of an individual record
   * @returns {Promise<object>} A promise that contains an empty object
   */
  delete(_id) {
    this.existsInDB(_id)
    this.db = this.db.filter(record => record._id !== _id)
    // TODO: See if mutable method below works instead of current filter method

    // const idx = this.db.findIndex(record => record._id === _id) // find the record
    // this.db.splice(idx, 1) // delete the record
    return Promise.resolve({})
  }

  sanitize(entry) {
    const record = {}
    for (const field in this.schema) {
      // 1. Check if all required fields are present - throw if not
      if (this.schema[field].required && !entry[field])
        throw {
          status: 400,
          name: `Missing Required Field: ${field}`,
          message: `Invalid entry: must contain all required fields: ${this.requiredFields.join(
            ', '
          )}.`
        }
      // 2. Create a new record object of every allowed field in schema with entry data
      record[field] = entry[field]
    }
    // 3. Return new record
    return record
  }

  hasAllRequiredFields(entry) {
    for (const field in this.schema) {
      if (this.schema[field].required && !entry[field])
        throw {
          status: 400,
          name: `Missing Required Field: ${field}`,
          message: `Invalid entry: must contain all required fields: ${this.requiredFields.join(
            ', '
          )}.`
        }
    }
  }

  existsInDB(_id) {
    // if (!this.db.findIndex(record => record._id === _id)
    if (!this.db.map(record => record._id).includes(_id))
      throw {
        status: 404,
        name: `Record Not Found`,
        message: `No records with _id: ${_id} found.`
      }
  }

  // echo '{"username":"<yourusername>", "password":"<yourpassword>", "role":"role"}' | http :<yourPORT>/signup
  // echo '{"name":"clothing", "display_name":"Clothing, Shoes, Jewelry & Watches"}' | http :3000/categories
  // echo '{"name":"electronics", "display_name":"Electronics, Computers & Office", "not_required":"something here that is not required"}' | http :3000/categories

  // echo '{"name":"foobar", "display_name":"Clothing, Shoes, Jewelry & Watches", "not_required":"a new thing"}' | http PUT :3000/categories/3038cf84-b49b-4790-8d86-232d78a7fd8e
  // }
}

module.exports = MemoryModel
