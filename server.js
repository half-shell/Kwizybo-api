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
  dialect: 'mariadb',
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
  .get(function(req, res) {
    Post.findAll().then(function (err, posts) {
      if (err)
        res.send(err);

      res.send(posts);
    });
  });


// Registering routes
app.use('/api', router);

// Starting server
app.listen(port);
console.info('Let the magic happen.');
