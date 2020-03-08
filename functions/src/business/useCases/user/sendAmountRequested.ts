import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendAmountRequestedGateway } from "../../gateways/user/userGateway";
import moment from "moment"

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
            await this.sendAmountRequestedGateway.sendAmountRequested(input.data, userId, date)

            return {
                message: "Total solitado cadastrado com sucesso"
            }

        } catch (err) {
            return {
                message: err.message
            }
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
    message: string
}