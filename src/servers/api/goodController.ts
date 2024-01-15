// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";


/** getById GET /api/good/getById */
export async function getByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/good/getById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getById PUT /api/good/getById */
export async function getByIdUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingPUTParams,
  options?: { [key: string]: any },
) {
  return service('/api/good/getById', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getById POST /api/good/getById */
export async function getByIdUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return service('/api/good/getById', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getById DELETE /api/good/getById */
export async function getByIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return service('/api/good/getById', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getById PATCH /api/good/getById */
export async function getByIdUsingPatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingPATCHParams,
  options?: { [key: string]: any },
) {
  return service('/api/good/getById', {
    method: 'PATCH',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** list GET /api/good/list */
export async function listUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/good/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** reduceStock POST /api/good/reduceStock */
export async function reduceStockUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reduceStockUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return service('/api/good/reduceStock', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
