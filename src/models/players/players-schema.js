'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const players = mongoose.Schema({
  name: { type:String, required:true },
  position: { type:String, required:true, uppercase:true, enum:['P','C','1B','2B','3B','SS','LF','RF','CF'] },
  throws: { type:String, required:true, uppercase:true, enum:['R','L'] },
  bats: { type:String, required:true, uppercase:true, enum:['R','L'] },
  team: {type:String, required:true},
});

module.exports = mongoose.model('players', players);

/*
Example entries using HTTPie:

echo '{
  "name":"Billy",
  "position":"1B",
  "throws":"R",
  "bats":"R",
  "team":"River Cats"
}' | http :3000/api/v1/players

echo '{
  "name":"Joe",
  "position":"C",
  "throws":"L",
  "bats":"L",
  "team":"Mariners"
}' | http :3000/api/v1/players
*/