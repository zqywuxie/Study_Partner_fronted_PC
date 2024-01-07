// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 点赞数 GET /api/like/count */
export async function getCaptchaUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultInt_>('/api/like/count', {
    method: 'GET',
    ...(options || {}),
  });
}
