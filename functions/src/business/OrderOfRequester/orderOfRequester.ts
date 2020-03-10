export const Order: OrderInterface[] = [
    { prevTable: "", nextEndpoint: "sendFullName" },
    { prevTable: "Cpfs", nextEndpoint: "sendBirthday" },
    { prevTable: "Full_Names", nextEndpoint: "sendPhoneNumber" },
    { prevTable: "Birthdays", nextEndpoint: "sendAdress" },
    { prevTable: "Phone_Numbers", nextEndpoint: "sendAmountRequested" },
    { prevTable: "Adresses", nextEndpoint: "Todos os dados preenchidos" }]

export enum UseCase {
    CPF = 0,
    FULL_NAME,
    BIRTHDAY,
    PHONE_NUMBER,
    ADRESS,
    AMOUNT_REQUESTED
}

export interface OrderInterface {
    prevTable: string,
    nextEndpoint: string
}
