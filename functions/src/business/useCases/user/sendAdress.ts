import { GetUserIdFromTokenGateway } from "../../gateways/auth/autenticationGateway";
import { SendAdressUserGateway } from "../../gateways/user/userGateway";
import moment from "moment";
import { GetAdressFromApiGateway } from "../../gateways/services/getAdressFromApiGateway";

export class SendAdressUserUc {
  constructor(
    private getUserIdFromTokenGateway: GetUserIdFromTokenGateway,
    private sendAdressUserGateway: SendAdressUserGateway,
    private getAdressFromApiGateway: GetAdressFromApiGateway
  ) {}

  async execute(input: SendAdressUserUcInput): Promise<SendAdressUserUcOutput> {
    try {
      this.validateInput(input);
      const validateCep = this.validateCep(input.cep);
      const userId: string = this.getUserIdFromTokenGateway.getUserIdFromToken(
        input.token
      );
      const date = moment().format("DD/MM/YYYY HH-mm-ss");
      const externalAdress = await this.getAdressFromApiGateway.getAdress(
        validateCep
      );
      this.verifyAdress(input, externalAdress);
      await this.sendAdressUserGateway.sendAdress(
        Number(validateCep),
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        userId,
        date
      );
      return {
        message: "Endereço cadastrado com sucesso"
      };
    } catch (err) {
      return {
        message: err.message
      };
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

  validateCep(cep: number): string {
    const verifiedCep = cep.toString().replace(/\D/g, "");
    if (verifiedCep.length !== 8) {
      throw new Error("CEP mal informado");
    }
    return verifiedCep;
  }

  verifyAdress(input: SendAdressUserUcInput, externalAdress: any) {
    const adress: any = externalAdress.data;
    if (
      input.street.toUpperCase() !== adress.logradouro.toUpperCase() ||
      input.city.toUpperCase() !== adress.localidade.toUpperCase() ||
      input.state.toUpperCase() !== adress.uf.toUpperCase()
    ) {
      throw new Error("Endereço com divergencias");
    }
  }
}

export interface SendAdressUserUcInput {
  token: string;
  cep: number;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
}

export interface SendAdressUserUcOutput {
  message: string;
}

// interface ExternalAdress {
//     logradouro: string
//     localidade: string
//     uf: string

// }
