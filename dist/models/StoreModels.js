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
exports.customerGetStore = exports.createJsonObjectWithoutHiddenData = exports.createJsonObject = exports.Store = void 0;
const commonEnums = __importStar(require("../common/enum"));
const ObjectUtils_1 = require("../common/utils/ObjectUtils");
class Store {
    constructor(storeId, loginId, email, storeName, isDeleted, phoneNumber, avatarPicture, hiddenData) {
        this.role = commonEnums.UserRole.store;
        this.id = storeId;
        this.loginId = loginId;
        this.email = email;
        this.storeName = storeName;
        this.isDeleted = isDeleted,
            this.phoneNumber = phoneNumber;
        this.avatarPicture = avatarPicture;
        this.hiddenData = hiddenData;
        this.type = hiddenData.type;
    }
}
exports.Store = Store;
function createJsonObject(data) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    return new Store(data.store_id, data.login_id, data.email, data.store_name, isDeleted, data.phone_number, data.avatar_picture, data.hidden_data);
}
exports.createJsonObject = createJsonObject;
function createJsonObjectWithoutHiddenData(data) {
    return (0, ObjectUtils_1._objectWithoutProperties)(createJsonObject(data), ['hiddenData']);
}
exports.createJsonObjectWithoutHiddenData = createJsonObjectWithoutHiddenData;
function customerGetStore(data) {
    const isDeleted = !!(data.deleted_at && data.deleted_by);
    const store = new Store(data.store_id, data.login_id, data.email, data.store_name, isDeleted, data.phone_number, data.avatar_picture, data.hidden_data);
    return (0, ObjectUtils_1._objectWithoutProperties)(store, ['role', 'loginId', 'hiddenData']);
}
exports.customerGetStore = customerGetStore;
//# sourceMappingURL=StoreModels.js.map