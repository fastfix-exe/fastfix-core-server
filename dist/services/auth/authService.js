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
exports.getCurrentLoginUserInfor = exports.loginRoleStore = exports.generateAccessTokenFromRefreshToken = exports.logout = exports.loginViaCredentialId = exports.loginCustomerOrAdmin = void 0;
const authDAL = __importStar(require("../../dals/auth/authDAL"));
const env_config_1 = require("../../config/env_config");
const exception = __importStar(require("../../common/exception"));
function loginCustomerOrAdmin(email, name, avatarPicture) {
    return __awaiter(this, void 0, void 0, function* () {
        let loginUser;
        if (env_config_1.envConfig.ADMINISTRATOR_EMAIL.some((adminEmail) => adminEmail.toLocaleLowerCase().localeCompare(email.toLocaleLowerCase()) === 0)) {
            loginUser = yield authDAL.loginAdministrator(email, name, avatarPicture);
        }
        else {
            loginUser = yield authDAL.loginCustomer(email, name, avatarPicture);
        }
        const tokens = yield authDAL.addNewRefreshToken(loginUser);
        return {
            loginUser,
            tokens,
        };
    });
}
exports.loginCustomerOrAdmin = loginCustomerOrAdmin;
function loginViaCredentialId(credentialId) {
    return __awaiter(this, void 0, void 0, function* () {
        let loginUser;
        const user = authDAL.decodeCredentialId(credentialId);
        if (!user || !user.email || !user.name || !user.picture) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_009);
        }
        const email = user.email;
        const name = user.name;
        const avatarPicture = user.picture;
        if (env_config_1.envConfig.ADMINISTRATOR_EMAIL.some((adminEmail) => adminEmail.toLocaleLowerCase().localeCompare(email.toLocaleLowerCase()) === 0)) {
            loginUser = yield authDAL.loginAdministrator(email, name, avatarPicture);
        }
        else {
            loginUser = yield authDAL.loginCustomer(email, name, avatarPicture);
        }
        const tokens = yield authDAL.addNewRefreshToken(loginUser);
        return {
            loginUser,
            tokens,
        };
    });
}
exports.loginViaCredentialId = loginViaCredentialId;
function logout(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield authDAL.deleteRefreshToken(refreshToken);
    });
}
exports.logout = logout;
function generateAccessTokenFromRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = yield authDAL.generateAccessTokenFromRefreshToken(refreshToken);
        return {
            accessToken
        };
    });
}
exports.generateAccessTokenFromRefreshToken = generateAccessTokenFromRefreshToken;
function loginRoleStore(loginId, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginStore = yield authDAL.loginStore(loginId, password);
        const tokens = yield authDAL.addNewRefreshToken(loginStore);
        return {
            loginStore,
            tokens,
        };
    });
}
exports.loginRoleStore = loginRoleStore;
function getCurrentLoginUserInfor(loginUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield authDAL.getCurrentLoginUserInfor(loginUser);
    });
}
exports.getCurrentLoginUserInfor = getCurrentLoginUserInfor;
//# sourceMappingURL=authService.js.map