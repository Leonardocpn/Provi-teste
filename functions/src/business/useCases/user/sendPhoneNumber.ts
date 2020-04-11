import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendPhoneNumberUserGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import { getDate } from "../../../utils/getDate";
import { getOrderInfo } from "../../../business/endpoinsInfo/endpoinsInfo";

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
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = getDate();
      const orderInfo = await getOrderInfo(
        this.getEndpointsOrder,
        userId,
        this.useCaseOrder
      );
      await this.sendPhoneNumberUser.sendPhoneNumber(
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
}

export interface SendPhoneNumberUserUCInput {
  token: string | undefined;
  data: string;
}

export interface SendPhoneNumberUserUCOutput {
  sucess: string;
  nextEndpoint: string;
}
