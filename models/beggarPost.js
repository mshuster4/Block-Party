module.exports = function(sequelize, DataTypes) {
  var beggarPost = sequelize.define("beggarPost", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING
    }
  });
  return beggarPost;
};
