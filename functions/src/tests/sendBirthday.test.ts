import { GetUserIdFromTokenGateway } from "../business/gateways/auth/autenticationGateway";
import {
  GetEndpointsOrder,
  SendBirthdayUserGateway,
} from "../business/gateways/user/userGateway";
import {
  SendBirthdayUserUC,
  SendBirthdayUserUCInput,
} from "../business/useCases/user/sendBirthday";

describe("Test for sendBirthdayUC", () => {
  it("Should save a Birthday for a user", async () => {
    const input: SendBirthdayUserUCInput = {
      data: "10/02/2020",
      token: "token",
    };

    const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
      getUserIdFromToken: jest.fn().mockReturnValue("123456789"),
    };

    const sendBirthdayGateway: SendBirthdayUserGateway = {
      sendBirthday: jest.fn(),
    };

    const getEndpointsOrder: GetEndpointsOrder = {
      getOrder: jest
        .fn()
        .mockReturnValue({
          order: "sendCpf,sendFullName,sendBirthday,sendPhoneNumber",
        }),
    };

    const useCase = new SendBirthdayUserUC(
      getUserIdFromTokenGateway,
      sendBirthdayGateway,
      getEndpointsOrder,
      "sendBirthday"
    );

    const result = await useCase.execute(input);

    expect(result).toEqual({
      sucess: "true",
      nextEndpoint: "sendPhoneNumber",
    });
  });

  it("Should throw an error for invalid input, date is missing", async () => {
    const input: SendBirthdayUserUCInput = {
      data: "",
      token: "token",
    };

    const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
      getUserIdFromToken: jest.fn().mockReturnValue("123456789"),
    };

    const sendBirthdayGateway: SendBirthdayUserGateway = {
      sendBirthday: jest.fn(),
    };

    const getEndpointsOrder: GetEndpointsOrder = {
      getOrder: jest
        .fn()
        .mockReturnValue({
          order: "sendCpf,sendFullName,sendBirthday,sendPhoneNumber",
        }),
    };

    const useCase = new SendBirthdayUserUC(
      getUserIdFromTokenGateway,
      sendBirthdayGateway,
      getEndpointsOrder,
      "sendBirthday"
    );

    await expect(useCase.execute(input)).rejects.toThrowError(
      "Data de aniversário nao informada"
    );
  });

  it("Should throw an error for invalid input, date is not in format DD/MM/YYYY", async () => {
    const input: SendBirthdayUserUCInput = {
      data: "1000/888",
      token: "token",
    };

    const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
      getUserIdFromToken: jest.fn().mockReturnValue("123456789"),
    };

    const sendBirthdayGateway: SendBirthdayUserGateway = {
      sendBirthday: jest.fn(),
    };

    const getEndpointsOrder: GetEndpointsOrder = {
      getOrder: jest
        .fn()
        .mockReturnValue({
          order: "sendCpf,sendFullName,sendBirthday,sendPhoneNumber",
        }),
    };

    const useCase = new SendBirthdayUserUC(
      getUserIdFromTokenGateway,
      sendBirthdayGateway,
      getEndpointsOrder,
      "sendBirthday"
    );

    await expect(useCase.execute(input)).rejects.toThrowError(
      "Entrada da data incorreta, seguir o modelo DD/MM/YYYY"
    );
  });
});
