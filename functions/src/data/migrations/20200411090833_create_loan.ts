import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(` CREATE TABLE Loans (
  total_amount decimal(10,2) NOT NULL,
  user_id varchar(255) NOT NULL,
  updated_at varchar(100) NOT NULL,
  created_at varchar(100) NOT NULL,
  PRIMARY KEY (total_amount,user_id),
  KEY Loans_PK_idx (user_id),
  CONSTRAINT Loans_PK FOREIGN KEY (user_id) REFERENCES Users (id)
)`);
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Loans");
}
