import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(` CREATE TABLE Adresses (
  cep varchar(100) NOT NULL,
  street varchar(100) NOT NULL,
  number varchar(100) NOT NULL,
  complement varchar(100) NOT NULL,
  city varchar(100) NOT NULL,
  state varchar(100) NOT NULL,
  user_id varchar(100) NOT NULL,
  updated_at varchar(100) NOT NULL,
  created_at varchar(100) NOT NULL,
  street_api varchar(100) NOT NULL,
  city_api varchar(100) NOT NULL,
  state_api varchar(100) NOT NULL,
  divergence_api tinyint(4) NOT NULL,
  PRIMARY KEY (cep,user_id,street,number,complement,city,state),
  KEY Adress_FK_idx (user_id),
  CONSTRAINT Adress_FK FOREIGN KEY (user_id) REFERENCES Users (id)
)`);
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Adresses");
}
