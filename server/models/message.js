var messageModel = require('../schema/db').message
var usersModel = require('../schema/db').users
var Promise = require('bluebird')

// module.exports = {
// 	add: function(req, response, next) {
// 		var newMessage = {
// 			name: req.body.name,
// 			content: req.body.content
// 		}
// 		console.log(newMessage, 'newMessage')
// 		messageModel.create(newMessage, function(err, result, res) {
//             if(err) return console.log(err);
//             console.log(result)
//             response.send({
//             	status: 200
//             });
// 		})
// 	},
// 	list: function (req, response, next) {
//         messageModel.find({}, function (err, result, res) {
//             if(err) return console.log(err);
//             response.send(result)
//         });
// 	}
// }

function add(newMessage) {
    messageModel.create(newMessage, function(err, result, res) {
        if(err) return console.log(err);
        response.send({
            status: 200
        });
    })
}

function list() {
    messageModel.find({}, function (err, result, res) {
        if(err) return console.log(err);
        response.send(result)
    });
}

function find(data) {
	return new Promise (function(resolve, reject) {
	    usersModel.find({name: data.name}, function(err, result) {
	        resolve(result)
	    })
	})
}


module.exports = {
	add,
	list,
	find
}