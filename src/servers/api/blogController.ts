// @ts-ignore
/* eslint-disable */

import {service} from "@/config/axios";
/** 通过id获取博客 GET /api/blog/${param0} */
export async function getBlogByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBlogByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { blogId: param0, ...queryParams } = params;
  return service(`/api/blog/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 通过id删除博客 DELETE /api/blog/${param0} */
export async function deleteBlogByIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteBlogByIdUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/blog/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加博客 POST /api/blog/add */
export async function addBlogUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addBlogUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return service('/api/blog/add', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 点赞博客 PUT /api/blog/like/${param0} */
export async function likeBlogUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeBlogUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return service(`/api/blog/like/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 博客列表 POST /api/blog/list */
export async function listBlogPageUsingPost(body: API.BlogDTO, options?: { [key: string]: any }) {
  return service('/api/blog/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 我的博客 GET /api/blog/list/my/blog */
export async function listMyBlogsUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMyBlogsUsingGETParams,
  options?: { [key: string]: any },
) {
  return service('/api/blog/list/my/blog', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新博客 PUT /api/blog/update */
export async function updateBlogUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateBlogUsingPUTParams,
  options?: { [key: string]: any },
) {
  return service('/api/blog/update', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
