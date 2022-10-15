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
exports.insertOrUpdateRatingOfStoreByStoreId = exports.insertCommentOfStoreByStoreId = exports.getRatingOfStoreByStoreId = exports.getCommentOfStoreByStoreId = exports.updateStoreByStoreId = exports.updateStore = exports.updateCustomer = void 0;
const userService = __importStar(require("../services/user/userService"));
const storeService = __importStar(require("../services/user/storeService"));
const db_config_1 = require("../config/db_config");
function updateCustomer(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const loginCustomer = req.loginUser;
            const customerName = (_a = req.body.customerName) !== null && _a !== void 0 ? _a : loginCustomer.customerName;
            const dateOfBirth = req.body.dateOfBirth;
            const gender = req.body.gender;
            const phoneNumber = req.body.phoneNumber;
            const avatarPicture = (_b = req.body.avatarPicture) !== null && _b !== void 0 ? _b : loginCustomer.avatarPicture;
            const refreshToken = req.body.refreshToken;
            const customerEntry = {
                customerName, dateOfBirth, gender, phoneNumber, avatarPicture
            };
            const response = yield userService.updateCustomer(loginCustomer, customerEntry, refreshToken);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.updateCustomer = updateCustomer;
function updateStore(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const loginStore = req.loginUser;
            const storeEntry = {
                email: req.body.email || loginStore.email,
                storeName: req.body.storeName || loginStore.storeName,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                avatarPicture: req.body.avatarPicture || loginStore.avatarPicture,
                description: req.body.description,
            };
            const refreshToken = req.body.refreshToken;
            const response = yield userService.updateStore(loginStore, storeEntry, refreshToken);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.updateStore = updateStore;
function updateStoreByStoreId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const loginStore = req.loginUser;
            const storeId = req.params.storeId;
            const storeEntry = {
                // email: req.body.email || loginStore.email,
                // storeName: req.body.storeName || loginStore.storeName,
                // address: req.body.address,
                // phoneNumber: req.body.phoneNumber,
                // avatarPicture: req.body.avatarPicture || loginStore.avatarPicture,
                // description: req.body.description,
                hiddenData: req.body.hiddenData,
            };
            const response = yield storeService.addFieldHiddenDataForStore(loginStore, storeId, storeEntry.hiddenData);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.updateStoreByStoreId = updateStoreByStoreId;
function getCommentOfStoreByStoreId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginStore = req.loginUser;
            const storeId = req.params.storeId;
            const response = yield storeService.getStoreCommentByStoreId(loginStore, storeId);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getCommentOfStoreByStoreId = getCommentOfStoreByStoreId;
function getRatingOfStoreByStoreId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginStore = req.loginUser;
            const storeId = req.params.storeId;
            const response = yield storeService.getStoreRatingByStoreId(loginStore, storeId);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getRatingOfStoreByStoreId = getRatingOfStoreByStoreId;
function insertCommentOfStoreByStoreId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const loginUser = req.loginUser;
            const storeId = req.params.storeId;
            const content = req.body.content;
            const replyId = req.body.replyId;
            const response = yield storeService.insertStoreCommentByStoreId(loginUser, storeId, content, replyId);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query('ROLLBACK');
            return next(error);
        }
    });
}
exports.insertCommentOfStoreByStoreId = insertCommentOfStoreByStoreId;
function insertOrUpdateRatingOfStoreByStoreId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const loginUser = req.loginUser;
            const storeId = req.params.storeId;
            const rating = req.body.rating;
            const response = yield storeService.insertOrUpdateStoreRatingByStoreId(loginUser, storeId, rating);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query('ROLLBACK');
            return next(error);
        }
    });
}
exports.insertOrUpdateRatingOfStoreByStoreId = insertOrUpdateRatingOfStoreByStoreId;
//# sourceMappingURL=userController.js.map