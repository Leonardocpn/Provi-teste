import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(`
    CREATE TABLE Cpfs (
    cpf varchar(100) NOT NULL,
    user_id varchar(255) NOT NULL,
    updated_at varchar(100) NOT NULL,
    PRIMARY KEY (cpf),
    UNIQUE KEY cpf_UNIQUE (cpf),
    KEY Cpf_FK (user_id),
    CONSTRAINT Cpf_FK FOREIGN KEY (user_id) REFERENCES Users (id)
    );
`);
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Cpfs");
}
