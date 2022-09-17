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
exports.updateStore = exports.updateCustomer = void 0;
const userDAL = __importStar(require("../../dals/user/userDAL"));
const authService = __importStar(require("../../services/auth/authService"));
const exception = __importStar(require("../../common/exception"));
function updateCustomer(loginCustomer, customerEntry, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const customerId = loginCustomer.id;
        const email = loginCustomer.email;
        const customer = yield userDAL.updateCustomer(customerId, email, customerEntry);
        // delete refreshtoken (temp logout) and generate new tokens
        if (customer) {
            yield authService.logout(refreshToken);
            const res = yield authService.loginCustomerOrAdmin(email, customer.customer_name, customer.avatar_picture);
            return res;
        }
        else {
            throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_002);
        }
    });
}
exports.updateCustomer = updateCustomer;
function updateStore(loginStore, storeEntry, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = loginStore.id;
        const loginId = loginStore.loginId;
        const store = yield userDAL.updateStore(storeId, loginId, storeEntry);
        // delete refreshtoken (temp logout) and generate new tokens
        if (store) {
            yield authService.logout(refreshToken);
            const res = yield authService.loginRoleStore(loginId, store.password);
            return res;
        }
        else {
            throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_002);
        }
    });
}
exports.updateStore = updateStore;
//# sourceMappingURL=userService.js.map