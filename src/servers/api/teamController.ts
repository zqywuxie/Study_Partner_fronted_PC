// @ts-ignore
/* eslint-disable */

import {service} from '@/config/axios'

/** add POST /api/team/add */
export async function addUsingPost(body: API.TeamAddRequest, options?: { [key: string]: any }) {
    return service('/api/team/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body,
        ...(options || {})
    })
}

/** delete POST /api/team/delete */
export async function deleteUsingPost(
    body: API.TeamDeleteRequest,
    options?: { [key: string]: any }
) {
    return service('/api/team/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body,
        ...(options || {})
    })
}

/** searchTeamByID GET /api/team/get */
export async function searchTeamByIdUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.searchTeamByIDUsingGETParams,
    options?: { [key: string]: any }
) {
    return service('/api/team/get', {
        method: 'GET',
        params: {
            ...params
        },
        ...(options || {})
    })
}

/** joinTeam POST /api/team/join */
export async function joinTeamUsingPost(
    body: API.TeamJoinRequest,
    options?: { [key: string]: any }
) {
    return service('/api/team/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body,
        ...(options || {})
    })
}

/** searchAllByPage GET /api/team/list/page */
export async function searchAllByPageUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.searchAllByPageUsingGETParams,
    options?: { [key: string]: any }
) {
    return service('/api/team/list/page', {
        method: 'GET',
        params: {
            ...params
        },
        ...(options || {})
    })
}

/** myCreateTeams GET /api/team/my/create */
export async function myCreateTeamsUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.myCreateTeamsUsingGETParams,
    options?: { [key: string]: any }
) {
    return service('/api/team/my/create', {
        method: 'GET',
        params: {
            ...params
        },
        ...(options || {})
    })
}

/** myJoinTeams GET /api/team/my/join */
export async function myJoinTeamsUsingGet(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.myJoinTeamsUsingGETParams,
    options?: { [key: string]: any }
) {
    return service('/api/team/my/join', {
        method: 'GET',
        params: {
            ...params
        },
        ...(options || {})
    })
}

/** getMyTeams GET /api/team/myTeam */
export async function getMyTeamsUsingGet(params: API.myCreateTeamsUsingGETParams, options?: { [key: string]: any }) {
    return service('/api/team/myTeam', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {})
    })
}

/** quitTeam POST /api/team/quit */
export async function quitTeamUsingPost(
    body: API.TeamQuitRequest,
    options?: { [key: string]: any }
) {
    return service('/api/team/quit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body,
        ...(options || {})
    })
}

/** update POST /api/team/update */
export async function updateUsingPost(
    body: API.TeamUpdateRequest,
    options?: { [key: string]: any }
) {
    return service('/api/team/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: body,
        ...(options || {})
    })
}
