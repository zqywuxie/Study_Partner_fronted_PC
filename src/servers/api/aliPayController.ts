// @ts-ignore
/* eslint-disable */

import {service} from "@/config/axios";

/** aliPayNotify POST /api/ali/notify */
export async function aliPayNotifyUsingPost(options?: { [key: string]: any }) {
  return service('/api/ali/notify', {
    method: 'POST',
    ...(options || {}),
  });
}

/** payOrder GET /api/ali/pay */
export async function payOrderUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.payOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/ali/pay', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
