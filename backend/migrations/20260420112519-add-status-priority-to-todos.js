"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("todos", "priority_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "priorities",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("todos", "status_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "statuses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addIndex("todos", ["priority_id"]);
    await queryInterface.addIndex("todos", ["status_id"]);
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("todos", ["priority_id"]);
    await queryInterface.removeIndex("todos", ["status_id"]);
    await queryInterface.removeColumn("todos", "priority_id");
    await queryInterface.removeColumn("todos", "status_id");
  },
};