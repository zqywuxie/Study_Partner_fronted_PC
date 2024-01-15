// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";


/** 关注用户 POST /api/follow/${param0} */
export async function followUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.followUserUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { followerId: param0, ...queryParams } = params;
  return service(`/api/follow/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取粉丝 GET /api/follow/fans */
export async function listFansUsingGet(options?: { [key: string]: any }) {
  return service('/api/follow/fans', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取粉丝数量 GET /api/follow/fansCount */
export async function fansCountUsingGet(options?: { [key: string]: any }) {
  return service('/api/follow/fansCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取我关注的用户 GET /api/follow/my */
export async function listMyFollowUsingGet(options?: { [key: string]: any }) {
  return service('/api/follow/my', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 我关注数 GET /api/follow/myCount */
export async function myFollowCountUsingGet(options?: { [key: string]: any }) {
  return service('/api/follow/myCount', {
    method: 'GET',
    ...(options || {}),
  });
}
