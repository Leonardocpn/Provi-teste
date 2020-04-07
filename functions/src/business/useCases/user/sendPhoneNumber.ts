import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendPhoneNumberUserGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import moment from "moment";
import { getOrderInfo } from "../../endpoinsInfo/endpoinsInfo";

export class SendPhoneNumberUserUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendPhoneNumberUser: SendPhoneNumberUserGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseOrder: string = "sendPhoneNumber"
  ) {}

  async execute(
    input: SendPhoneNumberUserUCInput
  ): Promise<SendPhoneNumberUserUCOutput> {
    try {
      this.validadeInput(input);
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const userOrdemFromDb = await this.getEndpointsOrder.getOrder(userId);
      const orderInfo = getOrderInfo(userOrdemFromDb, this.useCaseOrder);
      const prevTable = orderInfo.prevTable;
      await this.sendPhoneNumberUser.sendPhoneNumber(
        input.data,
        userId,
        date,
        prevTable
      );
      return {
        sucess: "true",
        nextEndpoint: orderInfo.nextEndpoint,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  validadeInput(input: SendPhoneNumberUserUCInput) {
    if (!input.data) {
      throw new Error("Telefone do usuário faltando");
    }
  }
}

export interface SendPhoneNumberUserUCInput {
  token: string | undefined;
  data: number;
}

export interface SendPhoneNumberUserUCOutput {
  sucess: string;
  nextEndpoint: string;
}
