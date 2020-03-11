export interface EncryptCryptographyGateway {
    encrypt(word: string): Promise<string>
}

export interface CompareCryptographyGateway {
    compare(encryptedPassword: string, hash: string): Promise<boolean>
}