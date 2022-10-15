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
exports.getEmployeeByCurrentRequestId = exports.getEmpByEmpId = exports.getCurrentUserRatedStar = exports.postStoreRating = exports.postStoreComment = exports.getStoreRatingByStoreId = exports.getStoreCommentByStoreId = exports.addFieldHiddenData = exports.updateStoreById = exports.getStoreById = exports.getListNearestStore = exports.getListEmployeeByStoreId = exports.getListStore = void 0;
const db_config_1 = require("../../config/db_config");
const commonEnums = __importStar(require("../../common/enum"));
const userSql = __importStar(require("../sql/userSql"));
const exception = __importStar(require("../../common/exception"));
const commentModel = __importStar(require(".././../models/StoreCommentModel"));
const ratingModel = __importStar(require(".././../models/StoreRatingModel"));
const locationUtils = __importStar(require(".././../common/utils/LocationUtils"));
const guid_typescript_1 = require("guid-typescript");
function getListStore() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetListAllStore = userSql.getListAllStore();
        return yield db_config_1.db.query(queryGetListAllStore);
    });
}
exports.getListStore = getListStore;
function getListEmployeeByStoreId(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetListAllStore = userSql.getListAllEmployeeByStoreId(storeId);
        return yield db_config_1.db.query(queryGetListAllStore);
    });
}
exports.getListEmployeeByStoreId = getListEmployeeByStoreId;
function getListNearestStore(currentPotition) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetListAllStore = userSql.getListAllStore();
        const listStore = yield db_config_1.db.query(queryGetListAllStore);
        for (const store of listStore) {
            const storeCoordinates = (_a = store.hidden_data.coordinates) === null || _a === void 0 ? void 0 : _a.split(", ");
            if (!storeCoordinates || !storeCoordinates[0] || !storeCoordinates[1]) {
                continue;
            }
            store.distance = locationUtils.distance(currentPotition.latitude, currentPotition.longtitude, storeCoordinates[0], storeCoordinates[1], "K");
        }
        return listStore;
    });
}
exports.getListNearestStore = getListNearestStore;
function getStoreById(storeId, currentPotition) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetOneStore = userSql.getStoreById(storeId);
        const [store] = yield db_config_1.db.query(queryGetOneStore);
        if (!store || store.deleted_at || store.deleted_by) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_008);
        }
        const storeCoordinates = (_a = store.hidden_data.coordinates) === null || _a === void 0 ? void 0 : _a.split(", ");
        store.distance = locationUtils.distance(currentPotition === null || currentPotition === void 0 ? void 0 : currentPotition.latitude, currentPotition === null || currentPotition === void 0 ? void 0 : currentPotition.longtitude, storeCoordinates[0], storeCoordinates[1], "K");
        return store;
    });
}
exports.getStoreById = getStoreById;
function updateStoreById(storeId, storeEntry) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetOneStore = userSql.getStoreById(storeId);
        const [store] = yield db_config_1.db.query(queryGetOneStore);
        if (!store) {
            return false;
        }
        const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, storeEntry.hiddenData);
        yield db_config_1.db.query(queryUpdatehiddenData);
        return true;
    });
}
exports.updateStoreById = updateStoreById;
function addFieldHiddenData(storeId, hiddenData) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetOneStore = userSql.getStoreById(storeId);
        const [store] = yield db_config_1.db.query(queryGetOneStore);
        if (!store) {
            return false;
        }
        const newHiddenData = store.hidden_data;
        for (const prop in hiddenData) {
            newHiddenData[prop] = hiddenData[prop];
        }
        const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, newHiddenData);
        yield db_config_1.db.query(queryUpdatehiddenData);
        return true;
    });
}
exports.addFieldHiddenData = addFieldHiddenData;
// get store comment
function getStoreCommentByStoreId(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetListComments = userSql.getListCommentsOfStore(storeId);
        const listCommentsDB = yield db_config_1.db.query(queryGetListComments);
        const queryGetListCustomers = userSql.getListAllCustomer();
        const listCustomers = yield db_config_1.db.query(queryGetListCustomers);
        const queryGetListStores = userSql.getListAllStore();
        const listStores = yield db_config_1.db.query(queryGetListStores);
        // create object json format
        const listComments = listCommentsDB.map((commentDB) => {
            let avatar = '';
            let name = '';
            if (commentDB.sender_role === commonEnums.UserRole.customer) {
                const sender = listCustomers.find((e) => e.customer_id === commentDB.sender_id);
                avatar = sender.avatar_picture;
                name = sender.customer_name;
            }
            if (commentDB.sender_role === commonEnums.UserRole.store) {
                const sender = listStores.find((e) => e.store_id === commentDB.sender_id);
                avatar = sender.avatar_picture;
                name = sender.store_name;
            }
            if (!avatar || !name) {
                return null;
            }
            return commentModel.createJsonObject(commentDB, avatar, name);
        });
        const listRes = listComments.filter((comment) => {
            if (!comment) {
                return false;
            }
            if (comment.getReplyId) {
                const parentComment = listComments.find((e) => (e === null || e === void 0 ? void 0 : e.getCommentId) === comment.getReplyId);
                if (parentComment) {
                    parentComment.addReplyToList(comment);
                    // not push to list of root comments
                    return false;
                }
            }
            return true;
        });
        return listRes;
    });
}
exports.getStoreCommentByStoreId = getStoreCommentByStoreId;
// get store rating
function getStoreRatingByStoreId(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetListRatings = userSql.getListRatingsOfStore(storeId);
        const listRatings = yield db_config_1.db.query(queryGetListRatings);
        return listRatings.map((ratingDB) => ratingModel.createJsonObject(ratingDB));
    });
}
exports.getStoreRatingByStoreId = getStoreRatingByStoreId;
// post store comment
function postStoreComment(loginUser, storeId, content, replyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentId = guid_typescript_1.Guid.create().toString().replace(/-/g, '');
        if (!loginUser.id) {
            throw new exception.APIException(exception.HttpStatusCode.SERVER, "Login user id not found!");
        }
        const queryAddComment = userSql.insertStoreComment(commentId, storeId, loginUser.id, content, replyId || null, commonEnums.GeneralStatus.Activating, {}, loginUser.id, loginUser.role);
        yield db_config_1.db.query(queryAddComment);
        return yield getStoreCommentByStoreId(storeId);
    });
}
exports.postStoreComment = postStoreComment;
// post store rating
function postStoreRating(loginUser, storeId, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        const ratingId = guid_typescript_1.Guid.create().toString().replace(/-/g, '');
        const queryAddRating = userSql.insertOrUpdateStoreRating(ratingId, storeId, loginUser.id, rating, commonEnums.GeneralStatus.Activating, {}, loginUser.id);
        yield db_config_1.db.query(queryAddRating);
        const listRatings = yield getStoreRatingByStoreId(storeId);
        const averageRating = (listRatings.map((rating) => rating.getRating).reduce((a, b) => a + b, 0)) / listRatings.length;
        const store = yield getStoreById(storeId);
        store.hidden_data.rating = averageRating;
        const queryUpdatehiddenData = userSql.updateHiddenDataByStoreId(storeId, store.hidden_data);
        yield db_config_1.db.query(queryUpdatehiddenData);
        return true;
    });
}
exports.postStoreRating = postStoreRating;
// post store rating
function getCurrentUserRatedStar(loginUser, storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetRatingByCustomerIdAndStoreId = userSql.getRatingByUniqueKey(storeId, loginUser.id);
        const [rating] = yield db_config_1.db.query(queryGetRatingByCustomerIdAndStoreId);
        return (rating === null || rating === void 0 ? void 0 : rating.rating) || 0;
    });
}
exports.getCurrentUserRatedStar = getCurrentUserRatedStar;
function getEmpByEmpId(empId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetEmpById = userSql.getEmployeeByEmployeeId(empId);
        const [emp] = yield db_config_1.db.query(queryGetEmpById);
        return emp;
    });
}
exports.getEmpByEmpId = getEmpByEmpId;
function getEmployeeByCurrentRequestId(currentRequestId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetEmpById = userSql.getEmployeeByCurrentRequestId(currentRequestId);
        const [emp] = yield db_config_1.db.query(queryGetEmpById);
        return emp;
    });
}
exports.getEmployeeByCurrentRequestId = getEmployeeByCurrentRequestId;
//# sourceMappingURL=storeDAL.js.map