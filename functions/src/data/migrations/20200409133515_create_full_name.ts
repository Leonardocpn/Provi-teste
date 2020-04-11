import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(` 
    CREATE TABLE Full_Names (
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    updated_at varchar(100) NOT NULL,
    created_at varchar(100) NOT NULL,
    PRIMARY KEY (user_id,last_name,first_name),
    CONSTRAINT Full_Names_FK FOREIGN KEY (user_id) REFERENCES Users (id)
) `);
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Full_Names");
}
