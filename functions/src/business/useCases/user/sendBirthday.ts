import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendBirthdayUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";
import { Order, UseCase } from "../../OrderOfRequester/orderOfRequester";
export class SendBirthdayUserUC {
    constructor(
        private getUserFromIdGateway: GetUserIdFromTokenGateway,
        private sendBirthdayUserGateway: SendBirthdayUserGateway
    ) { }

    async execute(
        input: SendBirthdayUserUCInput
    ): Promise<SendBirthdayUserUCOutput> {
        try {
            const userId: string = this.getUserFromIdGateway.getUserIdFromToken(
                input.token
            );
            const date = moment().format("DD/MM/YYYY HH-mm-ss");
            const prevTable = Order[UseCase.BIRTHDAY].prevTable;
            await this.sendBirthdayUserGateway.sendBirthday(
                input.data,
                userId,
                date,
                prevTable
            );
            return {
                sucess: "true",
                nextEndpoint: Order[UseCase.BIRTHDAY].nextEndpoint
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export interface SendBirthdayUserUCInput {
    token: string;
    data: string;
}

export interface SendBirthdayUserUCOutput {
    sucess: string;
    nextEndpoint: string;
}
