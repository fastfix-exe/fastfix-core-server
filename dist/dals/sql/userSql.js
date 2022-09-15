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
exports.getCustomerById = exports.deleteRefreshToken = exports.insertRefreshToken = exports.getRefreshTokenInDb = exports.createCustomer = exports.getCustomerByEmail = void 0;
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
    const query = `INSERT INTO customer(customer_id, email, customer_name, avatar_picture, hidden_data, created_at, created_by, updated_at, updated_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $6, $7);`;
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
    const query = `INSERT INTO auth_token(refresh_token, user_role, user_id)
        VALUES ($1, $2, $3);`;
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
function getCustomerById(customerId) {
    const query = `SELECT * FROM CUSTOMER WHERE customer_id = $1`;
    const values = [customerId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.getCustomerById = getCustomerById;
//# sourceMappingURL=userSql.js.map