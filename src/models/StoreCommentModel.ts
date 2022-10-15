import * as commonEnums from "../common/enum";

export interface CommentDB {
    comment_id: string,
    store_id: string,
    sender_id: string,
    content: string,
    reply_id: string,
    status: number,
    hidden_data: any,
    sender_role: commonEnums.UserRole,
}


export class Comment {
    private avatar: string;
    private name: string;
    private commentId: string;
    private senderRole: commonEnums.UserRole;
    private storeId: string;
    private senderId: string;
    private content: string;
    private listReplies: Comment[] = [];
    private status?: number;
    private hiddenData?: string;
    private replyId?: string;

    constructor (avatar: string, name: string, commentId: string, senderRole: commonEnums.UserRole, storeId: string, senderId: string, content: string, status: number, hiddenData?: any, replyId?: string){
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

    addReplyToList(reply: Comment) {
        if (!this.listReplies) {
            this.listReplies = [];
        } else {
            this.listReplies.push(reply);
        }
    }
}

export function createJsonObject (data: CommentDB, avatar: string, name: string) {
    return new Comment(avatar, name, data.comment_id, data.sender_role, data.store_id, data.sender_id,
        data.content, data.status, data.hidden_data, data.reply_id);
}