import * as authDAL from "../../dals/auth/authDAL";
import { envConfig } from "../../config/env_config";
import * as exception from "../../common/exception";

export async function loginCustomerOrAdmin (email: string, name: string, avatarPicture: string) {
    let loginUser: any;
    if (envConfig.ADMINISTRATOR_EMAIL.some((adminEmail: string) => adminEmail.toLocaleLowerCase().localeCompare(email.toLocaleLowerCase()) === 0)) {
        loginUser = await authDAL.loginAdministrator(email, name, avatarPicture);
    } else {
        loginUser = await authDAL.loginCustomer(email, name, avatarPicture);
    }
    const tokens = await authDAL.addNewRefreshToken(loginUser);
    return {
        loginUser,
        tokens,
    }
}

export async function logout (refreshToken: string) {
    return await authDAL.deleteRefreshToken(refreshToken);
}

export async function generateAccessTokenFromRefreshToken (refreshToken: string) {
    const accessToken = await authDAL.generateAccessTokenFromRefreshToken(refreshToken);
    return {
        accessToken
    }
}

export async function loginRoleStore (loginId: string, password: string) {
    const loginStore = await authDAL.loginStore(loginId, password);
    const tokens = await authDAL.addNewRefreshToken(loginStore);
    return {
        loginStore,
        tokens,
    }
}

export async function getCurrentLoginUserInfor (loginUser: any) {
    return await authDAL.getCurrentLoginUserInfor(loginUser);
}