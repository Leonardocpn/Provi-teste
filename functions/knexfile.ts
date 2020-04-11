import knex from "knex";
require("ts-node/register");

module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "teste",
    password: "teste",
    database: "provitestedb",
  },
  seeds: {
    directory: "./src/data/seeds",
  },
  migrations: {
    directory: "./src/data/migrations",
    tableName: "knex_migrations",
  },
  useNullAsDefault: true,
} as knex.Config;
