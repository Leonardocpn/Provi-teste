import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendPhoneNumberUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";

export class SendPhoneNumberUserUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendPhoneNumberUser: SendPhoneNumberUserGateway
  ) {}

  async execute(
    input: SendPhoneNumberUserUCInput
  ): Promise<SendPhoneNumberUserUCOutput> {
    try {
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      await this.sendPhoneNumberUser.sendPhoneNumber(input.data, userId, date);
      return { message: "Número de telefone adicionado com sucesso" };
    } catch (err) {
      return {
        message: err.message
      };
    }
  }
}

export interface SendPhoneNumberUserUCInput {
  token: string;
  data: number;
}

export interface SendPhoneNumberUserUCOutput {
  message: string;
}
