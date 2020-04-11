// import { BaseDataBase } from "../../data/baseDataBase";
import request from "supertest";
import { app } from "../../presentation/index";
import { UserDataBase } from "../../data/userDataBase";

describe("Send Birthday", () => {
  const userFullNameFromSeed = {
    email: "galvaobueno@gmail.com",
    password: "12345678",
  };

  it("Shoud be able to save a birthday for an user", async () => {
    const birthday = "10/10/1990";

    const login = await request(app).post("/login").send(userFullNameFromSeed);

    const token = login.body.token;
    const sendBirthday = await request(app)
      .post("/sendBirthday")
      .send({
        data: birthday,
      })
      .set("Authorization", token);
    const testDb = new UserDataBase();
    const createdUser = await testDb.getUserByEmail(userFullNameFromSeed.email);
    expect(createdUser.getBirthday()).toEqual(birthday);

    expect(sendBirthday.body).toEqual({
      sucess: "true",
      nextEndpoint: "sendPhoneNumber",
    });
  });
});
