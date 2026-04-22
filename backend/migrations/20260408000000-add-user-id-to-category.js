"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("categories", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addIndex("categories", ["user_id"]);
    await queryInterface.addIndex("categories", ["name", "user_id"], {
      unique: true,
      name: "categories_name_user_id_unique",
    });

    try {
      await queryInterface.removeConstraint("categories", "categories_name_key");
    } catch (error) {
      // Constraint may not exist in all environments.
    }
  },

  async down(queryInterface) {
    await queryInterface.addConstraint("categories", {
      fields: ["name"],
      type: "unique",
      name: "categories_name_key",
    });
    await queryInterface.removeIndex("categories", "categories_name_user_id_unique");
    await queryInterface.removeIndex("categories", ["user_id"]);
    await queryInterface.removeColumn("categories", "user_id");
  },
};
