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
exports.assignEmployeeForRequest = exports.UpdateRequestStatus = exports.getListPendingByStoreId = exports.getLatestById = exports.getRequestByRequestId = exports.createNewRequest = void 0;
const requestDAL = __importStar(require("../../dals/user/requestDAL"));
const requestModels = __importStar(require("../../models/RequestModels"));
function createNewRequest(Object) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield requestDAL.createNewRequest(Object);
        const res = requestModels.createJsonObject(request);
        return res;
    });
}
exports.createNewRequest = createNewRequest;
function getRequestByRequestId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield requestDAL.getRequestByRequestId(id);
        const res = requestModels.createJsonObject(request);
        return res;
    });
}
exports.getRequestByRequestId = getRequestByRequestId;
function getLatestById(loginUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield requestDAL.getByIdLatest(loginUser);
        const res = requestModels.createJsonObject(request);
        return res;
    });
}
exports.getLatestById = getLatestById;
function getListPendingByStoreId(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield requestDAL.getListByStoreIdWithPending(storeId);
        const listReq = request.map((e) => requestModels.createJsonObject(e));
        const convertedFullDataRequests = yield requestDAL.getCustomersForRequests(listReq);
        return convertedFullDataRequests;
    });
}
exports.getListPendingByStoreId = getListPendingByStoreId;
function UpdateRequestStatus(loginUser, requestId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestDAL.UpdateRequestStatus(loginUser, requestId, status);
    });
}
exports.UpdateRequestStatus = UpdateRequestStatus;
function assignEmployeeForRequest(loginUser, requestId, employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield requestDAL.assignEmployeeForRequest(loginUser, requestId, employeeId);
    });
}
exports.assignEmployeeForRequest = assignEmployeeForRequest;
//# sourceMappingURL=requestService.js.map