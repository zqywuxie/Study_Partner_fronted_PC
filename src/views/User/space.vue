<template>
  <div class="user-profile">
    <!-- 个人信息卡片 -->
    <el-card class="user-card">
      <div slot="header" class="user-card-header">
        <el-avatar :src="user.avatar" size="large"></el-avatar>
        <span class="user-name">{{ user.name }}</span>
      </div>
      <div class="user-card-content">
        <p>{{ user.bio }}</p>
        <!-- 其他个人信息，根据需求添加 -->
      </div>
    </el-card>

    <!-- 用户动态博文卡片 -->
    <el-card class="user-feed">
      <div slot="header" class="user-feed-header">
        <h3>动态博文</h3>
      </div>
      <div class="user-feed-content">
        <!-- 这里可以使用v-for循环遍历用户的动态博文列表 -->
        <el-feed :feeds="user.feeds"></el-feed>
      </div>
    </el-card>

    <!-- 其他个人空间内容，根据需求添加 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "用户昵称",
        avatar: "用户头像链接",
        bio: "用户简介",
        feeds: [
          // 用户动态博文列表
          // 每个动态博文可以包括标题、内容、时间等信息
        ],
      },
    };
  },
};
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-card {
  width: 100%;
}

.user-card-header {
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 18px;
  margin-left: 10px;
}

.user-feed {
  width: 100%;
}

.user-feed-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.user-feed-content {
  /* 根据需要定义样式 */
}
</style>
