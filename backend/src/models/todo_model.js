module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define(
      "Todo",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
      },
      {
        tableName: "todos",
        timestamps: true,
      }
    );
  
    Todo.associate = (models) => {
        Todo.belongsTo(models.User, {
          foreignKey: "userId",
          as: "user",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
      };
      
  
    return Todo;
  };
  