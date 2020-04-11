import request from "supertest";
import { app } from "../../presentation/index";
import { UserDataBase } from "../../data/userDataBase";

const userCreatedFromSeed = {
  email: "anamaria@gmail.com",
  password: "12345678",
};

describe("Send Cpf", () => {
  it("Shoud be able to save a cpf for an user", async () => {
    const randomCpf = "249.104.268-17";
    const login = await request(app).post("/login").send(userCreatedFromSeed);
    const token: string = login.body.token;

    const response = await request(app)
      .post("/sendCpfUser")
      .send({
        data: randomCpf,
      })
      .set("Authorization", token);
    const testDb = new UserDataBase();
    const createdUser = await testDb.getUserByEmail(userCreatedFromSeed.email);
    expect(createdUser.getCpf()).toEqual(randomCpf);
    expect(response.body).toEqual({
      sucess: "true",
      nextEndpoint: "sendFullName",
    });
  });

  it("Shoud throw an error if cpf is alread in use", async () => {
    const cpfAlreadInUseFromSeed = "043.783.368-20";
    const login = await request(app).post("/login").send(userCreatedFromSeed);

    const token: string = login.body.token;
    const response = await request(app)
      .post("/sendCpfUser")
      .send({
        data: cpfAlreadInUseFromSeed,
      })
      .set("Authorization", token);

    expect(response.body).toEqual({
      message: "Erro ao inserir o cpf do usuario",
    });
  });

  it("Shoud throw an error if cpf is invalid", async () => {
    const invalidCpf = "000.000.000-00";
    const login = await request(app).post("/login").send(userCreatedFromSeed);

    const token: string = login.body.token;
    const response = await request(app)
      .post("/sendCpfUser")
      .send({
        data: invalidCpf,
      })
      .set("Authorization", token);

    expect(response.body).toEqual({
      message: "CPF inválido, conferir o numero informado",
    });
  });
});
