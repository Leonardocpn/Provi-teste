import { GetAdressFromApiGateway } from "../business/gateways/services/getAdressFromApiGateway";

import axios from "axios"


export class ViaCep implements GetAdressFromApiGateway {
    async getAdress(cep: string): Promise<any> {
        
        try{
            
            return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        }catch (err) {
            return {
                message: err.message
            }
                
        }
        
    }
    
}