import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(`
    CREATE TABLE Users (
    id varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    endpoints_order varchar(1000) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email_UNIQUE (email)
    );
  `);
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Users");
}
