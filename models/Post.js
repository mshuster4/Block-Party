module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Blockparty", {
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
      type: DataTypes.STRING,
      defaultValue: "Karma Angel"
    }
  });
  return Post;
};
