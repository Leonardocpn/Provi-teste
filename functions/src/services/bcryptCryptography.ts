import bcrypt from 'bcrypt';
import { EncryptCryptographyGateway } from "../business/gateways/services/cryptographyGateway";


export class BcryptImplamantation implements EncryptCryptographyGateway {
    private static BCRYPT_SALT_ROUNDS = 10

    async encrypt(word: string): Promise<string> {
        try{
            const salt = await bcrypt.genSalt(BcryptImplamantation.BCRYPT_SALT_ROUNDS)
        return await bcrypt.hash(
            word,
            salt
        )
        } catch (err) {
            throw new Error(`Erro ao encriptar o password ${err.message}`)
        }
        
    }

    async compare(word: string, hash: string): Promise<boolean> {
        try{
            return await bcrypt.compare(word, hash)
        }catch (err) {
            throw new Error (`Erro de identificação ${err.message}`)
        }

        
    }
}