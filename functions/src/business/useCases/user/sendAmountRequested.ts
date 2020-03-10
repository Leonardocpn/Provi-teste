import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendAmountRequestedGateway } from "../../gateways/user/userGateway";
import moment from "moment"
import { Order, UseCase } from "../../OrderOfRequester/orderOfRequester";

export class SendAmountRequestedUC {
    constructor(
        private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
        private sendAmountRequestedGateway: SendAmountRequestedGateway
    ){}

    async execute(input: SendAmountRequestedUCInput): Promise<SendAmountRequestedUCOutput> {
        try{
            this.validadeInput(input)
            const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
                input.token
            );
            const date = moment().format("DD/MM/YYYY HH-mm-ss");
            const prevTable = Order[UseCase.AMOUNT_REQUESTED].prevTable
            await this.sendAmountRequestedGateway.sendAmountRequested(input.data, userId, date, prevTable)

            return {
                    sucess: "true",
                    nextEndpoint: Order[UseCase.AMOUNT_REQUESTED].nextEndpoint
                  };
            } catch (err) {
                throw new Error (err.message)
          }
        }

    validadeInput(input: SendAmountRequestedUCInput): void {
        if(!input.data){
            throw new Error("Valor solicitado não informado")
            
        }
    }
}

export interface SendAmountRequestedUCInput {
    token: string
    data: number
}

export interface SendAmountRequestedUCOutput {
    sucess: string;
    nextEndpoint: string
}