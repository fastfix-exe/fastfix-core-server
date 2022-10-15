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
exports.updateEmployeeCurrentRequestWhereSentRequestToNull = exports.UpdateStatusRequest = exports.getRequestByStoreIdWithPendingStatus = exports.getRequestByIdLatest = exports.getRequestById = exports.createRequest = void 0;
const localDateTimeUtils = __importStar(require("../../common/utils/LocalDateTimeUtils"));
const commonEnums = __importStar(require("../../common/enum"));
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
function UpdateStatusRequest(requestId, status) {
    const query = `update request set status = $2 where id = $1;`;
    const values = [requestId, status];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.UpdateStatusRequest = UpdateStatusRequest;
function updateEmployeeCurrentRequestWhereSentRequestToNull(requestId) {
    const query = `update store_employee set current_request_id = null where current_request_id = $1;`;
    const values = [requestId];
    const queryObject = {
        text: query,
        values: values,
    };
    return queryObject;
}
exports.updateEmployeeCurrentRequestWhereSentRequestToNull = updateEmployeeCurrentRequestWhereSentRequestToNull;
//# sourceMappingURL=requestSql.js.map