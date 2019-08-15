'use strict'

const express = require('express')

// Prepare express app
const app = express()

const PORT = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Server up on port ${PORT}!`))
