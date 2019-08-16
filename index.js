/**
 *  @file Entry point of application where server is started.
 *  @author {@link https://www.billybunn.com/ Billy Bunn}
 *  @version 1.0.0
 *  @license {@link https://github.com/BillyBunn/api-server-basic/LICENSE/ MIT License}
 *  @module index.js
 *  @requires {@link https://github.com/motdotla/dotenv dotenv}
 *  @requires src/app
 */

'use strict'

require('dotenv').config()

require('./src/app').start(process.env.PORT)
