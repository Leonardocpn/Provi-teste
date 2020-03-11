import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway"
import { GetEndpointsOrder, SendBirthdayUserGateway } from "../../gateways/user/userGateway"
import { SendBirthdayUserUC, SendBirthdayUserUCInput } from "./sendBirthday"

describe("Test for sendBirthdayUC", () => {
    it("Should save a Birthday for a user",  async () => {
        const input: SendBirthdayUserUCInput = {
            data: "10/02/2020",
            token: "token",
        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }

        const sendBirthdayGateway: SendBirthdayUserGateway = {
            sendBirthday: jest.fn()
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName,sendBirthday,sendPhoneNumber') })
        }

        const useCase = new SendBirthdayUserUC (
            getUserIdFromTokenGateway, sendBirthdayGateway, getEndpointsOrder, "sendBirthday"
        )
        
        const result = await useCase.execute(input)

        expect(result).toEqual({
            sucess: "true",
            nextEndpoint: "sendPhoneNumber"
        })
        
    })

})