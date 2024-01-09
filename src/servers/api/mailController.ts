// @ts-ignore
/* eslint-disable */

import { service } from '@/config/axios'
/** getCaptcha GET /api/mail/getCaptcha */
export async function getCaptchaUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaUsingGET1Params,
  options?: { [key: string]: any }
) {
  return service('/api/mail/getCaptcha', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** getCaptchaFromRedis GET /api/mail/getCaptcha/${param0} */
export async function getCaptchaFromRedisUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaFromRedisUsingGETParams,
  options?: { [key: string]: any }
) {
  const { email: param0, ...queryParams } = params
  return service(`/api/mail/getCaptcha/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}
