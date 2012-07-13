
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

//connect to the MongoDB
var mongo = require('mongodb');
var client = new mongo.Db('test', new mongo.Server('127.0.0.1', 27017));
client.open(function (err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to mongodb');
  }
});

//show data and form
exports.showMongo = function(req, res){
  client.collection('myapptest', function(err, collection){
    if (err) {
      throw err;
    }
    collection.find().toArray(function(err, results){
      if (err) {
        throw err;
      }
      res.render('mongo', {
        title: 'Mongo Example',
        list: results
      });
    });
  });
};

//save posted data
exports.saveMongo = function(req, res){
  var name = req.param('name');
  client.collection('myapptest', function(err, collection){
    if (err) {
      throw err;
    }
    collection.save({name:name}, function(err){
      if (err) {
        throw err;
      }
      res.redirect('/mongo');
    });
  });
};
