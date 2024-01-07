// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取大厅聊天 GET /api/chat/hallChat */
export async function getHallChatUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultListChatMessageVO_>('/api/chat/hallChat', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取私聊 POST /api/chat/privateChat */
export async function getPrivateChatUsingPOST(
  body: API.ChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultListChatMessageVO_>('/api/chat/privateChat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取私聊用户 GET /api/chat/privateUser */
export async function getPrivateUserUsingGET(options?: { [key: string]: any }) {
  return request<API.CommonResultListUserVO_>('/api/chat/privateUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取队伍聊天 POST /api/chat/teamChat */
export async function getTeamChatUsingPOST(
  body: API.ChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultListChatMessageVO_>('/api/chat/teamChat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}