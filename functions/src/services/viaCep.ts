import { GetAdressFromApiGateway } from "../business/gateways/services/getAdressFromApiGateway";

import axios from "axios";

export class ViaCep implements GetAdressFromApiGateway {
  async getAdress(cep: string): Promise<any> {
    try {
      return await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    } catch (err) {
      throw new Error(
        `Erro ao consultar o endereco do cliente pela Api via cep  ${err.message}`
      );
    }
  }
}
