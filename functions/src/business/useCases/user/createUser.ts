import { CreateUserGateway } from "../../gateways/user/userGateway"
import { EncryptCryptographyGateway } from "../../gateways/services/cryptographyGateway"
import { IdGeneratorGateway } from "../../gateways/services/idGeneratorGateway"
import { GenerateTokenAuthenticationGateway } from "../../gateways/auth/autenticationGateway"
import { User } from "../../entities/user/user"

export class CreateUserUC {
    constructor(
        private userGateway: CreateUserGateway,
        private cryptographyGateway: EncryptCryptographyGateway,
        private idGeneratorGateway: IdGeneratorGateway,
        private authenticationGateway: GenerateTokenAuthenticationGateway
    ) { }

    async execute(input: CreateUserUCInput): Promise<CreateUserUCOutput> {
        this.validadeUserInput(input)
        const encryptedPassword = await this.cryptographyGateway.encrypt(input.password)
        const userId = this.idGeneratorGateway.generate()
        const newUser = new User(
            userId,
            input.email,
            encryptedPassword)
        try {
            await this.userGateway.createUser(newUser)
            const token = this.authenticationGateway.generateToken(userId)
            return {
                token
            }
        } catch (error) {
            return error.message
        }
    }

    validadeUserInput(input: CreateUserUCInput) {
        if (!input.email || !input.password)
            throw new Error("Dados do usuário faltando")
    }

}

export interface CreateUserUCInput {
    email: string
    password: string
}

export interface CreateUserUCOutput {
    token: string
}