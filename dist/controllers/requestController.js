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
exports.UpdateRequestStatus = exports.getListPendingRequestByStoreId = exports.getRequestLatest = exports.getRequestById = exports.createRequest = void 0;
const db_config_1 = require("../config/db_config");
const requestService = __importStar(require("../services/user/requestService"));
function createRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const response = yield requestService.createNewRequest(req.body);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.createRequest = createRequest;
function getRequestById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const response = yield requestService.getById(id);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getRequestById = getRequestById;
function getRequestLatest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginUser = req.loginUser;
            const response = yield requestService.getLatestById(loginUser);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getRequestLatest = getRequestLatest;
function getListPendingRequestByStoreId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeId = req.params.storeId;
            const response = yield requestService.getListPendingByStoreId(storeId);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getListPendingRequestByStoreId = getListPendingRequestByStoreId;
function UpdateRequestStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const loginUser = req.loginUser;
            const requestId = req.body.id;
            const status = req.body.status;
            const response = yield requestService.UpdateRequestStatus(loginUser, requestId, status);
            console.log('__Start sending msg');
            req.app.get('socketio').emit('changed-request', response);
            console.log('__End sending msg');
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.UpdateRequestStatus = UpdateRequestStatus;
//# sourceMappingURL=requestController.js.map