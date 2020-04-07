import { GetEndpointsOrder } from "../business/gateways/user/userGateway";
import { getOrderInfo } from "../business/endpoinsInfo/endpoinsInfo";

export async function getOrderInfos(
  getEndpointsOrder: GetEndpointsOrder,
  userId: string,
  useCaseOrder: string
): Promise<OrderInfo> {
  const userOrdemFromDb = await getEndpointsOrder.getOrder(userId);
  const orderInfo: OrderInfo = getOrderInfo(userOrdemFromDb, useCaseOrder);
  return orderInfo;
}

export interface OrderInfo {
  prevTable: string;
  nextEndpoint: string;
}
