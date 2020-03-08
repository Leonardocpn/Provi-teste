import * as jwt from 'jsonwebtoken'

import {
    GenerateTokenAuthenticationGateway,
    GetUserIdFromTokenGateway
} from '../business/gateways/auth/autenticationGateway';

export class JWTCryptography implements GenerateTokenAuthenticationGateway, GetUserIdFromTokenGateway {

    private static EXPIRES_IN = "1h"

    getJWTSecretKey(): string {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('Chave JWT não informada')
        }
        return process.env.JWT_SECRET_KEY
    }

    generateToken(userId: string): string {
        return jwt.sign(
            {userId},
            this.getJWTSecretKey(),
            {expiresIn: JWTCryptography.EXPIRES_IN}
        )
    }

    getUserIdFromToken(token: string): string {
        const jwtData = jwt.verify(token, this.getJWTSecretKey()) as JWTData
        return jwtData.userId
    }

}

interface JWTData {
    userId: string
    iat: string
    exp: number
}