var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var objectsSchema = new Schema({
  uuid: String,
  name: String,
  unit: String,
  lastValue: String
});

var Objects = mongoose.model('Objects', objectsSchema);

module.exports = Objects;