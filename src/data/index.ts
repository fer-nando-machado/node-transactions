import pgPromise from "pg-promise";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 5432;
const DB_USERNAME = process.env.DB_USERNAME || "node-transactions-username";
const DB_PASSWORD = process.env.DB_PASSWORD || "node-transactions-password";

export const connection = {
  database: "node-transactions",
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USERNAME,
  password: DB_PASSWORD,
};
const db = pgPromise()(connection);

export default db;
