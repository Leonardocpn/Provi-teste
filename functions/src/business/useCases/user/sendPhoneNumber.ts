import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendPhoneNumberUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";
import { Order, UseCase } from "../../OrderOfRequester/orderOfRequester";

export class SendPhoneNumberUserUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendPhoneNumberUser: SendPhoneNumberUserGateway
  ) { }

  async execute(
    input: SendPhoneNumberUserUCInput
  ): Promise<SendPhoneNumberUserUCOutput> {
    try {
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const prevTable = Order[UseCase.PHONE_NUMBER].prevTable;
      await this.sendPhoneNumberUser.sendPhoneNumber(
        input.data,
        userId,
        date,
        prevTable
      );
      return {
        sucess: "true",
        nextEndPoint: Order[UseCase.PHONE_NUMBER].nextEndpoint
      };
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export interface SendPhoneNumberUserUCInput {
  token: string;
  data: number;
}

export interface SendPhoneNumberUserUCOutput {
  sucess: string;
  nextEndPoint: string
}
