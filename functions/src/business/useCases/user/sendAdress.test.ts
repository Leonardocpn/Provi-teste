import { SendAdressUserUcInput, SendAdressUserUc } from "./sendAdress"
import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway"
import { SendAdressUserGateway, GetEndpointsOrder } from "../../gateways/user/userGateway"
import { GetAdressFromApiGateway } from "../../gateways/services/getAdressFromApiGateway"

describe("Test for SendAdressUC", () => {
    it("Should save an Adress for a user", async () => {
        const input: SendAdressUserUcInput = {
            token: "token",
            cep: "01001000",
            street: "Praça da Sé",
            number: 100,
            complement: "casa",
            city: "São Paulo",
            state: "SP"
        }

        const getUserIdFromTokenGateway: GetUserIdFromTokenGateway = {
            getUserIdFromToken: jest.fn().mockReturnValue("123456789")
        }


        const sendAdressUserGateway: SendAdressUserGateway = {
            sendAdress: jest.fn()
        }

        const getAdressFromApiGateway: GetAdressFromApiGateway = {
            getAdress: jest.fn().mockReturnValue({data:{
                cep: "01001000",
                logradouro: "Praça da Sé",
                complemento: "lado ímpar",
                bairro: "Sé",
                localidade: "São Paulo",
                uf: "SP",
                unidade: "",
                ibge: "3550308",
                gia: "1004"
                }})
        }

        const getEndpointsOrder: GetEndpointsOrder = {
            getOrder: jest.fn().mockReturnValue({ order: ('sendCpf,sendFullName,sendBirthday,sendPhoneNumber,sendAdress,sendAmountRequested') })
        }

        const useCase = new SendAdressUserUc(
            getUserIdFromTokenGateway, sendAdressUserGateway, getAdressFromApiGateway, getEndpointsOrder, "sendAdress"
        )

        const result = await useCase.execute(input)

        expect(result).toEqual({
            sucess: "true",
            nextEndpoint: "sendAmountRequested"
        })

    })

})