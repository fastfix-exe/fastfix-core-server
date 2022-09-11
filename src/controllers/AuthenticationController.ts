import { google } from "googleapis";
import { authUrl, Oauth2Client} from "../auth/google";
import * as AuthenticationService from "../services/auth/AuthenticationService";
import { db } from "../config/db_config";
import * as exception from "../common/exception";

export function getGoogleLoginUrl (req: any, res: any, next: any) {
    res.send(authUrl);
}

export async function callbackGoogle (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');

        let code = req.query.code;    // get the code from req, need to get access_token for the customer 
        let { tokens } = await Oauth2Client.getToken(code);    // get tokens
        let oauth2Client = new google.auth.OAuth2();    // create new auth client
        oauth2Client.setCredentials({access_token: tokens.access_token});    // use the new auth client with the access_token
        let oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
        });
        let { data } = await oauth2.userinfo.get();    // get customer info
        if (!data) {
            throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_002);
        }
        const response = await AuthenticationService.loginRoleCustomer(data.id || '', data.email || '', data.name || '', data.picture || '', data.locale || '');
        res.json(response);
        
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}

export async function getLoginUserInfor (req: any, res: any, next: any) {
    const loginUser = req.loginUser;
    console.log(loginUser)
    res.json(loginUser);
}

export async function generateAccessTokenFromRefreshToken (req: any, res: any, next: any) {
    const refreshToken: string = req.body.refreshToken as string;
    const response = await AuthenticationService.generateAccessTokenFromRefreshToken(refreshToken);
    res.json(response);
}

export async function getAccessToken (req: any, res: any, next: any) {

}

export async function logout (req: any, res: any, next: any) {
    try {
        await db.query('BEGIN');
        const refreshToken: string = req.body.refreshToken as string;
        const response = await AuthenticationService.logout(refreshToken);
        res.json(response);
        await db.query('COMMIT');
    } catch (error) {
        await db.query("ROLLBACK");
        return next(error);
    }
}