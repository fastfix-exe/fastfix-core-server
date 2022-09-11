import * as authDAL from "../../dals/auth/authDAL";

export async function loginRoleCustomer (googleId: string, email: string, googleName: string, googlePicture: string, locale: string) {
    const loginCustomer = await authDAL.loginCustomer(googleId, email, googleName, googlePicture, locale);
    const tokens = await authDAL.addNewRefreshToken(loginCustomer);
    return {
        loginCustomer,
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