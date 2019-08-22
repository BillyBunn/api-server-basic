'use strict'

const uuid = require('uuid/v4')

const schema = {
  _id: { required: true },
  name: { required: true },
  display_name: { required: true }
}
let requiredFields

class Categories {
  constructor() {
    this.db = []
  }

  get(_id) {
    let response = _id
      ? this.db.filter(record => record._id === _id)[0]
      : this.db
    return response
  }

  post(record) {
    record._id = uuid()
    if (this.validate(record)) {
      this.db.push(record)
      return record
    } else {
      return `Invalid entry: must contain all required fields: ${requiredFields.join(
        ', '
      )}`
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
    let valid = true

    requiredFields = Object.entries(schema).reduce((arr, keyPair) => {
      if (keyPair[1].required) arr.push(keyPair[0])
      return arr
    }, [])

    requiredFields.forEach(field => {
      if (!Object.keys(record).includes(field)) {
        valid = false
      }
    })

    return valid
  }
}

module.exports = Categories
