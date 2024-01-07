// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";
/** 校验验证码 GET /api/user/check */
export async function checkCodeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkCodeUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/user/check', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** currentUser GET /api/user/current */
export async function currentUserUsingGET(options?: { [key: string]: any }) {
  return service('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** delete POST /api/user/delete */
export async function deleteUsingPOST1(body: API.User, options?: { [key: string]: any }) {
  return service('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 通过邮箱查询用户 GET /api/user/email */
export async function getUserByEmailUsingGET(body: string, options?: { [key: string]: any }) {
  return service('/api/user/email', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** loginByEmail POST /api/user/email/login */
export async function loginByEmailUsingPOST(
  body: API.LoginByEmailRequest,
  options?: { [key: string]: any },
) {
  return service('/api/user/email/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 PUT /api/user/forget/update */
export async function updatePasswordUsingPUT(body: string, options?: { [key: string]: any }) {
  return service('/api/user/forget/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Login POST /api/user/login */
export async function LoginUsingPOST(body: API.LoginRequest, options?: { [key: string]: any }) {
  return service('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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

/** outLogin POST /api/user/outLogin */
export async function outLoginUsingPOST(options?: { [key: string]: any }) {
  return service('/api/user/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** recommend GET /api/user/recommend */
export async function recommendUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.recommendUsingGETParams,
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

/** register POST /api/user/register */
export async function registerUsingPOST(
  body: API.RegisterRequest,
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

/** searchUserById GET /api/user/search/${param0} */
export async function searchUserByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/user/search/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** searchUsersByTags GET /api/user/search/tags */
export async function searchUsersByTagsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchUsersByTagsUsingGETParams,
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

/** searchByText GET /api/user/searchByText */
export async function searchByTextUsingGET(body: API.UserDTO, options?: { [key: string]: any }) {
  return service('/api/user/searchByText', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** update POST /api/user/update */
export async function updateUsingPOST1(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return service('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}