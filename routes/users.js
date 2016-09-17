var express = require('express');
var router = express.Router();

//mongodb
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');


  var url =  'mongodb://main_access:123456@ds033106.mlab.com:33106/heroku_gkzcbvpx';

  MongoClient.connect(url, function (err,db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
  })
});

module.exports = router;
