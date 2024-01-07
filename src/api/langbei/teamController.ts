// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";

/** addTeam POST /api/team/add */
export async function addTeamUsingPOST(body: API.TeamAddRequest, options?: { [key: string]: any }) {
  return service('/api/team/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteTeam POST /api/team/delete */
export async function deleteTeamUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return service('/api/team/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTeamById GET /api/team/get */
export async function getTeamByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTeamByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/team/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** getTeamById GET /api/team/get */
export async function getTeamListByUserIdUsingGET(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getTeamListByUserIdUsingGETParams,
    options?: { [key: string]: any },
) {
  return service('/api/team/list/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** joinTeam POST /api/team/join */
export async function joinTeamUsingPOST(
  body: API.TeamJoinRequest,
  options?: { [key: string]: any },
) {
  return service('/api/team/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listTeams GET /api/team/list */
export async function listTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/team/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMyCreateTeams GET /api/team/list/my/create */
export async function listMyCreateTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMyCreateTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/team/list/my/create', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMyJoinTeams GET /api/team/list/my/join */
export async function listMyJoinTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMyJoinTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/team/list/my/join', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listTeamsByPage GET /api/team/list/page */
export async function listTeamsByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTeamsByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/team/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** quitTeam POST /api/team/quit */
export async function quitTeamUsingPOST(
  body: API.TeamQuitRequest,
  options?: { [key: string]: any },
) {
  return service('/api/team/quit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateTeam POST /api/team/update */
export async function updateTeamUsingPOST(
  body: API.TeamUpdateRequest,
  options?: { [key: string]: any },
) {
  return service('/api/team/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
