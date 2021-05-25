const Sequelize = require("sequelize");
require("dotenv").config();
// const db = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost:5432/messenger",
//   {
//     logging: false,
//   }
// );
const db = new Sequelize("messenger", "postgres", process.env.PGPASSWORD, {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});
module.exports = db;
