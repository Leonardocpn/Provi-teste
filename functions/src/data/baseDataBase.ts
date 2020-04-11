import knex from "knex";

export class BaseDataBase {
  static productiondb: knex.Config = {
    client: "mysql",
    connection: {
      host: process.env.HOST_DB,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
    },
  };

  static testdb: knex.Config = {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "teste",
      password: "teste",
      database: "provitestedb",
    },

    migrations: {
      directory: "./src/data/migrations",
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  };

  private static config: knex.Config =
    process.env.NODE_ENV === "test"
      ? BaseDataBase.testdb
      : BaseDataBase.productiondb;

  connection = knex(BaseDataBase.config);
}
