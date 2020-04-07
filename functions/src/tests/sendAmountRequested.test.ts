import {
  SendAmountRequestedUCInput,
  SendAmountRequestedUC,
} from "../business/useCases/user/sendAmountRequested";
import { GetUserIdFromTokenGateway } from "../business/gateways/auth/autenticationGateway";
import {
  SendAmountRequestedGateway,
  GetEndpointsOrder,
} from "../business/gateways/user/userGateway";

describe("Test for sendAmountRequestedUC", () => {
  it("Should save an Amount Requested for a user", async () => {
    const input: SendAmountRequestedUCInput = {
      data: 10000,
      token: "token",
    };

    const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
      getUserIdFromToken: jest.fn().mockReturnValue("123456789"),
    };

    const sendAmountRequestedGateway: SendAmountRequestedGateway = {
      sendAmountRequested: jest.fn(),
    };

    const getEndpointsOrder: GetEndpointsOrder = {
      getOrder: jest
        .fn()
        .mockReturnValue({
          order:
            "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
        }),
    };

    const useCase = new SendAmountRequestedUC(
      getUserIdFromTokenGateway,
      sendAmountRequestedGateway,
      getEndpointsOrder,
      "sendAmountRequested"
    );

    const result = await useCase.execute(input);

    expect(result).toEqual({
      sucess: "true",
      nextEndpoint: "ultimo endpoint",
    });
  });

  it("Should throw an error for invalid input, total amount not informed", async () => {
    const input: SendAmountRequestedUCInput = {
      data: 0,
      token: "token",
    };

    const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
      getUserIdFromToken: jest.fn().mockReturnValue("123456789"),
    };

    const sendAmountRequestedGateway: SendAmountRequestedGateway = {
      sendAmountRequested: jest.fn(),
    };

    const getEndpointsOrder: GetEndpointsOrder = {
      getOrder: jest
        .fn()
        .mockReturnValue({
          order:
            "sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested",
        }),
    };

    const useCase = new SendAmountRequestedUC(
      getUserIdFromTokenGateway,
      sendAmountRequestedGateway,
      getEndpointsOrder,
      "sendAmountRequested"
    );

    await expect(useCase.execute(input)).rejects.toThrowError(
      "Valor solicitado não informado"
    );
  });
});
