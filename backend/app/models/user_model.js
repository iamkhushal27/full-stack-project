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

      profileImage: {
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
    }
  );

  // 🔗 Associations

  User.associate = (models) => {
    User.hasMany(models.Todo, {
      foreignKey: "userId",
      as: "todo",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
