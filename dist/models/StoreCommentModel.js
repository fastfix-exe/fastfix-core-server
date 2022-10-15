"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonObject = exports.Comment = void 0;
class Comment {
    constructor(avatar, name, commentId, senderRole, storeId, senderId, content, status, hiddenData, replyId) {
        this.listReplies = [];
        this.avatar = avatar;
        this.name = name;
        this.commentId = commentId;
        this.senderRole = senderRole;
        this.storeId = storeId;
        this.senderId = senderId;
        this.content = content;
        this.status = status;
        this.hiddenData = hiddenData;
        this.replyId = replyId;
    }
    get getListReplies() {
        return this.listReplies;
    }
    get getReplyId() {
        return this.replyId;
    }
    get getCommentId() {
        return this.commentId;
    }
    addReplyToList(reply) {
        if (!this.listReplies) {
            this.listReplies = [];
        }
        else {
            this.listReplies.push(reply);
        }
    }
}
exports.Comment = Comment;
function createJsonObject(data, avatar, name) {
    return new Comment(avatar, name, data.comment_id, data.sender_role, data.store_id, data.sender_id, data.content, data.status, data.hidden_data, data.reply_id);
}
exports.createJsonObject = createJsonObject;
//# sourceMappingURL=StoreCommentModel.js.map