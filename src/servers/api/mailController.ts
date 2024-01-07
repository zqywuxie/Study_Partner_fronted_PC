// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getCaptcha GET /api/mail/getCaptcha */
export async function getCaptchaUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultString_>('/api/mail/getCaptcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getCaptchaFromRedis GET /api/mail/getCaptcha/${param0} */
export async function getCaptchaFromRedisUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaFromRedisUsingGETParams,
  options?: { [key: string]: any },
) {
  const { email: param0, ...queryParams } = params;
  return request<API.CommonResultString_>(`/api/mail/getCaptcha/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
