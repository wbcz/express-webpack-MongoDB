'use strict'
var mongoose = require('mongoose')
// link-MongoDB
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'link fail'))
db.once('open', function() {
  console.log('link success');
})

var classSchema = new mongoose.Schema({
    name: String,
    age: Number
})

var classModel = mongoose.model('users', classSchema);

module.exports = classModel;