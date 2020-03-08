export interface GetAdressFromApiGateway {
    getAdress(cep: string): Promise<any>
}