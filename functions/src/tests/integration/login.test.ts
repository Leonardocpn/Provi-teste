import request from "supertest";
import { app } from "../../presentation/index";

describe("Login", () => {
  it("Shoud be able to do login with an user", async () => {
    const userCreatedFromSeed = {
      email: "anamaria@gmail.com",
      password: "12345678",
    };
    const response = await request(app)
      .post("/login")
      .send(userCreatedFromSeed);
    expect(response.body).toHaveProperty("token");
  });

  it("Shoud throw an error for a non existent user", async () => {
    const nonExistentUser = {
      email: "naoexisto@gmail.com",
      password: "esqueciasenha",
    };
    const response = await request(app).post("/login").send(nonExistentUser);
    expect(response.body).toEqual({ message: "Usuario nao encontrado" });
  });

  it("Shoud throw an error for an invalid password", async () => {
    const userCreatedFromSeed = {
      email: "anamaria@gmail.com",
      password: "123456789",
    };
    const response = await request(app)
      .post("/login")
      .send(userCreatedFromSeed);
    expect(response.body).toEqual({ message: "Senha ou email inválidos" });
  });
});
