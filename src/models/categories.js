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
      response = this.db.filter(record => record._id === _id)[0]
      if (!response)
        throw {
          status: 404,
          name: `Record not found`,
          message: `No record with that _id found.`
        }
    } else {
      response = this.db
    }

    return Promise.resolve(response)
  }

  post(record) {
    record._id = uuid()
    if (this.validate(record)) {
      this.db.push(record)
      return Promise.resolve(record)
    } else {
      throw {
        status: 400,
        message: `Invalid entry: must contain all required fields: ${requiredFields.join(
          ', '
        )}`
      }
    }
  }

  put(_id, entry) {
    if (this.validate(entry)) {
      this.db = this.db.map(dbRecord =>
        dbRecord._id === _id ? (dbRecord = entry) : dbRecord
      )
      return entry
    } else {
      return { error: `No records found with _id: ${_id}` }
    }
  }

  delete(_id) {
    if (Object.values(this.db).includes(_id)) {
      this.db = this.db.filter(record => record._id !== _id)
      return {}
    } else {
      return { error: `No records found with _id: ${_id}` }
    }
  }

  validate(record) {
    for (const field in schema) {
      if (schema[field].required && !record[field]) return false
    }
    return true

    // echo '{"username":"<yourusername>", "password":"<yourpassword>", "role":"role"}' | http :<yourPORT>/signup
    // echo '{"name":"clothing", "display_name":"Clothing, Shoes, Jewelry & Watches"}' | http :3000/categories
    // echo '{"name":"electronics", "display_name":"Electronics, Computers & Office", "not_required":"something here that is not required"}' | http :3000/categories
  }
}

module.exports = Categories
