<template>
  <el-row class="blog-list-container" justify="center" :gutter="20">
    <el-col v-for="blog in blogList" :key="blog.id" :span="16">
      <el-card @click="toBlogInfo(blog.id)" class="blog-card" shadow="hover">
        <div class="blog-display">
          <div class="blog-cover">
            <img :src="blog.coverImage" alt="Blog Cover" />
          </div>
          <div class="blog-details">
            <h2 class="blog-title">{{ blog.title }}</h2>
            <p class="blog-content">{{ blog.content }}</p>
            <div class="author-info">
              <img class="author-avatar" :src="blog.author?.avatarUrl" alt="Author Avatar" />
              <div class="author-details">
                <p class="author-name">{{ blog.author.username }}</p>
                <p class="publish-time">{{ moment(blog.createTime).format("lll") }}</p>
              </div>
            </div>
            <div class="interactions">
              <i class="el-icon-thumb-up interactions-icon"></i>
              <el-icon>
                <Pointer />
              </el-icon>
              <span class="like-count">100</span>
              <el-icon>
                <ChatLineRound />
              </el-icon>
              <span class="comment-count">50</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { ChatLineRound, Pointer } from '@element-plus/icons-vue';
import moment from 'moment';
import router from '@/router';

const props = defineProps<{
  blogList: BlogVO[];
}>();

const toBlogInfo = (id) => {
  router.push({
    path: '/blog/info',
    query: { blogId: id },
  });
};
</script>

<style scoped lang="less">
.blog-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.blog-card {
  width: 100%;
}

.blog-display {
  display: flex;
  width: 100%;
}

.blog-cover {
  flex: 1;
  overflow: hidden;
  max-height: 70%;

  img {
    width: 70%;
    height: auto;
  }
}

.blog-details {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  .blog-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .blog-content {
    font-size: 1rem;
    line-height: 1.5;
    max-height: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .author-info {
    display: flex;
    align-items: center;
    margin-top: 20px;

    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .author-details {
      p {
        margin: 0;
      }

      .author-name {
        font-weight: bold;
      }

      .publish-time {
        color: #888;
      }
    }
  }

  .interactions {
    position: absolute;
    bottom: 1px;
    right: 10px;
    display: flex;
    align-items: center;

    .interactions-icon {
      font-size: 20px;
      margin-right: 5px;
    }

    .like-count,
    .comment-count {
      margin-right: 10px;
    }
  }
}
</style>
