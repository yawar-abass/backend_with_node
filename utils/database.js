import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "learn-backend",
  password: process.env.DB_PASSWORD,
});

export default pool.promise();
