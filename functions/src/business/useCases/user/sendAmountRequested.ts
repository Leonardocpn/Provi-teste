import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendAmountRequestedGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import { getDate } from "../../../utils/getDate";
import { getOrderInfo } from "../../../business/endpoinsInfo/endpoinsInfo";

export class SendAmountRequestedUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendAmountRequestedGateway: SendAmountRequestedGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseName: string = "sendAmountRequested"
  ) {}

  async execute(
    input: SendAmountRequestedUCInput
  ): Promise<SendAmountRequestedUCOutput> {
    try {
      this.validadeInput(input);
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = getDate();
      const orderInfo = await getOrderInfo(
        this.getEndpointsOrder,
        userId,
        this.useCaseName
      );
      await this.sendAmountRequestedGateway.sendAmountRequested(
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

  validadeInput(input: SendAmountRequestedUCInput): void {
    if (!input.data) {
      throw new Error("Valor solicitado não informado");
    }
  }
}

export interface SendAmountRequestedUCInput {
  token: string | undefined;
  data: number;
}

export interface SendAmountRequestedUCOutput {
  sucess: string;
  nextEndpoint: string;
}
