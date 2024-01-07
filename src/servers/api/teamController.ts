// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";
/** add POST /api/team/add */
export async function addUsingPOST(body: API.TeamAddRequest, options?: { [key: string]: any }) {
  return service('/api/team/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delete POST /api/team/delete */
export async function deleteUsingPOST(
  body: API.TeamDeleteRequest,
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

/** searchTeamByID GET /api/team/get */
export async function searchTeamByIDUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchTeamByIDUsingGETParams,
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

/** searchAll GET /api/team/list */
export async function searchAllUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchAllUsingGETParams,
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

/** searchAllByPage GET /api/team/list/page */
export async function searchAllByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchAllByPageUsingGETParams,
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

/** myCreateTeams GET /api/team/my/create */
export async function myCreateTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myCreateTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/team/my/create', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** myJoinTeams GET /api/team/my/join */
export async function myJoinTeamsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.myJoinTeamsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/team/my/join', {
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

/** update POST /api/team/update */
export async function updateUsingPOST(
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
