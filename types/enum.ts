export enum MessageTypeEnum {
    BLOG_LIKE,
    BLOG_COMMENT_LIKE,
    COMMENT_ADD,
    FRIEND_APPLICATION,
    SYSTEM_MESSAGES,
    FOLLOW_NOTIFICATIONS,
}



export function getMessageType(type: number): string {
    switch (type) {
        case MessageTypeEnum.BLOG_LIKE:
            return "赞了你的博客";
        case MessageTypeEnum.BLOG_COMMENT_LIKE:
            return "赞了你的评论";
        case MessageTypeEnum.COMMENT_ADD:
            return "评论了你的博客";
        case MessageTypeEnum.FRIEND_APPLICATION:
            return "向你发起了好友申请";
        case MessageTypeEnum.SYSTEM_MESSAGES:
            return "系统消息";
        case MessageTypeEnum.FOLLOW_NOTIFICATIONS:
            return "关注了你";
        default:
            return "未知消息类型";
    }
}