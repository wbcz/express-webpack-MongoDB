'use strict'
var mongoose = require('mongoose')
// link-MongoDB
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'link fail'))
db.once('open', function() {
  console.log('link success');
})

var usersSchema = new mongoose.Schema({
    name: String,
    age: Number
})

var messageSchema = new mongoose.Schema({
    name: String,
    content: String
})

var users = mongoose.model('users', usersSchema);
var message = mongoose.model('messages', messageSchema);

module.exports = {
	users,
	message
}