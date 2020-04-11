import request from "supertest";
import { app } from "../../presentation/index";
import { UserDataBase } from "../../data/userDataBase";

describe("Send Adress", () => {
  const userPhoneNumberFromSeed = {
    email: "r2d2@gmail.com",
    password: "12345678",
  };

  it("Shoud be able to save an adress for an user", async () => {
    const adress = {
      cep: "01001-000",
      street: "Praça da Sé",
      number: "100",
      complement: "casa",
      city: "São Paulo",
      state: "SP",
    };

    const login = await request(app)
      .post("/login")
      .send(userPhoneNumberFromSeed);

    const token = login.body.token;
    const sendAdress = await request(app)
      .post("/sendAdress")
      .send(adress)
      .set("Authorization", token);

    const testDb = new UserDataBase();
    const createdUser = await testDb.getUserByEmail(
      userPhoneNumberFromSeed.email
    );
    const adressForVerification =
      adress.street +
      " " +
      adress.number +
      ", " +
      adress.complement +
      ", " +
      adress.city +
      ", " +
      adress.state;
    expect(createdUser.getAdress()).toEqual(adressForVerification);

    expect(sendAdress.body).toEqual({
      sucess: "true",
      nextEndpoint: "sendAmountRequested",
    });
  });
});
