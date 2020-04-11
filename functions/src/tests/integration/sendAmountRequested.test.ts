import request from "supertest";
import { app } from "../../presentation/index";
import { UserDataBase } from "../../data/userDataBase";

describe("Send amount requested", () => {
  const userAdressFromSeed = {
    email: "c3po@gmail.com",
    password: "12345678",
  };

  it("Shoud be able to save an amount requested for an user", async () => {
    const amountRequested = 1000;

    const login = await request(app).post("/login").send(userAdressFromSeed);

    const token = login.body.token;
    const sendAdress = await request(app)
      .post("/sendAmountRequested")
      .send({ data: amountRequested })
      .set("Authorization", token);

    const testDb = new UserDataBase();
    const createdUser = await testDb.getUserByEmail(userAdressFromSeed.email);

    expect(createdUser.getLoan()).toEqual(amountRequested);

    expect(sendAdress.body).toEqual({
      sucess: "true",
      nextEndpoint: "ultimo endpoint",
    });
  });
});
