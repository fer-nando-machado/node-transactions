import { Knex } from "knex";
import { connection } from ".";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection,
    migrations: {
      directory: "./migrations",
    },
  },
};

export default config;
