// @ts-ignore
/* eslint-disable */

import {service} from "@/config/axios";

/** getCurrentUser GET /api/user/current */
export async function getCurrentUserUsingGET(options?: { [key: string]: any }) {
  return service('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** deleteUsers POST /api/user/delete */
export async function deleteUsersUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return service('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return service('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPOST(options?: { [key: string]: any }) {
  return service('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** matchUsers GET /api/user/match */
export async function matchUsersUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.matchUsersUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/user/match', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** recommendUsers GET /api/user/recommend */
export async function recommendUsersUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.recommendUsersUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/user/recommend', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return service('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** searchUsers GET /api/user/search */
export async function searchUsersUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchUsersUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/user/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** searchUsers GET /api/user/search */
export async function searchUsersPageUsingPOST(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    body: API.searchUsersPageUsingGETParams,
    options?: { [key: string]: any },
) {
  return service('/api/user/searchPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** searchUserByTags GET /api/user/search/tags */
export async function searchUserByTagsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchUserByTagsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/user/search/tags', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPOST(body: API.User, options?: { [key: string]: any }) {
  return service('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function getUserListByIdsUsingPOST(body, options?: { [key: string]: any }) {
  return service('/api/user/getUserListByIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

