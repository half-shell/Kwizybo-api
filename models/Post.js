module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  });
};
