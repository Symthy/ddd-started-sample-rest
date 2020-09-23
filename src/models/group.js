'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      group.belongsTo(models.user, {
        foreignKey: 'id'
      });
    }
  };
  group.init({
    name: DataTypes.STRING,
    owner_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'group',
    underscored: true,
  });
  return group;
};
