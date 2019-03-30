module.exports = function(sequelize, DataTypes) {
  var angelPost = sequelize.define("angelPost", {
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
  return angelPost;
};
