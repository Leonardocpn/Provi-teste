import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendFullNameUserGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import { getOrderInfo } from "../../../business/endpoinsInfo/endpoinsInfo";
import { getDate } from "../../../utils/getDate";

export class SendFullNameUserUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendFullNameUserGateway: SendFullNameUserGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseOrder: string = "sendFullName"
  ) {}

  async execute(
    input: SendFullNameUserUCInput
  ): Promise<SendFullNameUserUCOutput> {
    try {
      const userId = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      this.validateInput(input);
      const date = getDate();
      const orderInfo = await getOrderInfo(
        this.getEndpointsOrder,
        userId,
        this.useCaseOrder
      );
      await this.sendFullNameUserGateway.sendFullNameUser(
        input.data,
        userId,
        date,
        orderInfo.prevTable
      );
      return {
        sucess: "true",
        nextEndpoint: orderInfo.nextEndpoint,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  validateInput(input: SendFullNameUserUCInput) {
    if (!input.data) {
      throw new Error("Nome do usuário faltando");
    }
  }
}

export interface SendFullNameUserUCInput {
  token: string | undefined;
  data: string;
}

export interface SendFullNameUserUCOutput {
  sucess: string;
  nextEndpoint: string;
}
