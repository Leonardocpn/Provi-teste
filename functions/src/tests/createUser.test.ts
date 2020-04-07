import {
  CreateUserUCInput,
  CreateUserUC,
} from "../business/useCases/user/createUser";
import { IdGeneratorGateway } from "../business/gateways/services/idGeneratorGateway";
import { EncryptCryptographyGateway } from "../business/gateways/services/cryptographyGateway";
import { GenerateTokenAuthenticationGateway } from "../business/gateways/auth/autenticationGateway";
import { CreateUserGateway } from "../business/gateways/user/userGateway";
import { User } from "../business/entities/user/user";

describe("Test for createUserUC", () => {
  it("Should create a user", async () => {
    const input: CreateUserUCInput = {
      email: "leonardo@gmail.com",
      password: "1234567",
    };

    const idGeneratorGateway: IdGeneratorGateway = {
      generate: jest.fn().mockReturnValue("randomId"),
    };

    const cryptographyGateway: EncryptCryptographyGateway = {
      encrypt: jest.fn().mockReturnValue("encryptedPassword"),
    };

    const authenticationGateway: GenerateTokenAuthenticationGateway = {
      generateToken: jest.fn().mockReturnValue("token"),
    };

    const userGateway: CreateUserGateway = {
      createUser: jest
        .fn()
        .mockReturnValue(
          new User("randomId", input.email, "encryptedPassword")
        ),
    };

    const useCase = new CreateUserUC(
      userGateway,
      cryptographyGateway,
      idGeneratorGateway,
      authenticationGateway
    );

    const result = await useCase.execute(input);

    expect(result).toEqual({ token: "token" });
  });
});
