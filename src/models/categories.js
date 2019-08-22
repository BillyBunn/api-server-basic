'use strict'

const uuid = require('uuid/v4')

const schema = {
  _id: { required: true },
  name: { required: true },
  display_name: { required: true },
  not_required: { required: false },
  required_not_specified: { something: 10 }
}

let requiredFields = Object.entries(schema).reduce(
  (arr, [key, { required }]) => {
    if (required) arr.push(key)
    return arr
  },
  []
)

class Categories {
  constructor() {
    this.db = []
  }

  get(_id) {
    let response
    if (_id) {
      this.existsInDB(_id) // throws if _id doesn't exist
      response = this.db.filter(record => record._id === _id)[0]
    } else {
      response = this.db
    }

    return Promise.resolve(response)
  }

  post(entry) {
    entry._id = uuid()
    this.hasAllRequiredFields(entry) // throws if required fields are missing
    this.db.push(entry)
    return Promise.resolve(entry)
  }

  put(_id, entry) {
    this.existsInDB(_id)
    entry._id = _id
    this.hasAllRequiredFields(entry)

    this.db = this.db.map(dbRecord =>
      dbRecord._id === _id ? (dbRecord = entry) : dbRecord
    )

    return this.get(_id)
  }

  patch(_id, entry) {
    this.existsInDB(_id)
    this.db = this.db.map(dbRecord =>
      dbRecord._id === _id ? (dbRecord = { ...dbRecord, ...entry }) : dbRecord
    )
    return this.get(_id)
  }

  delete(_id) {
    this.existsInDB(_id)
    this.db = this.db.filter(record => record._id !== _id)
    return Promise.resolve({})
  }

  hasAllRequiredFields(entry) {
    for (const field in schema) {
      if (schema[field].required && !entry[field])
        throw {
          status: 400,
          name: `Missing Required Field: ${field}`,
          message: `Invalid entry: must contain all required fields: ${requiredFields.join(
            ', '
          )}.`
        }
    }
  }

  existsInDB(_id) {
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

module.exports = Categories
