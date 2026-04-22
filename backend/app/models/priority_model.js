"use strict";
module.exports = (sequelize, DataTypes) => {
  const Priority = sequelize.define(
    "Priority",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      priority_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "priorities",
      timestamps: true,
      underscored: true,
    }
  );

  // 🔗 Associations
  Priority.associate = (models) => {
    Priority.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Priority.hasMany(models.Todo, {
      foreignKey: "priority_id",
      as: "todos",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Priority;
};
