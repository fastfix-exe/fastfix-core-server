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
exports.envConfig = void 0;
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const env = process.env.NODE_ENV || 'localenv';
if (env === 'localenv') {
    dotenv.config({
        path: path.resolve(process.cwd() + '/src/config', env + '.env')
    });
}
else {
    dotenv.config();
}
exports.envConfig = {
    PORT: process.env.PORT,
    PROXY: process.env.PROXY,
    NODE_ENV: env,
    // connection string
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
    // log level
    LOG_LEVEL: process.env.LOG_LEVEL || 'ERROR',
    // google secret
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || '',
    // admin email
    ADMINISTRATOR_EMAIL: process.env.ADMINISTRATOR_EMAIL || '',
    // jwt secret
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
    ACCESS_TOKEN_TIMEOUT: process.env.ACCESS_TOKEN_TIMEOUT || '90s'
};
//# sourceMappingURL=env_config.js.map