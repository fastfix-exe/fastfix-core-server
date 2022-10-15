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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRequestStatus = exports.getCustomersForRequests = exports.getListByStoreIdWithPending = exports.getByIdLatest = exports.getById = exports.createNewRequest = void 0;
const db_config_1 = require("../../config/db_config");
const userSql = __importStar(require("../sql/userSql"));
const requestSql = __importStar(require("../sql/requestSql"));
const commonEnums = __importStar(require("../../common/enum"));
const requestModel = __importStar(require("../../models/RequestModels"));
const customerModel = __importStar(require("../../models/CustomerModels"));
function createNewRequest(Object) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryCreate = requestSql.createRequest(Object.userId, Object.storeId, Object.type);
        let [request] = yield db_config_1.db.query(queryCreate);
        return request;
    });
}
exports.createNewRequest = createNewRequest;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetById = requestSql.getRequestById(id);
        let [request] = yield db_config_1.db.query(queryGetById);
        return request;
    });
}
exports.getById = getById;
function getByIdLatest(loginUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryRequestByCustomerId = requestSql.getRequestByIdLatest(loginUser.id);
        let [request] = yield db_config_1.db.query(queryRequestByCustomerId);
        return request;
    });
}
exports.getByIdLatest = getByIdLatest;
function getListByStoreIdWithPending(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryCreate = requestSql.getRequestByStoreIdWithPendingStatus(storeId);
        let request = yield db_config_1.db.query(queryCreate);
        return request;
    });
}
exports.getListByStoreIdWithPending = getListByStoreIdWithPending;
function getCustomersForRequests(listRequests) {
    return __awaiter(this, void 0, void 0, function* () {
        const listRes = [];
        for (const req of listRequests) {
            const queryGetCustomerbyId = userSql.getCustomerByCustomerId(req.getUserId);
            const [customerDB] = yield db_config_1.db.query(queryGetCustomerbyId);
            const customer = customerModel.createJsonObjectWithoutHiddenData(customerDB);
            listRes.push(Object.assign(Object.assign({}, req), { customer }));
        }
        return listRes;
    });
}
exports.getCustomersForRequests = getCustomersForRequests;
function UpdateRequestStatus(loginUser, requestId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentRequest = yield getById(requestId);
        if (currentRequest.status === commonEnums.RequestStatus.Pending && status === commonEnums.RequestStatus.Processing && loginUser.role === commonEnums.UserRole.employee) {
            const queryUpdateLoginEmp = userSql.updateCurrentRequestIdOfLoginEmployee(loginUser.id, requestId);
            yield db_config_1.db.query(queryUpdateLoginEmp);
        }
        else {
            const queryUpdateNullCurrentRequestId = requestSql.updateEmployeeCurrentRequestWhereSentRequestToNull(requestId);
            yield db_config_1.db.query(queryUpdateNullCurrentRequestId);
        }
        const queryUpdateStatus = requestSql.UpdateStatusRequest(requestId, status);
        yield db_config_1.db.query(queryUpdateStatus);
        currentRequest = yield getById(requestId);
        return {
            operator: loginUser,
            requestChanged: requestModel.createJsonObject(currentRequest),
        };
    });
}
exports.UpdateRequestStatus = UpdateRequestStatus;
//# sourceMappingURL=requestDAL.js.map