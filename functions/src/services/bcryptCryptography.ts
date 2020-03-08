import bcrypt from 'bcrypt';
import {EncryptCryptographyGateway} from "../business/gateways/cryptography/cryptographyGateway";


export class BcryptImplamantation implements EncryptCryptographyGateway {
    private static BCRYPT_SALT_ROUNDS = 10

    async encrypt(word: string): Promise<string> {
        const salt = await bcrypt.genSalt(BcryptImplamantation.BCRYPT_SALT_ROUNDS)
        return await bcrypt.hash(
            word,
            salt
        )
    }

    async compare(word: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(word, hash)
    }
}