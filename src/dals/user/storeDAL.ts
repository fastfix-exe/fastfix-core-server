import { db } from "../../config/db_config";
import * as commonEnums from "../../common/enum";
import * as userSql from "../sql/userSql";
import * as exception from "../../common/exception";
import * as storeModel from ".././../models/StoreModels";
import * as commentModel from ".././../models/StoreCommentModel";
import * as ratingModel from ".././../models/StoreRatingModel";
import * as locationUtils from ".././../common/utils/LocationUtils";
import { Guid } from "guid-typescript";

export async function getListStore() {
    const queryGetListAllStore = userSql.getListAllStore();
    return await db.query(queryGetListAllStore);
}

export async function getListNearestStore(currentPotition: storeModel.Position) {
    const queryGetListAllStore = userSql.getListAllStore();
    const listStore = await db.query(queryGetListAllStore);
    for (const store of listStore) {
        const storeCoordinates = store.hidden_data.coordinates?.split(", ");
        if (!storeCoordinates || !storeCoordinates[0] || !storeCoordinates[1]) {
            continue
        }
        store.distance = locationUtils.distance(currentPotition.latitude, currentPotition.longtitude, storeCoordinates[0], storeCoordinates[1], "K");
    }
    return listStore;
}

export async function getStoreById(storeId: string, currentPotition?: storeModel.Position) {
    const queryGetOneStore = userSql.getStoreById(storeId);
    const [store] = await db.query(queryGetOneStore);
    if (!store || store.deleted_at || store.deleted_by) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_008);
    }
    const storeCoordinates = store.hidden_data.coordinates?.split(", ");
    store.distance = locationUtils.distance(currentPotition?.latitude, currentPotition?.longtitude, storeCoordinates[0], storeCoordinates[1], "K");
    return store;
}

export async function updateStoreById(storeId: string, storeEntry: any) {

    const queryGetOneStore = userSql.getStoreById(storeId);
    const [store] = await db.query(queryGetOneStore);

    if (!store) {
        return false;
    }
    
    const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, storeEntry.hiddenData);
    await db.query(queryUpdatehiddenData);
    return true;
}

export async function addFieldHiddenData(storeId: string, hiddenData: any) {

    const queryGetOneStore = userSql.getStoreById(storeId);
    const [store] = await db.query(queryGetOneStore);

    if (!store) {
        return false;
    }
    const newHiddenData: any = store.hidden_data;
    for (const prop in hiddenData) {
        newHiddenData[prop] = hiddenData[prop];
    }
    const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, newHiddenData);
    await db.query(queryUpdatehiddenData);
    return true;
}

// get store comment
export async function getStoreCommentByStoreId(storeId: string) {

    const queryGetListComments = userSql.getListCommentsOfStore(storeId);
    const listCommentsDB: commentModel.CommentDB[] = await db.query(queryGetListComments);

    const queryGetListCustomers = userSql.getListAllCustomer();
    const listCustomers = await db.query(queryGetListCustomers);
    
    const queryGetListStores = userSql.getListAllStore();
    const listStores = await db.query(queryGetListStores);

    // create object json format
    const listComments: Array<commentModel.Comment | null> = listCommentsDB.map((commentDB: commentModel.CommentDB) => {
        let avatar: string = '';
        let name: string = '';
        if (commentDB.sender_role === commonEnums.UserRole.customer) {
            const sender = listCustomers.find((e: any) => e.customer_id === commentDB.sender_id);
            avatar = sender.avatar_picture;
            name = sender.customer_name;
        }

        if (commentDB.sender_role === commonEnums.UserRole.store) {
            const sender = listStores.find((e: any) => e.store_id === commentDB.sender_id);
            avatar = sender.avatar_picture;
            name = sender.store_name;
        }
        if (!avatar || !name) {
            return null;
        }

        return commentModel.createJsonObject(commentDB, avatar, name);
    });
    const listRes = listComments.filter((comment: commentModel.Comment | null) => {
        if (!comment) {
            return false;
        }
        if (comment.getReplyId) {
            const parentComment = listComments.find((e: commentModel.Comment | null) => e?.getCommentId === comment.getReplyId);
            if (parentComment) {
                parentComment.addReplyToList(comment);
                // not push to list of root comments
                return false;
            }
        }
        return true;
    });

    return listRes;
}

// get store rating
export async function getStoreRatingByStoreId(storeId: string) {

    const queryGetListRatings = userSql.getListRatingsOfStore(storeId);
    const listRatings = await db.query(queryGetListRatings);

    return listRatings.map((ratingDB: ratingModel.RatingDB) => ratingModel.createJsonObject(ratingDB));
}

// post store comment
export async function postStoreComment(loginUser: any, storeId: string, content: string, replyId?: string) {
    const commentId = Guid.create().toString().replace(/-/g, '');
    if (!loginUser.id) {
        throw new exception.APIException(exception.HttpStatusCode.SERVER, "Login user id not found!");
    }
    const queryAddComment = userSql.insertStoreComment(commentId, storeId, loginUser.id, content, replyId || null, commonEnums.GeneralStatus.Activating, {}, loginUser.id, loginUser.role );
    console.log(queryAddComment);
    await db.query(queryAddComment);
    return true;
}

// post store rating
export async function postStoreRating(loginUser: any, storeId: string, rating: number) {
    const ratingId = Guid.create().toString().replace(/-/g, '');
    const queryAddRating = userSql.insertOrUpdateStoreRating(ratingId, storeId, loginUser.id, rating, commonEnums.GeneralStatus.Activating, {}, loginUser.id);
    await db.query(queryAddRating);
    const listRatings = await getStoreRatingByStoreId(storeId);
    const averageRating = (listRatings.map((rating: ratingModel.Rating) => rating.getRating).reduce((a: number, b: number) => a + b, 0)) / listRatings.length;
    const store = await getStoreById(storeId);
    store.hidden_data.rating = averageRating;
    const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, store.hidden_data);
    await db.query(queryUpdatehiddenData);
    return true;
}
