// Base setup
var Sequelize = require('sequelize');

// DB setup
var sequelize = new Sequelize('node_api', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mariadb',
  define: {
    timestamps: false
  }
});

// Listing models
var models = [
  'Post'
];

// Exporting models via sequelize module
models.forEach(function (model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports.sequelize = sequelize;
