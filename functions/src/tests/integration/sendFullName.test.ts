// import { BaseDataBase } from "../../data/baseDataBase";
import request from "supertest";
import { app } from "../../presentation/index";
import { UserDataBase } from "../../data/userDataBase";

describe("Send Full Name", () => {
  const userWithCpfFromSeed = {
    email: "lourojose@gmail.com",
    password: "12345678",
  };

  it("Shoud be able to save a name for an user", async () => {
    const fullName = "Louro Jose da Anamaria";
    const splitName = fullName.split(" ");
    const firstName = splitName.slice(0, 1);
    const lastName = splitName.slice(1).join(" ");
    const login = await request(app).post("/login").send(userWithCpfFromSeed);

    const token = login.body.token;
    const sendFullName = await request(app)
      .post("/sendFullName")
      .send({
        data: fullName,
      })
      .set("Authorization", token);
    const testDb = new UserDataBase();
    const createdUser = await testDb.getUserByEmail(userWithCpfFromSeed.email);
    expect(createdUser.getFirstName()).toEqual(firstName[0]);
    expect(createdUser.getLastName()).toEqual(lastName);

    expect(sendFullName.body).toEqual({
      sucess: "true",
      nextEndpoint: "sendBirthday",
    });
  });
});
