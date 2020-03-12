const endpoinsInfo: { name: string, table: string }[] = [
    { name: "sendCpf", table: "Cpfs" },
    { name: "sendFullName", table: "Full_Names" },
    { name: "sendBirthday", table: "Birthdays" },
    { name: "sendPhoneNumber", table: "Phone_Numbers" },
    { name: "sendAdress", table: "Adresses" },
    { name: "sendAmountRequested", table: "Loans" }]


export function getOrderInfo(userOrdemFromDb: any, usecase: string): { prevTable: string, nextEndpoint: string } {
    const userOrderArray: string = userOrdemFromDb.order
    const userOrderArraySplit = userOrderArray.split(",")
    if(userOrderArraySplit.indexOf(usecase) === -1){
        throw new Error ("Endpoint não requisitado para o usuário")
    }
    const prevIndex = userOrderArraySplit.indexOf(usecase) - 1
    const nextIndex = userOrderArraySplit.indexOf(usecase) + 1
    const prevUseCase = userOrderArraySplit[prevIndex]
    const nextUsecase = userOrderArraySplit[nextIndex]
    let prevTable: string = ""
    let nextEndpoint: string = "ultimo endpoint"
    for (const i of endpoinsInfo) {
        if (i.name === prevUseCase) {
            prevTable = i.table
        }
    }
    if (nextIndex < userOrderArraySplit.length) {
        nextEndpoint = nextUsecase
    }
    return {
        prevTable,
        nextEndpoint
    }
}