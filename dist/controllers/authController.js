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
exports.loginRoleStore = exports.logout = exports.generateAccessTokenFromRefreshToken = exports.getLoginUserInfor = exports.callbackGoogle = exports.getGoogleLoginUrl = void 0;
const googleapis_1 = require("googleapis");
const google_1 = require("../auth/google");
const authService = __importStar(require("../services/auth/authService"));
const db_config_1 = require("../config/db_config");
const exception = __importStar(require("../common/exception"));
function getGoogleLoginUrl(req, res, next) {
    res.send(google_1.authUrl);
}
exports.getGoogleLoginUrl = getGoogleLoginUrl;
function callbackGoogle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            let code = req.query.code; // get the code from req, need to get access_token for the customer 
            let { tokens } = yield google_1.Oauth2Client.getToken(code); // get tokens
            let oauth2Client = new googleapis_1.google.auth.OAuth2(); // create new auth client
            oauth2Client.setCredentials({ access_token: tokens.access_token }); // use the new auth client with the access_token
            let oauth2 = googleapis_1.google.oauth2({
                auth: oauth2Client,
                version: 'v2'
            });
            let { data } = yield oauth2.userinfo.get(); // get customer info
            if (!data) {
                throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_002);
            }
            const response = yield authService.loginCustomerOrAdmin(data.email || '', data.name || '', data.picture || '');
            yield db_config_1.db.query('COMMIT');
            res.json(response);
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            next(error);
        }
    });
}
exports.callbackGoogle = callbackGoogle;
function getLoginUserInfor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield authService.getCurrentLoginUserInfor(req.loginUser);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getLoginUserInfor = getLoginUserInfor;
function generateAccessTokenFromRefreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const refreshToken = req.body.refreshToken;
            const response = yield authService.generateAccessTokenFromRefreshToken(refreshToken);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query('ROLLBACK');
            return next(error);
        }
    });
}
exports.generateAccessTokenFromRefreshToken = generateAccessTokenFromRefreshToken;
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query('BEGIN');
            const refreshToken = req.body.refreshToken;
            const response = yield authService.logout(refreshToken);
            res.json(response);
            yield db_config_1.db.query('COMMIT');
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.logout = logout;
function loginRoleStore(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginId = req.body.loginId;
            const password = req.body.password;
            const result = yield authService.loginRoleStore(loginId, password);
            res.json(result);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.loginRoleStore = loginRoleStore;
//# sourceMappingURL=authController.js.map