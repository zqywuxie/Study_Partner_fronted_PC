// @ts-ignore
/* eslint-disable */
import { request } from 'umi'

/** 获取通知消息 GET /api/message/get/${param0} */
export async function getUserBlogMessageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserBlogMessageUsingGETParams,
  options?: { [key: string]: any }
) {
  const { type: param0, ...queryParams } = params
  return request<API.CommonResultListMessageVO_>(`/api/message/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 获得消息数量 GET /api/message/num/${param0} */
export async function getUserMessageNumUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMessageNumUsingGETParams,
  options?: { [key: string]: any }
) {
  const { type: param0, ...queryParams } = params
  return request<API.CommonResultLong_>(`/api/message/num/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 消息已读 GET /api/message/read/${param0} */
export async function readMessageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.readMessageUsingGETParams,
  options?: { [key: string]: any }
) {
  const { type: param0, ...queryParams } = params
  return request<API.CommonResultBoolean_>(`/api/message/read/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}
