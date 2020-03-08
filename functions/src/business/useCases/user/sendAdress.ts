import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendAdressUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";

export class SendAdressUserUc {
    constructor (
        private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
        private sendAdressUserGateway: SendAdressUserGateway    
    ){}

    async execute(input: SendAdressUserUcInput): Promise<SendAdressUserUcOutput> {
        try{
            const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(input.token)
            const date = moment().format("DD/MM/YYYY HH-mm-ss");
            await this.sendAdressUserGateway.sendAdress(input.cep, input.street, input.number, input.complement, input.city, input.state, userId, date)
            return {
                message: "Endereço cadastrado com sucesso"
            }
        } catch (err){
            return {
                message: err.message
            }
        }
    }

}

export interface SendAdressUserUcInput {
    token: string
    cep: number
    street: string
    number: number
    complement: string
    city: string
    state: string
}

export interface SendAdressUserUcOutput {
    message: string
}