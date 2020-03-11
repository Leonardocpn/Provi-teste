import { SendFullNameUserUCInput, SendFullNameUserUC } from "./sendFullName"
import { SendFullNameUserGateway, GetEndpointsOrder } from "../../gateways/user/userGateway"
import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway"

describe("Test for sendFullNameUC", () => {
    it("Should save a Full Name for a user",  async () => {
        const input: SendFullNameUserUCInput = {
            data:"Antonio Carlos Nascimento",
            token: "token",
        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }

        const sendFullNameGateway: SendFullNameUserGateway = {
            sendFullNameUser: jest.fn()
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName,sendBirthday,sendPhoneNumber') })
        }

        const useCase = new SendFullNameUserUC (
            getUserIdFromTokenGateway, sendFullNameGateway, getEndpointsOrder, "sendFullName"
        )
        
        const result = await useCase.execute(input)

        expect(result).toEqual({
            sucess: "true",
            nextEndpoint: "sendBirthday"
        })
        
    })

    it("Should throw an error for input missing, full name is missing",  async () => {
        const input: SendFullNameUserUCInput = {
            data:"",
            token: "token",
        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }

        const sendFullNameGateway: SendFullNameUserGateway = {
            sendFullNameUser: jest.fn()
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName,sendBirthday,sendPhoneNumber') })
        }

        const useCase = new SendFullNameUserUC (
            getUserIdFromTokenGateway, sendFullNameGateway, getEndpointsOrder, "sendFullName"
        )
        
        await expect(useCase.execute(input))
            .rejects.toThrowError("Nome do usuário faltando")

    })
        
    })


