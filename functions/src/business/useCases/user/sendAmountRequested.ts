import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendAmountRequestedGateway,
  GetEndpointsOrder,
} from "../../gateways/user/userGateway";
import moment from "moment";
import { getOrderInfo } from "../../endpoinsInfo/endpoinsInfo";

export class SendAmountRequestedUC {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendAmountRequestedGateway: SendAmountRequestedGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseOrder: string = "sendAmountRequested"
  ) {}

  async execute(
    input: SendAmountRequestedUCInput
  ): Promise<SendAmountRequestedUCOutput> {
    try {
      this.validadeInput(input);
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const userOrdemFromDb = await this.getEndpointsOrder.getOrder(userId);
      const orderInfo = getOrderInfo(userOrdemFromDb, this.useCaseOrder);
      const prevTable = orderInfo.prevTable;
      await this.sendAmountRequestedGateway.sendAmountRequested(
        input.data,
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
