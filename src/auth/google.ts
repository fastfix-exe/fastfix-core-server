import { google } from "googleapis";
import { envConfig } from "../config/env_config";
export const Oauth2Client = new google.auth.OAuth2(
    envConfig.GOOGLE_CLIENT_ID,
    envConfig.GOOGLE_CLIENT_SECRET,
    envConfig.GOOGLE_REDIRECT_URI
);

const SCOPE = [
    'https://www.googleapis.com/auth/userinfo.profile', // get customer info
    'https://www.googleapis.com/auth/userinfo.email',   // get customer email ID and if its verified or not
  ];
export const authUrl = Oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
    prompt: "consent",
    state: "GOOGLE_LOGIN",
    });