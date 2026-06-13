import db from "../models/index.js";

export async function withTransaction(callback) {
  const transaction = await db.sequelize.transaction();
  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
