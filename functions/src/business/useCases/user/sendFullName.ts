import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendFullNameUserGateway, GetEndpointsOrder } from "../../gateways/user/userGateway";
import moment from "moment";
import {Order, UseCase} from "../../OrderOfRequester/orderOfRequester"

export class SendFullNameUserUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendFullNameUserGateway: SendFullNameUserGateway,
    private getEndpointsOrder: GetEndpointsOrder
  ) {}

  async execute(
    input: SendFullNameUserUCInput
  ): Promise<SendFullNameUserUCOutput> {
    try {
      const userId = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const userOrder = await this.getEndpointsOrder.getOrder(userId)
      console.log(JSON.stringify(userOrder))
      const prevTable = Order[UseCase.FULL_NAME].prevTable
      await this.sendFullNameUserGateway.sendFullNameUser(
        input.data,
        userId,
        date,
        prevTable
      );

      return {
        sucess: "true",
        nextEndpoint: Order[UseCase.FULL_NAME].nextEndpoint
      };
    } catch (err) {
      throw new Error (err.message)
    }
  }
}

export interface SendFullNameUserUCInput {
  token: string;
  data: string;
}

export interface SendFullNameUserUCOutput {
  sucess: string;
  nextEndpoint: string
}

