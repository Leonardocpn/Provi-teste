import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import {
  SendAdressUserGateway,
  GetEndpointsOrder,
  UserAdress,
  AdressFromApi,
} from "../../gateways/user/userGateway";
import {
  GetAdressFromApiGateway,
  ViaCepAdress,
} from "../../gateways/services/getAdressFromApiGateway";
import { getDate } from "../../../utils/getDate";
import { getOrderInfo } from "../../../business/endpoinsInfo/endpoinsInfo";

export class SendAdressUserUc {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendAdressUserGateway: SendAdressUserGateway,
    private getAdressFromApiGateway: GetAdressFromApiGateway,
    private getEndpointsOrder: GetEndpointsOrder,
    private useCaseName: string = "sendAdress"
  ) {}

  async execute(input: SendAdressUserUcInput): Promise<SendAdressUserUcOutput> {
    try {
      this.validateInput(input);
      const validateCep = this.validateCep(input.cep);
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = getDate();
      const orderInfo = await getOrderInfo(
        this.getEndpointsOrder,
        userId,
        this.useCaseName
      );
      const externalAdress = await this.getExternalAdress(validateCep, input);

      const userAdress: UserAdress = {
        cep: validateCep,
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
      };

      await this.sendAdressUserGateway.sendAdress(
        userAdress,
        userId,
        date,
        orderInfo.prevTable,
        externalAdress
      );
      return {
        sucess: "true",
        nextEndpoint: orderInfo.nextEndpoint,
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

  verifyAdressDivergence(
    input: SendAdressUserUcInput,
    externalAdress: ViaCepAdress
  ): boolean {
    if (
      input.street.toUpperCase() !==
        externalAdress.data.logradouro.toUpperCase() ||
      input.city.toUpperCase() !==
        externalAdress.data.localidade.toUpperCase() ||
      input.state.toUpperCase() !== externalAdress.data.uf.toUpperCase()
    ) {
      return true;
    }
    return false;
  }

  async getExternalAdress(
    validateCep: string,
    input: SendAdressUserUcInput
  ): Promise<AdressFromApi> {
    const externalAdress = await this.getAdressFromApiGateway.getAdress(
      validateCep
    );
    const adressDivergence = this.verifyAdressDivergence(input, externalAdress);
    return {
      streetApi: externalAdress.data.logradouro,
      cityApi: externalAdress.data.localidade,
      stateApi: externalAdress.data.uf,
      divergenceFromApi: adressDivergence,
    };
  }
}

export interface SendAdressUserUcInput {
  token: string | undefined;
  cep: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
}

export interface SendAdressUserUcOutput {
  sucess: string;
  nextEndpoint: string;
}
