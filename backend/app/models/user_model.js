"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      profile_image: {        // ✅ snake_case
        type: DataTypes.STRING,
        allowNull: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true, // Sequelize handles createdAt & updatedAt
      underscored: true, 
    }
  );

  // 🔗 Associations

  User.associate = (models) => {
    User.hasMany(models.Todo, {
      foreignKey: "user_id",
      as: "todos",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
