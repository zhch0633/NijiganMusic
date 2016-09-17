var express = require('express');
var router = express.Router();

//mongodb
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello !!");

  var url =  'mongodb://heroku_gkzcbvpx:1q2w3e@ds033106.mlab.com:33106/heroku_gkzcbvpx';

  MongoClient.connect(url, function (err,db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.close();
  })
});

module.exports = router;
