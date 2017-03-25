var userModel = require('../schema/db');
var path = require('path');

module.exports = {
    index: function(req, response, next) {
        userModel.find({}, function (err, result, res) {
            if(err) return console.log(err);
            response.render('index', { result: result });
        });
    },
    create: function (req, response, next) {
        response.render('add',{});
    },
    add: function (req, response, next) {
        var newUser = {
            name: req.body.name,
            age: req.body.age
        };
        userModel.create(newUser, function (err, result, res) {
            if(err) return console.log(err);
            response.send('<strong style="color:red;margin-right:40px;">add:----------'+newUser.name+'----------Success</strong><a href="/">Back</a>');
        });
    },
    delete: function(req, response, next) {
        userModel.find({}, function(err, result, res) {
            response.render('del',{ result: result });
        });
    },
    del: function(req, response, next) {
        var reqId = {_id: req.body.user};
        userModel.remove(reqId, function(err, result, res) {
            if(err) return console.log(err);
            response.send('<strong style="color:red;margin-right:40px;">delete:----------'+reqId+'----------Success</strong><a href="/">Back</a>')
        });
    },
    update:function(req, response, next) {
        userModel.find({}, function(err, result, res) {
            response.render('update', { result: result });
        });
    },
    upd: function(req, response, next) {
        var num = req.body.num;
        var reqId = {_id: req.body._id[num]};
        var query = {
            $set:{    
                name: req.body.name[num],
                age: req.body.age[num]
            }
        };
        userModel.update(reqId, query, function(err, result, res) {
            if(err) return console.log(err);
            response.send('<strong style="color:red;margin-right:40px;">update:----------'+query.$set.name+'----------Success</strong><a href="/">Back</a>')
        });
    },
    find: function(req, response, next) {
        response.render('find', { result: null, err:'' });
    },
    findByProperty: function(req, response, next) {
        var reqWord = req.body.keyword;
        var reqType = req.body.find_type;
        var getResult = function() {
            userModel.find({name: reqWord}, function(err, result) {
                if( result.length ) {
                    response.render('find', { result: result, err:'' });
                } else {
                    response.send(response.send('<strong style="color:red;margin-right:40px;">search:----------'+reqWord+'----------fail</strong><a href="/find">Back</a>'));
                }
            });            
        }
        if( reqType == 0 ) {
            getResult();
        } else {
            getResult();
        }
    },
    sendData: function(req, response, next) {
        response.send({
            name:1,
            age: 2
        })
        //response.sendFile(path.resolve(__dirname, './../views/chat.html'))
    }
};