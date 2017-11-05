// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users_test', {useMongoClient: true})
var Comment     = require('./app/models/comment');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/comments1')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var mins = today.getMinutes();
        var sec = today.getSeconds();

        
        today = mm + '/' + dd + '/' + yyyy;
        
        var comment = new Comment();      // create a new instance of the Bear model
        comment.text = req.body.text;  // set the bears name (comes from the request)
        comment.coursecode = "SE1111";
        comment.timestamp = today.toString();
        // save the bear and check for errors
        comment.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment created!' });
        });

    })
    
    .get(function(req, res) {
        Comment.find(function(err, comments1) {
            if (err)
                res.send(err);

            res.json(comments1);
        });
    })

router.route('/comments2')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var mins = today.getMinutes();
        var sec = today.getSeconds();

        
        today = mm + '/' + dd + '/' + yyyy;
        
        var comment = new Comment();      // create a new instance of the Bear model
        comment.text = req.body.text;  // set the bears name (comes from the request)
        comment.coursecode = "SE2222";
        comment.timestamp = today.toString();
        // save the bear and check for errors
        comment.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment created!' });
        });

    })
    
    .get(function(req, res) {
        Comment.find(function(err, comments2) {
            if (err)
                res.send(err);

            res.json(comments2);
        });
    })
    router.route('/comment/:comment_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            res.json(comment);
        });
    })
    
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Comment.findById(req.params.bear_id, function(err, comment) {

            if (err)
                res.send(err);

            comment.name = req.body.name;  // update the bears info

            // save the bear
            comment.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Comment updated!' });
            });

        });
    })
    
    .delete(function(req, res) {
        Comment.remove({
            _id: req.params.comment_id
        }, function(err, comment) {
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