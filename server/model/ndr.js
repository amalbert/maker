var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ndrSchema = new Schema({
  uuid: String,
  objectUuid: String,
  value: Number,
  unit: String,
  created_at: Date
});

// the schema is useless so far
// we need to create a model using it
var NDR = mongoose.model('NDR', ndrSchema);

// make this available to our users in our Node applications
module.exports = NDR;