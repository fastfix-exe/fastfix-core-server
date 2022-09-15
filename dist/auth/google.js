"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUrl = exports.Oauth2Client = void 0;
const googleapis_1 = require("googleapis");
const env_config_1 = require("../config/env_config");
exports.Oauth2Client = new googleapis_1.google.auth.OAuth2(env_config_1.envConfig.GOOGLE_CLIENT_ID, env_config_1.envConfig.GOOGLE_CLIENT_SECRET, env_config_1.envConfig.GOOGLE_REDIRECT_URI);
const SCOPE = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email', // get customer email ID and if its verified or not
];
exports.authUrl = exports.Oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
    prompt: "consent",
    state: "GOOGLE_LOGIN",
});
//# sourceMappingURL=google.js.map