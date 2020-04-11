export class User {
  private endpointsOrder: string[];
  constructor(
    private id: string,
    private email: string,
    private password: string,
    private cpf?: string,
    private phone?: string,
    private adrees?: string,
    private firstName?: string,
    private lastname?: string,
    private birthday?: string,
    private loan?: number
  ) {
    this.endpointsOrder = [
      "sendCpf",
      "sendFullName",
      "sendBirthday",
      "sendPhoneNumber",
      "sendAdress",
      "sendAmountRequested",
    ];
  }

  public getId(): string {
    return this.id;
  }

  public getCpf(): string | undefined {
    return this.cpf;
  }

  public getFirstName(): string | undefined {
    return this.firstName;
  }

  public getLastName(): string | undefined {
    return this.lastname;
  }

  public getBirthday(): string | undefined {
    return this.birthday;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string | undefined {
    return this.phone;
  }

  public getPassword(): string {
    return this.password;
  }

  public getAdress(): string | undefined {
    return this.adrees;
  }

  public getEndpointsOrder(): string[] {
    return this.endpointsOrder;
  }

  public getLoan(): number | undefined {
    return this.loan;
  }
}
