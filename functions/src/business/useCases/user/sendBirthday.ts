import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendBirthdayUserGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import { getDate } from "../../../utils/getDate";
import { getOrderInfo } from "../../../business/endpoinsInfo/endpoinsInfo";
import moment from "moment";

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

      const verifiedDate = this.validadeInput(input);
      const date = getDate();
      const orderInfo = await getOrderInfo(
        this.getEndpointsOrder,
        userId,
        this.useCaseName
      );
      await this.sendBirthdayUserGateway.sendBirthday(
        verifiedDate,
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
