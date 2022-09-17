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
exports.getCurrentLoginUserInfor = exports.loginAdministrator = exports.loginStore = exports.registerStore = exports.generateAccessTokenFromRefreshToken = exports.deleteRefreshToken = exports.addNewRefreshToken = exports.loginCustomer = void 0;
const db_config_1 = require("../../config/db_config");
const env_config_1 = require("../../config/env_config");
const userSql = __importStar(require("../sql/userSql"));
const guid_typescript_1 = require("guid-typescript");
const customerModel = __importStar(require("../../models/CustomerModels"));
const storeModel = __importStar(require("../../models/StoreModels"));
const adminModel = __importStar(require("../../models/AdministratorModels"));
const commonEnums = __importStar(require("../../common/enum"));
const exception = __importStar(require("../../common/exception"));
const jwt = __importStar(require("jsonwebtoken"));
const serializerUtils = __importStar(require("../../common/utils/SerializerUtils"));
// tạo access token từ json object thông tin user
function generateJWTAccessToken(userObject) {
    return jwt.sign(serializerUtils.toJSONAnInstance(userObject), env_config_1.envConfig.ACCESS_TOKEN_SECRET, { expiresIn: env_config_1.envConfig.ACCESS_TOKEN_TIMEOUT });
}
// tạo refresh token từ json object thông tin user
function generateJWTRefreshToken(userObject) {
    return jwt.sign(serializerUtils.toJSONAnInstance(userObject), env_config_1.envConfig.REFRESH_TOKEN_SECRET);
}
/*
* tìm thông tin customer sau khi đã được google xác thực
*/
function loginCustomer(email, googleName, googlePicture) {
    return __awaiter(this, void 0, void 0, function* () {
        if (env_config_1.envConfig.ADMINISTRATOR_EMAIL.some((adminEmail) => adminEmail.toLocaleLowerCase().localeCompare(email.toLocaleLowerCase()) === 0)) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_003);
        }
        const queryStringGetCustomer = userSql.getCustomerByEmail(email);
        let customer;
        [customer] = yield db_config_1.db.query(queryStringGetCustomer);
        // lần đầu login
        if (!customer) {
            const customerId = guid_typescript_1.Guid.create().toString().replace(/-/g, '');
            const hiddenData = {};
            const queryInsertCustomer = userSql.createCustomer(customerId, email, googleName, googlePicture, hiddenData);
            yield db_config_1.db.query(queryInsertCustomer);
            [customer] = yield db_config_1.db.query(queryStringGetCustomer);
        }
        if (!customer) {
            throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_001);
        }
        return customerModel.createJsonObjectWithoutHiddenData(customer);
    });
}
exports.loginCustomer = loginCustomer;
// lưu trữ refresh token
function addNewRefreshToken(userObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = generateJWTAccessToken(userObject);
        const refreshToken = generateJWTRefreshToken(userObject);
        const queryInsertRefreshToken = userSql.insertRefreshToken(refreshToken, userObject.role, userObject.id);
        yield db_config_1.db.query(queryInsertRefreshToken);
        return { accessToken, refreshToken };
    });
}
exports.addNewRefreshToken = addNewRefreshToken;
// xóa refresh token khỏi db (logout)
function deleteRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryDeleteRefreshToken = userSql.deleteRefreshToken(refreshToken);
        yield db_config_1.db.query(queryDeleteRefreshToken);
        return true;
    });
}
exports.deleteRefreshToken = deleteRefreshToken;
// tạo mới 1 access token từ refresh token
function generateAccessTokenFromRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        let accessToken = '';
        let userToken = { id: '-1', role: -1, email: '', loginId: '' };
        let userDb = null;
        let createdUser = null;
        if (refreshToken == null) {
            throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
        }
        const [refreshTokenDB] = yield db_config_1.db.query(userSql.getRefreshTokenInDb(refreshToken));
        if (!refreshTokenDB) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
        }
        jwt.verify(refreshToken, env_config_1.envConfig.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.error(err);
                throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
            }
            if (user.id !== refreshTokenDB.user_id) {
                throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_002);
            }
            userToken = user;
        });
        if (userToken.role === commonEnums.UserRole.customer) {
            [userDb] = yield db_config_1.db.query(userSql.getCustomerByIdAndEmail(userToken.id, userToken.email));
            createdUser = userDb ? customerModel.createJsonObjectWithoutHiddenData(userDb) : null;
        }
        if (userToken.role === commonEnums.UserRole.administrator) {
            createdUser = adminModel.createJsonObject(userToken);
        }
        if (userToken.role === commonEnums.UserRole.store) {
            [userDb] = yield db_config_1.db.query(userSql.getStoreByStoreIdAndLoginId(userToken.id, userToken.loginId));
            createdUser = userDb ? storeModel.createJsonObjectWithoutHiddenData(userDb) : null;
        }
        if (!createdUser) {
            throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_002);
        }
        accessToken = generateJWTAccessToken(createdUser);
        return accessToken;
    });
}
exports.generateAccessTokenFromRefreshToken = generateAccessTokenFromRefreshToken;
/*
* đăng kí thông tin doanh nghiệp
*/
function registerStore(loginId, password, confirmPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        // tbd
    });
}
exports.registerStore = registerStore;
/*
* đăng nhập tài khoản doanh nghiệp
*/
function loginStore(loginId, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryGetStore = userSql.getStoreByLoginIdAndPassword(loginId, password);
        const [store] = yield db_config_1.db.query(queryGetStore);
        if (!store) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_002);
        }
        return storeModel.createJsonObjectWithoutHiddenData(store);
    });
}
exports.loginStore = loginStore;
/*
* đăng nhập tài khoản admin
*/
function loginAdministrator(email, name, avatarPicture) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = guid_typescript_1.Guid.create().toString().replace(/-/g, '');
        return adminModel.createJsonObject({ id, email, name, avatarPicture });
    });
}
exports.loginAdministrator = loginAdministrator;
function getCurrentLoginUserInfor(loginUser) {
    return __awaiter(this, void 0, void 0, function* () {
        if (loginUser.role === commonEnums.UserRole.administrator) {
            return loginUser;
        }
        if (loginUser.role === commonEnums.UserRole.customer) {
            const [customer] = yield db_config_1.db.query(userSql.getCustomerByIdAndEmail(loginUser.id, loginUser.email));
            return customerModel.createJsonObjectWithoutHiddenData(customer);
        }
        if (loginUser.role === commonEnums.UserRole.store) {
            const [store] = yield db_config_1.db.query(userSql.getStoreByStoreIdAndLoginId(loginUser.id, loginUser.loginId));
            return storeModel.createJsonObjectWithoutHiddenData(store);
        }
    });
}
exports.getCurrentLoginUserInfor = getCurrentLoginUserInfor;
//# sourceMappingURL=authDAL.js.map