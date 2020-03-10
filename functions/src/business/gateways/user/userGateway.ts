import { User } from "../../entities/user/user";

export interface CreateUserGateway {
  createUser(user: User): Promise<void>;
}

export interface GetUserByEmailGateway {
  getUserByEmail(email: string): Promise<User>;
}

export interface GetUserByIdGateway {
  getUserById(id: string): Promise<boolean>;
}

export interface SendCpfUserGateway {
  sendCpfUser(cpf: string, userId: string, date: string): Promise<void>;
}

export interface SendFullNameUserGateway {
  sendFullNameUser(
    fullName: string,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void>;
}

export interface SendPhoneNumberUserGateway {
  sendPhoneNumber(
    phoneNumber: number,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void>;
}

export interface SendBirthdayUserGateway {
  sendBirthday(brithday: string, userId: string, date: string,prevTable: string): Promise<void>;
}

export interface SendAdressUserGateway {
  sendAdress(
    cep: number,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    userId: string,
    date: string,
    prevTable: string
  ): Promise<void>;
}

export interface SendAmountRequestedGateway {
  sendAmountRequested(amountRequested: number, userId: string, date: string,
    prevTable: string): Promise<void>
}

export interface GetEndpointsOrder {
  getOrder(userId: string): Promise<string[]>
}
