import request from "supertest";
import { app } from "../../presentation/index";
import { UserDataBase } from "../../data/userDataBase";

describe("Send Phone Number", () => {
  const userBirthdayFromSeed = {
    email: "palmirinha@gmail.com",
    password: "12345678",
  };

  it("Shoud be able to save a phone number for an user", async () => {
    const phoneNumber = "(11) 99999-9999";

    const login = await request(app).post("/login").send(userBirthdayFromSeed);

    const token = login.body.token;
    const sendBirthday = await request(app)
      .post("/sendPhoneNumber")
      .send({
        data: phoneNumber,
      })
      .set("Authorization", token);

    const testDb = new UserDataBase();
    const createdUser = await testDb.getUserByEmail(userBirthdayFromSeed.email);

    expect(createdUser.getPhone()).toEqual(phoneNumber);

    expect(sendBirthday.body).toEqual({
      sucess: "true",
      nextEndpoint: "sendAdress",
    });
  });
});
