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
exports.getStoreById = exports.getListAllStore = exports.updateStore = exports.updateCustomer = exports.getStoreByStoreIdAndLoginId = exports.getStoreByLoginIdAndPassword = exports.getCustomerByIdAndEmail = exports.deleteRefreshToken = exports.insertRefreshToken = exports.getRefreshTokenInDb = exports.createCustomer = exports.getCustomerByEmail = void 0;
const localDateTimeUtils = __importStar(require("../../common/utils/LocalDateTimeUtils"));
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
function updateCustomer(customerId, email, name, gender, phoneNumber, dateOfBirth, avatarPicture) {
    const query = `UPDATE CUSTOMER 
        SET CUSTOME_NAME = $3, GENDER = $4, PHONE_NUMBER = $5, DATE_OF_BIRTH = $6, AVATAR_PICTURE = $7, UPDATED_AT = $8, UPDATED_BY = $9
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
//# sourceMappingURL=userSql.js.map