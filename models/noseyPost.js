module.exports = function(sequelize, DataTypes) {
  var noseyPost = sequelize.define("noseyPost", {
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
  return noseyPost;
};
