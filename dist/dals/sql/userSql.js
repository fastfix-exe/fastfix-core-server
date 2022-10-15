"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatingByUniqueKey = exports.insertOrUpdateStoreRating = exports.insertStoreComment = exports.getListRatingsOfStore = exports.getListCommentsOfStore = exports.updateSubcription = exports.UpdateStatusRequest = exports.getRequestByStoreIdWithPendingStatus = exports.getRequestByIdLatest = exports.getRequestById = exports.createRequest = exports.getSubcriptionById = exports.getListAllSubscription = exports.updateHiddenDataByStoreId = exports.updateStoreByStoreId = exports.getStoreById = exports.getListAllCustomer = exports.getListAllEmployeeByStoreId = exports.getListAllStore = exports.updateStore = exports.updateCustomer = exports.getEmployeeByEmpIdAndLoginId = exports.getStoreByStoreIdAndLoginId = exports.getEmployeeByLoginIdAndPassword = exports.getStoreByLoginIdAndPassword = exports.getCustomerByIdAndEmail = exports.deleteRefreshToken = exports.insertRefreshToken = exports.getRefreshTokenInDb = exports.createCustomer = exports.getCustomerByEmail = void 0;
const localDateTimeUtils = __importStar(require("../../common/utils/LocalDateTimeUtils"));
const commonEnums = __importStar(require("../../common/enum"));
// get customer's infor
function getCustomerByEmail(email) {
    const query = `SELECT * FROM CUSTOMER WHERE EMAIL = $1`;
    const values = [email];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getCustomerByEmail = getCustomerByEmail;
// insert customer
function createCustomer(customerId, email, customerName, avatarPicture, hiddenData) {
    const query = `INSERT INTO customer(customer_id, email, customer_name, avatar_picture, hidden_data, created_at, created_by, updated_at, updated_by, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $6, $7,0);`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [customerId, email, customerName, avatarPicture, hiddenData, now, email];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.createCustomer = createCustomer;
function getRefreshTokenInDb(refreshToken) {
    const query = `SELECT * FROM AUTH_TOKEN WHERE REFRESH_TOKEN = $1`;
    const values = [refreshToken];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getRefreshTokenInDb = getRefreshTokenInDb;
function insertRefreshToken(refreshToken, userRole, userId) {
    const query = `INSERT INTO auth_token(id,refresh_token, user_role, user_id)
        VALUES ((SELECT (coalesce(MAX(id)+1,1)) from auth_token),$1, $2, $3);`;
    const values = [refreshToken, userRole, userId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.insertRefreshToken = insertRefreshToken;
function deleteRefreshToken(refreshToken) {
    const query = `delete from auth_token where refresh_token = $1`;
    const values = [refreshToken];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.deleteRefreshToken = deleteRefreshToken;
function getCustomerByIdAndEmail(customerId, email) {
    const query = `SELECT * FROM CUSTOMER WHERE customer_id = $1 and email = $2`;
    const values = [customerId, email];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getCustomerByIdAndEmail = getCustomerByIdAndEmail;
function getStoreByLoginIdAndPassword(loginId, password) {
    const query = `SELECT * FROM STORE WHERE LOGIN_ID = $1 AND PASSWORD = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [loginId, password];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getStoreByLoginIdAndPassword = getStoreByLoginIdAndPassword;
function getEmployeeByLoginIdAndPassword(loginId, password) {
    const query = `SELECT * FROM STORE_EMPLOYEE WHERE LOGIN_ID = $1 AND PASSWORD = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [loginId, password];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getEmployeeByLoginIdAndPassword = getEmployeeByLoginIdAndPassword;
function getStoreByStoreIdAndLoginId(storeId, loginId) {
    const query = `SELECT * FROM STORE WHERE STORE_ID = $1 AND LOGIN_ID = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [storeId, loginId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getStoreByStoreIdAndLoginId = getStoreByStoreIdAndLoginId;
function getEmployeeByEmpIdAndLoginId(empId, loginId) {
    const query = `SELECT * FROM STORE_EMPLOYEE WHERE EMPLOYEE_ID = $1 AND LOGIN_ID = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [empId, loginId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getEmployeeByEmpIdAndLoginId = getEmployeeByEmpIdAndLoginId;
function updateCustomer(customerId, email, name, gender, phoneNumber, dateOfBirth, avatarPicture) {
    const query = `UPDATE CUSTOMER 
        SET CUSTOMER_NAME = $3, GENDER = $4, PHONE_NUMBER = $5, DATE_OF_BIRTH = $6, AVATAR_PICTURE = $7, UPDATED_AT = $8, UPDATED_BY = $9
        WHERE customer_id = $1 and email = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [customerId, email, name, gender, phoneNumber, dateOfBirth, avatarPicture, now, email];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.updateCustomer = updateCustomer;
function updateStore(storeId, email, name, address, phoneNumber, avatarPicture, description, loginStoreId) {
    const query = `UPDATE STORE
	SET email=$2, store_name=$3, address=$4, phone_number=$5, avatar_picture=$6, description=$7, updated_at=$8, updated_by=$9
	WHERE STORE_ID = $1 AND LOGIN_ID = $9;`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [storeId, email, name, address, phoneNumber, avatarPicture, description, now, loginStoreId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.updateStore = updateStore;
function getListAllStore() {
    const query = `SELECT * FROM STORE`;
    const values = [];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getListAllStore = getListAllStore;
function getListAllEmployeeByStoreId(storeId) {
    const query = `SELECT * FROM STORE_EMPLOYEE WHERE STORE_ID = $1`;
    const values = [storeId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getListAllEmployeeByStoreId = getListAllEmployeeByStoreId;
function getListAllCustomer() {
    const query = `SELECT * FROM CUSTOMER`;
    const values = [];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getListAllCustomer = getListAllCustomer;
function getStoreById(storeId) {
    const query = `SELECT * FROM STORE WHERE STORE_ID = $1`;
    const values = [storeId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getStoreById = getStoreById;
function updateStoreByStoreId(storeId, storeName, address, phoneNumber, avatarPicture, description, hiddenData) {
    const query = `SELECT * FROM STORE WHERE STORE_ID = $1`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [storeId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.updateStoreByStoreId = updateStoreByStoreId;
function updateHiddenDataByStoreId(storeId, hiddenData) {
    const query = `UPDATE STORE SET HIDDEN_DATA = $2, UPDATED_AT = $3
                     WHERE STORE_ID = $1`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [storeId, hiddenData, now];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.updateHiddenDataByStoreId = updateHiddenDataByStoreId;
function getListAllSubscription() {
    const query = `select * from subcription`;
    const values = [];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getListAllSubscription = getListAllSubscription;
function getSubcriptionById(subcriptionId) {
    const query = `select * from subcription where  subcription_id = $1`;
    const values = [subcriptionId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getSubcriptionById = getSubcriptionById;
function createRequest(userId, storeId, type) {
    const query = `insert into request(id, user_id, store_id, date_time, type, status)
    VALUES ((SELECT (coalesce(MAX(id)+1,1)) from request) ,$1, $2, $3, $4, $5)
    returning id;`;
    const now = localDateTimeUtils.getSystemDateTime();
    const status = commonEnums.RequestStatus.Pending;
    const values = [userId, storeId, now, type, status];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.createRequest = createRequest;
function getRequestById(id) {
    const query = `select * from request where id = $1`;
    const values = [id];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getRequestById = getRequestById;
function getRequestByIdLatest(customerId) {
    const query = `select  *  from request where user_id = $1 ORDER BY id DESC limit 1`;
    const values = [customerId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getRequestByIdLatest = getRequestByIdLatest;
function getRequestByStoreIdWithPendingStatus(storeId) {
    const query = `select * from request where store_id = $1 and (status = 1 or status = 0) `;
    const values = [storeId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getRequestByStoreIdWithPendingStatus = getRequestByStoreIdWithPendingStatus;
function UpdateStatusRequest(status, id) {
    const query = `update request set status = $1 where id =$2;`;
    const values = [status, id];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.UpdateStatusRequest = UpdateStatusRequest;
function updateSubcription(subcriptionId, name, price, description) {
    const query = `UPDATE subcription
SET name=$2, price = $3, description = $4, updated_at = $5
WHERE STORE_ID = $1 AND LOGIN_ID = $9;`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [subcriptionId, name, price, description, now];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.updateSubcription = updateSubcription;
// get comment
function getListCommentsOfStore(storeId) {
    const query = `SELECT comment_id, store_id, sender_id, content, reply_id, status, hidden_data, sender_role
                    from store_comment
                    where store_id = $1
                    order by created_at desc`;
    const values = [storeId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getListCommentsOfStore = getListCommentsOfStore;
// get rating
function getListRatingsOfStore(storeId) {
    const query = `SELECT rating_id, store_id, customer_id, status, hidden_data, rating
                    from store_rating
                    where store_id = $1`;
    const values = [storeId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getListRatingsOfStore = getListRatingsOfStore;
// add comment
function insertStoreComment(commentId, storeId, customerId, content, replyId, status, hiddenData, userId, senderRole) {
    const query = `INSERT INTO store_comment(
        comment_id, store_id, sender_id, content, reply_id, status, hidden_data, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, sender_role)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [commentId, storeId, customerId, content, replyId, status, hiddenData, now, userId, now, userId, null, null, senderRole];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.insertStoreComment = insertStoreComment;
// add or update
function insertOrUpdateStoreRating(ratingId, storeId, customerId, rating, status, hiddenData, userId) {
    const query = `INSERT INTO public.store_rating(
        rating_id, store_id, customer_id, status, hidden_data, created_at, created_by, updated_at, updated_by, deleted_at, deleted_by, rating)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (store_id, customer_id) DO UPDATE
        SET rating = $12;`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [ratingId, storeId, customerId, status, hiddenData, now, userId, now, userId, null, null, rating];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.insertOrUpdateStoreRating = insertOrUpdateStoreRating;
// add or update
function getRatingByUniqueKey(storeId, customerId) {
    const query = `SELECT rating_id, store_id, customer_id, status, hidden_data, rating
    from store_rating
    where store_id = $1 and customer_id = $2`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [storeId, customerId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getRatingByUniqueKey = getRatingByUniqueKey;
//# sourceMappingURL=userSql.js.map