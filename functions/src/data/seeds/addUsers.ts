import * as Knex from "knex";
import { getDate } from "../../utils/getDate";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex("Users").del().then();

  // Inserts seed entries
  const date = getDate();
  const createdUser = await knex("Users").insert([
    {
      id: "4321ffb3-a271-4a28-b288-1e13921c680d",
      email: "anamaria@gmail.com",
      password: "$2b$10$kU9bt6yWv5ALVCz1vOg92.kgowuAg5ImLob3Phrn4IFoPg9SEZJNy",
      endpoints_order:
        "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
    },
  ]);

  const userWithCpf = knex("Users")
    .insert([
      {
        id: "4321ffb3-a271-4a28-b288-1e13921c680f",
        email: "lourojose@gmail.com",
        password:
          "$2b$10$kU9bt6yWv5ALVCz1vOg92.kgowuAg5ImLob3Phrn4IFoPg9SEZJNy",
        endpoints_order:
          "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
      },
    ])
    .then(() =>
      knex("Cpfs").insert([
        {
          cpf: "043.783.368-20",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680f",
          updated_at: date,
        },
      ])
    );

  const userWithFullName = knex("Users")
    .insert([
      {
        id: "4321ffb3-a271-4a28-b288-1e13921c680g",
        email: "galvaobueno@gmail.com",
        password:
          "$2b$10$kU9bt6yWv5ALVCz1vOg92.kgowuAg5ImLob3Phrn4IFoPg9SEZJNy",
        endpoints_order:
          "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
      },
    ])
    .then(() =>
      knex("Cpfs").insert([
        {
          cpf: "304.446.374-27",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680g",
          updated_at: date,
        },
      ])
    )
    .then(() =>
      knex("Full_Names").insert([
        {
          first_name: "Galvao",
          last_name: "Bueno",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680g",
          updated_at: date,
          created_at: date,
        },
      ])
    );

  const userWithBirthday = knex("Users")
    .insert([
      {
        id: "4321ffb3-a271-4a28-b288-1e13921c680h",
        email: "palmirinha@gmail.com",
        password:
          "$2b$10$kU9bt6yWv5ALVCz1vOg92.kgowuAg5ImLob3Phrn4IFoPg9SEZJNy",
        endpoints_order:
          "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
      },
    ])
    .then(() =>
      knex("Cpfs").insert([
        {
          cpf: "131.687.130-40",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680h",
          updated_at: date,
        },
      ])
    )
    .then(() =>
      knex("Full_Names").insert([
        {
          first_name: "Palmirinha",
          last_name: "da Silva",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680h",
          updated_at: date,
          created_at: date,
        },
      ])
    )
    .then(() =>
      knex("Birthdays").insert([
        {
          birthday: "05/02/1900",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680h",
          updated_at: date,
          created_at: date,
        },
      ])
    );

  const userWithPhoneNumber = knex("Users")
    .insert([
      {
        id: "4321ffb3-a271-4a28-b288-1e13921c680i",
        email: "r2d2@gmail.com",
        password:
          "$2b$10$kU9bt6yWv5ALVCz1vOg92.kgowuAg5ImLob3Phrn4IFoPg9SEZJNy",
        endpoints_order:
          "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
      },
    ])
    .then(() =>
      knex("Cpfs").insert([
        {
          cpf: "146.842.513-73",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680i",
          updated_at: date,
        },
      ])
    )
    .then(() =>
      knex("Full_Names").insert([
        {
          first_name: "R2",
          last_name: "D2",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680i",
          updated_at: date,
          created_at: date,
        },
      ])
    )
    .then(() =>
      knex("Birthdays").insert([
        {
          birthday: "01/01/2000",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680i",
          updated_at: date,
          created_at: date,
        },
      ])
    )
    .then(() =>
      knex("Phone_Numbers").insert([
        {
          phone_number: "(12) 98758-8574)",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680i",
          updated_at: date,
          created_at: date,
        },
      ])
    );

  const userWithAdress = knex("Users")
    .insert([
      {
        id: "4321ffb3-a271-4a28-b288-1e13921c680j",
        email: "c3po@gmail.com",
        password:
          "$2b$10$kU9bt6yWv5ALVCz1vOg92.kgowuAg5ImLob3Phrn4IFoPg9SEZJNy",
        endpoints_order:
          "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
      },
    ])
    .then(() =>
      knex("Cpfs").insert([
        {
          cpf: "408.366.885-70",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680j",
          updated_at: date,
        },
      ])
    )
    .then(() =>
      knex("Full_Names").insert([
        {
          first_name: "C3PO",
          last_name: "null",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680j",
          updated_at: date,
          created_at: date,
        },
      ])
    )
    .then(() =>
      knex("Birthdays").insert([
        {
          birthday: "01/01/2000",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680j",
          updated_at: date,
          created_at: date,
        },
      ])
    )
    .then(() =>
      knex("Phone_Numbers").insert([
        {
          phone_number: "(12) 95631-8573",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680j",
          updated_at: date,
          created_at: date,
        },
      ])
    )
    .then(() =>
      knex("Adresses").insert([
        {
          cep: "(12) 95631-8573",
          user_id: "4321ffb3-a271-4a28-b288-1e13921c680j",
          updated_at: date,
          created_at: date,
          street: "Praça da Sé",
          number: 255,
          complement: "casa",
          city: "São Paulo",
          state: "SP",
          street_api: "Praça da Sé",
          city_api: "São Paulo",
          state_api: "SP",
          divergence_api: 0,
        },
      ])
    );

  return Promise.all([
    createdUser,
    userWithCpf,
    userWithFullName,
    userWithBirthday,
    userWithPhoneNumber,
    userWithAdress,
  ]);
}
