"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
      underscored: true,
    }
  );

  // 🔗 Associations
  Category.associate = (models) => {
    Category.hasMany(models.Todo, {
      foreignKey: "category_id",
      as: "todos",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Category.hasMany(models.Status, {
      foreignKey: "category_id",
      as: "statuses",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Category.hasMany(models.Priority, {
      foreignKey: "category_id",
      as: "priorities",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Category;
};
