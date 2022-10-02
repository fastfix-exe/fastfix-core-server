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
exports.updateStoreById = exports.getStoreById = exports.getListStore = void 0;
const db_config_1 = require("../../config/db_config");
const userSql = __importStar(require("../sql/userSql"));
const exception = __importStar(require("../../common/exception"));
function getListStore() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetListAllStore = userSql.getListAllStore();
        return yield db_config_1.db.query(queryGetListAllStore);
    });
}
exports.getListStore = getListStore;
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
//# sourceMappingURL=storeDAL.js.map