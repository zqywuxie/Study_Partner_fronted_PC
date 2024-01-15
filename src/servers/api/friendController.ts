// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";


/** 添加好友 POST /api/friends/add */
export async function addFriendRecordsUsingPost(
  body: API.FriendAddRequest,
  options?: { [key: string]: any },
) {
  return service('/api/friends/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 同意申请 POST /api/friends/agree/${param0} */
export async function agreeToApplyUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.agreeToApplyUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { fromId: param0, ...queryParams } = params;
  return service(`/api/friends/agree/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消申请 POST /api/friends/canceledApply/${param0} */
export async function canceledApplyUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.canceledApplyUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/friends/canceledApply/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除好友 GET /api/friends/delete/${param0} */
export async function deleteFriendRecordsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFriendRecordsUsingGETParams,
  options?: { [key: string]: any },
) {
  const { friendId: param0, ...queryParams } = params;
  return service(`/api/friends/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取我申请的记录 GET /api/friends/getMyRecords */
export async function getMyRecordsUsingGet(options?: { [key: string]: any }) {
  return service('/api/friends/getMyRecords', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询记录 GET /api/friends/getRecords */
export async function getRecordsUsingGet(options?: { [key: string]: any }) {
  return service('/api/friends/getRecords', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询记录 GET /api/friends/getUnreadCount */
export async function getRecordCountUsingGet(options?: { [key: string]: any }) {
  return service('/api/friends/getUnreadCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 通过用户名搜索用户 GET /api/friends/my/list */
export async function getMyFriendListUsingGet(options?: { [key: string]: any }) {
  return service('/api/friends/my/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 阅读 GET /api/friends/read */
export async function toReadUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toReadUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/friends/read', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
