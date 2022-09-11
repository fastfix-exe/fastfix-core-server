import * as authenticationDal from "../../dals/auth/AuthenticationDAL";

export async function loginRoleCustomer (googleId: string, email: string, googleName: string, googlePicture: string, locale: string) {
    const loginCustomer = await authenticationDal.loginCustomer(googleId, email, googleName, googlePicture, locale);
    const tokens = await authenticationDal.addNewRefreshToken(loginCustomer);
    return {
        loginCustomer,
        tokens,
    }
}

export async function logout (refreshToken: string) {
    return await authenticationDal.deleteRefreshToken(refreshToken);
}

export async function generateAccessTokenFromRefreshToken (refreshToken: string) {
    const accessToken = await authenticationDal.generateAccessTokenFromRefreshToken(refreshToken);
    return {
        accessToken
    }
}