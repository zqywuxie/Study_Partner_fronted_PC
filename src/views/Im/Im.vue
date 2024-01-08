<template>

  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-card class="box-card" style="width: 200px">
          <template #header>
            <!-- todo 添加好友列表-->
            <div class="user-card-header">
              <span>在线列表</span>
            </div>
          </template>
          <el-empty v-if="!onlineUsers || onlineUsers.length === 1" description="还没有人在线喔~"/>
          <div v-for="item in onlineUsers" style="margin-bottom: 8px">
            <el-popover
                :width="200"
                placement="top-start"
                trigger="hover"
            >
              <template #reference>
                <div v-if="item.id !== currentUser.id" style="display: flex; align-items: center;">
                  <template v-if="item.isNew">
                    <el-badge class="item" is-dot>
                      <el-avatar :size="50" :src="item.avatarUrl" @click="checkToUser(item)"/>
                    </el-badge>
                  </template>
                  <template v-else>
                    <el-avatar :size="50" :src="item.avatarUrl" @click="checkToUser(item)"/>
                  </template>
                  <span style="margin-left: 5px">{{ item.username }}</span>
                </div>
              </template>
              <div style="line-height: 20px">
                <div style="font-size: 16px">{{ item.username }}</div>
                <div style="font-size: 12px;">{{ item.useraccount }}</div>
              </div>
            </el-popover>
          </div>
        </el-card>
        <!--    队伍列表-->
        <el-card class="box-card" style="width: 200px">
          <template #header>
            <!-- todo 添加好友列表-->
            <div class="user-card-header">
              <span>群聊列表</span>
            </div>
          </template>
          <el-empty v-if="!onlineUsers || onlineUsers.length === 1" description="还没有人在线喔~"/>
          <div v-for="item in onlineUsers" style="margin-bottom: 8px">
            <el-popover
                :width="200"
                placement="top-start"
                trigger="hover"
            >
              <template #reference>
                <div v-if="item.id !== currentUser.id" style="display: flex; align-items: center;">
                  <template v-if="item.isNew">
                    <el-badge class="item" is-dot>
                      <el-avatar :size="50" :src="item.avatarUrl" @click="checkToUser(item)"/>
                    </el-badge>
                  </template>
                  <template v-else>
                    <el-avatar :size="50" :src="item.avatarUrl" @click="checkToUser(item)"/>
                  </template>
                  <span style="margin-left: 5px">{{ item.username }}</span>
                </div>
              </template>
              <div style="line-height: 20px">
                <div style="font-size: 16px">{{ item.username }}</div>
                <div style="font-size: 12px;">{{ item.useraccount }}</div>
              </div>
            </el-popover>
          </div>
        </el-card>

      </el-aside>


      <el-main style="padding: 0">
        <div v-if="!isChat">
          <el-empty :image-size="200" description="快去选择一名好友聊天吧！"/>
        </div>

        <div v-else style="width: 90%; margin: 0 auto">
          <div class="imHeader">
            <el-card class="box-card">

              <div slot="header" class="im-card-header">
                <div style="display: flex; align-items: center;">
                  <el-avatar :size="50" :src="toUser.avatarUrl"/>
                  <span style="margin-left: 5px">{{ toUser.username }}</span>
                </div>
                <el-button type="info" @click="getHistoryMessage(toUser.id)">获取历史消息</el-button>
                <el-button type="info" @click="closeChat">关闭聊天</el-button>
              </div>
            </el-card>
          </div>
          <div ref="divRef"
               style="background-color: white; padding: 20px; border: 1px solid #ccc; border-radius: 10px; height: 380px; overflow-y: scroll;">
            <div v-for="item in messages" :key="item.id">

              <!--对方的消息-->
              <div v-if="!item.isMy" style="display: flex; margin: 20px 0;">
                <el-popover
                    :width="100"
                    placement="top-start"
                    trigger="click"
                >
                  <template #reference>
                    <img :src="toUser.avatarUrl" alt=""
                         style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px">
                  </template>
                  <div style="line-height: 20px">
                    <div style="font-size: 16px">{{ toUser.username }}</div>
                    <div style="font-size: 12px;">{{ toUser.profile }}</div>
                  </div>
                </el-popover>
                <!--          <div style="width: 50px; line-height: 30px; margin-left: 5px; color: #888; overflow: hidden; font-size: 14px">{{ item.username }}</div>-->
                <div
                    style="line-height: 30px; background-color: aliceblue; padding: 0 10px; width:fit-content; border-radius: 10px">
                  {{ item.text }}
                </div>
              </div>

              <!-- 自己发送的消息-->
              <div v-else
                   style="display: flex; justify-content: flex-end; margin: 20px 0;">
                <div
                    style="line-height: 30px; background-color: lightyellow; padding: 0 10px; width:fit-content; border-radius: 10px;">
                  {{ item.text }}
                </div>
                <el-popover
                    :width="100"
                    placement="top-start"
                    trigger="hover"
                >
                  <template #reference>
                    <img :src="currentUser.avatarUrl" alt=""
                         style="width: 30px; height: 30px; border-radius: 50%; margin-left: 10px">
                  </template>
                  <div style="line-height: 20px">
                    <div style="font-size: 16px">{{ currentUser.username }}</div>
                    <div style="font-size: 12px;">{{ currentUser.useraccount }}</div>
                  </div>
                </el-popover>
              </div>


            </div>
          </div>

          <div style="margin: 10px 0; width: 100%">
            <V3Emoji v-model="text" :keep="true" :options-name="optionsName" :recent="true" :textArea="true"
                     default-select="recent" size="mid"/>
            <div style="text-align: right">
              <el-button type="primary" @click="send">发送</el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
import {useAppStoreWithOut} from "../../store/modules/app";
import {useCache} from "../../hooks/web/useCache";
import {findAllInitUsingGET} from "../../api/langbei/imController";

import {getPrivateChatUsingPOST} from "../../servers/api/chatController"
import {getUserListByIdsUsingPOST} from "@/api/langbei/userController";
import {ElMessage} from "element-plus";
import ChatMessageVO = API.ChatMessageVO;

//定义消息的类型
interface ImMessage {
  uid;
  toId;
  text;
  username;
  avatarUrl;
  profile;
}

interface ImMessageRequest {
  type;
  im;
}


const messages = ref<API.ChatMessageVO[]>([])
const appStore = useAppStoreWithOut()
const {wsCache} = useCache()
const text = ref('')  // 聊天输入的内容
const toUser = ref<API.User>()  // 聊天对象
const divRef = ref()   // 聊天框的引用
const currentUser = ref();
const limitMessage = ref(10);
const loginUserIdList = ref();
const loginUserList = ref();
const onlineUsers = ref([])
let private_socket: WebSocket;
// 页面滚动到最新位置的函数
const scrollBottom = () => {
  nextTick(() => {   // 等到页面元素出来之后再去滚动
    divRef.value.scrollTop = divRef.value.scrollHeight
  })
}


const stats = ref({
  user: {
    id: 0,
    username: "",
    avatarUrl: ''
  },
  isCollapse: false,
  users: [],
  chatUser: {
    id: 0,
    username: ''
  },
  chatEnum: {
    // 私聊
    PRIVATE_CHAT: 1,
    // 队伍聊天
    TEAM_CHAT: 2,
    // 大厅
    HALL_CHAT: 3
  },
  chatType: null,
  team: {
    teamId: 0,
    teamName: ''
  },
  text: "",
  messages: [],
  content: ''
})
const isChat = ref(false)
const closeChat = () => {
  isChat.value = false
}
// 页面加载完成触发此函数
onMounted(() => {
  // request.get("/im/init/10").then(res => {
  //   messages.value = res.data
  // })
  init()
  scrollBottom()
})
const send = () => {
  if (!toUser) {
    ElMessage({
      message: "聊天对象不能为空",
      type: "warning"
    })
    return
  }
  if (!text.value.trim()) {
    ElMessage("请输入内容")
    return
  } else {
    if (typeof (WebSocket) == "undefined") {
      ElMessage({
        message: "您的浏览器不支持WebSocket",
        type: 'warning'
      })
    } else {
      let message = {
        fromId: currentUser.value.id,
        toId: toUser.value.id,
        text: text.value,
        chatType: stats.value.chatEnum.PRIVATE_CHAT,
      }

      console.log(message)
      //todo 发送消息,问题消息fromId也变成了toId
      private_socket.send(JSON.stringify(message));
      const newMessage = {text: text.value, isMy: true} as API.ChatMessageVO; // 假设content是消息内容
      messages.value.push(newMessage);

      text.value = '';
    }
  }
}

const heartbeatInterval = 30 * 1000; // 30秒
let heartbeatTimer = null;
const startHeartbeat = (socket) => {
  heartbeatTimer = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("PING");
    }
  }, heartbeatInterval);
}
const stopHeartbeat = () => {
  clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}
//  todo 编写心跳机制，设置关闭连接的超时时长
const checkToUser = (checkUser) => {
  isChat.value = true
  toUser.value = checkUser
  let socketUrl = `ws://localhost:8081/api/websocket/${currentUser.value.id}/${NaN}`
  console.log(socketUrl)
  const client = new WebSocket(socketUrl)
  client.onopen = () => {
    // console.log('open')
    ElMessage({
      message: `与用户：${checkUser.username}聊天连接已建立，开始聊天吧`,
      type: 'success'
    })
    startHeartbeat(client);
    private_socket = client
  }
  client.onclose = () => {  // 页面刷新的时候和后台websocket服务关闭的时候
    ElMessage.error('服务器断开，请刷新重试');
    stopHeartbeat()
    console.log('close')
  }

// 当收到消息
  client.onmessage = (msg) => {
    if (msg.data === "pong") {
      return;
    }
    // console.log(msg.data)
    if (msg.data) {
      // console.log(msg.data)
      let json = JSON.parse(msg.data)
      //  判断是什么信息
      if (json['users']) {
        onlineUsers.value = json['users']
      } else {
        // 实时数据
        console.log(msg.data)
      }
    }
  }
}

//获取历史消息
const getHistoryMessage = (id) => {
  getPrivateChatUsingPOST({
    toId: id,
    formId: currentUser.value.id
  }).then(res => {
    console.log(res)
    // console.log(res.data)
    messages.value = res.data
    // limitMessage.value += 10;
  });

}

const init = () => {
  // 建立 websocket 连接
  currentUser.value = wsCache.get(appStore.getUserInfo)
// const client = new WebSocket(`ws://localhost:8088/ws?id=${currentUser.value.id}`)
// console.log("登录用户信息"+currentUser.value.id)
  let socketUrl = `ws://localhost:8081/api/websocket/${currentUser.value.id}/${NaN}`
  const client = new WebSocket(socketUrl)

// 发送消息触发滚动条滚动

  const optionsName = {
    'Smileys & Emotion': '笑脸&表情',
    'Food & Drink': '食物&饮料',
    'Animals & Nature': '动物&自然',
    'Travel & Places': '旅行&地点',
    'People & Body': '人物&身体',
    Objects: '物品',
    Symbols: '符号',
    Flags: '旗帜',
    Activities: '活动'
  }

  client.onopen = () => {
    // console.log('open')
    ElMessage({
      message: 'socket连接成功',
      type: 'success'
    })
  }
  client.onclose = () => {  // 页面刷新的时候和后台websocket服务关闭的时候
    ElMessage.error('服务器断开，请刷新重试');
    console.log('close')
  }

// 当收到消息
  client.onmessage = (msg) => {
    console.log(msg.data)
    if (msg.data) {
      // console.log(msg.data)
      let json = JSON.parse(msg.data)
      //  判断是什么信息
      if (json['users']) {
        onlineUsers.value = json['users']
      } else {
        const newMsg = {
          text: msg.data.text,
          isMy: false
        } as ChatMessageVO
        console.log(newMsg)
        messages.value.push(newMsg)
      }
    }
  }
}


async function addUserLoginList(messageJson: ImMessageRequest) {
  loginUserIdList.value = JSON.parse(messageJson.im.text);
  // console.log(loginUserIdList.value)
  // console.log(loginUserList.value.length)
  const res = await getUserListByIdsUsingPOST({
    ids: loginUserIdList.value
  });
  console.log(res.data)
  loginUserList.value = res.data
}

</script>

<style>
.im-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.imHeader {
  margin-bottom: 5px;
}
</style>
