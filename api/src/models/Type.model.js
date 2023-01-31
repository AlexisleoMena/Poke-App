const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  },{
    tableName: "types",
    timestamps: false,
    createdAt: false
  });
}