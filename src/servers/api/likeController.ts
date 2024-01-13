// @ts-ignore
/* eslint-disable */
import {service} from '@/config/axios'

/** 点赞数 GET /api/like/count */
export async function getLikeCountUsingGet(options?: { [key: string]: any }) {
    return service('/api/like/count', {
        method: 'GET',
        ...(options || {})
    })
}
