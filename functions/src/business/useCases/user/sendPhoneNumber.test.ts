import { SendPhoneNumberUserUCInput, SendPhoneNumberUserUC } from "./sendPhoneNumber"
import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway"
import { SendPhoneNumberUserGateway, GetEndpointsOrder } from "../../gateways/user/userGateway"

describe("Test for sendPhoneNumberUC", () => {
    it("Should save Phone Number for a user",  async () => {
        const input: SendPhoneNumberUserUCInput = {
            data:999999999,
            token: "token",
        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }

        const sendPhoneNumberGateway: SendPhoneNumberUserGateway = {
            sendPhoneNumber: jest.fn()
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress') })
        }

        const useCase = new SendPhoneNumberUserUC (
            getUserIdFromTokenGateway, sendPhoneNumberGateway, getEndpointsOrder, "sendPhoneNumber"
        )
        
        const result = await useCase.execute(input)

        expect(result).toEqual({
            sucess: "true",
            nextEndpoint: "sendAdress"
        })
        
    })

})