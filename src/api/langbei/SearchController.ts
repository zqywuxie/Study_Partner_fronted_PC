// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";

/** searchUsers GET /api/user/search */
export async function searchUserUsingPOST(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    body: API.searchUsersPageUsingGETParams,
    options?: { [key: string]: any },
) {
    return service('/api/search/searchUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}
