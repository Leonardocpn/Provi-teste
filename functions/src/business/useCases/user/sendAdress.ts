import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendAdressUserGateway, GetEndpointsOrder } from "../../gateways/user/userGateway";
import moment from "moment";
import { GetAdressFromApiGateway } from "../../gateways/services/getAdressFromApiGateway";
import { getOrderInfo } from "../../endpoinsInfo/endpoinsInfo";

export class SendAdressUserUc {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendAdressUserGateway: SendAdressUserGateway,
    private getAdressFromApiGateway: GetAdressFromApiGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseOrder: string = "sendAdress"
  ) { }

  async execute(input: SendAdressUserUcInput): Promise<SendAdressUserUcOutput> {
    try {
      this.validateInput(input);
      const validateCep = this.validateCep(input.cep);
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const userOrdemFromDb = await this.getEndpointsOrder.getOrder(userId)
      const orderInfo = getOrderInfo(userOrdemFromDb, this.useCaseOrder)
      const prevTable = orderInfo.prevTable
      const externalAdress = await this.getAdressFromApiGateway.getAdress(
        validateCep
      );
      const adressFromApi = { street: externalAdress.data.logradouro,
        city: externalAdress.data.localidade,
        state: externalAdress.data.uf,
        }
    
      const adressDivergence = this.verifyAdressDivergence(input, adressFromApi);
      await this.sendAdressUserGateway.sendAdress(
        validateCep,
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        userId,
        date,
        prevTable,
        adressFromApi.street,
        adressFromApi.city,
        adressFromApi.state,
        adressDivergence
      );
      return {
        sucess: "true",
        nextEndpoint: orderInfo.nextEndpoint
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  validateInput(input: SendAdressUserUcInput): void {
    if (
      !input.cep ||
      !input.street ||
      !input.number ||
      !input.city ||
      !input.state
    ) {
      throw new Error("Dados do endereço faltanto");
    }
  }

  validateCep(cep: string): string {
    const verifiedCep = cep.replace(/\D/g, "");
    if (verifiedCep.length !== 8) {
      throw new Error("CEP mal informado");
    }
    return verifiedCep;
  }

  verifyAdressDivergence(input: SendAdressUserUcInput, adressFromApi: any): boolean {
    
    if (
      input.street.toUpperCase() !== adressFromApi.street.toUpperCase() ||
      input.city.toUpperCase() !== adressFromApi.city.toUpperCase() ||
      input.state.toUpperCase() !== adressFromApi.state.toUpperCase()
    ) {
      return true
    }
    return false
  }
}

export interface SendAdressUserUcInput {
  token: string;
  cep: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
}

export interface SendAdressUserUcOutput {
  sucess: string;
  nextEndpoint: string
}