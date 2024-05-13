import mysql from "mysql2";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "learn-backend",
  "root",
  process.env.DB_PASSWORD,
  { dialect: "mysql", host: "localhost" }
);

export default sequelize;
