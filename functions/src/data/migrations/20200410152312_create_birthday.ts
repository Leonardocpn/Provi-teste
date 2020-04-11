import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(`
    CREATE TABLE Birthdays (
  birthday varchar(100) NOT NULL,
  user_id varchar(255) NOT NULL,
  updated_at varchar(100) NOT NULL,
  created_at varchar(100) NOT NULL,
  PRIMARY KEY (birthday,user_id),
  KEY Birthday_FK_idx (user_id),
  CONSTRAINT Birthday_FK FOREIGN KEY (user_id) REFERENCES Users (id)
)`);
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Birthdays");
}
