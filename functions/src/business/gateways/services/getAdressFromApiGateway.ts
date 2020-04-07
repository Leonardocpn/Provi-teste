export interface GetAdressFromApiGateway {
  getAdress(cep: string): Promise<ViaCepAdress>;
}

export interface ViaCepAdress {
  data: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
  };
}
