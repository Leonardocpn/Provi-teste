import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendCpfUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";
import CPF from "cpf-check"
import { Order, UseCase } from "../../OrderOfRequester/orderOfRequester";

export class SendCpfUserUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendCpfUserGateway: SendCpfUserGateway
  ) {}

  async execute(input: SendCpfUserUCInput): Promise<SendCpfUserUCOutput> {
    try {
      const userId = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      if(!CPF.validate(input.data)){
        throw new Error ("CPF inválido, conferir o numero informado")
      }
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const cpfFormated = CPF.format(input.data)
      const nextEndpoint = Order[UseCase.CPF].nextEndpoint
      await this.sendCpfUserGateway.sendCpfUser(cpfFormated, userId, date);
      return {
        sucess: "true",
        nextEndpoint
      };
    } catch (err) {
      throw new Error (err.message)
    }
  }
}

export interface SendCpfUserUCInput {
  token: string;
  data: string;
}

export interface SendCpfUserUCOutput {
  sucess: string;
  nextEndpoint: string
}
