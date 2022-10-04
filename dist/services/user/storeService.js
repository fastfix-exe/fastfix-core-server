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
const storeDAL = __importStar(require("../../dals/user/storeDAL"));
const storeModel = __importStar(require("../../models/StoreModels"));
function getListStore(loginCustomer, currentPotition) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentPotition) {
            const listStore = yield storeDAL.getListNearestStore(currentPotition);
            const res = listStore.map((e) => storeModel.customerGetStore(e))
                .filter((e) => !e.isDeleted).sort((a, b) => a.distance - b.distance);
            return res;
        }
        const listStore = yield storeDAL.getListStore();
        const res = listStore.map((e) => storeModel.customerGetStore(e))
            .filter((e) => !e.isDeleted);
        return res;
    });
}
exports.getListStore = getListStore;
function getStoreById(loginCustomer, storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const store = yield storeDAL.getStoreById(storeId);
        const res = storeModel.customerGetStore(store);
        return res;
    });
}
exports.getStoreById = getStoreById;
function updateStoreById(loginCustomer, storeId, storeEntry) {
    return __awaiter(this, void 0, void 0, function* () {
        // const store: storeModel.StoreDB = await storeDAL.getStoreById(storeId);
        const res = yield storeDAL.updateStoreById(storeId, storeEntry);
        return res;
    });
}
exports.updateStoreById = updateStoreById;
//# sourceMappingURL=storeService.js.map