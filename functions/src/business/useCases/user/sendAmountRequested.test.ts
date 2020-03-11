import { SendAmountRequestedUCInput, SendAmountRequestedUC } from "./sendAmountRequested"
import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway"
import { SendAmountRequestedGateway, GetEndpointsOrder } from "../../gateways/user/userGateway"

describe("Test for sendAmountRequestedUC", () => {
    it("Should save an Amount Requested for a user",  async () => {
        const input: SendAmountRequestedUCInput = {
            data:10000,
            token: "token",
        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }

        const sendAmountRequestedGateway: SendAmountRequestedGateway = {
            sendAmountRequested: jest.fn()
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested') })
        }

        const useCase = new SendAmountRequestedUC (
            getUserIdFromTokenGateway, sendAmountRequestedGateway, getEndpointsOrder, "sendAmountRequested"
        )
        
        const result = await useCase.execute(input)

        expect(result).toEqual({
            sucess: "true",
            nextEndpoint: "ultimo endpoint"
        })
        
    })

})