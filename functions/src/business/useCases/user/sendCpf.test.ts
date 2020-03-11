import { SendCpfUserUCInput, SendCpfUserUC } from "./sendCpf"
import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway"
import { SendCpfUserGateway, GetEndpointsOrder } from "../../gateways/user/userGateway"

describe("Test for sendCpfUC", () => {
    it("Should save a Cpf for a user", async () => {
        const input: SendCpfUserUCInput = {
            data: "38257537942",
            token: "Token"

        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }

        const sendCpfUserGateway: SendCpfUserGateway = {
            sendCpfUser: jest.fn()
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName') })
        }



        const useCase = new SendCpfUserUC(
            getUserIdFromTokenGateway, sendCpfUserGateway, getEndpointsOrder, "sendCpf"
        )

        const result = await useCase.execute(input)

        expect(result).toEqual({
            sucess: "true",
            nextEndpoint: "sendFullName"
        })

    })

    it("Should throw an error for CPF incorrect", async () => {
        const input: SendCpfUserUCInput = {
            data: "11111111",
            token: "Token"

        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }

        const sendCpfUserGateway: SendCpfUserGateway = {
            sendCpfUser: jest.fn()
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName') })
        }



        const useCase = new SendCpfUserUC(
            getUserIdFromTokenGateway, sendCpfUserGateway, getEndpointsOrder, "sendCpf"
        )

        await expect(useCase.execute(input))
            .rejects.toThrowError("CPF inválido ou não informado, conferir o numero informado")

    })

    

})