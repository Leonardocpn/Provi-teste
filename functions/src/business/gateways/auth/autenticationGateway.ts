export interface GenerateTokenAuthenticationGateway {
    generateToken(userId: string): string
}

export interface GetUserIdFromTokenGateway {
    getUserIdFromToken(token:string): string
}
