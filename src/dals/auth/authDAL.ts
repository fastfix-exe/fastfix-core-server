import { db } from "../../config/db_config";
import { envConfig } from "../../config/env_config";
import * as userSql from "../sql/userSql";
import { Guid } from "guid-typescript";
import * as customerModel from "../../models/CustomerModels";
import * as commonEnums from "../../common/enum";
import * as exception from "../../common/exception";
import * as jwt from 'jsonwebtoken';
import * as serializerUtils from '../../common/utils/SerializerUtils';

// tạo access token từ json object thông tin user
function generateJWTAccessToken (userObject: any) {
    return jwt.sign(serializerUtils.toJSONAnInstance(userObject), envConfig.ACCESS_TOKEN_SECRET, { expiresIn: envConfig.ACCESS_TOKEN_TIMEOUT });
}

// tạo refresh token từ json object thông tin user
function generateJWTRefreshToken (userObject: any) {
    return jwt.sign(serializerUtils.toJSONAnInstance(userObject), envConfig.REFRESH_TOKEN_SECRET);
}

/*
* tìm thông tin customer sau khi đã được google xác thực
*/
export async function loginCustomer (googleId: string, email: string, googleName: string, googlePicture: string, locale?: string) {
    if (envConfig.ADMINISTRATOR_EMAIL.toLocaleLowerCase().localeCompare(email.toLocaleLowerCase()) === 0) {
        // login with administrator role instead!
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_BAD_REQUEST, exception.ErrorMessage.API_E_003);
    }
    console.log("TESTTTTTTTTTTTTTTTTTTTTT1")
    const queryStringGetCustomer = userSql.getCustomerByEmail(email);
    let customer: customerModel.CustomerDB;
    [customer] = await db.query(queryStringGetCustomer);
    // lần đầu login
    if (!customer) {
        const customerId = Guid.create().toString().replace(/-/g, '');
        const hiddenData = {
            locale: locale,
            googleId
        }
        const queryInsertCustomer = userSql.createCustomer(customerId, email, googleName, googlePicture, hiddenData);
            console.log("queryInsertCustomer")

        await db.query(queryInsertCustomer);
        [customer] = await db.query(queryStringGetCustomer);
    }

    if (!customer) {
        throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_001);
    }
    
    return customerModel.createJsonObjectWithoutHiddenData(customer);
}

// lưu trữ refresh token
export async function addNewRefreshToken (userObject: any) {
    const accessToken = generateJWTAccessToken(userObject);
    const refreshToken = generateJWTRefreshToken(userObject);
    const queryInsertRefreshToken = userSql.insertRefreshToken(refreshToken, userObject.role, userObject.id);
    await db.query(queryInsertRefreshToken);
    return { accessToken, refreshToken };
}

// xóa refresh token khỏi db (logout)
export async function deleteRefreshToken (refreshToken: string) {
    const queryDeleteRefreshToken = userSql.deleteRefreshToken(refreshToken);
    await db.query(queryDeleteRefreshToken);
    return true;
}


// tạo mới 1 access token từ refresh token
export async function generateAccessTokenFromRefreshToken (refreshToken: string) {
    let accessToken = '';
    let userToken = { id: '-1', role: -1 };
    let userDb: any = null;
    let createdUser: any = null;

    if (refreshToken == null) {
        throw new exception.APIException(exception.HttpStatusCode.UNAUTHORIZED, exception.ErrorMessage.API_E_004);
    }
    const [refreshTokenDB] = await db.query(userSql.getRefreshTokenInDb(refreshToken));
    if (!refreshTokenDB) {
        throw new exception.APIException(exception.HttpStatusCode.CLIENT_FORBIDDEN, exception.ErrorMessage.API_E_004);
    }
    jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
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
        [userDb] = await db.query(userSql.getCustomerById(userToken.id));
        createdUser = userDb ? customerModel.createJsonObjectWithoutHiddenData(userDb) : null;
    }
    if (userToken.role === commonEnums.UserRole.administrator) {
        // [userDb] = ...
    }
    if (userToken.role === commonEnums.UserRole.store) {
        // [userDb] = ...
    }
    if (!createdUser) {
        throw new exception.APIException(exception.HttpStatusCode.SERVER, exception.ErrorMessage.API_E_002);
    }
    accessToken = generateJWTAccessToken(createdUser);
    return accessToken;
}