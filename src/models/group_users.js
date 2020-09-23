'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      group_users.hasOne(models.group, {
        foreignKey: 'id'
      })
      group_users.hasMany(models.user, {
        foreignKey: 'id'
      })
    }
  };
  group_users.init({
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'group_users',
    underscored: true,
  });
  return group_users;
};
