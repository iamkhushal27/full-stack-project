"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      task_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        // ✅ added
        type: DataTypes.DATEONLY, // stores YYYY-MM-DD, no time
        allowNull: false, // optional — user may not set a due date
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "todos",
      timestamps: true,
      underscored: true,
    }
  );

  // 🔗 Associations
  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Todo.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Todo;
};
