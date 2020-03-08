import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendBirthdayUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";
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
            await this.sendBirthdayUserGateway.sendBirthday(input.data, userId, date);
            return { message: "Data de nascimento cadastrada com sucesso" };
        } catch (err) {
            return {
                message: err.message
            };
        }
    }
}

export interface SendBirthdayUserUCInput {
    token: string;
    data: string;
}

export interface SendBirthdayUserUCOutput {
    message: string;
}
