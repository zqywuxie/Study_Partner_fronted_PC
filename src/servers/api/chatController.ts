// @ts-ignore
/* eslint-disable */
import {service} from "@/config/axios";
/** 获取大厅聊天 GET /api/chat/hallChat */
export async function getHallChatUsingGet(options?: { [key: string]: any }) {
  return service('/api/chat/hallChat', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取私聊 POST /api/chat/privateChat */
export async function getPrivateChatUsingPost(
  body: API.ChatRequest,
  options?: { [key: string]: any },
) {
  return service('/api/chat/privateChat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取私聊用户 GET /api/chat/privateUser */
export async function getPrivateUserUsingGet(options?: { [key: string]: any }) {
  return service('/api/chat/privateUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取队伍聊天 POST /api/chat/teamChat */
export async function getTeamChatUsingPost(
  body: API.ChatRequest,
  options?: { [key: string]: any },
) {
  return service('/api/chat/teamChat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
