import request from "supertest";
import { app } from "../../presentation/index";
import { UserDataBase } from "../../data/userDataBase";

describe("Create user", () => {
  it("Shoud be able to create an user", async () => {
    const user = {
      email: "leonardo@gmail.com",
      password: "12345678",
    };
    const response = await request(app).post("/createUser").send(user);
    const testDb = new UserDataBase();
    const createdUser = await testDb.getUserByEmail(user.email);

    expect(createdUser.getEmail()).toEqual("leonardo@gmail.com");
    expect(response.body).toHaveProperty("token");
  });
  it("should throw an error when email is alread in use", async () => {
    const userFromSeed = {
      email: "anamaria@gmail.com",
      password: "12345678",
    };
    const response = await request(app).post("/createUser").send(userFromSeed);
    expect(response.text).toEqual("Erro no banco ao criar um usuario");
  });
});
