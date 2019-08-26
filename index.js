/**
 *  @file Entry point of application where server is started.
 *  @author {@link https://www.billybunn.com/ Billy Bunn}
 *  @version 1.0.0
 *  @license {@link https://github.com/BillyBunn/api-server-basic/LICENSE/ MIT License}
 *  @module index.js
 *  @requires {@link https://github.com/motdotla/dotenv dotenv}
 *  @requires {@link https://github.com/Automattic/mongoose mongoose}
 *  @requires src/app
 */

'use strict'

require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

// Get the default connection
const db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

require('./src/app').start(process.env.PORT)
