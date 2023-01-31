const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if(!value.length) {
          return this.setDataValue('img', "https://i.postimg.cc/tTchPKBZ/Pokebola.png")
        }
        this.setDataValue('img', value)
      },
    },
    principal_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starts: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      },
      defaultValue: 0
    }

  },{
    tableName: "favorites",
    // timestamps: false,
    // createdAt: false
  });
};
