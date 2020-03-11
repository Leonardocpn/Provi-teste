import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendFullNameUserGateway, GetEndpointsOrder } from "../../gateways/user/userGateway";
import { getOrderInfo } from "../../endpoinsInfo/endpoinsInfo"
import moment from "moment";


export class SendFullNameUserUC {

  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendFullNameUserGateway: SendFullNameUserGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseOrder: string = "sendFullName"
  ) { }

  async execute(
    input: SendFullNameUserUCInput
  ): Promise<SendFullNameUserUCOutput> {
    try {
      const userId = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      this.validateInput(input)
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const userOrdemFromDb = await this.getEndpointsOrder.getOrder(userId)
      const orderInfo = getOrderInfo(userOrdemFromDb, this.useCaseOrder)
      const prevTable = orderInfo.prevTable
      await this.sendFullNameUserGateway.sendFullNameUser(
        input.data,
        userId,
        date,
        prevTable
      );
      return {
        sucess: "true",
        nextEndpoint: orderInfo.nextEndpoint
      };
    } catch (err) {
      throw new Error(err.message)
    }
  }
  validateInput(input: SendFullNameUserUCInput){
    if(!input.data){
      throw new Error ("Nome do usuário faltando")
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