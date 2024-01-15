// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";


/** create POST /api/order/create */
export async function createUsingPost(body: API.OrderAddRequest, options?: { [key: string]: any }) {
  return service('/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getById GET /api/order/getById */
export async function getByIdUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return service('/api/order/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
