import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendFullNameUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";

export class SendFullNameUserUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendFullNameUserGateway: SendFullNameUserGateway
  ) {}

  async execute(
    input: SendFullNameUserUCInput
  ): Promise<SendFullNameUserUCOutput> {
    try {
      const userId = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      await this.sendFullNameUserGateway.sendFullNameUser(
        input.data,
        userId,
        date
      );

      return {
        message: "Nome adicionado com sucesso"
      };
    } catch (err) {
      return {
        message: err.message
      };
    }
  }
}

export interface SendFullNameUserUCInput {
  token: string;
  data: string;
}

export interface SendFullNameUserUCOutput {
  message: string;
}
