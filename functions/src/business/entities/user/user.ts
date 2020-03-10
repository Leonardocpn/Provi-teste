export class User {
        
    constructor(
        private id: string,
        private email: string,
        private password: string,
        private endpointsOrder = ["cpf", "fullName", "Address"],
        private phone?: string,
        private adrees?: string,
        private firstName?: string,
        private lastname?: string,
        private birthday?: string,
        
    ) {
    }

    public getId(): string {
        return this.id
    }

    public getFirstName(): string | undefined{
        return this.firstName
    }

    public getLastName(): string | undefined {
        return this.lastname
    }

    public getBirthday(): string | undefined{
        return this.birthday
    }

    public getEmail(): string {
        return this.email
    }

    public getPhone(): string | undefined {
        return this.phone
    }

    public getPassword(): string {
        return this.password
    }

    public getAdress(): string | undefined {
        return this.adrees
    }

    public getEndpointsOrder(): string[] | undefined{
        return this.endpointsOrder
    }
}