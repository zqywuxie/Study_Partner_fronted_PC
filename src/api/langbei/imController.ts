// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";

/** findAll GET /api/im */
export async function findAllUsingGET(options?: { [key: string]: any }) {
  return service('/api/im', {
    method: 'GET',
    ...(options || {}),
  });
}

/** update PUT /api/im */
export async function updateUsingPUT(body: API.Im, options?: { [key: string]: any }) {
  return service('/api/im', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** save POST /api/im */
export async function saveUsingPOST(body: API.Im, options?: { [key: string]: any }) {
  return service('/api/im', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** findOne GET /api/im/${param0} */
export async function findOneUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOneUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/im/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** delete DELETE /api/im/${param0} */
export async function deleteUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/im/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** deleteBatch POST /api/im/del/batch */
export async function deleteBatchUsingPOST(body: number[], options?: { [key: string]: any }) {
  return service('/api/im/del/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** findAllInit GET /api/im/init/${param0} */
export async function findAllInitUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findAllInitUsingGETParams,
  options?: { [key: string]: any },
) {
  const { limit: param0, ...queryParams } = params;
  return service(`/api/im/init/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** findPage GET /api/im/page */
export async function findPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/im/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
