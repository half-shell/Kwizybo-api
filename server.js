// Base setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// Configure express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting server port
var port = process.env.PORT || 8080;

// DB setup
var sequelize = new Sequelize('node_api', 'root', 'toor', {
  host: 'localhost',
  define: {
    timestamps: false
  }
});

// Check database connection
sequelize.authenticate().then(function(err) {
  if(err)
    console.log('Unable to connect to database: ', err);
  console.log('Connected to database.');
});

// Getting all models
var models = require('./models');

// Getting a model is that simple
var Post = models.Post;
// var Comment = models.Comment;

// Basic routing
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Doublidou' })
});

router.route('/posts')
  .post(function(req, res) {
    var post = Post.build( {
      title: req.body.title,
      content: req.body.content
    });
    post.save().catch(function (err) {
        res.send(err);
    });
    res.send({ message: 'The post has been succesfully added' });
  })
  .get(function(req, res) {
    Post.findAll().then(function (err, post) {
      if(err)
        res.send(err);

      res.send(post);
    });
  });

router.route('/posts/:post_id')
  .get(function(req, res) {
    Post.findById(req.params.post_id).then(function (err, post) {
      if(err)
        res.send(err);

      res.send(post);
    });
  });



// Registering routes
app.use('/api', router);

// Starting server
app.listen(port);
console.info('Let the magic happen.');
