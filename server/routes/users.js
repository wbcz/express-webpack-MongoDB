var express = require('express');
var router = express.Router();
var users = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
	users.index(req, res, next);
});
router.get('/addUser', function(req, res, next) {
	users.create(req, res, next);
});
router.post('/addUser', function(req, res, next) {
    users.add(req, res, next);
});
router.get('/updateUser', function(req, res, next) {
    users.update(req, res, next);
});
router.post('/updateUser', function(req, res, next) {
    users.upd(req, res, next);
});
router.get('/deleteUser', function(req, res, next) {
    users.delete(req, res, next);
});
router.post('/deleteUser', function(req, res, next) {
    users.del(req, res, next);
});
router.get('/find', function(req, res, next) {
    users.find(req, res, next);
});
router.post('/find', function(req, res, next) {
    users.findByProperty(req, res, next);
});
router.get('/cha', function(req, res, next) {
    users.sendData(req, res, next);
});
module.exports = router;
