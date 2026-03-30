"use strict";
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    "Status",
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
        
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
      },
    },
    {
      tableName: "statuses",
      timestamps: true,
      underscored: true,
    }
  );

  // 🔗 Associations
  Status.associate = (models) => {
    Status.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Status;
};
