// @ts-ignore
/* eslint-disable */

import {service} from "@/config/axios";
/** 根据id获取博文评论 GET /api/comments */
export async function listBlogCommentsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listBlogCommentsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/comments', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据id获取评论 GET /api/comments/${param0} */
export async function getCommentByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/comments/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据id删除评论 DELETE /api/comments/${param0} */
export async function deleteBlogCommentUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBlogCommentUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/comments/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加评论 POST /api/comments/add */
export async function addCommentUsingPost(
  body: API.CommentsAddRequest,
  options?: { [key: string]: any },
) {
  return service('/api/comments/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 点赞博文评论 PUT /api/comments/like/${param0} */
export async function likeCommentUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeCommentUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/comments/like/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取我的评论 GET /api/comments/list/my */
export async function listMyBlogCommentsUsingGet(options?: { [key: string]: any }) {
  return service('/api/comments/list/my', {
    method: 'GET',
    ...(options || {}),
  });
}
