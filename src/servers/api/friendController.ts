// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 添加好友 POST /api/friends/add */
export async function addFriendRecordsUsingPOST(
  body: API.FriendAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean_>('/api/friends/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 同意申请 POST /api/friends/agree/${param0} */
export async function agreeToApplyUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.agreeToApplyUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { fromId: param0, ...queryParams } = params;
  return request<API.CommonResultBoolean_>(`/api/friends/agree/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消申请 POST /api/friends/canceledApply/${param0} */
export async function canceledApplyUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.canceledApplyUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CommonResultBoolean_>(`/api/friends/canceledApply/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除好友 GET /api/friends/delete/${param0} */
export async function deleteFriendRecordsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteFriendRecordsUsingGETParams,
  options?: { [key: string]: any },
) {
  const { friendId: param0, ...queryParams } = params;
  return request<API.CommonResultBoolean_>(`/api/friends/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取我申请的记录 GET /api/friends/getMyRecords */
export async function getMyRecordsUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultListFriendsRecordVO_>('/api/friends/getMyRecords', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询记录 GET /api/friends/getRecords */
export async function getRecordsUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultListFriendsRecordVO_>('/api/friends/getRecords', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询记录 GET /api/friends/getUnreadCount */
export async function getRecordCountUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultInt_>('/api/friends/getUnreadCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 通过用户名搜索用户 GET /api/friends/my/list */
export async function getMyFriendListUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultListUserVO_>('/api/friends/my/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 阅读 GET /api/friends/read */
export async function toReadUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.toReadUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultBoolean_>('/api/friends/read', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
