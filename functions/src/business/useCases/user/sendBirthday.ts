import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendBirthdayUserGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import { getDate } from "../../../utils/getDate";
import { getOrderInfo } from "../../../business/endpoinsInfo/endpoinsInfo";

export class SendBirthdayUserUC {
  constructor(
    private getUserFromIdGateway: GetUserIdFromTokenGateway,
    private sendBirthdayUserGateway: SendBirthdayUserGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseName: string = "sendBirthday"
  ) {}

  async execute(
    input: SendBirthdayUserUCInput
  ): Promise<SendBirthdayUserUCOutput> {
    try {
      const userId: string = this.getUserFromIdGateway.getUserIdFromToken(
        input.token
      );

      const date = getDate();
      const orderInfo = await getOrderInfo(
        this.getEndpointsOrder,
        userId,
        this.useCaseName
      );
      await this.sendBirthdayUserGateway.sendBirthday(
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

export interface SendBirthdayUserUCInput {
  token: string | undefined;
  data: string;
}

export interface SendBirthdayUserUCOutput {
  sucess: string;
  nextEndpoint: string;
}
