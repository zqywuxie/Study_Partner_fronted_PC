// @ts-ignore
/* eslint-disable */
import { service } from '@/config/axios'

/** 点赞数 GET /api/like/count */
export async function getCaptchaUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResultInt_>('/api/like/count', {
    method: 'GET',
    ...(options || {})
  })
}
