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
exports.addFieldHiddenData = exports.updateStoreById = exports.getStoreById = exports.getListNearestStore = exports.getListStore = void 0;
const db_config_1 = require("../../config/db_config");
const userSql = __importStar(require("../sql/userSql"));
const exception = __importStar(require("../../common/exception"));
const locationUtils = __importStar(require(".././../common/utils/LocationUtils"));
function getListStore() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetListAllStore = userSql.getListAllStore();
        return yield db_config_1.db.query(queryGetListAllStore);
    });
}
exports.getListStore = getListStore;
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
function getStoreById(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetOneStore = userSql.getStoreById(storeId);
        const [store] = yield db_config_1.db.query(queryGetOneStore);
        if (!store || store.deleted_at || store.deleted_by) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_008);
        }
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
//# sourceMappingURL=storeDAL.js.map