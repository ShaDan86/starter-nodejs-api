// server.js

// BASE SETUP
// =============================================================================
// Reference: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Indices    = require('./app/models/indices');
mongoose.connect('mongodb://localhost:27017/stocks_dev'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// ROUTES FOR OUR API
// =============================================================================

// <-- route middleware and first route are here

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/indices')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var indices = new Indices();      // create a new instance of the Bear model
        indices.name = req.body.name;  // set the bears name (comes from the request)
        indices.country = req.body.country;

        console.log ("indices to be added is "+JSON.stringify(indices));
        // save the bear and check for errors
        indices.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Indices created!' });
        });
        
    })

    // get all the indices (accessed at GET http://localhost:8080/api/indices)
    .get(function(req, res) {
        Indices.find(function(err, indices) {
            if (err)
                res.send(err);

            res.json(indices);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/indices/:indices_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Indices.findById(req.params.indices_id, function(err, indices) {
            if (err)
                res.send(err);
            res.json(indices);
        })
    })
     // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Indices.findById(req.params.indices_id, function(err, indices) {

            if (err)
                res.send(err);

            indices.name = req.body.name;  // update the bears info

            // save the bear
            indices.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Indices updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Indices.remove({
            _id: req.params.indices_id
        }, function(err, indices) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);