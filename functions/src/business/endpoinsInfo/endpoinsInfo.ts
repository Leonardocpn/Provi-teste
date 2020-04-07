import { OrderInfo } from "../../utils/getOrderInfo";

interface EndpointsInfo {
  name: string;
  table: string;
}

const endpoinsInfo: EndpointsInfo[] = [
  { name: "sendCpf", table: "Cpfs" },
  { name: "sendFullName", table: "Full_Names" },
  { name: "sendBirthday", table: "Birthdays" },
  { name: "sendPhoneNumber", table: "Phone_Numbers" },
  { name: "sendAdress", table: "Adresses" },
  { name: "sendAmountRequested", table: "Loans" },
];

export function getOrderInfo(userOrderFromDb: any, useCase: string): OrderInfo {
  const userOrderArray: string = userOrderFromDb.order;
  const userOrderArraySplit = userOrderArray.split(",");
  if (userOrderArraySplit.indexOf(useCase) === -1) {
    throw new Error("Endpoint não requisitado para o usuário");
  }
  const useCaseOrder = getUseCaseOrder(userOrderArraySplit, useCase);
  let prevTable: string = "";
  let nextEndpoint: string = "ultimo endpoint";
  for (const i of endpoinsInfo) {
    if (i.name === useCaseOrder.prevUseCase) {
      prevTable = i.table;
    }
  }
  if (useCaseOrder.nextIndex < userOrderArraySplit.length) {
    nextEndpoint = useCaseOrder.nextUseCase;
  }
  return {
    prevTable,
    nextEndpoint,
  };
}

function getUseCaseOrder(
  userOrderArraySplit: string[],
  useCase: string
): UseCaseOrder {
  const prevIndex = userOrderArraySplit.indexOf(useCase) - 1;
  const nextIndex = userOrderArraySplit.indexOf(useCase) + 1;
  const prevUseCase = userOrderArraySplit[prevIndex];
  const nextUseCase = userOrderArraySplit[nextIndex];
  return { prevUseCase, nextUseCase, nextIndex };
}

interface UseCaseOrder {
  prevUseCase: string;
  nextUseCase: string;
  nextIndex: number;
}
