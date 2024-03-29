// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";

/** 根据信息类型获取通知消息 GET /api/message/get/${param0} */
export async function getUserBlogMessageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserBlogMessageUsingGETParams,
  options?: { [key: string]: any },
) {
  const { type: param0, ...queryParams } = params;
  return service(`/api/message/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获得所有通知信息 GET /api/message/list */
export async function listMessageUsingGet(options?: { [key: string]: any }) {
  return service('/api/message/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得消息数量 GET /api/message/num/${param0} */
export async function getUserMessageNumUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMessageNumUsingGETParams,
  options?: { [key: string]: any },
) {
  const { type: param0, ...queryParams } = params;
  return service(`/api/message/num/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 消息已读 GET /api/message/read/${param0} */
export async function readMessageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.readMessageUsingGETParams,
  options?: { [key: string]: any },
) {
  const { type: param0, ...queryParams } = params;
  return service(`/api/message/read/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
