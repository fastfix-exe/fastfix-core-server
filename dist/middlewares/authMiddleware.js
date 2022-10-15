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
exports.authorizeEmployee = exports.authorizeStore = exports.authorizeCustomer = exports.authorizeAdministrator = exports.validateToken = void 0;
const env_config_1 = require("../config/env_config");
const exception = __importStar(require("../common/exception"));
const commonEnums = __importStar(require("../common/enum"));
const jwt = __importStar(require("jsonwebtoken"));
const commonBypassApi = ['/api/healthcheck', '/api/auth/google', '/api/auth/token', '/docs.json',
    '/docs', '/favicon.ico', '/api/auth/store'];
// tmp bypass api for dev
commonBypassApi.push();
function validateToken(req, res, next) {
    if (commonBypassApi.some((api) => req.originalUrl.startsWith(api))) {
        next();
    }
    else {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; //format: Bearer {{token}}
        if (token == null) {
            throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
        }
        jwt.verify(token, env_config_1.envConfig.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, err.message);
            }
            req.loginUser = user;
            next();
        });
    }
}
exports.validateToken = validateToken;
function authorizeAdministrator(req, res, next) {
    try {
        // check role or add role to call apis
        if (!req.loginUser) {
            throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
        }
        const bypassApi = commonBypassApi;
        // skip by role
        bypassApi.push();
        if (req.loginUser.role !== commonEnums.UserRole.administrator && !bypassApi.some((api) => req.originalUrl.startsWith(api))) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
        }
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.authorizeAdministrator = authorizeAdministrator;
function authorizeCustomer(req, res, next) {
    try {
        // check role or add role to call apis
        if (!req.loginUser) {
            throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
        }
        const bypassApi = commonBypassApi;
        // skip by role
        bypassApi.push();
        if (req.loginUser.role !== commonEnums.UserRole.customer && !bypassApi.some((api) => req.originalUrl.startsWith(api))) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
        }
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.authorizeCustomer = authorizeCustomer;
function authorizeStore(req, res, next) {
    try {
        // check role or add role to call apis
        if (!req.loginUser) {
            throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
        }
        const bypassApi = commonBypassApi;
        // skip by role
        if (req.loginUser.role !== commonEnums.UserRole.store && !bypassApi.some((api) => req.originalUrl.startsWith(api))) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
        }
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.authorizeStore = authorizeStore;
function authorizeEmployee(req, res, next) {
    try {
        // check role or add role to call apis
        if (!req.loginUser) {
            throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
        }
        const bypassApi = commonBypassApi;
        // skip by role
        bypassApi.push();
        // this endpoint can be call by role store
        if ((req.loginUser.role !== commonEnums.UserRole.employee && req.loginUser.role !== commonEnums.UserRole.store) && !bypassApi.some((api) => req.originalUrl.startsWith(api))) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
        }
        next();
    }
    catch (err) {
        next(err);
    }
}
exports.authorizeEmployee = authorizeEmployee;
//# sourceMappingURL=authMiddleware.js.map