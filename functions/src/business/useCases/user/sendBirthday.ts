import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendBirthdayUserGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import moment from "moment";
import { getOrderInfo } from "../../endpoinsInfo/endpoinsInfo";

export class SendBirthdayUserUC {
  constructor(
    private getUserFromIdGateway: GetUserIdFromTokenGateway,
    private sendBirthdayUserGateway: SendBirthdayUserGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseOrder: string = "sendBirthday"
  ) {}

  async execute(
    input: SendBirthdayUserUCInput
  ): Promise<SendBirthdayUserUCOutput> {
    try {
      const userId: string = this.getUserFromIdGateway.getUserIdFromToken(
        input.token
      );

      const verifiedDate = this.validadeInput(input);
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const userOrdemFromDb = await this.getEndpointsOrder.getOrder(userId);
      const orderInfo = getOrderInfo(userOrdemFromDb, this.useCaseOrder);
      const prevTable = orderInfo.prevTable;
      await this.sendBirthdayUserGateway.sendBirthday(
        verifiedDate,
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

  validadeInput(input: SendBirthdayUserUCInput) {
    if (!input.data) {
      throw new Error("Data de aniversário nao informada");
    }
    const verifyDate = moment(input.data, "DD/MM/YYYY");
    if (!moment(verifyDate, "DD/MM/YYYY").isValid()) {
      throw new Error("Entrada da data incorreta, seguir o modelo DD/MM/YYYY");
    }
    const date = moment(input.data, "DD/MM/YYYY").format("DD/MM/YYYY");

    return date;
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
