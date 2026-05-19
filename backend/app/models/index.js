import { Sequelize } from "sequelize";
import config from "../config.js";
import defineUser from "./user.model.js";
import defineCategory from "./category.model.js";
import defineTodo from "./todo.model.js";
import definePriority from "./priority.model.js";
import defineStatus from "./status.model.js";

const dbConfig = config.development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: { timestamps: true },
    pool: dbConfig.pool,
  }
);

const db = {};

db.User = defineUser(sequelize, Sequelize.DataTypes);
db.Category = defineCategory(sequelize, Sequelize.DataTypes);
db.Todo = defineTodo(sequelize, Sequelize.DataTypes);
db.Priority = definePriority(sequelize, Sequelize.DataTypes);
db.Status = defineStatus(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.error("Could not connect:", err.message));

export default db;
