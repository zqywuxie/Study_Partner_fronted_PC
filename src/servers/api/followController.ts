// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 关注用户 POST /api/follow/${param0} */
export async function followUserUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.followUserUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { followerId: param0, ...queryParams } = params;
  return request<API.CommonResultString_>(`/api/follow/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取粉丝 GET /api/follow/fans */
export async function listFansUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultListUserVO_>('/api/follow/fans', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取粉丝数量 GET /api/follow/fansCount */
export async function fansCountUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultInt_>('/api/follow/fansCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取我关注的用户 GET /api/follow/my */
export async function listMyFollowUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultListUserVO_>('/api/follow/my', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 我关注数 GET /api/follow/myCount */
export async function myFollowCountUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultInt_>('/api/follow/myCount', {
    method: 'GET',
    ...(options || {}),
  });
}
