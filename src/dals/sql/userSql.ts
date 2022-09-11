import * as localDateTimeUtils from '../../common/utils/LocalDateTimeUtils';

// get customer's infor
export function getCustomerByEmail (email: string) {
    const query = `SELECT * FROM CUSTOMER WHERE EMAIL = $1`;
    const values = [email];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

// insert customer
export function createCustomer (customerId: string, email: string, customerName: string, avatarPicture: string, hiddenData: any) {
    const query = `INSERT INTO customer(customer_id, email, customer_name, avatar_picture, hidden_data, created_at, created_by, updated_at, updated_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $6, $7);`;
    const now = localDateTimeUtils.getSystemDateTime();
    const values = [customerId, email, customerName, avatarPicture, hiddenData, now, email];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getRefreshTokenInDb (refreshToken: string) {
    const query = `SELECT * FROM AUTH_TOKEN WHERE REFRESH_TOKEN = $1`;
    const values = [refreshToken];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function insertRefreshToken (refreshToken: string, userRole: number, userId: string) {
    const query = `INSERT INTO auth_token(refresh_token, user_role, user_id)
        VALUES ($1, $2, $3);`;
    const values = [refreshToken, userRole, userId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function deleteRefreshToken (refreshToken: string) {
    const query = `delete from auth_token where refresh_token = $1`;
    const values = [refreshToken];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}

export function getCustomerById (customerId: string) {
    const query = `SELECT * FROM CUSTOMER WHERE customer_id = $1`;
    const values = [customerId];
    const queryObject = {
        text: query,
        values: values,
    }
    return queryObject;
}